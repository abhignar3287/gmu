import type { Branch, Student, GmuEvent, Opportunity, GmuPost, AppNotification } from '@/types';

export const DEMO_USER: Student = {
  id: 'u0',
  name: 'Abhigna R',
  avatarColor: '#1d61f0',
  initials: 'AR',
  branch: 'Electronics & Communication',
  branchCode: 'ECE',
  year: '2nd Year',
  skills: ['Python', 'C', 'Basic AI'],
  interests: ['AI', 'Hackathons', 'Cultural Events'],
  projects: ['IoT Smart Plant Monitor', 'Voice Assistant Demo'],
  achievements: ['Dean\'s List 2025', 'Inter-college Coding 3rd Place'],
  lookingFor: 'Hackathon teammates with frontend & UI/UX skills',
  bio: 'ECE student passionate about AI and building things. Always looking to collaborate across branches.',
  hackathons: 2,
  eventsJoined: 5,
};

export const BRANCHES: Branch[] = [
  { id: 'cse', name: 'Computer Science & Engineering', code: 'CSE', color: '#1d61f0', icon: 'Cpu', description: 'Software, AI, systems and everything code.' },
  { id: 'ece', name: 'Electronics & Communication', code: 'ECE', color: '#10b981', icon: 'CircuitBoard', description: 'IoT, embedded, signals and hardware-meets-software.' },
  { id: 'mech', name: 'Mechanical Engineering', code: 'MECH', color: '#f59e0b', icon: 'Cog', description: 'Design, robotics, manufacturing and CAD.' },
  { id: 'civil', name: 'Civil Engineering', code: 'CIVIL', color: '#8b5cf6', icon: 'Building2', description: 'Infrastructure, structures and sustainable design.' },
  { id: 'comm', name: 'Commerce', code: 'COMM', color: '#ef4444', icon: 'Briefcase', description: 'Finance, accounting and business.' },
  { id: 'mgmt', name: 'Management Studies', code: 'MGMT', color: '#0ea5e9', icon: 'LineChart', description: 'Marketing, HR, strategy and leadership.' },
  { id: 'arch', name: 'Architecture', code: 'ARCH', color: '#ec4899', icon: 'Ruler', description: 'Design, planning and spatial creativity.' },
  { id: 'sci', name: 'Basic Sciences', code: 'SCI', color: '#14b8a6', icon: 'Atom', description: 'Physics, chemistry, mathematics and research.' },
];

