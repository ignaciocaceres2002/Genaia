import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/seo";
import logoImg from "@assets/image_1773976580990.png";

import { fadeUp, staggerSlow as staggerContainer } from "@/lib/motion-variants";

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Manifesto - Genaia" description="Humanity is just getting started. Our manifesto on Inverse Training and the future of human potential." />

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <img src={logoImg} alt="Genaia" className="h-12 w-auto" data-testid="link-logo-manifesto" />
          </Link>
          <Link href="/">
            <span className="text-sm text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-center">
            Humanity is just
            <br />
            <span className="bg-gradient-to-r from-chart-1 via-chart-3 to-chart-2 bg-clip-text text-transparent">getting started.</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every week, a new headline: AI will take your job. Entire departments replaced overnight. Companies building a future that doesn't need people.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The fear is real. But the conclusion is wrong.
            </p>
            <p className="text-foreground leading-relaxed font-medium text-lg">
              AI isn't the end of human relevance — it's the beginning of human potential.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-16">
            <div className="w-12 h-px bg-chart-1/30 mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              For seventy years, humanity poured everything it knew into machines. Every book, every scientific paper, every conversation, every image. We gave AI the sum of human knowledge.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              That process is over. The machines learned.
            </p>
            <p className="text-foreground leading-relaxed font-medium text-lg">
              Now the question is: what do the machines teach us back?
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-chart-1/5 to-chart-2/5 border border-chart-1/10">
            <p className="text-chart-1 font-semibold text-lg mb-6">We call it Inverse Training.</p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">1950–2024</span>
                <span className="text-sm text-muted-foreground">Humans trained AI.</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-chart-1 font-bold whitespace-nowrap">Now</span>
                <span className="text-sm font-semibold text-foreground">AI trains humans to become superhuman.</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Not artificial intelligence replacing native intelligence. Artificial intelligence <span className="text-foreground font-medium">activating</span> native intelligence.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-16">
            <div className="w-12 h-px bg-chart-1/30 mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              A superagent isn't someone who lets AI do their job. It's someone who does their job at a level that was previously impossible.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The marketing manager who reclaims 13 hours a week for strategy no competitor imagines. The financial analyst who spots patterns that change the company's direction. The HR leader who invests time in conversations that determine cultural fit instead of drowning in resumes.
            </p>
            <p className="text-foreground leading-relaxed font-medium text-lg">
              The human doesn't disappear. The human becomes more.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-16">
            <div className="w-12 h-px bg-chart-1/30 mb-8" />
            <p className="text-foreground leading-relaxed font-semibold text-xl mb-6">
              Everyone is building AI to replace people.
              <br />
              We're building AI that makes people irreplaceable.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The companies that win won't be the ones with the fewest humans. They'll be the ones with the most capable humans.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Automation makes companies efficient.
            </p>
            <p className="text-foreground leading-relaxed font-medium text-lg">
              Superagency makes companies extraordinary.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center pt-8 border-t border-border">
            <p className="text-lg font-medium text-foreground mb-8">
              We're Genaia. And we're just getting started.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/assessment">
                <Button size="lg" className="rounded-full bg-chart-1 text-white border-chart-1" data-testid="button-take-assessment-manifesto">
                  Take the SQ Assessment
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full" data-testid="button-join-us">
                Join us
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
