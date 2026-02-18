import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Team, User } from "@shared/schema";
import { TrendingUp, Users, GraduationCap, Clock, Send, FileText, Wrench, Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Treemap } from "recharts";
import { SEO } from "@/components/seo";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const sqDistribution = [
  { range: "0-25", count: 12, level: "Novice", color: "#ef4444" },
  { range: "26-50", count: 38, level: "Aware", color: "#f59e0b" },
  { range: "51-75", count: 52, level: "Practitioner", color: "#7C3AED" },
  { range: "76-100", count: 18, level: "Catalyst", color: "#22c55e" },
];

const engagementData = [
  { day: "Jan 1", dau: 65 }, { day: "Jan 8", dau: 72 }, { day: "Jan 15", dau: 68 },
  { day: "Jan 22", dau: 78 }, { day: "Jan 29", dau: 82 }, { day: "Feb 5", dau: 85 },
  { day: "Feb 12", dau: 88 }, { day: "Feb 19", dau: 91 },
];

const heatmapData = [
  { name: "Engineering", size: 45, sq: 62 },
  { name: "Marketing", size: 22, sq: 58 },
  { name: "Finance", size: 18, sq: 51 },
  { name: "Product", size: 15, sq: 66 },
  { name: "Sales", size: 30, sq: 44 },
  { name: "Legal", size: 10, sq: 55 },
  { name: "People Ops", size: 12, sq: 60 },
];

function getHeatColor(sq: number) {
  if (sq >= 65) return "#7C3AED";
  if (sq >= 50) return "#A78BFA";
  return "#f59e0b";
}

const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, sq } = props;
  if (width < 40 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={getHeatColor(sq)} rx={4} opacity={0.85} stroke="hsl(var(--background))" strokeWidth={2} />
      {width > 60 && height > 40 && (
        <>
          <text x={x + width / 2} y={y + height / 2 - 6} textAnchor="middle" fill="white" fontSize={11} fontWeight="600">{name}</text>
          <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize={10}>SQ {sq}</text>
        </>
      )}
    </g>
  );
};

export default function AdminOverview() {
  const { data: teams } = useQuery<Team[]>({ queryKey: ["/api/teams"] });
  const { data: users } = useQuery<User[]>({ queryKey: ["/api/admin/users"] });

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <SEO title="Admin Dashboard - Génesis" description="Organization-wide AI adoption analytics, team management, and governance tools for your enterprise." />
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Organization-wide AI adoption metrics</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Org Avg SQ", value: "54", trend: "+3", icon: TrendingUp, color: "text-[#7C3AED]" },
          { label: "Active Users", value: "91%", trend: "120 DAU", icon: Users, color: "text-blue-500" },
          { label: "Training Completion", value: "68%", trend: "+12%", icon: GraduationCap, color: "text-green-500" },
          { label: "Hours Recovered", value: "1,420", trend: "This quarter", icon: Clock, color: "text-amber-500" },
        ].map((kpi) => (
          <Card key={kpi.label} className="p-4" data-testid={`kpi-${kpi.label.toLowerCase().replace(/\s/g, "-")}`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <Badge variant="secondary" className="text-[10px] mt-1">{kpi.trend}</Badge>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">SQ Distribution</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sqDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px" }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {sqDistribution.map((entry, i) => (
                      <rect key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Org Heat Map</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={heatmapData}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  content={<CustomTreemapContent />}
                />
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Engagement Timeline (30 days)</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px" }} />
                <Line type="monotone" dataKey="dau" stroke="#7C3AED" strokeWidth={2} dot={{ fill: "#7C3AED", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="font-semibold text-sm mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Launch assessment cycle", icon: Send },
            { label: "Nudge inactive users", icon: Users },
            { label: "Review tool requests (3)", icon: Wrench },
            { label: "Export report", icon: Download },
          ].map((action) => (
            <Button key={action.label} variant="outline" className="h-auto py-3 px-4 justify-start gap-2 text-xs" data-testid={`action-${action.label.toLowerCase().replace(/\s/g, "-").replace(/[()]/g, "")}`}>
              <action.icon className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-left">{action.label}</span>
            </Button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