export const STUDENTS: Student[] = [
  { id: 'u1', name: 'Rahul Sharma', avatarColor: '#1d61f0', initials: 'RS', branch: 'Computer Science & Engineering', branchCode: 'CSE', year: '2nd Year', skills: ['Python', 'AI', 'ML'], interests: ['AI', 'Hackathons', 'Open Source'], projects: ['Resume Parser AI', 'Stock Predictor'], achievements: ['Smart India Hackathon Finalist'], lookingFor: 'Frontend developer for hackathon', bio: 'ML enthusiast building AI tools. Looking to team up for the AI Hackathon.', hackathons: 3, eventsJoined: 7 },
  { id: 'u2', name: 'Aarav Mehta', avatarColor: '#10b981', initials: 'AM', branch: 'Computer Science & Engineering', branchCode: 'CSE', year: '3rd Year', skills: ['React', 'JavaScript', 'Node.js'], interests: ['Web Development', 'Startups'], projects: ['Campus Marketplace', 'Dev Portfolio'], achievements: ['Best Web Project 2024'], lookingFor: 'ML teammate for product idea', bio: 'Full-stack dev who loves shipping. Always up for a hackathon.', hackathons: 5, eventsJoined: 9 },
  { id: 'u3', name: 'Ananya Iyer', avatarColor: '#8b5cf6', initials: 'AI', branch: 'Architecture', branchCode: 'ARCH', year: '2nd Year', skills: ['Figma', 'UI/UX', 'Design Systems'], interests: ['UI/UX', 'Design', 'Cultural Events'], projects: ['Nexus Design System', 'Fest Poster Series'], achievements: ['Design Jam Winner'], lookingFor: 'Developer to build a design portfolio app', bio: 'Designer who bridges aesthetics and usability. Figma is my second language.', hackathons: 1, eventsJoined: 6 },
  { id: 'u4', name: 'Rohan Verma', avatarColor: '#f59e0b', initials: 'RV', branch: 'Management Studies', branchCode: 'MGMT', year: '1st Year', skills: ['Presentation', 'Content', 'Public Speaking'], interests: ['Entrepreneurship', 'Marketing'], projects: ['Startup Pitch Deck', 'Brand Strategy'], achievements: ['Pitch Competition Winner'], lookingFor: 'Tech team for startup idea', bio: 'Presenter & content lead. I turn ideas into stories people remember.', hackathons: 2, eventsJoined: 4 },
  { id: 'u5', name: 'Sneha Reddy', avatarColor: '#ef4444', initials: 'SR', branch: 'Electronics & Communication', branchCode: 'ECE', year: '3rd Year', skills: ['IoT', 'Embedded C', 'Python'], interests: ['IoT', 'Robotics', 'Hardware'], projects: ['Smart Home Hub', 'Auto Drone'], achievements: ['IoT Challenge 1st Place'], lookingFor: 'AI teammate for IoT project', bio: 'Hardware hacker who loves making things move and think.', hackathons: 4, eventsJoined: 8 },
  { id: 'u6', name: 'Karthik Nair', avatarColor: '#0ea5e9', initials: 'KN', branch: 'Mechanical Engineering', branchCode: 'MECH', year: '2nd Year', skills: ['CAD', 'Robotics', 'SolidWorks'], interests: ['Robotics', 'Automotive', 'Design'], projects: ['Robotic Arm', 'Go-Kart Build'], achievements: ['Robo War Semi-Finalist'], lookingFor: 'Programmer for robotics competition', bio: 'Building robots one gear at a time. Mech + code = magic.', hackathons: 3, eventsJoined: 5 },
  { id: 'u7', name: 'Priya Menon', avatarColor: '#14b8a6', initials: 'PM', branch: 'Basic Sciences', branchCode: 'SCI', year: '3rd Year', skills: ['Python', 'Data Analysis', 'Statistics'], interests: ['Research', 'Data Science'], projects: ['Climate Data Study', 'Genomics Pipeline'], achievements: ['Research Paper Published'], lookingFor: 'Developer to visualize research data', bio: 'Data-driven researcher. I find stories in numbers.', hackathons: 1, eventsJoined: 3 },
  { id: 'u8', name: 'Vikram Singh', avatarColor: '#ec4899', initials: 'VS', branch: 'Computer Science & Engineering', branchCode: 'CSE', year: '4th Year', skills: ['Java', 'Spring', 'Cloud'], interests: ['Backend', 'DevOps', 'Mentorship'], projects: ['Campus API Gateway', 'CI/CD Pipeline'], achievements: ['AWS Certified'], lookingFor: 'Mentoring juniors for hackathons', bio: 'Backend senior. I like clean architecture and helping juniors ship.', hackathons: 6, eventsJoined: 12 },
  { id: 'u9', name: 'Divya Joshi', avatarColor: '#f43f5e', initials: 'DJ', branch: 'Commerce', branchCode: 'COMM', year: '2nd Year', skills: ['Finance', 'Excel', 'Business Analysis'], interests: ['Finance', 'Startups', 'Entrepreneurship'], projects: ['Fintech Market Study', 'Investment Tracker'], achievements: ['Finance Olympiad Gold'], lookingFor: 'Developer for fintech hackathon', bio: 'Numbers nerd. I make business cases for tech ideas.', hackathons: 2, eventsJoined: 4 },
  { id: 'u10', name: 'Arjun Rao', avatarColor: '#84cc16', initials: 'AR', branch: 'Electronics & Communication', branchCode: 'ECE', year: '1st Year', skills: ['C', 'Arduino', 'Basic Python'], interests: ['Robotics', 'IoT', 'Music'], projects: ['Line Follower Bot', 'LED Cube'], achievements: ['Fresher Hackathon 2nd'], lookingFor: 'Team for robotics workshop', bio: 'First-year tinkerer. I solder first, ask questions later.', hackathons: 1, eventsJoined: 3 },
  { id: 'u11', name: 'Meera Krishnan', avatarColor: '#a855f7', initials: 'MK', branch: 'Architecture', branchCode: 'ARCH', year: '3rd Year', skills: ['Sketching', '3D Modeling', 'Blender'], interests: ['Design', 'Sustainability', 'Art'], projects: ['Eco House Model', 'Urban Park Plan'], achievements: ['Design Thesis Award'], lookingFor: 'Collaborator for design hackathon', bio: 'I design spaces and stories. Blender + sketchbook = home.', hackathons: 0, eventsJoined: 5 },
  { id: 'u12', name: 'Sai Teja', avatarColor: '#06b6d4', initials: 'ST', branch: 'Computer Science & Engineering', branchCode: 'CSE', year: '2nd Year', skills: ['React', 'Tailwind', 'TypeScript'], interests: ['Web Development', 'UI/UX', 'Open Source'], projects: ['Nexus UI Kit', 'Portfolio Generator'], achievements: ['UI Hack 1st Place'], lookingFor: 'Backend dev for SaaS idea', bio: 'Frontend craftsman. Pixel-perfect or nothing.', hackathons: 4, eventsJoined: 6 },
  { id: 'u13', name: 'Ishita Bose', avatarColor: '#e11d48', initials: 'IB', branch: 'Civil Engineering', branchCode: 'CIVIL', year: '3rd Year', skills: ['AutoCAD', 'Surveying', 'Project Management'], interests: ['Sustainability', 'Infrastructure'], projects: ['Green Building Study', 'Bridge Analysis'], achievements: ['Civil Tech Fest Winner'], lookingFor: 'Data analyst for structural study', bio: 'Building the future, literally. Concrete plans, big dreams.', hackathons: 1, eventsJoined: 4 },
  { id: 'u14', name: 'Nikhil Das', avatarColor: '#7c3aed', initials: 'ND', branch: 'Management Studies', branchCode: 'MGMT', year: '2nd Year', skills: ['Marketing', 'SEO', 'Content'], interests: ['Marketing', 'Branding', 'Startups'], projects: ['Campus Brand Campaign', 'SEO Audit Tool'], achievements: ['Marketing Marathon Winner'], lookingFor: 'Developer for marketing tool', bio: 'Growth-minded marketer. I make things people actually click.', hackathons: 2, eventsJoined: 5 },
  { id: 'u15', name: 'Tanvi Agarwal', avatarColor: '#0d9488', initials: 'TA', branch: 'Computer Science & Engineering', branchCode: 'CSE', year: '1st Year', skills: ['Python', 'Data Structures', 'SQL'], interests: ['AI', 'Competitive Programming'], projects: ['Algo Visualizer', 'SQL Playground'], achievements: ['CodeChef 3-Star'], lookingFor: 'Team for coding competition', bio: 'First-year coder grinding DSA. Bugs fear me.', hackathons: 2, eventsJoined: 3 },
  { id: 'u16', name: 'Yash Pandey', avatarColor: '#f97316', initials: 'YP', branch: 'Mechanical Engineering', branchCode: 'MECH', year: '4th Year', skills: ['Robotics', 'ROS', 'Python'], interests: ['Robotics', 'AI', 'Automotive'], projects: ['Autonomous Rover', 'Drone Swarm'], achievements: ['RoboCon Team Lead'], lookingFor: 'ECE student for sensor integration', bio: 'Senior roboticist. I make metal move with code.', hackathons: 5, eventsJoined: 10 },
  { id: 'u17', name: 'Kavya Sri', avatarColor: '#3b82f6', initials: 'KS', branch: 'Electronics & Communication', branchCode: 'ECE', year: '2nd Year', skills: ['Python', 'Signal Processing', 'MATLAB'], interests: ['AI', 'Research', 'Music'], projects: ['Audio Classifier', 'DSP Toolkit'], achievements: ['IEEE Paper Accepted'], lookingFor: 'ML teammate for audio AI', bio: 'Signals & systems thinker. I find patterns in waves.', hackathons: 1, eventsJoined: 4 },
  { id: 'u18', name: 'Manav Shah', avatarColor: '#16a34a', initials: 'MS', branch: 'Commerce', branchCode: 'COMM', year: '3rd Year', skills: ['Accounting', 'Tally', 'Business Strategy'], interests: ['Entrepreneurship', 'Finance'], projects: ['Startup Financial Model', 'Tax Calculator'], achievements: ['Biz Quiz Champion'], lookingFor: 'Developer for accounting app', bio: 'Future CFO. I make spreadsheets sing.', hackathons: 1, eventsJoined: 3 },
  { id: 'u19', name: 'Ritu Malhotra', avatarColor: '#db2777', initials: 'RM', branch: 'Basic Sciences', branchCode: 'SCI', year: '2nd Year', skills: ['Python', 'Machine Learning', 'NLP'], interests: ['AI', 'NLP', 'Research'], projects: ['Sentiment Analyzer', 'Chatbot Tutor'], achievements: ['Best ML Project 2025'], lookingFor: 'Frontend dev for NLP tool', bio: 'NLP researcher teaching machines to read between the lines.', hackathons: 3, eventsJoined: 6 },
  { id: 'u20', name: 'Aditya Kumar', avatarColor: '#9333ea', initials: 'AK', branch: 'Computer Science & Engineering', branchCode: 'CSE', year: '3rd Year', skills: ['Cloud', 'Kubernetes', 'DevOps'], interests: ['DevOps', 'Cloud', 'Mentorship'], projects: ['Campus Cloud Lab', 'Deploy Bot'], achievements: ['CKA Certified'], lookingFor: 'Team for cloud-native hackathon', bio: 'DevOps wizard. I automate things so you don\'t have to.', hackathons: 4, eventsJoined: 8 },
];

