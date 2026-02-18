export type Skill = "dataFluency" | "adaptiveMindset" | "verificationInstinct" | "orchestration" | "proactiveExperimentation" | "systemsRedesign";

export interface BinaryQuestion {
  id: number;
  skill: Skill;
  prompt: string;
  optionA: string;
  optionB: string;
  scoringA: number;
  scoringB: number;
}

export interface ScenarioOption {
  text: string;
  skills: Partial<Record<Skill, number>>;
}

export interface Scenario {
  id: number;
  title: string;
  primarySkill: Skill;
  narrative: string;
  options: ScenarioOption[];
}

export interface RoleTask {
  name: string;
  defaultHours: number;
  automationScore: number;
}

export const SKILL_META: Record<Skill, { name: string; shortName: string }> = {
  dataFluency: { name: "Data Fluency", shortName: "Data" },
  adaptiveMindset: { name: "Adaptive Mindset", shortName: "Adapt" },
  verificationInstinct: { name: "Verification Instinct", shortName: "Verify" },
  orchestration: { name: "Orchestration", shortName: "Orchestrate" },
  proactiveExperimentation: { name: "Proactive Experimentation", shortName: "Explore" },
  systemsRedesign: { name: "Systems Redesign", shortName: "Redesign" },
};

export const BINARY_QUESTIONS: BinaryQuestion[] = [
  { id: 1, skill: "dataFluency", prompt: "A chart contradicts your intuition.", optionA: "Dig into the data", optionB: "Trust my experience", scoringA: 10, scoringB: 3 },
  { id: 2, skill: "dataFluency", prompt: "Weather app says 30% chance of rain.", optionA: "Probably won't rain", optionB: "I'm bringing an umbrella", scoringA: 4, scoringB: 9 },
  { id: 3, skill: "adaptiveMindset", prompt: "A tool you've used for years gets replaced.", optionA: "Excited to explore", optionB: "Frustrated to relearn", scoringA: 10, scoringB: 3 },
  { id: 4, skill: "adaptiveMindset", prompt: "Asked to do something you've never done.", optionA: "Energized", optionB: "Anxious", scoringA: 10, scoringB: 3 },
  { id: 5, skill: "verificationInstinct", prompt: "GPS says left. Your gut says right.", optionA: "Follow the GPS", optionB: "Check the map myself", scoringA: 3, scoringB: 10 },
  { id: 6, skill: "verificationInstinct", prompt: "An expert says something surprising on TV.", optionA: "I'd want a second source", optionB: "They're the expert", scoringA: 10, scoringB: 3 },
  { id: 7, skill: "orchestration", prompt: "Someone offers to handle a task you care about.", optionA: "Delegate and review", optionB: "Do it myself", scoringA: 10, scoringB: 3 },
  { id: 8, skill: "orchestration", prompt: "A colleague's draft isn't great but has good ideas.", optionA: "Build on it", optionB: "Start fresh", scoringA: 10, scoringB: 4 },
  { id: 9, skill: "proactiveExperimentation", prompt: "Your afternoon unexpectedly frees up.", optionA: "Explore something new", optionB: "Get ahead on existing work", scoringA: 10, scoringB: 4 },
  { id: 10, skill: "proactiveExperimentation", prompt: "You don't know how to do something.", optionA: "Figure it out myself", optionB: "Ask someone who knows", scoringA: 10, scoringB: 5 },
  { id: 11, skill: "systemsRedesign", prompt: "A process at work has always been done one way.", optionA: "Ask why", optionB: "If it works, leave it", scoringA: 10, scoringB: 2 },
  { id: 12, skill: "systemsRedesign", prompt: "A problem keeps coming back despite fixes.", optionA: "Redesign the system", optionB: "Execute the fix better", scoringA: 10, scoringB: 4 },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 1, title: "The Restaurant", primarySkill: "dataFluency",
    narrative: "Picking a restaurant for a special dinner. A friend swears by a place. An app shows a different one: 4.8 stars, 2,000 reviews.",
    options: [
      { text: "Go with my friend \u2014 personal taste beats ratings", skills: { dataFluency: 3, orchestration: 5 } },
      { text: "Go with the app \u2014 2,000 reviews can\u2019t be wrong", skills: { dataFluency: 5 } },
      { text: "Read 10 recent reviews to check if they match what I want", skills: { dataFluency: 10, verificationInstinct: 7 } },
      { text: "Look up both on Instagram to see real photos", skills: { dataFluency: 7, verificationInstinct: 5 } },
    ],
  },
  {
    id: 2, title: "The Numbers", primarySkill: "verificationInstinct",
    narrative: "In a meeting. A colleague presents numbers that feel off. Nothing obviously wrong, but your gut flags something. Everyone else is nodding.",
    options: [
      { text: "Stay quiet \u2014 I don\u2019t have proof", skills: { verificationInstinct: 2 } },
      { text: "Ask: Can you walk me through how we got that number?", skills: { verificationInstinct: 10, dataFluency: 6 } },
      { text: "Note it down, check after the meeting", skills: { verificationInstinct: 7, proactiveExperimentation: 4 } },
      { text: "Say: Something feels off \u2014 can we pause on this?", skills: { verificationInstinct: 8, adaptiveMindset: 5 } },
    ],
  },
  {
    id: 3, title: "The Detour", primarySkill: "adaptiveMindset",
    narrative: "Driving to something important. Usual route completely blocked. 20 minutes left.",
    options: [
      { text: "Follow the detour signs", skills: { adaptiveMindset: 4 } },
      { text: "Open the map, find a completely different route", skills: { adaptiveMindset: 10, systemsRedesign: 5 } },
      { text: "Call ahead to say I might be late, then figure it out calmly", skills: { adaptiveMindset: 8, orchestration: 6 } },
      { text: "Push through as fast as possible", skills: { adaptiveMindset: 2 } },
    ],
  },
  {
    id: 4, title: "The Deal", primarySkill: "verificationInstinct",
    narrative: "Online deal: 80% off something you\u2019ve wanted. Website looks professional. All 5-star reviews. But the price is way below market.",
    options: [
      { text: "Buy it \u2014 reviews are good, site looks legit", skills: { verificationInstinct: 1 } },
      { text: "Google the website name + \u2018scam\u2019", skills: { verificationInstinct: 9, dataFluency: 5 } },
      { text: "Read reviews carefully \u2014 look for fake patterns", skills: { verificationInstinct: 10, dataFluency: 7 } },
      { text: "Skip it \u2014 too good to be true", skills: { verificationInstinct: 7 } },
    ],
  },
  {
    id: 5, title: "The Delegation", primarySkill: "orchestration",
    narrative: "Leading a project. One team member is better than you at the critical part. High stakes. You\u2019re responsible.",
    options: [
      { text: "Let them lead it, review everything before it ships", skills: { orchestration: 10, verificationInstinct: 5 } },
      { text: "Let them lead it, trust their expertise fully", skills: { orchestration: 7, adaptiveMindset: 5 } },
      { text: "Work on it together \u2014 my oversight plus their skill", skills: { orchestration: 8, proactiveExperimentation: 4 } },
      { text: "Handle it myself \u2014 can\u2019t afford mistakes", skills: { orchestration: 2 } },
    ],
  },
  {
    id: 6, title: "The Brief", primarySkill: "orchestration",
    narrative: "You need someone else to execute a task that matters a lot. How do you brief them?",
    options: [
      { text: "Step-by-step instructions with regular check-ins", skills: { orchestration: 5 } },
      { text: "Explain the goal and constraints, let them figure out the how", skills: { orchestration: 10, adaptiveMindset: 5 } },
      { text: "Do a trial run together, then let them go solo", skills: { orchestration: 8, proactiveExperimentation: 6 } },
      { text: "Show them a great example: make it like this", skills: { orchestration: 6, systemsRedesign: 3 } },
    ],
  },
  {
    id: 7, title: "The Broken Process", primarySkill: "proactiveExperimentation",
    narrative: "A weekly report everyone does takes 4 hours because of a clunky step. Nobody complains. It\u2019s \u201chow it\u2019s done.\u201d",
    options: [
      { text: "Spend personal time figuring out how to fix it", skills: { proactiveExperimentation: 8, systemsRedesign: 6 } },
      { text: "Flag it to my manager", skills: { proactiveExperimentation: 3 } },
      { text: "Build a fix for myself \u2014 share it if it works", skills: { proactiveExperimentation: 10, systemsRedesign: 7 } },
      { text: "Not my problem \u2014 focus on my priorities", skills: { proactiveExperimentation: 1 } },
    ],
  },
  {
    id: 8, title: "The Tradition", primarySkill: "systemsRedesign",
    narrative: "Weekly all-hands meeting. 200 people. 10 years running. Most check their phones. Leadership says it\u2019s \u201cimportant for culture.\u201d",
    options: [
      { text: "Replace it: async update + monthly real discussion", skills: { systemsRedesign: 10, proactiveExperimentation: 5 } },
      { text: "Keep it but completely redesign the format", skills: { systemsRedesign: 8, adaptiveMindset: 5 } },
      { text: "It has subtle value even if engagement is low", skills: { systemsRedesign: 2 } },
      { text: "Run a 4-week experiment: new format vs. old, measure the difference", skills: { systemsRedesign: 9, dataFluency: 7, proactiveExperimentation: 8 } },
    ],
  },
  {
    id: 9, title: "The Free Saturday", primarySkill: "proactiveExperimentation",
    narrative: "Free Saturday, nothing planned. What actually happens?",
    options: [
      { text: "Deep rabbit hole \u2014 YouTube, podcasts, something I\u2019m curious about", skills: { proactiveExperimentation: 7, dataFluency: 4 } },
      { text: "Catch up on things I\u2019ve been putting off", skills: { proactiveExperimentation: 3 } },
      { text: "Hang out, go out, relax", skills: { proactiveExperimentation: 2 } },
      { text: "Tinker with something \u2014 a project, a tool, an idea", skills: { proactiveExperimentation: 10, systemsRedesign: 5 } },
    ],
  },
  {
    id: 10, title: "The Worried Friend", primarySkill: "adaptiveMindset",
    narrative: "A friend is genuinely anxious about AI taking their job. Asks: \u201cShould I be scared?\u201d",
    options: [
      { text: "Some jobs will change. Yours will probably evolve, not disappear.", skills: { adaptiveMindset: 8, dataFluency: 5 } },
      { text: "People have worried about this with every technology.", skills: { adaptiveMindset: 5 } },
      { text: "Look at which parts of your job are routine vs. creative. The routine parts might change.", skills: { adaptiveMindset: 9, systemsRedesign: 6, dataFluency: 7 } },
      { text: "I don\u2019t know enough yet. Let\u2019s both look into it.", skills: { adaptiveMindset: 7, verificationInstinct: 6, proactiveExperimentation: 5 } },
    ],
  },
];

