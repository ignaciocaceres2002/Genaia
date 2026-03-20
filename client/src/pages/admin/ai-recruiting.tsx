import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, UserCheck, BrainCircuit, TrendingDown, DollarSign, Clock, Sparkles, ArrowRight, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/seo";
import { useEffect, useRef } from "react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const recentAnalyses = [
  { role: "Data Entry Specialist", department: "Operations", verdict: "automatable", savings: "$52,000/yr", confidence: 94, reason: "95% of tasks are structured data processing — fully automatable with current AI tools." },
  { role: "Senior Product Designer", department: "Product", verdict: "hire", savings: null, confidence: 88, reason: "Creative judgment, user research, and cross-functional leadership require human expertise." },
  { role: "Customer Support L1", department: "Support", verdict: "hybrid", savings: "$34,000/yr", confidence: 91, reason: "70% of tickets are routine and automatable. Hire for escalation and relationship management only." },
  { role: "Financial Analyst", department: "Finance", verdict: "augment", savings: "$28,000/yr", confidence: 85, reason: "Keep the hire but upskill with AI tools — forecasting and reporting can be 60% automated." },
];

const stats = [
  { label: "Positions Analyzed", value: "47", icon: UserCheck, color: "#7C3AED" },
  { label: "Potential Savings", value: "$1.2M", icon: DollarSign, color: "#10B981" },
  { label: "Avg. Analysis Time", value: "< 2 min", icon: Clock, color: "#F59E0B" },
  { label: "Automation Rate", value: "34%", icon: BrainCircuit, color: "#6366F1" },
];

const verdictConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  automatable: { label: "Automate", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20", icon: XCircle },
  hire: { label: "Hire", color: "text-green-500", bg: "bg-green-500/10 border-green-500/20", icon: CheckCircle2 },
  hybrid: { label: "Hybrid", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20", icon: AlertTriangle },
  augment: { label: "Augment", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20", icon: Sparkles },
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
    <motion.div className="max-w-6xl mx-auto space-y-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <SEO title="AI-First Recruiting - Genaia" description="AI agent that analyzes whether your next hire could be covered by AI instead." />

      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#6D28D9] p-8 md:p-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-white/5 blur-[60px]" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white" data-testid="text-recruiting-title">AI-First Recruiting</h1>
              <Badge className="bg-white/20 text-white border-0 text-[10px]">AGENT</Badge>
            </div>
            <p className="text-white/70 max-w-2xl leading-relaxed">
              Before you open a new position, ask the agent: <span className="text-white font-medium">"Could this role be covered by AI?"</span> Our recruiting agent analyzes job descriptions, task breakdowns, and your existing tool stack to tell you whether to hire, automate, or augment.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5" data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        <motion.div variants={fadeUp} className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" data-testid="text-recent-analyses">Recent Analyses</h2>
            <Badge variant="secondary" className="text-[10px]">{recentAnalyses.length} roles</Badge>
          </div>

          {recentAnalyses.map((analysis, i) => {
            const config = verdictConfig[analysis.verdict];
            const VerdictIcon = config.icon;
            return (
              <motion.div key={analysis.role} variants={fadeUp}>
                <Card className="p-5 hover-elevate" data-testid={`card-analysis-${i}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{analysis.role}</h3>
                        <Badge variant="outline" className={`text-[10px] ${config.bg} ${config.color} border`}>
                          <VerdictIcon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{analysis.department}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {analysis.savings && (
                        <p className="text-sm font-semibold text-green-600 flex items-center gap-1">
                          <TrendingDown className="w-3.5 h-3.5" />
                          {analysis.savings}
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-0.5">{analysis.confidence}% confidence</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{analysis.reason}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <h2 className="text-lg font-semibold" data-testid="text-agent-title">Recruiting Agent</h2>
          </div>

          <Card className="overflow-hidden border-[#7C3AED]/20 bg-gradient-to-b from-[#7C3AED]/[0.03] to-transparent">
            <div className="p-4 border-b border-[#7C3AED]/10 bg-[#7C3AED]/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Genaia Recruiting Agent</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground">Online — Voice & Text</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3 min-h-[200px]">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-[#7C3AED]" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                  <p className="text-sm leading-relaxed">
                    Hi! I'm your AI-First Recruiting agent. Tell me about the role you're looking to fill — the title, key responsibilities, and department. I'll analyze whether it could be covered by AI tools you already have.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-[#7C3AED] text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[85%]">
                  <p className="text-sm leading-relaxed">
                    We need a Junior Data Analyst for the Marketing team.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-[#7C3AED]" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                  <p className="text-sm leading-relaxed">
                    Interesting. What are the main tasks? Reporting, dashboard creation, data cleaning, ad-hoc queries? I'll cross-reference with your current AI stack.
                  </p>
                </div>
              </div>
            </div>

            <div ref={widgetContainerRef} className="px-4 pb-4" data-testid="widget-elevenlabs" />

            <div className="px-4 pb-4 pt-2 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {["Analyze a new role", "Review open positions", "Show savings report"].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-[#7C3AED]/20 text-[#7C3AED] bg-[#7C3AED]/5 transition-colors"
                    data-testid={`button-suggestion-${suggestion.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50 dark:border-amber-800/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Hiring Alert</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  3 open positions in your pipeline have a <span className="font-medium text-amber-700 dark:text-amber-400">high automation potential</span>. Review them with the agent before proceeding to interviews.
                </p>
                <Button variant="link" className="px-0 h-auto text-xs text-amber-700 dark:text-amber-400 mt-2" data-testid="button-review-positions">
                  Review positions <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
