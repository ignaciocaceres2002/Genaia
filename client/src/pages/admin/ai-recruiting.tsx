import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bot, UserCheck, BrainCircuit, TrendingDown, DollarSign, Send, Sparkles, CheckCircle2, XCircle, AlertTriangle, RotateCcw } from "lucide-react";
import { SEO } from "@/components/seo";

import { fadeUp, pageContainer } from "@/lib/motion-variants";

const TAXONOMY: Record<string, { automatizability: string; level: number }> = {
  "procesamiento de datos": { automatizability: "Alta", level: 5 },
  "carga de facturas": { automatizability: "Alta", level: 5 },
  "conciliación": { automatizability: "Alta", level: 5 },
  "reportes": { automatizability: "Alta", level: 5 },
  "redacción": { automatizability: "Alta", level: 5 },
  "emails": { automatizability: "Alta", level: 5 },
  "resúmenes": { automatizability: "Alta", level: 5 },
  "minutas": { automatizability: "Alta", level: 5 },
  "descripciones de producto": { automatizability: "Alta", level: 5 },
  "clasificación": { automatizability: "Alta", level: 5 },
  "categorización": { automatizability: "Alta", level: 5 },
  "tickets": { automatizability: "Alta", level: 5 },
  "soporte": { automatizability: "Alta", level: 5 },
  "búsqueda": { automatizability: "Alta", level: 5 },
  "research": { automatizability: "Alta", level: 5 },
  "investigación": { automatizability: "Alta", level: 5 },
  "benchmarks": { automatizability: "Alta", level: 5 },
  "due diligence": { automatizability: "Alta", level: 5 },
  "atención al cliente": { automatizability: "Alta", level: 5 },
  "faqs": { automatizability: "Alta", level: 5 },
  "onboarding": { automatizability: "Alta", level: 5 },
  "seguimiento de pedidos": { automatizability: "Alta", level: 5 },
  "análisis de datos": { automatizability: "Media-Alta", level: 4 },
  "dashboards": { automatizability: "Media-Alta", level: 4 },
  "coordinación": { automatizability: "Media", level: 3 },
  "agenda": { automatizability: "Media", level: 3 },
  "scheduling": { automatizability: "Media", level: 3 },
  "logística": { automatizability: "Media", level: 3 },
  "gestión de proyectos": { automatizability: "Media", level: 3 },
  "seguimiento de tareas": { automatizability: "Media", level: 3 },
  "diseño gráfico": { automatizability: "Media", level: 3 },
  "presentaciones": { automatizability: "Media", level: 3 },
  "creatividades": { automatizability: "Media", level: 3 },
  "redes sociales": { automatizability: "Media", level: 3 },
  "ventas": { automatizability: "Media-Baja", level: 2 },
  "cierre": { automatizability: "Media-Baja", level: 2 },
  "relación con clientes": { automatizability: "Media-Baja", level: 2 },
  "decisiones estratégicas": { automatizability: "Baja", level: 1 },
  "estrategia": { automatizability: "Baja", level: 1 },
  "negociación": { automatizability: "Baja", level: 1 },
  "liderazgo": { automatizability: "Baja", level: 1 },
  "gestión de equipos": { automatizability: "Baja", level: 1 },
  "motivación": { automatizability: "Baja", level: 1 },
  "conflictos": { automatizability: "Baja", level: 1 },
  "cultura": { automatizability: "Baja", level: 1 },
  "representación": { automatizability: "Baja", level: 1 },
  "directorio": { automatizability: "Baja", level: 1 },
  "data entry": { automatizability: "Alta", level: 5 },
  "ingreso de datos": { automatizability: "Alta", level: 5 },
  "transcripción": { automatizability: "Alta", level: 5 },
  "código": { automatizability: "Media-Alta", level: 4 },
  "programación": { automatizability: "Media-Alta", level: 4 },
  "desarrollo": { automatizability: "Media-Alta", level: 4 },
  "testing": { automatizability: "Media-Alta", level: 4 },
  "documentación": { automatizability: "Alta", level: 5 },
  "contenido": { automatizability: "Alta", level: 5 },
  "copywriting": { automatizability: "Alta", level: 5 },
  "traducción": { automatizability: "Alta", level: 5 },
  "contabilidad": { automatizability: "Media-Alta", level: 4 },
  "facturación": { automatizability: "Alta", level: 5 },
  "administración": { automatizability: "Media-Alta", level: 4 },
};

