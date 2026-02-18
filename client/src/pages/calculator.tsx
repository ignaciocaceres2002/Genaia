import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { ArrowLeft, Briefcase, DollarSign, Clock, Calendar, ArrowRight } from "lucide-react";
import { ROLE_TASKS, calculateNQ } from "@/lib/constants";
import { NQRing } from "@/components/nq-ring";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/seo";

const roles = Object.keys(ROLE_TASKS);
const roleIcons: Record<string, string> = {
  Marketing: "M",
  Sales: "S",
  "People Ops": "P",
  Finance: "F",
  Product: "Pr",
  Legal: "L",
};

type Step = "role" | "tasks" | "loading" | "result";

export default function CalculatorPage() {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState("");
  const [taskHours, setTaskHours] = useState<number[]>([]);
  const [result, setResult] = useState<ReturnType<typeof calculateNQ> | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    const tasks = ROLE_TASKS[role];
    setTaskHours(tasks.map((t) => t.defaultHours));
    setStep("tasks");
  };

  const handleCalculate = async () => {
    setStep("loading");
    const calc = calculateNQ(selectedRole, taskHours);
    try {
      await apiRequest("POST", "/api/nq-calculations", {
        role: selectedRole,
        tasks: ROLE_TASKS[selectedRole].map((t, i) => ({ name: t.name, hours: taskHours[i] })),
        score: calc.score,
        level: calc.level,
      });
    } catch {}
    setTimeout(() => {
      setResult(calc);
      setStep("result");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="NQ Calculator - Génesis" description="Calculate your Native Quotient (NQ) score to measure your AI readiness across key competencies. Free assessment by Génesis." />
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <span className="text-xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent" data-testid="link-logo-calc">
              Génesis
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {step === "role" && (
            <motion.div key="role" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-3">NQ CALCULATOR</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Select your role</h1>
                <p className="text-muted-foreground">Choose the role that best describes your daily work.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <Card
                    key={role}
                    className="p-6 cursor-pointer hover-elevate text-center"
                    onClick={() => handleRoleSelect(role)}
                    data-testid={`card-role-${role.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#7C3AED] font-bold text-sm">{roleIcons[role]}</span>
                    </div>
                    <p className="font-medium text-sm">{role}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "tasks" && (
            <motion.div key="tasks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-3">{selectedRole}</p>
                <h1 className="text-3xl font-bold mb-3">Adjust your hours</h1>
                <p className="text-muted-foreground text-sm">How many hours per week do you spend on each task?</p>
              </div>
              <div className="space-y-6">
                {ROLE_TASKS[selectedRole].map((task, i) => (
                  <Card key={task.name} className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${task.category === "automatable" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : task.category === "augmentable" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                          {task.category === "automatable" ? "Automatable" : task.category === "augmentable" ? "Augmentable" : "Human Essential"}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#7C3AED] min-w-[40px] text-right">{taskHours[i]}h</span>
                    </div>
                    <Slider
                      value={[taskHours[i]]}
                      onValueChange={([v]) => {
                        const next = [...taskHours];
                        next[i] = v;
                        setTaskHours(next);
                      }}
                      min={0}
                      max={15}
                      step={1}
                      className="w-full"
                      data-testid={`slider-task-${i}`}
                    />
                  </Card>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="outline" className="rounded-full" onClick={() => setStep("role")} data-testid="button-back-role">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button className="rounded-full flex-1 bg-[#7C3AED] hover:bg-[#5B21B6] text-white no-default-hover-elevate" onClick={handleCalculate} data-testid="button-reveal-nq">
                  Reveal my NQ <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative w-20 h-20 mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-[#7C3AED]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#7C3AED]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="text-muted-foreground font-medium">Analyzing your workflow...</p>
            </motion.div>
          )}

          {step === "result" && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-3">YOUR NQ SCORE</p>
                <div className="flex justify-center mb-4">
                  <NQRing score={result.score} size={200} label={result.level} />
                </div>
                <p className="text-muted-foreground">You're a <span className="font-semibold text-foreground">{result.level}</span> in AI readiness.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <Clock className="w-5 h-5 text-[#7C3AED] mx-auto mb-2" />
                  <p className="text-xl font-bold">{result.recoverableHours}h</p>
                  <p className="text-xs text-muted-foreground">Hours/week recoverable</p>
                </Card>
                <Card className="p-4 text-center">
                  <Calendar className="w-5 h-5 text-[#7C3AED] mx-auto mb-2" />
                  <p className="text-xl font-bold">{Math.round(result.recoverableHours * 48)}h</p>
                  <p className="text-xs text-muted-foreground">Hours/year saved</p>
                </Card>
                <Card className="p-4 text-center">
                  <DollarSign className="w-5 h-5 text-[#7C3AED] mx-auto mb-2" />
                  <p className="text-xl font-bold">${(result.dollarsSaved / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Value/year</p>
                </Card>
              </div>

              <Card className="p-6 mb-8">
                <h3 className="font-semibold mb-4">Task Breakdown</h3>
                <div className="space-y-3">
                  {result.taskBreakdown.map((t) => (
                    <div key={t.name} className="flex items-center justify-between gap-4">
                      <span className="text-sm flex-1">{t.name}</span>
                      <span className="text-sm text-muted-foreground">{t.hours}h</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${t.category === "automatable" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : t.category === "augmentable" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                        {t.category === "automatable" ? "Automatable" : t.category === "augmentable" ? "Augmentable" : "Essential"}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="rounded-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white no-default-hover-elevate" data-testid="button-book-demo-result">
                  Run for your team <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => { setStep("role"); setResult(null); }} data-testid="button-retake">
                  Retake
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
