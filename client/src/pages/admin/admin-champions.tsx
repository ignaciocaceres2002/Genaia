import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { Trophy, Users, TrendingUp, Send } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const championCandidates = [
  { name: "Sarah Chen", department: "Marketing", nq: 67, engagement: 72, influence: 45, composite: 62 },
  { name: "Alex Rivera", department: "Product", nq: 62, engagement: 68, influence: 52, composite: 60 },
  { name: "Priya Patel", department: "Finance", nq: 59, engagement: 65, influence: 38, composite: 54 },
];

const activeChampions = [
  { name: "Marcus Johnson", department: "Engineering", nq: 88, peopleHelped: 32, activities: 45, tasksCompleted: 28 },
  { name: "Elena Rodriguez", department: "Marketing", nq: 82, peopleHelped: 24, activities: 38, tasksCompleted: 22 },
  { name: "James Wright", department: "Finance", nq: 79, peopleHelped: 18, activities: 30, tasksCompleted: 15 },
  { name: "Aisha Patel", department: "Product", nq: 85, peopleHelped: 28, activities: 42, tasksCompleted: 25 },
];

export default function AdminChampionsPage() {
  const { data: champions } = useQuery<User[]>({ queryKey: ["/api/champions"] });

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Champion Program</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage, track, and grow your champion network</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Champions", value: "4", icon: Trophy },
          { label: "People Helped", value: "102", icon: Users },
          { label: "Avg Champion NQ", value: "83.5", icon: TrendingUp },
          { label: "Coverage", value: "57%", icon: Users },
        ].map((m) => (
          <Card key={m.label} className="p-4">
            <m.icon className="w-4 h-4 text-[#7C3AED] mb-2" />
            <p className="text-xl font-bold">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="overflow-visible">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-sm">Active Champions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">Champion</th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">Dept</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">NQ</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Helped</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Activities</th>
                  <th className="text-center p-3 text-xs text-muted-foreground font-medium">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {activeChampions.map((c) => (
                  <tr key={c.name} className="border-b">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="bg-[#7C3AED]/10 text-[#7C3AED] text-[10px]">
                            {c.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{c.department}</td>
                    <td className="p-3 text-center font-semibold">{c.nq}</td>
                    <td className="p-3 text-center">{c.peopleHelped}</td>
                    <td className="p-3 text-center">{c.activities}</td>
                    <td className="p-3 text-center">{c.tasksCompleted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-3">Champion Candidates</h3>
          <p className="text-xs text-muted-foreground mb-4">Ranked by composite score (NQ 40% + Engagement 30% + Influence 30%)</p>
          <div className="space-y-3">
            {championCandidates.map((c) => (
              <div key={c.name} className="flex items-center justify-between gap-4 p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.department} · Composite: {c.composite}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-xs text-muted-foreground hidden md:block">
                    <span>NQ {c.nq}</span> · <span>Eng {c.engagement}</span> · <span>Inf {c.influence}</span>
                  </div>
                  <Button size="sm" className="rounded-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white no-default-hover-elevate text-xs">
                    <Send className="w-3 h-3 mr-1" /> Invite
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
