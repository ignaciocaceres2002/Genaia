import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, BarChart3, RefreshCw, ShieldCheck, Users, Rocket, Lightbulb, Zap, Target, BookOpen, ChevronRight } from "lucide-react";
import { NQRing } from "@/components/nq-ring";
import { SEO } from "@/components/seo";
import logoImg from "@assets/1_1771445946739.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const skillIcons: Record<string, any> = {
  "Data Fluency": BarChart3,
  "Adaptive Mindset": RefreshCw,
  "Verification Mindset": ShieldCheck,
  "Co-Intelligence": Users,
  "Autonomous Drive": Rocket,
  "Process Reimagination": Lightbulb,
};

const skills = [
  { name: "Data Fluency", description: "Can you read what the machine is telling you? Spot when it's wrong? Understand the difference between a confident prediction and a reliable one?" },
  { name: "Adaptive Mindset", description: "When your tools change, do you freeze or adapt? When a new AI capability appears, do you wait or explore? Learning agility is the meta-skill of the AI era." },
  { name: "Verification Mindset", description: "AI hallucinates with perfect confidence. The people who thrive aren't those who trust blindly — they're those who know exactly when and how to question." },
  { name: "Co-Intelligence", description: "Working with AI is a new collaboration skill. When do you delegate? Co-create? Override? The best human-AI partnerships are designed, not accidental." },
  { name: "Autonomous Drive", description: "The employees who transform first aren't waiting for permission. They're experimenting, building personal workflows, discovering tools on their own." },
  { name: "Process Reimagination", description: "The biggest gains don't come from speeding up old processes. They come from reimagining them entirely. Can you see the workflow that should exist?" },
];

const superagencyExamples = [
  { role: "Marketing Manager", before: "Used to spend 15h/week writing copy.", after: "Now spends 2 — and uses the other 13 for strategy no competitor has imagined." },
  { role: "Financial Analyst", before: "Used to spend days building models.", after: "Now builds them in minutes — and spots patterns that change the company's direction." },
  { role: "HR Leader", before: "Used to drown in screening resumes.", after: "Now reviews AI-curated shortlists — and invests time in conversations that determine cultural fit." },
];

