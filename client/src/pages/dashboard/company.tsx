import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NQRing } from "@/components/nq-ring";
import { useQuery } from "@tanstack/react-query";
import type { Team } from "@shared/schema";
import { TrendingUp, AlertTriangle, Trophy, Users } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const defaultTeams = [
  { id: "1", name: "Engineering", headcount: 45, avgNq: 62, completionPct: 78, champion: "Marcus Johnson" },
  { id: "2", name: "Marketing", headcount: 22, avgNq: 58, completionPct: 65, champion: "Elena Rodriguez" },
  { id: "3", name: "Finance", headcount: 18, avgNq: 51, completionPct: 55, champion: "James Wright" },
  { id: "4", name: "Product", headcount: 15, avgNq: 66, completionPct: 82, champion: "Aisha Patel" },
  { id: "5", name: "Sales", headcount: 30, avgNq: 44, completionPct: 42, champion: null },
];

const agenticLevels = ["Traditional", "AI-Curious", "AI-Enabled", "Agentic Enterprise"];

export default function CompanyPage() {
  const { data: teams } = useQuery<Team[]>({ queryKey: ["/api/teams"] });
  const displayTeams = teams || defaultTeams;
  const agenticScore = 54;
  const agenticLevel = agenticLevels[Math.floor(agenticScore / 25)] || agenticLevels[0];

  return (
    <motion.div className="max-w-4xl mx-auto space-y-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">My Company</h1>
        <p className="text-muted-foreground text-sm mt-1">Organization-wide AI adoption overview</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <NQRing score={agenticScore} size={140} label={agenticLevel} />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-semibold">Agentic Enterprise Score</h3>
              <p className="text-muted-foreground text-sm mt-1">Your organization is <span className="font-semibold text-foreground">{agenticLevel}</span></p>
              <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" /> +4 pts this quarter
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="font-semibold text-sm mb-3">Teams</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayTeams.map((team: any) => (
            <Card key={team.id} className="p-4 hover-elevate cursor-pointer" data-testid={`card-team-${team.id}`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="font-semibold text-sm">{team.name}</h4>
                <Badge variant="secondary" className="text-[10px]">
                  <Users className="w-3 h-3 mr-0.5" />{team.headcount}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <p className="text-xl font-bold">{team.avgNq}</p>
                  <p className="text-[10px] text-muted-foreground">Avg NQ</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{team.completionPct}%</p>
                  <p className="text-[10px] text-muted-foreground">Completion</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-[#7C3AED] h-1.5 rounded-full" style={{ width: `${team.avgNq}%` }} />
              </div>
              {team.champion && (
                <div className="flex items-center gap-1 mt-2">
                  <Trophy className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-muted-foreground">{team.champion}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="font-semibold text-sm mb-3">Alerts</h3>
        <div className="space-y-2">
          {[
            { type: "warning", message: "5 team members inactive for 14+ days", team: "Sales" },
            { type: "info", message: "Marketing team hit Catalyst level!", team: "Marketing" },
            { type: "warning", message: "Sales NQ dropped 3pts this week", team: "Sales" },
          ].map((alert, i) => (
            <Card key={i} className="p-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${alert.type === "warning" ? "text-amber-500" : "text-blue-500"}`} />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.team}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
