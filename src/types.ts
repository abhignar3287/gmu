export type Branch = {
  id: string;
  name: string;
  code: string;
  color: string;
  icon: string;
  description: string;
};

export type Student = {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  branch: string;
  branchCode: string;
  year: string;
  skills: string[];
  interests: string[];
  projects: string[];
  achievements: string[];
  lookingFor: string;
  bio: string;
  hackathons: number;
  eventsJoined: number;
};

export type EventCategory =
  | 'Cultural'
  | 'Technical'
  | 'Competition'
  | 'Sports'
  | 'Music'
  | 'Dance'
  | 'Workshop'
  | 'Hackathon'
  | 'Academic';

export type GmuEvent = {
  id: string;
  name: string;
  category: EventCategory;
  organizer: string;
  branch: string;
  branchCode: string;
  date: string;
  time: string;
  location: string;
  description: string;
  emoji: string;
  capacity: number;
  registered: number;
  verified: 'official' | 'branch' | 'student';
};

export type OpportunityType =
  | 'Internship'
  | 'Scholarship'
  | 'Hackathon'
  | 'Competition'
  | 'Research'
  | 'Workshop'
  | 'Startup'
  | 'Certification';

export type Opportunity = {
  id: string;
  title: string;
  type: OpportunityType;
  provider: string;
  branch: string;
  branchCode?: string;
  deadline: string;
  description: string;
  eligibility: string[];
  skillsMatch: string[];
  skillsRecommended: string[];
  link: string;
  verified: 'official' | 'branch' | 'student';
};

export type PostCategory =
  | 'Looking for Teammate'
  | 'Project Collaboration'
  | 'Sharing Opportunity'
  | 'Event Information'
  | 'Workshop'
  | 'Achievement'
  | 'Announcement';

export type GmuPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  authorBranch: string;
  authorYear: string;
  category: PostCategory;
  content: string;
  tags: string[];
  branch: string;
  verified: 'official' | 'branch' | 'student';
  createdAt: string;
  likes: number;
  comments: number;
  aiTags?: { label: string; value: string }[];
};

export type AppNotification = {
  id: string;
  type: 'event' | 'match' | 'branch' | 'scholarship' | 'registration' | 'connection' | 'post';
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export type View =
  | 'landing'
  | 'home'
  | 'discover'
  | 'connect'
  | 'opportunities'
  | 'events'
  | 'branches'
  | 'assistant'
  | 'profile'
  | 'organizer'
  | 'admin'
  | 'notifications';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  cards?: AssistantCard[];
};

export type AssistantCard = {
  kind: 'event' | 'opportunity' | 'student' | 'scholarship' | 'team';
  id: string;
  title: string;
  subtitle: string;
  match?: number;
  meta?: string;
  reasons?: string[];
};
