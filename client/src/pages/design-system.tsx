import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, CartesianGrid,
  LineChart, Line, Treemap,
} from "recharts";
import {
  Info, AlertTriangle, CheckCircle, XCircle,
  Zap, Star, Heart, Bell, Settings, User, Home, Search, Plus, Trash,
  Palette, Type, Layers, Box, Move, Component, Music, BarChart3, Grid3x3,
  RefreshCw, ChevronRight,
} from "lucide-react";
import { fadeUp, scaleIn, slideInLeft, staggerContainer, staggerFast, blurIn } from "@/lib/motion-variants";

const SECTIONS = [
  { id: "colors", label: "Colors", icon: Palette },
  { id: "gradients", label: "Gradients", icon: Layers },
  { id: "typography", label: "Typography", icon: Type },
  { id: "shadows", label: "Shadows", icon: Box },
  { id: "spacing", label: "Spacing & Radius", icon: Grid3x3 },
  { id: "components", label: "Components", icon: Component },
  { id: "motion", label: "Motion", icon: Move },
  { id: "charts", label: "Charts", icon: BarChart3 },
  { id: "icons", label: "Icons", icon: Star },
];

const CHART_1 = "hsl(var(--chart-1))";
const CHART_2 = "hsl(var(--chart-2))";
const CHART_3 = "hsl(var(--chart-3))";
const CHART_4 = "hsl(var(--chart-4))";
const CHART_5 = "hsl(var(--chart-5))";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "6px",
  fontSize: "12px",
  color: "hsl(var(--foreground))",
};

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-display-sm font-bold tracking-tight text-foreground">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

function Swatch({ name, value, textClass }: { name: string; value: string; textClass?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-14 rounded-lg border border-border/40 shadow-sm"
        style={{ background: value }}
      />
      <div>
        <p className="text-label-sm text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{value.length > 32 ? value.slice(0, 32) + "…" : value}</p>
      </div>
    </div>
  );
}

const COLOR_TOKENS = [
  { name: "background", value: "hsl(var(--background))" },
  { name: "foreground", value: "hsl(var(--foreground))" },
  { name: "card", value: "hsl(var(--card))" },
  { name: "primary", value: "hsl(var(--primary))" },
  { name: "primary-foreground", value: "hsl(var(--primary-foreground))" },
  { name: "secondary", value: "hsl(var(--secondary))" },
  { name: "muted", value: "hsl(var(--muted))" },
  { name: "muted-foreground", value: "hsl(var(--muted-foreground))" },
  { name: "accent", value: "hsl(var(--accent))" },
  { name: "border", value: "hsl(var(--border))" },
  { name: "ring", value: "hsl(var(--ring))" },
  { name: "destructive", value: "hsl(var(--destructive))" },
  { name: "chart-1", value: CHART_1 },
  { name: "chart-2", value: CHART_2 },
  { name: "chart-3", value: CHART_3 },
  { name: "chart-4", value: CHART_4 },
  { name: "chart-5", value: CHART_5 },
];

const GRADIENT_TOKENS = [
  { name: "gradient-brand", var: "var(--gradient-brand)", class: "gradient-brand" },
  { name: "gradient-violet-blue", var: "var(--gradient-violet-blue)", class: "gradient-violet-blue" },
  { name: "gradient-aurora", var: "var(--gradient-aurora)", class: "gradient-aurora" },
  { name: "gradient-mesh", var: "var(--gradient-mesh)", class: "gradient-mesh" },
  { name: "gradient-card-glow", var: "var(--gradient-card-glow)", class: "gradient-card-glow" },
  { name: "gradient-subtle", var: "var(--gradient-subtle)", class: "gradient-subtle" },
];

