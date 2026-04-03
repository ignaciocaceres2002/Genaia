import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Copy, Upload, Clock, Zap, Tag, Wrench, CheckCircle2, Info, ChevronDown, ChevronUp, TrendingUp, ShieldCheck } from "lucide-react";
import type { AiUseCase } from "@shared/schema";
import { SEO } from "@/components/seo";

import { fadeUp, pageContainer } from "@/lib/motion-variants";

const PROMPT_TEMPLATE = `Acabo de completar una tarea usando IA. Antes de generar el resumen, haceme estas preguntas (una por una, usando el widget de opciones):

1. "¿Hubieras podido hacer esta tarea sin IA?"
   → Sí, pero más lento | Parcialmente (algunas partes no) | No la hubiera hecho

2. "¿Cuánto te hubiera llevado la parte que sí podrías haber hecho?"
   → Menos de 1 hora | 1–3 horas | Medio día | Un día entero | Varios días

3. "¿Cuánto tiempo le dedicaste vos en total? (pensando, escribiendo, revisando — todo)"
   → Menos de 15 min | 15–30 min | 30–60 min | 1–2 horas | Más de 2 horas

Después generá el resumen con este formato:

---
TAREA: [nombre corto]
CATEGORÍA: [Automatización | Análisis de datos | Creación de contenido | Investigación | Comunicación | Código | Diseño | Estrategia | Otro]
HERRAMIENTAS: [herramientas de IA usadas]
MI TIEMPO REAL: [lo que respondió el usuario]
ESTIMACIÓN SIN IA: [lo que respondió + ajustado por lo que no hubiera podido hacer]
RATIO: [estimación sin IA / tiempo real, redondeado]
PUDO HACERSE SIN IA: [respuesta del usuario]
RESUMEN: [2-3 oraciones]
---

Para la tarea y categoría, inferirlo de la conversación.
Para el resumen, describir qué se hizo, el proceso y el resultado concreto.

La tarea fue:`;

