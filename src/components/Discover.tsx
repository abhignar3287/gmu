import { useState } from 'react';
import { useApp } from '@/store';
import { searchAll } from '@/ai';
import { STUDENTS, EVENTS, OPPORTUNITIES, BRANCHES } from '@/data';
import { Avatar, Chip, MatchBadge, VerifiedBadge, EmptyState } from '@/components/ui';
import { Search, Users, Calendar, Target, FileText, Sparkles } from 'lucide-react';

const SUGGESTED = [
  'AI events for ECE students',
  'Students who know React',
  'Scholarships closing this month',
  'Cultural events this week',
  'Hackathons looking for teams',
];

export function Discover() {
  const { user, setView } = useApp();
  const [query, setQuery] = useState('');

  const results = query.trim() ? searchAll(query) : { students: [], events: [], opportunities: [], posts: [] };
  const total = results.students.length + results.events.length + results.opportunities.length + results.posts.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <h1 className="text-2xl font-extrabold text-ink-900">Discover</h1>
        <p className="text-ink-500 text-sm mt-0.5">Search across students, events, opportunities and posts — all in one place.</p>
      </div>

      {/* Big search */}
      <div className="relative mb-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="Search students, events, opportunities, scholarships..."
          className="w-full rounded-2xl border border-ink-200 bg-white pl-12 pr-4 py-4 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
        />
      </div>

      {/* Suggested searches */}
      {query.trim() === '' && (
        <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
          <p className="label mb-2">Try searching for</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button key={s} onClick={() => setQuery(s)} className="chip bg-brand-50 text-brand-700 hover:bg-brand-100 transition">
                <Sparkles className="h-3 w-3" /> {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query.trim() !== '' && (
        <div className="mt-6 space-y-6">
          {total === 0 ? (
            <EmptyState icon={<Search className="h-6 w-6" />} title="No results found" body="Try a different search term." />
          ) : (
            <>
              <p className="text-sm text-ink-500">{total} results for "{query}"</p>

              {results.students.length > 0 && (
                <ResultGroup icon={<Users className="h-4 w-4" />} title="Students" count={results.students.length} onSeeAll={() => setView('connect')}>
                  {results.students.slice(0, 4).map((s) => (
                    <div key={s.id} className="card card-hover p-3 flex items-center gap-3">
                      <Avatar initials={s.initials} color={s.avatarColor} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-ink-900 text-sm truncate">{s.name}</div>
                        <div className="text-xs text-ink-500">{s.branchCode} · {s.skills.slice(0, 3).join(', ')}</div>
                      </div>
                      <Chip color="brand">{s.year}</Chip>
                    </div>
                  ))}
                </ResultGroup>
              )}

              {results.events.length > 0 && (
                <ResultGroup icon={<Calendar className="h-4 w-4" />} title="Events" count={results.events.length} onSeeAll={() => setView('events')}>
                  {results.events.slice(0, 4).map((e) => (
                    <div key={e.id} className="card card-hover p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-ink-50 flex items-center justify-center text-lg">{e.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-ink-900 text-sm truncate">{e.name}</div>
                        <div className="text-xs text-ink-500">{e.date} · {e.location}</div>
                      </div>
                      <Chip color="brand">{e.category}</Chip>
                    </div>
                  ))}
                </ResultGroup>
              )}

              {results.opportunities.length > 0 && (
                <ResultGroup icon={<Target className="h-4 w-4" />} title="Opportunities" count={results.opportunities.length} onSeeAll={() => setView('opportunities')}>
                  {results.opportunities.slice(0, 4).map((o) => (
                    <div key={o.id} className="card card-hover p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center">
                        <Target className="h-4 w-4 text-brand-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-ink-900 text-sm truncate">{o.title}</div>
                        <div className="text-xs text-ink-500">{o.type} · Deadline {o.deadline}</div>
                      </div>
                      <Chip color="brand">{o.provider}</Chip>
                    </div>
                  ))}
                </ResultGroup>
              )}

              {results.posts.length > 0 && (
                <ResultGroup icon={<FileText className="h-4 w-4" />} title="Posts" count={results.posts.length}>
                  {results.posts.slice(0, 3).map((p) => (
                    <div key={p.id} className="card p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Avatar initials={p.authorInitials} color={p.authorColor} size="sm" />
                        <span className="text-sm font-semibold text-ink-900">{p.authorName}</span>
                        <Chip>{p.category}</Chip>
                      </div>
                      <p className="text-xs text-ink-600 line-clamp-2">{p.content}</p>
                    </div>
                  ))}
                </ResultGroup>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ResultGroup({ icon, title, count, children, onSeeAll }: { icon: React.ReactNode; title: string; count: number; children: React.ReactNode; onSeeAll?: () => void }) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-ink-900 flex items-center gap-2 text-sm">
          <span className="text-brand-600">{icon}</span>
          {title} <span className="text-ink-400 font-normal">({count})</span>
        </h3>
        {onSeeAll && <button onClick={onSeeAll} className="text-xs font-semibold text-brand-600 hover:text-brand-700">See all →</button>}
      </div>
      <div className="grid sm:grid-cols-2 gap-2">{children}</div>
    </div>
  );
}
