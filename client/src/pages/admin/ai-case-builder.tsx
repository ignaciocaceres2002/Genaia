import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/seo";
import { useState, useCallback } from "react";
import {
  BrainCircuit, Bot, MessageSquare, Eye, Lightbulb,
  ArrowRight, ArrowLeft, CheckCircle2, Send, Sparkles,
  Target, DollarSign, Users, TrendingUp, AlertTriangle,
  ChevronRight, BarChart3, Zap
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const slideIn = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } };
const slideOut = { exit: { opacity: 0, x: -30, transition: { duration: 0.3 } } };

type AIType = "ml" | "agents" | "assistants" | "vision" | null;

interface CaseData {
  painPoint: string;
  currentProcess: string;
  cost: string;
  availableData: string;
  aiType: AIType;
  successMetric: string;
  beneficiary: string;
  scenarios: string;
  projectName: string;
  department: string;
  urgency: string;
}

const initialData: CaseData = {
  painPoint: "",
  currentProcess: "",
  cost: "",
  availableData: "",
  aiType: null,
  successMetric: "",
  beneficiary: "",
  scenarios: "",
  projectName: "",
  department: "",
  urgency: "medium",
};

const aiTypes = [
  { id: "ml" as const, icon: BrainCircuit, label: "ML", desc: "Predictive models & optimization", color: "#7C3AED" },
  { id: "agents" as const, icon: Bot, label: "Agents", desc: "Intelligent task automation", color: "#6366F1" },
  { id: "assistants" as const, icon: MessageSquare, label: "Assistants", desc: "Generative AI productivity", color: "#8B5CF6" },
  { id: "vision" as const, icon: Eye, label: "Computer Vision", desc: "Image & video processing", color: "#A78BFA" },
];

const hints: Record<string, string[]> = {
  painPoint: [
    "We spend 20 hours/week manually categorizing support tickets",
    "Our sales forecasting is off by 30% each quarter",
    "Document review takes 3 days per contract on average",
  ],
  currentProcess: [
    "A team of 4 people manually reviews each document in Excel",
    "We use a legacy system that requires manual data entry at every step",
    "Information is scattered across emails, Slack, and spreadsheets",
  ],
  cost: [
    "2 FTEs dedicated = ~$160K/year in salary alone",
    "Avg 15 hours/week × $75/hr = $58,500/year",
    "We lose ~12% of leads due to slow response time = ~$340K/year",
  ],
  availableData: [
    "3 years of CRM data, tagged support tickets, customer feedback surveys",
    "ERP exports, financial reports in PDF, historical performance spreadsheets",
    "Internal knowledge base, SOPs, training manuals, Slack history",
  ],
  successMetric: [
    "Reduce ticket resolution time from 4 hours to 30 minutes",
    "Increase forecast accuracy from 70% to 90%",
    "Process 10x more documents with the same team",
  ],
  beneficiary: [
    "Customer Support team (15 people) + indirectly all customers",
    "Finance department — specifically the FP&A team of 6",
    "Legal team and any department submitting contracts for review",
  ],
  scenarios: [
    "Optimistic: 80% automation, $400K saved. Base: 50% automation, $250K saved. Conservative: 30% automation, $150K saved",
    "Best case: fully autonomous in 6 months. Realistic: human-in-the-loop for 12 months. Worst: pilot only, limited scope",
  ],
};

function calculateScore(data: CaseData): { score: number; breakdown: { label: string; score: number; max: number }[] } {
  const breakdown = [];

  let painScore = 0;
  if (data.painPoint.length > 20) painScore += 8;
  if (data.painPoint.length > 80) painScore += 7;
  breakdown.push({ label: "Problem Clarity", score: painScore, max: 15 });

  let processScore = 0;
  if (data.currentProcess.length > 20) processScore += 5;
  if (data.currentProcess.length > 60) processScore += 5;
  breakdown.push({ label: "Process Understanding", score: processScore, max: 10 });

  let costScore = 0;
  if (data.cost.length > 5) costScore += 8;
  if (data.cost.match(/\$|€|USD|hours|hrs/i)) costScore += 7;
  breakdown.push({ label: "Cost Quantification", score: costScore, max: 15 });

  let dataScore = 0;
  if (data.availableData.length > 20) dataScore += 5;
  if (data.availableData.length > 60) dataScore += 5;
  breakdown.push({ label: "Data Availability", score: dataScore, max: 10 });

  let techScore = data.aiType ? 15 : 0;
  breakdown.push({ label: "Tech Fit", score: techScore, max: 15 });

  let kpiScore = 0;
  if (data.successMetric.length > 15) kpiScore += 8;
  if (data.successMetric.match(/\d+%|\d+x|\d+ (hours|minutes|days)/i)) kpiScore += 7;
  breakdown.push({ label: "Success Metrics", score: kpiScore, max: 15 });

  let beneficiaryScore = 0;
  if (data.beneficiary.length > 10) beneficiaryScore += 5;
  if (data.beneficiary.length > 40) beneficiaryScore += 5;
  breakdown.push({ label: "Impact Scope", score: beneficiaryScore, max: 10 });

  let scenarioScore = 0;
  if (data.scenarios.length > 20) scenarioScore += 5;
  if (data.scenarios.length > 80) scenarioScore += 5;
  breakdown.push({ label: "Scenario Planning", score: scenarioScore, max: 10 });

  const score = breakdown.reduce((sum, b) => sum + b.score, 0);
  return { score, breakdown };
}