export const EVENTS: GmuEvent[] = [
  { id: 'e1', name: 'Mallika Cultural Fest', category: 'Cultural', organizer: 'GMU Cultural Committee', branch: 'All Branches', branchCode: 'ALL', date: '2026-08-28', time: '5:00 PM', location: 'GMU Main Auditorium', description: 'The biggest cultural celebration of the year — music, dance, drama and food from every branch.', emoji: '🎭', capacity: 800, registered: 612, verified: 'official' },
  { id: 'e2', name: 'AI Hackathon 2026', category: 'Hackathon', organizer: 'CSE Department & Innovation Cell', branch: 'Computer Science & Engineering', branchCode: 'CSE', date: '2026-08-25', time: '9:00 AM', location: 'Innovation Lab', description: '24-hour AI hackathon. Build ML-powered solutions. Open to all branches. Prizes worth ₹50,000.', emoji: '🤖', capacity: 200, registered: 148, verified: 'official' },
  { id: 'e3', name: 'Robotics Workshop', category: 'Workshop', organizer: 'ECE Department', branch: 'Electronics & Communication', branchCode: 'ECE', date: '2026-08-27', time: '10:00 AM', location: 'ECE Lab', description: 'Hands-on workshop on autonomous robots — sensors, motors and ROS basics. No experience needed.', emoji: '⚡', capacity: 60, registered: 41, verified: 'branch' },
  { id: 'e4', name: 'Dance Competition', category: 'Dance', organizer: 'Cultural Committee', branch: 'All Branches', branchCode: 'ALL', date: '2026-08-30', time: '4:00 PM', location: 'Open Auditorium', description: 'Solo and group dance battles across classical, hip-hop and contemporary styles.', emoji: '💃', capacity: 300, registered: 120, verified: 'official' },
  { id: 'e5', name: 'Singing Competition', category: 'Music', organizer: 'Music Club', branch: 'All Branches', branchCode: 'ALL', date: '2026-09-02', time: '5:30 PM', location: 'Main Auditorium', description: 'Find the voice of GMU. Solo performances, live band round and a celebrity judge.', emoji: '🎤', capacity: 250, registered: 88, verified: 'branch' },
  { id: 'e6', name: 'Coding Competition', category: 'Competition', organizer: 'CSE Department', branch: 'Computer Science & Engineering', branchCode: 'CSE', date: '2026-09-05', time: '11:00 AM', location: 'Computer Lab 3', description: 'ICPC-style competitive programming contest. Individual and team tracks.', emoji: '💻', capacity: 120, registered: 76, verified: 'branch' },
  { id: 'e7', name: 'Sports Tournament', category: 'Sports', organizer: 'Sports Committee', branch: 'All Branches', branchCode: 'ALL', date: '2026-09-10', time: '8:00 AM', location: 'GMU Sports Ground', description: 'Cricket, football, badminton and athletics. Branch vs branch glory.', emoji: '🏏', capacity: 400, registered: 210, verified: 'official' },
  { id: 'e8', name: 'Technical Workshop: Cloud 101', category: 'Workshop', organizer: 'CSE Department', branch: 'Computer Science & Engineering', branchCode: 'CSE', date: '2026-09-08', time: '2:00 PM', location: 'Seminar Hall 2', description: 'Intro to AWS, Docker and Kubernetes. Free certification for top performers.', emoji: '☁️', capacity: 80, registered: 52, verified: 'branch' },
  { id: 'e9', name: 'Inter-College AI Challenge', category: 'Hackathon', organizer: 'Innovation Cell', branch: 'All Branches', branchCode: 'ALL', date: '2026-08-30', time: '9:00 AM', location: 'Innovation Lab', description: 'Compete against 12 colleges in an AI challenge. GMU pride is on the line.', emoji: '🏆', capacity: 150, registered: 94, verified: 'official' },
  { id: 'e10', name: 'Robotics Competition', category: 'Competition', organizer: 'Mechanical & ECE Departments', branch: 'Mechanical Engineering', branchCode: 'MECH', date: '2026-09-12', time: '10:00 AM', location: 'Robotics Arena', description: 'Build, battle and race. Robo-war, robo-race and autonomous drone challenges.', emoji: '🦾', capacity: 100, registered: 60, verified: 'branch' },
  { id: 'e11', name: 'Startup Pitch Day', category: 'Academic', organizer: 'Management Studies', branch: 'Management Studies', branchCode: 'MGMT', date: '2026-09-15', time: '3:00 PM', location: 'Auditorium 2', description: 'Pitch your startup to investors and faculty. ₹2L seed grant for the winner.', emoji: '🚀', capacity: 150, registered: 70, verified: 'branch' },
  { id: 'e12', name: 'Design Jam', category: 'Workshop', organizer: 'Architecture Department', branch: 'Architecture', branchCode: 'ARCH', date: '2026-09-18', time: '10:00 AM', location: 'Design Studio', description: 'A 6-hour design sprint. UX, product and spatial design challenges.', emoji: '🎨', capacity: 50, registered: 28, verified: 'branch' },
  { id: 'e13', name: 'Research Symposium', category: 'Academic', organizer: 'Basic Sciences', branch: 'Basic Sciences', branchCode: 'SCI', date: '2026-09-20', time: '9:30 AM', location: 'Conference Hall', description: 'Showcase undergraduate research. Poster sessions and faculty reviews.', emoji: '🔬', capacity: 100, registered: 45, verified: 'branch' },
  { id: 'e14', name: 'Cultural Night', category: 'Cultural', organizer: 'Cultural Committee', branch: 'All Branches', branchCode: 'ALL', date: '2026-09-22', time: '6:00 PM', location: 'Open Auditorium', description: 'An evening of music, drama and food celebrating GMU diversity.', emoji: '🌙', capacity: 500, registered: 180, verified: 'official' },
  { id: 'e15', name: 'Student Innovation Challenge', category: 'Hackathon', organizer: 'Innovation Cell', branch: 'All Branches', branchCode: 'ALL', date: '2026-09-05', time: '9:00 AM', location: 'Innovation Lab', description: 'Open-theme innovation hackathon. Best cross-branch teams get incubation support.', emoji: '💡', capacity: 180, registered: 102, verified: 'official' },
];

