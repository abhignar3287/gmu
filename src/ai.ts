import type { Student, GmuEvent, Opportunity, GmuPost, AssistantCard, ChatMessage } from '@/types';
import { DEMO_USER, STUDENTS, EVENTS, OPPORTUNITIES, POSTS } from '@/data';

const SKILL_ALIASES: Record<string, string[]> = {
  'AI': ['ai', 'ml', 'machine learning', 'artificial intelligence', 'basic ai'],
  'ML': ['ml', 'machine learning'],
  'React': ['react', 'reactjs', 'react.js', 'frontend', 'front-end', 'front end'],
  'UI/UX': ['ui', 'ux', 'ui/ux', 'design', 'figma', 'designer'],
  'Figma': ['figma', 'design tool'],
  'Python': ['python', 'py'],
  'JavaScript': ['javascript', 'js', 'node'],
  'Node.js': ['node', 'nodejs', 'backend'],
  'IoT': ['iot', 'internet of things', 'embedded'],
  'Robotics': ['robotics', 'robot', 'ros'],
  'CAD': ['cad', 'solidworks', 'autocad', '3d modeling'],
  'Presentation': ['presentation', 'presenting', 'presenter', 'public speaking', 'content'],
  'Content': ['content', 'content writing', 'writing'],
};

export function normalizeSkill(skill: string): string {
  const lower = skill.toLowerCase();
  for (const [canonical, aliases] of Object.entries(SKILL_ALIASES)) {
    if (aliases.includes(lower)) return canonical;
  }
  return skill;
}

function skillOverlap(a: string[], b: string[]): string[] {
  const normB = b.map(normalizeSkill);
  return a.filter((s) => normB.includes(normalizeSkill(s)));
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a.map(normalizeSkill));
  const setB = new Set(b.map(normalizeSkill));
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

export function matchScoreForStudent(user: Student, candidate: Student): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  const sharedSkills = skillOverlap(user.skills, candidate.skills);
  const complementary = candidate.skills.filter(
    (s) => !user.skills.map(normalizeSkill).includes(normalizeSkill(s))
  );

  if (sharedSkills.length > 0) {
    score += 30;
    reasons.push(`Shared skills: ${sharedSkills.slice(0, 3).join(', ')}`);
  }
  if (complementary.length > 0) {
    score += 35;
    reasons.push(`Complementary skills: ${complementary.slice(0, 3).join(', ')}`);
  }
  if (user.interests.some((i) => candidate.interests.includes(i))) {
    score += 20;
    const shared = user.interests.filter((i) => candidate.interests.includes(i));
    reasons.push(`Shared interests: ${shared.slice(0, 2).join(', ')}`);
  }
  if (user.branchCode !== candidate.branchCode) {
    score += 10;
    reasons.push(`Different branch perspective (${candidate.branchCode})`);
  } else {
    score += 5;
  }
  if (candidate.hackathons >= 3) {
    score += 5;
    reasons.push(`Experienced hackathoner (${candidate.hackathons} joined)`);
  }

  return { score: Math.min(99, Math.round(score)), reasons: reasons.slice(0, 4) };
}

export function matchScoreForEvent(user: Student, event: GmuEvent): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 40;

  const eventLower = (event.name + ' ' + event.description + ' ' + event.category).toLowerCase();
  for (const interest of user.interests) {
    if (eventLower.includes(interest.toLowerCase())) {
      score += 20;
      reasons.push(`${interest} interest match`);
      break;
    }
  }
  for (const skill of user.skills) {
    if (eventLower.includes(normalizeSkill(skill).toLowerCase()) || eventLower.includes(skill.toLowerCase())) {
      score += 18;
      reasons.push(`${skill} skill relevant`);
      break;
    }
  }
  if (event.branchCode === 'ALL' || event.branchCode === user.branchCode) {
    score += 15;
    reasons.push(event.branchCode === user.branchCode ? 'Your branch event' : 'Open to all branches');
  } else {
    score -= 5;
  }
  if (event.registered < event.capacity * 0.9) {
    score += 5;
  }

  return { score: Math.min(99, Math.max(30, Math.round(score))), reasons: reasons.slice(0, 3) };
}

