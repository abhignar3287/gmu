import { useApp } from '@/store';
import type { AppNotification } from '@/types';
import { Avatar } from '@/components/ui';
import { Bell, Calendar, Target, Building2, GraduationCap, Users, Link2, FileText, CheckCheck } from 'lucide-react';

const ICONS: Record<AppNotification['type'], { icon: typeof Bell; color: string }> = {
  event: { icon: Calendar, color: 'bg-warn-50 text-warn-600' },
  match: { icon: Target, color: 'bg-brand-50 text-brand-600' },
  branch: { icon: Building2, color: 'bg-accent-50 text-accent-600' },
  scholarship: { icon: GraduationCap, color: 'bg-danger-50 text-danger-600' },
  registration: { icon: Bell, color: 'bg-brand-50 text-brand-600' },
  connection: { icon: Link2, color: 'bg-accent-50 text-accent-600' },
  post: { icon: FileText, color: 'bg-ink-100 text-ink-600' },
};

export function Notifications() {
  const { notifications, markNotificationRead, markAllRead } = useApp();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="flex items-center justify-between mb-5 animate-fade-up">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Notifications</h1>
          <p className="text-ink-500 text-sm mt-0.5">{unread} unread</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="btn-ghost text-sm">
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => {
          const c = ICONS[n.type];
          const Icon = c.icon;
          return (
            <button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`w-full text-left card p-4 flex items-start gap-3 transition animate-fade-up ${n.read ? 'opacity-60' : 'card-hover'}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={`h-10 w-10 rounded-xl ${c.color} flex items-center justify-center shrink-0`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-ink-900 text-sm">{n.title}</h3>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0" />}
                </div>
                <p className="text-xs text-ink-500 mt-0.5 leading-relaxed">{n.body}</p>
                <p className="text-[10px] text-ink-400 mt-1">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
