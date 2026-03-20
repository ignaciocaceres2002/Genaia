import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  ArrowRight, Target, BookOpen, ChevronRight, Sparkles, Brain,
  TrendingUp, Shield, Users, Rocket, BarChart3, Zap, Eye,
  CheckCircle2, Bot, MessageSquare, FileText, AlertTriangle,
  Award, Gauge, Calendar, Lock, Check, Flame, Star,
  Clock, ArrowUpRight
} from "lucide-react";
import { SQRing } from "@/components/nq-ring";
import { SEO } from "@/components/seo";
import logoImg from "@assets/image_1773976580990.png";
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

const wordMaterialize = {
  hidden: { opacity: 0, scale: 0.6, filter: "blur(12px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtleMaterialize = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
  visible: {
    opacity: 1, filter: "blur(0px)", y: 0,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

const metricReveal = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function WordByWord({ text, className, gradient }: { text: string; className?: string; gradient?: boolean }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordMaterialize}
          className="inline-block mr-[0.3em]"
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

const problemMetrics = [
  { value: "90%", label: "of AI initiatives fail because of people, not technology" },
  { value: "6x", label: "productivity gap between AI power users and the rest" },
  { value: "~10%", label: "of employees are real AI Champions. The other 90% are waiting." },
];

const engines = [
  { num: "1", verb: "MEASURE", title: "Measure", description: "Every person gets an SQ Score (0\u2013100) across 6 cognitive skills. You see exactly where your org stands \u2014 by team, by role, by person.", icon: Target, gradient: "from-violet-500 to-purple-600" },
  { num: "2", verb: "IDENTIFY", title: "Identify", description: "The platform finds your AI Champions by algorithm: skill capability + engagement + influence. Not by politics, not by volunteering.", icon: Eye, gradient: "from-purple-500 to-violet-600" },
  { num: "3", verb: "DEVELOP", title: "Develop", description: "Personalized learning paths close the gaps. Micro-courses, AI practice agents, role-specific playbooks. 5 min/day.", icon: BookOpen, gradient: "from-violet-600 to-purple-700" },
  { num: "4", verb: "EMBED", title: "Embed", description: "Real-time dashboard tracks everything: SQ improvement, hours recovered, training completion, adoption rate. The numbers your board needs.", icon: BarChart3, gradient: "from-purple-600 to-violet-700" },
];

const employeeModules = [
  { icon: Gauge, title: "SQ Score & Skill Map", desc: "Your AI readiness across 6 skills. Track progress over time." },
  { icon: Zap, title: "Daily Challenges", desc: "5-minute scenarios targeting your weakest skill. Streaks and rewards." },
  { icon: BookOpen, title: "Learning Paths", desc: "8 courses mapped to SQ skills. Micro-modules, not lectures." },
  { icon: Bot, title: "AI Practice Agents", desc: "Conversational agents that simulate real work scenarios." },
  { icon: Sparkles, title: "Use Cases Library", desc: "Real AI applications by role. Submit, upvote, learn from peers." },
  { icon: FileText, title: "AI Tools Directory", desc: "Every AI tool your company uses, in one place, with policies." },
];

const leaderModules = [
  { icon: BarChart3, title: "Org Overview", desc: "Avg SQ, active users, training completion, hours recovered. One screen." },
  { icon: Target, title: "Team Heat Map", desc: "SQ scores by department. Spot where adoption works and where it doesn't." },
  { icon: Award, title: "Champion Finder", desc: "Algorithm-ranked candidates: SQ 40% + Engagement 30% + Influence 30%." },
  { icon: Users, title: "AI-First Recruiting", desc: "Evaluate candidates' AI readiness before you hire. SQ as a hiring signal." },
  { icon: Rocket, title: "AI Case Builder", desc: "Employees submit AI project ideas. The platform structures the business case." },
  { icon: Gauge, title: "Agentic Score", desc: "Your org's AI maturity: 0\u2013100. SQ + training + tools + governance + champions." },
  { icon: Shield, title: "Governance & Policies", desc: "AI policy library. Version control. Acknowledgment tracking. RAG-powered Q&A." },
  { icon: AlertTriangle, title: "Alerts", desc: "Inactivity, SQ decline, shadow AI, policy violations. Configurable." },
];

const skillDomains = [
  { name: "Data Fluency", icon: BarChart3, score: 78, description: "Read what machines tell you. Spot when they're wrong." },
  { name: "Adaptive Mindset", icon: Sparkles, score: 65, description: "When tools change, do you freeze or adapt?" },
  { name: "Verification Instinct", icon: Shield, score: 82, description: "AI is confident about everything. Even when it's wrong." },
  { name: "Orchestration", icon: Users, score: 58, description: "When to delegate to AI. When to override. When to co-create." },
  { name: "Proactive Experimentation", icon: Rocket, score: 72, description: "The people who transform first aren't waiting for permission." },
  { name: "Systems Redesign", icon: Brain, score: 60, description: "The biggest gains come from reimagining, not patching." },
];

const timelineSteps = [
  {
    week: "Week 1",
    title: "Diagnose",
    desc: "Every person takes the SQ Assessment. 10 minutes, zero friction. You get a full map of AI readiness across your org \u2014 by person, by team, by skill.",
    icon: Target,
  },
  {
    week: "Weeks 2\u20138",
    title: "Activate",
    desc: "Champions are activated. Training paths are assigned by gaps. People improve daily with micro-courses and AI practice agents. You watch it happen in real time on the dashboard.",
    icon: Zap,
  },
  {
    week: "Week 12",
    title: "Measure",
    desc: "SQ scores improved. Hours recovered measured. Adoption rate tracked. You have the data to present to leadership \u2014 and to decide what's next.",
    icon: TrendingUp,
  },
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
    const maxFrames = 110;

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
        p.alpha = Math.max(0, p.alpha - 0.007);
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
    }, 900);
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
          animate={{ scale: 1, opacity: 1 }}
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

const heroRotations = [
  { text: "measure who's ready.", key: "measure" },
  { text: "find who can lead the change.", key: "champions" },
  { text: "train what's missing.", key: "train" },
  { text: "prove it's working.", key: "prove" },
  { text: "build AI into every role.", key: "cases" },
  { text: "hire AI-ready talent.", key: "recruit" },
];

function MockupFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      <div
        className="rounded-xl border border-border/60 bg-background shadow-2xl shadow-violet-500/10 overflow-hidden"
        style={{ transform: "rotateY(-3deg) rotateX(2deg)" }}
      >
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border/40">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <div className="flex-1 mx-8">
            <div className="h-5 rounded-full bg-muted/80 max-w-[180px] mx-auto flex items-center justify-center">
              <span className="text-[9px] text-muted-foreground/50 font-medium">app.genaia.ai</span>
            </div>
          </div>
        </div>
        <div className="p-4 min-h-[320px] md:min-h-[380px]">{children}</div>
      </div>
    </div>
  );
}