const pillars = [
  { verb: "DIAGNOSE", title: "Skills Map", description: "Gamified assessments that reveal AI readiness through decisions, not surveys. Every person gets an NQ Score (0–100) across 6 skill domains.", icon: Target },
  { verb: "DEVELOP", title: "Training Engine", description: "Close gaps through Inverse Training: 8 personalized courses, AI practice agents, role-specific playbooks. 5 minutes a day. Gamified.", icon: BookOpen },
  { verb: "EMBED", title: "Catalyst Network", description: "Find champions by algorithm, build governance, track adoption. The infrastructure that makes AI adoption permanent.", icon: Zap },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Génesis - AI Adoption Platform | Inverse Training" description="Transform your organization with Génesis. Measure AI readiness with our NQ Calculator, deliver gamified learning, and drive enterprise-wide AI adoption." ogTitle="Génesis - The AI Adoption Platform" />
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <img src={logoImg} alt="Génesis" className="h-14 w-auto" data-testid="link-logo" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-product">Product</a>
            <a href="#manifesto" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-manifesto">Manifesto</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" data-testid="button-demo-user">Demo Usuario</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm" data-testid="button-demo-admin">Demo Admin</Button>
            </Link>
            <Link href="/calculator">
              <Button size="sm" className="rounded-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white no-default-hover-elevate" data-testid="button-calculate-nq-nav">
                Calculate your NQ
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="pt-32 pb-20 px-6">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-6">
              INVERSE TRAINING
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Humanity is just getting started.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              For decades, humans trained AI with their collective knowledge. Now AI trains us back — to unlock a version of ourselves we've never seen before.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/calculator">
                <Button className="rounded-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white px-8 no-default-hover-elevate" data-testid="button-calculate-nq-hero">
                  Calculate your NQ
                </Button>
              </Link>
              <a href="#manifesto" className="text-[#7C3AED] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all" data-testid="link-manifesto-hero">
                Read the manifesto <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <section id="manifesto" className="py-20 px-6">
          <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-foreground mb-6">
              The world is afraid.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
              Every week, a new headline: AI will take your job. Entire departments replaced overnight. Companies building a future that doesn't need people. The fear is real. But the conclusion is wrong. AI isn't the end of human relevance — it's the beginning of human potential. The problem? 70% of AI initiatives fail. Not because the tools don't work — because the humans using them were never trained to think, decide, and create alongside AI.
            </motion.p>
            <motion.h3 variants={fadeUp} className="text-2xl font-bold text-foreground">
              We believe the opposite.
            </motion.h3>
          </motion.div>
        </section>

        <section className="py-20 px-6 bg-muted/30">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-12">Inverse Training</motion.h2>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <motion.div variants={fadeUp}>
                <Card className="p-8 h-full bg-card">
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">1950 – 2024</p>
                  <h3 className="text-xl font-bold mb-3">Humans trained AI</h3>
                  <p className="text-muted-foreground leading-relaxed">We poured our collective genius into machines. Every book, dataset, conversation.</p>
                  <div className="mt-6 flex items-center gap-2 text-muted-foreground">
                    <span className="text-2xl">Humans</span>
                    <ArrowRight className="w-5 h-5" />
                    <span className="text-2xl">AI</span>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Card className="p-8 h-full bg-[#5B21B6] text-white border-[#5B21B6]">
                  <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70">Now</p>
                  <h3 className="text-xl font-bold mb-3">AI trains Humans</h3>
                  <p className="text-white/80 leading-relaxed">Their intelligence unlocks our superhumanity. The return begins.</p>
                  <div className="mt-6 flex items-center gap-2 text-white/80">
                    <span className="text-2xl">AI</span>
                    <ArrowRight className="w-5 h-5" />
                    <span className="text-2xl">Humans</span>
                  </div>
                </Card>
              </motion.div>
            </div>
            <motion.p variants={fadeUp} className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed">
              This is Inverse Training: the process through which AI trains humans to reach a level of capability that was never possible before.
            </motion.p>
          </motion.div>
        </section>

        <section className="py-20 px-6">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center mb-4">
              From employee to superagent.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              Superagency is what happens when a human learns to work with AI at the highest level. AI handles the repetitive, the mechanical — and the human focuses on what only humans can do.
            </motion.p>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
              {superagencyExamples.map((ex) => (
                <motion.div key={ex.role} variants={fadeUp}>
                  <Card className="p-6 h-full">
                    <p className="text-sm font-semibold text-[#7C3AED] mb-3">{ex.role}</p>
                    <p className="text-sm text-muted-foreground mb-2">{ex.before}</p>
                    <p className="text-sm font-medium text-foreground">{ex.after}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-center text-muted-foreground mt-10 italic">
              This is not automation. This is augmentation. The human doesn't disappear — the human becomes more.
            </motion.p>
          </motion.div>
        </section>

        <section id="product" className="py-20 px-6 bg-muted/30">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-12">What Génesis Does</motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={fadeUp}>
                    <Card className="p-6 h-full">
                      <div className="w-10 h-10 rounded-md bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <p className="text-xs font-semibold tracking-widest text-[#7C3AED] uppercase mb-1">{p.verb}</p>
                      <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section className="py-20 px-6">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-4">What NQ measures.</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-center mb-12">Six skill domains that define AI readiness.</motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((s) => {
                const Icon = skillIcons[s.name];
                return (
                  <motion.div key={s.name} variants={fadeUp}>
                    <Card className="p-6 h-full">
                      <div className="w-10 h-10 rounded-md bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <h3 className="font-semibold mb-2">{s.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section className="py-20 px-6 bg-muted/30">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-6">
              While others automate humans out, we elevate humans up.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4">
              There are companies building tools to eliminate human roles. That's one vision. It's not ours. The companies that win won't have the fewest humans — they'll have the most capable humans.
            </motion.p>
            <motion.p variants={fadeUp} className="font-medium text-foreground">
              Automation makes companies efficient. Superagency makes companies extraordinary.
            </motion.p>
          </motion.div>
        </section>

        <section className="py-24 px-6 bg-[#5B21B6]">
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-8">
              What's your NQ?
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <NQRing score={47} size={150} label="Practitioner" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/calculator">
                <Button className="rounded-full bg-white text-[#5B21B6] hover:bg-white/90 px-8 no-default-hover-elevate" data-testid="button-calculate-nq-cta">
                  Calculate now — free, 5 minutes
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section id="pricing" className="py-20 px-6">
          <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-4">
              For CHROs, VPs, and transformation leaders.
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8 space-y-3">
              {[
                "NQ benchmarks by team, department, and role",
                "Engagement metrics that beat traditional LMS",
                "Champions identified by data, not politics",
                "AI governance built in from day one",
                "ROI dashboard with hours and dollars recovered",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground mt-8 text-center leading-relaxed">
              A 3-month pilot. 50–100 people. If NQ scores don't improve and engagement doesn't beat every e-learning program you've tried, we'll know — and so will you.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="rounded-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white px-8 no-default-hover-elevate" data-testid="button-book-demo">
                Book a demo
              </Button>
              <Button variant="outline" className="rounded-full" data-testid="button-see-pricing">
                See pricing
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <footer className="py-16 px-6 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl font-bold text-foreground mb-6">Humanity is just getting started.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link href="/calculator">
                <Button className="rounded-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white no-default-hover-elevate" data-testid="button-calculate-nq-footer">
                  Calculate your NQ
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full" data-testid="button-book-demo-footer">Book a demo</Button>
            </div>
            <img src={logoImg} alt="Génesis" className="h-10 w-auto opacity-60 mx-auto" />
          </div>
        </footer>
      </main>
    </div>
  );
}
