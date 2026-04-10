import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Brain,
  BarChart3,
  Users,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Activity,
  Lightbulb,
} from "lucide-react";

export function WarmHuman() {
  return (
    <div className="min-h-screen bg-[#faf8f5] font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 selection:bg-[#e8854a]/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md border-b border-orange-900/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#e8854a] rounded-2xl flex items-center justify-center rotate-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Genaia</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#platform" className="hover:text-[#e8854a] transition-colors">Platform</a>
            <a href="#skills" className="hover:text-[#e8854a] transition-colors">Skills</a>
            <a href="#timeline" className="hover:text-[#e8854a] transition-colors">Journey</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block font-medium text-slate-600 hover:text-[#e8854a] transition-colors">
              Log in
            </button>
            <button className="bg-[#e8854a] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#d67338] transition-all active:scale-95 shadow-lg shadow-[#e8854a]/20">
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-[#e8854a] font-medium text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Inverse Training Platform</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-slate-900">
              Turn your team into <span className="text-[#e8854a] relative inline-block">
                AI superstars.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span><br />
              Without the chaos.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Genaia finds who's ready, who can lead, and what to train — so you stop guessing and start growing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#e8854a] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#d67338] transition-all active:scale-95 shadow-xl shadow-[#e8854a]/20 flex items-center justify-center gap-2 group">
                Start Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-700 border-2 border-slate-100 px-8 py-4 rounded-full font-medium text-lg hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                See How It Works
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-rose-50 rounded-[3rem] transform rotate-3 scale-105" />
            <img 
              src="/__mockup/images/warmhuman-hero.png" 
              alt="People collaborating with AI" 
              className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl shadow-orange-900/10 object-cover aspect-[4/3]"
            />
            
            {/* Floating UI Elements */}
            <div className="absolute -left-8 top-12 z-20 bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Readiness Score</p>
                <p className="text-xl font-bold text-slate-800">85/100</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The real AI challenge isn't technology.</h2>
            <p className="text-xl text-slate-500">It's people. We help you focus on the human side of adoption.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100/50 hover:bg-orange-50 transition-colors">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#e8854a]" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">90%</h3>
              <p className="text-slate-600 leading-relaxed">Of AI initiatives fail because of people not technology.</p>
            </div>
            
            <div className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-rose-500" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">6×</h3>
              <p className="text-slate-600 leading-relaxed">Productivity gap between AI power users and the rest.</p>
            </div>
            
            <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">10%</h3>
              <p className="text-slate-600 leading-relaxed">Are real champions — the other 90% just need the right path.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Engines Section */}
      <section id="platform" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[#e8854a] font-bold tracking-wider uppercase text-sm mb-4 block">The Platform</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Four engines of human empowerment.</h2>
            <p className="text-xl text-slate-600 max-w-2xl">A complete system designed to gently guide your team into the future of work.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-6">
              <div className="w-16 h-16 bg-[#e8854a]/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-[#e8854a]" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Engine 01</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Measure</h3>
                <p className="text-slate-600 text-lg">See your team's strengths. Understand exactly where everyone stands on their AI journey in a safe, blameless way.</p>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-6 translate-y-0 md:translate-y-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Engine 02</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Identify</h3>
                <p className="text-slate-600 text-lg">Find your natural leaders. Discover the hidden AI champions within your ranks who can pull the rest of the team forward.</p>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Engine 03</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Develop</h3>
                <p className="text-slate-600 text-lg">Grow every day, 5 min at a time. Bite-sized, context-aware coaching that builds real skills without overwhelming your team.</p>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-6 translate-y-0 md:translate-y-8">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Engine 04</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Embed</h3>
                <p className="text-slate-600 text-lg">Watch the progress, in real time. Integrate learning directly into daily workflows so AI becomes a habit, not a chore.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SQ Skills Section */}
      <section id="skills" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/40 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Build the Superagency Quotient.</h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              We measure what matters. Technical skills expire, but these six fundamental capabilities create resilient, adaptable teams.
            </p>
            
            <div className="space-y-6">
              {[
                { name: "Data Fluency", val: 85, color: "bg-blue-400" },
                { name: "Adaptive Mindset", val: 92, color: "bg-[#e8854a]" },
                { name: "Verification Instinct", val: 78, color: "bg-rose-400" },
                { name: "Orchestration", val: 65, color: "bg-emerald-400" },
                { name: "Proactive Experimentation", val: 88, color: "bg-purple-400" },
                { name: "Systems Redesign", val: 70, color: "bg-amber-400" },
              ].map((skill, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-200">{skill.name}</span>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${skill.color} relative`}
                      style={{ width: `${skill.val}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center items-center h-[500px]">
             <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
             <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
             <div className="w-64 h-64 bg-gradient-to-br from-[#e8854a] to-rose-600 rounded-full blur-2xl opacity-40 absolute" />
             <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-center z-10 shadow-2xl">
               <div className="text-sm font-medium text-orange-400 mb-2 uppercase tracking-widest">Average SQ Score</div>
               <div className="text-8xl font-bold mb-4">76</div>
               <div className="text-slate-400">Ready to accelerate</div>
             </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 bg-orange-50/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">A clear path to transformation.</h2>
            <p className="text-xl text-slate-600">No messy implementations. Just a guided journey.</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200/50 md:-translate-x-1/2" />
            
            <div className="space-y-12">
              <div className="relative flex flex-col md:flex-row items-start md:justify-between group">
                <div className="md:w-[45%] md:text-right pl-20 md:pl-0 mb-4 md:mb-0 pt-2">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 text-[#e8854a] font-bold text-sm mb-4">
                    Week 1
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Discover</h3>
                  <p className="text-slate-600">Baseline assessments and identifying your natural champions.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-white border-4 border-orange-100 rounded-full flex items-center justify-center md:-translate-x-1/2 z-10 group-hover:border-[#e8854a] transition-colors shadow-lg shadow-orange-900/5">
                  <Target className="w-6 h-6 text-[#e8854a]" />
                </div>
                <div className="md:w-[45%]" />
              </div>
              
              <div className="relative flex flex-col md:flex-row-reverse items-start md:justify-between group">
                <div className="md:w-[45%] pl-20 md:pl-0 mb-4 md:mb-0 pt-2">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 font-bold text-sm mb-4">
                    Weeks 2-8
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Grow</h3>
                  <p className="text-slate-600">Targeted micro-learning and habit formation in daily workflows.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-white border-4 border-rose-100 rounded-full flex items-center justify-center md:-translate-x-1/2 z-10 group-hover:border-rose-400 transition-colors shadow-lg shadow-rose-900/5">
                  <TrendingUp className="w-6 h-6 text-rose-500" />
                </div>
                <div className="md:w-[45%]" />
              </div>
              
              <div className="relative flex flex-col md:flex-row items-start md:justify-between group">
                <div className="md:w-[45%] md:text-right pl-20 md:pl-0 mb-4 md:mb-0 pt-2">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mb-4">
                    Week 12
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Celebrate</h3>
                  <p className="text-slate-600">Measurable productivity gains and recognized AI leaders.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-white border-4 border-emerald-100 rounded-full flex items-center justify-center md:-translate-x-1/2 z-10 group-hover:border-emerald-400 transition-colors shadow-lg shadow-emerald-900/5">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="md:w-[45%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#e8854a] to-[#d67338] rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-[#e8854a]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to empower your people?</h2>
              <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
                Join the organizations building confident, capable, and creative AI-augmented teams.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#e8854a] px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all active:scale-95 shadow-xl">
                  Start Free Assessment
                </button>
                <button className="bg-black/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-black/20 transition-all backdrop-blur-sm">
                  See How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#e8854a] rounded-xl flex items-center justify-center rotate-3">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Genaia</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Genaia Inc. Empowering humans first.</p>
        </div>
      </footer>
    </div>
  );
}

// Missing icon fallback
const TrendingUp = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
