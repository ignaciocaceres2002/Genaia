import { storage } from "./storage";

export async function seedDatabase() {
  try {
    const existingUser = await storage.getUserByUsername("sarah.chen");
    if (existingUser) return;

    const users = [
      { username: "sarah.chen", password: "demo", name: "Sarah Chen", email: "sarah@company.com", role: "user", department: "Marketing", level: 5, xp: 8450, nqScore: 67, streak: 12, isChampion: false, isAdmin: false, skillScores: { dataFluency: 72, adaptiveMindset: 65, verificationMindset: 78, coIntelligence: 58, autonomousDrive: 70, processReimagination: 60 } },
      { username: "marcus.johnson", password: "demo", name: "Marcus Johnson", email: "marcus@company.com", role: "user", department: "Engineering", level: 7, xp: 22500, nqScore: 88, streak: 45, isChampion: true, isAdmin: false, skillScores: { dataFluency: 90, adaptiveMindset: 85, verificationMindset: 92, coIntelligence: 82, autonomousDrive: 88, processReimagination: 86 } },
      { username: "elena.rodriguez", password: "demo", name: "Elena Rodriguez", email: "elena@company.com", role: "user", department: "Marketing", level: 6, xp: 15200, nqScore: 82, streak: 30, isChampion: true, isAdmin: false, skillScores: { dataFluency: 78, adaptiveMindset: 80, verificationMindset: 85, coIntelligence: 76, autonomousDrive: 84, processReimagination: 89 } },
      { username: "alex.rivera", password: "demo", name: "Alex Rivera", email: "alex@company.com", role: "user", department: "Product", level: 5, xp: 7200, nqScore: 62, streak: 8, isChampion: false, isAdmin: false, skillScores: { dataFluency: 65, adaptiveMindset: 60, verificationMindset: 68, coIntelligence: 55, autonomousDrive: 62, processReimagination: 58 } },
      { username: "priya.patel", password: "demo", name: "Priya Patel", email: "priya@company.com", role: "user", department: "Finance", level: 4, xp: 6800, nqScore: 59, streak: 5, isChampion: false, isAdmin: false, skillScores: { dataFluency: 62, adaptiveMindset: 55, verificationMindset: 64, coIntelligence: 50, autonomousDrive: 58, processReimagination: 52 } },
      { username: "david.kim", password: "demo", name: "David Kim", email: "david@company.com", role: "user", department: "Legal", level: 4, xp: 5100, nqScore: 52, streak: 3, isChampion: false, isAdmin: false, skillScores: { dataFluency: 55, adaptiveMindset: 48, verificationMindset: 58, coIntelligence: 45, autonomousDrive: 52, processReimagination: 48 } },
      { username: "james.wright", password: "demo", name: "James Wright", email: "james@company.com", role: "user", department: "Finance", level: 6, xp: 14500, nqScore: 79, streak: 22, isChampion: true, isAdmin: false, skillScores: { dataFluency: 85, adaptiveMindset: 75, verificationMindset: 82, coIntelligence: 70, autonomousDrive: 78, processReimagination: 74 } },
      { username: "aisha.patel", password: "demo", name: "Aisha Patel", email: "aisha@company.com", role: "user", department: "Product", level: 6, xp: 16200, nqScore: 85, streak: 35, isChampion: true, isAdmin: false, skillScores: { dataFluency: 82, adaptiveMindset: 88, verificationMindset: 80, coIntelligence: 86, autonomousDrive: 90, processReimagination: 84 } },
      { username: "admin", password: "admin", name: "Admin User", email: "admin@company.com", role: "admin", department: "HR", level: 1, xp: 0, nqScore: 0, streak: 0, isChampion: false, isAdmin: true, skillScores: {} as Record<string, number> },
    ];

    for (const u of users) {
      await storage.createUser(u);
    }

    const teamData = [
      { name: "Engineering", department: "Engineering", headcount: 45, avgNq: 62, completionPct: 78, engagementScore: 85, champion: "Marcus Johnson" },
      { name: "Marketing", department: "Marketing", headcount: 22, avgNq: 58, completionPct: 65, engagementScore: 72, champion: "Elena Rodriguez" },
      { name: "Finance", department: "Finance", headcount: 18, avgNq: 51, completionPct: 55, engagementScore: 63, champion: "James Wright" },
      { name: "Product", department: "Product", headcount: 15, avgNq: 66, completionPct: 82, engagementScore: 88, champion: "Aisha Patel" },
      { name: "Sales", department: "Sales", headcount: 30, avgNq: 44, completionPct: 42, engagementScore: 48, champion: null },
      { name: "Legal", department: "Legal", headcount: 10, avgNq: 55, completionPct: 60, engagementScore: 65, champion: "David Kim" },
      { name: "People Ops", department: "People Ops", headcount: 12, avgNq: 60, completionPct: 70, engagementScore: 75, champion: null },
    ];
    for (const t of teamData) await storage.createTeam(t);

    const courseData = [
      { title: "Reading the Machine", skill: "Data Fluency", description: "Learn to interpret AI outputs with confidence", modulesCount: 6, orderIndex: 1 },
      { title: "The Change Lab", skill: "Adaptive Mindset", description: "Build learning agility for the AI era", modulesCount: 5, orderIndex: 2 },
      { title: "Trust But Verify", skill: "Verification Mindset", description: "Master the art of AI verification", modulesCount: 6, orderIndex: 3 },
      { title: "The Tandem", skill: "Co-Intelligence", description: "Design powerful human-AI partnerships", modulesCount: 6, orderIndex: 4 },
      { title: "The Self-Starter", skill: "Autonomous Drive", description: "Lead your own AI transformation", modulesCount: 5, orderIndex: 5 },
      { title: "Reimagine Everything", skill: "Process Reimagination", description: "See the workflows that should exist", modulesCount: 6, orderIndex: 6 },
      { title: "Your AI Playbook", skill: "Role-Specific", description: "Tailored strategies for your exact role", modulesCount: 4, orderIndex: 7 },
      { title: "The Superagent Path", skill: "Advanced", description: "The final push to superhuman capability", modulesCount: 4, orderIndex: 8 },
    ];
    for (const c of courseData) await storage.createCourse(c);

    const toolData = [
      { name: "ChatGPT Enterprise", category: "Chat", vendor: "OpenAI", status: "approved", usageCount: 342 },
      { name: "GitHub Copilot", category: "Code", vendor: "GitHub", status: "approved", usageCount: 189 },
      { name: "Jasper AI", category: "Writing", vendor: "Jasper", status: "approved", usageCount: 156 },
      { name: "Midjourney", category: "Image", vendor: "Midjourney", status: "approved", usageCount: 87 },
      { name: "Tableau AI", category: "Analytics", vendor: "Salesforce", status: "approved", usageCount: 203 },
      { name: "Claude", category: "Assistant", vendor: "Anthropic", status: "approved", usageCount: 278 },
    ];
    for (const t of toolData) await storage.createAiTool(t);

    const policyData = [
      { title: "Acceptable AI Use Policy", category: "General", content: "Full policy content here...", summary: "Guidelines for responsible AI tool usage within the organization, covering approved tools, data handling, and output verification requirements.", version: "2.1", status: "published" },
      { title: "AI Data Privacy Standards", category: "Privacy", content: "Full policy content here...", summary: "Requirements for handling sensitive data when using AI tools, including PII restrictions, data retention policies, and cross-border considerations.", version: "1.3", status: "published" },
      { title: "Client-Facing AI Content", category: "Client-Facing", content: "Full policy content here...", summary: "Standards for using AI-generated content in client communications, presentations, and deliverables. Includes disclosure requirements.", version: "1.0", status: "published" },
      { title: "AI Ethics Framework", category: "Ethics", content: "Full policy content here...", summary: "Core principles guiding AI adoption decisions, bias monitoring, fairness standards, and escalation procedures for ethical concerns.", version: "1.1", status: "published" },
      { title: "Marketing AI Guidelines", category: "Dept-Specific", content: "Full policy content here...", summary: "Department-specific rules for AI use in marketing campaigns, brand voice consistency, and creative asset generation.", version: "1.0", status: "published" },
    ];
    for (const p of policyData) await storage.createPolicy(p);

    const alertData = [
      { type: "Inactivity", severity: "warning", title: "5 team members inactive 14+ days", description: "Sales team members haven't completed any training modules in the last 14 days.", team: "Sales", dismissed: false },
      { type: "SQ Decline", severity: "warning", title: "Sales SQ dropped 3pts", description: "The Sales team average SQ has declined from 47 to 44 over the past week.", team: "Sales", dismissed: false },
      { type: "Shadow AI", severity: "critical", title: "Unapproved tool detected", description: "3 users in Engineering have been using an unapproved AI code generation tool.", team: "Engineering", dismissed: false },
      { type: "Streak Loss", severity: "info", title: "12 users lost their streak", description: "12 users across multiple teams lost their learning streak this week.", team: "Multiple", dismissed: false },
      { type: "Achievement", severity: "info", title: "Marketing hit Catalyst level!", description: "The Marketing team's average SQ has reached 58, qualifying them for Catalyst status.", team: "Marketing", dismissed: false },
    ];
    for (const a of alertData) await storage.createAlert(a);

    const requestData = [
      { userId: "demo", toolName: "Notion AI", reason: "Need for team documentation and knowledge base", task: "Content organization", priority: "high", status: "submitted" },
      { userId: "demo", toolName: "Cursor", reason: "Advanced AI coding assistant for frontend work", task: "Development", priority: "medium", status: "submitted" },
      { userId: "demo", toolName: "Perplexity Pro", reason: "Research and competitive analysis", task: "Market research", priority: "low", status: "submitted" },
    ];
    for (const r of requestData) await storage.createToolRequest(r);

    const sarah = await storage.getUserByUsername("sarah.chen");
    if (sarah) {
      const actData = [
        { userId: sarah.id, type: "course", title: "Completed Trust But Verify Module 3", xpEarned: 200 },
        { userId: sarah.id, type: "practice", title: "Practiced with DataSense Agent", xpEarned: 100 },
        { userId: sarah.id, type: "usecase", title: "Submitted use case: Email Triage", xpEarned: 250 },
        { userId: sarah.id, type: "assessment", title: "Completed Data Fluency Assessment", xpEarned: 300 },
        { userId: sarah.id, type: "course", title: "Finished Reading the Machine Module 1", xpEarned: 150 },
      ];
      for (const a of actData) await storage.createActivity(a);
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Seed error:", error);
  }
}