const TYPOGRAPHY_SCALE = [
  { class: "display-2xl", label: "Display 2XL", size: "72px", weight: "bold", leading: "1.1", tracking: "-0.025em" },
  { class: "display-xl", label: "Display XL", size: "60px", weight: "bold", leading: "1.1", tracking: "-0.025em" },
  { class: "display-lg", label: "Display LG", size: "48px", weight: "bold", leading: "1.25", tracking: "-0.015em" },
  { class: "display-md", label: "Display MD", size: "36px", weight: "semibold", leading: "1.25", tracking: "-0.015em" },
  { class: "display-sm", label: "Display SM", size: "30px", weight: "semibold", leading: "1.375", tracking: "0em" },
  { class: "display-xs", label: "Display XS", size: "24px", weight: "semibold", leading: "1.375", tracking: "0em" },
  { class: "text-xl", label: "Text XL", size: "20px", weight: "normal", leading: "1.5", tracking: "0em" },
  { class: "text-lg", label: "Text LG", size: "18px", weight: "normal", leading: "1.5", tracking: "0em" },
  { class: "text-base", label: "Text MD", size: "16px", weight: "normal", leading: "1.5", tracking: "0em" },
  { class: "text-sm", label: "Text SM", size: "14px", weight: "normal", leading: "1.5", tracking: "0em" },
  { class: "text-xs", label: "Text XS", size: "12px", weight: "normal", leading: "1.5", tracking: "0em" },
  { class: "label-lg", label: "Label LG", size: "14px", weight: "600", leading: "1.5", tracking: "0.025em" },
  { class: "label-md", label: "Label MD", size: "13px", weight: "600", leading: "1.5", tracking: "0.025em" },
  { class: "label-sm", label: "Label SM", size: "12px", weight: "600", leading: "1.5", tracking: "0.05em" },
  { class: "label-xs", label: "Label XS", size: "11px", weight: "700", leading: "1.5", tracking: "0.1em" },
];

const SHADOW_LEVELS = [
  { name: "shadow-2xs", class: "shadow-[var(--shadow-2xs)]", label: "2XS" },
  { name: "shadow-xs", class: "shadow-[var(--shadow-xs)]", label: "XS" },
  { name: "shadow-sm", class: "shadow-[var(--shadow-sm)]", label: "SM" },
  { name: "shadow", class: "shadow-[var(--shadow)]", label: "Base" },
  { name: "shadow-md", class: "shadow-[var(--shadow-md)]", label: "MD" },
  { name: "shadow-lg", class: "shadow-[var(--shadow-lg)]", label: "LG" },
  { name: "shadow-xl", class: "shadow-[var(--shadow-xl)]", label: "XL" },
  { name: "shadow-2xl", class: "shadow-[var(--shadow-2xl)]", label: "2XL" },
];

const SPACING_TOKENS = [
  { name: "spacing-0", value: "0px", px: 0 },
  { name: "spacing-1", value: "4px", px: 1 },
  { name: "spacing-2", value: "8px", px: 2 },
  { name: "spacing-3", value: "12px", px: 3 },
  { name: "spacing-4", value: "16px", px: 4 },
  { name: "spacing-6", value: "24px", px: 6 },
  { name: "spacing-8", value: "32px", px: 8 },
  { name: "spacing-12", value: "48px", px: 12 },
  { name: "spacing-16", value: "64px", px: 16 },
  { name: "spacing-24", value: "96px", px: 24 },
];

const RADIUS_TOKENS = [
  { name: "rounded-sm", label: "SM (3px)", class: "rounded-sm" },
  { name: "rounded-md", label: "MD (6px)", class: "rounded-md" },
  { name: "rounded-lg", label: "LG (9px)", class: "rounded-lg" },
  { name: "rounded-xl", label: "XL", class: "rounded-xl" },
  { name: "rounded-2xl", label: "2XL", class: "rounded-2xl" },
  { name: "rounded-full", label: "Full", class: "rounded-full" },
];

const ICONS_LIST = [
  Zap, Star, Heart, Bell, Settings, User, Home, Search, Plus, Trash,
  Info, AlertTriangle, CheckCircle, XCircle, ChevronRight, RefreshCw,
  Palette, Type, Layers, Box, Move, Component, Music, BarChart3, Grid3x3,
];

const radarData = [
  { skill: "Data", value: 78, bench: 55 },
  { skill: "Adaptive", value: 65, bench: 55 },
  { skill: "Verify", value: 82, bench: 55 },
  { skill: "Co-Intel", value: 58, bench: 55 },
  { skill: "Drive", value: 72, bench: 55 },
  { skill: "Systems", value: 60, bench: 55 },
];

