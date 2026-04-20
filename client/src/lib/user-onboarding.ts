import type { User } from "@shared/schema";
import type { AssessmentRole, Skill } from "@/lib/assessment-data";

const ONBOARDING_STATE_KEY = "genaia_user_onboarding";
const INITIAL_SQ_KEY = "genaia_initial_sq_snapshot";

type DashboardSkillKey =
  | "dataFluency"
  | "adaptiveMindset"
  | "verificationMindset"
  | "coIntelligence"
  | "autonomousDrive"
  | "processReimagination";

export interface InitialSqSnapshot {
  nqScore: number;
  level: number;
  xp: number;
  streak: number;
  department: string;
  skillScores: Record<DashboardSkillKey, number>;
  createdAt: string;
}

export interface OnboardingState {
  startedAt?: string;
  completedAt?: string;
  assessmentCompletedAt?: string;
}

export interface OnboardingProfile {
  name: string;
  role: AssessmentRole;
  objective: string;
  createdAt: string;
}

const ONBOARDING_PROFILE_KEY = "genaia_user_onboarding_profile";

const assessmentToDashboardSkillMap: Record<Skill, DashboardSkillKey> = {
  dataFluency: "dataFluency",
  adaptiveMindset: "adaptiveMindset",
  verificationInstinct: "verificationMindset",
  orchestration: "coIntelligence",
  proactiveExperimentation: "autonomousDrive",
  systemsRedesign: "processReimagination",
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore local storage failures in demo mode
  }
}

function getUserLevelFromSq(score: number) {
  if (score >= 90) return 8;
  if (score >= 80) return 7;
  if (score >= 65) return 6;
  if (score >= 55) return 5;
  if (score >= 45) return 4;
  if (score >= 30) return 3;
  if (score >= 15) return 2;
  return 1;
}

export function getOnboardingState() {
  return readJson<OnboardingState>(ONBOARDING_STATE_KEY);
}

export function markOnboardingStarted() {
  const current = getOnboardingState() || {};
  writeJson<OnboardingState>(ONBOARDING_STATE_KEY, {
    ...current,
    startedAt: current.startedAt || new Date().toISOString(),
  });
}

export function markOnboardingCompleted() {
  const current = getOnboardingState() || {};
  writeJson<OnboardingState>(ONBOARDING_STATE_KEY, {
    ...current,
    completedAt: new Date().toISOString(),
  });
}

export function markInitialAssessmentCompleted() {
  const current = getOnboardingState() || {};
  writeJson<OnboardingState>(ONBOARDING_STATE_KEY, {
    ...current,
    assessmentCompletedAt: new Date().toISOString(),
  });
}

export function getInitialSqSnapshot() {
  return readJson<InitialSqSnapshot>(INITIAL_SQ_KEY);
}

export function getOnboardingProfile() {
  return readJson<OnboardingProfile>(ONBOARDING_PROFILE_KEY);
}

export function persistOnboardingProfile(profile: Omit<OnboardingProfile, "createdAt">) {
  writeJson<OnboardingProfile>(ONBOARDING_PROFILE_KEY, {
    ...profile,
    createdAt: new Date().toISOString(),
  });
}

export function hasCompletedInitialAssessment() {
  return !!getInitialSqSnapshot();
}

export function persistInitialSqSnapshot(args: {
  overallScore: number;
  role: AssessmentRole;
  skillScores: Record<Skill, number>;
}) {
  const mappedSkillScores = Object.entries(args.skillScores).reduce((acc, [key, value]) => {
    const mappedKey = assessmentToDashboardSkillMap[key as Skill];
    acc[mappedKey] = value;
    return acc;
  }, {} as Record<DashboardSkillKey, number>);

  const snapshot: InitialSqSnapshot = {
    nqScore: args.overallScore,
    level: getUserLevelFromSq(args.overallScore),
    xp: 600,
    streak: 1,
    department: args.role,
    skillScores: mappedSkillScores,
    createdAt: new Date().toISOString(),
  };

  writeJson(INITIAL_SQ_KEY, snapshot);
  markInitialAssessmentCompleted();
}

export function mergeUserWithInitialSqSnapshot<T extends Partial<User>>(user: T): T {
  const snapshot = getInitialSqSnapshot();
  if (!snapshot) return user;

  return {
    ...user,
    name: getOnboardingProfile()?.name || user.name,
    nqScore: snapshot.nqScore,
    level: snapshot.level,
    xp: Math.max(user.xp ?? 0, snapshot.xp),
    streak: Math.max(user.streak ?? 0, snapshot.streak),
    department: snapshot.department || user.department,
    skillScores: {
      ...((user.skillScores ?? {}) as Record<string, number>),
      ...snapshot.skillScores,
    },
  };
}
