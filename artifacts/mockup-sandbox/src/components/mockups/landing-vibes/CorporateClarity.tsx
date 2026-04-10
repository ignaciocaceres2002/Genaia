import React from "react";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Target, 
  BookOpen, 
  LayoutDashboard,
  Database,
  Brain,
  Search,
  Settings,
  Lightbulb,
  Workflow
} from "lucide-react";

export function CorporateClarity() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold font-['Playfair_Display']">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Genaia</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#platform" className="hover:text-slate-900 transition-colors">Platform</a>
            <a href="#sq" className="hover:text-slate-900 transition-colors">SQ Score</a>
            <a href="#process" className="hover:text-slate-900 transition-colors">Process</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex text-slate-600 hover:text-slate-900">Log In</Button>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-6">Book a Demo</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 opacity-50" />
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-medium text-slate-900 tracking-tight leading-[1.1] mb-8">
            Finally, the system that tells you <br className="hidden md:block" />
            <span className="text-teal-700 italic">who's ready for AI</span> — and what to do about it.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Measure AI readiness. Surface your champions. Close the gaps. Prove ROI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 h-14 px-8 text-base rounded-none">
              Start Your Free Assessment
            </Button>
            <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-none border-slate-300 text-slate-700 hover:bg-slate-50">
              Book a Demo
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-20 relative">
          <div className="aspect-[21/9] rounded-sm overflow-hidden border border-slate-200 bg-slate-50 shadow-sm relative">
            <img 
              src="/__mockup/images/corporate-hero.png" 
              alt="AI Readiness Data Visualization" 
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] rounded-sm pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Problem Stats Section */}
      <section className="py-24 px-6 border-b border-slate-200 bg-slate-50" id="platform">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="pt-8 md:pt-0 md:pr-8 flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-7xl lg:text-8xl font-['Playfair_Display'] text-slate-900 mb-4 block">90<span className="text-4xl text-teal-700">%</span></span>
              <p className="text-lg text-slate-600 font-medium">Of AI initiatives fail because of people, not technology.</p>
            </div>
            <div className="pt-8 md:pt-0 md:px-8 flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-7xl lg:text-8xl font-['Playfair_Display'] text-slate-900 mb-4 block">6<span className="text-4xl text-teal-700">×</span></span>
              <p className="text-lg text-slate-600 font-medium">Productivity gap between AI power users and the rest.</p>
            </div>
            <div className="pt-8 md:pt-0 md:pl-8 flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-7xl lg:text-8xl font-['Playfair_Display'] text-slate-900 mb-4 block">10<span className="text-4xl text-teal-700">%</span></span>
              <p className="text-lg text-slate-600 font-medium">Are real AI Champions — the other 90% are waiting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Engines Section */}
      <section className="py-24 px-6 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 md:flex justify-between items-end border-b border-slate-200 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-teal-700 uppercase mb-3">The Platform</h2>
              <h3 className="text-3xl md:text-4xl font-['Playfair_Display'] text-slate-900">Four engines to drive enterprise AI adoption.</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            <div className="bg-white p-12">
              <BarChart className="w-8 h-8 text-teal-700 mb-6" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Measure</h4>
              <p className="text-slate-600 leading-relaxed">Quantify readiness with the SQ Score (Superagency Quotient) per person, creating a clear baseline across your organization.</p>
            </div>
            <div className="bg-white p-12">
              <Target className="w-8 h-8 text-teal-700 mb-6" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Identify</h4>
              <p className="text-slate-600 leading-relaxed">Surface internal AI Champions automatically via our proprietary algorithm, finding the 10% who can lead the 90%.</p>
            </div>
            <div className="bg-white p-12">
              <BookOpen className="w-8 h-8 text-teal-700 mb-6" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Develop</h4>
              <p className="text-slate-600 leading-relaxed">Close the gap with personalized learning paths requiring just 5 minutes a day, delivered directly in the flow of work.</p>
            </div>
            <div className="bg-white p-12">
              <LayoutDashboard className="w-8 h-8 text-teal-700 mb-6" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Embed</h4>
              <p className="text-slate-600 leading-relaxed">Track progress on a real-time dashboard displaying SQ shifts, hours recovered, and active tool adoption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SQ Skills Section */}
      <section className="py-24 px-6 border-b border-slate-200 bg-slate-50" id="sq">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-teal-700 uppercase mb-3">The SQ Framework</h2>
            <h3 className="text-3xl md:text-4xl font-['Playfair_Display'] text-slate-900 mb-6">The 6 dimensions of an AI Superagent.</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our assessment evaluates individuals across the core competencies required to thrive alongside AI.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Database, name: "Data Fluency", desc: "Ability to structure inputs and interpret outputs." },
              { icon: Brain, name: "Adaptive Mindset", desc: "Willingness to unlearn and relearn workflows." },
              { icon: Search, name: "Verification Instinct", desc: "Critical evaluation of AI-generated content." },
              { icon: Workflow, name: "Orchestration", desc: "Managing multiple AI agents toward a single goal." },
              { icon: Lightbulb, name: "Proactive Experimentation", desc: "Continuously testing new AI capabilities." },
              { icon: Settings, name: "Systems Redesign", desc: "Reimagining processes for AI integration." }
            ].map((skill, i) => (
              <div key={i} className="bg-white border border-slate-200 p-8 rounded-none hover:border-teal-700 transition-colors group">
                <skill.icon className="w-6 h-6 text-slate-400 group-hover:text-teal-700 mb-4 transition-colors" strokeWidth={1.5} />
                <h4 className="text-lg font-bold text-slate-900 mb-2">{skill.name}</h4>
                <p className="text-sm text-slate-600">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 border-b border-slate-200" id="process">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-sm font-bold tracking-widest text-teal-700 uppercase mb-3">Deployment</h2>
              <h3 className="text-3xl font-['Playfair_Display'] text-slate-900 mb-4">From zero to <br/>measured ROI in 90 days.</h3>
              <p className="text-slate-600">A structured, predictable timeline for enterprise rollout.</p>
            </div>
            
            <div className="lg:col-span-2 relative">
              <div className="absolute top-0 bottom-0 left-[15px] md:left-[23px] w-px bg-slate-200"></div>
              
              <div className="space-y-12">
                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Week 1: Diagnose</h4>
                  <p className="text-slate-600">Deploy the baseline SQ assessment across the organization to map current readiness and identify initial champions.</p>
                </div>
                
                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-white border border-slate-300 rounded-full flex items-center justify-center shadow-sm z-10">
                    <span className="text-slate-600 text-xs font-bold">2</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Weeks 2-8: Activate</h4>
                  <p className="text-slate-600">Launch personalized 5-minute daily learning paths. Empower surfaced champions to lead departmental use cases.</p>
                </div>
                
                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-white border border-slate-300 rounded-full flex items-center justify-center shadow-sm z-10">
                    <span className="text-slate-600 text-xs font-bold">3</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Week 12: Measure</h4>
                  <p className="text-slate-600">Re-assess to quantify SQ growth, measure hours recovered, and calculate initial ROI from targeted interventions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-medium mb-8">Ready to measure your organization's AI readiness?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto bg-teal-600 text-white hover:bg-teal-700 h-14 px-8 text-base rounded-none border-0">
              Start Your Free Assessment
            </Button>
            <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-none border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-transparent">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="bg-slate-950 py-12 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-slate-900 font-bold font-['Playfair_Display'] text-xs">G</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Genaia</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Genaia Enterprise Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}