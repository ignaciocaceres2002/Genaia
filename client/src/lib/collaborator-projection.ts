import type { User } from "@shared/schema";
import { SKILLS } from "@shared/schema";

type SkillKey = typeof SKILLS[number]["key"];

export interface SkillProjection {
  key: SkillKey;
  name: string;
  currentScore: number;
  propensity: number;
  expectedGain: number;
  projectedScore: number;
  headroom: number;
}

export interface CollaboratorProjection {
  currentSq: number;
  probableSq: number;
  optimisticSq: number;
  conservativeSq: number;
  expectedSqLift: number;
  sqImprovementProbability: number;
  readinessIndex: number;
  momentumLabel: string;
  topFocusSkills: SkillProjection[];
  skillProjections: SkillProjection[];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round(value: number) {
  return Math.round(value);
}

function getMomentumLabel(score: number) {
  if (score >= 75) return "Alta inercia de mejora";
  if (score >= 55) return "Momentum saludable";
  if (score >= 40) return "Momentum emergente";
  return "Necesita impulso guiado";
}

export function getProjectionInputs(user: Partial<User>) {
  const skillScores = (user.skillScores ?? {}) as Record<string, number>;
  const normalizedXp = clamp((user.xp ?? 0) / 20000, 0, 1);
  const normalizedStreak = clamp((user.streak ?? 0) / 30, 0, 1);
  const normalizedSq = clamp((user.nqScore ?? 0) / 100, 0, 1);

  const completedSkills = SKILLS
    .map((skill) => clamp(skillScores[skill.key] ?? Math.max(35, (user.nqScore ?? 50) - 6), 0, 100));

  const avgSkill = completedSkills.reduce((sum, score) => sum + score, 0) / completedSkills.length;
  const headroom = 100 - avgSkill;
  const momentum = clamp(
    normalizedStreak * 0.34 +
      normalizedXp * 0.26 +
      normalizedSq * 0.18 +
      (avgSkill / 100) * 0.22,
    0,
    1,
  );

  return { skillScores, avgSkill, headroom, momentum };
}

export function buildCollaboratorProjection(user: Partial<User>): CollaboratorProjection {
  const currentSq = clamp(user.nqScore ?? 0, 0, 100);
  const { skillScores, avgSkill, headroom, momentum } = getProjectionInputs(user);

  const skillProjections: SkillProjection[] = SKILLS.map((skill) => {
    const currentScore = clamp(skillScores[skill.key] ?? Math.max(35, currentSq - 6), 0, 100);
    const skillHeadroom = 100 - currentScore;
    const propensity = clamp(
      round(32 + skillHeadroom * 0.42 + momentum * 28 - Math.max(0, currentScore - 82) * 0.35),
      18,
      97,
    );
    const expectedGain = clamp(round(skillHeadroom * 0.12 + momentum * 5.5), 2, 18);

    return {
      key: skill.key,
      name: skill.name,
      currentScore,
      propensity,
      expectedGain,
      projectedScore: clamp(currentScore + expectedGain, 0, 100),
      headroom: skillHeadroom,
    };
  }).sort((a, b) => {
    const opportunityA = a.propensity * 0.65 + a.headroom * 0.35;
    const opportunityB = b.propensity * 0.65 + b.headroom * 0.35;
    return opportunityB - opportunityA;
  });

  const topFocusSkills = skillProjections.slice(0, 3);
  const avgPropensity = skillProjections.reduce((sum, skill) => sum + skill.propensity, 0) / skillProjections.length;
  const sqImprovementProbability = clamp(
    round(36 + momentum * 26 + (avgPropensity / 100) * 24 + (headroom / 100) * 10 - Math.max(0, currentSq - 82) * 0.35),
    22,
    96,
  );
  const expectedSqLift = clamp(
    round(headroom * 0.08 + momentum * 6.5 + (currentSq < 60 ? 2 : currentSq < 75 ? 1 : 0)),
    2,
    18,
  );
  const conservativeSq = clamp(currentSq + Math.max(1, expectedSqLift - 3), 0, 100);
  const probableSq = clamp(currentSq + expectedSqLift, 0, 100);
  const optimisticSq = clamp(probableSq + round(2 + topFocusSkills[0].propensity / 22), 0, 100);
  const readinessIndex = clamp(round(momentum * 100), 0, 100);

  return {
    currentSq,
    probableSq,
    optimisticSq,
    conservativeSq,
    expectedSqLift,
    sqImprovementProbability,
    readinessIndex,
    momentumLabel: getMomentumLabel(readinessIndex),
    topFocusSkills,
    skillProjections,
  };
}

export function buildProjectionSummary(users: Partial<User>[]) {
  const validUsers = users.filter((user) => !user.isAdmin && (user.nqScore ?? 0) > 0);
  const projections = validUsers.map((user) => ({
    user,
    projection: buildCollaboratorProjection(user),
  }));

  const avgCurrentSq = projections.length
    ? round(projections.reduce((sum, item) => sum + item.projection.currentSq, 0) / projections.length)
    : 0;
  const avgProbableSq = projections.length
    ? round(projections.reduce((sum, item) => sum + item.projection.probableSq, 0) / projections.length)
    : 0;
  const avgProbability = projections.length
    ? round(projections.reduce((sum, item) => sum + item.projection.sqImprovementProbability, 0) / projections.length)
    : 0;

  const highPotentialCount = projections.filter((item) => item.projection.sqImprovementProbability >= 70).length;
  const topMovers = [...projections]
    .sort((a, b) => {
      const scoreA = a.projection.expectedSqLift * 0.55 + a.projection.sqImprovementProbability * 0.45;
      const scoreB = b.projection.expectedSqLift * 0.55 + b.projection.sqImprovementProbability * 0.45;
      return scoreB - scoreA;
    })
    .slice(0, 5);

  const departmentMap = new Map<string, { count: number; currentSq: number; probableSq: number; avgProbability: number }>();

  for (const item of projections) {
    const department = item.user.department || "Sin equipo";
    const current = departmentMap.get(department) ?? { count: 0, currentSq: 0, probableSq: 0, avgProbability: 0 };
    current.count += 1;
    current.currentSq += item.projection.currentSq;
    current.probableSq += item.projection.probableSq;
    current.avgProbability += item.projection.sqImprovementProbability;
    departmentMap.set(department, current);
  }

  const departmentOutlook = [...departmentMap.entries()]
    .map(([department, stats]) => ({
      department,
      headcount: stats.count,
      avgCurrentSq: round(stats.currentSq / stats.count),
      avgProbableSq: round(stats.probableSq / stats.count),
      avgProbability: round(stats.avgProbability / stats.count),
      projectedLift: round(stats.probableSq / stats.count) - round(stats.currentSq / stats.count),
    }))
    .sort((a, b) => b.avgProbability - a.avgProbability);

  return {
    projections,
    avgCurrentSq,
    avgProbableSq,
    avgProbability,
    highPotentialCount,
    topMovers,
    departmentOutlook,
  };
}
