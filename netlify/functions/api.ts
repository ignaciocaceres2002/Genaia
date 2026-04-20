import express, { type Request, type Response, type NextFunction } from "express";
import serverless from "serverless-http";
import { createServer } from "http";
import { registerRoutes } from "../../server/routes";
import { seedDatabase } from "../../server/seed";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const initPromise = (async () => {
  await registerRoutes(httpServer, app);
  try {
    await seedDatabase();
  } catch (e) {
    console.error("Seed failed:", e);
  }
})();

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  await initPromise;

  // Netlify passes the original request URL in rawUrl — use it so Express
  // receives the full /api/... path and routes correctly.
  if (event.rawUrl) {
    try {
      const url = new URL(event.rawUrl);
      event = { ...event, path: url.pathname };
    } catch {}
  }

  return serverlessHandler(event, context);
};