const TOOL_SUGGESTIONS: Record<string, { tool: string; cost: string }[]> = {
  "redacción": [{ tool: "Claude / ChatGPT / Copilot", cost: "USD 20–100/mes" }],
  "emails": [{ tool: "Claude / ChatGPT", cost: "USD 20–100/mes" }],
  "atención al cliente": [{ tool: "Intercom AI / Zendesk AI / Voiceflow", cost: "USD 100–500/mes" }],
  "soporte": [{ tool: "Intercom AI / Zendesk AI", cost: "USD 100–500/mes" }],
  "análisis de datos": [{ tool: "Julius AI / ChatGPT + Code Interpreter", cost: "USD 20–50/mes" }],
  "dashboards": [{ tool: "Julius AI / ChatGPT + Code Interpreter", cost: "USD 20–50/mes" }],
  "reportes": [{ tool: "Julius AI / ChatGPT + Code Interpreter", cost: "USD 20–50/mes" }],
  "research": [{ tool: "Perplexity Pro / Elicit / Consensus", cost: "USD 20–40/mes" }],
  "investigación": [{ tool: "Perplexity Pro / Elicit / Consensus", cost: "USD 20–40/mes" }],
  "coordinación": [{ tool: "Make / Zapier / n8n", cost: "USD 20–200/mes" }],
  "agenda": [{ tool: "Reclaim / Motion / Clockwise", cost: "USD 10–20/mes" }],
  "diseño gráfico": [{ tool: "Canva AI / Adobe Firefly", cost: "USD 15–60/mes" }],
  "creatividades": [{ tool: "Canva AI / Adobe Firefly", cost: "USD 15–60/mes" }],
  "transcripción": [{ tool: "Otter.ai / Fireflies / Notion AI", cost: "USD 10–30/mes" }],
  "código": [{ tool: "GitHub Copilot / Cursor / Claude Code", cost: "USD 10–20/mes" }],
  "programación": [{ tool: "GitHub Copilot / Cursor / Claude Code", cost: "USD 10–20/mes" }],
  "desarrollo": [{ tool: "GitHub Copilot / Cursor / Claude Code", cost: "USD 10–20/mes" }],
  "contenido": [{ tool: "Claude / ChatGPT", cost: "USD 20–100/mes" }],
  "documentación": [{ tool: "Claude / Notion AI", cost: "USD 10–30/mes" }],
  "facturación": [{ tool: "Make / Zapier + herramientas contables", cost: "USD 20–200/mes" }],
  "data entry": [{ tool: "Make / Zapier / n8n", cost: "USD 20–200/mes" }],
};

interface Message {
  id: string;
  role: "agent" | "user";
  text: string;
  isAnalysis?: boolean;
}

interface ConversationState {
  step: number;
  roleTitle: string;
  area: string;
  tasks: string[];
  taskText: string;
  decisionLevel: string;
  humanInteraction: string;
}

