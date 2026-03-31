import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { PublicUser } from "@shared/schema";
import { Trophy, MessageSquare, Star, ExternalLink } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const defaultChampions: PublicUser[] = [
  { id: "1", name: "Marcus Johnson", department: "Engineering", nqScore: 88, username: "marcus.johnson", email: "marcus@company.com", role: "user", avatar: null, level: 7, xp: 22500, streak: 45, isChampion: true, isAdmin: false, skillScores: null, lastActive: null, createdAt: null },
  { id: "2", name: "Elena Rodriguez", department: "Marketing", nqScore: 82, username: "elena.rodriguez", email: "elena@company.com", role: "user", avatar: null, level: 6, xp: 15200, streak: 30, isChampion: true, isAdmin: false, skillScores: null, lastActive: null, createdAt: null },
  { id: "3", name: "James Wright", department: "Finance", nqScore: 79, username: "james.wright", email: "james@company.com", role: "user", avatar: null, level: 6, xp: 14500, streak: 22, isChampion: true, isAdmin: false, skillScores: null, lastActive: null, createdAt: null },
  { id: "4", name: "Aisha Patel", department: "Product", nqScore: 85, username: "aisha.patel", email: "aisha@company.com", role: "user", avatar: null, level: 6, xp: 16200, streak: 35, isChampion: true, isAdmin: false, skillScores: null, lastActive: null, createdAt: null },
  { id: "5", name: "David Kim", department: "Legal", nqScore: 76, username: "david.kim", email: "david@company.com", role: "user", avatar: null, level: 4, xp: 5100, streak: 3, isChampion: true, isAdmin: false, skillScores: null, lastActive: null, createdAt: null },
];

const champFeed = [
  { id: "1", champion: "Marcus Johnson", content: "Just discovered an amazing workflow: use Claude to draft architecture docs, then have Copilot generate the boilerplate. Saved 4 hours today!", time: "2h ago" },
  { id: "2", champion: "Elena Rodriguez", content: "Pro tip: When using AI for campaign copy, always feed it your brand guidelines first. The output quality jumps dramatically.", time: "5h ago" },
  { id: "3", champion: "James Wright", content: "New use case submitted: Automated variance analysis with GPT-4. Turns a 3-day process into 20 minutes.", time: "1d ago" },
];

export default function ChampionsPage() {
  const { data: champions } = useQuery<PublicUser[]>({ queryKey: ["/api/champions"] });
  const displayChampions = champions || defaultChampions;

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Champions</h1>
        <p className="text-muted-foreground text-sm mt-1">Connect with AI adoption leaders in your organization</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="font-semibold text-sm mb-3">Champion Board</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayChampions.map((champ: PublicUser) => (
            <Card key={champ.id} className="p-4" data-testid={`card-champion-${champ.id}`}>
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium">
                    {champ.name.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{champ.name}</p>
                  <p className="text-xs text-muted-foreground">{champ.department}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px]">SQ {champ.nqScore}</Badge>
                    {champ.department && <Badge variant="secondary" className="text-[10px]">{champ.department}</Badge>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1 rounded-full text-xs">
                  <MessageSquare className="w-3 h-3 mr-1" /> Connect
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h3 className="font-semibold text-sm mb-3">Champion Feed</h3>
        <div className="space-y-3">
          {champFeed.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-medium">
                    {item.champion.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.champion}</span>
                    <Trophy className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.content}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Star className="w-3 h-3" /> Bookmark
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-6 bg-gradient-to-br from-[#7C3AED]/10 to-[#5B21B6]/10 border-[#7C3AED]/20">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-[#7C3AED] mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Champions Test</h3>
            <p className="text-sm text-muted-foreground mb-4">Find out if you have what it takes to be an AI Champion</p>
            <a href="https://aichampsfinder.replit.app/" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED] mb-3" data-testid="button-champions-test">
                <ExternalLink className="w-4 h-4 mr-2" /> Take the Champions Test
              </Button>
            </a>
            <p className="text-xs text-muted-foreground">Use code <span className="font-semibold text-[#7C3AED]">PRUEBA</span> to access the test</p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="p-6 bg-[#7C3AED]/5 border-[#7C3AED]/20">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-[#7C3AED] mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Become a Champion</h3>
            <p className="text-sm text-muted-foreground mb-4">Reach SQ 65+ and high engagement to unlock your invitation</p>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="text-lg font-bold">67/65</p>
                <p className="text-xs text-muted-foreground">SQ Score</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">72/80</p>
                <p className="text-xs text-muted-foreground">Engagement</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
