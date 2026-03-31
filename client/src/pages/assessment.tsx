import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BINARY_QUESTIONS,
  SCENARIOS,
  ASSESSMENT_ROLES,
  AI_USAGE_OPTIONS,
  ROLE_TASKS,
  CONCERN_OPTIONS,
  HOPE_OPTIONS,
  SKILL_META,
  SKILL_INSIGHTS,
  computeSQScore,
  getFearBridge,
  getAutomationCategory,
  type Skill,
  type AssessmentRole,
} from "@/lib/assessment-data";
import { SQRing } from "@/components/nq-ring";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight, HelpCircle, Eye, RefreshCw, Zap, Brain,
  Check, X, Minus, Share2, Copy, Users, Sparkles, BookOpen,
  type LucideIcon,
} from "lucide-react";

type Phase =
  | "opening"
  | "part1"
  | "transition1"
  | "part2"
  | "tease"
  | "part3-role"
  | "part3-tasks"
  | "part3-drains"
  | "part3-fears"
  | "reveal";

const fadeVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function AssessmentPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [phase, setPhase] = useState<Phase>("opening");

  const [binaryIndex, setBinaryIndex] = useState(0);
  const [binaryAnswers, setBinaryAnswers] = useState<("A" | "B")[]>([]);

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<number[]>([]);

  const [selectedRole, setSelectedRole] = useState<AssessmentRole | null>(null);
  const [aiUsage, setAiUsage] = useState<string>("");
  const [taskHours, setTaskHours] = useState<number[]>([]);
  const [dismissedTasks, setDismissedTasks] = useState<Set<number>>(new Set());
  const [drains, setDrains] = useState<number[]>([]);
  const [concern, setConcern] = useState<string>("");
  const [hope, setHope] = useState<string>("");

  const [results, setResults] = useState<ReturnType<typeof computeSQScore> | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [saved, setSaved] = useState(false);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const questionAppearedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (phase === "part1") {
      questionAppearedAt.current = Date.now();
    }
  }, [phase, binaryIndex]);

  useEffect(() => {
    if ((phase === "part3-tasks" || phase === "part3-drains") && !selectedRole) {
      setPhase("part3-role");
    }
  }, [phase, selectedRole]);

  const handleBinaryAnswer = useCallback((answer: "A" | "B") => {
    const elapsed = Date.now() - questionAppearedAt.current;
    setResponseTimes((prev) => [...prev, elapsed]);
    setBinaryAnswers((prev) => [...prev, answer]);
    setTimeout(() => {
      if (binaryIndex < BINARY_QUESTIONS.length - 1) {
        setBinaryIndex((i) => i + 1);
      } else {
        setPhase("transition1");
      }
    }, 400);
  }, [binaryIndex]);

  const handleScenarioAnswer = useCallback((optionIdx: number) => {
    setScenarioAnswers((prev) => [...prev, optionIdx]);
    setTimeout(() => {
      if (scenarioIndex < SCENARIOS.length - 1) {
        setScenarioIndex((i) => i + 1);
      } else {
        setPhase("tease");
      }
    }, 500);
  }, [scenarioIndex]);

  const initializeTasks = useCallback((role: AssessmentRole) => {
    const tasks = ROLE_TASKS[role];
    setTaskHours(tasks.map((t) => t.defaultHours));
    setDismissedTasks(new Set());
    setDrains([]);
  }, []);

  const computeResults = useCallback(() => {
    if (!selectedRole) return;
    const r = computeSQScore(binaryAnswers, scenarioAnswers, taskHours, selectedRole, drains, aiUsage);
    setResults(r);
    setPhase("reveal");

    let current = 0;
    const target = r.overallScore;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
        setTimeout(() => setShowResults(true), 2000);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, interval);

    apiRequest("POST", "/api/sq-assessments", {
      role: selectedRole,
      aiUsage,
      overallScore: r.overallScore,
      level: r.level,
      skillScores: r.skillScores,
      taskBreakdown: r.taskBreakdown,
      recoverableHours: r.recoverableHours,
      estimatedDollarsSaved: r.estimatedDollarsSaved,
      personalitySummary: r.personalitySummary,
      concern: concern || null,
      hope: hope || null,
    }).then(() => setSaved(true)).catch((err: unknown) => {
      console.error("Failed to save assessment:", err);
      toast({ title: "Save failed", description: "Your results were calculated but couldn't be saved. Please try again.", variant: "destructive" });
    });
  }, [selectedRole, binaryAnswers, scenarioAnswers, taskHours, drains, aiUsage, concern, hope]);

  const totalWeekHours = taskHours.reduce((sum, h, i) => dismissedTasks.has(i) ? sum : sum + h, 0);

  const AI_ICONS: Record<string, LucideIcon> = {
    help: HelpCircle, eye: Eye, refresh: RefreshCw, zap: Zap, brain: Brain,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {phase === "opening" && (
          <OpeningScreen key="opening" onStart={() => setPhase("part1")} />
        )}

        {phase === "part1" && (
          <motion.div key={`part1-${binaryIndex}`} {...fadeVariant} transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="flex gap-1.5 mb-12" data-testid="progress-dots">
              {BINARY_QUESTIONS.map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i < binaryIndex ? "bg-violet-500" : i === binaryIndex ? "bg-violet-400" : "bg-white/20"}`} />
              ))}
            </div>

            <motion.p
              key={`q-${binaryIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-light text-center mb-10 max-w-lg text-white/90"
            >
              {BINARY_QUESTIONS[binaryIndex].prompt}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
              {(["A", "B"] as const).map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBinaryAnswer(opt)}
                  data-testid={`binary-option-${opt.toLowerCase()}`}
                  className="flex-1 p-6 rounded-md border border-white/10 bg-white/5 text-white/90 text-lg font-light transition-colors hover:bg-violet-600/20 hover:border-violet-500/50 text-center"
                >
                  {opt === "A" ? BINARY_QUESTIONS[binaryIndex].optionA : BINARY_QUESTIONS[binaryIndex].optionB}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "transition1" && (
          <TransitionScreen
            key="transition1"
            lines={["Interesting.", "We're starting to see your pattern.", "Now let's go deeper."]}
            buttonText="Continue"
            onContinue={() => setPhase("part2")}
          />
        )}

        {phase === "part2" && (
          <motion.div key={`part2-${scenarioIndex}`} {...fadeVariant} transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            <p className="text-sm text-white/40 mb-8" data-testid="scenario-progress">
              {scenarioIndex + 1} of {SCENARIOS.length}
            </p>

            <motion.div key={`s-${scenarioIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl font-light mb-3 text-violet-300">
                {SCENARIOS[scenarioIndex].title}
              </h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                {SCENARIOS[scenarioIndex].narrative}
              </p>

              <div className="grid gap-3">
                {SCENARIOS[scenarioIndex].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleScenarioAnswer(idx)}
                    data-testid={`scenario-option-${idx}`}
                    className="p-5 rounded-md border border-white/10 bg-white/5 text-left text-white/85 text-base font-light transition-colors hover:bg-violet-600/20 hover:border-violet-500/50"
                  >
                    {opt.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === "tease" && (
          <TeaseScreen
            key="tease"
            binaryAnswers={binaryAnswers}
            scenarioAnswers={scenarioAnswers}
            onContinue={() => setPhase("part3-role")}
          />
        )}

        {phase === "part3-role" && (
          <motion.div key="part3-role" {...fadeVariant} transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-light mb-2 text-center">Your world</h2>
            <p className="text-white/50 mb-10 text-center">Tell us about your work</p>

            <div className="max-w-xl w-full space-y-8">
              <div>
                <p className="text-sm text-white/60 mb-3">What's your role?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ASSESSMENT_ROLES.map((role) => (
                    <motion.button
                      key={role}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedRole(role); initializeTasks(role); }}
                      data-testid={`role-${role.toLowerCase().replace(/[& ]/g, "-")}`}
                      className={`p-3 rounded-md border text-sm font-light transition-colors ${selectedRole === role ? "border-violet-500 bg-violet-600/30 text-white" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
                    >
                      {role}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-3">How much do you use AI?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AI_USAGE_OPTIONS.map((opt) => {
                    const Icon = AI_ICONS[opt.icon] || HelpCircle;
                    return (
                      <motion.button
                        key={opt.value}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setAiUsage(opt.value)}
                        data-testid={`ai-usage-${opt.value}`}
                        className={`p-3 rounded-md border text-sm font-light flex items-center gap-2 transition-colors ${aiUsage === opt.value ? "border-violet-500 bg-violet-600/30 text-white" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
                      >
                        <Icon className="w-4 h-4" />
                        {opt.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {selectedRole && aiUsage && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center pt-4">
                  <Button
                    onClick={() => setPhase("part3-tasks")}
                    className="bg-violet-600 text-white"
                    data-testid="button-continue-tasks"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {phase === "part3-tasks" && selectedRole && (
          <motion.div key="part3-tasks" {...fadeVariant} transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center px-4 py-12">
            <h2 className="text-2xl font-light mb-1 text-center">Build your week</h2>
            <p className="text-white/50 mb-8 text-center text-sm">
              Here's a typical week in {selectedRole}. Make it yours.
            </p>

            <div className="max-w-2xl w-full space-y-4">
              {ROLE_TASKS[selectedRole].map((task, idx) => {
                if (dismissedTasks.has(idx)) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 rounded-md border border-white/10 bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-sm text-white/80 font-light">{task.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-violet-300 min-w-[3rem] text-right">
                          {taskHours[idx]}h
                        </span>
                        <button
                          onClick={() => setDismissedTasks((prev) => { const next = new Set(Array.from(prev)); next.add(idx); return next; })}
                          className="text-xs text-white/30 hover:text-white/60 transition-colors"
                          data-testid={`dismiss-task-${idx}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <Slider
                      value={[taskHours[idx]]}
                      min={0}
                      max={15}
                      step={1}
                      onValueChange={([val]) => {
                        setTaskHours((prev) => {
                          const next = [...prev];
                          next[idx] = val;
                          return next;
                        });
                      }}
                      className="w-full"
                      data-testid={`slider-task-${idx}`}
                    />
                  </motion.div>
                );
              })}
            </div>

            <div className="sticky bottom-0 w-full max-w-2xl mt-6 p-4 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 flex items-center justify-between gap-4">
              <span className="text-sm text-white/60">Your week: <span className="text-violet-300 font-medium">{totalWeekHours}h</span></span>
              <Button
                onClick={() => setPhase("part3-drains")}
                className="bg-violet-600 text-white"
                data-testid="button-continue-drains"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "part3-drains" && selectedRole && (
          <motion.div key="part3-drains" {...fadeVariant} transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            <h2 className="text-2xl font-light mb-2 text-center">What drains you?</h2>
            <p className="text-white/50 mb-8 text-center text-sm">
              Which of these drain your energy the most? Tap up to 3.
            </p>

            <div className="max-w-xl w-full space-y-2">
              {ROLE_TASKS[selectedRole].map((task, idx) => {
                if (dismissedTasks.has(idx)) return null;
                const isDrain = drains.includes(idx);
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (isDrain) {
                        setDrains((prev) => prev.filter((d) => d !== idx));
                      } else if (drains.length < 3) {
                        setDrains((prev) => [...prev, idx]);
                      }
                    }}
                    data-testid={`drain-task-${idx}`}
                    className={`w-full p-4 rounded-md border text-left text-sm font-light flex items-center gap-3 transition-colors ${isDrain ? "border-orange-500/50 bg-orange-500/10 text-orange-300" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
                  >
                    {isDrain && <Zap className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                    <span className="flex-1">{task.name}</span>
                    {isDrain && <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8">
              <Button
                onClick={() => setPhase("part3-fears")}
                className="bg-violet-600 text-white"
                data-testid="button-continue-fears"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "part3-fears" && (
          <motion.div key="part3-fears" {...fadeVariant} transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full space-y-10">
              <div>
                <p className="text-lg font-light mb-4 text-white/80">Biggest concern about AI at work?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONCERN_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConcern(opt)}
                      data-testid={`concern-${opt.toLowerCase().replace(/\s/g, "-")}`}
                      className={`p-3 rounded-md border text-sm font-light text-left transition-colors ${concern === opt ? "border-violet-500 bg-violet-600/30 text-white" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-lg font-light mb-4 text-white/80">Most valuable thing AI could do for you?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HOPE_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setHope(opt)}
                      data-testid={`hope-${opt.toLowerCase().replace(/\s/g, "-")}`}
                      className={`p-3 rounded-md border text-sm font-light text-left transition-colors ${hope === opt ? "border-violet-500 bg-violet-600/30 text-white" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>

              {concern && hope && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center pt-4">
                  <Button
                    onClick={computeResults}
                    size="lg"
                    className="bg-violet-600 text-white"
                    data-testid="button-show-results"
                  >
                    Show me <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {phase === "reveal" && results && (
          <RevealScreen
            key="reveal"
            results={results}
            animatedScore={animatedScore}
            showResults={showResults}
            concern={concern}
            hope={hope}
            role={selectedRole!}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function OpeningScreen({ onStart }: { onStart: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const lines = ["This isn't about AI.", "It's about how you think.", "10 minutes. No right answers."];

  useEffect(() => {
    if (lineIdx < lines.length) {
      const timer = setTimeout(() => setLineIdx((i) => i + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [lineIdx]);

  return (
    <motion.div {...fadeVariant} transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="space-y-6 text-center mb-16">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={i < lineIdx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-extralight text-white/90"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={lineIdx >= lines.length ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button
          onClick={onStart}
          size="lg"
          className="bg-violet-600 text-white rounded-full"
          data-testid="button-lets-go"
        >
          Let's go
        </Button>
      </motion.div>
    </motion.div>
  );
}

function TransitionScreen({ lines, buttonText, onContinue }: {
  lines: string[];
  buttonText: string;
  onContinue: () => void;
}) {
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (lineIdx < lines.length) {
      const timer = setTimeout(() => setLineIdx((i) => i + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [lineIdx]);

  return (
    <motion.div {...fadeVariant} transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="space-y-5 text-center mb-16">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={i < lineIdx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl font-extralight text-white/90"
          >
            {line}
          </motion.p>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={lineIdx >= lines.length ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={onContinue}
          className="bg-violet-600 text-white"
          data-testid="button-transition-continue"
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  );
}

function TeaseScreen({ binaryAnswers, scenarioAnswers, onContinue }: {
  binaryAnswers: ("A" | "B")[];
  scenarioAnswers: number[];
  onContinue: () => void;
}) {
  const [lineIdx, setLineIdx] = useState(0);
  const lines = ["This is your mind.", "Every choice revealed a pattern.", "One more step to see the full picture."];

  const skills: Skill[] = ["dataFluency", "adaptiveMindset", "verificationInstinct", "orchestration", "proactiveExperimentation", "systemsRedesign"];
  const roughScores = skills.map((skill) => {
    const binaryScores = BINARY_QUESTIONS.filter((q) => q.skill === skill).map((q, i) => {
      const globalIdx = BINARY_QUESTIONS.indexOf(q);
      const answer = binaryAnswers[globalIdx];
      return answer === "A" ? q.scoringA : q.scoringB;
    });
    const scenarioScores: number[] = [];
    SCENARIOS.forEach((s, i) => {
      const choice = scenarioAnswers[i];
      if (choice !== undefined && choice !== -1) {
        const skillScore = s.options[choice]?.skills[skill];
        if (skillScore) scenarioScores.push(skillScore);
      }
    });
    const all = [...binaryScores, ...scenarioScores];
    return all.length ? all.reduce((a, b) => a + b, 0) / all.length : 5;
  });

  useEffect(() => {
    if (lineIdx < lines.length) {
      const timer = setTimeout(() => setLineIdx((i) => i + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [lineIdx]);

  const maxScore = Math.max(...roughScores);

  return (
    <motion.div {...fadeVariant} transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="mb-12 flex items-center justify-center gap-3 flex-wrap">
        {roughScores.map((score, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            className="rounded-full bg-violet-500"
            style={{
              width: `${20 + (score / maxScore) * 60}px`,
              height: `${20 + (score / maxScore) * 60}px`,
              opacity: 0.3 + (score / maxScore) * 0.7,
            }}
          />
        ))}
      </div>

      <div className="space-y-5 text-center mb-14">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={i < lineIdx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl font-extralight text-white/90"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={lineIdx >= lines.length ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={onContinue}
          className="bg-violet-600 text-white"
          data-testid="button-show-me"
        >
          Show me
        </Button>
      </motion.div>
    </motion.div>
  );
}

function RevealScreen({ results, animatedScore, showResults, concern, hope, role }: {
  results: ReturnType<typeof computeSQScore>;
  animatedScore: number;
  showResults: boolean;
  concern: string;
  hope: string;
  role: AssessmentRole;
}) {
  const skills: Skill[] = ["dataFluency", "adaptiveMindset", "verificationInstinct", "orchestration", "proactiveExperimentation", "systemsRedesign"];

  const radarData = skills.map((skill) => ({
    skill: SKILL_META[skill].shortName,
    value: results.skillScores[skill],
    fullMark: 100,
  }));

  const sortedSkills = [...skills].sort((a, b) => results.skillScores[b] - results.skillScores[a]);
  const topSkill = sortedSkills[0];
  const weakestSkill = sortedSkills[sortedSkills.length - 1];

  const essentialHours = results.taskBreakdown.filter((t) => t.category === "essential").reduce((s, t) => s + t.hours, 0);
  const augmentableHours = results.taskBreakdown.filter((t) => t.category === "augmentable").reduce((s, t) => s + t.hours, 0);
  const automatableHours = results.taskBreakdown.filter((t) => t.category === "automatable").reduce((s, t) => s + t.hours, 0);
  const totalHours = essentialHours + augmentableHours + automatableHours;

  const fearBridge = getFearBridge(concern, results.recoverableHours, topSkill, results.skillScores);

  const getUnlocks = () => {
    const weakName = SKILL_META[weakestSkill].name;
    const topAutoTask = [...results.taskBreakdown]
      .filter((t) => t.category === "automatable")
      .sort((a, b) => b.hours - a.hours)[0];
    const topDrain = results.taskBreakdown.find((t) => t.isDrain && t.category !== "essential");

    return [
      {
        title: "Free up time",
        description: topAutoTask
          ? `Start with "${topAutoTask.name}" (${topAutoTask.hours}h/week). This task is highly automatable. Reclaiming it gives you space to grow.`
          : `Focus on your most repetitive tasks first. Even small automation wins compound over time.`,
      },
      {
        title: `Build ${weakName}`,
        description: SKILL_INSIGHTS[weakestSkill].low,
      },
      {
        title: "Your first course",
        description: topDrain
          ? `Start with the "${weakName} Fundamentals" course. Your drain task "${topDrain.name}" will feel lighter once this skill improves.`
          : `Start with "${weakName} Fundamentals" to unlock your biggest growth area.`,
      },
    ];
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div data-testid="text-sq-score">
            <SQRing score={animatedScore} size={200} strokeWidth={8} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: animatedScore === results.overallScore ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-light text-violet-300 mt-4"
          data-testid="text-sq-level"
        >
          {results.level}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: animatedScore === results.overallScore ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-white/40 mt-2"
        >
          Top percentile of {role} professionals
        </motion.p>
      </motion.div>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 pb-20 max-w-3xl mx-auto space-y-12"
        >
          {/* Block 1 - Summary */}
          <section data-testid="block-summary">
            <h3 className="text-lg font-medium text-violet-300 mb-3">Your SQ Profile</h3>
            <p className="text-white/70 font-light leading-relaxed" data-testid="text-personality-summary">{results.personalitySummary}</p>
          </section>

          {/* Block 2 - Skill Map */}
          <section data-testid="block-skill-map">
            <h3 className="text-lg font-medium text-violet-300 mb-6">Skill Map</h3>
            <div className="h-64 w-full mb-8">
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                  <Radar
                    name="SQ"
                    dataKey="value"
                    stroke="#7C3AED"
                    fill="#7C3AED"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {skills.map((skill) => {
                const score = results.skillScores[skill];
                const tier = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
                return (
                  <div key={skill} className="p-4 rounded-md border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-sm font-medium text-white/90">{SKILL_META[skill].name}</span>
                      <span className="text-sm font-medium text-violet-300">{score}</span>
                    </div>
                    <Progress value={score} className="h-1.5 mb-2" />
                    <p className="text-xs text-white/50 font-light">{SKILL_INSIGHTS[skill][tier]}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Block 3 - Week Decoded */}
          <section data-testid="block-week-decoded">
            <h3 className="text-lg font-medium text-violet-300 mb-6">Your Week Decoded</h3>

            <div className="h-6 rounded-md overflow-hidden flex mb-4">
              {totalHours > 0 && (
                <>
                  <div className="bg-violet-600" style={{ width: `${(essentialHours / totalHours) * 100}%` }} />
                  <div className="bg-amber-500" style={{ width: `${(augmentableHours / totalHours) * 100}%` }} />
                  <div className="bg-emerald-500" style={{ width: `${(automatableHours / totalHours) * 100}%` }} />
                </>
              )}
            </div>

            <div className="flex gap-4 text-xs text-white/60 mb-6 flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet-600" /> Human Essential</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> Augmentable</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Automatable</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-md border border-white/10 bg-white/5 text-center">
                <p className="text-2xl font-light text-violet-300" data-testid="text-recoverable-hours">{results.recoverableHours}</p>
                <p className="text-xs text-white/50">Hours/week recoverable</p>
              </div>
              <div className="p-4 rounded-md border border-white/10 bg-white/5 text-center">
                <p className="text-2xl font-light text-violet-300" data-testid="text-recoverable-hours-year">{results.recoverableHoursYear}</p>
                <p className="text-xs text-white/50">Hours/year</p>
              </div>
              <div className="p-4 rounded-md border border-white/10 bg-white/5 text-center">
                <p className="text-2xl font-light text-violet-300" data-testid="text-estimated-dollars">${(results.estimatedDollarsSaved / 1000).toFixed(0)}k</p>
                <p className="text-xs text-white/50">Est. $/year</p>
              </div>
            </div>

            <div className="space-y-2">
              {results.taskBreakdown.map((task, idx) => (
                <div key={idx} className={`p-3 rounded-md border flex items-center gap-3 ${task.isDrain ? "border-orange-500/30 bg-orange-500/5" : "border-white/10 bg-white/5"}`}>
                  <Badge
                    variant="outline"
                    className={`text-xs flex-shrink-0 ${task.category === "essential" ? "border-violet-500/50 text-violet-300" : task.category === "augmentable" ? "border-amber-500/50 text-amber-300" : "border-emerald-500/50 text-emerald-300"}`}
                  >
                    {task.category === "essential" ? "Human" : task.category === "augmentable" ? "Augment" : "Automate"}
                  </Badge>
                  <span className="text-sm text-white/70 font-light flex-1">{task.name}</span>
                  <span className="text-xs text-white/40">{task.hours}h</span>
                  {task.isDrain && (
                    <span className="text-xs text-orange-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Drains you
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Block 4 - 3 Unlocks */}
          <section data-testid="block-unlocks">
            <h3 className="text-lg font-medium text-violet-300 mb-6">Your 3 Unlocks</h3>
            <div className="space-y-4">
              {getUnlocks().map((unlock, idx) => (
                <div key={idx} className="p-5 rounded-md border border-white/10 bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-violet-600/30 flex items-center justify-center text-xs text-violet-300">{idx + 1}</div>
                    <h4 className="text-sm font-medium text-white/90">{unlock.title}</h4>
                  </div>
                  <p className="text-sm text-white/60 font-light leading-relaxed">{unlock.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Block 5 - Fear Bridge */}
          {fearBridge && (
            <section data-testid="block-fear-bridge">
              <h3 className="text-lg font-medium text-violet-300 mb-4">About your concern: "{concern}"</h3>
              <div className="p-5 rounded-md border border-white/10 bg-white/5">
                <p className="text-sm text-white/70 font-light leading-relaxed">{fearBridge}</p>
              </div>
            </section>
          )}

          {/* Block 6 - Share */}
          <section data-testid="block-share">
            <h3 className="text-lg font-medium text-violet-300 mb-4">Share your SQ</h3>
            <div className="p-6 rounded-md bg-gradient-to-br from-violet-900/60 to-violet-800/30 border border-violet-500/20 text-center">
              <div className="mb-4">
                <SQRing score={results.overallScore} size={80} strokeWidth={4} />
              </div>
              <p className="text-xl font-light mb-1">SQ {results.overallScore} — {results.level}</p>
              <p className="text-xs text-white/40 mb-6">genaia.ai/sq — What's yours?</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" className="border-white/20 text-white/80" data-testid="button-share-linkedin">
                  <Share2 className="w-4 h-4 mr-2" /> Share on LinkedIn
                </Button>
                <Button variant="outline" className="border-white/20 text-white/80" data-testid="button-copy-link">
                  <Copy className="w-4 h-4 mr-2" /> Copy link
                </Button>
              </div>
            </div>
          </section>

          {/* Block 7 - Next Steps */}
          <section data-testid="block-next-steps">
            <h3 className="text-lg font-medium text-violet-300 mb-6">What's next?</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-5 rounded-md border border-violet-500/20 bg-violet-600/10 hover-elevate cursor-pointer" data-testid="cta-start-training">
                <BookOpen className="w-6 h-6 text-violet-400 mb-3" />
                <h4 className="text-sm font-medium text-white/90 mb-1">Start training</h4>
                <p className="text-xs text-white/50 font-light">Begin with your recommended first course</p>
              </div>
              <div className="p-5 rounded-md border border-violet-500/20 bg-violet-600/10 hover-elevate cursor-pointer" data-testid="cta-invite-team">
                <Users className="w-6 h-6 text-violet-400 mb-3" />
                <h4 className="text-sm font-medium text-white/90 mb-1">Invite your team</h4>
                <p className="text-xs text-white/50 font-light">5+ colleagues unlock a free Team SQ Dashboard</p>
              </div>
              <div className="p-5 rounded-md border border-violet-500/20 bg-violet-600/10 hover-elevate cursor-pointer" data-testid="cta-book-demo">
                <Sparkles className="w-6 h-6 text-violet-400 mb-3" />
                <h4 className="text-sm font-medium text-white/90 mb-1">Book a demo</h4>
                <p className="text-xs text-white/50 font-light">See Genaia for your entire organization</p>
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}
