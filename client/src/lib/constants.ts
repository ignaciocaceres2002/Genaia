export const ROLE_TASKS: Record<string, Array<{ name: string; defaultHours: number; category: "automatable" | "augmentable" | "essential" }>> = {
  Marketing: [
    { name: "Content Writing & Copywriting", defaultHours: 12, category: "automatable" },
    { name: "Social Media Management", defaultHours: 8, category: "augmentable" },
    { name: "Campaign Strategy & Planning", defaultHours: 6, category: "essential" },
    { name: "Data Analysis & Reporting", defaultHours: 5, category: "automatable" },
    { name: "Creative Direction & Branding", defaultHours: 4, category: "essential" },
    { name: "Email Marketing", defaultHours: 3, category: "augmentable" },
    { name: "Stakeholder Communication", defaultHours: 2, category: "essential" },
  ],
  Sales: [
    { name: "Prospect Research", defaultHours: 10, category: "automatable" },
    { name: "Email Outreach & Follow-ups", defaultHours: 8, category: "automatable" },
    { name: "CRM Data Entry", defaultHours: 5, category: "automatable" },
    { name: "Proposal Creation", defaultHours: 6, category: "augmentable" },
    { name: "Client Meetings & Demos", defaultHours: 8, category: "essential" },
    { name: "Pipeline Strategy", defaultHours: 3, category: "essential" },
    { name: "Negotiation & Closing", defaultHours: 4, category: "essential" },
  ],
  "People Ops": [
    { name: "Resume Screening", defaultHours: 10, category: "automatable" },
    { name: "Interview Scheduling", defaultHours: 5, category: "automatable" },
    { name: "Onboarding Documentation", defaultHours: 6, category: "augmentable" },
    { name: "Policy Compliance Tracking", defaultHours: 4, category: "augmentable" },
    { name: "Employee Engagement", defaultHours: 5, category: "essential" },
    { name: "Culture & Team Building", defaultHours: 4, category: "essential" },
    { name: "Conflict Resolution", defaultHours: 3, category: "essential" },
  ],
  Finance: [
    { name: "Data Entry & Reconciliation", defaultHours: 10, category: "automatable" },
    { name: "Financial Modeling", defaultHours: 8, category: "augmentable" },
    { name: "Report Generation", defaultHours: 6, category: "automatable" },
    { name: "Variance Analysis", defaultHours: 5, category: "augmentable" },
    { name: "Strategic Planning", defaultHours: 4, category: "essential" },
    { name: "Stakeholder Presentations", defaultHours: 3, category: "essential" },
    { name: "Risk Assessment", defaultHours: 4, category: "essential" },
  ],
  Product: [
    { name: "User Research Synthesis", defaultHours: 6, category: "augmentable" },
    { name: "Requirements Documentation", defaultHours: 8, category: "augmentable" },
    { name: "Competitive Analysis", defaultHours: 5, category: "automatable" },
    { name: "Backlog Grooming", defaultHours: 4, category: "augmentable" },
    { name: "Strategic Roadmapping", defaultHours: 5, category: "essential" },
    { name: "Cross-functional Alignment", defaultHours: 6, category: "essential" },
    { name: "Customer Conversations", defaultHours: 4, category: "essential" },
  ],
  Legal: [
    { name: "Contract Review", defaultHours: 12, category: "augmentable" },
    { name: "Legal Research", defaultHours: 8, category: "automatable" },
    { name: "Document Drafting", defaultHours: 7, category: "augmentable" },
    { name: "Compliance Monitoring", defaultHours: 5, category: "augmentable" },
    { name: "Client Counseling", defaultHours: 4, category: "essential" },
    { name: "Litigation Strategy", defaultHours: 3, category: "essential" },
    { name: "Negotiation", defaultHours: 3, category: "essential" },
  ],
};

export function calculateNQ(role: string, taskHours: number[]): { score: number; level: string; hoursPerWeek: number; recoverableHours: number; dollarsSaved: number; taskBreakdown: Array<{ name: string; hours: number; category: string }> } {
  const tasks = ROLE_TASKS[role];
  if (!tasks) return { score: 0, level: "Unknown", hoursPerWeek: 0, recoverableHours: 0, dollarsSaved: 0, taskBreakdown: [] };

  let totalHours = 0;
  let recoverableHours = 0;
  const taskBreakdown = tasks.map((task, i) => {
    const hours = taskHours[i] ?? task.defaultHours;
    totalHours += hours;
    if (task.category === "automatable") recoverableHours += hours * 0.8;
    else if (task.category === "augmentable") recoverableHours += hours * 0.4;
    return { name: task.name, hours, category: task.category };
  });

  const avgHourlyRate = 55;
  const dollarsSaved = Math.round(recoverableHours * 48 * avgHourlyRate);
  const automationRatio = totalHours > 0 ? recoverableHours / totalHours : 0;
  const rawScore = Math.round(30 + automationRatio * 50 + Math.random() * 15);
  const score = Math.min(100, Math.max(10, rawScore));

  let level = "Novice";
  if (score >= 75) level = "Catalyst";
  else if (score >= 60) level = "Practitioner";
  else if (score >= 45) level = "Adapter";
  else if (score >= 30) level = "Aware";

  return { score, level, hoursPerWeek: totalHours, recoverableHours: Math.round(recoverableHours * 10) / 10, dollarsSaved, taskBreakdown };
}
