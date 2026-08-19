import { useApp } from '@/store';
import { Sparkles, Users, Target, Calendar, Bot, ArrowRight, Search, Zap, ShieldCheck, Network } from 'lucide-react';
import { Logo } from '@/components/Layout';

export function Landing() {
  const { setView, user } = useApp();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-ink-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
          <Logo />
          <button onClick={() => setView('home')} className="btn-primary text-sm">
            Explore GMU Nexus <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 chip bg-white shadow-soft text-brand-700 mb-5 animate-fade-up">
              <Sparkles className="h-3.5 w-3.5" fill="currentColor" />
              AI-powered university ecosystem
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-ink-900 leading-[1.05] text-balance animate-fade-up" style={{ animationDelay: '60ms' }}>
              One University.<br />One Network.<br />
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Every Opportunity.</span>
            </h1>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-xl animate-fade-up" style={{ animationDelay: '120ms' }}>
              Connect with talented students across GMU, discover events and opportunities, build teams, and stay updated with everything happening across the university — powered by AI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '180ms' }}>
              <button onClick={() => setView('home')} className="btn-primary text-base px-6 py-3">
                Explore GMU Nexus <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => setView('opportunities')} className="btn-ghost text-base px-6 py-3">
                Discover Opportunities
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-ink-500 animate-fade-up" style={{ animationDelay: '240ms' }}>
              <ShieldCheck className="h-4 w-4 text-accent-500" />
              Signed in as demo student: <span className="font-semibold text-ink-700">{user.name}</span>
            </div>
          </div>

          {/* Floating preview cards */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
            {[
              { icon: Users, title: 'Student Connections', desc: 'Find people with the skills you need', color: 'bg-brand-50 text-brand-600' },
              { icon: Target, title: 'Opportunities', desc: 'Internships, scholarships & more', color: 'bg-accent-50 text-accent-600' },
              { icon: Calendar, title: 'Events', desc: 'Hackathons, fests & workshops', color: 'bg-warn-50 text-warn-600' },
              { icon: Bot, title: 'AI Matching', desc: 'Smart team & opportunity matches', color: 'bg-danger-50 text-danger-600' },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="card card-hover p-5">
                  <div className={`h-10 w-10 rounded-xl ${c.color} flex items-center justify-center mb-3`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-ink-900 text-sm">{c.title}</h3>
                  <p className="text-xs text-ink-500 mt-1">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900 text-balance">The entire university ecosystem, in one intelligent platform</h2>
          <p className="mt-3 text-ink-600">Students, opportunities, events and talented people already exist within GMU. Nexus brings them together — and AI connects the right students with the right people and opportunities.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Bot, title: 'AI Skill Matching & Team Builder', desc: 'Add your skills and let AI find students with complementary skills. Get a 94% team match in seconds.', color: 'from-brand-500 to-brand-700' },
            { icon: Search, title: 'Smart Information Search', desc: 'Search across students, events, opportunities, scholarships and posts — all in one place.', color: 'from-accent-500 to-accent-700' },
            { icon: Zap, title: 'Personalized Recommendations', desc: 'AI recommends events, opportunities and people based on your skills, interests and branch.', color: 'from-warn-500 to-warn-600' },
            { icon: Network, title: 'Inter-Branch Collaboration', desc: 'An ECE student needs AI help? AI recommends the right CSE students. Cross-branch matches, front and center.', color: 'from-danger-500 to-danger-600' },
            { icon: ShieldCheck, title: 'Verified Information System', desc: 'Official GMU, Branch Verified and Student Shared badges keep trusted info separate from student posts.', color: 'from-ink-600 to-ink-800' },
            { icon: Calendar, title: 'Never Miss a GMU Event', desc: 'Mallika, AI Hackathon, Robotics Workshop — every event, every branch, one hub with working registration.', color: 'from-brand-400 to-accent-500' },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card card-hover p-6">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-soft`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-ink-900">{f.title}</h3>
                <p className="text-sm text-ink-500 mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-8 sm:p-12 text-center shadow-lift">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-balance">Connect. Discover. Collaborate.</h2>
            <p className="mt-3 text-brand-100 max-w-xl mx-auto">Find your team. Discover opportunities. Never miss a GMU event.</p>
            <button onClick={() => setView('home')} className="mt-6 btn bg-white text-brand-700 hover:bg-brand-50 text-base px-6 py-3">
              Enter GMU Nexus <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-100 py-8">
        <div className="max-w-6xl mx-auto px-5 text-center text-sm text-ink-400">
          GMU Nexus — A hackathon prototype for GM University. Connect. Discover. Collaborate.
        </div>
      </footer>
    </div>
  );
}
