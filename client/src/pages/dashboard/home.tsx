import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SQRing } from "@/components/nq-ring";
import { GraduationCap, Target, Wrench, Lightbulb, Flame, Zap, Trophy } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { User, Activity } from "@shared/schema";
import { SEO } from "@/components/seo";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

export default function DashboardHome() {
  const { data: user } = useQuery<User>({ queryKey: ["/api/user/me"] });
  const { data: activities } = useQuery<Activity[]>({ queryKey: ["/api/user/activities"] });
  const { data: leaderboard } = useQuery<User[]>({ queryKey: ["/api/user/leaderboard"] });

  const currentUser = user || {
    name: "Sarah Chen",
    nqScore: 67,
    xp: 8450,
    streak: 12,
    level: 5,
  };

  const levelNames = ["Beginner", "Learner", "Explorer", "Builder", "Achiever", "Expert", "Master", "Superagent"];
  const streakDays = Array.from({ length: 7 }, (_, i) => i < (currentUser.streak % 7 === 0 ? 7 : currentUser.streak % 7));
  const todayIndex = new Date().getDay();

  return (
    <motion.div className="max-w-4xl mx-auto space-y-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <SEO title="Dashboard - Génesis" description="Your personal AI adoption dashboard. Track your SQ score, streaks, learning progress, and more." />
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0">
          <SQRing score={currentUser.nqScore} size={160} label={levelNames[(currentUser.level || 1) - 1]} />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-welcome">Welcome back, {currentUser.name?.split(" ")[0]}</h1>
            <p className="text-muted-foreground text-sm mt-1">Your SQ is <span className="font-semibold text-foreground">{currentUser.nqScore}</span> — keep going!</p>
          </div>

          <Card className="p-4 border-l-4 border-l-[#7C3AED]">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-medium text-sm">Daily Challenge</p>
                <p className="text-xs text-muted-foreground mt-0.5">Complete "Verify or Trust?" scenario</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-xs">5 min</Badge>
                <Badge variant="secondary" className="text-xs"><Zap className="w-3 h-3 mr-0.5" />+150 XP</Badge>
                <Button size="sm" className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-daily-challenge">
                  Start
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-sm">{currentUser.streak}-day streak</span>
            </div>
            {currentUser.streak >= 7 && (
              <Badge variant="secondary" className="text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                {currentUser.streak >= 100 ? "Gold" : currentUser.streak >= 30 ? "Silver" : "Bronze"}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    streakDays[i]
                      ? "bg-[#7C3AED] text-white"
                      : i === todayIndex
                        ? "border-2 border-[#7C3AED] text-[#7C3AED]"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {streakDays[i] ? "✓" : ""}
                </div>
                <span className="text-[10px] text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Learning", path: "/dashboard/learning", icon: GraduationCap, color: "text-blue-500" },
            { title: "Assessments", path: "/dashboard/assessments", icon: Target, color: "text-green-500" },
            { title: "AI Tools", path: "/dashboard/tools", icon: Wrench, color: "text-amber-500" },
            { title: "Use Cases", path: "/dashboard/company", icon: Lightbulb, color: "text-purple-500" },
          ].map((item) => (
            <Link key={item.title} href={item.path}>
              <Card className="p-4 hover-elevate cursor-pointer" data-testid={`card-quick-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                <p className="text-sm font-medium">{item.title}</p>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp}>
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {(activities || [
                { id: "1", title: "Completed Trust But Verify Module 3", xpEarned: 200, type: "course", createdAt: new Date(Date.now() - 3600000).toISOString() },
                { id: "2", title: "Practiced with DataSense Agent", xpEarned: 100, type: "practice", createdAt: new Date(Date.now() - 86400000).toISOString() },
                { id: "3", title: "Submitted use case: Email Triage", xpEarned: 250, type: "usecase", createdAt: new Date(Date.now() - 172800000).toISOString() },
                { id: "4", title: "Completed Data Fluency Assessment", xpEarned: 300, type: "assessment", createdAt: new Date(Date.now() - 259200000).toISOString() },
                { id: "5", title: "Finished Reading the Machine Module 1", xpEarned: 150, type: "course", createdAt: new Date(Date.now() - 345600000).toISOString() },
              ]).slice(0, 5).map((act: any) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{act.title}</p>
                    <p className="text-xs text-muted-foreground">+{act.xpEarned} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">Team Leaderboard</h3>
            <div className="space-y-3">
              {(leaderboard || [
                { id: "1", name: "Marcus Johnson", xp: 12500, nqScore: 78 },
                { id: "2", name: "Sarah Chen", xp: 8450, nqScore: 67 },
                { id: "3", name: "Alex Rivera", xp: 7200, nqScore: 62 },
                { id: "4", name: "Priya Patel", xp: 6800, nqScore: 59 },
                { id: "5", name: "David Kim", xp: 5100, nqScore: 52 },
              ]).slice(0, 5).map((u: any, i: number) => (
                <div key={u.id} className="flex items-center gap-3">
                  <span className={`text-xs font-bold w-5 ${i === 0 ? "text-amber-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-700" : "text-muted-foreground"}`}>
                    #{i + 1}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-[#7C3AED]">{u.name?.split(" ").map((n: string) => n[0]).join("")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{u.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{u.xp?.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
