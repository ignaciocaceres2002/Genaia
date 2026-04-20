import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Brain, BarChart3 } from "lucide-react";
import { fadeUp, pageContainer } from "@/lib/motion-variants";
import { markOnboardingStarted, persistOnboardingProfile } from "@/lib/user-onboarding";
import { SEO } from "@/components/seo";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ASSESSMENT_ROLES, type AssessmentRole } from "@/lib/assessment-data";

const steps = [
  {
    icon: Sparkles,
    title: "Quick setup",
    desc: "Te presentamos cómo funciona Genaia y qué vas a desbloquear como colaborador.",
  },
  {
    icon: Brain,
    title: "Primer assessment",
    desc: "Tu primer SQ Assessment crea la línea base real de tu perfil, skills y potencial de crecimiento.",
  },
  {
    icon: BarChart3,
    title: "Tu dashboard inicial",
    desc: "Después del assessment vas a ver tu SQ, skill map y proyecciones personalizadas desde el día uno.",
  },
];

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<AssessmentRole | "">("");
  const [objective, setObjective] = useState("");

  const onboardingHref = useMemo(() => {
    const params = new URLSearchParams({
      mode: "onboarding",
      initial: "1",
    });
    if (role) params.set("role", role);
    if (objective.trim()) params.set("objective", objective.trim());
    if (name.trim()) params.set("name", name.trim());
    return `/assessment?${params.toString()}`;
  }, [name, role, objective]);

  const canContinue = name.trim().length >= 2 && !!role && objective.trim().length >= 8;

  return (
    <motion.div className="min-h-screen bg-background px-6 py-14" initial="hidden" animate="visible" variants={pageContainer}>
      <SEO title="User Onboarding - Genaia" description="Simulated onboarding flow for new collaborators before their first SQ assessment." />
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="secondary" className="text-xs mb-5">New collaborator flow</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Onboarding del colaborador
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Este recorrido simula el primer ingreso de un usuario. Al final harás tu primer assessment, y ese resultado va a definir los datos iniciales de tu SQ dentro de la plataforma.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
          <motion.div variants={fadeUp}>
            <Card className="p-7 h-full">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-chart-1 mb-6">What happens next</p>
              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-chart-1" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{index + 1}. {step.title}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="p-7 h-full bg-muted/30">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-chart-1 mb-5">Initial baseline</p>
              <h2 className="text-2xl font-bold tracking-tight mb-3">
                Tu primer assessment no es un test más.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Define tu SQ inicial, tu mapa de skills, las primeras analíticas desbloqueadas y la base sobre la que luego vas a ver tu proyección como colaborador.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "SQ inicial del colaborador",
                  "Skill map personalizado",
                  "Horas recuperables detectadas",
                  "Primeras proyecciones de mejora",
                ].map((item) => (
                  <div key={item} className="rounded-xl border bg-background p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Your name</p>
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ana Lopez"
                    data-testid="input-onboarding-name"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Your role area</p>
                  <Select value={role} onValueChange={(value) => setRole(value as AssessmentRole)}>
                    <SelectTrigger data-testid="select-onboarding-role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSESSMENT_ROLES.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">What do you want AI to help you unlock first?</p>
                  <Textarea
                    value={objective}
                    onChange={(event) => setObjective(event.target.value)}
                    placeholder="For example: spend less time on repetitive work and make better decisions faster."
                    className="min-h-[96px]"
                    data-testid="textarea-onboarding-objective"
                  />
                </div>
              </div>

              <Link href={canContinue ? onboardingHref : "#"}>
                <Button
                  size="lg"
                  className="w-full rounded-full bg-chart-1 text-white border-chart-1"
                  disabled={!canContinue}
                  onClick={() => {
                    if (!canContinue || !role) return;
                    markOnboardingStarted();
                    persistOnboardingProfile({
                      name: name.trim(),
                      role,
                      objective: objective.trim(),
                    });
                  }}
                  data-testid="button-start-onboarding-assessment"
                >
                  Empezar onboarding y primer assessment <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Demo guiada · luego te llevamos a tu dashboard con tu SQ inicial
              </p>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              Volver al sitio
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