function analyzeRole(state: ConversationState): string {
  const allTasksText = state.tasks.join(" ").toLowerCase() + " " + state.taskText.toLowerCase();
  const taskMatches: { keyword: string; automatizability: string; level: number }[] = [];

  for (const [keyword, info] of Object.entries(TAXONOMY)) {
    if (allTasksText.includes(keyword)) {
      taskMatches.push({ keyword, ...info });
    }
  }

  if (taskMatches.length === 0) {
    const words = allTasksText.split(/[\s,;.]+/).filter(w => w.length > 3);
    for (const word of words) {
      for (const [keyword, info] of Object.entries(TAXONOMY)) {
        if (keyword.includes(word) || word.includes(keyword.split(" ")[0])) {
          taskMatches.push({ keyword, ...info });
        }
      }
    }
  }

  const uniqueMatches = taskMatches.filter((t, i, arr) => arr.findIndex(x => x.keyword === t.keyword) === i);
  const avgLevel = uniqueMatches.length > 0
    ? uniqueMatches.reduce((a, t) => a + t.level, 0) / uniqueMatches.length
    : 3;

  let decisionModifier = 0;
  const dl = state.decisionLevel.toLowerCase();
  if (dl.includes("alto") || dl.includes("estratégic") || dl.includes("critic")) decisionModifier = -1.5;
  else if (dl.includes("medio") || dl.includes("algún")) decisionModifier = -0.5;
  else if (dl.includes("bajo") || dl.includes("poco") || dl.includes("no") || dl.includes("nulo")) decisionModifier = 0.5;

  let humanModifier = 0;
  const hi = state.humanInteraction.toLowerCase();
  if (hi.includes("constante") || hi.includes("mucha") || hi.includes("todo el tiempo") || hi.includes("alta")) humanModifier = -1;
  else if (hi.includes("regular") || hi.includes("frecuente") || hi.includes("media")) humanModifier = -0.5;
  else if (hi.includes("poca") || hi.includes("mínima") || hi.includes("baja") || hi.includes("casi no")) humanModifier = 0.5;

  const finalScore = Math.max(1, Math.min(5, avgLevel + decisionModifier + humanModifier));
  const automationPct = Math.round(finalScore * 20);

  let verdict: string;
  let verdictEmoji: string;
  let recommendation: string;

  if (automationPct >= 80) {
    verdict = "AUTOMATIZABLE";
    verdictEmoji = "🔴";
    recommendation = "Este rol puede reemplazarse casi por completo con herramientas de IA. Recomiendo NO abrir la posición y en su lugar implementar las herramientas sugeridas.";
  } else if (automationPct >= 60) {
    verdict = "MAYORMENTE AUTOMATIZABLE";
    verdictEmoji = "🟠";
    recommendation = "La mayoría de las tareas de este rol pueden automatizarse. Considerar un rol reducido (part-time o compartido) enfocado solo en las tareas que requieren criterio humano.";
  } else if (automationPct >= 40) {
    verdict = "HÍBRIDO";
    verdictEmoji = "🟡";
    recommendation = "Este rol se beneficia significativamente de herramientas de IA pero necesita criterio humano. Recomiendo contratar pero asegurar que use herramientas de IA desde el día 1.";
  } else if (automationPct >= 20) {
    verdict = "REQUIERE PERSONA";
    verdictEmoji = "🟢";
    recommendation = "Este rol requiere mayormente habilidades humanas. La IA puede asistir en tareas específicas, pero el componente humano es esencial.";
  } else {
    verdict = "100% HUMANO";
    verdictEmoji = "🟢";
    recommendation = "Este rol depende de habilidades exclusivamente humanas (liderazgo, negociación, relaciones). Contratar sin dudas.";
  }

  const toolSuggestions: { tool: string; cost: string; forTask: string }[] = [];
  for (const [keyword, tools] of Object.entries(TOOL_SUGGESTIONS)) {
    if (allTasksText.includes(keyword)) {
      for (const t of tools) {
        if (!toolSuggestions.find(ts => ts.tool === t.tool)) {
          toolSuggestions.push({ ...t, forTask: keyword });
        }
      }
    }
  }

  const taskBreakdown = taskMatches
    .filter((t, i, arr) => arr.findIndex(x => x.keyword === t.keyword) === i)
    .slice(0, 6)
    .map(t => {
      const levelLabel = t.level >= 4 ? "🔴 Alta" : t.level === 3 ? "🟡 Media" : "🟢 Baja";
      return `  • ${t.keyword.charAt(0).toUpperCase() + t.keyword.slice(1)} → Automatizabilidad: ${levelLabel}`;
    }).join("\n");

  const toolsList = toolSuggestions.slice(0, 4).map(t =>
    `  • ${t.tool} (${t.cost})`
  ).join("\n");

  const salaryEstimate = automationPct >= 60 ? `\n\n💰 Ahorro estimado: Si el salario anual del rol es X, podrías ahorrar ~${automationPct}% implementando IA, más el costo de contratación y capacitación.` : "";

  return `📊 **ANÁLISIS COMPLETO**

**Rol:** ${state.roleTitle}
**Área:** ${state.area}

---

${verdictEmoji} **Veredicto: ${verdict}**
**Automatizabilidad: ${automationPct}%**

${recommendation}

---

📋 **Desglose por tarea:**
${taskBreakdown || "  • No se detectaron tareas específicas en la taxonomía. Evaluar caso por caso."}

${toolsList ? `🛠️ **Herramientas recomendadas:**\n${toolsList}` : ""}
${salaryEstimate}

---

📌 **Próximos pasos sugeridos:**
${automationPct >= 60
  ? "1. Evaluar las herramientas sugeridas con un piloto de 2 semanas\n2. Medir el impacto antes de decidir sobre la contratación\n3. Si se contrata, redefinir el rol enfocándolo en tareas no automatizables"
  : "1. Proceder con la contratación\n2. Incluir herramientas de IA en el onboarding del nuevo empleado\n3. Medir la productividad con y sin IA en los primeros 3 meses"}`;
}