export const ASSESSMENT_ROLES = [
  "Marketing", "Sales", "People & HR", "Finance", "Product",
  "Legal", "Operations", "Engineering", "Leadership", "Customer Service", "Other",
] as const;

export type AssessmentRole = typeof ASSESSMENT_ROLES[number];

export const AI_USAGE_OPTIONS = [
  { value: "none", label: "What AI tools?", icon: "help" },
  { value: "tried", label: "Tried them", icon: "eye" },
  { value: "sometimes", label: "Sometimes", icon: "refresh" },
  { value: "often", label: "Most days", icon: "zap" },
  { value: "essential", label: "Can't work without them", icon: "brain" },
] as const;

export const ROLE_TASKS: Record<AssessmentRole, RoleTask[]> = {
  "Marketing": [
    { name: "Writing copy & content", defaultHours: 8, automationScore: 82 },
    { name: "Social media creation", defaultHours: 5, automationScore: 75 },
    { name: "Campaign analysis", defaultHours: 4, automationScore: 70 },
    { name: "Market research", defaultHours: 3, automationScore: 68 },
    { name: "Presentations & reports", defaultHours: 4, automationScore: 55 },
    { name: "Meetings & alignment", defaultHours: 6, automationScore: 15 },
    { name: "Strategic planning", defaultHours: 5, automationScore: 20 },
    { name: "Admin & coordination", defaultHours: 3, automationScore: 78 },
  ],
  "Sales": [
    { name: "Prospecting & research", defaultHours: 6, automationScore: 80 },
    { name: "Outreach emails", defaultHours: 6, automationScore: 85 },
    { name: "CRM & pipeline", defaultHours: 4, automationScore: 72 },
    { name: "Proposals & decks", defaultHours: 5, automationScore: 60 },
    { name: "Data analysis & forecasting", defaultHours: 3, automationScore: 68 },
    { name: "Client calls & relationships", defaultHours: 8, automationScore: 10 },
    { name: "Negotiation & closing", defaultHours: 4, automationScore: 8 },
    { name: "Internal meetings", defaultHours: 3, automationScore: 15 },
  ],
  "People & HR": [
    { name: "Resume screening", defaultHours: 6, automationScore: 85 },
    { name: "Job descriptions & policies", defaultHours: 3, automationScore: 70 },
    { name: "Employee data & compliance", defaultHours: 5, automationScore: 75 },
    { name: "Onboarding processes", defaultHours: 4, automationScore: 55 },
    { name: "Performance management", defaultHours: 3, automationScore: 40 },
    { name: "Coaching & conflict resolution", defaultHours: 5, automationScore: 10 },
    { name: "Culture & engagement", defaultHours: 4, automationScore: 15 },
    { name: "Benefits & queries", defaultHours: 3, automationScore: 65 },
  ],
  "Finance": [
    { name: "Data & spreadsheets", defaultHours: 7, automationScore: 80 },
    { name: "Reporting", defaultHours: 5, automationScore: 75 },
    { name: "Variance & reconciliation", defaultHours: 5, automationScore: 72 },
    { name: "Forecasting & models", defaultHours: 4, automationScore: 55 },
    { name: "Presentations", defaultHours: 3, automationScore: 50 },
    { name: "Strategic planning", defaultHours: 4, automationScore: 18 },
    { name: "Budget reviews", defaultHours: 3, automationScore: 25 },
    { name: "Audit & compliance", defaultHours: 3, automationScore: 45 },
  ],
  "Product": [
    { name: "Status & documentation", defaultHours: 4, automationScore: 70 },
    { name: "Meeting notes", defaultHours: 3, automationScore: 82 },
    { name: "Specs & requirements", defaultHours: 5, automationScore: 50 },
    { name: "User research synthesis", defaultHours: 4, automationScore: 45 },
    { name: "Roadmap management", defaultHours: 4, automationScore: 35 },
    { name: "Stakeholder communication", defaultHours: 6, automationScore: 15 },
    { name: "Prioritization", defaultHours: 5, automationScore: 20 },
    { name: "Sprint planning", defaultHours: 3, automationScore: 25 },
  ],
  "Legal": [
    { name: "Contract review", defaultHours: 7, automationScore: 55 },
    { name: "Legal research", defaultHours: 5, automationScore: 70 },
    { name: "Compliance docs", defaultHours: 5, automationScore: 65 },
    { name: "Policy drafting", defaultHours: 3, automationScore: 50 },
    { name: "Due diligence", defaultHours: 4, automationScore: 45 },
    { name: "Advisory", defaultHours: 5, automationScore: 10 },
    { name: "Negotiation", defaultHours: 4, automationScore: 8 },
    { name: "Regulatory monitoring", defaultHours: 3, automationScore: 72 },
  ],
  "Operations": [
    { name: "Process documentation", defaultHours: 5, automationScore: 72 },
    { name: "Data entry & systems", defaultHours: 5, automationScore: 88 },
    { name: "Reporting & dashboards", defaultHours: 4, automationScore: 75 },
    { name: "Vendor management", defaultHours: 4, automationScore: 35 },
    { name: "QC & audits", defaultHours: 4, automationScore: 50 },
    { name: "Coordination", defaultHours: 5, automationScore: 18 },
    { name: "Problem-solving", defaultHours: 4, automationScore: 15 },
    { name: "Budget tracking", defaultHours: 3, automationScore: 70 },
  ],
  "Engineering": [
    { name: "Writing code", defaultHours: 12, automationScore: 45 },
    { name: "Code review & debug", defaultHours: 5, automationScore: 40 },
    { name: "Documentation", defaultHours: 3, automationScore: 75 },
    { name: "Architecture & design", defaultHours: 4, automationScore: 20 },
    { name: "Testing", defaultHours: 3, automationScore: 65 },
    { name: "Meetings & sprints", defaultHours: 4, automationScore: 15 },
    { name: "Research & learning", defaultHours: 3, automationScore: 30 },
    { name: "DevOps", defaultHours: 3, automationScore: 55 },
  ],
  "Leadership": [
    { name: "Email management", defaultHours: 5, automationScore: 70 },
    { name: "Meetings & 1:1s", defaultHours: 10, automationScore: 10 },
    { name: "Report review", defaultHours: 4, automationScore: 55 },
    { name: "Strategy & decisions", defaultHours: 6, automationScore: 12 },
    { name: "Presentations & board prep", defaultHours: 4, automationScore: 50 },
    { name: "People management", defaultHours: 4, automationScore: 8 },
    { name: "External relationships", defaultHours: 4, automationScore: 10 },
    { name: "Admin & scheduling", defaultHours: 3, automationScore: 80 },
  ],
  "Customer Service": [
    { name: "Tickets & inquiries", defaultHours: 10, automationScore: 75 },
    { name: "Templated responses", defaultHours: 5, automationScore: 90 },
    { name: "Escalations", defaultHours: 4, automationScore: 25 },
    { name: "Knowledge base", defaultHours: 3, automationScore: 70 },
    { name: "CRM updates", defaultHours: 3, automationScore: 82 },
    { name: "Metrics & reporting", defaultHours: 3, automationScore: 75 },
    { name: "Training docs", defaultHours: 3, automationScore: 65 },
    { name: "Team meetings", defaultHours: 3, automationScore: 12 },
  ],
  "Other": [
    { name: "Email & communication", defaultHours: 5, automationScore: 70 },
    { name: "Reporting & documentation", defaultHours: 5, automationScore: 72 },
    { name: "Data entry & admin", defaultHours: 4, automationScore: 85 },
    { name: "Research & analysis", defaultHours: 4, automationScore: 55 },
    { name: "Meetings & coordination", defaultHours: 6, automationScore: 15 },
    { name: "Project management", defaultHours: 5, automationScore: 35 },
    { name: "Creative & strategic work", defaultHours: 5, automationScore: 18 },
    { name: "Learning & development", defaultHours: 3, automationScore: 30 },
  ],
};

