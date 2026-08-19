import { useState } from 'react';
import { useApp } from '@/store';
import { recommendStudents, recommendEvents, recommendOpportunities, answerQuery } from '@/ai';
import { Avatar, MatchBadge, VerifiedBadge, RegisterButton, SaveButton, Chip, SectionHeader } from '@/components/ui';
import { Sparkles, Send, ArrowRight, Calendar, MapPin, Target, Users, TrendingUp, Bot, Zap } from 'lucide-react';
import type { ChatMessage } from '@/types';

const SUGGESTED_PROMPTS = [
  'What events are happening this week?',
  'Find AI hackathons',
  'Find students who know React',
  'Show scholarships',
  'Find opportunities matching my skills',
  'What is happening in my branch?',
];

export function Home() {
  const { user, setView, registeredEvents, toggleRegister, savedItems, toggleSave, pushChat } = useApp();
  const [quickInput, setQuickInput] = useState('');

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const recStudents = recommendStudents(user, 3);
  const recEvents = recommendEvents(user, 4);
  const recOpps = recommendOpportunities(user, 3);

  const handleQuickAsk = (prompt?: string) => {
    const q = prompt || quickInput;
    if (!q.trim()) return;
    const res = answerQuery(q, user);
    const userMsg: ChatMessage = { id: `m${Date.now()}`, role: 'user', content: q };
    const aiMsg: ChatMessage = { id: `m${Date.now() + 1}`, role: 'assistant', content: res.content, cards: res.cards };
    pushChat(userMsg);
    pushChat(aiMsg);
    setQuickInput('');
    setView('assistant');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-20 lg:pb-6">
      {/* Greeting */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-3">
          <Avatar initials={user.initials} color={user.avatarColor} size="lg" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900">{greeting}, {user.name.split(' ')[0]} 👋</h1>
            <p className="text-ink-500 mt-0.5">Everything happening across GMU, in one place.</p>
          </div>
        </div>
      </div>

      {/* AI Quick Assistant */}
      <div className="relative overflow-hidden rounded-2xl gradient-brand p-5 sm:p-6 shadow-soft animate-fade-up" style={{ animationDelay: '60ms' }}>
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="relative">
          <div className="flex items-center gap-2 text-white mb-3">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AI Quick Assistant</h3>
              <p className="text-brand-100 text-xs">What are you looking for today?</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickAsk()}
              placeholder="Ask anything about GMU..."
              className="flex-1 rounded-xl border-0 bg-white/95 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:ring-4 focus:ring-white/30"
            />
            <button onClick={() => handleQuickAsk()} className="btn bg-white text-brand-700 hover:bg-brand-50 px-4">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {SUGGESTED_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => handleQuickAsk(p)}
                className="chip bg-white/15 text-white hover:bg-white/25 transition text-xs"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended for You */}
      <section className="animate-fade-up" style={{ animationDelay: '120ms' }}>
        <SectionHeader
          title="Recommended for You"
          subtitle="Personalized using your skills and interests"
          action={<button onClick={() => setView('opportunities')} className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></button>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recOpps.map(({ opportunity: o, score, reasons, warnings }) => (
            <div key={o.id} className="card card-hover p-5 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center">
                    <Target className="h-4 w-4 text-brand-600" />
                  </div>
                  <Chip color="brand">{o.type}</Chip>
                </div>
                <MatchBadge score={score} size="sm" />
              </div>
              <h3 className="font-bold text-ink-900 text-sm leading-snug">{o.title}</h3>
              <p className="text-xs text-ink-500 mt-1">{o.provider}</p>
              <div className="mt-3 space-y-1">
                {reasons.map((r) => (
                  <div key={r} className="flex items-start gap-1.5 text-xs text-accent-700">
                    <span className="text-accent-500 mt-0.5">✓</span> {r}
                  </div>
                ))}
                {warnings.map((w) => (
                  <div key={w} className="flex items-start gap-1.5 text-xs text-warn-600">
                    <span className="mt-0.5">⚠</span> {w}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-3 flex gap-2">
                <button onClick={() => setView('opportunities')} className="btn-primary text-xs flex-1">View Details</button>
                <SaveButton saved={savedItems.has(o.id)} onClick={() => toggleSave(o.id)} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today at GMU */}
      <section className="animate-fade-up" style={{ animationDelay: '180ms' }}>
        <SectionHeader
          title="Today at GMU"
          subtitle="Events matched to your profile"
          action={<button onClick={() => setView('events')} className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">All events <ArrowRight className="h-3.5 w-3.5" /></button>}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {recEvents.map(({ event: e, score }) => {
            const registered = registeredEvents.has(e.id);
            const saved = savedItems.has(e.id);
            return (
              <div key={e.id} className="card card-hover p-5">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-ink-50 flex items-center justify-center text-2xl shrink-0">{e.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-ink-900 text-sm leading-snug">{e.name}</h3>
                      <MatchBadge score={score} size="sm" />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-ink-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {e.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</span>
                    </div>
                    <div className="mt-1"><Chip color="brand">{e.category}</Chip></div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <RegisterButton registered={registered} onClick={() => toggleRegister(e.id)} />
                  <SaveButton saved={saved} onClick={() => toggleSave(e.id)} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Team Match Preview */}
      <section className="animate-fade-up" style={{ animationDelay: '240ms' }}>
        <SectionHeader
          title="AI Team Matches"
          subtitle="Students with complementary skills"
          action={<button onClick={() => setView('assistant')} className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">Team Builder <ArrowRight className="h-3.5 w-3.5" /></button>}
        />
        <div className="grid sm:grid-cols-3 gap-4">
          {recStudents.map(({ student: s, score, reasons }) => (
            <div key={s.id} className="card card-hover p-4">
              <div className="flex items-center gap-3">
                <Avatar initials={s.initials} color={s.avatarColor} size="md" />
                <div className="min-w-0">
                  <h3 className="font-bold text-ink-900 text-sm truncate">{s.name}</h3>
                  <p className="text-xs text-ink-500">{s.branchCode} · {s.year}</p>
                </div>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {s.skills.slice(0, 3).map((sk) => <Chip key={sk} color="brand">{sk}</Chip>)}
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <MatchBadge score={score} size="sm" />
                <button onClick={() => setView('connect')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: '300ms' }}>
        {[
          { icon: Users, label: 'Students', value: '5,240', color: 'text-brand-600 bg-brand-50' },
          { icon: Calendar, label: 'Active Events', value: '24', color: 'text-accent-600 bg-accent-50' },
          { icon: Target, label: 'Opportunities', value: '68', color: 'text-warn-600 bg-warn-50' },
          { icon: TrendingUp, label: 'Connections', value: '1,284', color: 'text-danger-600 bg-danger-50' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl ${s.color} flex items-center justify-center`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-ink-900">{s.value}</div>
                <div className="text-xs text-ink-500">{s.label}</div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
