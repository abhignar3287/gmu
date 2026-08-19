import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/store';
import { answerQuery, buildTeam } from '@/ai';
import type { ChatMessage, AssistantCard } from '@/types';
import { Avatar, MatchBadge, Chip, SectionHeader } from '@/components/ui';
import { Sparkles, Send, Bot, User as UserIcon, Users, Zap, Check, ArrowRight } from 'lucide-react';

const QUICK_PROMPTS = [
  'What events are happening this week?',
  'Find AI hackathons',
  'Find scholarships for me',
  'Find students who know React',
  'What opportunities match my skills?',
  'What is happening in ECE?',
  'How do I register for Mallika?',
];

export function Assistant() {
  const { user, chat, pushChat, setView, connections, toggleConnection } = useApp();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, typing]);

  const ask = (q?: string) => {
    const query = q || input;
    if (!query.trim()) return;
    const userMsg: ChatMessage = { id: `m${Date.now()}`, role: 'user', content: query };
    pushChat(userMsg);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const res = answerQuery(query, user);
      const aiMsg: ChatMessage = { id: `m${Date.now() + 1}`, role: 'assistant', content: res.content, cards: res.cards };
      pushChat(aiMsg);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20 lg:pb-6">
      <div className="mb-5 animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-ink-900">AI Campus Assistant</h1>
        </div>
        <p className="text-ink-500 text-sm ml-10">Ask about events, opportunities, students, scholarships and teams.</p>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="space-y-4 mb-4 min-h-[300px] max-h-[55vh] overflow-y-auto scrollbar-thin pr-1">
        {chat.length === 0 && (
          <div className="text-center py-10 animate-fade-in">
            <div className="h-14 w-14 rounded-2xl gradient-brand mx-auto flex items-center justify-center mb-3">
              <Sparkles className="h-6 w-6 text-white" fill="white" />
            </div>
            <h3 className="font-bold text-ink-900">Ask me anything about GMU</h3>
            <p className="text-sm text-ink-500 mt-1 max-w-sm mx-auto">I can find events, opportunities, teammates and scholarships — all personalized to your profile.</p>
          </div>
        )}

        {chat.map((m) => (
          <ChatBubble key={m.id} message={m} user={user} onCardClick={(c) => {
            if (c.kind === 'student') setView('connect');
            else if (c.kind === 'event') setView('events');
            else if (c.kind === 'opportunity' || c.kind === 'scholarship') setView('opportunities');
          }} connections={connections} toggleConnection={toggleConnection} />
        ))}

        {typing && (
          <div className="flex items-start gap-2.5 animate-fade-in">
            <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="card px-4 py-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      {chat.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
          {QUICK_PROMPTS.map((p) => (
            <button key={p} onClick={() => ask(p)} className="chip bg-brand-50 text-brand-700 hover:bg-brand-100 transition text-xs">
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-16 lg:bottom-0">
        <div className="flex gap-2 bg-white rounded-2xl border border-ink-200 shadow-soft p-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ask()}
            placeholder="Ask anything about GMU..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 outline-none"
          />
          <button onClick={() => ask()} className="btn-primary px-4 py-2.5">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Team Builder section */}
      <TeamBuilderSection />
    </div>
  );
}

function ChatBubble({ message, user, onCardClick, connections, toggleConnection }: {
  message: ChatMessage;
  user: { name: string; initials: string; avatarColor: string };
  onCardClick: (c: AssistantCard) => void;
  connections: Set<string>;
  toggleConnection: (id: string) => void;
}) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start gap-2.5 animate-fade-up ${isUser ? 'flex-row-reverse' : ''}`}>
      {isUser ? (
        <div className="h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: user.avatarColor }}>
          {user.initials}
        </div>
      ) : (
        <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-brand-600 text-white rounded-2xl rounded-tr-md' : 'card rounded-2xl rounded-tl-md text-ink-800'}`}>
          {message.content.split('\n').map((line, i) => <div key={i}>{line}</div>)}
        </div>
        {message.cards && message.cards.length > 0 && (
          <div className="mt-2 space-y-2 text-left">
            {message.cards.map((c) => (
              <button key={c.id} onClick={() => onCardClick(c)} className="card card-hover w-full p-3 flex items-center gap-3 text-left">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${cardColor(c.kind)}`}>
                  {cardIcon(c.kind)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink-900 text-sm truncate">{c.title}</div>
                  <div className="text-xs text-ink-500 truncate">{c.subtitle}</div>
                </div>
                {c.match && <MatchBadge score={c.match} size="sm" />}
                {c.kind === 'student' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleConnection(c.id); }}
                    className={`btn text-xs px-3 py-1.5 ${connections.has(c.id) ? 'bg-accent-50 text-accent-700 border border-accent-200' : 'btn-primary'}`}
                  >
                    {connections.has(c.id) ? <><Check className="h-3 w-3" /> Connected</> : 'Connect'}
                  </button>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function cardColor(kind: string): string {
  const map: Record<string, string> = {
    event: 'bg-warn-50 text-warn-600',
    opportunity: 'bg-brand-50 text-brand-600',
    student: 'bg-accent-50 text-accent-600',
    scholarship: 'bg-danger-50 text-danger-600',
    team: 'bg-brand-50 text-brand-600',
  };
  return map[kind] || 'bg-ink-100 text-ink-600';
}

function cardIcon(kind: string) {
  const icons: Record<string, React.ReactNode> = {
    event: <Sparkles className="h-4 w-4" />,
    opportunity: <Zap className="h-4 w-4" />,
    student: <UserIcon className="h-4 w-4" />,
    scholarship: <Sparkles className="h-4 w-4" />,
    team: <Users className="h-4 w-4" />,
  };
  return icons[kind];
}

function TeamBuilderSection() {
  const { user, setView, connections, toggleConnection } = useApp();
  const [need, setNeed] = useState('I want to participate in an AI hackathon. I know Python and need a frontend developer, UI/UX designer and presenter.');
  const [result, setResult] = useState<ReturnType<typeof buildTeam> | null>(null);

  const build = () => {
    setResult(buildTeam(user, need));
  };

  return (
    <div className="mt-10 animate-fade-up">
      <SectionHeader title="AI Team Builder" subtitle="Describe what you need — AI finds the right students across branches" />
      <div className="card p-5">
        <textarea
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          rows={3}
          className="input resize-none"
          placeholder="I want to participate in... I know... I need..."
        />
        <button onClick={build} className="btn-primary mt-3 w-full">
          <Sparkles className="h-4 w-4" /> Build My Team
        </button>
      </div>

      {result && (
        <div className="mt-4 animate-scale-in">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink-900">Recommended Team</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink-500">Team Compatibility</span>
                <span className="text-2xl font-extrabold text-accent-600">{result.compatibility}%</span>
              </div>
            </div>

            {/* You + team */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2">
              <div className="shrink-0 text-center">
                <Avatar initials={user.initials} color={user.avatarColor} size="lg" />
                <div className="text-xs font-semibold text-ink-900 mt-1.5">You</div>
                <div className="text-[10px] text-ink-500">{user.skills.slice(0, 2).join(' • ')}</div>
              </div>
              {result.members.map((m, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <div className="text-ink-300 text-lg font-light">+</div>
                  <div className="shrink-0 text-center">
                    <Avatar initials={m.student.initials} color={m.student.avatarColor} size="lg" />
                    <div className="text-xs font-semibold text-ink-900 mt-1.5">{m.student.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-ink-500">{m.student.skills.slice(0, 2).join(' • ')}</div>
                    <div className="text-[10px] text-brand-600 font-medium mt-0.5">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reasons */}
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {result.reasons.map((r) => (
                <div key={r} className="flex items-center gap-2 text-sm text-accent-700">
                  <Check className="h-4 w-4 text-accent-500 shrink-0" /> {r}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => setView('connect')} className="btn-primary">
                <Users className="h-4 w-4" /> Create Team
              </button>
              <button
                onClick={() => {
                  result.members.forEach((m) => { if (!connections.has(m.student.id)) toggleConnection(m.student.id); });
                  setView('connect');
                }}
                className="btn-ghost"
              >
                Send Connection Requests <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
