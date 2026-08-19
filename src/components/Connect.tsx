import { useState } from 'react';
import { useApp } from '@/store';
import { STUDENTS, BRANCHES } from '@/data';
import { matchScoreForStudent } from '@/ai';
import type { Student } from '@/types';
import { Avatar, MatchBadge, Chip, SectionHeader, EmptyState, Modal } from '@/components/ui';
import { Search, Filter, Users, Check, MessageSquare, ArrowRight, Target } from 'lucide-react';

export function Connect() {
  const { user, connections, toggleConnection, setView } = useApp();
  const [query, setQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Student | null>(null);

  let filtered = STUDENTS.filter((s) => {
    if (query) {
      const q = query.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.skills.some((sk) => sk.toLowerCase().includes(q)) && !s.interests.some((i) => i.toLowerCase().includes(q))) return false;
    }
    if (branchFilter !== 'All' && s.branchCode !== branchFilter) return false;
    return true;
  });

  const scored = filtered.map((s) => ({ s, ...matchScoreForStudent(user, s) })).sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <h1 className="text-2xl font-extrabold text-ink-900">Connect with GMU</h1>
        <p className="text-ink-500 text-sm mt-0.5">Find the right people. Build something together.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, skill or interest..." className="input pl-10" />
      </div>

      {/* Branch filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <Filter className="h-4 w-4 text-ink-400 shrink-0" />
        <button onClick={() => setBranchFilter('All')} className={`chip shrink-0 ${branchFilter === 'All' ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200'}`}>All</button>
        {BRANCHES.map((b) => (
          <button key={b.id} onClick={() => setBranchFilter(b.code)} className={`chip shrink-0 ${branchFilter === b.code ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200'}`}>
            {b.code}
          </button>
        ))}
      </div>

      {scored.length === 0 ? (
        <EmptyState icon={<Users className="h-6 w-6" />} title="No students found" body="Try a different filter or search term." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scored.map(({ s, score, reasons }) => {
            const connected = connections.has(s.id);
            return (
              <div key={s.id} className="card card-hover p-5 flex flex-col animate-fade-up">
                <div className="flex items-start gap-3">
                  <Avatar initials={s.initials} color={s.avatarColor} size="md" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-ink-900 text-sm truncate">{s.name}</h3>
                    <p className="text-xs text-ink-500">{s.branchCode} · {s.year}</p>
                  </div>
                  <MatchBadge score={score} size="sm" />
                </div>

                <div className="mt-3">
                  <p className="label mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.slice(0, 4).map((sk) => <Chip key={sk} color="brand">{sk}</Chip>)}
                  </div>
                </div>

                <div className="mt-2.5">
                  <p className="label mb-1">Looking for</p>
                  <p className="text-xs text-ink-600 leading-relaxed">{s.lookingFor}</p>
                </div>

                {reasons.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-ink-100">
                    <div className="flex flex-wrap gap-1.5">
                      {reasons.slice(0, 2).map((r) => (
                        <span key={r} className="text-[10px] text-accent-700 flex items-center gap-1">
                          <Check className="h-2.5 w-2.5" /> {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-3 flex gap-2">
                  <button
                    onClick={() => toggleConnection(s.id)}
                    className={`btn flex-1 text-xs ${connected ? 'bg-accent-50 text-accent-700 border border-accent-200' : 'btn-primary'}`}
                  >
                    {connected ? <><Check className="h-3.5 w-3.5" /> Connected</> : 'Connect'}
                  </button>
                  <button onClick={() => setSelected(s)} className="btn-ghost text-xs">View Profile</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Profile modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar initials={selected.initials} color={selected.avatarColor} size="lg" />
              <div>
                <h3 className="font-bold text-ink-900 text-lg">{selected.name}</h3>
                <p className="text-sm text-ink-500">{selected.branchCode} · {selected.year}</p>
                <p className="text-xs text-ink-400 mt-1">{selected.bio}</p>
              </div>
            </div>

            <div>
              <p className="label mb-1.5">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map((sk) => <Chip key={sk} color="brand">{sk}</Chip>)}
              </div>
            </div>

            <div>
              <p className="label mb-1.5">Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.interests.map((i) => <Chip key={i} color="accent">{i}</Chip>)}
              </div>
            </div>

            <div>
              <p className="label mb-1.5">Projects</p>
              <div className="space-y-1.5">
                {selected.projects.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-ink-700">
                    <Target className="h-3.5 w-3.5 text-ink-400" /> {p}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="label mb-1.5">Achievements</p>
              <div className="space-y-1.5">
                {selected.achievements.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-ink-700">
                    <Check className="h-3.5 w-3.5 text-accent-500" /> {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => toggleConnection(selected.id)}
                className={`btn-primary flex-1 ${connections.has(selected.id) ? 'bg-accent-50 text-accent-700 border border-accent-200' : ''}`}
              >
                {connections.has(selected.id) ? <><Check className="h-4 w-4" /> Connected</> : 'Connect'}
              </button>
              <button className="btn-ghost"><MessageSquare className="h-4 w-4" /> Message</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
