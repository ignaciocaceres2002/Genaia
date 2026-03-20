import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSqCalculationSchema, insertSqAssessmentSchema, insertToolRequestSchema } from "@shared/schema";
import { z } from "zod";

const toolRequestStatusSchema = z.object({
  status: z.enum(["approved", "denied", "pending"]),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/user/me", async (_req, res) => {
    try {
      const user = await storage.getUserByUsername("sarah.chen");
      if (!user) {
        return res.json({
          id: "demo",
          name: "Sarah Chen",
          username: "sarah.chen",
          email: "sarah@company.com",
          role: "user",
          department: "Marketing",
          nqScore: 67,
          xp: 8450,
          streak: 12,
          level: 5,
          isChampion: false,
          isAdmin: false,
          skillScores: {
            dataFluency: 72,
            adaptiveMindset: 65,
            verificationMindset: 78,
            coIntelligence: 58,
            autonomousDrive: 70,
            processReimagination: 60,
          },
        });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user/activities", async (_req, res) => {
    try {
      const user = await storage.getUserByUsername("sarah.chen");
      const userId = user?.id || "demo";
      const acts = await storage.getActivities(userId);
      res.json(acts);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/user/leaderboard", async (_req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      res.json(allUsers.slice(0, 10));
    } catch {
      res.json([]);
    }
  });

  app.get("/api/teams", async (_req, res) => {
    try {
      const t = await storage.getTeams();
      res.json(t);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/courses", async (_req, res) => {
    try {
      const c = await storage.getCourses();
      res.json(c);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/ai-tools", async (_req, res) => {
    try {
      const t = await storage.getAiTools();
      res.json(t);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/tool-requests", async (_req, res) => {
    try {
      const r = await storage.getToolRequests();
      res.json(r);
    } catch {
      res.json([]);
    }
  });

  app.patch("/api/tool-requests/:id", async (req, res) => {
    try {
      const parsed = toolRequestStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid status. Must be 'approved', 'denied', or 'pending'." });
      }
      const updated = await storage.updateToolRequestStatus(req.params.id, parsed.data.status);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
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
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/policies", async (_req, res) => {
    try {
      const p = await storage.getPolicies();
      res.json(p);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/alerts", async (_req, res) => {
    try {
      const a = await storage.getAlerts();
      res.json(a);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/champions", async (_req, res) => {
    try {
      const c = await storage.getChampions();
      res.json(c);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/admin/users", async (_req, res) => {
    try {
      const u = await storage.getAllUsers();
      res.json(u);
    } catch {
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
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
