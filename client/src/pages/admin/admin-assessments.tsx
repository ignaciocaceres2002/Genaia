import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SKILLS } from "@shared/schema";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { fadeUp, pageContainer } from "@/lib/motion-variants";

const CHART_1 = "hsl(var(--chart-1))";
const CHART_2 = "hsl(var(--chart-2))";
const CHART_3 = "hsl(var(--chart-3))";
const CHART_4 = "hsl(var(--chart-4))";
const CHART_5 = "hsl(var(--chart-5))";
const tooltipStyle = { backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px", color: "hsl(var(--foreground))" };

const assessmentResults = [
  { skill: "Data Fluency", avgScore: 62, taken: 95, distribution: [5, 15, 35, 30, 10] },
  { skill: "Adaptive Mindset", avgScore: 55, taken: 88, distribution: [8, 20, 32, 28, 12] },
  { skill: "Verification", avgScore: 68, taken: 92, distribution: [3, 12, 28, 38, 19] },
  { skill: "Co-Intelligence", avgScore: 48, taken: 82, distribution: [12, 25, 30, 25, 8] },
  { skill: "Autonomous Drive", avgScore: 58, taken: 86, distribution: [6, 18, 34, 30, 12] },
  { skill: "Process Reimag.", avgScore: 52, taken: 78, distribution: [10, 22, 32, 26, 10] },
];

const teamComparison = SKILLS.map((s) => ({
  skill: s.name.split(" ")[0],
  Engineering: 60 + Math.floor(Math.random() * 25),
  Marketing: 50 + Math.floor(Math.random() * 25),
  Product: 55 + Math.floor(Math.random() * 25),
  Sales: 40 + Math.floor(Math.random() * 20),
}));

export default function AdminAssessmentsPage() {
  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <motion.div variants={fadeUp}>
        <h1 className="text-display-xs font-bold">Assessment Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Results, performance, and team comparisons</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="overflow-visible">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-sm">Results Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">Skill</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Avg Score</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Taken</th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">Distribution</th>
                </tr>
              </thead>
              <tbody>
                {assessmentResults.map((r) => (
                  <tr key={r.skill} className="border-b">
                    <td className="p-3 font-medium">{r.skill}</td>
                    <td className="p-3 text-center">
                      <span className="font-semibold">{r.avgScore}</span>/100
                    </td>
                    <td className="p-3 text-center text-muted-foreground">{r.taken}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-0.5 h-4">
                        {r.distribution.map((d, i) => (
                          <div
                            key={i}
                            className="h-full rounded-sm"
                            style={{
                              width: `${d}%`,
                              backgroundColor: [CHART_5, CHART_4, CHART_3, CHART_1, CHART_2][i] || CHART_1,
                              minWidth: "4px",
                            }}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Team Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={teamComparison}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Radar name="Engineering" dataKey="Engineering" stroke={CHART_1} fill={CHART_1} fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Marketing" dataKey="Marketing" stroke={CHART_2} fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
                <Radar name="Product" dataKey="Product" stroke={CHART_3} fill="none" strokeWidth={1.5} strokeDasharray="2 2" />
                <Radar name="Sales" dataKey="Sales" stroke={CHART_4} fill="none" strokeWidth={1} strokeDasharray="6 3" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
            {[{ name: "Engineering", color: CHART_1 }, { name: "Marketing", color: CHART_2 }, { name: "Product", color: CHART_3 }, { name: "Sales", color: CHART_4 }].map((t) => (
              <div key={t.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                {t.name}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