export function getAutomationCategory(score: number): "essential" | "augmentable" | "automatable" {
  if (score <= 30) return "essential";
  if (score <= 65) return "augmentable";
  return "automatable";
}

export const CONCERN_OPTIONS = [
  "Replacing my job",
  "Skills becoming irrelevant",
  "Can't keep up",
  "Don't trust outputs",
  "Not concerned",
  "Haven't thought about it",
] as const;

export const HOPE_OPTIONS = [
  "Kill boring tasks",
  "Better decisions",
  "Grow faster",
  "Free time for creative work",
  "Not sure yet",
] as const;

export const SKILL_INSIGHTS: Record<Skill, Record<"high" | "mid" | "low", string>> = {
  dataFluency: {
    high: "You question data naturally. When AI gives you a confidence score, you'll know what it actually means.",
    mid: "You're data-aware but sometimes defer to authority. AI outputs need the same scrutiny as any data source.",
    low: "You tend to trust data at face value. AI generates confident-looking outputs that are sometimes completely wrong.",
  },
  adaptiveMindset: {
    high: "Change energizes you. You'll be among the first to find value in every new AI capability that emerges.",
    mid: "You adapt when pushed but don't always seek change. The AI landscape moves fast \u2014 proactive adapters win.",
    low: "New tools stress you. AI capabilities change monthly. Building comfort with change is your highest-leverage move.",
  },
  verificationInstinct: {
    high: "You question everything \u2014 even experts. That's exactly the instinct AI demands. You won't be fooled by confident hallucinations.",
    mid: "You verify sometimes but trust authority often. AI is confident about everything \u2014 even when it's wrong.",
    low: "You trust confident sources. AI is confident about everything \u2014 even when it's wrong. This is your biggest blind spot.",
  },
  orchestration: {
    high: "You delegate well and calibrate trust. That's the core skill for AI collaboration \u2014 knowing when to hand off vs. override.",
    mid: "You delegate but sometimes over-control. AI works best when you define the goal and let it find the path.",
    low: "You prefer doing things yourself. AI is a team member that needs direction, not micromanagement or avoidance.",
  },
  proactiveExperimentation: {
    high: "You tinker, explore, and build without permission. You'll discover AI use cases others haven't imagined yet.",
    mid: "You explore when prompted but rarely self-direct. The biggest AI gains come from personal experimentation.",
    low: "You wait for instructions before trying new things. The people transforming fastest are experimenting on their own.",
  },
  systemsRedesign: {
    high: "You think in systems, not patches. You'll see AI opportunities others miss because you reimagine entire workflows.",
    mid: "You improve processes but rarely redesign them from zero. The biggest AI wins come from reimagining, not optimizing.",
    low: "You tend to optimize existing processes. AI's biggest value isn't speed \u2014 it's making old workflows obsolete.",
  },
};

