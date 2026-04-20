import fs from "fs/promises";
import path from "path";
import type {
  User, InsertUser, Team, InsertTeam, Activity, InsertActivity, Course, InsertCourse,
  IStorage
} from "../storage";

const dataDir = path.dirname(new URL(import.meta.url).pathname);

function readJSON<T>(file: string): Promise<T[]> {
  return fs.readFile(path.join(dataDir, file), "utf-8").then(JSON.parse);
}
function writeJSON<T>(file: string, data: T[]): Promise<void> {
  return fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2), "utf-8");
}

export class MockStorage implements IStorage {
  async getUser(id: string) {
    const users = await readJSON<User>("users.json");
    return users.find(u => u.id === id);
  }
  async getUserByUsername(username: string) {
    const users = await readJSON<User>("users.json");
    return users.find(u => u.username === username);
  }
  async createUser(user: InsertUser) {
    const users = await readJSON<User>("users.json");
    const newUser = { ...user, id: (users.length + 1).toString() };
    users.push(newUser);
    await writeJSON("users.json", users);
    return newUser;
  }
  async getAllUsers() {
    return readJSON<User>("users.json");
  }
  async getChampions() {
    const users = await readJSON<User>("users.json");
    return users.filter(u => u.isChampion);
  }
  async getTeams() {
    return readJSON<Team>("teams.json");
  }
  async createTeam(team: InsertTeam) {
    const teams = await readJSON<Team>("teams.json");
    const newTeam = { ...team, id: (teams.length + 1).toString() };
    teams.push(newTeam);
    await writeJSON("teams.json", teams);
    return newTeam;
  }
  async getActivities(userId: string) {
    const acts = await readJSON<Activity>("activities.json");
    return acts.filter(a => a.userId === userId);
  }
  async createActivity(activity: InsertActivity) {
    const acts = await readJSON<Activity>("activities.json");
    const newAct = { ...activity, id: (acts.length + 1).toString() };
    acts.push(newAct);
    await writeJSON("activities.json", acts);
    return newAct;
  }
  async getCourses() {
    return readJSON<Course>("courses.json");
  }
  async createCourse(course: InsertCourse) {
    const courses = await readJSON<Course>("courses.json");
    const newCourse = { ...course, id: (courses.length + 1).toString() };
    courses.push(newCourse);
    await writeJSON("courses.json", courses);
    return newCourse;
  }
  // Métodos no implementados para otros modelos
  async getUserProgress() { return []; }
  async createUserProgress() { return null as any; }
  async getAiTools() { return []; }
  async createAiTool() { return null as any; }
  async getToolRequests() { return []; }
  async createToolRequest() { return null as any; }
  async updateToolRequestStatus() { return null as any; }
  async getPolicies() { return []; }
  async createPolicy() { return null as any; }
  async getAlerts() { return []; }
  async createAlert() { return null as any; }
  async createSqCalculation() { return null as any; }
  async createSqAssessment() { return null as any; }
  async getAiUseCases() { return []; }
  async getAiUseCasesByUser() { return []; }
  async createAiUseCase() { return null as any; }
  async getBenefits() { return []; }
  async createBenefit() { return null as any; }
  async getImportedEmployees() { return []; }
  async bulkCreateImportedEmployees() { return []; }
}
