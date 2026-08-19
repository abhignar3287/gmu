import { useApp } from '@/store';
import { STUDENTS, EVENTS, OPPORTUNITIES, BRANCHES, POSTS } from '@/data';
import { SectionHeader, ProgressBar } from '@/components/ui';
import { Users, Calendar, Target, Building2, Link2, TrendingUp, BarChart3, Award, Star } from 'lucide-react';

const POPULAR_SKILLS = [
  { name: 'Python', count: 8, color: '#1d61f0' },
  { name: 'AI/ML', count: 6, color: '#10b981' },
  { name: 'Web Development', count: 5, color: '#f59e0b' },
  { name: 'UI/UX', count: 4, color: '#8b5cf6' },
  { name: 'Communication', count: 4, color: '#ef4444' },
];

const CONNECTIONS_BY_BRANCH = [
  { code: 'CSE', count: 320, color: '#1d61f0' },
  { code: 'ECE', count: 245, color: '#10b981' },
  { code: 'MECH', count: 180, color: '#f59e0b' },
  { code: 'CIVIL', count: 140, color: '#8b5cf6' },
  { code: 'COMM', count: 120, color: '#ef4444' },
  { code: 'MGMT', count: 155, color: '#0ea5e9' },
];

const POPULAR_EVENTS = [
  { name: 'Mallika Cultural Fest', registrations: 612 },
  { name: 'AI Hackathon 2026', registrations: 148 },
  { name: 'Sports Tournament', registrations: 210 },
  { name: 'Robotics Workshop', registrations: 41 },
];

export function Admin() {
  const { connections } = useApp();

  const stats = [
    { icon: Users, label: 'Total Students', value: '5,240', color: 'bg-brand-50 text-brand-600' },
    { icon: Calendar, label: 'Active Events', value: String(EVENTS.length), color: 'bg-accent-50 text-accent-600' },
    { icon: Target, label: 'Opportunities', value: String(OPPORTUNITIES.length), color: 'bg-warn-50 text-warn-600' },
    { icon: Building2, label: 'Branches', value: String(BRANCHES.length), color: 'bg-danger-50 text-danger-600' },
    { icon: Link2, label: 'Connections', value: '1,284', color: 'bg-brand-50 text-brand-600' },
    { icon: TrendingUp, label: 'Posts Today', value: String(POSTS.length), color: 'bg-accent-50 text-accent-600' },
  ];

  const maxSkill = Math.max(...POPULAR_SKILLS.map((s) => s.count));
  const maxConn = Math.max(...CONNECTIONS_BY_BRANCH.map((b) => b.count));
  const maxEventReg = Math.max(...POPULAR_EVENTS.map((e) => e.registrations));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-ink-900 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-ink-900">University Admin Dashboard</h1>
        </div>
        <p className="text-ink-500 text-sm ml-10">A bird's-eye view of the GMU Nexus ecosystem.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-4">
              <div className={`h-9 w-9 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-ink-900">{s.value}</div>
              <div className="text-xs text-ink-500">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Popular Skills */}
        <div className="card p-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
          <SectionHeader title="Popular Skills" subtitle="Most common skills across GMU students" />
          <div className="space-y-3">
            {POPULAR_SKILLS.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-ink-700">{s.name}</span>
                  <span className="text-ink-500">{s.count} students</span>
                </div>
                <ProgressBar value={s.count} max={maxSkill} color={s.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Connections by Branch */}
        <div className="card p-5 animate-fade-up" style={{ animationDelay: '180ms' }}>
          <SectionHeader title="Student Connections by Branch" subtitle="Inter-branch collaboration activity" />
          <div className="space-y-3">
            {CONNECTIONS_BY_BRANCH.map((b) => (
              <div key={b.code}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-ink-700">{b.code}</span>
                  <span className="text-ink-500">{b.count} connections</span>
                </div>
                <ProgressBar value={b.count} max={maxConn} color={b.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Events */}
        <div className="card p-5 animate-fade-up" style={{ animationDelay: '240ms' }}>
          <SectionHeader title="Popular Events" subtitle="By registration count" />
          <div className="space-y-3">
            {POPULAR_EVENTS.map((e) => (
              <div key={e.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-ink-700">{e.name}</span>
                  <span className="text-ink-500">{e.registrations} registered</span>
                </div>
                <ProgressBar value={e.registrations} max={maxEventReg} color="#1d61f0" />
              </div>
            ))}
          </div>
        </div>

        {/* Branch distribution */}
        <div className="card p-5 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <SectionHeader title="Students per Branch" subtitle="Distribution across departments" />
          <div className="space-y-2">
            {BRANCHES.map((b) => {
              const count = STUDENTS.filter((s) => s.branchCode === b.code).length;
              return (
                <div key={b.id} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${b.color}15`, color: b.color }}>
                    {b.code.slice(0, 2)}
                  </div>
                  <span className="text-sm font-medium text-ink-700 flex-1">{b.code}</span>
                  <span className="text-sm text-ink-500">{count} students</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-5 card p-5 animate-fade-up" style={{ animationDelay: '360ms' }}>
        <SectionHeader title="Platform Health" subtitle="Real-time ecosystem metrics" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Star, label: 'Avg Match Score', value: '87%', color: 'text-accent-600' },
            { icon: Award, label: 'Hackathon Teams', value: '42', color: 'text-brand-600' },
            { icon: Users, label: 'Active Today', value: '1,840', color: 'text-warn-600' },
            { icon: Link2, label: 'Your Connections', value: String(connections.size), color: 'text-danger-600' },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="rounded-xl bg-ink-50 p-3">
                <Icon className={`h-4 w-4 ${m.color} mb-1.5`} />
                <div className="text-lg font-extrabold text-ink-900">{m.value}</div>
                <div className="text-xs text-ink-500">{m.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