export function computeSQScore(
  binaryAnswers: ("A" | "B")[],
  scenarioAnswers: number[],
  taskHours: number[],
  role: AssessmentRole,
  drains: number[],
  aiUsage: string
): {
  overallScore: number;
  level: string;
  skillScores: Record<Skill, number>;
  recoverableHours: number;
  recoverableHoursYear: number;
  estimatedDollarsSaved: number;
  taskBreakdown: Array<{ name: string; hours: number; automationScore: number; category: string; isDrain: boolean }>;
  personalitySummary: string;
} {
  const skills: Record<Skill, number[]> = {
    dataFluency: [], adaptiveMindset: [], verificationInstinct: [],
    orchestration: [], proactiveExperimentation: [], systemsRedesign: [],
  };

  BINARY_QUESTIONS.forEach((q, i) => {
    const answer = binaryAnswers[i];
    if (answer) {
      skills[q.skill].push(answer === "A" ? q.scoringA : q.scoringB);
    }
  });

  SCENARIOS.forEach((s, i) => {
    const chosenIdx = scenarioAnswers[i];
    if (chosenIdx !== undefined && chosenIdx !== -1) {
      const option = s.options[chosenIdx];
      for (const [skill, score] of Object.entries(option.skills)) {
        skills[skill as Skill].push(score);
      }
    }
  });

  const aiBonus = aiUsage === "essential" ? 5 : aiUsage === "often" ? 3 : aiUsage === "sometimes" ? 1 : 0;

  const skillScores: Record<Skill, number> = {} as any;
  const allSkills: Skill[] = ["dataFluency", "adaptiveMindset", "verificationInstinct", "orchestration", "proactiveExperimentation", "systemsRedesign"];

  for (const skill of allSkills) {
    const vals = skills[skill];
    if (vals.length === 0) {
      skillScores[skill] = 40;
    } else {
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      skillScores[skill] = Math.min(100, Math.max(5, Math.round(avg * 10 + aiBonus)));
    }
  }

  const tasks = ROLE_TASKS[role] || ROLE_TASKS["Marketing"];
  let totalHours = 0;
  let recoverableHours = 0;

  const taskBreakdown = tasks.map((task, i) => {
    const hours = taskHours[i] ?? task.defaultHours;
    totalHours += hours;
    const category = getAutomationCategory(task.automationScore);
    let recovered = 0;
    if (category === "automatable") recovered = hours * 0.8;
    else if (category === "augmentable") recovered = hours * 0.4;
    recoverableHours += recovered;
    return {
      name: task.name,
      hours,
      automationScore: task.automationScore,
      category,
      isDrain: drains.includes(i),
    };
  });

  recoverableHours = Math.round(recoverableHours * 10) / 10;
  const recoverableHoursYear = Math.round(recoverableHours * 48);
  const estimatedDollarsSaved = Math.round(recoverableHours * 48 * 55);

  const skillValues = Object.values(skillScores);
  const avgSkill = skillValues.reduce((a, b) => a + b, 0) / skillValues.length;
  const overallScore = Math.min(100, Math.max(5, Math.round(avgSkill)));

  let level = "Novice";
  if (overallScore >= 80) level = "Superagent";
  else if (overallScore >= 65) level = "Catalyst";
  else if (overallScore >= 50) level = "Practitioner";
  else if (overallScore >= 35) level = "Adapter";
  else if (overallScore >= 20) level = "Aware";

  const sortedSkills = allSkills.sort((a, b) => skillScores[b] - skillScores[a]);
  const topSkill = SKILL_META[sortedSkills[0]].name;
  const weakSkill = SKILL_META[sortedSkills[sortedSkills.length - 1]].name;

  const summaries = [
    `Your strongest instinct is ${topSkill}. Your growth edge is ${weakSkill}. That's a superpower with one blind spot.`,
    `You lead with ${topSkill} and think before acting. ${weakSkill} is where AI could challenge you to grow.`,
    `${topSkill} comes naturally to you. Building ${weakSkill} will unlock capabilities you haven't seen yet.`,
  ];
  const personalitySummary = summaries[overallScore % summaries.length];

  return {
    overallScore, level, skillScores, recoverableHours,
    recoverableHoursYear, estimatedDollarsSaved, taskBreakdown,
    personalitySummary,
  };
}