const QUESTIONS = [
  "Hola 👋 Voy a ayudarte a evaluar si este rol necesita una persona o puede resolverse con IA. Es rápido, cinco preguntas.\n\n¿Cuál es el **título del puesto** y en qué **área** está?",
  "¿Cuáles son las **tareas principales** que haría esta persona? (Listá las 3-5 más importantes)",
  "¿Qué **herramientas o sistemas** usaría esta persona en su día a día?",
  "¿Qué nivel de **toma de decisiones** requiere el rol? (Bajo/operativo, Medio, Alto/estratégico)",
  "¿Cuánta **interacción humana directa** necesita? (Poca/mínima, Regular, Constante/mucha)",
];

export default function AIRecruitingPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "agent", text: QUESTIONS[0] }
  ]);
  const [input, setInput] = useState("");
  const [convState, setConvState] = useState<ConversationState>({
    step: 0, roleTitle: "", area: "", tasks: [], taskText: "", decisionLevel: "", humanInteraction: ""
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping || isComplete) return;
    const userMsg = input.trim();
    setInput("");

    const newMessages: Message[] = [...messages, { id: `user-${Date.now()}`, role: "user", text: userMsg }];
    setMessages(newMessages);

    setIsTyping(true);

    const newState = { ...convState };
    const currentStep = convState.step;

    if (currentStep === 0) {
      const parts = userMsg.split(/[,\-–—en el área de|del área|área:|\n]/i);
      newState.roleTitle = parts[0]?.trim() || userMsg;
      newState.area = parts[1]?.trim() || "";
      if (!newState.area) {
        const areaMatch = userMsg.match(/(?:área|departamento|equipo)\s+(?:de\s+)?(.+)/i);
        if (areaMatch) newState.area = areaMatch[1].trim();
        else newState.area = "General";
      }
    } else if (currentStep === 1) {
      newState.taskText = userMsg;
      newState.tasks = userMsg.split(/[,\n•\-\d.]+/).map(t => t.trim()).filter(t => t.length > 2);
    } else if (currentStep === 2) {
      newState.taskText += " " + userMsg;
    } else if (currentStep === 3) {
      newState.decisionLevel = userMsg;
    } else if (currentStep === 4) {
      newState.humanInteraction = userMsg;
    }

    newState.step = currentStep + 1;
    setConvState(newState);

    setTimeout(() => {
      if (newState.step < QUESTIONS.length) {
        setMessages(prev => [...prev, { id: `agent-${Date.now()}`, role: "agent", text: QUESTIONS[newState.step] }]);
      } else {
        const analysis = analyzeRole(newState);
        setMessages(prev => [...prev, { id: `analysis-${Date.now()}`, role: "agent", text: analysis, isAnalysis: true }]);
        setIsComplete(true);
      }
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 800 + Math.random() * 600);
  };

  const handleReset = () => {
    setMessages([{ id: "init", role: "agent", text: QUESTIONS[0] }]);
    setConvState({ step: 0, roleTitle: "", area: "", tasks: [], taskText: "", decisionLevel: "", humanInteraction: "" });
    setInput("");
    setIsComplete(false);
    setIsTyping(false);
  };

  const recentAnalyses = [
    { role: "Data Entry Specialist", department: "Operations", verdict: "automatable", savings: "$52K/yr", confidence: 94 },
    { role: "Sr. Product Designer", department: "Product", verdict: "hire", savings: null, confidence: 88 },
    { role: "Customer Support L1", department: "Support", verdict: "hybrid", savings: "$34K/yr", confidence: 91 },
    { role: "Financial Analyst", department: "Finance", verdict: "augment", savings: "$28K/yr", confidence: 85 },
  ];

  const verdictConfig: Record<string, { label: string; color: string; dotColor: string }> = {
    automatable: { label: "Automate", color: "text-red-500", dotColor: "bg-red-500" },
    hire: { label: "Hire", color: "text-green-500", dotColor: "bg-green-500" },
    hybrid: { label: "Hybrid", color: "text-amber-500", dotColor: "bg-amber-500" },
    augment: { label: "Augment", color: "text-blue-500", dotColor: "bg-blue-500" },
  };

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <SEO title="AI-First Recruiting - Genaia" description="AI agent that analyzes whether your next hire could be covered by AI instead." />

      <motion.div variants={fadeUp} className="text-center mb-2">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold" data-testid="text-recruiting-title">AI-First Recruiting</h1>
          <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20 text-[10px]">AGENT</Badge>
        </div>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Before you open a new position, ask the agent — it might already be covered by AI.
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="overflow-hidden border-chart-1/20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-chart-1/[0.02] via-transparent to-chart-1/[0.02] pointer-events-none" />

          <div className="p-5 border-b border-chart-1/10 bg-chart-1/[0.03] relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Genaia Recruiting Agent</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Online
                    </span>
                    <span>Step {Math.min(convState.step + 1, 5)} of 5</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isComplete && (
                  <Button size="sm" variant="outline" onClick={handleReset} className="text-xs" data-testid="button-reset-chat">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    New analysis
                  </Button>
                )}
                <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-chart-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min((convState.step / 5) * 100, 100)}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 p-5 space-y-4 min-h-[350px] max-h-[500px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "agent" && (
                    <div className="w-8 h-8 rounded-full bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-chart-1" />
                    </div>
                  )}
                  <div className={`${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-chart-1 to-chart-2 text-white rounded-2xl rounded-tr-md px-5 py-3.5 max-w-[75%] shadow-lg shadow-violet-500/10"
                      : msg.isAnalysis
                        ? "bg-muted/60 rounded-2xl rounded-tl-md px-5 py-4 max-w-[90%] border border-chart-1/10"
                        : "bg-muted/60 rounded-2xl rounded-tl-md px-5 py-3.5 max-w-[80%]"
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className={msg.role === "user" ? "text-white" : "text-foreground"}>{part}</strong> : part
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-chart-1" />
                </div>
                <div className="bg-muted/60 rounded-2xl rounded-tl-md px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-chart-1/40"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isComplete && (
            <div className="relative z-10 px-5 pb-5 pt-2 border-t border-border/40">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    convState.step === 0 ? "Ej: Analista de datos, área Marketing" :
                    convState.step === 1 ? "Ej: Reportes, dashboards, análisis ad-hoc..." :
                    convState.step === 2 ? "Ej: Excel, Looker, ChatGPT..." :
                    convState.step === 3 ? "Ej: Bajo, operativo" :
                    "Ej: Regular, contacto diario con equipo"
                  }
                  disabled={isTyping}
                  className="flex-1"
                  data-testid="input-recruiting-chat"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-chart-1 text-white border-chart-1"
                  data-testid="button-send-recruiting"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {convState.step === 3 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {["Bajo / operativo", "Medio", "Alto / estratégico"].map((opt) => (
                    <button
                      key={opt}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-chart-1/15 text-chart-1 bg-chart-1/[0.04] transition-all"
                      onClick={() => { setInput(opt); }}
                      data-testid={`button-option-${opt.toLowerCase().replace(/[\s\/]/g, "-")}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {convState.step === 4 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {["Poca / mínima", "Regular", "Constante / mucha"].map((opt) => (
                    <button
                      key={opt}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-chart-1/15 text-chart-1 bg-chart-1/[0.04] transition-all"
                      onClick={() => { setInput(opt); }}
                      data-testid={`button-option-${opt.toLowerCase().replace(/[\s\/]/g, "-")}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div variants={fadeUp}>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-chart-1" data-testid="text-positions-analyzed">47</p>
            <p className="text-xs text-muted-foreground mt-1">Positions Analyzed</p>
          </Card>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-green-600">$1.2M</p>
            <p className="text-xs text-muted-foreground mt-1">Potential Savings</p>
          </Card>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-foreground">34%</p>
            <p className="text-xs text-muted-foreground mt-1">Automation Rate</p>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide" data-testid="text-recent-analyses">Recent Analyses</h2>
          <Badge variant="secondary" className="text-[10px]">{recentAnalyses.length} roles</Badge>
        </div>
        <Card className="divide-y">
          {recentAnalyses.map((analysis, i) => {
            const config = verdictConfig[analysis.verdict];
            return (
              <div key={analysis.role} className="flex items-center justify-between gap-4 px-5 py-4" data-testid={`card-analysis-${i}`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${config.dotColor}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{analysis.role}</p>
                    <p className="text-[11px] text-muted-foreground">{analysis.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  {analysis.savings && (
                    <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {analysis.savings}
                    </span>
                  )}
                  <span className={`text-[11px] font-semibold ${config.color}`}>{config.label}</span>
                  <span className="text-[10px] text-muted-foreground">{analysis.confidence}%</span>
                </div>
              </div>
            );
          })}
        </Card>
      </motion.div>
    </motion.div>
  );
}
