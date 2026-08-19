import { useState } from 'react';
import { AppProvider, useApp } from '@/store';
import { Sidebar, TopBar, BottomNav, MobileMenu, CreatePostFab } from '@/components/Layout';
import { Landing } from '@/components/Landing';
import { Home } from '@/components/Home';
import { Discover } from '@/components/Discover';
import { Connect } from '@/components/Connect';
import { Opportunities } from '@/components/Opportunities';
import { Events } from '@/components/Events';
import { Branches } from '@/components/Branches';
import { Assistant } from '@/components/Assistant';
import { Profile } from '@/components/Profile';
import { Notifications } from '@/components/Notifications';
import { Organizer } from '@/components/Organizer';
import { Admin } from '@/components/Admin';
import { CreatePostModal } from '@/components/CreatePostModal';

function AppContent() {
  const { view } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  if (view === 'landing') {
    return (
      <>
        <Landing />
        <CreatePostModal />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onMenu={() => setMenuOpen(true)} />
        <main className="flex-1">
          {view === 'home' && <Home />}
          {view === 'discover' && <Discover />}
          {view === 'connect' && <Connect />}
          {view === 'opportunities' && <Opportunities />}
          {view === 'events' && <Events />}
          {view === 'branches' && <Branches />}
          {view === 'assistant' && <Assistant />}
          {view === 'profile' && <Profile />}
          {view === 'notifications' && <Notifications />}
          {view === 'organizer' && <Organizer />}
          {view === 'admin' && <Admin />}
        </main>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <BottomNav />
      <CreatePostFab />
      <CreatePostModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
