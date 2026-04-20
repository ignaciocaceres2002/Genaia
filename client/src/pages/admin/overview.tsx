import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Team, User } from "@shared/schema";
import { TrendingUp, Users, GraduationCap, Clock, Send, FileText, Wrench, Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Treemap, ReferenceLine, Legend } from "recharts";
import { SEO } from "@/components/seo";
import { fadeUp, staggerContainer, pageContainer } from "@/lib/motion-variants";
import { buildProjectionSummary } from "@/lib/collaborator-projection";

const CHART_1 = "hsl(var(--chart-1))";
const CHART_2 = "hsl(var(--chart-2))";
const CHART_3 = "hsl(var(--chart-3))";
const CHART_4 = "hsl(var(--chart-4))";
const CHART_5 = "hsl(var(--chart-5))";
const tooltipStyle = { backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px", color: "hsl(var(--foreground))" };

const sqDistribution = [
  { range: "0-25", count: 12, projected: 8, level: "Novice" },
  { range: "26-50", count: 38, projected: 30, level: "Aware" },
  { range: "51-75", count: 52, projected: 58, level: "Practitioner" },
  { range: "76-100", count: 18, projected: 24, level: "Catalyst" },
];

const sqBarColors = [CHART_5, CHART_4, CHART_1, CHART_2];

const engagementData = [
  { day: "Jan 1", dau: 65 }, { day: "Jan 8", dau: 72 }, { day: "Jan 15", dau: 68 },
  { day: "Jan 22", dau: 78 }, { day: "Jan 29", dau: 82 }, { day: "Feb 5", dau: 85 },
  { day: "Feb 12", dau: 88 }, { day: "Feb 19", dau: 91, projected: 91 },
  { day: "Feb 26", projected: 94 }, { day: "Mar 5", projected: 97 }, { day: "Mar 12", projected: 100 },
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

const fallbackUsers: Partial<User>[] = [
  { name: "Sarah Chen", department: "Marketing", nqScore: 67, xp: 8450, streak: 12, skillScores: { dataFluency: 72, adaptiveMindset: 65, verificationMindset: 78, coIntelligence: 58, autonomousDrive: 70, processReimagination: 60 } },
  { name: "Marcus Johnson", department: "Engineering", nqScore: 88, xp: 22500, streak: 45, skillScores: { dataFluency: 90, adaptiveMindset: 85, verificationMindset: 92, coIntelligence: 82, autonomousDrive: 88, processReimagination: 86 } },
  { name: "Elena Rodriguez", department: "Marketing", nqScore: 82, xp: 15200, streak: 30, skillScores: { dataFluency: 78, adaptiveMindset: 80, verificationMindset: 85, coIntelligence: 76, autonomousDrive: 84, processReimagination: 89 } },
  { name: "Alex Rivera", department: "Product", nqScore: 62, xp: 7200, streak: 8, skillScores: { dataFluency: 65, adaptiveMindset: 60, verificationMindset: 68, coIntelligence: 55, autonomousDrive: 62, processReimagination: 58 } },
  { name: "Priya Patel", department: "Finance", nqScore: 59, xp: 6800, streak: 5, skillScores: { dataFluency: 62, adaptiveMindset: 55, verificationMindset: 64, coIntelligence: 50, autonomousDrive: 58, processReimagination: 52 } },
  { name: "David Kim", department: "Legal", nqScore: 52, xp: 5100, streak: 3, skillScores: { dataFluency: 55, adaptiveMindset: 48, verificationMindset: 58, coIntelligence: 45, autonomousDrive: 52, processReimagination: 48 } },
  { name: "James Wright", department: "Finance", nqScore: 79, xp: 14500, streak: 22, skillScores: { dataFluency: 85, adaptiveMindset: 75, verificationMindset: 82, coIntelligence: 70, autonomousDrive: 78, processReimagination: 74 } },
  { name: "Aisha Patel", department: "Product", nqScore: 85, xp: 16200, streak: 35, skillScores: { dataFluency: 82, adaptiveMindset: 88, verificationMindset: 80, coIntelligence: 86, autonomousDrive: 90, processReimagination: 84 } },
];

const TREEMAP_COLORS = [CHART_1, CHART_2, CHART_3, CHART_4, CHART_5];

interface TreemapContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  sq?: number;
  index?: number;
}

const CustomTreemapContent = (props: TreemapContentProps) => {
  const { x = 0, y = 0, width = 0, height = 0, name, sq, index = 0 } = props;
  if (width < 40 || height < 30) return null;
  const color = TREEMAP_COLORS[index % TREEMAP_COLORS.length];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} rx={4} opacity={0.85} stroke="hsl(var(--background))" strokeWidth={2} />
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
  const projectionSummary = buildProjectionSummary((users && users.length > 0 ? users : fallbackUsers) as Partial<User>[]);

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <SEO title="Admin Dashboard - Genaia" description="Organization-wide AI adoption analytics, team management, and governance tools for your enterprise." />
      <motion.div variants={fadeUp}>
        <h1 className="text-display-xs font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Organization-wide AI adoption metrics</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Org Avg SQ", value: `${projectionSummary.avgCurrentSq}`, trend: `→ ${projectionSummary.avgProbableSq}`, icon: TrendingUp, color: "text-chart-1" },
          { label: "Active Users", value: "91%", trend: "120 DAU", icon: Users, color: "text-chart-3" },
          { label: "Training Completion", value: "68%", trend: "+12%", icon: GraduationCap, color: "text-chart-2" },
          { label: "Hours Recovered", value: "1,420", trend: "This quarter", icon: Clock, color: "text-chart-4" },
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

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div>
              <h3 className="font-semibold text-sm">Proyeccion del colaborador</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Vista probabilistica del potencial de mejora de SQ y de la propension a desarrollar skills por colaborador.
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {projectionSummary.highPotentialCount} colaboradores con alta probabilidad de mejora
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground">SQ promedio actual</p>
              <p className="text-3xl font-bold mt-2">{projectionSummary.avgCurrentSq}</p>
            </Card>
            <Card className="p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground">SQ promedio probable</p>
              <p className="text-3xl font-bold mt-2">{projectionSummary.avgProbableSq}</p>
              <p className="text-xs text-green-600 mt-1">+{projectionSummary.avgProbableSq - projectionSummary.avgCurrentSq} pts esperados</p>
            </Card>
            <Card className="p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground">Probabilidad media de mejora</p>
              <p className="text-3xl font-bold mt-2">{projectionSummary.avgProbability}%</p>
              <div className="w-full h-2 rounded-full bg-background mt-3">
                <div className="h-2 rounded-full bg-chart-2 transition-all" style={{ width: `${projectionSummary.avgProbability}%` }} />
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Top colaboradores con mayor upside</h4>
              <div className="space-y-3">
                {projectionSummary.topMovers.map((item, index) => (
                  <div key={item.user.name || index} className="rounded-xl border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{item.user.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.user.department || "Sin equipo"}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.projection.sqImprovementProbability}% prob.
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">SQ actual</p>
                        <p className="font-semibold text-sm mt-1">{item.projection.currentSq}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">SQ probable</p>
                        <p className="font-semibold text-sm mt-1">{item.projection.probableSq}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Upside</p>
                        <p className="font-semibold text-sm mt-1 text-green-600">+{item.projection.expectedSqLift}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Skill con mejor respuesta esperada: <span className="font-medium text-foreground">{item.projection.topFocusSkills[0]?.name}</span>.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Outlook por equipo</h4>
              <div className="space-y-3">
                {projectionSummary.departmentOutlook.slice(0, 6).map((department) => (
                  <div key={department.department} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div>
                        <p className="text-sm font-medium">{department.department}</p>
                        <p className="text-xs text-muted-foreground mt-1">{department.headcount} colaboradores</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {department.avgProbability}% prob.
                      </Badge>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-chart-1 transition-all" style={{ width: `${department.avgProbability}%` }} />
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs mt-3">
                      <span className="text-muted-foreground">SQ {department.avgCurrentSq} → {department.avgProbableSq}</span>
                      <span className="font-medium text-green-600">+{department.projectedLift}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
              <h3 className="font-semibold text-sm">SQ Distribution</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Total actual: <strong className="text-foreground">120</strong></span>
                <span>Proyección: <strong className="text-chart-2">120</strong> redistribuídos</span>
              </div>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sqDistribution} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill={CHART_1} radius={[4, 4, 0, 0]} name="Actual" />
                  <Bar dataKey="projected" fill={CHART_2} radius={[4, 4, 0, 0]} name="Proyección" opacity={0.75} />
                  <Legend iconType="square" wrapperStyle={{ fontSize: "11px" }} />
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
          <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
            <h3 className="font-semibold text-sm">Engagement Timeline</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Actual: <strong className="text-foreground">91 DAU</strong></span>
              <span>Proyección (Mar 12): <strong className="text-chart-2">100 DAU</strong></span>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[0, 120]} />
                <Tooltip contentStyle={tooltipStyle} />
                <ReferenceLine x="Feb 19" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: "Hoy", position: "insideTopRight", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Line type="monotone" dataKey="dau" stroke={CHART_1} strokeWidth={2.5} dot={{ fill: CHART_1, r: 3 }} connectNulls={false} name="DAU" />
                <Line type="monotone" dataKey="projected" stroke={CHART_2} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: CHART_2, r: 2 }} connectNulls={false} name="Proyección" />
                <Legend iconType="line" wrapperStyle={{ fontSize: "11px" }} />
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
              <action.icon className="w-4 h-4 text-chart-1" />
              <span className="text-left">{action.label}</span>
            </Button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