export const OPPORTUNITIES: Opportunity[] = [
  { id: 'o1', title: 'Python Developer Intern', type: 'Internship', provider: 'TechNova Labs', branch: 'All Branches', deadline: '2026-09-15', description: '3-month internship building Python automation tools. Remote-friendly. Stipend ₹15,000/mo.', eligibility: ['2nd Year+', 'Python', 'Any branch'], skillsMatch: ['Python'], skillsRecommended: ['Git'], link: '#', verified: 'official' },
  { id: 'o2', title: 'Merit Scholarship 2026', type: 'Scholarship', provider: 'GM University', branch: 'All Branches', deadline: '2026-09-30', description: 'Merit-cum-means scholarship covering 50% tuition for top performers.', eligibility: ['CGPA 8.0+', 'All years', 'All branches'], skillsMatch: [], skillsRecommended: [], link: '#', verified: 'official' },
  { id: 'o3', title: 'AI Research Internship', type: 'Research', provider: 'GMU AI Lab', branch: 'Computer Science & Engineering', deadline: '2026-09-20', description: 'Work with faculty on NLP and computer vision papers. Co-author opportunity.', eligibility: ['3rd Year+', 'Python', 'AI/ML interest'], skillsMatch: ['Python', 'Basic AI'], skillsRecommended: ['Git', 'Statistics'], link: '#', verified: 'branch' },
  { id: 'o4', title: 'Smart India Hackathon', type: 'Hackathon', provider: 'Govt. of India', branch: 'All Branches', deadline: '2026-09-10', description: 'National-level hackathon. Solve real government problem statements. ₹1L prize.', eligibility: ['All years', 'Team of 6', 'Cross-branch encouraged'], skillsMatch: ['Python'], skillsRecommended: ['React', 'UI/UX'], link: '#', verified: 'official' },
  { id: 'o5', title: 'Web Development Certification', type: 'Certification', provider: 'Google', branch: 'All Branches', deadline: '2026-10-01', description: 'Free Google certification in modern web development. Self-paced.', eligibility: ['All years', 'Any branch'], skillsMatch: [], skillsRecommended: ['React', 'JavaScript'], link: '#', verified: 'official' },
  { id: 'o6', title: 'IoT Innovation Competition', type: 'Competition', provider: 'ECE Department', branch: 'Electronics & Communication', branchCode: 'ECE', deadline: '2026-09-18', description: 'Build an IoT solution for smart campus. Top 3 teams get incubation.', eligibility: ['ECE/CSE', '2nd Year+', 'Team of 3-4'], skillsMatch: ['Python', 'C'], skillsRecommended: ['IoT', 'Embedded C'], link: '#', verified: 'branch' },
  { id: 'o7', title: 'Startup Incubation Program', type: 'Startup', provider: 'GMU Innovation Cell', branch: 'All Branches', deadline: '2026-09-25', description: '6-month incubation with mentorship, workspace and ₹50K seed grant.', eligibility: ['All years', 'Team of 2-5', 'Working prototype'], skillsMatch: [], skillsRecommended: ['Presentation', 'Content'], link: '#', verified: 'official' },
  { id: 'o8', title: 'Data Science Workshop', type: 'Workshop', provider: 'Basic Sciences', branch: 'All Branches', deadline: '2026-09-12', description: '3-day intensive on pandas, visualization and ML basics. Certificate on completion.', eligibility: ['All years', 'Basic Python'], skillsMatch: ['Python'], skillsRecommended: ['Statistics'], link: '#', verified: 'branch' },
  { id: 'o9', title: 'UI/UX Design Internship', type: 'Internship', provider: 'PixelForge Studio', branch: 'All Branches', deadline: '2026-09-22', description: 'Design internship for a SaaS product. Figma required. Portfolio bonus.', eligibility: ['2nd Year+', 'Figma', 'Any branch'], skillsMatch: [], skillsRecommended: ['Figma', 'UI/UX'], link: '#', verified: 'official' },
  { id: 'o10', title: 'Robotics Research Grant', type: 'Research', provider: 'Mechanical Engineering', branch: 'Mechanical Engineering', branchCode: 'MECH', deadline: '2026-10-05', description: '₹25K grant for undergraduate robotics research projects.', eligibility: ['MECH/ECE', '2nd Year+', 'Faculty mentor'], skillsMatch: [], skillsRecommended: ['Robotics', 'CAD'], link: '#', verified: 'branch' },
];

