import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, UserCheck, BrainCircuit, TrendingDown, DollarSign, Clock, Sparkles, ArrowRight, CheckCircle2, XCircle, AlertTriangle, Mic, Volume2 } from "lucide-react";
import { SEO } from "@/components/seo";
import { useEffect, useRef } from "react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

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

export default function AIRecruitingPage() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container) return;

    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", "agent_7201kkevpgc8ft9a1nnygv785c89");
    container.appendChild(widget);

    const existingScript = document.querySelector('script[src*="elevenlabs/convai-widget-embed"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.head.appendChild(script);
    }

    return () => {
      if (container.contains(widget)) {
        container.removeChild(widget);
      }
    };
  }, []);

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <SEO title="AI-First Recruiting - Genaia" description="AI agent that analyzes whether your next hire could be covered by AI instead." />

      <motion.div variants={fadeUp} className="text-center mb-2">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold" data-testid="text-recruiting-title">AI-First Recruiting</h1>
          <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20 text-[10px]">AGENT</Badge>
        </div>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Before you open a new position, ask the agent — it might already be covered by AI.
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="overflow-hidden border-[#7C3AED]/20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/[0.02] via-transparent to-[#7C3AED]/[0.02] pointer-events-none" />

          <div className="p-5 border-b border-[#7C3AED]/10 bg-[#7C3AED]/[0.03] relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Genaia Recruiting Agent</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Mic className="w-3 h-3" /> Voice enabled</span>
                    <span className="flex items-center gap-1"><Volume2 className="w-3 h-3" /> Real-time</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-4 rounded-full bg-[#7C3AED]"
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-[#7C3AED] font-medium ml-1">LIVE</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 p-6 space-y-4 min-h-[320px]">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#7C3AED]" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="bg-muted/60 rounded-2xl rounded-tl-md px-5 py-3.5 max-w-[80%]">
                  <p className="text-sm leading-relaxed">
                    Hello! I'm your <span className="font-medium text-[#7C3AED]">AI-First Recruiting</span> agent. Before you create a new job opening, tell me the role and I'll analyze whether it could be covered — partially or fully — by AI tools your organization already has.
                  </p>
                </div>
                <div className="bg-muted/60 rounded-2xl rounded-tl-md px-5 py-3.5 max-w-[70%]">
                  <p className="text-sm leading-relaxed">
                    You can <span className="font-medium">type or speak</span> — I understand both. What role are you considering?
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white rounded-2xl rounded-tr-md px-5 py-3.5 max-w-[70%] shadow-lg shadow-violet-500/10">
                <p className="text-sm leading-relaxed">
                  We're thinking of hiring a Junior Data Analyst for Marketing. Mainly dashboards, reporting, and ad-hoc data pulls.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#7C3AED]" />
              </div>
              <div className="bg-muted/60 rounded-2xl rounded-tl-md px-5 py-3.5 max-w-[80%]">
                <p className="text-sm leading-relaxed">
                  Interesting — those are mostly <span className="font-medium text-amber-600">automatable tasks</span>. Your org already has Looker and ChatGPT Enterprise. Let me break down the analysis by task...
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <motion.div
                className="flex items-center gap-2 text-xs text-muted-foreground"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                Talk to the agent below to start your analysis
              </motion.div>
            </div>
          </div>

          <div ref={widgetContainerRef} className="relative z-10 px-6 pb-4" data-testid="widget-elevenlabs" />

          <div className="relative z-10 px-6 pb-5 pt-3 border-t border-border/40">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { text: "Analyze a new role", icon: UserCheck },
                { text: "Review open positions", icon: BrainCircuit },
                { text: "Show savings report", icon: DollarSign },
                { text: "Compare vs. AI tools", icon: Sparkles },
              ].map((suggestion) => (
                <button
                  key={suggestion.text}
                  className="text-[11px] px-4 py-2 rounded-full border border-[#7C3AED]/15 text-[#7C3AED] bg-[#7C3AED]/[0.04] flex items-center gap-1.5 transition-all"
                  data-testid={`button-suggestion-${suggestion.text.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <suggestion.icon className="w-3 h-3" />
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div variants={fadeUp}>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-[#7C3AED]">47</p>
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
