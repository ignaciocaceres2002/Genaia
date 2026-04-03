import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Gift, Star, Clock, Users, Plus, TrendingUp, Award } from "lucide-react";
import type { AiUseCase, Benefit } from "@shared/schema";
import { SEO } from "@/components/seo";

import { fadeUp, pageContainer } from "@/lib/motion-variants";

function TopContributors({ useCases }: { useCases: AiUseCase[] }) {
  const contributorMap: Record<string, { name: string; count: number; timeSaved: number; points: number }> = {};
  for (const uc of useCases) {
    const key = uc.userId;
    if (!contributorMap[key]) {
      contributorMap[key] = { name: uc.userName || "Unknown", count: 0, timeSaved: 0, points: 0 };
    }
    contributorMap[key].count++;
    contributorMap[key].timeSaved += uc.timeSavedMinutes || 0;
    contributorMap[key].points += uc.pointsAwarded || 0;
  }

  const sorted = Object.entries(contributorMap)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.points - a.points);

  const medals = ["text-amber-500", "text-gray-400", "text-amber-700"];

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h3 className="font-semibold">Top Contributors</h3>
      </div>
      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No contributions yet</p>
      ) : (
        <div className="space-y-3">
          {sorted.slice(0, 10).map((c, i) => (
            <div key={c.id} className="flex items-center gap-3" data-testid={`contributor-${c.id}`}>
              <span className={`text-sm font-bold w-6 text-center ${medals[i] || "text-muted-foreground"}`}>
                {i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}
              </span>
              <div className="w-8 h-8 rounded-full bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-chart-1">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.count} cases · {c.timeSaved} min saved</p>
              </div>
              <Badge variant="secondary" className="text-xs font-semibold">
                {c.points} pts
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function UseCaseReview({ useCases }: { useCases: AiUseCase[] }) {
  const categoryColors: Record<string, string> = {
    "Automatización": "bg-blue-100 text-blue-700",
    "Análisis de datos": "bg-green-100 text-green-700",
    "Creación de contenido": "bg-purple-100 text-purple-700",
    "Investigación": "bg-amber-100 text-amber-700",
    "Comunicación": "bg-pink-100 text-pink-700",
    "Código": "bg-red-100 text-red-700",
    "Diseño": "bg-indigo-100 text-indigo-700",
    "Estrategia": "bg-teal-100 text-teal-700",
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-chart-1" />
        <h3 className="font-semibold">Recent Use Cases</h3>
        <Badge variant="secondary" className="ml-auto text-xs">{useCases.length} total</Badge>
      </div>
      {useCases.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No use cases submitted yet</p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {useCases.slice(0, 20).map((uc) => (
            <div key={uc.id} className="border rounded-lg p-3" data-testid={`admin-use-case-${uc.id}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">{uc.taskName || "Untitled"}</p>
                    {uc.taskCategory && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${categoryColors[uc.taskCategory] || "bg-gray-100 text-gray-700"}`}>
                        {uc.taskCategory}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">by {uc.userName || "Unknown"}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-green-600">{uc.timeSavedMinutes} min saved</span>
                    <span className="text-xs text-muted-foreground">{uc.timeInvestedMinutes} min invested</span>
                    <span className="text-xs text-amber-600 font-medium">Quality: {uc.qualityScore}/100</span>
                    <span className="text-xs font-semibold text-chart-1">+{uc.pointsAwarded} pts</span>
                  </div>
                </div>
                <Badge
                  variant={uc.status === "approved" ? "default" : "secondary"}
                  className="text-[10px] flex-shrink-0"
                >
                  {uc.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default function BenefitsPage() {
  const [showAddBenefit, setShowAddBenefit] = useState(false);
  const [benefitName, setBenefitName] = useState("");
  const [benefitDesc, setBenefitDesc] = useState("");
  const [benefitPoints, setBenefitPoints] = useState("");
  const [benefitType, setBenefitType] = useState("reward");
  const { toast } = useToast();

  const { data: useCases = [] } = useQuery<AiUseCase[]>({ queryKey: ["/api/ai-use-cases"] });
  const { data: benefitsList = [] } = useQuery<Benefit[]>({ queryKey: ["/api/benefits"] });

  const addBenefitMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/benefits", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/benefits"] });
      setBenefitName("");
      setBenefitDesc("");
      setBenefitPoints("");
      setShowAddBenefit(false);
      toast({ title: "Benefit created", description: "New benefit has been added to the catalog." });
    },
  });

  const totalTimeSaved = useCases.reduce((a, uc) => a + (uc.timeSavedMinutes || 0), 0);
  const totalContributions = useCases.length;
  const uniqueContributors = new Set(useCases.map(uc => uc.userId)).size;
  const avgQuality = useCases.length > 0
    ? Math.round(useCases.reduce((a, uc) => a + (uc.qualityScore || 0), 0) / useCases.length)
    : 0;

  return (
    <motion.div className="max-w-5xl mx-auto space-y-6" initial="hidden" animate="visible" variants={pageContainer}>
      <SEO title="Benefits - Admin - Genaia" description="Manage benefits, track top contributors, and reward AI adoption." />

      <motion.div variants={fadeUp}>
        <h1 className="text-display-xs font-bold" data-testid="text-benefits-title">Benefits & Recognition</h1>
        <p className="text-muted-foreground text-sm mt-1">Reward AI adoption and track organizational impact</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-chart-1" />
            <span className="text-xs text-muted-foreground">Contributors</span>
          </div>
          <p className="text-2xl font-bold" data-testid="text-unique-contributors">{uniqueContributors}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Use Cases</span>
          </div>
          <p className="text-2xl font-bold" data-testid="text-admin-total-cases">{totalContributions}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-muted-foreground">Time Saved</span>
          </div>
          <p className="text-2xl font-bold" data-testid="text-admin-time-saved">{Math.round(totalTimeSaved / 60)}h</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Avg Quality</span>
          </div>
          <p className="text-2xl font-bold" data-testid="text-avg-quality">{avgQuality}/100</p>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp}>
          <TopContributors useCases={useCases} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-chart-1" />
                <h3 className="font-semibold">Benefits Catalog</h3>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAddBenefit(!showAddBenefit)}
                data-testid="button-add-benefit"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </div>

            {showAddBenefit && (
              <div className="border rounded-lg p-4 mb-4 space-y-3">
                <Input
                  placeholder="Benefit name"
                  value={benefitName}
                  onChange={(e) => setBenefitName(e.target.value)}
                  data-testid="input-benefit-name"
                />
                <Textarea
                  placeholder="Description"
                  value={benefitDesc}
                  onChange={(e) => setBenefitDesc(e.target.value)}
                  className="resize-none min-h-[60px]"
                  data-testid="input-benefit-description"
                />
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="Points required"
                    value={benefitPoints}
                    onChange={(e) => setBenefitPoints(e.target.value)}
                    className="w-1/2"
                    data-testid="input-benefit-points"
                  />
                  <Select value={benefitType} onValueChange={setBenefitType}>
                    <SelectTrigger className="w-1/2" data-testid="select-benefit-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reward">Reward</SelectItem>
                      <SelectItem value="recognition">Recognition</SelectItem>
                      <SelectItem value="perk">Perk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full bg-chart-1 text-white border-chart-1"
                  onClick={() => addBenefitMutation.mutate({
                    name: benefitName,
                    description: benefitDesc,
                    pointsCost: parseInt(benefitPoints) || 0,
                    type: benefitType,
                    isActive: true,
                  })}
                  disabled={!benefitName || addBenefitMutation.isPending}
                  data-testid="button-save-benefit"
                >
                  {addBenefitMutation.isPending ? "Saving..." : "Save Benefit"}
                </Button>
              </div>
            )}

            {benefitsList.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No benefits configured yet</p>
            ) : (
              <div className="space-y-3">
                {benefitsList.map((b) => (
                  <div key={b.id} className="border rounded-lg p-3 flex items-center justify-between" data-testid={`benefit-${b.id}`}>
                    <div>
                      <p className="text-sm font-medium">{b.name}</p>
                      {b.description && <p className="text-xs text-muted-foreground mt-0.5">{b.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs capitalize">{b.type}</Badge>
                      <Badge className="text-xs bg-chart-1">{b.pointsCost} pts</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <UseCaseReview useCases={useCases} />
      </motion.div>
    </motion.div>
  );
}
