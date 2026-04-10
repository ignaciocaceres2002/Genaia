import React from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Activity, ChevronRight, BarChart2, Shield, Zap, Box, Brain, Database, Braces, Settings, Target } from "lucide-react";

export function DarkTechnical() {
  return (
    <div className="min-h-screen bg-[#050508] text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
             backgroundSize: '40px 40px' 
           }} 
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-cyan-400" />
              <span className="font-mono font-bold tracking-tight text-white">GENAIA<span className="text-cyan-400">_</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-slate-400">
              <a href="#platform" className="hover:text-cyan-400 transition-colors">Platform</a>
              <a href="#metrics" className="hover:text-cyan-400 transition-colors">Metrics</a>
              <a href="#engines" className="hover:text-cyan-400 transition-colors">Engines</a>
              <a href="#timeline" className="hover:text-cyan-400 transition-colors">Timeline</a>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 rounded-none h-9 px-4">
                Login
              </Button>
              <Button className="font-mono text-xs uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-400 hover:text-[#050508] rounded-none h-9 px-4 transition-all" style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)' }}>
                API Access
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-8">
                <Activity className="w-3 h-3" />
                <span>SYSTEM_STATUS: ONLINE</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
                The infrastructure layer for human AI readiness.
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                Measure. Rank. Train. Prove.
                <br className="mb-4" />
                <span className="text-slate-500 text-base">
                  SQ Score: a structured signal across 6 cognitive skills. Track it by person, team, role. Watch it move.
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="font-mono text-sm uppercase tracking-wider bg-cyan-500 text-[#050508] hover:bg-cyan-400 rounded-none h-12 px-8 transition-all" style={{ boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)' }}>
                  Start Assessment
                </Button>
                <Button variant="outline" className="font-mono text-sm uppercase tracking-wider border-white/20 text-white hover:bg-white/5 hover:text-white rounded-none h-12 px-8">
                  <Terminal className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>

            {/* Hero Visual / SQ Score */}
            <div className="relative border border-white/10 bg-[#0a0a0f] p-1">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50" />
              
              <div className="absolute top-4 right-4 z-20">
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-500 mb-1">GLOBAL_SQ_SCORE</div>
                  <div className="text-5xl font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">67</div>
                  <div className="text-[10px] font-mono text-cyan-500/70 mt-1">+2.4% THIS_WEEK</div>
                </div>
              </div>

              <div className="aspect-[4/3] relative overflow-hidden bg-[#050508]">
                <img 
                  src="/__mockup/images/darktech-hero.png" 
                  alt="Neural Network Visualization" 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                
                {/* Overlay code snippet */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-4 font-mono text-xs text-slate-400">
                  <div className="flex gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <span className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div><span className="text-cyan-400">import</span> {'{'} SQEngine {'}'} <span className="text-cyan-400">from</span> '@genaia/core';</div>
                  <div className="mt-2"><span className="text-blue-400">const</span> agent = <span className="text-cyan-400">new</span> SQEngine();</div>
                  <div><span className="text-blue-400">await</span> agent.<span className="text-yellow-200">initialize</span>();</div>
                  <div className="mt-2 text-green-400">{'>'} Processing human baseline... OK</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Terminal Style */}
        <section id="metrics" className="py-20 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0f] border border-white/10 p-6 relative group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-sm text-slate-500 mb-4 border-b border-white/5 pb-2">01_FAILURE_RATE</div>
              <div className="text-4xl font-mono text-white mb-2">90<span className="text-cyan-400">%</span></div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Of AI initiatives fail because of people, not technology infrastructure.
              </p>
            </div>
            
            <div className="bg-[#0a0a0f] border border-white/10 p-6 relative group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-sm text-slate-500 mb-4 border-b border-white/5 pb-2">02_DELTA</div>
              <div className="text-4xl font-mono text-white mb-2">6<span className="text-cyan-400">×</span></div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Productivity gap between organizations with high vs low SQ Scores.
              </p>
            </div>
            
            <div className="bg-[#0a0a0f] border border-white/10 p-6 relative group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-sm text-slate-500 mb-4 border-b border-white/5 pb-2">03_ADOPTION</div>
              <div className="text-4xl font-mono text-white mb-2">~10<span className="text-cyan-400">%</span></div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Are actual AI Champions. The rest require structured inverse training.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Engines */}
        <section id="engines" className="py-24 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Platform Architecture</h2>
            <p className="text-slate-400 font-mono text-sm uppercase">Core operational engines</p>
          </div>

          <div className="grid md:grid-cols-4 gap-0 border border-white/10 bg-[#0a0a0f]">
            {[
              { id: '01', title: 'MEASURE', icon: BarChart2, desc: 'Capture baseline SQ across all teams via structured telemetry.' },
              { id: '02', title: 'IDENTIFY', icon: Target, desc: 'Isolate champions and pinpoint exact skill deficits.' },
              { id: '03', title: 'DEVELOP', icon: Zap, desc: 'Deploy targeted inverse training modules based on deficits.' },
              { id: '04', title: 'EMBED', icon: Settings, desc: 'Integrate new capabilities into daily operational workflows.' }
            ].map((engine, idx) => (
              <div key={engine.id} className="p-8 border-r border-b border-white/10 last:border-r-0 relative group">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 bg-[#050508] border border-white/10 flex items-center justify-center text-cyan-400">
                    <engine.icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-slate-600">[{engine.id}]</span>
                </div>
                <h3 className="font-mono text-lg text-white font-bold mb-3">{engine.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{engine.desc}</p>
                
                {idx < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600 z-10 bg-[#0a0a0f]">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SQ Skills Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-6">Cognitive Skills Matrix</h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                The Superagency Quotient evaluates human readiness across 6 foundational vectors. Real-time metrics dictate training pathways.
              </p>
              <Button variant="outline" className="font-mono text-xs uppercase tracking-wider border-white/20 text-white hover:bg-white/5 hover:text-white rounded-none w-full justify-between">
                Export Matrix Data
                <Braces className="w-4 h-4 text-cyan-400" />
              </Button>
            </div>
            
            <div className="md:w-2/3 grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {[
                { name: 'Data Fluency', val: 78, max: 100, icon: Database },
                { name: 'Adaptive Mindset', val: 62, max: 100, icon: Brain },
                { name: 'Verification Instinct', val: 85, max: 100, icon: Shield },
                { name: 'Orchestration', val: 54, max: 100, icon: Box },
                { name: 'Proactive Experimentation', val: 71, max: 100, icon: Zap },
                { name: 'Systems Redesign', val: 49, max: 100, icon: Settings },
              ].map((skill, i) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                    </div>
                    <span className="font-mono text-cyan-400 text-sm">{skill.val} / {skill.max}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_10px_rgba(0,212,255,0.5)]" 
                      style={{ width: `${(skill.val / skill.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-24 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Implementation Protocol</h2>
            <p className="text-slate-400 font-mono text-sm uppercase">Standard deployment timeline</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden md:block" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { phase: 'Phase 1', duration: 'Week 1', title: 'DIAGNOSE', desc: 'Deploy initial assessments. Establish baseline organizational SQ Score.' },
                { phase: 'Phase 2', duration: 'Weeks 2-8', title: 'ACTIVATE', desc: 'Initialize inverse training engines. Targeted skill development.' },
                { phase: 'Phase 3', duration: 'Week 12+', title: 'MEASURE', desc: 'Quantify delta. Prove ROI and establish continuous monitoring.' }
              ].map((step, i) => (
                <div key={step.phase} className="relative bg-[#0a0a0f] border border-white/10 p-8 pt-10">
                  <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#050508] border border-cyan-500/50 text-cyan-400 font-mono text-xs px-3 py-1 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                    {step.duration}
                  </div>
                  <div className="font-mono text-slate-500 text-xs mb-4">{step.phase}</div>
                  <h4 className="text-white font-bold mb-3">{step.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to deploy?
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Initialize your organization's AI readiness infrastructure today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="font-mono text-sm uppercase tracking-wider bg-cyan-500 text-[#050508] hover:bg-cyan-400 rounded-none h-14 px-10 transition-all" style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}>
              Start Assessment
            </Button>
            <Button variant="outline" className="font-mono text-sm uppercase tracking-wider border-white/20 text-white hover:bg-white/5 hover:text-white rounded-none h-14 px-10">
              Request API Access
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-6 text-center">
          <div className="font-mono text-xs text-slate-600">
            &copy; {new Date().getFullYear()} GENAIA SYSTEMS. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </div>
    </div>
  );
}