export function matchScoreForOpportunity(user: Student, opp: Opportunity): { score: number; reasons: string[]; warnings: string[] } {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let score = 50;

  const matched = skillOverlap(user.skills, opp.skillsMatch);
  if (matched.length > 0) {
    score += 25;
    reasons.push(`${matched[0]} skill`);
  }
  if (opp.branch === 'All Branches' || opp.branch === user.branch) {
    score += 12;
    reasons.push(opp.branch === user.branch ? 'Relevant branch' : 'Open to all branches');
  } else {
    score -= 8;
  }
  if (user.year === '2nd Year' || user.year === '3rd Year' || user.year === '4th Year') {
    score += 8;
    reasons.push('Year eligible');
  }
  if (opp.skillsRecommended && opp.skillsRecommended.length > 0) {
    warnings.push(`${opp.skillsRecommended[0]} recommended`);
  }
  if (user.interests.some((i) => opp.title.toLowerCase().includes(i.toLowerCase()) || opp.description.toLowerCase().includes(i.toLowerCase()))) {
    score += 5;
  }

  return { score: Math.min(99, Math.max(35, Math.round(score))), reasons: reasons.slice(0, 3), warnings };
}

export function recommendStudents(user: Student, limit = 6): { student: Student; score: number; reasons: string[] }[] {
  return STUDENTS
    .map((s) => ({ student: s, ...matchScoreForStudent(user, s) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function recommendEvents(user: Student, limit = 6): { event: GmuEvent; score: number; reasons: string[] }[] {
  return EVENTS
    .map((e) => ({ event: e, ...matchScoreForEvent(user, e) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function recommendOpportunities(user: Student, limit = 6): { opportunity: Opportunity; score: number; reasons: string[]; warnings: string[] }[] {
  return OPPORTUNITIES
    .map((o) => ({ opportunity: o, ...matchScoreForOpportunity(user, o) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function buildTeam(user: Student, need: string): {
  members: { student: Student; role: string; score: number }[];
  compatibility: number;
  reasons: string[];
} {
  const needLower = need.toLowerCase();
  const roleMap: { role: string; skills: string[] }[] = [];
  if (/react|frontend|front-end|front end|web/.test(needLower)) roleMap.push({ role: 'Frontend Developer', skills: ['React', 'JavaScript', 'Tailwind'] });
  if (/ui|ux|design|figma/.test(needLower)) roleMap.push({ role: 'UI/UX Designer', skills: ['Figma', 'UI/UX', 'Design Systems'] });
  if (/present|pitch|content|speaker/.test(needLower)) roleMap.push({ role: 'Presenter / Content', skills: ['Presentation', 'Content', 'Public Speaking'] });
  if (/backend|server|api|node/.test(needLower)) roleMap.push({ role: 'Backend Developer', skills: ['Node.js', 'Java', 'Cloud'] });
  if (/ai|ml|machine learning/.test(needLower)) roleMap.push({ role: 'AI/ML Engineer', skills: ['Python', 'AI', 'ML'] });
  if (/iot|embedded|hardware|sensor/.test(needLower)) roleMap.push({ role: 'IoT/Hardware', skills: ['IoT', 'Embedded C', 'Arduino'] });
  if (/robot|mech|cad/.test(needLower)) roleMap.push({ role: 'Robotics/Mech', skills: ['Robotics', 'CAD', 'ROS'] });
  if (roleMap.length === 0) {
    roleMap.push({ role: 'Frontend Developer', skills: ['React', 'JavaScript'] });
    roleMap.push({ role: 'UI/UX Designer', skills: ['Figma', 'UI/UX'] });
    roleMap.push({ role: 'Presenter / Content', skills: ['Presentation', 'Content'] });
  }

  const used = new Set<string>([user.id]);
  const members: { student: Student; role: string; score: number }[] = [];
  let totalScore = 0;

  for (const role of roleMap.slice(0, 4)) {
    let best: Student | null = null;
    let bestScore = 0;
    for (const s of STUDENTS) {
      if (used.has(s.id)) continue;
      const overlap = skillOverlap(role.skills, s.skills).length;
      const jaccard = jaccardSimilarity(role.skills, s.skills);
      const score = overlap * 25 + jaccard * 40 + (s.branchCode !== user.branchCode ? 8 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = s;
      }
    }
    if (best) {
      used.add(best.id);
      const normalizedScore = Math.min(99, Math.max(70, Math.round(60 + bestScore)));
      members.push({ student: best, role: role.role, score: normalizedScore });
      totalScore += normalizedScore;
    }
  }

  const compatibility = members.length > 0 ? Math.min(99, Math.round(totalScore / members.length)) : 0;
  const reasons: string[] = [];
  if (members.length > 0) reasons.push('Required skills covered');
  reasons.push('Complementary skills');
  reasons.push('Shared interests');
  if (members.some((m) => m.student.branchCode !== user.branchCode)) reasons.push('Different branch perspectives');

  return { members, compatibility, reasons };
}

export function categorizePost(content: string): { label: string; value: string }[] {
  const lower = content.toLowerCase();
  const tags: { label: string; value: string }[] = [];

  if (/teammate|team|looking for/.test(lower)) tags.push({ label: 'Category', value: 'Teammate' });
  else if (/collaborat|project|build/.test(lower)) tags.push({ label: 'Category', value: 'Collaboration' });
  else if (/opportunity|internship|scholarship/.test(lower)) tags.push({ label: 'Category', value: 'Opportunity' });
  else if (/workshop|session/.test(lower)) tags.push({ label: 'Category', value: 'Workshop' });
  else if (/won|achievement|1st place|award/.test(lower)) tags.push({ label: 'Category', value: 'Achievement' });
  else tags.push({ label: 'Category', value: 'Announcement' });

  const branchKeywords: Record<string, string> = {
    CSE: 'cse|computer science|coding|programming|software',
    ECE: 'ece|electronics|iot|embedded|circuit',
    MECH: 'mech|mechanical|robot|cad|gear',
    CIVIL: 'civil|structure|concrete|building',
    ARCH: 'architecture|design|figma|sketch',
    MGMT: 'management|marketing|startup|pitch',
  };
  let branchFound = 'All GMU';
  for (const [code, pattern] of Object.entries(branchKeywords)) {
    if (new RegExp(pattern).test(lower)) { branchFound = code; break; }
  }
  tags.push({ label: 'Branch', value: branchFound });

  const topicKeywords: [RegExp, string][] = [
    [/ai|ml|machine learning/, 'AI/ML'],
    [/iot|sensor|embedded/, 'IoT'],
    [/robot/, 'Robotics'],
    [/web|react|frontend/, 'Web Dev'],
    [/ui|ux|figma|design/, 'UI/UX'],
    [/cultur|dance|music|fest/, 'Cultural'],
    [/hackathon/, 'Hackathon'],
  ];
  let topic = 'General';
  for (const [re, val] of topicKeywords) {
    if (re.test(lower)) { topic = val; break; }
  }
  tags.push({ label: 'Topic', value: topic });

  return tags;
}

type Intent = 'events_week' | 'find_hackathons' | 'find_scholarships' | 'find_students_skill' | 'opportunities_match' | 'branch_info' | 'register_event' | 'team_build' | 'general_search' | 'greeting' | 'help' | 'unknown';

function detectIntent(query: string): Intent {
  const q = query.toLowerCase().trim();
  if (/^(hi|hello|hey|gm|good)\b/.test(q) && q.length < 20) return 'greeting';
  if (/help|what can you do|how/.test(q) && q.length < 40) return 'help';
  if (/event.*this week|this week.*event|happening this week|what.*happening/.test(q)) return 'events_week';
  if (/hackathon/.test(q) && /find|show|list|ai hackathon/.test(q)) return 'find_hackathons';
  if (/scholarship/.test(q)) return 'find_scholarships';
  if (/student.*know|know.*react|find.*student|who.*know|react developer|frontend dev|ui.?ux.*student/.test(q)) return 'find_students_skill';
  if (/opportunit.*match|match.*skill|what.*opportunit|opportunit.*me|available for me/.test(q)) return 'opportunities_match';
  if (/happening in|what.*in (ece|cse|mech|civil|arch|mgmt|comm)|branch/.test(q)) return 'branch_info';
  if (/register.*mallika|mallika.*register|how.*register/.test(q)) return 'register_event';
  if (/team|teammate|need.*developer|need.*designer|build.*team/.test(q)) return 'team_build';
  if (/find|show|search|list/.test(q)) return 'general_search';
  return 'unknown';
}

function extractSkill(query: string): string | null {
  const q = query.toLowerCase();
  for (const [canonical, aliases] of Object.entries(SKILL_ALIASES)) {
    for (const alias of aliases) {
      if (q.includes(alias)) return canonical;
    }
  }
  return null;
}

function extractBranch(query: string): string | null {
  const q = query.toLowerCase();
  const map: Record<string, string> = { cse: 'CSE', ece: 'ECE', mech: 'MECH', mechanical: 'MECH', civil: 'CIVIL', arch: 'ARCH', architecture: 'ARCH', mgmt: 'MGMT', management: 'MGMT', comm: 'COMM', commerce: 'COMM' };
  for (const [key, code] of Object.entries(map)) {
    if (q.includes(key)) return code;
  }
  return null;
}

export function answerQuery(query: string, user: Student): { content: string; cards?: AssistantCard[] } {
  const intent = detectIntent(query);

  switch (intent) {
    case 'greeting':
      return { content: `Hi ${user.name.split(' ')[0]}! I'm your GMU Nexus assistant. I can help you find events, opportunities, teammates and scholarships. Try asking "What events are happening this week?" or "Find AI hackathons."` };

    case 'help':
      return { content: 'I can help you with:\n• Finding events and hackathons\n• Matching with opportunities for your skills\n• Finding students with specific skills\n• Building teams across branches\n• Scholarships and internships\n• What\'s happening in your branch\n\nJust ask me in natural language!' };

    case 'events_week': {
      const top = recommendEvents(user, 4);
      return {
        content: `Here's what's happening at GMU this week. I found ${top.length} events matched to your interests in ${user.interests.slice(0, 2).join(' and ')}.`,
        cards: top.map((r) => ({ kind: 'event' as const, id: r.event.id, title: r.event.name, subtitle: `${r.event.date} • ${r.event.location}`, match: r.score, meta: r.event.category })),
      };
    }

    case 'find_hackathons': {
      const hackathons = EVENTS.filter((e) => e.category === 'Hackathon');
      const scored = hackathons.map((e) => ({ e, ...matchScoreForEvent(user, e) })).sort((a, b) => b.score - a.score);
      return {
        content: `${scored.length} hackathons found. I ranked them by match to your skills (${user.skills.slice(0, 2).join(', ')}).`,
        cards: scored.map((r) => ({ kind: 'event' as const, id: r.e.id, title: r.e.name, subtitle: `${r.e.date} • ${r.e.location}`, match: r.score, meta: 'Hackathon' })),
      };
    }

    case 'find_scholarships': {
      const scholarships = OPPORTUNITIES.filter((o) => o.type === 'Scholarship');
      const scored = scholarships.map((o) => ({ o, ...matchScoreForOpportunity(user, o) })).sort((a, b) => b.score - a.score);
      return {
        content: `I found ${scored.length} scholarships. You're eligible for most based on your year and branch.`,
        cards: scored.map((r) => ({ kind: 'scholarship' as const, id: r.o.id, title: r.o.title, subtitle: `Deadline ${r.o.deadline} • ${r.o.provider}`, match: r.score })),
      };
    }

    case 'find_students_skill': {
      const skill = extractSkill(query) || 'React';
      const matches = STUDENTS.filter((s) => s.skills.some((sk) => normalizeSkill(sk) === normalizeSkill(skill)))
        .map((s) => ({ s, ...matchScoreForStudent(user, s) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
      return {
        content: `${matches.length} students at GMU know ${skill}. I ranked them by how well they complement your profile.`,
        cards: matches.map((r) => ({ kind: 'student' as const, id: r.s.id, title: r.s.name, subtitle: `${r.s.branchCode} • ${r.s.year} • ${r.s.skills.join(', ')}`, match: r.score })),
      };
    }

    case 'opportunities_match': {
      const top = recommendOpportunities(user, 4);
      return {
        content: `Based on your skills (${user.skills.join(', ')}) and interests, here are the best opportunities for you.`,
        cards: top.map((r) => ({ kind: 'opportunity' as const, id: r.opportunity.id, title: r.opportunity.title, subtitle: `${r.opportunity.type} • Deadline ${r.opportunity.deadline}`, match: r.score, meta: r.opportunity.provider })),
      };
    }

    case 'branch_info': {
      const code = extractBranch(query) || user.branchCode;
      const branchEvents = EVENTS.filter((e) => e.branchCode === code || e.branchCode === 'ALL').slice(0, 4);
      return {
        content: `Here's what's happening in ${code} and events open to your branch.`,
        cards: branchEvents.map((e) => ({ kind: 'event' as const, id: e.id, title: e.name, subtitle: `${e.date} • ${e.location}`, meta: e.category })),
      };
    }

    case 'register_event': {
      const mallika = EVENTS.find((e) => e.name.toLowerCase().includes('mallika'));
      if (mallika) {
        return {
          content: `To register for ${mallika.name}, head to the Events hub and tap Register. It's on ${mallika.date} at ${mallika.location}. Spots are filling up — ${mallika.registered}/${mallika.capacity} already registered.`,
          cards: [{ kind: 'event' as const, id: mallika.id, title: mallika.name, subtitle: `${mallika.date} • ${mallika.location}`, meta: mallika.category }],
        };
      }
      return { content: 'You can register for any event from the Events hub. Tap the Register button on any event card.' };
    }

    case 'team_build': {
      const team = buildTeam(user, query);
      return {
        content: `I analyzed your request and built a recommended team. Team compatibility is ${team.compatibility}%. ${team.reasons.join(' • ')}.`,
        cards: team.members.map((m) => ({ kind: 'team' as const, id: m.student.id, title: m.student.name, subtitle: `${m.role} • ${m.student.skills.join(', ')}`, match: m.score })),
      };
    }

    case 'general_search': {
      const skill = extractSkill(query);
      if (skill) {
        const studentMatches = STUDENTS.filter((s) => s.skills.some((sk) => normalizeSkill(sk) === normalizeSkill(skill))).slice(0, 3);
        const eventMatches = EVENTS.filter((e) => (e.name + e.description).toLowerCase().includes(skill.toLowerCase())).slice(0, 3);
        const oppMatches = OPPORTUNITIES.filter((o) => (o.title + o.description).toLowerCase().includes(skill.toLowerCase())).slice(0, 3);
        const cards: AssistantCard[] = [
          ...studentMatches.map((s) => ({ kind: 'student' as const, id: s.id, title: s.name, subtitle: `${s.branchCode} • ${s.skills.join(', ')}` })),
          ...eventMatches.map((e) => ({ kind: 'event' as const, id: e.id, title: e.name, subtitle: `${e.date} • ${e.location}`, meta: e.category })),
          ...oppMatches.map((o) => ({ kind: 'opportunity' as const, id: o.id, title: o.title, subtitle: `${o.type} • ${o.provider}`, meta: o.deadline })),
        ];
        return { content: `Here's what I found related to ${skill} across students, events and opportunities.`, cards };
      }
      return { content: 'I searched across GMU. Try asking about events, hackathons, scholarships, opportunities, or students with specific skills.' };
    }

    default:
      return { content: `I can help you find events, opportunities, teammates and scholarships across GMU. Try "What events are happening this week?" or "Find students who know React."` };
  }
}

export function searchAll(query: string): {
  students: Student[];
  events: GmuEvent[];
  opportunities: Opportunity[];
  posts: GmuPost[];
} {
  const q = query.toLowerCase().trim();
  if (!q) return { students: [], events: [], opportunities: [], posts: [] };
  const skill = normalizeSkill(q);

  return {
    students: STUDENTS.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.skills.some((sk) => normalizeSkill(sk).toLowerCase().includes(skill.toLowerCase())) ||
      s.interests.some((i) => i.toLowerCase().includes(q)) ||
      s.branchCode.toLowerCase().includes(q)
    ),
    events: EVENTS.filter((e) =>
      e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    ),
    opportunities: OPPORTUNITIES.filter((o) =>
      o.title.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q) ||
      o.type.toLowerCase().includes(q) ||
      o.skillsMatch.some((s) => normalizeSkill(s).toLowerCase().includes(skill.toLowerCase()))
    ),
    posts: POSTS.filter((p) =>
      p.content.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    ),
  };
}
