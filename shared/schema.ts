import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"),
  department: text("department"),
  avatar: text("avatar"),
  level: integer("level").notNull().default(1),
  xp: integer("xp").notNull().default(0),
  nqScore: integer("nq_score").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  isChampion: boolean("is_champion").notNull().default(false),
  isAdmin: boolean("is_admin").notNull().default(false),
  skillScores: jsonb("skill_scores").$type<Record<string, number>>(),
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  department: text("department").notNull(),
  headcount: integer("headcount").notNull().default(0),
  avgNq: real("avg_nq").notNull().default(0),
  completionPct: real("completion_pct").notNull().default(0),
  engagementScore: real("engagement_score").notNull().default(0),
  champion: text("champion"),
});

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  xpEarned: integer("xp_earned").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  skill: text("skill").notNull(),
  description: text("description").notNull(),
  modulesCount: integer("modules_count").notNull().default(0),
  icon: text("icon"),
  orderIndex: integer("order_index").notNull().default(0),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  courseId: varchar("course_id").notNull(),
  modulesCompleted: integer("modules_completed").notNull().default(0),
  score: real("score").notNull().default(0),
  completedAt: timestamp("completed_at"),
});

export const aiTools = pgTable("ai_tools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  vendor: text("vendor"),
  status: text("status").notNull().default("approved"),
  usageCount: integer("usage_count").notNull().default(0),
  icon: text("icon"),
});

export const toolRequests = pgTable("tool_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  toolName: text("tool_name").notNull(),
  reason: text("reason").notNull(),
  task: text("task"),
  priority: text("priority").notNull().default("medium"),
  status: text("status").notNull().default("submitted"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const policies = pgTable("policies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  version: text("version").notNull().default("1.0"),
  status: text("status").notNull().default("published"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  team: text("team"),
  dismissed: boolean("dismissed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sqCalculations = pgTable("nq_calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  role: text("role").notNull(),
  tasks: jsonb("tasks").$type<Array<{ name: string; hours: number }>>(),
  score: integer("score").notNull(),
  level: text("level").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sqAssessments = pgTable("sq_assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  role: text("role").notNull(),
  aiUsage: text("ai_usage").notNull(),
  overallScore: integer("overall_score").notNull(),
  level: text("level").notNull(),
  skillScores: jsonb("skill_scores").$type<Record<string, number>>().notNull(),
  taskBreakdown: jsonb("task_breakdown").$type<Array<{ name: string; hours: number; automationScore: number; category: string; isDrain: boolean }>>(),
  recoverableHours: real("recoverable_hours").notNull().default(0),
  estimatedDollarsSaved: integer("estimated_dollars_saved").notNull().default(0),
  personalitySummary: text("personality_summary"),
  concern: text("concern"),
  hope: text("hope"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, lastActive: true });
export const insertTeamSchema = createInsertSchema(teams).omit({ id: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true, createdAt: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true });
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true });
export const insertAiToolSchema = createInsertSchema(aiTools).omit({ id: true });
export const insertToolRequestSchema = createInsertSchema(toolRequests).omit({ id: true, createdAt: true });
export const insertPolicySchema = createInsertSchema(policies).omit({ id: true, updatedAt: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true, createdAt: true });
export const insertSqCalculationSchema = createInsertSchema(sqCalculations).omit({ id: true, createdAt: true });
export const insertSqAssessmentSchema = createInsertSchema(sqAssessments).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type AiTool = typeof aiTools.$inferSelect;
export type InsertAiTool = z.infer<typeof insertAiToolSchema>;
export type ToolRequest = typeof toolRequests.$inferSelect;
export type InsertToolRequest = z.infer<typeof insertToolRequestSchema>;
export type Policy = typeof policies.$inferSelect;
export type InsertPolicy = z.infer<typeof insertPolicySchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type SqCalculation = typeof sqCalculations.$inferSelect;
export type InsertSqCalculation = z.infer<typeof insertSqCalculationSchema>;
export type SqAssessment = typeof sqAssessments.$inferSelect;
export type InsertSqAssessment = z.infer<typeof insertSqAssessmentSchema>;

export const SQ_LEVELS = [
  { name: "Beginner", minXp: 0, minSq: 0 },
  { name: "Learner", minXp: 500, minSq: 15 },
  { name: "Explorer", minXp: 1500, minSq: 30 },
  { name: "Builder", minXp: 3500, minSq: 45 },
  { name: "Achiever", minXp: 7000, minSq: 55 },
  { name: "Expert", minXp: 12000, minSq: 65 },
  { name: "Master", minXp: 20000, minSq: 80 },
  { name: "Superagent", minXp: 35000, minSq: 90 },
] as const;

export const SKILLS = [
  { key: "dataFluency", name: "Data Fluency", icon: "BarChart3" },
  { key: "adaptiveMindset", name: "Adaptive Mindset", icon: "RefreshCw" },
  { key: "verificationMindset", name: "Verification Mindset", icon: "ShieldCheck" },
  { key: "coIntelligence", name: "Co-Intelligence", icon: "Users" },
  { key: "autonomousDrive", name: "Autonomous Drive", icon: "Rocket" },
  { key: "processReimagination", name: "Process Reimagination", icon: "Lightbulb" },
] as const;

export function getSqLevel(sq: number) {
  let level = SQ_LEVELS[0];
  for (const l of SQ_LEVELS) {
    if (sq >= l.minSq) level = l;
  }
  return level;
}

export function getXpLevel(xp: number) {
  let level = SQ_LEVELS[0];
  let idx = 0;
  for (let i = 0; i < SQ_LEVELS.length; i++) {
    if (xp >= SQ_LEVELS[i].minXp) {
      level = SQ_LEVELS[i];
      idx = i;
    }
  }
  return { ...level, index: idx + 1 };
}
