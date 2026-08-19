import { useState } from 'react';
import { useApp } from '@/store';
import { BRANCHES } from '@/data';
import { Chip, VerifiedBadge, SectionHeader, EmptyState } from '@/components/ui';
import { Megaphone, Calendar, Plus, Check, Sparkles } from 'lucide-react';
import type { EventCategory } from '@/types';

const CATEGORIES: EventCategory[] = ['Cultural', 'Technical', 'Competition', 'Sports', 'Music', 'Dance', 'Workshop', 'Hackathon', 'Academic'];

export function Organizer() {
  const { user, addNotification, posts, addPost } = useApp();
  const [tab, setTab] = useState<'event' | 'announcement'>('event');

  // Event form
  const [eName, setEName] = useState('');
  const [eCategory, setECategory] = useState<EventCategory>('Hackathon');
  const [eBranch, setEBranch] = useState(user.branchCode);
  const [eDate, setEDate] = useState('');
  const [eTime, setETime] = useState('');
  const [eLocation, setELocation] = useState('');
  const [eDesc, setEDesc] = useState('');
  const [eLink, setELink] = useState('');
  const [eCreated, setECreated] = useState(false);

  // Announcement form
  const [aTitle, setATitle] = useState('');
  const [aDesc, setADesc] = useState('');
  const [aBranch, setABranch] = useState(user.branchCode);
  const [aCategory, setACategory] = useState<EventCategory>('Academic');
  const [aDate, setADate] = useState('');
  const [aCreated, setACreated] = useState(false);

  const createEvent = () => {
    if (!eName.trim()) return;
    setECreated(true);
    addNotification({
      type: 'event',
      title: 'Event created',
      body: `${eName} was published with Branch Verified status.`,
      time: 'just now',
    });
    setTimeout(() => {
      setECreated(false);
      setEName(''); setEDate(''); setETime(''); setELocation(''); setEDesc(''); setELink('');
    }, 2500);
  };

  const createAnnouncement = () => {
    if (!aTitle.trim()) return;
    setACreated(true);
    addPost(`${aTitle}: ${aDesc}`, 'Announcement', [aBranch, aCategory]);
    addNotification({
      type: 'branch',
      title: 'Announcement published',
      body: `${aTitle} was posted to ${aBranch} branch.`,
      time: 'just now',
    });
    setTimeout(() => {
      setACreated(false);
      setATitle(''); setADesc(''); setADate('');
    }, 2500);
  };

  const myPosts = posts.filter((p) => p.authorId === user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center">
            <Megaphone className="h-4 w-4 text-brand-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-ink-900">Organizer Mode</h1>
        </div>
        <p className="text-ink-500 text-sm ml-10">Create events and announcements for your branch. Content you publish gets a Branch Verified badge.</p>
      </div>

      {/* Info banner */}
      <div className="card p-4 mb-5 flex items-center gap-3 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5 text-brand-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-900">You are an authorized organizer for {user.branchCode}</p>
          <p className="text-xs text-ink-500">Your events and announcements automatically receive <VerifiedBadge type="branch" /> status.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <button onClick={() => setTab('event')} className={`chip ${tab === 'event' ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200'}`}>
          <Calendar className="h-3.5 w-3.5" /> Create Event
        </button>
        <button onClick={() => setTab('announcement')} className={`chip ${tab === 'announcement' ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 border border-ink-200'}`}>
          <Megaphone className="h-3.5 w-3.5" /> Create Announcement
        </button>
      </div>

      {/* Event form */}
      {tab === 'event' && (
        <div className="card p-5 animate-fade-up" style={{ animationDelay: '180ms' }}>
          <SectionHeader title="Create Event" subtitle="Publish a new event for your branch or all of GMU" />
          <div className="space-y-4">
            <div>
              <p className="label mb-1.5">Event Name</p>
              <input value={eName} onChange={(e) => setEName(e.target.value)} placeholder="e.g. AI Workshop Series" className="input" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="label mb-1.5">Category</p>
                <select value={eCategory} onChange={(e) => setECategory(e.target.value as EventCategory)} className="input">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <p className="label mb-1.5">Branch</p>
                <select value={eBranch} onChange={(e) => setEBranch(e.target.value)} className="input">
                  <option value="ALL">All Branches</option>
                  {BRANCHES.map((b) => <option key={b.id} value={b.code}>{b.code} — {b.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="label mb-1.5">Date</p>
                <input type="date" value={eDate} onChange={(e) => setEDate(e.target.value)} className="input" />
              </div>
              <div>
                <p className="label mb-1.5">Time</p>
                <input type="time" value={eTime} onChange={(e) => setETime(e.target.value)} className="input" />
              </div>
            </div>
            <div>
              <p className="label mb-1.5">Location</p>
              <input value={eLocation} onChange={(e) => setELocation(e.target.value)} placeholder="e.g. ECE Lab, Seminar Hall 2" className="input" />
            </div>
            <div>
              <p className="label mb-1.5">Description</p>
              <textarea value={eDesc} onChange={(e) => setEDesc(e.target.value)} rows={3} placeholder="Describe the event..." className="input resize-none" />
            </div>
            <div>
              <p className="label mb-1.5">Registration Link (optional)</p>
              <input value={eLink} onChange={(e) => setELink(e.target.value)} placeholder="https://..." className="input" />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={createEvent} className="btn-primary" disabled={!eName.trim() || eCreated}>
                {eCreated ? <><Check className="h-4 w-4" /> Published!</> : <><Plus className="h-4 w-4" /> Publish Event</>}
              </button>
              {eCreated && <span className="text-sm text-accent-600 font-medium">Event published with Branch Verified badge</span>}
            </div>
          </div>
        </div>
      )}

      {/* Announcement form */}
      {tab === 'announcement' && (
        <div className="card p-5 animate-fade-up" style={{ animationDelay: '180ms' }}>
          <SectionHeader title="Create Announcement" subtitle="Post an announcement to your branch" />
          <div className="space-y-4">
            <div>
              <p className="label mb-1.5">Title</p>
              <input value={aTitle} onChange={(e) => setATitle(e.target.value)} placeholder="e.g. ECE Department Notice" className="input" />
            </div>
            <div>
              <p className="label mb-1.5">Description</p>
              <textarea value={aDesc} onChange={(e) => setADesc(e.target.value)} rows={3} placeholder="Announcement details..." className="input resize-none" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p className="label mb-1.5">Branch</p>
                <select value={aBranch} onChange={(e) => setABranch(e.target.value)} className="input">
                  <option value="ALL">All Branches</option>
                  {BRANCHES.map((b) => <option key={b.id} value={b.code}>{b.code}</option>)}
                </select>
              </div>
              <div>
                <p className="label mb-1.5">Category</p>
                <select value={aCategory} onChange={(e) => setACategory(e.target.value as EventCategory)} className="input">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <p className="label mb-1.5">Date</p>
                <input type="date" value={aDate} onChange={(e) => setADate(e.target.value)} className="input" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={createAnnouncement} className="btn-primary" disabled={!aTitle.trim() || aCreated}>
                {aCreated ? <><Check className="h-4 w-4" /> Posted!</> : <><Plus className="h-4 w-4" /> Publish Announcement</>}
              </button>
              {aCreated && <span className="text-sm text-accent-600 font-medium">Announcement posted with Branch Verified badge</span>}
            </div>
          </div>
        </div>
      )}

      {/* My published content */}
      <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
        <SectionHeader title="My Published Content" subtitle={`${myPosts.length} posts`} />
        {myPosts.length === 0 ? (
          <EmptyState icon={<Megaphone className="h-6 w-6" />} title="Nothing published yet" body="Create an event or announcement to see it here." />
        ) : (
          <div className="space-y-2">
            {myPosts.map((p) => (
              <div key={p.id} className="card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Chip color="brand">{p.category}</Chip>
                  <VerifiedBadge type={p.verified} />
                  <span className="text-xs text-ink-400 ml-auto">{p.createdAt}</span>
                </div>
                <p className="text-sm text-ink-700">{p.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
