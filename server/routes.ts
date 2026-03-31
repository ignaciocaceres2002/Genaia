import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSqCalculationSchema, insertSqAssessmentSchema, insertToolRequestSchema, insertAiUseCaseSchema, insertBenefitSchema, type User } from "@shared/schema";
import { z } from "zod";

const toolRequestStatusSchema = z.object({
  status: z.enum(["approved", "denied", "pending"]),
});

function omitPassword(user: User): Omit<User, "password"> {
  const { password: _password, ...rest } = user;
  return rest;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/user/me", async (_req, res) => {
    try {
      const user = await storage.getUserByUsername("sarah.chen");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(omitPassword(user));
    } catch (error) {
      console.error("GET /api/user/me error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user/activities", async (_req, res) => {
    try {
      const user = await storage.getUserByUsername("sarah.chen");
      const userId = user?.id || "demo";
      const acts = await storage.getActivities(userId);
      res.json(acts);
    } catch (error) {
      console.error("GET /api/user/activities error:", error);
      res.json([]);
    }
  });

  app.get("/api/user/leaderboard", async (_req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      res.json(allUsers.slice(0, 10).map(omitPassword));
    } catch (error) {
      console.error("GET /api/user/leaderboard error:", error);
      res.json([]);
    }
  });

  app.get("/api/teams", async (_req, res) => {
    try {
      const t = await storage.getTeams();
      res.json(t);
    } catch (error) {
      console.error("GET /api/teams error:", error);
      res.json([]);
    }
  });

  app.get("/api/courses", async (_req, res) => {
    try {
      const c = await storage.getCourses();
      res.json(c);
    } catch (error) {
      console.error("GET /api/courses error:", error);
      res.json([]);
    }
  });

  app.get("/api/ai-tools", async (_req, res) => {
    try {
      const t = await storage.getAiTools();
      res.json(t);
    } catch (error) {
      console.error("GET /api/ai-tools error:", error);
      res.json([]);
    }
  });

  app.get("/api/tool-requests", async (_req, res) => {
    try {
      const r = await storage.getToolRequests();
      res.json(r);
    } catch (error) {
      console.error("GET /api/tool-requests error:", error);
      res.json([]);
    }
  });

  app.patch("/api/tool-requests/:id", async (req, res) => {
    const { id } = req.params;
    if (!id || id.trim().length === 0) {
      return res.status(400).json({ message: "Invalid tool request ID" });
    }
    try {
      const parsed = toolRequestStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid status. Must be 'approved', 'denied', or 'pending'." });
      }
      const updated = await storage.updateToolRequestStatus(id, parsed.data.status);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
      console.error("PATCH /api/tool-requests/:id error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/tool-requests", async (req, res) => {
    try {
      const parsed = insertToolRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid request data", errors: parsed.error.flatten() });
      }
      const request = await storage.createToolRequest(parsed.data);
      res.json(request);
    } catch (error) {
      console.error("POST /api/tool-requests error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/policies", async (_req, res) => {
    try {
      const p = await storage.getPolicies();
      res.json(p);
    } catch (error) {
      console.error("GET /api/policies error:", error);
      res.json([]);
    }
  });

  app.get("/api/alerts", async (_req, res) => {
    try {
      const a = await storage.getAlerts();
      res.json(a);
    } catch (error) {
      console.error("GET /api/alerts error:", error);
      res.json([]);
    }
  });

  app.get("/api/champions", async (_req, res) => {
    try {
      const c = await storage.getChampions();
      res.json(c.map(omitPassword));
    } catch (error) {
      console.error("GET /api/champions error:", error);
      res.json([]);
    }
  });

  app.get("/api/admin/users", async (_req, res) => {
    try {
      const u = await storage.getAllUsers();
      res.json(u.map(omitPassword));
    } catch (error) {
      console.error("GET /api/admin/users error:", error);
      res.json([]);
    }
  });

  app.post("/api/sq-calculations", async (req, res) => {
    try {
      const parsed = insertSqCalculationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid calculation data", errors: parsed.error.flatten() });
      }
      const calc = await storage.createSqCalculation(parsed.data);
      res.json(calc);
    } catch (error) {
      console.error("POST /api/sq-calculations error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/sq-assessments", async (req, res) => {
    try {
      const parsed = insertSqAssessmentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid assessment data", errors: parsed.error.flatten() });
      }
      const assessment = await storage.createSqAssessment(parsed.data);
      res.json(assessment);
    } catch (error) {
      console.error("POST /api/sq-assessments error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/ai-use-cases", async (_req, res) => {
    try {
      const cases = await storage.getAiUseCases();
      res.json(cases);
    } catch (error) {
      console.error("GET /api/ai-use-cases error:", error);
      res.json([]);
    }
  });

  app.get("/api/ai-use-cases/user/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId || userId.trim().length === 0) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
      const cases = await storage.getAiUseCasesByUser(userId);
      res.json(cases);
    } catch (error) {
      console.error("GET /api/ai-use-cases/user/:userId error:", error);
      res.json([]);
    }
  });

  app.post("/api/ai-use-cases", async (req, res) => {
    try {
      const parsed = insertAiUseCaseSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      }
      const data = parsed.data;
      const qualityScore = Math.min(100, Math.round(
        ((data.timeSavedMinutes || 0) > 0 ? 25 : 0) +
        (data.taskCategory ? 20 : 0) +
        (data.toolsUsed ? 20 : 0) +
        (data.taskName ? 25 : 0) +
        ((data.timeInvestedMinutes || 0) > 0 ? 10 : 0)
      ));
      const pointsAwarded = Math.round(qualityScore * 0.5 + ((data.timeSavedMinutes || 0) * 0.2));
      const created = await storage.createAiUseCase({
        ...data,
        qualityScore,
        pointsAwarded,
        status: "submitted",
      });
      res.json(created);
    } catch (error) {
      console.error("POST /api/ai-use-cases error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/benefits", async (_req, res) => {
    try {
      const b = await storage.getBenefits();
      res.json(b);
    } catch (error) {
      console.error("GET /api/benefits error:", error);
      res.json([]);
    }
  });

  app.post("/api/benefits", async (req, res) => {
    try {
      const parsed = insertBenefitSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
      }
      const created = await storage.createBenefit(parsed.data);
      res.json(created);
    } catch (error) {
      console.error("POST /api/benefits error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
