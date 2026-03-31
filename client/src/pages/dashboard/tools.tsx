import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AiTool } from "@shared/schema";
import {
  ExternalLink, Plus, Bot, FileText, Code, Image, MessageSquare, BarChart3,
  ArrowLeft, ArrowRight, Trash2, CheckCircle2, Clock, DollarSign, Zap,
  AlertCircle, X, type LucideIcon
} from "lucide-react";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const categoryIcons: Record<string, LucideIcon> = {
  "Writing": FileText, "Code": Code, "Image": Image, "Chat": MessageSquare, "Analytics": BarChart3, "Assistant": Bot,
};

const defaultTools: Array<{ id: string; name: string; category: string; vendor: string; status: string; usageCount: number }> = [
  { id: "1", name: "ChatGPT Enterprise", category: "Chat", vendor: "OpenAI", status: "approved", usageCount: 342 },
  { id: "2", name: "GitHub Copilot", category: "Code", vendor: "GitHub", status: "approved", usageCount: 189 },
  { id: "3", name: "Jasper AI", category: "Writing", vendor: "Jasper", status: "approved", usageCount: 156 },
  { id: "4", name: "Midjourney", category: "Image", vendor: "Midjourney", status: "approved", usageCount: 87 },
  { id: "5", name: "Tableau AI", category: "Analytics", vendor: "Salesforce", status: "approved", usageCount: 203 },
  { id: "6", name: "Claude", category: "Assistant", vendor: "Anthropic", status: "approved", usageCount: 278 },
  { id: "7", name: "Notion AI", category: "Writing", vendor: "Notion", status: "review", usageCount: 0 },
  { id: "8", name: "Cursor", category: "Code", vendor: "Cursor Inc.", status: "review", usageCount: 0 },
];

const approvedToolOptions = [
  "ChatGPT Enterprise",
  "GitHub Copilot",
  "Jasper AI",
  "Midjourney",
  "Tableau AI",
  "Claude",
  "Notion AI",
  "Cursor",
  "Grammarly Business",
  "Perplexity Pro",
  "Canva AI",
  "Salesforce Einstein",
];

const toolCategories = ["Chat", "Code", "Writing", "Image", "Analytics", "Assistant", "Automation", "Design", "Research", "Other"];

interface TaskEntry {
  description: string;
  hoursPerWeek: number;
  dollarsSaved: number;
}

const MAX_TASKS = 5;

function emptyTask(): TaskEntry {
  return { description: "", hoursPerWeek: 0, dollarsSaved: 0 };
}

interface ToolRequestForm {
  toolSource: "approved" | "custom";
  toolName: string;
  customToolName: string;
  toolCategory: string;
  tasks: TaskEntry[];
  currentLimitation: string;
  reason: string;
  requestType: "trial" | "permanent";
  urgency: "low" | "medium" | "high" | "critical";
  additionalContext: string;
}

function initialForm(): ToolRequestForm {
  return {
    toolSource: "approved",
    toolName: "",
    customToolName: "",
    toolCategory: "",
    tasks: [emptyTask()],
    currentLimitation: "",
    reason: "",
    requestType: "trial",
    urgency: "medium",
    additionalContext: "",
  };
}

const STEPS = [
  { title: "Tool Selection", icon: Zap },
  { title: "Tasks & Impact", icon: Clock },
  { title: "Justification", icon: AlertCircle },
  { title: "Review & Submit", icon: CheckCircle2 },
];

