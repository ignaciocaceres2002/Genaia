import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SQRing } from "@/components/nq-ring";
import { TrendingUp, ChevronRight } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const compositionData = [
  { component: "Avg SQ", score: 62, weight: "25%", fullName: "Average SQ Score" },
  { component: "Training", score: 68, weight: "20%", fullName: "Training Completion" },
  { component: "Tools", score: 55, weight: "20%", fullName: "Tool Adoption" },
  { component: "Champions", score: 40, weight: "10%", fullName: "Champion Coverage" },
  { component: "Policy", score: 70, weight: "10%", fullName: "Policy Maturity" },
  { component: "Use Cases", score: 45, weight: "10%", fullName: "Use Case Density" },
  { component: "Engage", score: 72, weight: "5%", fullName: "Engagement" },
];

const benchmarkData = [
  { label: "Your Org", value: 54 },
  { label: "Industry Avg", value: 42 },
  { label: "Top Quartile", value: 72 },
];

const recommendations = [
  { component: "Champion Coverage", suggestion: "Identify and activate 3 more champions in Sales and Finance to improve coverage from 40% to 60%", impact: "+6 pts" },
  { component: "Use Case Density", suggestion: "Run a company-wide AI use case hackathon to generate and document 20+ new use cases", impact: "+4 pts" },
  { component: "Tool Adoption", suggestion: "Approve pending tool requests and run training sessions on underutilized approved tools", impact: "+3 pts" },
];

export default function AgenticScorePage() {
  const agenticScore = 54;
  const agenticLevel = "AI-Enabled";

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Agentic Enterprise Score</h1>
        <p className="text-muted-foreground text-sm mt-1">Holistic measure of organizational AI maturity</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <SQRing score={agenticScore} size={180} label={agenticLevel} />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">{agenticScore}/100</h2>
              <p className="text-muted-foreground mt-1">Your organization is <span className="font-semibold text-foreground">{agenticLevel}</span></p>
              <div className="flex items-center gap-2 mt-3 justify-center md:justify-start flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" /> +4 pts this quarter
                </Badge>
                <Badge variant="outline" className="text-xs">Projected: 62 by Q3</Badge>
              </div>
              <div className="mt-4 flex gap-4 text-sm flex-wrap justify-center md:justify-start">
                <div><span className="text-muted-foreground">Traditional</span> <span className="font-medium">0-25</span></div>
                <div><span className="text-muted-foreground">AI-Curious</span> <span className="font-medium">26-50</span></div>
                <div className="text-[#7C3AED] font-semibold">AI-Enabled 51-75</div>
                <div><span className="text-muted-foreground">Agentic</span> <span className="font-medium">76-100</span></div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Score Composition</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={compositionData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="component" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Radar name="Score" dataKey="score" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Benchmarks</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={90} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px" }} />
                  <Bar dataKey="value" fill="#7C3AED" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Component Breakdown</h3>
          <div className="space-y-3">
            {compositionData.map((comp) => (
              <div key={comp.component} className="flex items-center gap-4">
                <div className="w-28 text-sm font-medium flex-shrink-0">{comp.fullName}</div>
                <div className="flex-1">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-[#7C3AED] h-2 rounded-full transition-all" style={{ width: `${comp.score}%` }} />
                  </div>
                </div>
                <span className="text-sm font-semibold w-10 text-right">{comp.score}</span>
                <Badge variant="outline" className="text-[10px] w-10 justify-center">{comp.weight}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="font-semibold text-sm mb-3">Recommendations to Improve</h3>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <Card key={i} className="p-4 hover-elevate cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px]">{rec.component}</Badge>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] no-default-hover-elevate no-default-active-elevate">{rec.impact}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.suggestion}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