const barData = [
  { name: "Engineering", value: 72 },
  { name: "Marketing", value: 58 },
  { name: "Finance", value: 51 },
  { name: "Product", value: 80 },
  { name: "Sales", value: 44 },
  { name: "Legal", value: 62 },
];

const lineData = [
  { week: "W1", score: 42 }, { week: "W2", score: 48 }, { week: "W3", score: 52 },
  { week: "W4", score: 55 }, { week: "W5", score: 60 }, { week: "W6", score: 64 },
  { week: "W7", score: 69 }, { week: "W8", score: 72 }, { week: "W9", score: 75 },
];

const treemapData = [
  { name: "Engineering", size: 45 },
  { name: "Marketing", size: 22 },
  { name: "Finance", size: 18 },
  { name: "Product", size: 15 },
  { name: "Sales", size: 30 },
  { name: "Legal", size: 10 },
  { name: "Ops", size: 12 },
];

const TREEMAP_COLORS = [CHART_1, CHART_2, CHART_3, CHART_4, CHART_5];

interface TreemapContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  index?: number;
}

const CustomTreemapContent = (props: TreemapContentProps) => {
  const { x = 0, y = 0, width = 0, height = 0, name, index = 0 } = props;
  if (width < 40 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={TREEMAP_COLORS[index % TREEMAP_COLORS.length]} rx={4} opacity={0.85} stroke="hsl(var(--background))" strokeWidth={2} />
      {width > 55 && height > 38 && (
        <text x={x + width / 2} y={y + height / 2 + 4} textAnchor="middle" fill="white" fontSize={11} fontWeight="600">{name}</text>
      )}
    </g>
  );
};

const MOTION_DEMOS = [
  {
    id: "fadeUp",
    label: "Fade Up",
    description: "Standard entrance — opacity + vertical translate",
    variants: fadeUp,
  },
  {
    id: "scaleIn",
    label: "Scale In",
    description: "Card/modal entrance — subtle scale + fade",
    variants: scaleIn,
  },
  {
    id: "slideIn",
    label: "Slide Left",
    description: "Directional entrance from the left",
    variants: slideInLeft,
  },
  {
    id: "blurIn",
    label: "Blur In",
    description: "Premium entrance — blur + fade + translate",
    variants: blurIn,
  },
];

