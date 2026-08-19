import { useState } from 'react';
import { useApp } from '@/store';
import { EVENTS } from '@/data';
import { matchScoreForEvent } from '@/ai';
import type { EventCategory, GmuEvent } from '@/types';
import { MatchBadge, VerifiedBadge, RegisterButton, SaveButton, Chip, SectionHeader, ProgressBar, EmptyState } from '@/components/ui';
import { Calendar, MapPin, Clock, Search, Filter, Users } from 'lucide-react';

const CATEGORIES: (EventCategory | 'All')[] = ['All', 'Cultural', 'Technical', 'Competition', 'Sports', 'Music', 'Dance', 'Workshop', 'Hackathon', 'Academic'];

export function Events() {
  const { user, registeredEvents, toggleRegister, savedItems, toggleSave } = useApp();
  const [category, setCategory] = useState<EventCategory | 'All'>('All');
  const [query, setQuery] = useState('');

  const filtered = EVENTS.filter((e) => {
    if (category !== 'All' && e.category !== category) return false;
    if (query && !e.name.toLowerCase().includes(query.toLowerCase()) && !e.description.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const scored = filtered.map((e) => ({ e, ...matchScoreForEvent(user, e) })).sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <h1 className="text-2xl font-extrabold text-ink-900">GMU Events Hub</h1>
        <p className="text-ink-500 text-sm mt-0.5">Every event, every branch, one place. Register and save in one tap.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events..."
          className="input pl-10"
        />
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <Filter className="h-4 w-4 text-ink-400 shrink-0" />
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`chip shrink-0 transition ${category === c ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {scored.length === 0 ? (
        <EmptyState icon={<Calendar className="h-6 w-6" />} title="No events found" body="Try a different category or search term." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scored.map(({ e, score }) => (
            <EventCard
              key={e.id}
              event={e}
              score={score}
              registered={registeredEvents.has(e.id)}
              saved={savedItems.has(e.id)}
              onRegister={() => toggleRegister(e.id)}
              onSave={() => toggleSave(e.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ event, score, registered, saved, onRegister, onSave }: {
  event: GmuEvent;
  score: number;
  registered: boolean;
  saved: boolean;
  onRegister: () => void;
  onSave: () => void;
}) {
  const pct = Math.round((event.registered / event.capacity) * 100);
  return (
    <div className="card card-hover p-5 flex flex-col animate-fade-up">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="h-12 w-12 rounded-xl bg-ink-50 flex items-center justify-center text-2xl">{event.emoji}</div>
        <div className="flex flex-col items-end gap-1.5">
          <MatchBadge score={score} size="sm" />
          <VerifiedBadge type={event.verified} />
        </div>
      </div>
      <h3 className="font-bold text-ink-900 text-sm leading-snug">{event.name}</h3>
      <p className="text-xs text-ink-500 mt-1 line-clamp-2">{event.description}</p>

      <div className="mt-3 space-y-1.5 text-xs text-ink-500">
        <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {event.date}</div>
        <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {event.time}</div>
        <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {event.location}</div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-ink-500 mb-1">
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {event.registered}/{event.capacity}</span>
          <span>{pct}% full</span>
        </div>
        <ProgressBar value={event.registered} max={event.capacity} color={pct > 85 ? '#ef4444' : '#1d61f0'} />
      </div>

      <div className="mt-1 flex flex-wrap gap-1">
        <Chip color="brand">{event.category}</Chip>
        <Chip>{event.branchCode}</Chip>
      </div>

      <div className="mt-auto pt-3 flex gap-2">
        <RegisterButton registered={registered} onClick={onRegister} />
        <SaveButton saved={saved} onClick={onSave} size="sm" />
      </div>
    </div>
  );
}
