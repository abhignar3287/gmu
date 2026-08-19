import { useState } from 'react';
import { useApp } from '@/store';
import { OPPORTUNITIES } from '@/data';
import { matchScoreForOpportunity } from '@/ai';
import type { OpportunityType, Opportunity } from '@/types';
import { MatchBadge, VerifiedBadge, SaveButton, Chip, SectionHeader, EmptyState, Modal } from '@/components/ui';
import { Search, Target, Calendar, Building, Check, AlertTriangle, Bell, ExternalLink, Filter } from 'lucide-react';

const TYPES: (OpportunityType | 'All')[] = ['All', 'Internship', 'Scholarship', 'Hackathon', 'Competition', 'Research', 'Workshop', 'Startup', 'Certification'];

export function Opportunities() {
  const { user, savedItems, toggleSave, addNotification } = useApp();
  const [type, setType] = useState<OpportunityType | 'All'>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Opportunity | null>(null);

  const filtered = OPPORTUNITIES.filter((o) => {
    if (type !== 'All' && o.type !== type) return false;
    if (query && !o.title.toLowerCase().includes(query.toLowerCase()) && !o.description.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const scored = filtered.map((o) => ({ o, ...matchScoreForOpportunity(user, o) })).sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <h1 className="text-2xl font-extrabold text-ink-900">Opportunity Hunter</h1>
        <p className="text-ink-500 text-sm mt-0.5">Internships, scholarships, hackathons and more — matched to your skills.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search opportunities..." className="input pl-10" />
      </div>

      {/* Type pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <Filter className="h-4 w-4 text-ink-400 shrink-0" />
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`chip shrink-0 transition ${type === t ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {scored.length === 0 ? (
        <EmptyState icon={<Target className="h-6 w-6" />} title="No opportunities found" body="Try a different filter or search." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scored.map(({ o, score, reasons, warnings }) => (
            <div key={o.id} className="card card-hover p-5 flex flex-col animate-fade-up">
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
              <p className="text-xs text-ink-500 mt-2 line-clamp-2">{o.description}</p>

              <div className="mt-3 space-y-1">
                {reasons.map((r) => (
                  <div key={r} className="flex items-start gap-1.5 text-xs text-accent-700">
                    <Check className="h-3 w-3 text-accent-500 mt-0.5 shrink-0" /> {r}
                  </div>
                ))}
                {warnings.map((w) => (
                  <div key={w} className="flex items-start gap-1.5 text-xs text-warn-600">
                    <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" /> {w}
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                <Calendar className="h-3 w-3" /> Deadline: {o.deadline}
              </div>

              <div className="mt-2"><VerifiedBadge type={o.verified} /></div>

              <div className="mt-auto pt-3 flex gap-2">
                <button onClick={() => setSelected(o)} className="btn-primary text-xs flex-1">View Details</button>
                <SaveButton saved={savedItems.has(o.id)} onClick={() => toggleSave(o.id)} size="sm" />
                <button
                  onClick={() => addNotification({ type: 'scholarship', title: 'Reminder set', body: `${o.title} — deadline ${o.deadline}.`, time: 'just now' })}
                  className="btn bg-white text-ink-600 border border-ink-200 hover:bg-ink-50 px-3"
                  title="Remind me"
                >
                  <Bell className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Chip color="brand">{selected.type}</Chip>
              <VerifiedBadge type={selected.verified} />
            </div>
            <p className="text-sm text-ink-600 leading-relaxed">{selected.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-ink-600"><Building className="h-4 w-4 text-ink-400" /> {selected.provider}</div>
              <div className="flex items-center gap-2 text-ink-600"><Calendar className="h-4 w-4 text-ink-400" /> Deadline: {selected.deadline}</div>
            </div>
            <div>
              <p className="label mb-1.5">Eligibility</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.eligibility.map((e) => <Chip key={e}>{e}</Chip>)}
              </div>
            </div>
            {selected.skillsMatch.length > 0 && (
              <div>
                <p className="label mb-1.5">Matching skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skillsMatch.map((s) => <Chip key={s} color="accent">{s}</Chip>)}
                </div>
              </div>
            )}
            {selected.skillsRecommended.length > 0 && (
              <div>
                <p className="label mb-1.5">Recommended skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skillsRecommended.map((s) => <Chip key={s} color="warn">{s}</Chip>)}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button className="btn-primary flex-1">Apply Now <ExternalLink className="h-4 w-4" /></button>
              <SaveButton saved={savedItems.has(selected.id)} onClick={() => toggleSave(selected.id)} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
