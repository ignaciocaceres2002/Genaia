import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import type { Team } from "@shared/schema";
import { Search, TrendingUp, TrendingDown, Minus, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const defaultTeams = [
  { id: "1", name: "Engineering", department: "Engineering", headcount: 45, avgNq: 62, completionPct: 78, engagementScore: 85, champion: "Marcus Johnson", trend: "up" },
  { id: "2", name: "Marketing", department: "Marketing", headcount: 22, avgNq: 58, completionPct: 65, engagementScore: 72, champion: "Elena Rodriguez", trend: "up" },
  { id: "3", name: "Finance", department: "Finance", headcount: 18, avgNq: 51, completionPct: 55, engagementScore: 63, champion: "James Wright", trend: "flat" },
  { id: "4", name: "Product", department: "Product", headcount: 15, avgNq: 66, completionPct: 82, engagementScore: 88, champion: "Aisha Patel", trend: "up" },
  { id: "5", name: "Sales", department: "Sales", headcount: 30, avgNq: 44, completionPct: 42, engagementScore: 48, champion: null, trend: "down" },
  { id: "6", name: "Legal", department: "Legal", headcount: 10, avgNq: 55, completionPct: 60, engagementScore: 65, champion: "David Kim", trend: "flat" },
  { id: "7", name: "People Ops", department: "People Ops", headcount: 12, avgNq: 60, completionPct: 70, engagementScore: 75, champion: null, trend: "up" },
];

const selectedTeamSkills = [
  { skill: "Data", score: 68, companyAvg: 55 },
  { skill: "Adaptive", score: 62, companyAvg: 52 },
  { skill: "Verify", score: 72, companyAvg: 58 },
  { skill: "Co-Intel", score: 55, companyAvg: 48 },
  { skill: "Drive", score: 65, companyAvg: 50 },
  { skill: "Process", score: 58, companyAvg: 45 },
];

export default function AdminTeamsPage() {
  const { data: teams } = useQuery<Team[]>({ queryKey: ["/api/teams"] });
  const displayTeams = teams || defaultTeams;
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const filteredTeams = displayTeams.filter((t: any) => t.name.toLowerCase().includes(search.toLowerCase()));
  const selected = displayTeams.find((t: any) => t.id === selectedTeam);

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <p className="text-muted-foreground text-sm mt-1">Compare team performance and AI adoption</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams..."
            className="pl-9 text-sm"
            data-testid="input-search-teams"
          />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div variants={fadeUp}>
            <Card className="overflow-visible">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-xs text-muted-foreground font-medium">Team</th>
                      <th className="text-center p-3 text-xs text-muted-foreground font-medium">Size</th>
                      <th className="text-center p-3 text-xs text-muted-foreground font-medium">Avg SQ</th>
                      <th className="text-center p-3 text-xs text-muted-foreground font-medium">Trend</th>
                      <th className="text-center p-3 text-xs text-muted-foreground font-medium">Completion</th>
                      <th className="text-center p-3 text-xs text-muted-foreground font-medium">Engagement</th>
                      <th className="text-left p-3 text-xs text-muted-foreground font-medium">Champion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeams.map((team: any) => {
                      const TrendIcon = team.trend === "up" ? TrendingUp : team.trend === "down" ? TrendingDown : Minus;
                      const trendColor = team.trend === "up" ? "text-green-500" : team.trend === "down" ? "text-red-500" : "text-muted-foreground";
                      return (
                        <tr
                          key={team.id}
                          className={`border-b cursor-pointer hover-elevate ${selectedTeam === team.id ? "bg-[#7C3AED]/5" : ""}`}
                          onClick={() => setSelectedTeam(team.id)}
                          data-testid={`row-team-${team.id}`}
                        >
                          <td className="p-3 font-medium">{team.name}</td>
                          <td className="p-3 text-center text-muted-foreground">{team.headcount}</td>
                          <td className="p-3 text-center font-semibold">{team.avgNq}</td>
                          <td className="p-3 text-center"><TrendIcon className={`w-4 h-4 mx-auto ${trendColor}`} /></td>
                          <td className="p-3 text-center">{team.completionPct}%</td>
                          <td className="p-3 text-center">{team.engagementScore}</td>
                          <td className="p-3">
                            {team.champion ? (
                              <div className="flex items-center gap-1">
                                <Trophy className="w-3 h-3 text-amber-500" />
                                <span className="text-xs">{team.champion}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">None</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={fadeUp}>
          {selected ? (
            <Card className="p-5 sticky top-20">
              <h3 className="font-semibold mb-1">{(selected as any).name}</h3>
              <p className="text-xs text-muted-foreground mb-4">
                <Users className="w-3 h-3 inline mr-1" />{(selected as any).headcount} members
              </p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={selectedTeamSkills}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Radar name="Team" dataKey="score" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Company" dataKey="companyAvg" stroke="hsl(var(--muted-foreground))" fill="none" strokeDasharray="4 4" strokeWidth={1} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          ) : (
            <Card className="p-5">
              <p className="text-sm text-muted-foreground text-center py-8">Select a team to view details</p>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