function getPriorityLabel(score: number): { label: string; color: string; bg: string } {
  if (score >= 80) return { label: "Critical Priority", color: "text-red-600", bg: "bg-red-500" };
  if (score >= 60) return { label: "High Priority", color: "text-orange-600", bg: "bg-orange-500" };
  if (score >= 40) return { label: "Medium Priority", color: "text-amber-600", bg: "bg-amber-500" };
  return { label: "Low Priority", color: "text-blue-600", bg: "bg-blue-500" };
}

export default function AICaseBuilderPage() {
  const [phase, setPhase] = useState(0);
  const [data, setData] = useState<CaseData>(initialData);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback((field: keyof CaseData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const phases = [
    { title: "Project Info", icon: Sparkles, label: "START" },
    { title: "Current Situation", icon: Target, label: "PHASE 1" },
    { title: "Technology", icon: BrainCircuit, label: "PHASE 2" },
    { title: "Desired Outcome", icon: TrendingUp, label: "PHASE 3" },
    { title: "Review & Submit", icon: Send, label: "FINAL" },
  ];

  const canAdvance = () => {
    switch (phase) {
      case 0: return data.projectName.length > 2 && data.department.length > 1;
      case 1: return data.painPoint.length > 10 && data.currentProcess.length > 10 && data.cost.length > 3;
      case 2: return data.aiType !== null;
      case 3: return data.successMetric.length > 10 && data.beneficiary.length > 5;
      default: return true;
    }
  };

  const { score, breakdown } = calculateScore(data);
  const priority = getPriorityLabel(score);

  if (submitted) {
    return (
      <motion.div className="max-w-2xl mx-auto py-12" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        <SEO title="AI Case Builder - Genaia" description="Build and submit AI use cases for prioritization." />
        <motion.div variants={fadeUp} className="text-center">
          <motion.div
            className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-3" data-testid="text-submitted-title">Case Submitted</h1>
          <p className="text-muted-foreground mb-2">{data.projectName}</p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Badge className={`${priority.bg} text-white border-0`}>{priority.label}</Badge>
            <span className="text-2xl font-bold">{score}/100</span>
          </div>
          <Card className="p-6 text-left mb-6">
            <h3 className="text-sm font-semibold mb-4">Score Breakdown</h3>
            <div className="space-y-3">
              {breakdown.map((b) => (
                <div key={b.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{b.label}</span>
                    <span className="font-medium">{b.score}/{b.max}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <motion.div
                      className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(b.score / b.max) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <p className="text-sm text-muted-foreground mb-6">
            Your AI use case has been submitted to the development team for review. You'll receive feedback within 48 hours.
          </p>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => { setSubmitted(false); setPhase(0); setData(initialData); }}
            data-testid="button-new-case"
          >
            Submit Another Case
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <SEO title="AI Case Builder - Genaia" description="Build and submit AI use cases for prioritization." />

      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-case-builder-title">AI Case Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Build your AI use case step by step — we'll score and prioritize it</p>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold">{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-1 mb-8">
          {phases.map((p, i) => (
            <div key={p.title} className="flex items-center flex-1">
              <button
                onClick={() => i < phase && setPhase(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all w-full ${
                  i === phase
                    ? "bg-[#7C3AED] text-white shadow-lg shadow-violet-500/20"
                    : i < phase
                    ? "bg-[#7C3AED]/10 text-[#7C3AED] cursor-pointer"
                    : "bg-muted text-muted-foreground"
                }`}
                data-testid={`button-phase-${i}`}
              >
                <p.icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden md:inline truncate">{p.title}</span>
              </button>
              {i < phases.length - 1 && (
                <ChevronRight className={`w-4 h-4 mx-1 flex-shrink-0 ${i < phase ? "text-[#7C3AED]" : "text-muted-foreground/30"}`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="phase0" initial="hidden" animate="visible" exit="exit" variants={{ ...slideIn, ...slideOut }}>
            <Card className="p-8 border-[#7C3AED]/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Let's start with the basics</h2>
                  <p className="text-xs text-muted-foreground">Name your project and tell us where it belongs</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Name</label>
                  <Input
                    placeholder="e.g., Automated Invoice Processing"
                    value={data.projectName}
                    onChange={(e) => update("projectName", e.target.value)}
                    className="bg-background"
                    data-testid="input-project-name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <Input
                      placeholder="e.g., Finance, Operations, Marketing"
                      value={data.department}
                      onChange={(e) => update("department", e.target.value)}
                      className="bg-background"
                      data-testid="input-department"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Urgency</label>
                    <div className="flex gap-2">
                      {["low", "medium", "high", "critical"].map((u) => (
                        <button
                          key={u}
                          onClick={() => update("urgency", u)}
                          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all border ${
                            data.urgency === u
                              ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                              : "bg-background border-border text-muted-foreground"
                          }`}
                          data-testid={`button-urgency-${u}`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="phase1" initial="hidden" animate="visible" exit="exit" variants={{ ...slideIn, ...slideOut }}>
            <Card className="p-8 border-[#7C3AED]/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7C3AED] uppercase">PHASE 1</p>
                  <h2 className="text-lg font-semibold">Current Situation — Where are we?</h2>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-6 ml-[52px]">Describe the bridge: Current State → Technology → Desired State</p>

              <div className="space-y-6">
                <FieldBlock
                  label="What is the specific pain point?"
                  placeholder="Describe the concrete business problem..."
                  value={data.painPoint}
                  onChange={(v) => update("painPoint", v)}
                  hintKey="painPoint"
                  showHint={showHint}
                  setShowHint={setShowHint}
                  testId="textarea-pain-point"
                />
                <FieldBlock
                  label="How is it done today?"
                  placeholder="Describe the current process..."
                  value={data.currentProcess}
                  onChange={(v) => update("currentProcess", v)}
                  hintKey="currentProcess"
                  showHint={showHint}
                  setShowHint={setShowHint}
                  testId="textarea-current-process"
                />
                <FieldBlock
                  label="How much does this problem cost?"
                  placeholder="Quantify: $, hours, % loss..."
                  value={data.cost}
                  onChange={(v) => update("cost", v)}
                  hintKey="cost"
                  showHint={showHint}
                  setShowHint={setShowHint}
                  icon={DollarSign}
                  testId="textarea-cost"
                />
                <FieldBlock
                  label="What data is available?"
                  placeholder="What information exists today that could feed the solution?..."
                  value={data.availableData}
                  onChange={(v) => update("availableData", v)}
                  hintKey="availableData"
                  showHint={showHint}
                  setShowHint={setShowHint}
                  testId="textarea-data"
                />
              </div>
            </Card>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="phase2" initial="hidden" animate="visible" exit="exit" variants={{ ...slideIn, ...slideOut }}>
            <Card className="p-8 border-[#7C3AED]/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#7C3AED] flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7C3AED] uppercase">PHASE 2</p>
                  <h2 className="text-lg font-semibold">Technology Solution — How do we do it?</h2>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-8 ml-[52px]">Select the type of AI that best fits your use case</p>

              <div className="grid grid-cols-2 gap-4">
                {aiTypes.map((t) => {
                  const isSelected = data.aiType === t.id;
                  return (
                    <motion.button
                      key={t.id}
                      onClick={() => update("aiType", t.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-[#7C3AED] bg-[#7C3AED]/5 shadow-lg shadow-violet-500/10"
                          : "border-border bg-background hover:border-[#7C3AED]/30"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      data-testid={`button-ai-type-${t.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${t.color}15` }}
                        >
                          <t.icon className="w-6 h-6" style={{ color: t.color }} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">{t.label}</p>
                          <p className="text-xs text-muted-foreground">{t.desc}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          className="mt-3 flex items-center gap-1 text-[#7C3AED] text-xs font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">Not sure?</span> Choose <span className="font-medium">Assistants</span> for productivity gains with generative AI, <span className="font-medium">ML</span> for prediction and optimization, <span className="font-medium">Agents</span> for automating multi-step workflows, or <span className="font-medium">Computer Vision</span> for image/video analysis.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div key="phase3" initial="hidden" animate="visible" exit="exit" variants={{ ...slideIn, ...slideOut }}>
            <Card className="p-8 border-[#7C3AED]/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7C3AED] uppercase">PHASE 3</p>
                  <h2 className="text-lg font-semibold">Desired Outcome — Where do we want to go?</h2>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-6 ml-[52px]">Define what success looks like</p>

              <div className="space-y-6">
                <FieldBlock
                  label="How will you measure success?"
                  placeholder="What KPI changes and by how much?..."
                  value={data.successMetric}
                  onChange={(v) => update("successMetric", v)}
                  hintKey="successMetric"
                  showHint={showHint}
                  setShowHint={setShowHint}
                  icon={Target}
                  testId="textarea-success-metric"
                />
                <FieldBlock
                  label="Who benefits?"
                  placeholder="What area, role, or process improves?..."
                  value={data.beneficiary}
                  onChange={(v) => update("beneficiary", v)}
                  hintKey="beneficiary"
                  showHint={showHint}
                  setShowHint={setShowHint}
                  icon={Users}
                  testId="textarea-beneficiary"
                />
                <FieldBlock
                  label="What are the scenarios?"
                  placeholder="Optimistic, base, and conservative..."
                  value={data.scenarios}
                  onChange={(v) => update("scenarios", v)}
                  hintKey="scenarios"
                  showHint={showHint}
                  setShowHint={setShowHint}
                  testId="textarea-scenarios"
                />
              </div>
            </Card>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div key="phase4" initial="hidden" animate="visible" exit="exit" variants={{ ...slideIn, ...slideOut }}>
            <div className="space-y-4">
              <Card className="p-8 border-[#7C3AED]/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7C3AED] uppercase">FINAL REVIEW</p>
                    <h2 className="text-lg font-semibold">Review & Submit Your Case</h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">Project Details</p>
                    <div className="space-y-3">
                      <ReviewItem label="Project" value={data.projectName} />
                      <ReviewItem label="Department" value={data.department} />
                      <ReviewItem label="Urgency" value={data.urgency} capitalize />
                      <ReviewItem label="AI Type" value={aiTypes.find(t => t.id === data.aiType)?.label || "—"} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">Priority Score</p>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#7C3AED]/5 to-[#5B21B6]/5 border border-[#7C3AED]/10">
                      <p className="text-5xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent">{score}</p>
                      <p className="text-xs text-muted-foreground mt-1">out of 100</p>
                      <Badge className={`${priority.bg} text-white border-0 mt-2`}>{priority.label}</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <ReviewSection title="Pain Point" content={data.painPoint} />
                  <ReviewSection title="Current Process" content={data.currentProcess} />
                  <ReviewSection title="Cost" content={data.cost} />
                  <ReviewSection title="Available Data" content={data.availableData} />
                  <ReviewSection title="Success Metric" content={data.successMetric} />
                  <ReviewSection title="Beneficiary" content={data.beneficiary} />
                  {data.scenarios && <ReviewSection title="Scenarios" content={data.scenarios} />}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold mb-3">Score Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {breakdown.map((b) => (
                    <div key={b.label} className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold">{b.score}<span className="text-xs text-muted-foreground font-normal">/{b.max}</span></p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{b.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeUp} className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setPhase(p => p - 1)}
          disabled={phase === 0}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="flex items-center gap-2">
          {phases.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === phase ? "bg-[#7C3AED] w-6" : i < phase ? "bg-[#7C3AED]/40" : "bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>

        {phase < 4 ? (
          <Button
            className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]"
            onClick={() => setPhase(p => p + 1)}
            disabled={!canAdvance()}
            data-testid="button-next"
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white border-0"
            onClick={() => setSubmitted(true)}
            data-testid="button-submit-case"
          >
            <Zap className="w-4 h-4 mr-2" /> Submit Case
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}

function FieldBlock({
  label, placeholder, value, onChange, hintKey, showHint, setShowHint, icon: Icon, testId,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
  hintKey: string; showHint: string | null; setShowHint: (k: string | null) => void;
  icon?: typeof DollarSign; testId: string;
}) {
  const fieldHints = hints[hintKey] || [];
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[#7C3AED]" />}
          {label}
        </label>
        {value.length > 0 && (
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        )}
      </div>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[80px] bg-background resize-none"
        data-testid={testId}
      />
      <div className="flex items-center justify-between mt-1.5">
        <button
          className="text-[11px] text-[#7C3AED] flex items-center gap-1 font-medium"
          onClick={() => setShowHint(showHint === hintKey ? null : hintKey)}
          data-testid={`button-hint-${hintKey}`}
        >
          <Lightbulb className="w-3 h-3" />
          {showHint === hintKey ? "Hide hints" : "Need a hint?"}
        </button>
        <span className="text-[10px] text-muted-foreground">{value.length} chars</span>
      </div>
      <AnimatePresence>
        {showHint === hintKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 space-y-1.5">
              {fieldHints.map((h, i) => (
                <p key={i} className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Example:</span> {h}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewItem({ label, value, capitalize }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${capitalize ? "capitalize" : ""}`}>{value}</span>
    </div>
  );
}

function ReviewSection({ title, content }: { title: string; content: string }) {
  if (!content) return null;
  return (
    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
      <p className="text-[10px] uppercase tracking-wider text-[#7C3AED] font-semibold mb-1.5">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}
