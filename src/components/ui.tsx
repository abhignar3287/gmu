import type { ReactNode } from 'react';
import { Check, Bookmark, BookmarkCheck, Star } from 'lucide-react';

export function Avatar({ initials, color, size = 'md' }: { initials: string; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-9 w-9 text-xs', md: 'h-11 w-11 text-sm', lg: 'h-16 w-16 text-lg' };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0 ring-2 ring-white shadow-soft`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

export function MatchBadge({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' }) {
  const color = score >= 90 ? 'bg-accent-50 text-accent-700 ring-accent-200'
    : score >= 75 ? 'bg-brand-50 text-brand-700 ring-brand-200'
    : 'bg-ink-100 text-ink-600 ring-ink-200';
  const sz = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  return (
    <span className={`chip ${sz} ${color} ring-1 font-bold`}>
      <Star className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} fill="currentColor" />
      {score}% Match
    </span>
  );
}

export function VerifiedBadge({ type }: { type: 'official' | 'branch' | 'student' }) {
  const config = {
    official: { label: 'Official GMU', dot: 'bg-accent-500', text: 'text-accent-700', bg: 'bg-accent-50' },
    branch: { label: 'Branch Verified', dot: 'bg-brand-500', text: 'text-brand-700', bg: 'bg-brand-50' },
    student: { label: 'Student Shared', dot: 'bg-ink-300', text: 'text-ink-500', bg: 'bg-ink-100' },
  };
  const c = config[type];
  return (
    <span className={`chip ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

export function SaveButton({ saved, onClick, size = 'md' }: { saved: boolean; onClick: () => void; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm';
  return (
    <button
      onClick={onClick}
      className={`btn ${sz} ${saved ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'}`}
    >
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}

export function RegisterButton({ registered, onClick }: { registered: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${registered ? 'bg-accent-50 text-accent-700 border border-accent-200' : 'btn-primary'}`}
    >
      {registered ? <><Check className="h-4 w-4" /> Registered</> : 'Register'}
    </button>
  );
}

export function Chip({ children, color = 'default' }: { children: ReactNode; color?: 'default' | 'brand' | 'accent' | 'warn' }) {
  const colors = {
    default: 'bg-ink-100 text-ink-600',
    brand: 'bg-brand-50 text-brand-700',
    accent: 'bg-accent-50 text-accent-700',
    warn: 'bg-warn-50 text-warn-600',
  };
  return <span className={`chip ${colors[color]}`}>{children}</span>;
}

export function Modal({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: ReactNode; title?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-lift max-h-[90vh] overflow-y-auto scrollbar-thin animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="sticky top-0 bg-white/90 backdrop-blur px-5 py-4 border-b border-ink-100 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl">
            <h3 className="font-bold text-ink-900">{title}</h3>
            <button onClick={onClose} className="text-ink-400 hover:text-ink-700 text-xl leading-none">×</button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, body }: { icon: ReactNode; title: string; body?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-14 w-14 rounded-2xl bg-ink-100 flex items-center justify-center text-ink-400 mb-3">{icon}</div>
      <p className="font-semibold text-ink-700">{title}</p>
      {body && <p className="text-sm text-ink-500 mt-1 max-w-xs">{body}</p>}
    </div>
  );
}

export function ProgressBar({ value, max, color = '#1d61f0' }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="h-1.5 w-full rounded-full bg-ink-100 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="text-sm text-ink-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
