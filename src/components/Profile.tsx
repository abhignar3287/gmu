import { useState } from 'react';
import { useApp } from '@/store';
import { ALL_SKILLS, ALL_INTERESTS, EVENTS, OPPORTUNITIES, STUDENTS } from '@/data';
import { Avatar, Chip, SectionHeader, Modal, VerifiedBadge } from '@/components/ui';
import { Plus, X, Edit3, Target, Trophy, Calendar, Bookmark, Users, Zap } from 'lucide-react';

export function Profile() {
  const { user, updateProfile, addSkill, removeSkill, addInterest, removeInterest, registeredEvents, savedItems, connections } = useApp();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [editLooking, setEditLooking] = useState(user.lookingFor);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [showSkillPicker, setShowSkillPicker] = useState(false);
  const [showInterestPicker, setShowInterestPicker] = useState(false);
  const [newProject, setNewProject] = useState('');

  const savedEvents = EVENTS.filter((e) => savedItems.has(e.id));
  const savedOpps = OPPORTUNITIES.filter((o) => savedItems.has(o.id));
  const myConnections = STUDENTS.filter((s) => connections.has(s.id));
  const myEvents = EVENTS.filter((e) => registeredEvents.has(e.id));

  const saveEdit = () => {
    updateProfile({ name: editName, bio: editBio, lookingFor: editLooking });
    setEditing(false);
  };

  const addCustomSkill = () => {
    if (skillInput.trim()) { addSkill(skillInput.trim()); setSkillInput(''); }
  };
  const addCustomInterest = () => {
    if (interestInput.trim()) { addInterest(interestInput.trim()); setInterestInput(''); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      {/* Profile header */}
      <div className="card p-6 mb-5 animate-fade-up relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative flex flex-col sm:flex-row items-start gap-4">
          <Avatar initials={user.initials} color={user.avatarColor} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-ink-900">{user.name}</h1>
              <VerifiedBadge type="student" />
            </div>
            <p className="text-sm text-ink-500">{user.branch} · {user.year}</p>
            <p className="text-sm text-ink-600 mt-2 max-w-lg">{user.bio}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="chip bg-brand-50 text-brand-700"><Users className="h-3 w-3" /> {myConnections.length} connections</span>
              <span className="chip bg-accent-50 text-accent-700"><Calendar className="h-3 w-3" /> {myEvents.length} events joined</span>
              <span className="chip bg-warn-50 text-warn-600"><Trophy className="h-3 w-3" /> {user.hackathons} hackathons</span>
              <span className="chip bg-ink-100 text-ink-600"><Bookmark className="h-3 w-3" /> {savedEvents.length + savedOpps.length} saved</span>
            </div>
          </div>
          <button onClick={() => setEditing(true)} className="btn-ghost shrink-0">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="card p-5 mb-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <SectionHeader title="Skills" subtitle="Affects AI recommendations" />
        <div className="flex flex-wrap gap-2">
          {user.skills.map((s) => (
            <span key={s} className="chip bg-brand-50 text-brand-700 group">
              {s}
              <button onClick={() => removeSkill(s)} className="ml-1 hover:text-danger-600"><X className="h-3 w-3" /></button>
            </span>
          ))}
          <button onClick={() => setShowSkillPicker(true)} className="chip bg-white border border-dashed border-ink-300 text-ink-500 hover:border-brand-400 hover:text-brand-600 transition">
            <Plus className="h-3 w-3" /> Add skill
          </button>
        </div>
      </div>

      {/* Interests */}
      <div className="card p-5 mb-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <SectionHeader title="Interests" subtitle="Affects event and opportunity matching" />
        <div className="flex flex-wrap gap-2">
          {user.interests.map((i) => (
            <span key={i} className="chip bg-accent-50 text-accent-700 group">
              {i}
              <button onClick={() => removeInterest(i)} className="ml-1 hover:text-danger-600"><X className="h-3 w-3" /></button>
            </span>
          ))}
          <button onClick={() => setShowInterestPicker(true)} className="chip bg-white border border-dashed border-ink-300 text-ink-500 hover:border-brand-400 hover:text-brand-600 transition">
            <Plus className="h-3 w-3" /> Add interest
          </button>
        </div>
      </div>

      {/* Looking for */}
      <div className="card p-5 mb-4 animate-fade-up" style={{ animationDelay: '180ms' }}>
        <SectionHeader title="Looking For" />
        <p className="text-sm text-ink-700 bg-ink-50 rounded-xl p-3">{user.lookingFor}</p>
      </div>

      {/* Projects */}
      <div className="card p-5 mb-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
        <SectionHeader title="Projects" action={
          <div className="flex gap-2">
            <input value={newProject} onChange={(e) => setNewProject(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && newProject.trim()) { updateProfile({ projects: [...user.projects, newProject.trim()] }); setNewProject(''); } }} placeholder="Add project..." className="text-xs rounded-lg border border-ink-200 px-2 py-1 w-32 outline-none focus:border-brand-400" />
            <button onClick={() => { if (newProject.trim()) { updateProfile({ projects: [...user.projects, newProject.trim()] }); setNewProject(''); } }} className="btn-soft text-xs px-2 py-1"><Plus className="h-3 w-3" /></button>
          </div>
        } />
        <div className="space-y-2">
          {user.projects.map((p) => (
            <div key={p} className="flex items-center gap-2 text-sm text-ink-700 group">
              <Target className="h-4 w-4 text-ink-400" /> {p}
              <button onClick={() => updateProfile({ projects: user.projects.filter((x) => x !== p) })} className="ml-auto opacity-0 group-hover:opacity-100 text-danger-500 hover:text-danger-600 transition">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-5 mb-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <SectionHeader title="Achievements" />
        <div className="space-y-2">
          {user.achievements.map((a) => (
            <div key={a} className="flex items-center gap-2 text-sm text-ink-700">
              <Trophy className="h-4 w-4 text-warn-500" /> {a}
            </div>
          ))}
        </div>
      </div>

      {/* Saved items */}
      <div className="card p-5 animate-fade-up" style={{ animationDelay: '360ms' }}>
        <SectionHeader title="Saved Items" subtitle={`${savedEvents.length + savedOpps.length} saved`} />
        {savedEvents.length + savedOpps.length === 0 ? (
          <p className="text-sm text-ink-400">No saved items yet. Tap the bookmark icon on any event or opportunity.</p>
        ) : (
          <div className="space-y-2">
            {savedEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50 transition">
                <div className="h-8 w-8 rounded-lg bg-ink-50 flex items-center justify-center text-base">{e.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink-900 truncate">{e.name}</div>
                  <div className="text-xs text-ink-500">{e.date} · Event</div>
                </div>
                <Bookmark className="h-4 w-4 text-brand-500" fill="currentColor" />
              </div>
            ))}
            {savedOpps.map((o) => (
              <div key={o.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50 transition">
                <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink-900 truncate">{o.title}</div>
                  <div className="text-xs text-ink-500">{o.type} · Deadline {o.deadline}</div>
                </div>
                <Bookmark className="h-4 w-4 text-brand-500" fill="currentColor" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit modal */}
      <Modal open={editing} onClose={() => setEditing(false)} title="Edit Profile">
        <div className="space-y-4">
          <div>
            <p className="label mb-1.5">Name</p>
            <input value={editName} onChange={(e) => setEditName(e.target.value)} className="input" />
          </div>
          <div>
            <p className="label mb-1.5">Bio</p>
            <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={3} className="input resize-none" />
          </div>
          <div>
            <p className="label mb-1.5">Looking For</p>
            <textarea value={editLooking} onChange={(e) => setEditLooking(e.target.value)} rows={2} className="input resize-none" />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={saveEdit} className="btn-primary flex-1">Save Changes</button>
            <button onClick={() => setEditing(false)} className="btn-ghost">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Skill picker modal */}
      <Modal open={showSkillPicker} onClose={() => setShowSkillPicker(false)} title="Add Skills">
        <div className="mb-3 flex gap-2">
          <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()} placeholder="Type a custom skill..." className="input" />
          <button onClick={addCustomSkill} className="btn-primary shrink-0"><Plus className="h-4 w-4" /></button>
        </div>
        <p className="label mb-2">Popular skills</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SKILLS.filter((s) => !user.skills.includes(s)).map((s) => (
            <button key={s} onClick={() => addSkill(s)} className="chip bg-white border border-ink-200 text-ink-600 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition">
              <Plus className="h-3 w-3" /> {s}
            </button>
          ))}
        </div>
      </Modal>

      {/* Interest picker modal */}
      <Modal open={showInterestPicker} onClose={() => setShowInterestPicker(false)} title="Add Interests">
        <div className="mb-3 flex gap-2">
          <input value={interestInput} onChange={(e) => setInterestInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCustomInterest()} placeholder="Type a custom interest..." className="input" />
          <button onClick={addCustomInterest} className="btn-primary shrink-0"><Plus className="h-4 w-4" /></button>
        </div>
        <p className="label mb-2">Popular interests</p>
        <div className="flex flex-wrap gap-2">
          {ALL_INTERESTS.filter((i) => !user.interests.includes(i)).map((i) => (
            <button key={i} onClick={() => addInterest(i)} className="chip bg-white border border-ink-200 text-ink-600 hover:bg-accent-50 hover:text-accent-700 hover:border-accent-200 transition">
              <Plus className="h-3 w-3" /> {i}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
