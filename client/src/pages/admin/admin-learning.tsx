import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@shared/schema";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const courseCompletionData = [
  { course: "Reading the Machine", assigned: 120, completed: 78, avgScore: 74, avgTime: "42min" },
  { course: "The Change Lab", assigned: 120, completed: 65, avgScore: 68, avgTime: "38min" },
  { course: "Trust But Verify", assigned: 120, completed: 72, avgScore: 71, avgTime: "45min" },
  { course: "The Tandem", assigned: 120, completed: 48, avgScore: 66, avgTime: "40min" },
  { course: "The Self-Starter", assigned: 120, completed: 55, avgScore: 69, avgTime: "35min" },
  { course: "Reimagine Everything", assigned: 120, completed: 35, avgScore: 62, avgTime: "48min" },
];

const teamCompletionData = [
  { team: "Product", pct: 82 }, { team: "Engineering", pct: 78 },
  { team: "People Ops", pct: 70 }, { team: "Marketing", pct: 65 },
  { team: "Legal", pct: 60 }, { team: "Finance", pct: 55 },
  { team: "Sales", pct: 42 },
];

const engagementMetrics = [
  { label: "DAU/MAU Ratio", value: "68%" },
  { label: "Avg Streak", value: "8.4 days" },
  { label: "Practice Sessions/User/Mo", value: "4.2" },
  { label: "Challenge Completion Rate", value: "73%" },
];

export default function AdminLearningPage() {
  const { data: courses } = useQuery<Course[]>({ queryKey: ["/api/courses"] });

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Learning Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Course completion, engagement, and performance</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {engagementMetrics.map((m) => (
          <Card key={m.label} className="p-4">
            <p className="text-xl font-bold">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="overflow-visible">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-sm">Completion by Course</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">Course</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Assigned</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Completed</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">%</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Avg Score</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Avg Time</th>
                </tr>
              </thead>
              <tbody>
                {courseCompletionData.map((c) => (
                  <tr key={c.course} className="border-b">
                    <td className="p-3 font-medium">{c.course}</td>
                    <td className="p-3 text-center text-muted-foreground">{c.assigned}</td>
                    <td className="p-3 text-center">{c.completed}</td>
                    <td className="p-3 text-center font-semibold">{Math.round((c.completed / c.assigned) * 100)}%</td>
                    <td className="p-3 text-center">{c.avgScore}</td>
                    <td className="p-3 text-center text-muted-foreground">{c.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Completion by Team</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamCompletionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis type="category" dataKey="team" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={80} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px" }} />
                <Bar dataKey="pct" fill="#7C3AED" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