export function getFearBridge(concern: string, recoverableHours: number, topSkill: Skill, skillScores: Record<Skill, number>): string | null {
  const topName = SKILL_META[topSkill].name;
  const hours = Math.round(recoverableHours);
  switch (concern) {
    case "Replacing my job":
      return `The parts most at risk are the automatable ones \u2014 you spend ~${hours}h/week on those. But your ${topName} score (${skillScores[topSkill]}) shows the human skills that become MORE valuable. The move: free the ${hours} hours, invest in what makes you irreplaceable.`;
    case "Skills becoming irrelevant":
      return `The skills that become irrelevant are the automatable ones \u2014 you spend ~${hours}h/week on those. The skills that become MORE valuable are where you're already strong. The move: free the ${hours} hours, invest in the skills where you're irreplaceable.`;
    case "Can't keep up":
      return `You don't need to learn every tool. Focus on the ${hours}h/week of automatable tasks first \u2014 start small, automate one thing this week. Your ${topName} instinct (${skillScores[topSkill]}) means you'll adapt faster than you think.`;
    case "Don't trust outputs":
      return `Good instinct. AI outputs should be verified, not trusted blindly. Your job isn't to trust AI \u2014 it's to direct it. With ${hours}h/week of recoverable time, you can use AI where trust is less critical and keep human judgment where it matters.`;
    default:
      return null;
  }
}
