import { useState } from 'react';
import { useApp } from '@/store';
import type { View } from '@/types';
import {
  Home, Search, Users, Target, Calendar, Building2, Bot, User as UserIcon,
  Bell, Plus, Menu, X, Sparkles, Bell as BellIcon, ShieldCheck, Megaphone,
} from 'lucide-react';

const NAV: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'discover', label: 'Discover', icon: Search },
  { id: 'connect', label: 'Connect', icon: Users },
  { id: 'opportunities', label: 'Opportunities', icon: Target },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'branches', label: 'Branches', icon: Building2 },
  { id: 'assistant', label: 'AI Assistant', icon: Bot },
  { id: 'profile', label: 'Profile', icon: UserIcon },
];

const EXTRA_NAV: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'organizer', label: 'Organizer Mode', icon: Megaphone },
  { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck },
];

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group">
      <div className="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
        <Sparkles className="h-5 w-5 text-white" fill="white" />
      </div>
      <div className="text-left leading-none">
        <div className="font-extrabold text-ink-900 text-base tracking-tight">GMU NEXUS</div>
        <div className="text-[10px] text-ink-500 font-medium tracking-wide">Connect. Discover. Collaborate.</div>
      </div>
    </button>
  );
}

export function Sidebar() {
  const { view, setView, notifications } = useApp();
  const unread = notifications.filter((n) => !n.read).length;
  const go = (v: View) => setView(v);

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-ink-100 bg-white h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-ink-100">
        <Logo onClick={() => go('home')} />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => go(item.id)} className={`nav-link w-full ${active ? 'nav-link-active' : ''}`}>
              <Icon className={`h-[18px] w-[18px] ${active ? 'text-brand-600' : ''}`} />
              <span>{item.label}</span>
              {item.id === 'assistant' && <span className="ml-auto chip bg-brand-100 text-brand-700 text-[10px] px-1.5 py-0.5 font-bold">AI</span>}
            </button>
          );
        })}
        <div className="pt-3 mt-3 border-t border-ink-100">
          <p className="label px-3 mb-1.5">Tools</p>
          {EXTRA_NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button key={item.id} onClick={() => go(item.id)} className={`nav-link w-full ${active ? 'nav-link-active' : ''}`}>
                <Icon className={`h-[18px] w-[18px] ${active ? 'text-brand-600' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <div className="px-3 pb-4">
        <button onClick={() => go('notifications')} className="nav-link w-full">
          <div className="relative">
            <Bell className="h-[18px] w-[18px]" />
            {unread > 0 && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />}
          </div>
          <span>Notifications</span>
          {unread > 0 && <span className="ml-auto chip bg-danger-50 text-danger-600 text-[10px] px-1.5 py-0.5 font-bold">{unread}</span>}
        </button>
      </div>
    </aside>
  );
}

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const { setView, notifications, user } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-ink-100">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
        <button onClick={onMenu} className="lg:hidden text-ink-600 hover:text-ink-900">
          <Menu className="h-5 w-5" />
        </button>
        <div className="lg:hidden">
          <Logo onClick={() => setView('home')} />
        </div>

        <button
          onClick={() => setView('discover')}
          className="hidden sm:flex items-center gap-2 flex-1 max-w-md px-3.5 py-2 rounded-xl bg-ink-50 border border-ink-100 text-ink-400 text-sm hover:bg-ink-100 transition"
        >
          <Search className="h-4 w-4" />
          <span>Search students, events, opportunities...</span>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setView('discover')}
            className="sm:hidden h-9 w-9 rounded-xl bg-ink-50 flex items-center justify-center text-ink-600"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('notifications')}
            className="relative h-9 w-9 rounded-xl bg-ink-50 flex items-center justify-center text-ink-600 hover:bg-ink-100 transition"
          >
            <BellIcon className="h-4 w-4" />
            {unread > 0 && <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />}
          </button>
          <button
            onClick={() => setView('profile')}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-ink-50 transition"
          >
            <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: user.avatarColor }}>
              {user.initials}
            </div>
            <span className="hidden sm:block text-sm font-semibold text-ink-700">{user.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { view, setView } = useApp();
  const items = NAV.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/90 backdrop-blur-md border-t border-ink-100 flex items-center justify-around px-2 h-16 pb-safe">
      {items.map((item) => {
        const Icon = item.icon;
        const active = view === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition ${active ? 'text-brand-600' : 'text-ink-400'}`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { view, setView, notifications } = useApp();
  const unread = notifications.filter((n) => !n.read).length;
  const go = (v: View) => { setView(v); onClose(); };
  if (!open) return null;
  return (
    <div className="lg:hidden fixed inset-0 z-50 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-lift p-5 animate-scale-in overflow-y-auto scrollbar-thin" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <Logo onClick={() => go('home')} />
          <button onClick={onClose} className="text-ink-400"><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button key={item.id} onClick={() => go(item.id)} className={`nav-link w-full ${active ? 'nav-link-active' : ''}`}>
                <Icon className={`h-[18px] w-[18px] ${active ? 'text-brand-600' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 mt-3 border-t border-ink-100 space-y-1">
            {EXTRA_NAV.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button key={item.id} onClick={() => go(item.id)} className={`nav-link w-full ${active ? 'nav-link-active' : ''}`}>
                  <Icon className={`h-[18px] w-[18px] ${active ? 'text-brand-600' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button onClick={() => go('notifications')} className="nav-link w-full">
              <Bell className="h-[18px] w-[18px]" />
              <span>Notifications</span>
              {unread > 0 && <span className="ml-auto chip bg-danger-50 text-danger-600 text-[10px] px-1.5 py-0.5 font-bold">{unread}</span>}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function CreatePostFab() {
  const { setShowCreatePost } = useApp();
  return (
    <button
      onClick={() => setShowCreatePost(true)}
      className="lg:hidden fixed bottom-20 right-4 z-30 h-12 w-12 rounded-full gradient-brand shadow-lift flex items-center justify-center text-white active:scale-95 transition"
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}
