import { useState } from 'react';
import { useApp } from '@/store';
import { categorizePost } from '@/ai';
import { Modal, Chip } from '@/components/ui';
import { Sparkles, X } from 'lucide-react';
import type { PostCategory } from '@/types';

const CATEGORIES: PostCategory[] = [
  'Looking for Teammate',
  'Project Collaboration',
  'Sharing Opportunity',
  'Event Information',
  'Workshop',
  'Achievement',
  'Announcement',
];

export function CreatePostModal() {
  const { showCreatePost, setShowCreatePost, addPost, addNotification, user } = useApp();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('Looking for Teammate');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [aiPreview, setAiPreview] = useState<{ label: string; value: string }[]>([]);

  const close = () => {
    setShowCreatePost(false);
    setContent('');
    setCategory('Looking for Teammate');
    setTags([]);
    setTagInput('');
    setAiPreview([]);
  };

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '');
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  const handlePost = () => {
    if (!content.trim()) return;
    addPost(content, category, tags);
    addNotification({ type: 'post', title: 'Your post is live', body: `"${content.slice(0, 60)}..." was posted to ${user.branchCode} branch.`, time: 'just now' });
    close();
  };

  return (
    <Modal open={showCreatePost} onClose={close} title="Create Post">
      <div className="space-y-4">
        {/* Category */}
        <div>
          <p className="label mb-1.5">Category</p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`chip text-xs transition ${category === c ? 'bg-brand-600 text-white' : 'bg-white border border-ink-200 text-ink-600 hover:bg-ink-50'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="label mb-1.5">What do you want to share?</p>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (e.target.value.length > 15) {
                setAiPreview(categorizePost(e.target.value));
              } else {
                setAiPreview([]);
              }
            }}
            rows={4}
            placeholder="e.g. Looking for a UI/UX Designer for our AI project for the upcoming hackathon..."
            className="input resize-none"
          />
        </div>

        {/* AI categorization preview */}
        {content.length > 15 && aiPreview.length > 0 && (
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              <span className="text-xs font-semibold text-brand-700">AI Auto-Categorization</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {aiPreview.map((t) => (
                <Chip key={t.label} color="brand">{t.label}: {t.value}</Chip>
              ))}
              {tags.map((t) => <Chip key={t} color="accent">#{t}</Chip>)}
            </div>
          </div>
        )}

        {/* Tags */}
        <div>
          <p className="label mb-1.5">Tags</p>
          <div className="flex gap-2 mb-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add tags (e.g. Hackathon, AI, UIUX)"
              className="input"
            />
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="chip bg-brand-50 text-brand-700">
                  #{t}
                  <button onClick={() => setTags(tags.filter((x) => x !== t))} className="ml-1 hover:text-danger-600"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={handlePost} className="btn-primary flex-1" disabled={!content.trim()}>Post</button>
          <button onClick={close} className="btn-ghost">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
