import {
  type User, type InsertUser,
  type Team, type InsertTeam,
  type Activity, type InsertActivity,
  type Course, type InsertCourse,
  type UserProgress, type InsertUserProgress,
  type AiTool, type InsertAiTool,
  type ToolRequest, type InsertToolRequest,
  type Policy, type InsertPolicy,
  type Alert, type InsertAlert,
  type NqCalculation, type InsertNqCalculation,
  users, teams, activities, courses, userProgress, aiTools, toolRequests, policies, alerts, nqCalculations,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getChampions(): Promise<User[]>;

  getTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;

  getActivities(userId: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  getCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  getUserProgress(userId: string): Promise<UserProgress[]>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;

  getAiTools(): Promise<AiTool[]>;
  createAiTool(tool: InsertAiTool): Promise<AiTool>;

  getToolRequests(): Promise<ToolRequest[]>;
  createToolRequest(request: InsertToolRequest): Promise<ToolRequest>;
  updateToolRequestStatus(id: string, status: string): Promise<ToolRequest | undefined>;

  getPolicies(): Promise<Policy[]>;
  createPolicy(policy: InsertPolicy): Promise<Policy>;

  getAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;

  createNqCalculation(calc: InsertNqCalculation): Promise<NqCalculation>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.xp));
  }

  async getChampions(): Promise<User[]> {
    return db.select().from(users).where(eq(users.isChampion, true)).orderBy(desc(users.nqScore));
  }

  async getTeams(): Promise<Team[]> {
    return db.select().from(teams);
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const [created] = await db.insert(teams).values(team).returning();
    return created;
  }

  async getActivities(userId: string): Promise<Activity[]> {
    return db.select().from(activities).where(eq(activities.userId, userId)).orderBy(desc(activities.createdAt)).limit(20);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [created] = await db.insert(activities).values(activity).returning();
    return created;
  }

  async getCourses(): Promise<Course[]> {
    return db.select().from(courses).orderBy(courses.orderIndex);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [created] = await db.insert(courses).values(course).returning();
    return created;
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [created] = await db.insert(userProgress).values(progress).returning();
    return created;
  }

  async getAiTools(): Promise<AiTool[]> {
    return db.select().from(aiTools);
  }

  async createAiTool(tool: InsertAiTool): Promise<AiTool> {
    const [created] = await db.insert(aiTools).values(tool).returning();
    return created;
  }

  async getToolRequests(): Promise<ToolRequest[]> {
    return db.select().from(toolRequests).orderBy(desc(toolRequests.createdAt));
  }

  async createToolRequest(request: InsertToolRequest): Promise<ToolRequest> {
    const [created] = await db.insert(toolRequests).values(request).returning();
    return created;
  }

  async updateToolRequestStatus(id: string, status: string): Promise<ToolRequest | undefined> {
    const [updated] = await db.update(toolRequests).set({ status }).where(eq(toolRequests.id, id)).returning();
    return updated;
  }

  async getPolicies(): Promise<Policy[]> {
    return db.select().from(policies);
  }

  async createPolicy(policy: InsertPolicy): Promise<Policy> {
    const [created] = await db.insert(policies).values(policy).returning();
    return created;
  }

  async getAlerts(): Promise<Alert[]> {
    return db.select().from(alerts).where(eq(alerts.dismissed, false)).orderBy(desc(alerts.createdAt));
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [created] = await db.insert(alerts).values(alert).returning();
    return created;
  }

  async createNqCalculation(calc: InsertNqCalculation): Promise<NqCalculation> {
    const [created] = await db.insert(nqCalculations).values(calc).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