function parseTimeRange(value: string): number {
  const v = value.toLowerCase().trim();
  if (v.includes("menos de 15") || v.includes("< 15")) return 10;
  if (v.includes("15") && v.includes("30")) return 22;
  if (v.includes("30") && v.includes("60")) return 45;
  if (v.includes("1") && v.includes("2") && v.includes("hora")) return 90;
  if (v.includes("más de 2") || v.includes("> 2")) return 150;
  if (v.includes("menos de 1 hora") || v.includes("< 1")) return 45;
  if (v.includes("1") && v.includes("3") && v.includes("hora")) return 120;
  if (v.includes("medio día") || v.includes("medio dia")) return 240;
  if (v.includes("día entero") || v.includes("dia entero") || v.includes("un día")) return 480;
  if (v.includes("varios días") || v.includes("varios dias")) return 960;
  const match = v.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function parseUseCaseText(text: string): {
  taskName: string;
  taskCategory: string;
  toolsUsed: string;
  timeInvestedMinutes: number;
  timeSavedMinutes: number;
  ratio: string;
  couldDoWithoutAi: string;
  summary: string;
} {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  let taskName = "";
  let taskCategory = "";
  let toolsUsed = "";
  let myRealTime = "";
  let estimationWithoutAi = "";
  let ratio = "";
  let couldDoWithoutAi = "";
  let summary = "";

  for (const line of lines) {
    const clean = line.replace(/^\*\*/, "").replace(/\*\*$/, "").trim();
    if (clean.toUpperCase().startsWith("TAREA:")) {
      taskName = clean.replace(/^TAREA:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("CATEGORÍA:") || clean.toUpperCase().startsWith("CATEGORIA:")) {
      taskCategory = clean.replace(/^CATEGOR[ÍI]A:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("HERRAMIENTAS:") || clean.toUpperCase().startsWith("HERRAMIENTA:")) {
      toolsUsed = clean.replace(/^HERRAMIENTAS?:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("MI TIEMPO REAL:")) {
      myRealTime = clean.replace(/^MI TIEMPO REAL:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("ESTIMACIÓN SIN IA:") || clean.toUpperCase().startsWith("ESTIMACION SIN IA:")) {
      estimationWithoutAi = clean.replace(/^ESTIMACI[ÓO]N SIN IA:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("RATIO:")) {
      ratio = clean.replace(/^RATIO:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("PUDO HACERSE SIN IA:")) {
      couldDoWithoutAi = clean.replace(/^PUDO HACERSE SIN IA:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("RESUMEN:")) {
      summary = clean.replace(/^RESUMEN:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("TIEMPO INVERTIDO:")) {
      myRealTime = clean.replace(/^TIEMPO INVERTIDO:\s*/i, "").trim();
    } else if (clean.toUpperCase().startsWith("TIEMPO AHORRADO:")) {
      estimationWithoutAi = clean.replace(/^TIEMPO AHORRADO:\s*/i, "").trim();
    }
  }

  const timeInvestedMinutes = parseTimeRange(myRealTime);
  const estimatedWithoutAiMinutes = parseTimeRange(estimationWithoutAi);
  const timeSavedMinutes = Math.max(0, estimatedWithoutAiMinutes - timeInvestedMinutes);

  return { taskName, taskCategory, toolsUsed, timeInvestedMinutes, timeSavedMinutes, ratio, couldDoWithoutAi, summary };
}

function ContributionGrid({ useCases }: { useCases: AiUseCase[] }) {
  const today = new Date();
  const days = 30;
  const grid: { date: string; count: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = useCases.filter(uc => {
      const ucDate = new Date(uc.createdAt!).toISOString().split("T")[0];
      return ucDate === dateStr;
    }).length;
    grid.push({ date: dateStr, count });
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-violet-200";
    if (count === 2) return "bg-violet-400";
    return "bg-violet-600";
  };

  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < grid.length; i += 7) {
    weeks.push(grid.slice(i, i + 7));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium">AI Contributions</span>
        <span className="text-xs text-muted-foreground">Last 30 days</span>
      </div>
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                className={`w-4 h-4 rounded-sm ${getColor(day.count)} transition-colors`}
                title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                data-testid={`contribution-${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-2">
        <span className="text-[10px] text-muted-foreground mr-1">Less</span>
        <div className="w-3 h-3 rounded-sm bg-muted" />
        <div className="w-3 h-3 rounded-sm bg-violet-200" />
        <div className="w-3 h-3 rounded-sm bg-violet-400" />
        <div className="w-3 h-3 rounded-sm bg-violet-600" />
        <span className="text-[10px] text-muted-foreground ml-1">More</span>
      </div>
    </div>
  );
}

export default function UseCasesPage() {
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState<ReturnType<typeof parseUseCaseText> | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const { toast } = useToast();

  const { data: useCases = [], isLoading } = useQuery<AiUseCase[]>({
    queryKey: ["/api/ai-use-cases/user", "demo-user"],
  });

  const submitMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await apiRequest("POST", "/api/ai-use-cases", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai-use-cases/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/ai-use-cases"] });
      setRawText("");
      setParsed(null);
      toast({ title: "Use case submitted!", description: "Your AI contribution has been recorded." });
    },
  });

  const handleTextChange = (text: string) => {
    setRawText(text);
    if (text.includes("TAREA:") || text.includes("tarea:")) {
      const result = parseUseCaseText(text);
      if (result.taskName) {
        setParsed(result);
      }
    } else {
      setParsed(null);
    }
  };

  const handleSubmit = () => {
    if (!parsed || !parsed.taskName) return;

    const qualityScore = Math.min(100, Math.round(
      (parsed.timeSavedMinutes > 0 ? 25 : 0) +
      (parsed.taskCategory ? 20 : 0) +
      (parsed.toolsUsed ? 20 : 0) +
      (parsed.summary ? 25 : 0) +
      (parsed.timeInvestedMinutes > 0 ? 10 : 0)
    ));

    const pointsAwarded = Math.round(qualityScore * 0.5 + (parsed.timeSavedMinutes * 0.2));

    submitMutation.mutate({
      userId: "demo-user",
      userName: "Sarah Chen",
      rawText,
      taskName: parsed.taskName,
      taskCategory: parsed.taskCategory,
      toolsUsed: parsed.toolsUsed,
      timeSavedMinutes: parsed.timeSavedMinutes,
      timeInvestedMinutes: parsed.timeInvestedMinutes,
      qualityScore,
      pointsAwarded,
      status: "submitted",
    });
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(PROMPT_TEMPLATE);
    toast({ title: "Prompt copied!", description: "Paste it in your AI tool after completing a task." });
  };

  const totalTimeSaved = useCases.reduce((acc, uc) => acc + (uc.timeSavedMinutes || 0), 0);
  const totalContributions = useCases.length;

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <SEO title="AI Use Cases - Genaia" description="Submit and track your AI use cases. Show your contributions and impact." />

      <motion.div variants={fadeUp}>
        <h1 className="text-display-xs font-bold" data-testid="text-use-cases-title">AI Use Cases</h1>
        <p className="text-muted-foreground text-sm mt-1">Share your AI wins and track your impact</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-chart-1" data-testid="text-total-contributions">{totalContributions}</p>
          <p className="text-xs text-muted-foreground mt-1">Contributions</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600" data-testid="text-total-time-saved">{totalTimeSaved}</p>
          <p className="text-xs text-muted-foreground mt-1">Minutes Saved</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-600" data-testid="text-total-points">
            {useCases.reduce((acc, uc) => acc + (uc.pointsAwarded || 0), 0)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Points Earned</p>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <ContributionGrid useCases={useCases} />
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <button
            className="flex items-center justify-between w-full text-left"
            onClick={() => setShowInstructions(!showInstructions)}
            data-testid="button-toggle-instructions"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-chart-1" />
              <span className="font-medium text-sm">How to submit a use case</span>
            </div>
            {showInstructions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showInstructions && (
            <div className="mt-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-chart-1 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium">Complete a task using AI</p>
                    <p className="text-xs text-muted-foreground">Use any AI tool for any task — writing, analysis, coding, research, etc.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-chart-1 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium">Copy this prompt and paste it in your AI tool</p>
                    <p className="text-xs text-muted-foreground">The AI will ask you 3 quick questions and then generate a structured summary.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-chart-1 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium">Paste the summary below</p>
                    <p className="text-xs text-muted-foreground">We'll auto-detect and classify everything.</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 relative">
                <pre className="text-xs whitespace-pre-wrap text-muted-foreground leading-relaxed">{PROMPT_TEMPLATE}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-3 right-3 rounded-full"
                  onClick={copyPrompt}
                  data-testid="button-copy-prompt"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-4 h-4 text-chart-1" />
            <span className="font-medium text-sm">Submit your AI use case</span>
          </div>
          <Textarea
            placeholder="Paste the structured summary from your AI tool here..."
            value={rawText}
            onChange={(e) => handleTextChange(e.target.value)}
            className="min-h-[120px] resize-none"
            data-testid="input-use-case-text"
          />

          {parsed && parsed.taskName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Detected fields</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Task</p>
                      <p className="text-sm font-medium" data-testid="text-parsed-task">{parsed.taskName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Category</p>
                      <p className="text-sm font-medium" data-testid="text-parsed-category">{parsed.taskCategory || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Tools</p>
                      <p className="text-sm font-medium" data-testid="text-parsed-tools">{parsed.toolsUsed || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">My Real Time</p>
                      <p className="text-sm font-medium" data-testid="text-parsed-time-invested">{parsed.timeInvestedMinutes} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Time Saved</p>
                      <p className="text-sm font-medium text-green-600" data-testid="text-parsed-time-saved">{parsed.timeSavedMinutes} min</p>
                    </div>
                  </div>
                  {parsed.ratio && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] text-muted-foreground">Ratio</p>
                        <p className="text-sm font-medium text-chart-1" data-testid="text-parsed-ratio">{parsed.ratio}x</p>
                      </div>
                    </div>
                  )}
                  {parsed.couldDoWithoutAi && (
                    <div className="flex items-center gap-2 col-span-2 md:col-span-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] text-muted-foreground">Could do without AI?</p>
                        <p className="text-sm font-medium" data-testid="text-parsed-without-ai">{parsed.couldDoWithoutAi}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="w-full bg-chart-1 text-white border-chart-1"
                data-testid="button-submit-use-case"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Use Case"}
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-semibold mb-3">Your Submissions</h2>
        {isLoading ? (
          <Card className="p-8 text-center text-muted-foreground text-sm">Loading...</Card>
        ) : useCases.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground text-sm">
            No use cases yet. Submit your first AI win!
          </Card>
        ) : (
          <div className="space-y-3">
            {useCases.map((uc) => (
              <Card key={uc.id} className="p-4" data-testid={`card-use-case-${uc.id}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium">{uc.taskName || "Untitled Task"}</p>
                      {uc.taskCategory && (
                        <Badge variant="secondary" className="text-[10px]">{uc.taskCategory}</Badge>
                      )}
                    </div>
                    {uc.toolsUsed && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <Wrench className="w-3 h-3 inline mr-1" />
                        {uc.toolsUsed}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {uc.timeSavedMinutes} min saved
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {uc.timeInvestedMinutes} min invested
                      </span>
                      <span className="text-xs text-amber-600 font-medium">
                        +{uc.pointsAwarded} pts
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={uc.status === "approved" ? "default" : "secondary"}
                    className="text-[10px] flex-shrink-0"
                  >
                    {uc.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