export default function ToolsPage() {
  const { data: tools } = useQuery<AiTool[]>({ queryKey: ["/api/ai-tools"] });
  const displayTools = tools || defaultTools;
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ToolRequestForm>(initialForm());
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await apiRequest("POST", "/api/tool-requests", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tool-requests"] });
      setSubmitted(true);
    },
    onError: () => {
      toast({ title: "Error", description: "Could not submit the request. Please try again.", variant: "destructive" });
    },
  });

  const updateForm = (updates: Partial<ToolRequestForm>) => setForm((prev) => ({ ...prev, ...updates }));

  const addTask = () => {
    if (form.tasks.length < MAX_TASKS) {
      updateForm({ tasks: [...form.tasks, emptyTask()] });
    }
  };

  const removeTask = (idx: number) => {
    if (form.tasks.length > 1) {
      updateForm({ tasks: form.tasks.filter((_, i) => i !== idx) });
    }
  };

  const updateTask = (idx: number, field: keyof TaskEntry, value: string | number) => {
    const updated = [...form.tasks];
    updated[idx] = { ...updated[idx], [field]: value };
    updateForm({ tasks: updated });
  };

  const totalHours = form.tasks.reduce((sum, t) => sum + (t.hoursPerWeek || 0), 0);
  const totalDollars = form.tasks.reduce((sum, t) => sum + (t.dollarsSaved || 0), 0);

  const resolvedToolName = form.toolSource === "custom" ? form.customToolName : form.toolName;

  const canAdvance = (s: number): boolean => {
    if (s === 0) return resolvedToolName.trim().length > 0;
    if (s === 1) return form.tasks.some((t) => t.description.trim().length > 0);
    if (s === 2) return form.reason.trim().length > 0;
    return true;
  };

  const handleSubmit = () => {
    mutation.mutate({
      userId: "demo",
      toolName: resolvedToolName,
      toolCategory: form.toolCategory || null,
      isCustomTool: form.toolSource === "custom",
      reason: form.reason,
      currentLimitation: form.currentLimitation || null,
      tasks: form.tasks.filter((t) => t.description.trim()),
      requestType: form.requestType,
      urgency: form.urgency,
      additionalContext: form.additionalContext || null,
      totalTimeSaved: totalHours,
      totalDollarsSaved: totalDollars,
      priority: form.urgency,
      status: "submitted",
    });
  };

  const handleClose = () => {
    setShowForm(false);
    setStep(0);
    setForm(initialForm());
    setSubmitted(false);
  };

  if (showForm) {
    return (
      <motion.div className="max-w-2xl mx-auto space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-request-title">Request a Tool</h1>
            <p className="text-muted-foreground text-sm mt-1">Tell us what you need and why</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose} data-testid="button-close-form">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {!submitted && (
          <div className="flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  i === step ? "bg-[#7C3AED]/10 text-[#7C3AED]" : i < step ? "text-green-600" : "text-muted-foreground"
                }`}>
                  {i < step ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{s.title}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-1 ${i < step ? "bg-green-400" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2" data-testid="text-success-title">Request Submitted</h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Your request for <span className="font-semibold text-foreground">{resolvedToolName}</span> has been submitted.
                You'll receive a notification when it's reviewed.
              </p>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="text-center px-4 py-2 rounded-lg bg-muted/50">
                  <p className="text-lg font-bold text-[#7C3AED]">{totalHours}h</p>
                  <p className="text-[10px] text-muted-foreground">per week saved</p>
                </div>
                <div className="text-center px-4 py-2 rounded-lg bg-muted/50">
                  <p className="text-lg font-bold text-green-600">${totalDollars.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">estimated savings</p>
                </div>
              </div>
              <Button onClick={handleClose} className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-back-to-tools">
                Back to Tools
              </Button>
            </motion.div>
          ) : (
            <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Card className="p-6">
                {step === 0 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold mb-3 block">What tool do you need?</label>
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={() => updateForm({ toolSource: "approved" })}
                          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                            form.toolSource === "approved"
                              ? "border-[#7C3AED] bg-[#7C3AED]/5 text-[#7C3AED]"
                              : "border-border text-muted-foreground"
                          }`}
                          data-testid="button-source-approved"
                        >
                          From approved list
                        </button>
                        <button
                          onClick={() => updateForm({ toolSource: "custom" })}
                          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                            form.toolSource === "custom"
                              ? "border-[#7C3AED] bg-[#7C3AED]/5 text-[#7C3AED]"
                              : "border-border text-muted-foreground"
                          }`}
                          data-testid="button-source-custom"
                        >
                          Request a new tool
                        </button>
                      </div>

                      {form.toolSource === "approved" ? (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground mb-2">Select from tools already approved by your organization:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {approvedToolOptions.map((t) => (
                              <button
                                key={t}
                                onClick={() => updateForm({ toolName: t })}
                                className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                                  form.toolName === t
                                    ? "border-[#7C3AED] bg-[#7C3AED]/5 text-[#7C3AED]"
                                    : "border-border text-foreground hover:border-[#7C3AED]/30"
                                }`}
                                data-testid={`button-tool-${t.replace(/\s+/g, "-").toLowerCase()}`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Tool name</label>
                            <input
                              type="text"
                              value={form.customToolName}
                              onChange={(e) => updateForm({ customToolName: e.target.value })}
                              placeholder="e.g., Otter.ai, Loom AI, Fireflies..."
                              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
                              data-testid="input-custom-tool-name"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Category</label>
                            <div className="flex flex-wrap gap-1.5">
                              {toolCategories.map((c) => (
                                <button
                                  key={c}
                                  onClick={() => updateForm({ toolCategory: c })}
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                                    form.toolCategory === c
                                      ? "border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]"
                                      : "border-border text-muted-foreground"
                                  }`}
                                  data-testid={`button-category-${c.toLowerCase()}`}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold mb-1 block">What tasks will you use it for?</label>
                      <p className="text-xs text-muted-foreground mb-4">Add up to {MAX_TASKS} tasks. Estimate the time and money you'd save per week.</p>

                      <div className="space-y-3">
                        {form.tasks.map((task, i) => (
                          <div key={i} className="p-4 rounded-lg border border-border bg-muted/20 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted-foreground">Task {i + 1}</span>
                              {form.tasks.length > 1 && (
                                <button onClick={() => removeTask(i)} className="text-muted-foreground hover:text-red-500 transition-colors" data-testid={`button-remove-task-${i}`}>
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                            <input
                              type="text"
                              value={task.description}
                              onChange={(e) => updateTask(i, "description", e.target.value)}
                              placeholder="Describe the task..."
                              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
                              data-testid={`input-task-description-${i}`}
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] text-muted-foreground mb-1 block flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> Hours saved / week
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.5"
                                  value={task.hoursPerWeek || ""}
                                  onChange={(e) => updateTask(i, "hoursPerWeek", parseFloat(e.target.value) || 0)}
                                  placeholder="0"
                                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
                                  data-testid={`input-task-hours-${i}`}
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-muted-foreground mb-1 block flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" /> Est. $ saved / month
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  value={task.dollarsSaved || ""}
                                  onChange={(e) => updateTask(i, "dollarsSaved", parseFloat(e.target.value) || 0)}
                                  placeholder="0"
                                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
                                  data-testid={`input-task-dollars-${i}`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {form.tasks.length < MAX_TASKS && (
                        <button
                          onClick={addTask}
                          className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#7C3AED] hover:text-[#5B21B6] transition-colors"
                          data-testid="button-add-task"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add another task
                        </button>
                      )}

                      {form.tasks.some((t) => t.hoursPerWeek > 0 || t.dollarsSaved > 0) && (
                        <div className="mt-4 flex items-center gap-4 p-3 rounded-lg bg-[#7C3AED]/5 border border-[#7C3AED]/10">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#7C3AED]" />
                            <div>
                              <p className="text-sm font-bold text-[#7C3AED]">{totalHours}h / week</p>
                              <p className="text-[10px] text-muted-foreground">Total time saved</p>
                            </div>
                          </div>
                          <div className="w-px h-8 bg-[#7C3AED]/10" />
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="text-sm font-bold text-green-600">${totalDollars.toLocaleString()} / month</p>
                              <p className="text-[10px] text-muted-foreground">Estimated savings</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold mb-1 block">Why do you need this tool?</label>
                      <p className="text-xs text-muted-foreground mb-2">Explain the main reason for your request.</p>
                      <textarea
                        value={form.reason}
                        onChange={(e) => updateForm({ reason: e.target.value })}
                        placeholder="e.g., I need to transcribe client meetings automatically and generate summaries..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] resize-none"
                        data-testid="input-reason"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-1 block">What are you currently using?</label>
                      <p className="text-xs text-muted-foreground mb-2">Why can't you do this with the tools you already have?</p>
                      <textarea
                        value={form.currentLimitation}
                        onChange={(e) => updateForm({ currentLimitation: e.target.value })}
                        placeholder="e.g., I'm taking notes manually which takes 30 min per meeting. Google Docs doesn't have AI transcription..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] resize-none"
                        data-testid="input-limitation"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Request type</label>
                        <div className="space-y-2">
                          {[
                            { value: "trial" as const, label: "Trial (1 month)", desc: "Test it first, then decide" },
                            { value: "permanent" as const, label: "Permanent", desc: "I need it long-term" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => updateForm({ requestType: opt.value })}
                              className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${
                                form.requestType === opt.value
                                  ? "border-[#7C3AED] bg-[#7C3AED]/5"
                                  : "border-border"
                              }`}
                              data-testid={`button-type-${opt.value}`}
                            >
                              <p className={`text-xs font-medium ${form.requestType === opt.value ? "text-[#7C3AED]" : "text-foreground"}`}>{opt.label}</p>
                              <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold mb-2 block">How urgent is it?</label>
                        <div className="space-y-2">
                          {[
                            { value: "low" as const, label: "Low", color: "text-blue-600" },
                            { value: "medium" as const, label: "Medium", color: "text-amber-600" },
                            { value: "high" as const, label: "High", color: "text-orange-600" },
                            { value: "critical" as const, label: "Critical", color: "text-red-600" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => updateForm({ urgency: opt.value })}
                              className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                                form.urgency === opt.value
                                  ? "border-[#7C3AED] bg-[#7C3AED]/5"
                                  : "border-border"
                              }`}
                              data-testid={`button-urgency-${opt.value}`}
                            >
                              <p className={`text-xs font-medium ${form.urgency === opt.value ? opt.color : "text-foreground"}`}>{opt.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-1 block">Anything else? <span className="text-muted-foreground font-normal">(optional)</span></label>
                      <textarea
                        value={form.additionalContext}
                        onChange={(e) => updateForm({ additionalContext: e.target.value })}
                        placeholder="Links, documentation, team members who also need it..."
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] resize-none"
                        data-testid="input-additional"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <p className="text-sm font-semibold">Review your request</p>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Tool</p>
                        <p className="text-sm font-semibold" data-testid="text-review-tool">{resolvedToolName}</p>
                        {form.toolCategory && <p className="text-xs text-muted-foreground">{form.toolCategory}</p>}
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-[10px]">
                            {form.requestType === "trial" ? "1-month trial" : "Permanent"}
                          </Badge>
                          <Badge variant="outline" className={`text-[10px] ${
                            form.urgency === "critical" ? "text-red-600 border-red-200" :
                            form.urgency === "high" ? "text-orange-600 border-orange-200" :
                            form.urgency === "medium" ? "text-amber-600 border-amber-200" :
                            "text-blue-600 border-blue-200"
                          }`}>
                            {form.urgency} urgency
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Tasks ({form.tasks.filter((t) => t.description.trim()).length})</p>
                        <div className="space-y-2">
                          {form.tasks.filter((t) => t.description.trim()).map((t, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <span className="text-foreground">{t.description}</span>
                              <div className="flex items-center gap-3 text-muted-foreground flex-shrink-0">
                                {t.hoursPerWeek > 0 && <span>{t.hoursPerWeek}h/wk</span>}
                                {t.dollarsSaved > 0 && <span className="text-green-600">${t.dollarsSaved}/mo</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[#7C3AED]/5 border border-[#7C3AED]/10 text-center">
                          <p className="text-xl font-bold text-[#7C3AED]">{totalHours}h</p>
                          <p className="text-[10px] text-muted-foreground">saved per week</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-center">
                          <p className="text-xl font-bold text-green-600">${totalDollars.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">saved per month</p>
                        </div>
                      </div>

                      {form.reason && (
                        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Reason</p>
                          <p className="text-xs text-foreground">{form.reason}</p>
                        </div>
                      )}

                      {form.currentLimitation && (
                        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Current limitations</p>
                          <p className="text-xs text-foreground">{form.currentLimitation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => step === 0 ? handleClose() : setStep(step - 1)}
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  {step === 0 ? "Cancel" : "Back"}
                </Button>

                {step < STEPS.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => setStep(step + 1)}
                    disabled={!canAdvance(step)}
                    className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]"
                    data-testid="button-next"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                    className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]"
                    data-testid="button-submit-request"
                  >
                    {mutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">AI Tools</h1>
          <p className="text-muted-foreground text-sm mt-1">Your approved tools and requests</p>
        </div>
        <Button
          size="sm"
          className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]"
          onClick={() => setShowForm(true)}
          data-testid="button-request-tool"
        >
          <Plus className="w-4 h-4 mr-1" /> Request Tool
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayTools.map((tool: any) => {
          const Icon = categoryIcons[tool.category] || Bot;
          return (
            <motion.div key={tool.id} variants={fadeUp}>
              <Card className="p-4 h-full flex flex-col" data-testid={`card-tool-${tool.id}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-md bg-[#7C3AED]/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-[#7C3AED]" />
                  </div>
                  <Badge variant={tool.status === "approved" ? "secondary" : "outline"} className="text-[10px]">
                    {tool.status === "approved" ? "Approved" : "In Review"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm">{tool.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{tool.vendor} · {tool.category}</p>
                {tool.status === "approved" && (
                  <p className="text-xs text-muted-foreground mb-auto">{tool.usageCount} uses this month</p>
                )}
                <div className="mt-3">
                  {tool.status === "approved" ? (
                    <Button size="sm" variant="outline" className="w-full rounded-full text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" /> Launch
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" className="w-full rounded-full text-xs" disabled>
                      Pending Review
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
