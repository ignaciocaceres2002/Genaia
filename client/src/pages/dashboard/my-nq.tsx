import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SQRing } from "@/components/nq-ring";
import { SKILLS } from "@shared/schema";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, ReferenceLine, Legend } from "recharts";
import { fadeUp, pageContainer } from "@/lib/motion-variants";
import { buildCollaboratorProjection } from "@/lib/collaborator-projection";
import { getOnboardingProfile, hasCompletedInitialAssessment, mergeUserWithInitialSqSnapshot } from "@/lib/user-onboarding";

const CHART_1 = "hsl(var(--chart-1))";
const CHART_2 = "hsl(var(--chart-2))";
const CHART_3 = "hsl(var(--chart-3))";
const tooltipStyle = { backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px", color: "hsl(var(--foreground))" };

export default function MySQPage() {
  const { data: user } = useQuery<User>({ queryKey: ["/api/user/me"] });

  const currentUser = mergeUserWithInitialSqSnapshot(user || {
    name: "Sarah Chen",
    nqScore: 67,
    department: "Marketing",
    skillScores: {
      dataFluency: 72,
      adaptiveMindset: 65,
      verificationMindset: 78,
      coIntelligence: 58,
      autonomousDrive: 70,
      processReimagination: 60,
    },
  });
  const projection = buildCollaboratorProjection(currentUser);
  const onboardingDone = hasCompletedInitialAssessment();
  const onboardingProfile = getOnboardingProfile();

  const skillScores = (currentUser.skillScores as Record<string, number>) || {
    dataFluency: 72, adaptiveMindset: 65, verificationMindset: 78,
    coIntelligence: 58, autonomousDrive: 70, processReimagination: 60,
  };

  const radarData = SKILLS.map((s) => ({
    skill: s.name.split(" ")[0],
    fullName: s.name,
    score: skillScores[s.key] || 0,
    benchmark: 55,
  }));

  const historyData = [
    { week: "W1", score: 42 }, { week: "W2", score: 45 }, { week: "W3", score: 48 },
    { week: "W4", score: 52 }, { week: "W5", score: 55 }, { week: "W6", score: 58 },
    { week: "W7", score: 61 }, { week: "W8", score: 64 }, { week: "W9", score: 67, projected: 67 },
    { week: "W10", projected: 70 }, { week: "W11", projected: 73 }, { week: "W12", projected: 76 },
  ];

  const benchmarkData = [
    { label: "You", value: currentUser.nqScore || 67 },
    { label: "Team Avg", value: 54 },
    { label: "Company", value: 48 },
    { label: "Industry", value: 42 },
  ];

  const skillTrends: Record<string, "up" | "down" | "flat"> = {
    dataFluency: "up", adaptiveMindset: "up", verificationMindset: "flat",
    coIntelligence: "down", autonomousDrive: "up", processReimagination: "flat",
  };

  const modulesData: Record<string, { done: number; total: number }> = {
    dataFluency: { done: 5, total: 6 }, adaptiveMindset: { done: 3, total: 5 },
    verificationMindset: { done: 4, total: 6 }, coIntelligence: { done: 2, total: 6 },
    autonomousDrive: { done: 3, total: 5 }, processReimagination: { done: 1, total: 6 },
  };

  return (
    <motion.div className="max-w-4xl mx-auto space-y-8" initial="hidden" animate="visible" variants={pageContainer}>
      {!onboardingDone && (
        <motion.div variants={fadeUp}>
          <Card className="p-5 border-l-4 border-l-chart-2">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-medium text-sm">You still need your first SQ baseline</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Run onboarding + first assessment to initialize your real SQ profile and projections.
                </p>
              </div>
              <Link href="/onboarding">
                <Button size="sm" className="rounded-full bg-chart-1 text-white border-chart-1">
                  Start onboarding
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center gap-8">
        <SQRing score={currentUser.nqScore || 67} size={180} label="Expert" />
        <div>
          <h1 className="text-display-xs font-bold">Your SQ Score</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Top 34% of {currentUser.department || "Marketing"} professionals
          </p>
          {onboardingProfile?.objective && (
            <p className="text-xs text-muted-foreground mt-2">
              Started with goal: <span className="font-medium text-foreground">{onboardingProfile.objective}</span>
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" /> +5 pts this month
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div>
              <h3 className="font-semibold">Proyeccion del colaborador</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Estimacion probabilistica de tu evolucion de SQ y de la mejora potencial de tus skills.
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {projection.sqImprovementProbability}% probabilidad de mejora
            </Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">SQ actual</p>
              <p className="text-2xl font-bold mt-2">{projection.currentSq}</p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">SQ probable</p>
              <p className="text-2xl font-bold mt-2">{projection.probableSq}</p>
              <p className="text-xs text-green-600 mt-1">+{projection.expectedSqLift} puntos esperados</p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Escenario optimista</p>
              <p className="text-2xl font-bold mt-2">{projection.optimisticSq}</p>
              <p className="text-xs text-muted-foreground mt-1">Conservador {projection.conservativeSq}</p>
            </div>
          </div>
          <h3 className="font-semibold mb-4">Skills Radar</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Radar name="You" dataKey="score" stroke={CHART_1} fill={CHART_1} fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" fill="none" strokeDasharray="4 4" strokeWidth={1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="font-semibold mb-4">Skill Scores y Propension de Mejora</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((skill) => {
            const score = skillScores[skill.key] || 0;
            const trend = skillTrends[skill.key];
            const modules = modulesData[skill.key] || { done: 0, total: 6 };
            const skillProjection = projection.skillProjections.find((item) => item.key === skill.key);
            const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
            const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground";

            return (
              <Card key={skill.key} className="p-4" data-testid={`card-skill-${skill.key}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-sm font-medium">{skill.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Modules {modules.done}/{modules.total}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">{score}</span>
                    <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mb-3">
                  <div className="bg-chart-1 h-1.5 rounded-full transition-all" style={{ width: `${score}%` }} />
                </div>
                {skillProjection && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground mb-1">
                      <span>Propension a mejorar</span>
                      <span>{skillProjection.propensity}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-chart-2 h-1.5 rounded-full transition-all" style={{ width: `${skillProjection.propensity}%` }} />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      Proyeccion estimada: <span className="font-medium text-foreground">{skillProjection.projectedScore}</span> con upside de +{skillProjection.expectedGain}.
                    </p>
                  </div>
                )}
                <Link href="/dashboard/learning">
                  <Button variant="ghost" size="sm" className="w-full text-xs" data-testid={`button-continue-${skill.key}`}>
                    {modules.done > 0 ? "Continue" : "Start"} <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp}>
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
              <h3 className="font-semibold">SQ History</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Actual: <strong className="text-foreground">67</strong></span>
                <span>Proyección W12: <strong className="text-chart-2">76</strong></span>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <ReferenceLine x="W9" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: "Hoy", position: "insideTopRight", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Line type="monotone" dataKey="score" stroke={CHART_1} strokeWidth={2} dot={{ fill: CHART_1, r: 3 }} connectNulls={false} name="Actual" />
                  <Line type="monotone" dataKey="projected" stroke={CHART_2} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: CHART_2, r: 2 }} connectNulls={false} name="Proyección" />
                  <Legend iconType="line" wrapperStyle={{ fontSize: "11px" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Benchmarks</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={70} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill={CHART_1} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
