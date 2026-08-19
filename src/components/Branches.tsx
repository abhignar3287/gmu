import { useState } from 'react';
import { useApp } from '@/store';
import { BRANCHES, EVENTS, POSTS, STUDENTS } from '@/data';
import { matchScoreForStudent } from '@/ai';
import type { Branch } from '@/types';
import { Avatar, MatchBadge, VerifiedBadge, Chip, SectionHeader, EmptyState } from '@/components/ui';
import { Cpu, CircuitBoard, Cog, Building2, Briefcase, LineChart, Ruler, Atom, Calendar, MapPin, Users, ArrowRight, Sparkles, Megaphone } from 'lucide-react';

const ICONS: Record<string, typeof Cpu> = {
  Cpu, CircuitBoard, Cog, Building2, Briefcase, LineChart, Ruler, Atom,
};

export function Branches() {
  const { user, setView, connections, toggleConnection } = useApp();
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [tab, setTab] = useState<'my' | 'all'>('my');

  if (selectedBranch) {
    const branchEvents = EVENTS.filter((e) => e.branchCode === selectedBranch.code || e.branchCode === 'ALL');
    const branchPosts = POSTS.filter((p) => p.authorBranch === selectedBranch.code);
    const branchStudents = STUDENTS.filter((s) => s.branchCode === selectedBranch.code);
    const Icon = ICONS[selectedBranch.icon] || Cpu;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
        <button onClick={() => setSelectedBranch(null)} className="text-sm text-brand-600 font-semibold mb-4 flex items-center gap-1">
          ← All Branches
        </button>

        {/* Branch header */}
        <div className="card p-6 mb-5 animate-fade-up" style={{ background: `linear-gradient(135deg, ${selectedBranch.color}10, white)` }}>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${selectedBranch.color}15`, color: selectedBranch.color }}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-ink-900">{selectedBranch.code} Branch</h1>
              <p className="text-sm text-ink-500">{selectedBranch.name}</p>
              <p className="text-xs text-ink-400 mt-0.5">{selectedBranch.description}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div><span className="font-bold text-ink-900">{branchStudents.length}</span> <span className="text-ink-500">students</span></div>
            <div><span className="font-bold text-ink-900">{branchEvents.length}</span> <span className="text-ink-500">events</span></div>
            <div><span className="font-bold text-ink-900">{branchPosts.length}</span> <span className="text-ink-500">posts</span></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          <button onClick={() => setTab('my')} className={`chip ${tab === 'my' ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200'}`}>My Branch</button>
          <button onClick={() => setTab('all')} className={`chip ${tab === 'all' ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200'}`}>All GMU</button>
        </div>

        {/* Inter-branch collaboration highlight */}
        <div className="card p-5 mb-5 border-l-4" style={{ borderLeftColor: selectedBranch.color }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-brand-600" />
            <h3 className="font-bold text-ink-900 text-sm">Cross-Branch Match</h3>
          </div>
          <p className="text-sm text-ink-600">
            Students in <span className="font-semibold" style={{ color: selectedBranch.color }}>{selectedBranch.code}</span> are looking for collaborators from other branches. AI recommends matches below.
          </p>
        </div>

        {/* Posts */}
        <SectionHeader title="Branch Posts" subtitle={`${selectedBranch.code} student activity`} />
        <div className="space-y-3 mb-6">
          {branchPosts.length === 0 ? (
            <EmptyState icon={<Megaphone className="h-6 w-6" />} title="No posts yet" body="Be the first to post in this branch." />
          ) : (
            branchPosts.map((p) => (
              <div key={p.id} className="card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar initials={p.authorInitials} color={p.authorColor} size="sm" />
                  <div>
                    <div className="font-semibold text-ink-900 text-sm">{p.authorName}</div>
                    <div className="text-xs text-ink-500">{p.authorBranch} · {p.authorYear} · {p.createdAt}</div>
                  </div>
                  <div className="ml-auto"><VerifiedBadge type={p.verified} /></div>
                </div>
                <p className="text-sm text-ink-700 leading-relaxed">{p.content}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tags.map((t) => <Chip key={t} color="brand">#{t}</Chip>)}
                </div>
                {p.aiTags && (
                  <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-ink-100">
                    <span className="text-[10px] text-ink-400 font-semibold uppercase mr-1">AI Tags:</span>
                    {p.aiTags.map((t) => <span key={t.label} className="chip bg-brand-50 text-brand-600 text-[10px] px-2 py-0.5">{t.label}: {t.value}</span>)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Events */}
        <SectionHeader title="Branch Events" />
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {branchEvents.slice(0, 4).map((e) => (
            <div key={e.id} className="card card-hover p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-ink-50 flex items-center justify-center text-xl">{e.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ink-900 text-sm">{e.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-ink-500">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {e.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</span>
                  </div>
                  <div className="mt-1.5"><Chip color="brand">{e.category}</Chip></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-branch recommended students */}
        <SectionHeader title="Students in this branch" subtitle="Connect across branches" action={<button onClick={() => setView('connect')} className="text-sm font-semibold text-brand-600 flex items-center gap-1">All students <ArrowRight className="h-3.5 w-3.5" /></button>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branchStudents.slice(0, 6).map((s) => {
            const { score } = matchScoreForStudent(user, s);
            return (
              <div key={s.id} className="card card-hover p-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={s.initials} color={s.avatarColor} size="md" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-ink-900 text-sm truncate">{s.name}</h3>
                    <p className="text-xs text-ink-500">{s.branchCode} · {s.year}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {s.skills.slice(0, 3).map((sk) => <Chip key={sk} color="brand">{sk}</Chip>)}
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <MatchBadge score={score} size="sm" />
                  <button
                    onClick={() => toggleConnection(s.id)}
                    className={`btn text-xs px-3 py-1.5 ${connections.has(s.id) ? 'bg-accent-50 text-accent-700 border border-accent-200' : 'btn-primary'}`}
                  >
                    {connections.has(s.id) ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <h1 className="text-2xl font-extrabold text-ink-900">Branch Connect</h1>
        <p className="text-ink-500 text-sm mt-0.5">Same Branch → Inter-Branch → Entire GMU. Explore each branch ecosystem.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BRANCHES.map((b, i) => {
          const Icon = ICONS[b.icon] || Cpu;
          const studentCount = STUDENTS.filter((s) => s.branchCode === b.code).length;
          const eventCount = EVENTS.filter((e) => e.branchCode === b.code || e.branchCode === 'ALL').length;
          const isMyBranch = b.code === user.branchCode;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBranch(b)}
              className="card card-hover p-5 text-left animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${b.color}15`, color: b.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                {isMyBranch && <span className="chip bg-brand-50 text-brand-700 text-[10px]">Your Branch</span>}
              </div>
              <h3 className="font-bold text-ink-900">{b.code}</h3>
              <p className="text-xs text-ink-500 mt-0.5">{b.name}</p>
              <p className="text-xs text-ink-400 mt-2 line-clamp-2">{b.description}</p>
              <div className="flex gap-3 mt-3 text-xs text-ink-500">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {studentCount} students</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {eventCount} events</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