export const POSTS: GmuPost[] = [
  {
    id: 'p1', authorId: 'u5', authorName: 'Sneha Reddy', authorInitials: 'SR', authorColor: '#ef4444', authorBranch: 'ECE', authorYear: '3rd Year',
    category: 'Looking for Teammate', content: 'We are building an IoT project for the Smart Campus competition and need someone experienced in AI to add intelligence to our sensor data. Open to CSE/AI students!', tags: ['IoT', 'AI', 'CrossBranch'], branch: 'Electronics & Communication', verified: 'student', createdAt: '2h ago', likes: 24, comments: 5,
    aiTags: [{ label: 'Category', value: 'Teammate' }, { label: 'Branch', value: 'ECE' }, { label: 'Topic', value: 'IoT + AI' }, { label: 'Audience', value: 'CSE/AI students' }],
  },
  {
    id: 'p2', authorId: 'u6', authorName: 'Karthik Nair', authorInitials: 'KN', authorColor: '#0ea5e9', authorBranch: 'MECH', authorYear: '2nd Year',
    category: 'Project Collaboration', content: 'Looking for a UI/UX student for our hackathon project. We have the hardware and code, need someone to make the app look great. Designers from any branch welcome!', tags: ['Hackathon', 'UIUX', 'CrossBranch'], branch: 'Mechanical Engineering', verified: 'student', createdAt: '5h ago', likes: 18, comments: 3,
    aiTags: [{ label: 'Category', value: 'Collaboration' }, { label: 'Branch', value: 'MECH' }, { label: 'Topic', value: 'UI/UX' }, { label: 'Audience', value: 'Design students' }],
  },
  {
    id: 'p3', authorId: 'u8', authorName: 'Vikram Singh', authorInitials: 'VS', authorColor: '#ec4899', authorBranch: 'CSE', authorYear: '4th Year',
    category: 'Announcement', content: 'Mentorship sessions open! I am hosting a 1-hour session on building scalable APIs for hackathon projects. DM to reserve a spot.', tags: ['Mentorship', 'Backend', 'Hackathon'], branch: 'Computer Science & Engineering', verified: 'student', createdAt: '8h ago', likes: 41, comments: 12,
    aiTags: [{ label: 'Category', value: 'Announcement' }, { label: 'Branch', value: 'CSE' }, { label: 'Topic', value: 'Backend' }, { label: 'Audience', value: 'Hackathon participants' }],
  },
  {
    id: 'p4', authorId: 'u2', authorName: 'Aarav Mehta', authorInitials: 'AM', authorColor: '#10b981', authorBranch: 'CSE', authorYear: '3rd Year',
    category: 'Achievement', content: 'Our team won 1st place at the Inter-College Web Hackathon! Huge thanks to my cross-branch teammates from ECE and MGMT. GMU represents!', tags: ['Achievement', 'WebDev', 'Hackathon'], branch: 'Computer Science & Engineering', verified: 'student', createdAt: '1d ago', likes: 87, comments: 15,
    aiTags: [{ label: 'Category', value: 'Achievement' }, { label: 'Branch', value: 'CSE' }, { label: 'Topic', value: 'Web Dev' }, { label: 'Audience', value: 'All GMU' }],
  },
  {
    id: 'p5', authorId: 'u4', authorName: 'Rohan Verma', authorInitials: 'RV', authorColor: '#f59e0b', authorBranch: 'MGMT', authorYear: '1st Year',
    category: 'Sharing Opportunity', content: 'Found a great startup internship portal for students. Sharing in case anyone from tech wants to team up with a management student to apply together.', tags: ['Startup', 'Internship', 'CrossBranch'], branch: 'Management Studies', verified: 'student', createdAt: '1d ago', likes: 22, comments: 4,
    aiTags: [{ label: 'Category', value: 'Opportunity' }, { label: 'Branch', value: 'MGMT' }, { label: 'Topic', value: 'Startup' }, { label: 'Audience', value: 'Tech + MGMT' }],
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', type: 'event', title: 'New AI Hackathon announced', body: 'AI Hackathon 2026 — 25 August at the Innovation Lab. 96% match for your skills.', time: '10m ago', read: false },
  { id: 'n2', type: 'match', title: 'You have a 94% team match', body: 'Rahul, Aarav and Ananya complement your skills for an AI project.', time: '1h ago', read: false },
  { id: 'n3', type: 'branch', title: 'ECE branch posted a new event', body: 'Robotics Workshop on 27 August at the ECE Lab.', time: '3h ago', read: false },
  { id: 'n4', type: 'scholarship', title: 'Scholarship deadline in 3 days', body: 'Merit Scholarship 2026 closes 30 September. You are eligible.', time: '5h ago', read: true },
  { id: 'n5', type: 'registration', title: 'Mallika registration is open', body: 'The biggest cultural fest of the year. Register before spots fill up.', time: '1d ago', read: true },
  { id: 'n6', type: 'connection', title: 'Rahul accepted your connection request', body: 'You can now message Rahul and invite them to a team.', time: '1d ago', read: true },
];

export const ALL_SKILLS = [
  'Python', 'C', 'Java', 'JavaScript', 'React', 'Node.js', 'TypeScript', 'Tailwind',
  'AI', 'ML', 'Basic AI', 'NLP', 'Data Analysis', 'Statistics', 'SQL',
  'Figma', 'UI/UX', 'Design Systems', 'Sketching', '3D Modeling', 'Blender',
  'Robotics', 'IoT', 'Embedded C', 'Arduino', 'CAD', 'SolidWorks', 'ROS',
  'Cloud', 'Kubernetes', 'DevOps', 'Git',
  'Presentation', 'Content', 'Public Speaking', 'Marketing', 'SEO',
  'Finance', 'Accounting', 'Business Analysis', 'Project Management',
  'AutoCAD', 'Surveying', 'Signal Processing', 'MATLAB',
];

export const ALL_INTERESTS = [
  'AI', 'ML', 'Hackathons', 'Web Development', 'UI/UX', 'Design', 'Robotics', 'IoT',
  'Cultural Events', 'Music', 'Dance', 'Sports', 'Startups', 'Entrepreneurship',
  'Research', 'Data Science', 'NLP', 'Open Source', 'Mentorship', 'Sustainability',
  'Automotive', 'Cloud', 'DevOps', 'Finance', 'Marketing', 'Branding',
];
