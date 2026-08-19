import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Student, GmuPost, AppNotification, View, ChatMessage } from '@/types';
import { DEMO_USER, INITIAL_NOTIFICATIONS, POSTS } from '@/data';
import { categorizePost } from '@/ai';

type AppState = {
  user: Student;
  setUser: (u: Student) => void;
  updateProfile: (patch: Partial<Student>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;

  view: View;
  setView: (v: View) => void;

  registeredEvents: Set<string>;
  toggleRegister: (id: string) => void;
  savedItems: Set<string>;
  toggleSave: (id: string) => void;

  connections: Set<string>;
  toggleConnection: (id: string) => void;

  posts: GmuPost[];
  addPost: (content: string, category: GmuPost['category'], tags: string[]) => void;

  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (n: Omit<AppNotification, 'id' | 'read'>) => void;

  chat: ChatMessage[];
  pushChat: (m: ChatMessage) => void;
  clearChat: () => void;

  showCreatePost: boolean;
  setShowCreatePost: (v: boolean) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student>(DEMO_USER);
  const [view, setView] = useState<View>('landing');
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set(['e2']));
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set(['o2', 'e4']));
  const [connections, setConnections] = useState<Set<string>>(new Set(['u1']));
  const [posts, setPosts] = useState<GmuPost[]>(POSTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const updateProfile = useCallback((patch: Partial<Student>) => {
    setUser((prev) => ({ ...prev, ...patch }));
  }, []);

  const addSkill = useCallback((skill: string) => {
    setUser((prev) => prev.skills.includes(skill) ? prev : { ...prev, skills: [...prev.skills, skill] });
  }, []);
  const removeSkill = useCallback((skill: string) => {
    setUser((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  }, []);
  const addInterest = useCallback((interest: string) => {
    setUser((prev) => prev.interests.includes(interest) ? prev : { ...prev, interests: [...prev.interests, interest] });
  }, []);
  const removeInterest = useCallback((interest: string) => {
    setUser((prev) => ({ ...prev, interests: prev.interests.filter((i) => i !== interest) }));
  }, []);

  const toggleRegister = useCallback((id: string) => {
    setRegisteredEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const toggleSave = useCallback((id: string) => {
    setSavedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const toggleConnection = useCallback((id: string) => {
    setConnections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addPost = useCallback((content: string, category: GmuPost['category'], tags: string[]) => {
    const aiTags = categorizePost(content);
    const newPost: GmuPost = {
      id: `p${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      authorInitials: user.initials,
      authorColor: user.avatarColor,
      authorBranch: user.branchCode,
      authorYear: user.year,
      category,
      content,
      tags,
      branch: user.branch,
      verified: 'student',
      createdAt: 'just now',
      likes: 0,
      comments: 0,
      aiTags,
    };
    setPosts((prev) => [newPost, ...prev]);
  }, [user]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }, []);
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);
  const addNotification = useCallback((n: Omit<AppNotification, 'id' | 'read'>) => {
    setNotifications((prev) => [{ ...n, id: `n${Date.now()}`, read: false }, ...prev]);
  }, []);

  const pushChat = useCallback((m: ChatMessage) => {
    setChat((prev) => [...prev, m]);
  }, []);
  const clearChat = useCallback(() => setChat([]), []);

  return (
    <AppContext.Provider value={{
      user, setUser, updateProfile, addSkill, removeSkill, addInterest, removeInterest,
      view, setView,
      registeredEvents, toggleRegister,
      savedItems, toggleSave,
      connections, toggleConnection,
      posts, addPost,
      notifications, markNotificationRead, markAllRead, addNotification,
      chat, pushChat, clearChat,
      showCreatePost, setShowCreatePost,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
