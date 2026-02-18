import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Zap, Target, BookOpen, ChevronRight, Sparkles, Brain, TrendingUp, Shield, Users, Rocket, BarChart3 } from "lucide-react";
import { SQRing } from "@/components/nq-ring";
import { SEO } from "@/components/seo";
import logoImg from "@assets/1_1771445946739.png";
import { useRef, useState, useEffect, useCallback } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const heroRevealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const wordDrop = {
  hidden: { opacity: 0, y: -50, rotateX: 45, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtleFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const metricReveal = {
  hidden: { opacity: 0, y: 25, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function WordByWord({ text, className, gradient }: { text: string; className?: string; gradient?: boolean }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordDrop}
          className="inline-block mr-[0.3em]"
          style={{ perspective: "600px" }}
        >
          {gradient ? (
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#5B21B6] bg-clip-text text-transparent">
              {word}
            </span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </span>
  );
}

const metrics = [
  { value: "73%", label: "Avg SQ improvement", sublabel: "in 90 days" },
  { value: "12h", label: "Hours recovered", sublabel: "per person / week" },
  { value: "4.8x", label: "ROI delivered", sublabel: "vs traditional L&D" },
  { value: "92%", label: "Engagement rate", sublabel: "vs 23% industry avg" },
];

const transformations = [
  {
    icon: Brain,
    before: "Employee",
    after: "Superagent",
    description: "AI handles the repetitive. You focus on what only you can do.",
    color: "#7C3AED",
  },
  {
    icon: TrendingUp,
    before: "15h/week writing",
    after: "2h + strategic vision",
    description: "A marketing manager reclaims 13 hours for strategy no competitor imagines.",
    color: "#A78BFA",
  },
  {
    icon: Sparkles,
    before: "Days building models",
    after: "Minutes + deep insights",
    description: "A financial analyst spots patterns that change the company's direction.",
    color: "#5B21B6",
  },
];

const pillars = [
  { verb: "DIAGNOSE", title: "Skills Map", description: "Gamified assessments reveal your AI readiness. Every person gets an SQ Score (0-100) across 6 skill domains.", icon: Target, gradient: "from-violet-500 to-purple-600" },
  { verb: "DEVELOP", title: "Training Engine", description: "Close gaps through Inverse Training: personalized courses, AI practice agents, role-specific playbooks. 5 min/day.", icon: BookOpen, gradient: "from-purple-500 to-violet-600" },
  { verb: "EMBED", title: "Catalyst Network", description: "Find champions by algorithm, build governance, track adoption. The infrastructure that makes AI adoption permanent.", icon: Zap, gradient: "from-violet-600 to-purple-700" },
];

const skillDomains = [
  { name: "Data Fluency", icon: BarChart3, score: 78, description: "Read what machines tell you" },
  { name: "Adaptive Mindset", icon: Sparkles, score: 65, description: "Embrace change, explore first" },
  { name: "Verification", icon: Shield, score: 82, description: "Know when to question AI" },
  { name: "Co-Intelligence", icon: Users, score: 58, description: "Design human-AI partnerships" },
  { name: "Autonomous Drive", icon: Rocket, score: 72, description: "Experiment without permission" },
  { name: "Reimagination", icon: Brain, score: 60, description: "See workflows that should exist" },
];

type IntroPhase = "line1" | "pause" | "line2" | "countdown" | "bang" | "white" | "done";

function BigBangIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>("line1");
  const [line1Text, setLine1Text] = useState("");
  const [line2Text, setLine2Text] = useState("");
  const [countdownNum, setCountdownNum] = useState<number | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const line1Full = "Headlines say this is the end of humanity...";
  const line2Full = "but we're just getting started.";

  useEffect(() => {
    const blinkInterval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (phase !== "line1") return;
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setLine1Text(line1Full.slice(0, i));
        if (i >= line1Full.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("pause"), 300);
        }
      }, 70);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(delay);
  }, [phase]);

  useEffect(() => {
    if (phase !== "pause") return;
    const timer = setTimeout(() => setPhase("line2"), 1800);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "line2") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLine2Text(line2Full.slice(0, i));
      if (i >= line2Full.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("countdown"), 1200);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "countdown") return;
    setCountdownNum(3);
    const t2 = setTimeout(() => setCountdownNum(2), 800);
    const t1 = setTimeout(() => setCountdownNum(1), 1600);
    const go = setTimeout(() => setPhase("bang"), 2400);
    return () => { clearTimeout(t2); clearTimeout(t1); clearTimeout(go); };
  }, [phase]);

  useEffect(() => {
    if (phase !== "bang") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ["#FFFFFF", "#FFFFFF", "#E8E0FF", "#C4B5FD", "#A78BFA", "#7C3AED", "#FBBF24"];
    for (let i = 0; i < 250; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 16;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 0.5 + Math.random() * 4,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let radius = 0;
    let glowAlpha = 0;
    let frame = 0;
    const maxFrames = 75;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      radius += (Math.max(canvas.width, canvas.height) * 1.2 - radius) * 0.08;
      glowAlpha = Math.min(1, frame / 12);

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grd.addColorStop(0, `rgba(255, 255, 255, ${glowAlpha})`);
      grd.addColorStop(0.25, `rgba(196, 181, 253, ${glowAlpha * 0.7})`);
      grd.addColorStop(0.5, `rgba(124, 58, 237, ${glowAlpha * 0.4})`);
      grd.addColorStop(1, `rgba(0, 0, 0, 0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.alpha = Math.max(0, p.alpha - 0.01);
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.5})`;
      }
      ctx.shadowBlur = 0;

      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        setPhase("white");
      }
    };
    requestAnimationFrame(animate);
  }, [phase]);

  useEffect(() => {
    if (phase !== "white") return;
    const timer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 600);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const showText = phase === "line1" || phase === "pause" || phase === "line2" || phase === "countdown";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: phase === "white" ? "#ffffff" : "#000000" }}
      animate={{ backgroundColor: phase === "white" ? "#ffffff" : "#000000" }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
      data-testid="intro-overlay"
    >
      {phase === "white" && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: phase === "bang" ? 1 : 0, transition: "opacity 0.3s" }}
      />

      {showText && (
        <motion.div
          className="z-10 flex flex-col items-center justify-center px-6 select-none"
          animate={{
            scale: phase === "countdown" ? 1 : 1,
            opacity: 1,
          }}
        >
          <motion.p
            className="text-2xl md:text-4xl lg:text-5xl font-light text-white/80 text-center tracking-tight leading-snug"
            animate={{
              opacity: phase === "countdown" ? 0.4 : 1,
              y: phase === "line2" || phase === "countdown" ? -10 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            {line1Text}
            {phase === "line1" && (
              <span
                className="inline-block w-[2px] h-[0.9em] bg-white/70 ml-1 align-text-bottom"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              />
            )}
          </motion.p>

          <AnimatePresence>
            {(phase === "line2" || phase === "countdown") && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-3xl lg:text-4xl font-bold text-white text-center mt-4 tracking-tight"
              >
                {line2Text}
                {phase === "line2" && (
                  <span
                    className="inline-block w-[2px] h-[0.85em] bg-white ml-1 align-text-bottom"
                    style={{ opacity: cursorVisible ? 1 : 0 }}
                  />
                )}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {phase === "countdown" && countdownNum !== null && (
              <motion.span
                key={countdownNum}
                initial={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl font-bold text-white mt-10 tabular-nums"
                style={{ textShadow: "0 0 40px rgba(124, 58, 237, 0.6), 0 0 80px rgba(167, 139, 250, 0.3)" }}
              >
                {countdownNum}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {phase === "bang" && (
        <motion.div
          className="z-10 flex flex-col items-center justify-center px-6"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        />
      )}
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO title="Génesis - AI Adoption Platform | Inverse Training" description="Transform your organization with Génesis. Measure AI readiness with our SQ Calculator, deliver gamified learning, and drive enterprise-wide AI adoption." ogTitle="Génesis - The AI Adoption Platform" />

      <AnimatePresence>
        {!introComplete && <BigBangIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
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
              <Button size="sm" className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-calculate-sq-nav">
                Calculate your SQ
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main>
        <section ref={heroRef} className="relative pt-28 pb-8 px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden" style={{ position: "relative" }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/5 blur-[120px]" />
            <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-[#A78BFA]/8 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#5B21B6]/3 blur-[150px]" />
          </div>

          <motion.div className="max-w-3xl mx-auto text-center relative z-10" style={{ opacity: heroOpacity, scale: heroScale }}>
            <motion.div
              initial="hidden"
              animate={introComplete ? "visible" : "hidden"}
              variants={heroRevealContainer}
            >
              <motion.p variants={subtleFadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-6">
                INVERSE TRAINING
              </motion.p>

              <motion.h1
                variants={heroRevealContainer}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 tracking-tight"
                style={{ perspective: "800px" }}
              >
                <WordByWord text="Humanity is just" />
                <br />
                <WordByWord text="getting started." gradient />
              </motion.h1>

              <motion.p variants={subtleFadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
                For decades, humans trained AI with their collective knowledge. Now AI trains us back — to unlock a version of ourselves we've never seen before.
              </motion.p>

              <motion.div variants={subtleFadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
                <Link href="/assessment">
                  <Button size="lg" className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-take-assessment-hero">
                    Take the SQ Assessment
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button size="lg" variant="outline" className="rounded-full" data-testid="button-calculate-sq-hero">
                    Quick Calculator
                  </Button>
                </Link>
                <a href="#manifesto" className="text-[#7C3AED] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all" data-testid="link-manifesto-hero">
                  Read the manifesto <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={introComplete ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 1.0 } } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {metrics.map((m) => (
                <motion.div key={m.label} variants={metricReveal} className="text-center p-4">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent">{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{m.label}</p>
                  <p className="text-[10px] text-muted-foreground/60">{m.sublabel}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="manifesto" className="py-24 px-6">
          <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
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

        <section className="py-24 px-6 bg-muted/30 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C3AED]/[0.02] to-transparent pointer-events-none" />
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-4">FROM EMPLOYEE TO SUPERAGENT</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                AI doesn't replace humans.
                <br />
                <span className="text-muted-foreground">It reveals what they're capable of.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {transformations.map((t, i) => (
                <motion.div key={t.before} variants={fadeUp}>
                  <Card className="p-6 h-full relative overflow-visible group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${t.color}15` }}>
                      <t.icon className="w-6 h-6" style={{ color: t.color }} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-muted-foreground line-through">{t.before}</span>
                      <ArrowRight className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                      <span className="text-sm font-semibold text-[#7C3AED]">{t.after}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="py-24 px-6 bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#5B21B6] relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[60px]" />
          </div>
          <motion.div className="max-w-5xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Inverse Training
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto">
                For decades, humans trained AI. Now AI trains humans to become superhuman.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              <Card className="p-8 bg-white/10 border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/50 uppercase mb-3">1950 - 2024</p>
                <h3 className="text-2xl font-bold text-white mb-2">Humans trained AI</h3>
                <p className="text-white/60 text-sm leading-relaxed">We poured our collective genius into machines.</p>
                <div className="mt-6 flex items-center gap-3 text-white/40">
                  <span className="text-xl font-semibold">Humans</span>
                  <ArrowRight className="w-5 h-5" />
                  <span className="text-xl font-semibold">AI</span>
                </div>
              </Card>
              <Card className="p-8 bg-white border-white/20 relative overflow-visible">
                <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-[10px] font-semibold tracking-wider uppercase">Now</div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7C3AED] uppercase mb-3">The Return</p>
                <h3 className="text-2xl font-bold text-[#5B21B6] mb-2">AI trains Humans</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Their intelligence unlocks our superhumanity.</p>
                <div className="mt-6 flex items-center gap-3 text-[#7C3AED]">
                  <span className="text-xl font-semibold">AI</span>
                  <ArrowRight className="w-5 h-5" />
                  <span className="text-xl font-semibold">Humans</span>
                </div>
              </Card>
            </motion.div>

            <motion.p variants={fadeUp} className="text-center text-white/60 max-w-xl mx-auto italic text-sm">
              The process through which AI trains humans to reach capabilities never possible before.
            </motion.p>
          </motion.div>
        </section>

        <section id="superagency" className="py-24 px-6">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-4">SQ - SUPERAGENCY QUOTIENT</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Measure. Develop. Transform.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Six skill domains that define your AI readiness — scored 0 to 100.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-center my-12">
              <div className="relative">
                <SQRing score={72} size={200} label="Expert" />
                <motion.div
                  className="absolute -top-2 -right-8 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                >
                  <span className="text-xs font-semibold text-green-600">+14 pts</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={staggerFast} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skillDomains.map((skill, i) => (
                <motion.div key={skill.name} variants={fadeUp}>
                  <Card className="p-5 h-full hover-elevate">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                        <skill.icon className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <span className="text-2xl font-bold text-[#7C3AED]">{skill.score}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                    <div className="mt-3 w-full bg-muted rounded-full h-1.5">
                      <motion.div
                        className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="product" className="py-24 px-6 bg-muted/30">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-4">THE PLATFORM</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Three engines.
                <br />
                <span className="text-muted-foreground">One transformation.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={fadeUp}>
                    <Card className="p-8 h-full relative overflow-visible hover-elevate">
                      <div className="absolute -top-4 left-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg shadow-violet-500/20`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="pt-8">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-[#7C3AED] uppercase mb-2">{p.verb}</p>
                        <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C3AED]/[0.02] to-transparent pointer-events-none" />
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-4">OUR BELIEF</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                Others automate humans out.
                <br />
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent">We elevate humans up.</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="p-6 text-center">
                <p className="text-3xl font-bold text-muted-foreground/40 mb-2">Automation</p>
                <p className="text-sm text-muted-foreground">Makes companies efficient</p>
              </Card>
              <Card className="p-6 text-center border-[#7C3AED]/30 bg-[#7C3AED]/5">
                <p className="text-3xl font-bold text-[#7C3AED] mb-2">Superagency</p>
                <p className="text-sm text-foreground font-medium">Makes companies extraordinary</p>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-24 px-6 bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#5B21B6] relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-white/5 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] rounded-full bg-white/5 blur-[40px]" />
          </div>
          <motion.div className="max-w-4xl mx-auto text-center relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                What's your SQ?
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
                Discover your Superagency Quotient. Free. 5 minutes. The first step to becoming superhuman.
              </p>
            </motion.div>
            <motion.div variants={fadeScale} className="flex justify-center mb-10">
              <SQRing score={47} size={160} label="Practitioner" />
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/calculator">
                <Button size="lg" className="rounded-full bg-white text-[#5B21B6] border-white font-semibold" data-testid="button-calculate-sq-cta">
                  Calculate your SQ <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section id="pricing" className="py-24 px-6">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-4">FOR LEADERS</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Built for CHROs and
                <br />
                transformation leaders.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="p-8 md:p-10 max-w-2xl mx-auto">
                <div className="space-y-4 mb-8">
                  {[
                    "SQ benchmarks by team, department, and role",
                    "Engagement metrics that beat traditional LMS",
                    "Champions identified by data, not politics",
                    "AI governance built in from day one",
                    "ROI dashboard with hours and dollars recovered",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-[#7C3AED]" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-8 text-center leading-relaxed">
                  Start with a 3-month pilot. 50-100 people. If SQ scores don't improve
                  and engagement doesn't beat every program you've tried, we'll know.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-book-demo">
                    Book a demo
                  </Button>
                  <Button variant="outline" className="rounded-full" data-testid="button-see-pricing">
                    See pricing
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        <footer className="py-20 px-6 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.p variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
                Humanity is just getting started.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground mb-8">
                The age of the human superagent begins now.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-10">
                <Link href="/calculator">
                  <Button className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-calculate-sq-footer">
                    Calculate your SQ
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-full" data-testid="button-book-demo-footer">Book a demo</Button>
              </motion.div>
              <motion.div variants={fadeUp}>
                <img src={logoImg} alt="Génesis" className="h-10 w-auto opacity-60 mx-auto" />
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}
