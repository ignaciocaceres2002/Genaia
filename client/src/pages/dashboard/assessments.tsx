import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SKILLS } from "@shared/schema";
import { BarChart3, RefreshCw, ShieldCheck, Users, Rocket, Lightbulb, Clock } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const iconMap: Record<string, any> = {
  BarChart3, RefreshCw, ShieldCheck, Users, Rocket, Lightbulb,
};

const assessmentData = [
  { skillKey: "dataFluency", lastScore: 72, available: true, timeEstimate: "5-8 min" },
  { skillKey: "adaptiveMindset", lastScore: 65, available: true, timeEstimate: "5-8 min" },
  { skillKey: "verificationMindset", lastScore: 78, available: false, cooldown: "2 days", timeEstimate: "5-8 min" },
  { skillKey: "coIntelligence", lastScore: null, available: true, timeEstimate: "6-10 min" },
  { skillKey: "autonomousDrive", lastScore: 70, available: true, timeEstimate: "5-8 min" },
  { skillKey: "processReimagination", lastScore: null, available: true, timeEstimate: "6-10 min" },
];

export default function AssessmentsPage() {
  return (
    <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Assessments</h1>
        <p className="text-muted-foreground text-sm mt-1">Scenario-based evaluations across 6 skill domains</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessmentData.map((assessment) => {
          const skill = SKILLS.find((s) => s.key === assessment.skillKey);
          if (!skill) return null;
          const Icon = iconMap[skill.icon];

          return (
            <motion.div key={skill.key} variants={fadeUp}>
              <Card className="p-5 h-full flex flex-col" data-testid={`card-assessment-${skill.key}`}>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-md bg-[#7C3AED]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    <Clock className="w-3 h-3 mr-0.5" />{assessment.timeEstimate}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                {assessment.lastScore !== null ? (
                  <p className="text-xs text-muted-foreground mb-auto">Last score: <span className="font-semibold text-foreground">{assessment.lastScore}</span>/100</p>
                ) : (
                  <p className="text-xs text-muted-foreground mb-auto">Not yet taken</p>
                )}
                <div className="mt-4">
                  {assessment.available ? (
                    <Button size="sm" className="w-full rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid={`button-take-${skill.key}`}>
                      {assessment.lastScore !== null ? "Retake" : "Take Assessment"}
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" className="w-full rounded-full" disabled>
                      Available in {assessment.cooldown}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={fadeUp}>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">How Assessments Work</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Immersive Scenarios", desc: "Navigate real-world AI decisions through interactive narratives" },
              { step: "2", title: "8-12 Decisions", desc: "Each choice reveals your AI readiness in that skill domain" },
              { step: "3", title: "Instant Results", desc: "Get your score, strengths, gaps, and recommended next steps" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                  {item.step}
                </div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