function MotionDemoBox({ demo, replay }: { demo: typeof MOTION_DEMOS[0]; replay: number }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="label-sm text-foreground">{demo.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{demo.description}</p>
      </div>
      <div className="h-24 bg-muted/40 rounded-lg flex items-center justify-center overflow-hidden border border-border/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={replay}
            initial="hidden"
            animate="visible"
            variants={demo.variants}
            className="px-4 py-2 rounded-md gradient-brand text-white text-sm font-medium"
          >
            {demo.label}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StaggerDemo({ replay }: { replay: number }) {
  const items = ["Item One", "Item Two", "Item Three", "Item Four", "Item Five"];
  return (
    <div className="space-y-3">
      <div>
        <p className="label-sm text-foreground">Stagger Container</p>
        <p className="text-xs text-muted-foreground mt-0.5">Children animate in sequence</p>
      </div>
      <motion.div
        key={replay}
        initial="hidden"
        animate="visible"
        variants={staggerFast}
        className="space-y-2"
      >
        {items.map((item) => (
          <motion.div
            key={item}
            variants={fadeUp}
            className="px-3 py-2 rounded-md bg-primary/10 border border-primary/20 text-sm text-primary font-medium"
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [replayKey, setReplayKey] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const replayMotion = () => setReplayKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-1 overflow-x-auto">
          <span className="text-sm font-bold text-foreground mr-4 flex-shrink-0 text-gradient-brand">
            Design System
          </span>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              data-testid={`ds-nav-${s.id}`}
              className="flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-24 space-y-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-4"
        >
          <motion.div variants={fadeUp}>
            <p className="label-xs text-primary mb-2">Genaia — v1.0</p>
            <h1 className="display-lg font-bold text-foreground">Design System</h1>
            <p className="text-muted-foreground mt-2 max-w-xl">
              The single source of truth for Genaia's visual language — tokens, components, motion, and data visualization.
            </p>
          </motion.div>
        </motion.div>

        {/* COLORS */}
        <section
          ref={(el) => { sectionRefs.current["colors"] = el; }}
          id="colors"
          className="scroll-mt-20"
          data-testid="section-colors"
        >
          <SectionHeading title="Colors" subtitle="Semantic color tokens for light and dark mode" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {COLOR_TOKENS.map((t) => (
              <Swatch key={t.name} name={t.name} value={t.value} />
            ))}
          </div>
        </section>

        {/* GRADIENTS */}
        <section
          ref={(el) => { sectionRefs.current["gradients"] = el; }}
          id="gradients"
          className="scroll-mt-20"
          data-testid="section-gradients"
        >
          <SectionHeading title="Gradients" subtitle="Named brand gradients — use CSS variable or utility class" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {GRADIENT_TOKENS.map((g) => (
              <div key={g.name} className="space-y-3">
                <div
                  className={`h-24 rounded-xl border border-border/30 ${g.class}`}
                  data-testid={`gradient-swatch-${g.name}`}
                />
                <div>
                  <p className="label-sm text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{g.var}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-border/50 bg-card space-y-4">
            <p className="label-sm text-foreground">Text gradients</p>
            <div className="space-y-2">
              <p className="display-md font-bold text-gradient-brand">Brand Gradient Text</p>
              <p className="display-md font-bold text-gradient-violet-blue">Violet → Blue Text</p>
              <p className="display-md font-bold text-gradient-aurora">Aurora Gradient Text</p>
            </div>
          </div>
        </section>

        {/* TYPOGRAPHY */}
        <section
          ref={(el) => { sectionRefs.current["typography"] = el; }}
          id="typography"
          className="scroll-mt-20"
          data-testid="section-typography"
        >
          <SectionHeading title="Typography" subtitle="Full scale from Display 2XL to Label XS" />
          <div className="space-y-2">
            {TYPOGRAPHY_SCALE.map((t) => (
              <div key={t.class} className="flex items-baseline gap-6 py-3 border-b border-border/40">
                <div className="w-32 flex-shrink-0">
                  <p className="label-xs text-muted-foreground">{t.label}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`${t.class} font-bold text-foreground truncate block`}>
                    The quick brown fox
                  </span>
                </div>
                <div className="text-right text-xs text-muted-foreground font-mono hidden md:block w-52">
                  {t.size} / w{t.weight} / lh{t.leading} / ls{t.tracking}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SHADOWS */}
        <section
          ref={(el) => { sectionRefs.current["shadows"] = el; }}
          id="shadows"
          className="scroll-mt-20"
          data-testid="section-shadows"
        >
          <SectionHeading title="Shadows" subtitle="Six elevation levels for dark and light mode" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {SHADOW_LEVELS.map((s) => (
              <div key={s.name} className="space-y-3">
                <div
                  className={`h-20 rounded-xl bg-card border border-border/30 flex items-center justify-center ${s.class}`}
                >
                  <span className="label-sm text-muted-foreground">{s.label}</span>
                </div>
                <p className="label-xs text-muted-foreground">{s.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SPACING & RADIUS */}
        <section
          ref={(el) => { sectionRefs.current["spacing"] = el; }}
          id="spacing"
          className="scroll-mt-20"
          data-testid="section-spacing"
        >
          <SectionHeading title="Spacing & Radius" subtitle="Token reference grid" />
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="label-md text-foreground mb-4">Spacing Scale</p>
              <div className="space-y-3">
                {SPACING_TOKENS.map((s) => (
                  <div key={s.name} className="flex items-center gap-4">
                    <div
                      className="bg-primary/40 rounded-sm h-4 flex-shrink-0"
                      style={{ width: `${Math.max(4, s.px * 4)}px` }}
                    />
                    <span className="text-xs font-mono text-muted-foreground w-24">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="label-md text-foreground mb-4">Border Radius</p>
              <div className="grid grid-cols-3 gap-4">
                {RADIUS_TOKENS.map((r) => (
                  <div key={r.name} className="space-y-2">
                    <div className={`h-14 w-14 gradient-brand ${r.class}`} />
                    <p className="label-xs text-muted-foreground">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTS */}
        <section
          ref={(el) => { sectionRefs.current["components"] = el; }}
          id="components"
          className="scroll-mt-20"
          data-testid="section-components"
        >
          <SectionHeading title="Components" subtitle="Every shadcn primitive in all variants and states" />

          <div className="space-y-10">
            {/* Buttons */}
            <div>
              <p className="label-md text-foreground mb-4">Button</p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button data-testid="ds-btn-default">Default</Button>
                <Button variant="secondary" data-testid="ds-btn-secondary">Secondary</Button>
                <Button variant="outline" data-testid="ds-btn-outline">Outline</Button>
                <Button variant="ghost" data-testid="ds-btn-ghost">Ghost</Button>
                <Button variant="destructive" data-testid="ds-btn-destructive">Destructive</Button>
                <Button disabled data-testid="ds-btn-disabled">Disabled</Button>
                <Button size="sm" data-testid="ds-btn-sm">Small</Button>
                <Button size="lg" data-testid="ds-btn-lg">Large</Button>
                <Button size="icon" data-testid="ds-btn-icon"><Star className="w-4 h-4" /></Button>
                <Button className="gradient-brand border-0" data-testid="ds-btn-gradient">Gradient</Button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="label-md text-foreground mb-4">Badge</p>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge data-testid="ds-badge-default">Default</Badge>
                <Badge variant="secondary" data-testid="ds-badge-secondary">Secondary</Badge>
                <Badge variant="outline" data-testid="ds-badge-outline">Outline</Badge>
                <Badge variant="destructive" data-testid="ds-badge-destructive">Destructive</Badge>
                <Badge className="gradient-brand border-0 text-white" data-testid="ds-badge-gradient">Gradient</Badge>
              </div>
            </div>

            {/* Cards */}
            <div>
              <p className="label-md text-foreground mb-4">Card</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="p-5" data-testid="ds-card-default">
                  <p className="label-sm text-foreground mb-1">Default Card</p>
                  <p className="text-sm text-muted-foreground">Standard surface with border and background token.</p>
                </Card>
                <Card className="p-5 gradient-card-glow border-primary/20" data-testid="ds-card-glow">
                  <p className="label-sm text-foreground mb-1">Glow Card</p>
                  <p className="text-sm text-muted-foreground">Uses gradient-card-glow background token.</p>
                </Card>
                <Card className="p-5 hover-elevate cursor-pointer" data-testid="ds-card-elevate">
                  <p className="label-sm text-foreground mb-1">Hover-Elevate</p>
                  <p className="text-sm text-muted-foreground">Hover over this card to see elevation.</p>
                </Card>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <p className="label-md text-foreground mb-4">Input & Textarea</p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
                <Input placeholder="Text input" data-testid="ds-input-text" />
                <Input placeholder="Disabled" disabled data-testid="ds-input-disabled" />
                <div className="sm:col-span-2">
                  <Textarea placeholder="Textarea input..." data-testid="ds-textarea" />
                </div>
              </div>
            </div>

            {/* Select */}
            <div>
              <p className="label-md text-foreground mb-4">Select</p>
              <div className="max-w-xs">
                <Select>
                  <SelectTrigger data-testid="ds-select-trigger">
                    <SelectValue placeholder="Pick an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opt1">Option 1</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                    <SelectItem value="opt3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Checkbox & Switch */}
            <div>
              <p className="label-md text-foreground mb-4">Checkbox & Switch</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <Checkbox id="ds-cb-1" data-testid="ds-checkbox-unchecked" />
                  <label htmlFor="ds-cb-1" className="text-sm">Unchecked</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="ds-cb-2" defaultChecked data-testid="ds-checkbox-checked" />
                  <label htmlFor="ds-cb-2" className="text-sm">Checked</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch data-testid="ds-switch-off" />
                  <label className="text-sm">Switch off</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked data-testid="ds-switch-on" />
                  <label className="text-sm">Switch on</label>
                </div>
              </div>
            </div>

            {/* Slider & Progress */}
            <div>
              <p className="label-md text-foreground mb-4">Slider & Progress</p>
              <div className="max-w-md space-y-4">
                <Slider defaultValue={[65]} min={0} max={100} data-testid="ds-slider" />
                <Progress value={68} data-testid="ds-progress" />
              </div>
            </div>

            {/* Avatar */}
            <div>
              <p className="label-md text-foreground mb-4">Avatar</p>
              <div className="flex gap-4 items-center">
                <Avatar className="w-8 h-8" data-testid="ds-avatar-sm">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">SC</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10" data-testid="ds-avatar-md">
                  <AvatarFallback className="bg-chart-2 text-white text-sm">JD</AvatarFallback>
                </Avatar>
                <Avatar className="w-14 h-14" data-testid="ds-avatar-lg">
                  <AvatarFallback className="gradient-brand text-white text-base font-bold">GN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Alert */}
            <div>
              <p className="label-md text-foreground mb-4">Alert</p>
              <div className="space-y-3 max-w-lg">
                <Alert data-testid="ds-alert-default">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>This is an informational alert message.</AlertDescription>
                </Alert>
                <Alert variant="destructive" data-testid="ds-alert-destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Skeleton */}
            <div>
              <p className="label-md text-foreground mb-4">Skeleton</p>
              <div className="max-w-xs space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" data-testid="ds-skeleton-avatar" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" data-testid="ds-skeleton-line1" />
                    <Skeleton className="h-3 w-3/4" data-testid="ds-skeleton-line2" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full rounded-lg" data-testid="ds-skeleton-card" />
              </div>
            </div>

            {/* Tabs */}
            <div>
              <p className="label-md text-foreground mb-4">Tabs</p>
              <Tabs defaultValue="tab1" data-testid="ds-tabs">
                <TabsList>
                  <TabsTrigger value="tab1" data-testid="ds-tab-1">Overview</TabsTrigger>
                  <TabsTrigger value="tab2" data-testid="ds-tab-2">Analytics</TabsTrigger>
                  <TabsTrigger value="tab3" data-testid="ds-tab-3">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Overview tab content — displays summary information.</p>
                  </Card>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Analytics tab content — displays charts and metrics.</p>
                  </Card>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Settings tab content — configure preferences.</p>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Accordion */}
            <div>
              <p className="label-md text-foreground mb-4">Accordion</p>
              <Accordion type="single" collapsible className="max-w-md" data-testid="ds-accordion">
                <AccordionItem value="item-1">
                  <AccordionTrigger data-testid="ds-accordion-trigger-1">What is an SQ Score?</AccordionTrigger>
                  <AccordionContent>
                    The SQ (Superagency Quotient) Score measures an individual's AI readiness across 6 cognitive skill domains.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger data-testid="ds-accordion-trigger-2">How is the Agentic Score calculated?</AccordionTrigger>
                  <AccordionContent>
                    The Agentic Score combines SQ averages (25%), training completion (20%), tool adoption (20%), and more.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Tooltip */}
            <div>
              <p className="label-md text-foreground mb-4">Tooltip</p>
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" data-testid="ds-tooltip-trigger">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent data-testid="ds-tooltip-content">
                    This is a tooltip with helpful context
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Dialog */}
            <div>
              <p className="label-md text-foreground mb-4">Dialog</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" data-testid="ds-dialog-trigger">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent data-testid="ds-dialog-content">
                  <DialogHeader>
                    <DialogTitle>Design System Dialog</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">This dialog uses the card surface token and correct border radius.</p>
                </DialogContent>
              </Dialog>
            </div>

            {/* Table */}
            <div>
              <p className="label-md text-foreground mb-4">Table</p>
              <Card className="overflow-hidden" data-testid="ds-table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">SQ Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Sarah Chen", role: "Marketing", sq: 67 },
                      { name: "Marcus Johnson", role: "Engineering", sq: 78 },
                      { name: "Elena Vasquez", role: "Product", sq: 84 },
                    ].map((row) => (
                      <TableRow key={row.name} data-testid={`ds-table-row-${row.name.split(" ")[0].toLowerCase()}`}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell className="text-muted-foreground">{row.role}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{row.sq}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </section>

        {/* MOTION */}
        <section
          ref={(el) => { sectionRefs.current["motion"] = el; }}
          id="motion"
          className="scroll-mt-20"
          data-testid="section-motion"
        >
          <SectionHeading title="Motion" subtitle="Standard entrance animation patterns — import from motion-variants.ts" />

          <div className="mb-4 flex items-center gap-3">
            <Button onClick={replayMotion} variant="outline" size="sm" data-testid="button-replay-motion">
              <RefreshCw className="w-3.5 h-3.5 mr-2" /> Replay All
            </Button>
            <span className="text-xs text-muted-foreground">Click replay to restart all animations</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOTION_DEMOS.map((demo) => (
              <Card key={demo.id} className="p-4" data-testid={`ds-motion-${demo.id}`}>
                <MotionDemoBox demo={demo} replay={replayKey} />
              </Card>
            ))}
            <Card className="p-4" data-testid="ds-motion-stagger">
              <StaggerDemo replay={replayKey} />
            </Card>
          </div>

          <div className="mt-8 p-5 rounded-xl bg-muted/40 border border-border/50">
            <p className="label-sm text-foreground mb-3">Standard Constants</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm font-mono">
              <div className="space-y-1 text-muted-foreground">
                <p>DURATION.fast = 0.2s</p>
                <p>DURATION.normal = 0.4s</p>
                <p>DURATION.slow = 0.7s</p>
                <p>DURATION.slower = 1.0s</p>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <p>EASING.smooth = [0.22, 1, 0.36, 1]</p>
                <p>EASING.springy = [0.34, 1.56, 0.64, 1]</p>
                <p>EASING.easeOut = [0, 0, 0.2, 1]</p>
                <p>stagger: 0.05 / 0.08 / 0.15</p>
              </div>
            </div>
          </div>
        </section>

        {/* CHARTS */}
        <section
          ref={(el) => { sectionRefs.current["charts"] = el; }}
          id="charts"
          className="scroll-mt-20"
          data-testid="section-charts"
        >
          <SectionHeading title="Charts" subtitle="Recharts examples using chart-1 through chart-5 design tokens" />

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-5" data-testid="ds-chart-radar">
              <p className="label-sm text-foreground mb-4">RadarChart — Skill Map</p>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <Radar name="You" dataKey="value" stroke={CHART_1} fill={CHART_1} fillOpacity={0.18} strokeWidth={2} />
                    <Radar name="Bench" dataKey="bench" stroke={CHART_3} fill="none" strokeDasharray="4 4" strokeWidth={1.5} />
                    <RechartTooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5" data-testid="ds-chart-bar">
              <p className="label-sm text-foreground mb-4">BarChart — Team SQ</p>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
                    <RechartTooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" fill={CHART_1} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5" data-testid="ds-chart-line">
              <p className="label-sm text-foreground mb-4">LineChart — SQ Growth</p>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[30, 80]} />
                    <RechartTooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="score" stroke={CHART_1} strokeWidth={2.5} dot={{ fill: CHART_1, r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5" data-testid="ds-chart-treemap">
              <p className="label-sm text-foreground mb-4">Treemap — Org Heat Map</p>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap data={treemapData} dataKey="size" content={<CustomTreemapContent />} />
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {TREEMAP_COLORS.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c }} />
                    chart-{i + 1}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ICONS */}
        <section
          ref={(el) => { sectionRefs.current["icons"] = el; }}
          id="icons"
          className="scroll-mt-20"
          data-testid="section-icons"
        >
          <SectionHeading title="Icons" subtitle="Lucide icon grid at multiple sizes — using lucide-react" />
          <div className="space-y-6">
            {[16, 20, 24].map((size) => (
              <div key={size}>
                <p className="label-xs text-muted-foreground mb-3">{size}px</p>
                <div className="flex flex-wrap gap-4">
                  {ICONS_LIST.map((Icon, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 border border-border/40 hover:bg-accent transition-colors"
                      title={Icon.displayName || ""}
                      data-testid={`icon-${size}-${i}`}
                    >
                      <Icon style={{ width: size, height: size }} className="text-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