function MockupSQResults() {
  const skills = [
    { name: "Data Fluency", score: 78 },
    { name: "Adaptive Mindset", score: 65 },
    { name: "Verification", score: 82 },
    { name: "Orchestration", score: 58 },
    { name: "Experimentation", score: 72 },
    { name: "Systems Redesign", score: 60 },
  ];
  const angles = skills.map((_, i) => (Math.PI * 2 * i) / skills.length - Math.PI / 2);
  const r = 65;
  const cx = 80;
  const cy = 80;
  const points = skills.map((s, i) => {
    const pct = s.score / 100;
    return `${cx + Math.cos(angles[i]) * r * pct},${cy + Math.sin(angles[i]) * r * pct}`;
  }).join(" ");
  const outerPoints = angles.map((a) => `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`).join(" ");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-[#7C3AED] uppercase">SQ Assessment Results</p>
          <p className="text-[9px] text-muted-foreground">Personal AI Readiness Profile</p>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[9px] font-semibold text-[#7C3AED]">Catalyst</div>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <polygon points={outerPoints} fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
            {[0.25, 0.5, 0.75].map((s) => (
              <polygon key={s} points={angles.map((a) => `${cx + Math.cos(a) * r * s},${cy + Math.sin(a) * r * s}`).join(" ")} fill="none" stroke="currentColor" className="text-border/50" strokeWidth="0.3" />
            ))}
            {angles.map((a, i) => (
              <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="currentColor" className="text-border/30" strokeWidth="0.3" />
            ))}
            <polygon points={points} fill="rgba(124, 58, 237, 0.15)" stroke="#7C3AED" strokeWidth="1.5" />
            {skills.map((s, i) => (
              <circle key={i} cx={cx + Math.cos(angles[i]) * r * (s.score / 100)} cy={cy + Math.sin(angles[i]) * r * (s.score / 100)} r="3" fill="#7C3AED" />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">67</span>
            <span className="text-[8px] text-muted-foreground font-medium">/ 100</span>
          </div>
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          {skills.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="text-[9px] text-muted-foreground w-[80px] truncate">{s.name}</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full" style={{ width: `${s.score}%` }} />
              </div>
              <span className="text-[9px] font-semibold text-foreground w-[22px] text-right">{s.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupChampions() {
  const candidates = [
    { name: "Elena Vasquez", role: "Product Lead", sq: 84, engagement: 96, influence: 88, rank: 1 },
    { name: "James Chen", role: "Engineering Mgr", sq: 79, engagement: 91, influence: 82, rank: 2 },
    { name: "Sofia Andersson", role: "Data Analyst", sq: 76, engagement: 88, influence: 74, rank: 3 },
    { name: "Marcus Williams", role: "Operations Dir", sq: 71, engagement: 85, influence: 79, rank: 4 },
  ];
  const colors = ["bg-[#7C3AED]", "bg-violet-400", "bg-violet-300", "bg-violet-200"];
  const initials = (n: string) => n.split(" ").map((w) => w[0]).join("");

  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] font-semibold tracking-wider text-[#7C3AED] uppercase">Champion Candidates</p>
        <p className="text-[9px] text-muted-foreground">Ranked by algorithm: SQ 40% + Engagement 30% + Influence 30%</p>
      </div>
      <div className="space-y-2">
        {candidates.map((c) => (
          <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/30">
            <div className={`w-8 h-8 rounded-full ${colors[c.rank - 1]} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
              {initials(c.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-foreground truncate">{c.name}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-semibold">#{c.rank}</span>
              </div>
              <p className="text-[9px] text-muted-foreground">{c.role}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-center">
                <p className="text-[9px] font-bold text-foreground">{c.sq}</p>
                <p className="text-[7px] text-muted-foreground">SQ</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-bold text-foreground">{c.engagement}%</p>
                <p className="text-[7px] text-muted-foreground">Eng</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-bold text-foreground">{c.influence}</p>
                <p className="text-[7px] text-muted-foreground">Inf</p>
              </div>
            </div>
            {c.rank === 1 && (
              <span className="px-2.5 py-1 rounded-full bg-[#7C3AED] text-white text-[9px] font-semibold flex-shrink-0" aria-hidden="true">Invite</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupLearning() {
  const modules = [
    { title: "What is Verification?", status: "done", xp: 25 },
    { title: "Spot the Hallucination", status: "done", xp: 30 },
    { title: "Source Cross-Check", status: "done", xp: 35 },
    { title: "Verify or Trust?", status: "current", xp: 40 },
    { title: "Chain of Evidence", status: "locked", xp: 45 },
    { title: "Final Challenge", status: "locked", xp: 50 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-foreground">Trust But Verify</p>
          <p className="text-[9px] text-muted-foreground">Verification Instinct · 6 modules</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10">
            <Flame className="w-3 h-3 text-orange-500" />
            <span className="text-[9px] font-bold text-orange-600">12-day streak</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-[#7C3AED]/10">
            <span className="text-[9px] font-bold text-[#7C3AED]">+150 XP</span>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        {modules.map((m, i) => (
          <div key={m.title} className={`flex items-center gap-3 p-2.5 rounded-lg border ${m.status === "current" ? "border-[#7C3AED]/40 bg-[#7C3AED]/5 shadow-sm shadow-violet-500/10" : "border-border/30 bg-muted/20"}`}>
            <div className="relative flex-shrink-0">
              {m.status === "done" ? (
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              ) : m.status === "current" ? (
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center ring-2 ring-[#7C3AED]/30 ring-offset-1">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="w-3 h-3 text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-medium ${m.status === "locked" ? "text-muted-foreground/50" : "text-foreground"}`}>{m.title}</p>
            </div>
            <span className={`text-[8px] font-semibold ${m.status === "locked" ? "text-muted-foreground/30" : "text-muted-foreground"}`}>{m.xp} XP</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-lg border border-dashed border-[#7C3AED]/30 bg-[#7C3AED]/[0.03]">
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-[#7C3AED]" />
          <div>
            <p className="text-[10px] font-semibold text-foreground">Daily Challenge</p>
            <p className="text-[9px] text-muted-foreground">Complete "Verify or Trust?" scenario — 5 min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupDashboard() {
  const kpis = [
    { label: "Org Avg SQ", value: "54", badge: "+3", up: true },
    { label: "Active Users", value: "91%", badge: null, up: true },
    { label: "Training Done", value: "68%", badge: "+12%", up: true },
    { label: "Hours Recovered", value: "1,420", badge: "this quarter", up: false },
  ];

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold tracking-wider text-[#7C3AED] uppercase">Organization Overview</p>
      <div className="grid grid-cols-4 gap-2">
        {kpis.map((k) => (
          <div key={k.label} className="p-2.5 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-[8px] text-muted-foreground mb-1">{k.label}</p>
            <div className="flex items-end gap-1">
              <span className="text-lg font-bold text-foreground leading-none">{k.value}</span>
              {k.badge && (
                <span className={`text-[8px] font-semibold ${k.up ? "text-green-600" : "text-muted-foreground"}`}>
                  {k.up && <TrendingUp className="w-2.5 h-2.5 inline mr-0.5" />}
                  {k.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
        <p className="text-[9px] font-semibold text-foreground mb-2">Engagement — Last 30 Days</p>
        <svg viewBox="0 0 280 80" className="w-full h-auto">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,65 Q20,60 40,55 T80,48 T120,42 T160,38 T200,30 T240,25 T280,18" fill="none" stroke="#7C3AED" strokeWidth="2" />
          <path d="M0,65 Q20,60 40,55 T80,48 T120,42 T160,38 T200,30 T240,25 T280,18 V80 H0 Z" fill="url(#chartGrad)" />
          {[0, 56, 112, 168, 224, 280].map((x, i) => (
            <text key={i} x={x} y="78" className="text-[7px] fill-muted-foreground">{["W1", "W2", "W3", "W4", "W5", "W6"][i]}</text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function MockupCaseBuilder() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold tracking-wider text-[#7C3AED] uppercase">AI Case Builder</p>
      <div className="p-3.5 rounded-lg border border-border/40 bg-background space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold text-foreground">Automate weekly client reporting</p>
            <p className="text-[9px] text-muted-foreground">María González · Sales</p>
          </div>
          <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Under Review</span>
        </div>
        <div className="flex items-center gap-4 pt-1 border-t border-border/20">
          <div>
            <p className="text-[8px] text-muted-foreground">Est. Impact</p>
            <p className="text-[10px] font-semibold text-green-600">6h/week recovered</p>
          </div>
          <div>
            <p className="text-[8px] text-muted-foreground">AI Tools</p>
            <p className="text-[10px] font-semibold text-foreground">Claude + Sheets</p>
          </div>
          <div>
            <p className="text-[8px] text-muted-foreground">Score</p>
            <p className="text-[10px] font-semibold text-[#7C3AED]">78/100</p>
          </div>
        </div>
      </div>
      <div className="p-3.5 rounded-lg border border-border/40 bg-background space-y-2 opacity-60">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold text-foreground">Customer onboarding chatbot</p>
            <p className="text-[9px] text-muted-foreground">Raj Patel · Customer Success</p>
          </div>
          <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Approved</span>
        </div>
        <div className="flex items-center gap-4 pt-1 border-t border-border/20">
          <div>
            <p className="text-[8px] text-muted-foreground">Est. Impact</p>
            <p className="text-[10px] font-semibold text-green-600">12h/week recovered</p>
          </div>
          <div>
            <p className="text-[8px] text-muted-foreground">AI Tools</p>
            <p className="text-[10px] font-semibold text-foreground">GPT-4 + Intercom</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupRecruiting() {
  const candidates = [
    { name: "Ana López", sq: 71, badge: "AI-Ready", badgeColor: "bg-green-100 text-green-700", scores: [80, 65, 75, 70, 68, 60] },
    { name: "Tom Fischer", sq: 43, badge: "Developing", badgeColor: "bg-amber-100 text-amber-700", scores: [45, 40, 50, 38, 42, 48] },
    { name: "Mei Zhang", sq: 62, badge: "Practitioner", badgeColor: "bg-blue-100 text-blue-700", scores: [70, 55, 65, 60, 58, 64] },
  ];
  const skillLabels = ["DF", "AM", "VI", "OR", "PE", "SR"];

  function MiniRadar({ scores, color }: { scores: number[]; color: string }) {
    const r = 18;
    const cx = 22;
    const cy = 22;
    const angles = scores.map((_, i) => (Math.PI * 2 * i) / scores.length - Math.PI / 2);
    const pts = scores.map((s, i) => `${cx + Math.cos(angles[i]) * r * (s / 100)},${cy + Math.sin(angles[i]) * r * (s / 100)}`).join(" ");
    return (
      <svg width="44" height="44" viewBox="0 0 44 44">
        <polygon points={angles.map((a) => `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`).join(" ")} fill="none" stroke="currentColor" className="text-border/50" strokeWidth="0.5" />
        <polygon points={pts} fill={color} stroke={color.replace("0.15", "0.6")} strokeWidth="1" />
      </svg>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] font-semibold tracking-wider text-[#7C3AED] uppercase">AI-First Recruiting</p>
        <p className="text-[9px] text-muted-foreground">Product Manager — 3 candidates assessed</p>
      </div>
      <div className="space-y-2">
        {candidates.map((c) => (
          <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/30">
            <MiniRadar scores={c.scores} color="rgba(124, 58, 237, 0.15)" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-foreground">{c.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-bold text-[#7C3AED]">SQ {c.sq}</span>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${c.badgeColor}`}>{c.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-1">
        {skillLabels.map((l) => (
          <span key={l} className="text-[7px] text-muted-foreground/60 font-medium">{l}</span>
        ))}
        <span className="text-[7px] text-muted-foreground/40 ml-auto">DF=Data Fluency · AM=Adaptive · VI=Verification · OR=Orchestration · PE=Experimentation · SR=Systems</span>
      </div>
    </div>
  );
}

const heroMockups: Record<string, () => JSX.Element> = {
  measure: MockupSQResults,
  champions: MockupChampions,
  train: MockupLearning,
  prove: MockupDashboard,
  cases: MockupCaseBuilder,
  recruit: MockupRecruiting,
};

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const [platformTab, setPlatformTab] = useState<"employees" | "leaders">("employees");
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroResumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (heroPaused) return;
    heroTimerRef.current = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroRotations.length);
    }, 4000);
    return () => { if (heroTimerRef.current) clearInterval(heroTimerRef.current); };
  }, [heroPaused]);

  useEffect(() => {
    return () => {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
      if (heroResumeRef.current) clearTimeout(heroResumeRef.current);
    };
  }, []);

  const handleDotClick = useCallback((i: number) => {
    setHeroIdx(i);
    setHeroPaused(true);
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    if (heroResumeRef.current) clearTimeout(heroResumeRef.current);
    heroResumeRef.current = setTimeout(() => setHeroPaused(false), 8000);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO title="Genaia - AI Adoption Platform | Inverse Training" description="One platform to measure, develop, and embed AI adoption across your entire organization. Genaia gives every person an AI readiness score." ogTitle="Genaia - The AI Adoption Platform" />

      <AnimatePresence>
        {!introComplete && <BigBangIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* NAV */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <img src={logoImg} alt="Genaia" className="h-12 w-auto" data-testid="link-logo" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-product">Platform</a>
            <a href="#sq" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-sq">SQ</a>
            <Link href="/manifesto">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-manifesto">Manifesto</span>
            </Link>
            <a href="#leaders" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-leaders">For Leaders</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" data-testid="button-demo-user">Demo User</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm" data-testid="button-demo-admin">Demo Admin</Button>
            </Link>
            <Link href="/assessment">
              <Button size="sm" className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-take-sq-nav">
                Take the SQ Assessment
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* SECTION 1 — HERO */}
        <section ref={heroRef} className="relative pt-24 md:pt-32 pb-12 px-6 min-h-[92vh] flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/5 blur-[120px]" />
            <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-[#A78BFA]/8 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#5B21B6]/3 blur-[150px]" />
          </div>

          <motion.div
            className="max-w-6xl mx-auto relative z-10 w-full"
            style={{ opacity: heroOpacity, scale: heroScale }}
            initial="hidden"
            animate={introComplete ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div variants={fadeUp}>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-6">
                  Your Human-First AI Adoption Platform
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-[1.1] mb-2 tracking-tight">
                  One platform to
                </h1>
                <div className="h-[2.6em] relative overflow-hidden mb-6" style={{ fontSize: "clamp(1.85rem, 3.5vw, 3rem)" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroRotations[heroIdx].key}
                      className="absolute left-0 top-0 font-bold bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#5B21B6] bg-clip-text text-transparent leading-[1.1] tracking-tight"
                      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {heroRotations[heroIdx].text}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                  Genaia manages your entire AI adoption — person by person, with data.
                </p>

                <div className="flex flex-wrap items-start gap-4 mb-8">
                  <div>
                    <Link href="/assessment">
                      <Button size="lg" className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-take-assessment-hero">
                        Take the SQ Assessment
                      </Button>
                    </Link>
                    <p className="text-[10px] text-muted-foreground mt-1.5 ml-1">Free · 5 minutes</p>
                  </div>
                  <Button size="lg" variant="outline" className="rounded-full" data-testid="button-book-demo-hero">
                    Book a demo
                  </Button>
                </div>

                <div className="flex items-center gap-2" role="tablist" aria-label="Hero sections">
                  {heroRotations.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      onClick={() => handleDotClick(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === heroIdx
                          ? "bg-[#7C3AED] w-6"
                          : "bg-[#7C3AED]/20 hover:bg-[#7C3AED]/40 w-2"
                      }`}
                      aria-label={`Show: ${heroRotations[i].text}`}
                      aria-selected={i === heroIdx}
                      data-testid={`dot-hero-${i}`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeScale} className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroRotations[heroIdx].key}
                    initial={{ opacity: 0, x: 40, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MockupFrame>
                      {(() => { const Comp = heroMockups[heroRotations[heroIdx].key]; return <Comp />; })()}
                    </MockupFrame>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2 — THE PROBLEM */}
        <section className="py-24 px-6">
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Companies invested in AI tools.
              <br />
              <span className="text-muted-foreground">Nobody prepared the people.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-8 mt-16 mb-12">
              {problemMetrics.map((m) => (
                <div key={m.value} className="text-center">
                  <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent mb-3">{m.value}</p>
                  <div className="w-12 h-px bg-[#7C3AED]/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">{m.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-lg font-medium text-foreground">
              Genaia closes the gap — with data, not guesswork.
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 3 — WHAT IS GENAIA */}
        <section className="py-24 px-6 bg-muted/30 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C3AED]/[0.02] to-transparent pointer-events-none" />
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                The complete system for AI adoption.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                From first diagnosis to sustained transformation. Four engines, one platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {engines.map((e) => (
                <motion.div key={e.verb} variants={fadeUp}>
                  <Card className="p-6 h-full relative overflow-visible">
                    <div className="absolute -top-4 left-6">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${e.gradient} flex items-center justify-center shadow-lg shadow-violet-500/20`}>
                        <e.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="pt-8">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-[#7C3AED] uppercase mb-2">{e.verb}</p>
                      <h3 className="text-lg font-bold mb-2">{e.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{e.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-10">
              <p className="text-xs text-muted-foreground italic">The AI Adoption Puzzle, with every piece.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 4 — PLATFORM INSIDE (Tabs) */}
        <section id="platform" className="py-24 px-6">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Built for every person in the organization.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-center mb-12">
              <div className="inline-flex rounded-full border border-border p-1 bg-background">
                <button
                  onClick={() => setPlatformTab("employees")}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    platformTab === "employees"
                      ? "bg-[#7C3AED] text-white shadow-lg shadow-violet-500/20"
                      : "text-muted-foreground"
                  }`}
                  data-testid="button-tab-employees"
                >
                  For <span className="line-through opacity-60">Employees</span> <span className="font-semibold ml-1">Superagents</span>
                </button>
                <button
                  onClick={() => setPlatformTab("leaders")}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    platformTab === "leaders"
                      ? "bg-[#7C3AED] text-white shadow-lg shadow-violet-500/20"
                      : "text-muted-foreground"
                  }`}
                  data-testid="button-tab-leaders"
                >
                  For Leaders
                </button>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {platformTab === "employees" && (
                <motion.div key="emp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-xl font-semibold text-center mb-2">Your AI readiness, gamified.</h3>
                  <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
                    A personal AI profile, daily challenges, and a clear path to improve.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {employeeModules.map((m) => (
                      <Card key={m.title} className="p-5 h-full">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-3">
                          <m.icon className="w-5 h-5 text-[#7C3AED]" />
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{m.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {platformTab === "leaders" && (
                <motion.div key="lead" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-xl font-semibold text-center mb-2">The control panel you never had.</h3>
                  <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
                    See who's ready, who's not, where to invest, and what's working.
                  </p>
                  <div className="grid md:grid-cols-4 gap-4">
                    {leaderModules.map((m) => (
                      <Card key={m.title} className="p-5 h-full">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-3">
                          <m.icon className="w-5 h-5 text-[#7C3AED]" />
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{m.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* SECTION 5 — SQ */}
        <section id="sq" className="py-24 px-6 bg-muted/30">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-4">SQ — SUPERAGENCY QUOTIENT</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                The score that measures AI readiness.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Not what tools you know. How you think, decide, and create when AI is everywhere. Scored 0 to 100.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-center my-12">
              <div className="relative">
                <SQRing score={72} size={200} label="Catalyst" />
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

            <motion.div variants={staggerFast} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {skillDomains.map((skill, i) => (
                <motion.div key={skill.name} variants={fadeUp}>
                  <Card className="p-5 h-full">
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

            <motion.div variants={fadeUp} className="mb-10">
              <div className="max-w-2xl mx-auto rounded-xl bg-background border border-border p-4">
                <div className="flex items-center gap-0 w-full">
                  {[
                    { range: "0\u201325", label: "Novice" },
                    { range: "26\u201350", label: "Practitioner" },
                    { range: "51\u201375", label: "Catalyst" },
                    { range: "76\u2013100", label: "Superagent" },
                  ].map((level, i) => (
                    <div
                      key={level.label}
                      className={`flex-1 text-center py-2 text-xs font-medium ${
                        i === 2 ? "bg-[#7C3AED]/10 text-[#7C3AED] rounded-lg" : "text-muted-foreground"
                      }`}
                    >
                      <p className="font-semibold">{level.label}</p>
                      <p className="text-[10px] opacity-60">{level.range}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <Link href="/assessment">
                <Button size="lg" className="rounded-full bg-[#7C3AED] text-white border-[#7C3AED]" data-testid="button-sq-cta">
                  What's your SQ? <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-2">Free, 5 minutes</p>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 6 — HOW IT WORKS (90-day timeline) */}
        <section className="py-24 px-6">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                From zero to measurable change in 90 days.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {timelineSteps.map((step, i) => (
                <motion.div key={step.week} variants={fadeUp}>
                  <Card className="p-6 h-full relative overflow-visible">
                    <div className="absolute -top-3 left-6">
                      <div className="px-3 py-1 rounded-full bg-[#7C3AED] text-white text-[10px] font-semibold tracking-wider uppercase shadow-lg shadow-violet-500/20">
                        {step.week}
                      </div>
                    </div>
                    <div className="pt-6">
                      <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                        <step.icon className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 7 — OUR THESIS */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C3AED]/[0.02] to-transparent pointer-events-none" />
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
                Others automate humans out.
                <br />
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent">We elevate humans up.</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Everyone is building AI to replace people. We're building AI that makes people irreplaceable.
                The companies that win won't be the ones with the fewest humans — they'll be the ones with the most capable ones.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/manifesto">
                <span className="text-[#7C3AED] text-sm font-medium flex items-center gap-1 justify-center hover:gap-2 transition-all cursor-pointer" data-testid="link-read-manifesto">
                  Read the full manifesto <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 8 — FOR LEADERS */}
        <section id="leaders" className="py-24 px-6 bg-muted/30">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED] mb-4">FOR LEADERS</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Built for CHROs and
                <br />
                transformation leaders.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                If you're responsible for AI adoption, you already know: buying tools isn't a strategy.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="p-8 md:p-10 max-w-2xl mx-auto">
                <div className="space-y-4 mb-8">
                  {[
                    "SQ benchmarks by team, department, and role",
                    "Champions identified by algorithm, not politics",
                    "Training that people actually complete",
                    "AI governance built in from day one",
                    "ROI dashboard with hours and dollars recovered",
                    "Agentic Score: your org's AI maturity in one number",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#7C3AED]" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-8 text-center leading-relaxed">
                  Start with a 3-month pilot. 50–100 people. We measure the before and after together.
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

        {/* SECTION 9 — FOOTER CTA */}
        <section className="py-24 px-6 bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#5B21B6] relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-white/5 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] rounded-full bg-white/5 blur-[40px]" />
          </div>
          <motion.div className="max-w-4xl mx-auto text-center relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
                Humanity is just getting started.
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/calculator">
                <Button size="lg" className="rounded-full bg-white text-[#5B21B6] border-white font-semibold" data-testid="button-calculate-sq-footer">
                  Calculate your SQ
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white" data-testid="button-book-demo-footer">
                Book a demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <img src={logoImg} alt="Genaia" className="h-10 w-auto opacity-60 mx-auto mb-4" />
            <p className="text-xs text-muted-foreground">We're Genaia. And we're just getting started.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
