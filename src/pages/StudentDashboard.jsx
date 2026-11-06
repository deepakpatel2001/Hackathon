import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  Sparkles,
  Award,
  CreditCard,
  Bot,
  BookOpen,
  Mail,
  Bell,
  HelpCircle,
  User,
  LogOut,
  Upload,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Search,
  Menu,
  X,
  Code2,
  Trophy,
  Users,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  FileText,
  Share2,
  Download,
  AlertCircle,
  ShieldCheck,
  Check,
  Plus,
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function StudentDashboard({ navigate, currentUser }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEventHub, setSelectedEventHub] = useState(null);

  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    return (
      currentUser || {
        name: 'Piyush sen',
        email: 'piyush.sencse2025@indoreinstitute.com',
        role: 'STUDENT',
        campusId: 'CC-ZZW4VY',
        university: 'Indore Institute of Science and Technology',
        bio: '—',
        skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/piyushsen',
        linkedin: 'https://linkedin.com/in/piyushsen',
      }
    );
  });

  // Profile Edit State
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: user.name,
    university: user.university || 'Indore Institute of Science and Technology',
    bio: user.bio === '—' ? '' : (user.bio || ''),
    skills: user.skills ? (Array.isArray(user.skills) ? user.skills.join(', ') : user.skills) : 'React, Node.js, MongoDB, Express.js, HTML, CSS, JavaScript',
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Round 2 Submission Window Open',
      desc: 'Prototype upload is live for AI Innovation 2026. Deadline in 18 hours.',
      time: '10m ago',
      unread: true,
      category: 'EVENT',
    },
    {
      id: 2,
      title: 'Mentor Feedback Received',
      desc: 'Reviewer #04 left architecture recommendations on your submission.',
      time: '1h ago',
      unread: true,
      category: 'FEEDBACK',
    },
    {
      id: 3,
      title: 'Team Member Joined',
      desc: 'Kabir Sharma accepted your invitation to join Team NeuralShift.',
      time: '5h ago',
      unread: false,
      category: 'TEAM',
    },
    {
      id: 4,
      title: 'Winner Certificate Verified',
      desc: 'Your certificate CC-2026-WIN is now cryptographically verified on-chain.',
      time: '1d ago',
      unread: false,
      category: 'CERTIFICATE',
    },
  ]);
  const [notifFilter, setNotifFilter] = useState('all');

  // IdeaCheck AI State
  const [ideaText, setIdeaText] = useState('');
  const [ideaAnalyzing, setIdeaAnalyzing] = useState(false);
  const [ideaResult, setIdeaResult] = useState(null);

  // RuleBot AI Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am RuleBot AI. Ask me anything about CampusCode hackathon rules, submission requirements, team sizes, or evaluation guidelines.",
      time: '10:00 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // HackMate Teammate Finder State
  const [mateSearch, setMateSearch] = useState('');
  const [mateRoleFilter, setMateRoleFilter] = useState('ALL');
  const [invitedMates, setInvitedMates] = useState(new Set());

  // Support Ticket Form State
  const [supportCategory, setSupportCategory] = useState('Submission Issue');
  const [supportMessage, setSupportMessage] = useState('');

  // Submission State in Overview & EventHub
  const [submittedFile, setSubmittedFile] = useState(null);
  const [repoUrl, setRepoUrl] = useState('https://github.com/neuralshift/ai-arena-prototype');
  const [liveUrl, setLiveUrl] = useState('https://neuralshift-ai.vercel.app');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Events Filter & Data State
  const [eventsFilter, setEventsFilter] = useState('All events');
  const [eventsList, setEventsList] = useState([
    {
      id: 'e2798ce3-a1b5-4806-9147-4d9f10c52ef1',
      title: "ReBuild '26",
      avatarCode: 'RE',
      avatarColor: 'green',
      cat: 'hackathons',
      deadline: 'Nov 06, 2026',
      status: 'LIVE',
      mode: '—',
      teamSize: 'Individual',
      start: 'Nov 06, 2026',
      desc: "ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1 (Friday, 6 Nov, morning to 10 PM): Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2 (Saturday, 7 Nov, top performers from Round 1 only): Build a complete new UI in CampusCode's vibe. Frontend only, mock data is fine. No presentation round. Prizes: Winner certificate + CampusCode internship with ₹15,000 stipend, runner-up certificate, and participation certificates for all. Sunday, 8 Nov (Diwali) is free. This is a paid event (₹50 on Unstop). Paid students receive an invite code — enter it when you join this event on the portal.",
      joined: true,
      regCode: 'd3e0c40c-5064-4ada-ae4a-0f2575478931',
      team: 'Xargon Dev',
    },
    {
      id: '20084c70-4792-4b89-a2e9-ff6764bf20d6',
      title: "FirstCommit '26 Quiz Competition 2.0",
      avatarCode: 'FQ',
      avatarColor: 'green',
      cat: 'quizzes',
      subMode: 'QUIZ • SOLO • TIMED',
      deadline: 'Completed',
      status: 'COMPLETED',
      mode: '—',
      teamSize: 'Solo',
      start: '—',
      desc: "This is the reattempt quiz those who missed",
      joined: false,
      regCode: '20084c70-4792-4b89-a2e9-ff6764bf20d6',
      team: 'NOT ASSIGNED',
    },
    {
      id: '80299fc1-3e30-466f-a148-fd45c77c84be',
      title: "FirstCommit '26 Quiz Competition",
      avatarCode: 'FQ',
      avatarColor: 'dark',
      cat: 'quizzes',
      subMode: 'QUIZ • SOLO • TIMED',
      deadline: 'Completed',
      status: 'COMPLETED',
      mode: '—',
      teamSize: 'Solo',
      start: '—',
      desc: "The quiz features 50 questions across technology, AI, and engineering — 42 multiple-choice questions and 8 true/false questions — to be completed in 30 minutes on Sunday, 1 November 2026. It is conducted online on the CampusCode platform, and every participant gets a single attempt.",
      joined: true,
      regCode: '3910a2de-0a9f-41b5-a3ab-b13e67325631',
      team: 'NOT ASSIGNED',
    },
  ]);

  // FAQ Accordion State for Student Guide
  const [openFaq, setOpenFaq] = useState(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Events', icon: Calendar },
    { name: 'My Events', icon: Briefcase },
    { name: 'HackMate AI', icon: Sparkles },
    { name: 'IdeaCheck AI', icon: Code2 },
    { name: 'Certificates', icon: Award },
    { name: 'Digital Card', icon: CreditCard },
    { name: 'RuleBot AI', icon: Bot },
    { name: 'Student Guide', icon: BookOpen },
    { name: 'Official Communication', icon: Mail },
    { name: 'Notifications', icon: Bell, badge: unreadCount },
    { name: 'Help & Support', icon: HelpCircle },
    { name: 'Profile', icon: User },
  ];

  const handleTabChange = (name) => {
    setActiveTab(name);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    addToast('Logged out successfully');
    navigate('/login');
  };

  // RuleBot chat response handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time }]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      let reply = "All submissions must be original work created during the hackathon timeline. Pre-existing open source libraries are allowed, but the core implementation must be newly authored.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('team') || lower.includes('size')) {
        reply = "Teams can have 1 to 4 members. You can find teammates in the HackMate AI section.";
      } else if (lower.includes('deadline') || lower.includes('round 2') || lower.includes('submission')) {
        reply = "Round 2 prototype submission requires a GitHub repository link, optional deployed demo URL, and architecture summary. The deadline is tomorrow at 6:00 PM IST.";
      } else if (lower.includes('certificate') || lower.includes('verify')) {
        reply = "Every participant who submits all required rounds receives a verifiable digital certificate accessible in the Certificates tab.";
      } else if (lower.includes('plagiarism') || lower.includes('ai')) {
        reply = "Using AI tools like Copilot/ChatGPT is permitted for drafting, but code similarity checks are run by IdeaCheck AI. Plagiarized code from other teams results in immediate disqualification.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  // HackMate candidate data
  const candidates = [
    {
      id: 'm1',
      name: 'Priya Nair',
      role: 'UI/UX & Frontend',
      college: 'IIT Madras',
      skills: ['Figma', 'Next.js', 'Tailwind', 'Three.js'],
      status: 'AVAILABLE',
      rating: '98%',
    },
    {
      id: 'm2',
      name: 'Rohan Varma',
      role: 'AI / ML Engineer',
      college: 'Anna University',
      skills: ['PyTorch', 'FastAPI', 'LangChain', 'HuggingFace'],
      status: 'AVAILABLE',
      rating: '95%',
    },
    {
      id: 'm3',
      name: 'Sneha Patel',
      role: 'Backend & Cloud',
      college: 'SRM University',
      skills: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
      status: 'AVAILABLE',
      rating: '92%',
    },
    {
      id: 'm4',
      name: 'Karthik Raja',
      role: 'Fullstack Web',
      college: 'Vellore Institute of Technology',
      skills: ['Node.js', 'React', 'MongoDB', 'Redis'],
      status: 'AVAILABLE',
      rating: '94%',
    },
  ];

  return (
    <div className="student-panel" style={{ minHeight: '100vh', display: 'flex', background: '#f7f7f4' }}>
      {/* ---------------- SIDEBAR (EXACT 1:1 MATCH TO CAMPUSCODE) ---------------- */}
      <aside
        className={`student-sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: 240,
          background: '#fff',
          borderRight: '1px solid #deded8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50,
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Logo Header */}
          <div style={{ padding: '20px 22px 18px 22px', borderBottom: '1px solid #f0f0ec' }}>
            <button
              type="button"
              className="landing-logo"
              onClick={() => handleTabChange('Overview')}
              style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span className="landing-logo-mark" aria-hidden="true" style={{ display: 'flex', gap: 3 }}>
                <span style={{ width: 3, height: 18, background: '#111', transform: 'skewX(-17deg)', display: 'block' }}></span>
                <span style={{ width: 3, height: 18, background: '#7665ff', transform: 'skewX(-17deg)', display: 'block' }}></span>
                <span style={{ width: 3, height: 18, background: '#a8e62e', transform: 'skewX(-17deg)', display: 'block' }}></span>
              </span>
              <span style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <strong style={{ display: 'block', fontSize: 13, fontWeight: 900, letterSpacing: -0.2, color: '#111' }}>CAMPUSCODE</strong>
                <small style={{ display: 'block', fontFamily: 'DM Mono', fontSize: 8.5, color: '#888', letterSpacing: 0.8 }}>HACKATHON ARENA</small>
              </span>
            </button>
          </div>

          {/* WORKSPACE Tag */}
          <div style={{ padding: '16px 20px 6px 20px' }}>
            <span style={{ fontSize: 9.5, fontFamily: 'DM Mono', letterSpacing: 1.5, color: '#888', fontWeight: 700 }}>WORKSPACE</span>
          </div>

          {/* Nav List */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleTabChange(item.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8.5px 12px',
                    borderRadius: 6,
                    border: 'none',
                    background: isActive ? '#a8e62e' : 'transparent',
                    color: isActive ? '#111' : '#444',
                    fontSize: 12,
                    fontWeight: isActive ? 800 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.12s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <Icon size={14} color={isActive ? '#111' : '#666'} />
                    <span>{item.name}</span>
                    {item.name === 'RuleBot AI' && (
                      <span style={{ background: isActive ? '#111' : '#eff6ff', color: isActive ? '#a8e62e' : '#6366f1', fontSize: 8.5, fontFamily: 'DM Mono', fontWeight: 800, padding: '1px 4px', borderRadius: 3 }}>AI</span>
                    )}
                  </div>
                  {isActive ? (
                    <span style={{ fontSize: 12, fontWeight: 900, color: '#111' }}>—</span>
                  ) : item.badge && item.badge > 0 ? (
                    <span style={{ background: '#a8e62e', color: '#111', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 10 }}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ACCOUNT Section at bottom of sidebar */}
        <div style={{ padding: '14px 16px 20px 16px', borderTop: '1px solid #f0f0ec' }}>
          <span style={{ fontSize: 9.5, fontFamily: 'DM Mono', letterSpacing: 1.5, color: '#888', fontWeight: 700, display: 'block', marginBottom: 8 }}>ACCOUNT</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0f0ec', border: '1px solid #deded8', color: '#111', fontWeight: 800, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              PS
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#111' }}>Piyush sen</strong>
              <small style={{ display: 'block', fontFamily: 'DM Mono', fontSize: 9, color: '#888' }}>STUDENT</small>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '7px 12px',
              background: '#fff',
              border: '1px solid #deded8',
              borderRadius: 6,
              fontFamily: 'DM Mono',
              fontSize: 10.5,
              fontWeight: 700,
              color: '#222',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <LogOut size={13} />
            <span>LOG OUT</span>
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN WRAPPER: TOPBAR + VIEW CANVAS ---------------- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* TOPBAR (EXACT 1:1 TO SCREENSHOTS) */}
        <header
          style={{
            height: 64,
            background: '#fff',
            borderBottom: '1px solid #deded8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 36px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'DM Mono', fontSize: '9.5px', letterSpacing: '1.4px', color: '#888', textTransform: 'uppercase' }}>
              CAMPUSCODE / STUDENT
            </span>
            <span style={{ fontSize: '13.5px', fontWeight: 800, letterSpacing: '-0.2px', color: '#111', textTransform: 'uppercase', marginTop: '1px' }}>
              {activeTab.toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Notification bell with badge 1 */}
            <button
              type="button"
              onClick={() => handleTabChange('Notifications')}
              style={{
                position: 'relative',
                width: 34,
                height: 34,
                borderRadius: 6,
                background: '#fff',
                border: '1px solid #deded8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#333',
              }}
              title="Notifications"
            >
              <Bell size={15} />
              <span style={{
                position: 'absolute',
                top: -3,
                right: -3,
                background: '#a8e62e',
                color: '#111',
                fontSize: '8.5px',
                fontWeight: 800,
                width: 14,
                height: 14,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>1</span>
            </button>

            {/* REFRESH Button */}
            <button
              type="button"
              onClick={() => {
                addToast('Data refreshed from backend', 'success');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                background: '#fff',
                border: '1px solid #deded8',
                borderRadius: 6,
                fontFamily: 'DM Mono',
                fontSize: 11,
                fontWeight: 700,
                color: '#111',
                cursor: 'pointer',
              }}
            >
              <Clock size={13} />
              <span>REFRESH</span>
            </button>

            {/* User Pill: Avatar + Piyush sen */}
            <div
              onClick={() => handleTabChange('Profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px 4px 6px',
                background: '#fff',
                border: '1px solid #deded8',
                borderRadius: 30,
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#c5e89b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
              }}>
                🧑‍💻
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>Piyush sen</span>
            </div>
          </div>
        </header>

        {/* MAIN VIEW AREA */}
        <main
          className="student-main"
          style={{
            flex: 1,
            background: 'var(--bg, #f7f7f4)',
            padding: '32px 36px',
            overflowY: 'visible',
          }}
        >
          {/* ========================================================
              TAB: OVERVIEW
             ======================================================== */}
          {activeTab === 'Overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* HERO GREETING */}
              <div
                className="student-hero"
                style={{
                  background: '#111',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ zIndex: 2 }}>
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      letterSpacing: 1.5,
                      color: '#a8e62e',
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    CAMPUSCODE / STUDENT ARENA / 2026
                  </span>
                  <h1 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
                    WELCOME BACK, {user.name.toUpperCase()}.
                  </h1>
                  <p style={{ color: '#aaa', fontSize: 13, margin: '0 0 20px 0', maxWidth: 480 }}>
                    You have 1 active submission in progress for the AI Innovation Hackathon. Round 2 ends in 18 hours.
                  </p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      type="button"
                      className="hero-explore"
                      style={{
                        background: '#a8e62e',
                        color: '#111',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                      onClick={() => handleTabChange('Events')}
                    >
                      <span>EXPLORE ARENA</span>
                      <b>↗</b>
                    </button>
                    <button
                      type="button"
                      style={{
                        background: 'transparent',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '10px 18px',
                        borderRadius: 6,
                        fontFamily: 'DM Mono',
                        fontSize: 11,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleTabChange('Digital Card')}
                    >
                      CAMPUS ID CARD
                    </button>
                  </div>
                </div>

                <div
                  className="student-hero-mark"
                  style={{
                    position: 'absolute',
                    right: 40,
                    opacity: 0.1,
                    fontSize: 140,
                    fontWeight: 900,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  CC
                </div>
              </div>

              {/* STATS GRID */}
              <div
                className="student-stats-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                }}
              >
                {[
                  { label: 'HACKATHONS JOINED', val: '03', sub: '2 Live · 1 Finished', color: '#111' },
                  { label: 'PROJECTS SHIPPED', val: '05', sub: '100% On-time submission', color: '#7665ff' },
                  { label: 'ARENA SCORE', val: '1,480', sub: 'Top 5% of Chennai Zone', color: '#82b91a' },
                  { label: 'CERTIFICATES', val: '02', sub: 'Verified On-chain', color: '#111' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="student-stat-card"
                    style={{
                      background: '#fff',
                      padding: 20,
                      borderRadius: 10,
                      border: '1px solid #deded8',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Mono',
                        fontSize: 9,
                        letterSpacing: 1,
                        color: '#858580',
                        display: 'block',
                        marginBottom: 6,
                      }}
                    >
                      {stat.label}
                    </span>
                    <strong style={{ fontSize: 26, fontWeight: 900, color: stat.color, display: 'block', marginBottom: 4 }}>
                      {stat.val}
                    </strong>
                    <span style={{ fontSize: 11, color: '#666' }}>{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* TWO COLUMN ROW: LIVE ROUND & LEADERBOARD */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
                {/* LIVE ROUND PANEL */}
                <div
                  className="student-panel-card"
                  style={{
                    background: '#fff',
                    borderRadius: 10,
                    padding: 24,
                    border: '1px solid #deded8',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#82b91a', fontWeight: 700 }}>
                        ACTIVE ROUND
                      </span>
                      <h3 style={{ margin: '4px 0 0 0', fontSize: 18, fontWeight: 800 }}>
                        Round 2: Architecture & Prototype
                      </h3>
                    </div>
                    <span
                      style={{
                        background: 'rgba(168, 230, 46, 0.15)',
                        color: '#82b91a',
                        fontSize: 11,
                        fontFamily: 'DM Mono',
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Clock size={12} /> 18h 42m
                    </span>
                  </div>

                  <p style={{ fontSize: 13, color: '#4f4f4b', lineHeight: 1.5, marginBottom: 20 }}>
                    Submit your GitHub repo or deployed demo link along with the architecture diagram.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmissionSuccess(true);
                      addToast('Prototype submission updated for Round 2!', 'success');
                    }}
                  >
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#858580', display: 'block', marginBottom: 4 }}>
                        GITHUB REPOSITORY URL
                      </label>
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/..."
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #deded8',
                          borderRadius: 6,
                          fontSize: 12,
                          fontFamily: 'Inter',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#858580', display: 'block', marginBottom: 4 }}>
                        LIVE DEPLOYED PREVIEW (OPTIONAL)
                      </label>
                      <input
                        type="url"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://your-demo.vercel.app"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #deded8',
                          borderRadius: 6,
                          fontSize: 12,
                          fontFamily: 'Inter',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="student-primary-btn"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <span>{submissionSuccess ? 'SUBMISSION SAVED ✓' : 'SAVE MILESTONE SUBMISSION'}</span>
                      <b>↗</b>
                    </button>
                  </form>
                </div>

                {/* LEADERBOARD & TEAM */}
                <div
                  className="student-panel-card"
                  style={{
                    background: '#fff',
                    borderRadius: 10,
                    padding: 24,
                    border: '1px solid #deded8',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Arena Leaderboard</h3>
                    <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580' }}>ZONE CHENNAI</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { rank: '01', team: 'Team NeuralShift (You)', score: '984 pts', status: 'Passed R1' },
                      { rank: '02', team: 'QuantumByte', score: '952 pts', status: 'Passed R1' },
                      { rank: '03', team: 'CodeCraft IITM', score: '920 pts', status: 'Passed R1' },
                      { rank: '04', team: 'Veloce Labs', score: '886 pts', status: 'Under Review' },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: idx === 0 ? 'rgba(168, 230, 46, 0.1)' : '#f7f7f4',
                          borderRadius: 6,
                          border: idx === 0 ? '1px solid #a8e62e' : '1px solid transparent',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontFamily: 'DM Mono', fontSize: 12, fontWeight: 800, color: idx === 0 ? '#82b91a' : '#888' }}>
                            {row.rank}
                          </span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>
                            {row.team}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 12, fontFamily: 'DM Mono', color: '#111', fontWeight: 700 }}>
                            {row.score}
                          </span>
                          <span style={{ fontSize: 10, color: idx === 0 ? '#82b91a' : '#888' }}>
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: EVENTS (EXPLORE ARENA)
             ======================================================== */}
          {activeTab === 'Events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                    CAMPUSCODE / CHALLENGES
                  </span>
                  <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>HACKATHON ARENA</h1>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['All', 'Live Now', 'Upcoming'].map((fil) => (
                    <button
                      key={fil}
                      type="button"
                      onClick={() => setEventsFilter(fil)}
                      style={{
                        padding: '6px 14px',
                        background: eventsFilter === fil ? '#111' : '#fff',
                        color: eventsFilter === fil ? '#fff' : '#666',
                        borderRadius: 20,
                        border: '1px solid #deded8',
                        fontFamily: 'DM Mono',
                        fontSize: 10,
                        cursor: 'pointer',
                        fontWeight: eventsFilter === fil ? 700 : 500,
                      }}
                    >
                      {fil}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {eventsList
                  .filter((ev) => {
                    if (eventsFilter === 'Live Now') return ev.status === 'LIVE';
                    if (eventsFilter === 'Upcoming') return ev.status === 'UPCOMING' || ev.status === 'OPEN';
                    return true;
                  })
                  .map((ev) => (
                    <div
                      key={ev.id}
                      className="step-card"
                      style={{
                        background: '#fff',
                        borderRadius: 10,
                        padding: 24,
                        border: '1px solid #deded8',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <span style={{ fontFamily: 'DM Mono', fontSize: 9, color: '#858580', letterSpacing: 1 }}>
                            {ev.cat}
                          </span>
                          <span
                            style={{
                              fontSize: 10,
                              fontFamily: 'DM Mono',
                              fontWeight: 700,
                              color: ev.status === 'LIVE' ? '#82b91a' : '#7665ff',
                            }}
                          >
                            ● {ev.status}
                          </span>
                        </div>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: 18, fontWeight: 800 }}>{ev.title}</h3>
                        <p style={{ fontSize: 13, color: '#4f4f4b', lineHeight: 1.5, marginBottom: 20 }}>
                          {ev.desc}
                        </p>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #f0f0ec', borderBottom: '1px solid #f0f0ec', marginBottom: 16 }}>
                          <div>
                            <small style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#888', display: 'block' }}>PRIZE</small>
                            <strong style={{ fontSize: 14, color: '#82b91a' }}>{ev.prize}</strong>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <small style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#888', display: 'block' }}>TIMELINE</small>
                            <strong style={{ fontSize: 12, color: '#111' }}>{ev.deadline}</strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="hero-explore"
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: ev.joined ? '#82b91a' : '#111',
                            color: ev.joined ? '#111' : '#fff',
                            border: 'none',
                            borderRadius: 6,
                            fontWeight: 700,
                            fontSize: 11,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                          }}
                          onClick={() => {
                            if (ev.joined) {
                              setSelectedEventHub(ev);
                              setActiveTab('My Events');
                            } else {
                              setEventsList((prev) =>
                                prev.map((item) => (item.id === ev.id ? { ...item, joined: true } : item))
                              );
                              addToast(`Registered team for ${ev.title}!`, 'success');
                            }
                          }}
                        >
                          <span>{ev.joined ? 'VIEW IN MY EVENTS' : 'REGISTER TEAM'}</span>
                          <b>↗</b>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: MY EVENTS
             ======================================================== */}
          {activeTab === 'My Events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                  MY ACTIVITY / ACTIVE WORKSPACE
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>MY JOINED EVENTS</h1>
                <p style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
                  Every event you joined in one place. Open your workspace to track rounds, team members and project submissions.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
                {eventsList
                  .filter((item) => item.joined)
                  .map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: '#fff',
                        borderRadius: 10,
                        padding: 24,
                        border: '1px solid #deded8',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 800, color: '#82b91a', background: 'rgba(168, 230, 46, 0.15)', padding: '2px 8px', borderRadius: 4 }}>
                          {item.status || 'LIVE'}
                        </span>
                        <span style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#888' }}>
                          {item.deadline}
                        </span>
                      </div>

                      <h3 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 800 }}>{item.title}</h3>
                      <div style={{ fontSize: 12, color: '#7665ff', fontWeight: 700, marginBottom: 14 }}>
                        {item.team} ({item.members?.length || 1} members)
                      </div>

                      <div style={{ background: '#f7f7f4', padding: 12, borderRadius: 6, marginBottom: 16 }}>
                        <small style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#888', display: 'block' }}>CURRENT MILESTONE</small>
                        <strong style={{ fontSize: 13, color: '#111' }}>{item.round}</strong>
                        <span style={{ display: 'block', fontSize: 11, color: '#82b91a', marginTop: 4 }}>
                          ✓ SUBMISSION OPEN
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          type="button"
                          className="hero-explore"
                          style={{
                            flex: 1,
                            padding: '10px 14px',
                            background: '#111',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            fontWeight: 700,
                            fontSize: 11,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                          }}
                          onClick={() => {
                            setSelectedEventHub(item);
                            addToast(`Switched workspace to ${item.title}`);
                            setActiveTab('Overview');
                          }}
                        >
                          <span>OPEN EVENT WORKSPACE</span>
                          <b>↗</b>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: HACKMATE AI (TEAMMATE FINDER)
             ======================================================== */}
          {activeTab === 'HackMate AI' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#7665ff', letterSpacing: 1.5, fontWeight: 700 }}>
                  TEAM MATCHMAKING ENGINE
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>HACKMATE AI</h1>
                <p style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
                  Find student developers, designers and AI builders matching your team's missing skill sets.
                </p>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #deded8', borderRadius: 6, padding: '6px 12px', flex: 1, minWidth: 220 }}>
                  <Search size={14} color="#888" style={{ marginRight: 8 }} />
                  <input
                    type="text"
                    value={mateSearch}
                    onChange={(e) => setMateSearch(e.target.value)}
                    placeholder="Search candidate by name, skills or college..."
                    style={{ border: 'none', outline: 'none', fontSize: 12, width: '100%' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  {['ALL', 'FRONTEND', 'AI/ML', 'BACKEND'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setMateRoleFilter(role)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: '1px solid #deded8',
                        background: mateRoleFilter === role ? '#111' : '#fff',
                        color: mateRoleFilter === role ? '#fff' : '#666',
                        fontSize: 10,
                        fontFamily: 'DM Mono',
                        cursor: 'pointer',
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidates Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                {candidates
                  .filter((c) => {
                    if (mateRoleFilter === 'ALL') return true;
                    if (mateRoleFilter === 'FRONTEND' && c.role.includes('Frontend')) return true;
                    if (mateRoleFilter === 'AI/ML' && c.role.includes('AI')) return true;
                    if (mateRoleFilter === 'BACKEND' && c.role.includes('Backend')) return true;
                    return false;
                  })
                  .map((candidate) => {
                    const isInvited = invitedMates.has(candidate.id);
                    return (
                      <div
                        key={candidate.id}
                        className="step-card"
                        style={{
                          background: '#fff',
                          borderRadius: 10,
                          padding: 20,
                          border: '1px solid #deded8',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                          <div>
                            <strong style={{ fontSize: 16, color: '#111', display: 'block' }}>{candidate.name}</strong>
                            <span style={{ fontSize: 11, color: '#7665ff', fontWeight: 600 }}>{candidate.role}</span>
                            <small style={{ fontSize: 11, color: '#888', display: 'block' }}>{candidate.college}</small>
                          </div>
                          <span style={{ fontSize: 10, fontFamily: 'DM Mono', color: '#82b91a', background: 'rgba(130, 185, 26, 0.1)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                            {candidate.rating} MATCH
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                          {candidate.skills.map((sk) => (
                            <span
                              key={sk}
                              style={{
                                background: '#f0f0ec',
                                padding: '3px 8px',
                                borderRadius: 4,
                                fontSize: 10,
                                fontFamily: 'DM Mono',
                                color: '#555',
                              }}
                            >
                              {sk}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="hero-explore"
                          disabled={isInvited}
                          style={{
                            width: '100%',
                            padding: '10px',
                            background: isInvited ? '#82b91a' : '#111',
                            color: isInvited ? '#111' : '#fff',
                            border: 'none',
                            borderRadius: 6,
                            fontWeight: 700,
                            fontSize: 11,
                            cursor: isInvited ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                          }}
                          onClick={() => {
                            setInvitedMates((prev) => new Set(prev).add(candidate.id));
                            addToast(`Invitation sent to ${candidate.name}!`, 'success');
                          }}
                        >
                          <span>{isInvited ? 'INVITATION SENT ✓' : 'INVITE TO TEAM'}</span>
                          <b>↗</b>
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: IDEACHECK AI
             ======================================================== */}
          {activeTab === 'IdeaCheck AI' && (
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#7665ff', letterSpacing: 1.5, fontWeight: 700 }}>
                  CAMPUSCODE INTELLIGENCE / IDEACHECK
                </span>
                <h1 style={{ fontSize: 26, fontWeight: 900, margin: '4px 0 8px 0' }}>IdeaCheck AI Evaluator</h1>
                <p style={{ color: '#666', fontSize: 13 }}>
                  Validate your hackathon project concept before building. Get instant evaluation on feasibility, uniqueness, and architectural advice.
                </p>
              </div>

              <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #deded8' }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!ideaText.trim()) return;
                    setIdeaAnalyzing(true);
                    setIdeaResult(null);
                    setTimeout(() => {
                      setIdeaAnalyzing(false);
                      setIdeaResult({
                        title: 'IdeaCheck Analysis Report',
                        feasibility: 92,
                        innovation: 88,
                        marketNeed: 95,
                        verdict: 'STRONG POTENTIAL - APPROVED FOR ROUND 1',
                        techStack: ['React', 'Node.js', 'FastAPI', 'TailwindCSS', 'PostgreSQL'],
                        strengths: [
                          'High student engagement potential and clear value proposition.',
                          'Scalable architectural pipeline suitable for 48h MVP development.',
                          'Addresses an active challenge statement in CampusCode AI Arena.',
                        ],
                        suggestions: [
                          'Incorporate zero-knowledge verification for credential privacy.',
                          'Build an offline-first caching layer for low-bandwidth zones.',
                        ],
                      });
                      addToast('AI analysis completed!', 'success');
                    }, 1200);
                  }}
                >
                  <label htmlFor="idea-desc" style={{ fontSize: 11, fontFamily: 'DM Mono', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                    DESCRIBE YOUR HACKATHON PROJECT IDEA
                  </label>
                  <textarea
                    id="idea-desc"
                    value={ideaText}
                    onChange={(e) => setIdeaText(e.target.value)}
                    placeholder="e.g. A decentralized verification platform for student internship credentials with instant zero-knowledge proofs and college registrar endorsement..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: 14,
                      borderRadius: 8,
                      border: '1px solid #deded8',
                      fontFamily: 'Inter',
                      fontSize: 13,
                      marginBottom: 16,
                      outline: 'none',
                    }}
                  />

                  <button
                    type="submit"
                    className="hero-explore"
                    disabled={ideaAnalyzing}
                    style={{
                      padding: '12px 24px',
                      background: '#111',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span>{ideaAnalyzing ? 'ANALYZING CONCEPT...' : 'ANALYZE WITH IDEACHECK AI'}</span>
                    <b>{ideaAnalyzing ? '↻' : '✦'}</b>
                  </button>
                </form>

                {ideaResult && (
                  <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #deded8', animation: 'cardRise 0.3s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span style={{ background: 'rgba(168, 230, 46, 0.15)', color: '#82b91a', padding: '4px 10px', borderRadius: 20, fontFamily: 'DM Mono', fontSize: 11, fontWeight: 800 }}>
                        {ideaResult.verdict}
                      </span>
                      <span style={{ fontSize: 12, fontFamily: 'DM Mono', color: '#888' }}>
                        CONFIDENCE: 94%
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                      <div style={{ background: '#f7f7f4', padding: 12, borderRadius: 6, textAlign: 'center' }}>
                        <span style={{ fontSize: 10, fontFamily: 'DM Mono', color: '#888' }}>FEASIBILITY</span>
                        <strong style={{ fontSize: 18, color: '#82b91a', display: 'block' }}>{ideaResult.feasibility}%</strong>
                      </div>
                      <div style={{ background: '#f7f7f4', padding: 12, borderRadius: 6, textAlign: 'center' }}>
                        <span style={{ fontSize: 10, fontFamily: 'DM Mono', color: '#7665ff', display: 'block' }}>INNOVATION</span>
                        <strong style={{ fontSize: 18, color: '#7665ff', display: 'block' }}>{ideaResult.innovation}%</strong>
                      </div>
                      <div style={{ background: '#f7f7f4', padding: 12, borderRadius: 6, textAlign: 'center' }}>
                        <span style={{ fontSize: 10, fontFamily: 'DM Mono', color: '#888' }}>MARKET NEED</span>
                        <strong style={{ fontSize: 18, color: '#111', display: 'block' }}>{ideaResult.marketNeed}%</strong>
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <strong style={{ fontSize: 12, fontFamily: 'DM Mono', display: 'block', marginBottom: 6 }}>
                        KEY STRENGTHS:
                      </strong>
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#4f4f4b', lineHeight: 1.6 }}>
                        {ideaResult.strengths.map((str, idx) => (
                          <li key={idx}>{str}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong style={{ fontSize: 12, fontFamily: 'DM Mono', display: 'block', marginBottom: 6 }}>
                        RECOMMENDED TECH STACK:
                      </strong>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {ideaResult.techStack.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              background: '#f0f0ec',
                              padding: '4px 10px',
                              borderRadius: 4,
                              fontFamily: 'DM Mono',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: RULEBOT AI (INTERACTIVE CHATBOT)
             ======================================================== */}
          {activeTab === 'RuleBot AI' && (
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#82b91a', letterSpacing: 1.5, fontWeight: 700 }}>
                  CAMPUSCODE VIRTUAL MENTOR
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>RuleBot AI Assistant</h1>
                <p style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                  Direct questions about plagiarism, eligibility, judging rubrics and submission criteria.
                </p>
              </div>

              {/* Chat Container */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: 10,
                  border: '1px solid #deded8',
                  display: 'flex',
                  flexDirection: 'column',
                  height: 480,
                  overflow: 'hidden',
                }}
              >
                {/* Messages stream */}
                <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '75%',
                          padding: '12px 16px',
                          borderRadius: 8,
                          background: msg.sender === 'user' ? '#111' : '#f7f7f4',
                          color: msg.sender === 'user' ? '#fff' : '#111',
                          fontSize: 13,
                          lineHeight: 1.5,
                          border: msg.sender === 'user' ? 'none' : '1px solid #deded8',
                        }}
                      >
                        {msg.text}
                      </div>
                      <small style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#888', marginTop: 4 }}>
                        {msg.time}
                      </small>
                    </div>
                  ))}
                  {isBotTyping && (
                    <div style={{ padding: '8px 14px', background: '#f7f7f4', borderRadius: 8, width: 'fit-content' }}>
                      <span style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#82b91a' }}>RuleBot is typing...</span>
                    </div>
                  )}
                </div>

                {/* Prompt suggestions pills */}
                <div style={{ padding: '8px 16px', background: '#fafaf8', borderTop: '1px solid #f0f0ec', display: 'flex', gap: 6, overflowX: 'auto' }}>
                  {[
                    'Can we use pre-existing code?',
                    'What are Round 2 submission rules?',
                    'How does judging work?',
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setChatInput(p)}
                      style={{
                        background: '#fff',
                        border: '1px solid #deded8',
                        borderRadius: 16,
                        padding: '4px 10px',
                        fontSize: 10,
                        fontFamily: 'DM Mono',
                        color: '#666',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Chat Input Box */}
                <form
                  onSubmit={handleSendMessage}
                  style={{
                    display: 'flex',
                    padding: 12,
                    borderTop: '1px solid #deded8',
                    background: '#fff',
                    gap: 10,
                  }}
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask RuleBot a question about the rules..."
                    style={{
                      flex: 1,
                      border: '1px solid #deded8',
                      borderRadius: 6,
                      padding: '10px 14px',
                      fontSize: 13,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: '#111',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: STUDENT GUIDE (DOCUMENTATION & FAQS)
             ======================================================== */}
          {activeTab === 'Student Guide' && (
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                  CAMPUSCODE HANDBOOK
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>STUDENT WORKFLOW GUIDE</h1>
                <p style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                  Everything you need to know about navigating the Arena, submitting milestones and advancing rounds.
                </p>
              </div>

              {/* 4 Steps Guide */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                {[
                  { step: '01', title: 'DISCOVER', desc: 'Browse available hackathons and register with your team.' },
                  { step: '02', title: 'IDEATE', desc: 'Use IdeaCheck AI to validate feasibility and pass Round 1.' },
                  { step: '03', title: 'PROTOTYPE', desc: 'Build working MVPs, commit code and upload demo repos.' },
                  { step: '04', title: 'CERTIFY', desc: 'Present to jury and claim cryptographically verified credentials.' },
                ].map((s, idx) => (
                  <div key={idx} style={{ background: '#fff', padding: 18, borderRadius: 8, border: '1px solid #deded8' }}>
                    <span style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#82b91a', fontWeight: 800 }}>{s.step}</span>
                    <strong style={{ fontSize: 14, display: 'block', margin: '4px 0' }}>{s.title}</strong>
                    <p style={{ fontSize: 11, color: '#666', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Accordion FAQ */}
              <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #deded8' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800 }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    {
                      q: 'Can members from different colleges form a team?',
                      a: 'Yes! Cross-college and cross-domain teams are fully permitted in open challenges.',
                    },
                    {
                      q: 'Where do I find official communication and announcements?',
                      a: 'Check the "Official Communication" tab in your student workspace and join the official CampusCode channel.',
                    },
                    {
                      q: 'What happens if a submission deadline is missed?',
                      a: 'Deadlines are strictly locked on the server. If an extension is granted by the jury, it will be announced on Official Communication.',
                    },
                    {
                      q: 'Are certificates downloadable as PDFs?',
                      a: 'Yes, verifiable PDFs with embedded cryptographic hash stamps can be downloaded from the Certificates tab.',
                    },
                  ].map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={index}
                        style={{
                          border: '1px solid #f0f0ec',
                          borderRadius: 6,
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: isOpen ? '#f7f7f4' : '#fff',
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#111',
                          }}
                        >
                          <span>{faq.q}</span>
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen && (
                          <div style={{ padding: '12px 16px', background: '#fff', fontSize: 12, color: '#555', lineHeight: 1.6, borderTop: '1px solid #f0f0ec' }}>
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: OFFICIAL COMMUNICATION
             ======================================================== */}
          {activeTab === 'Official Communication' && (
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                  ORGANIZER BROADCAST
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>OFFICIAL ANNOUNCEMENTS</h1>
                <p style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                  Verified notices, circulars and judging schedules released directly by Arena Organizers.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  {
                    title: 'Round 2 Prototype Window Extended by 4 Hours',
                    from: 'Arena Operations Committee',
                    date: '05 Nov 2026 · 11:30 PM',
                    content: 'In response to multiple teams requesting additional testing time for cloud GPU model deployment, the Round 2 portal will remain open until tomorrow 6:00 PM IST.',
                    tag: 'URGENT',
                  },
                  {
                    title: 'Mentor Office Hours Scheduled on Google Meet',
                    from: 'Technical Advisory Panel',
                    date: '04 Nov 2026 · 04:00 PM',
                    content: 'Registered teams can consult domain experts from Google, AWS and Microsoft on architecture reviews tomorrow between 2 PM to 5 PM IST.',
                    tag: 'MENTORSHIP',
                  },
                  {
                    title: 'Plagiarism & Open Source Attribution Guidelines Released',
                    from: 'Jury Secretariat',
                    date: '02 Nov 2026 · 09:00 AM',
                    content: 'All teams must include LICENSE and CREDITS in their project repositories. IdeaCheck AI will flag uncredited code blocks during automated round scoring.',
                    tag: 'GUIDELINES',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#fff',
                      borderRadius: 10,
                      padding: 24,
                      border: '1px solid #deded8',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: 'DM Mono',
                          fontWeight: 800,
                          color: item.tag === 'URGENT' ? '#ff667b' : '#82b91a',
                          background: item.tag === 'URGENT' ? 'rgba(255, 102, 123, 0.1)' : 'rgba(130, 185, 26, 0.1)',
                          padding: '3px 8px',
                          borderRadius: 4,
                        }}
                      >
                        {item.tag}
                      </span>
                      <small style={{ fontSize: 10, fontFamily: 'DM Mono', color: '#888' }}>{item.date}</small>
                    </div>

                    <h3 style={{ margin: '0 0 6px 0', fontSize: 16, fontWeight: 800 }}>{item.title}</h3>
                    <span style={{ fontSize: 11, fontFamily: 'DM Mono', color: '#7665ff', display: 'block', marginBottom: 12 }}>
                      By: {item.from}
                    </span>
                    <p style={{ fontSize: 13, color: '#4f4f4b', lineHeight: 1.6, margin: 0 }}>
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: NOTIFICATIONS
             ======================================================== */}
          {activeTab === 'Notifications' && (
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                    ALERT LOGS / ACTIVITY
                  </span>
                  <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>NOTIFICATIONS</h1>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setNotifFilter('all')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: '1px solid #deded8',
                      background: notifFilter === 'all' ? '#111' : '#fff',
                      color: notifFilter === 'all' ? '#fff' : '#666',
                      fontSize: 10,
                      fontFamily: 'DM Mono',
                      cursor: 'pointer',
                    }}
                  >
                    ALL ({notifications.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotifFilter('unread')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: '1px solid #deded8',
                      background: notifFilter === 'unread' ? '#111' : '#fff',
                      color: notifFilter === 'unread' ? '#fff' : '#666',
                      fontSize: 10,
                      fontFamily: 'DM Mono',
                      cursor: 'pointer',
                    }}
                  >
                    UNREAD ({unreadCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                      addToast('All notifications marked as read');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#7665ff',
                      fontSize: 11,
                      fontFamily: 'DM Mono',
                      cursor: 'pointer',
                      padding: '6px 10px',
                    }}
                  >
                    MARK ALL READ ✓
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {notifications
                  .filter((n) => (notifFilter === 'unread' ? n.unread : true))
                  .map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        background: notif.unread ? '#ffffff' : '#f9f9f7',
                        borderRadius: 8,
                        padding: 16,
                        border: notif.unread ? '1px solid #a8e62e' : '1px solid #deded8',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: notif.unread ? '#22c55e' : '#cfcfc8',
                            marginTop: 5,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <strong style={{ fontSize: 13, color: '#111', display: 'block' }}>{notif.title}</strong>
                          <p style={{ fontSize: 12, color: '#555', margin: '3px 0 0 0', lineHeight: 1.5 }}>
                            {notif.desc}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <small style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#888' }}>{notif.time}</small>
                        {notif.unread && (
                          <button
                            type="button"
                            onClick={() => {
                              setNotifications((prev) =>
                                prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
                              );
                            }}
                            style={{
                              background: '#f0f0ec',
                              border: 'none',
                              borderRadius: 4,
                              padding: '2px 6px',
                              fontSize: 9,
                              fontFamily: 'DM Mono',
                              cursor: 'pointer',
                            }}
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: HELP & SUPPORT
             ======================================================== */}
          {activeTab === 'Help & Support' && (
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                  STUDENT DESK
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>HELP & SUPPORT</h1>
                <p style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                  Need urgent help during the hackathon? Raise a ticket or reach out directly to the operations team.
                </p>
              </div>

              {/* Support Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                {[
                  { title: 'Community Discord', desc: 'Direct chat with mentors & organizers in voice lounges.', action: 'JOIN DISCORD ↗' },
                  { title: 'WhatsApp Helpline', desc: 'Instant support for round submission technical bugs.', action: 'MESSAGE SUPPORT ↗' },
                  { title: 'Email Escalation', desc: 'Formal appeals regarding results and verification.', action: 'SEND EMAIL ↗' },
                ].map((sc, i) => (
                  <div key={i} style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #deded8' }}>
                    <strong style={{ fontSize: 14, color: '#111', display: 'block', marginBottom: 4 }}>{sc.title}</strong>
                    <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 14 }}>{sc.desc}</p>
                    <button
                      type="button"
                      style={{ background: '#f0f0ec', border: 'none', borderRadius: 4, padding: '6px 12px', fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, cursor: 'pointer' }}
                      onClick={() => addToast(`Connected to ${sc.title}`)}
                    >
                      {sc.action}
                    </button>
                  </div>
                ))}
              </div>

              {/* Support Ticket Box */}
              <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #deded8' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800 }}>Create Support Ticket</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!supportMessage.trim()) return;
                    addToast(`Ticket created: #${Math.floor(1000 + Math.random() * 9000)} - Operations notified!`, 'success');
                    setSupportMessage('');
                  }}
                >
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#888', display: 'block', marginBottom: 4 }}>
                      ISSUE CATEGORY
                    </label>
                    <select
                      value={supportCategory}
                      onChange={(e) => setSupportCategory(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #deded8', fontSize: 12 }}
                    >
                      <option>Submission Issue</option>
                      <option>Team Member Invitation Error</option>
                      <option>Certificate Verification Error</option>
                      <option>Plagiarism / AI Check Inquiry</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#888', display: 'block', marginBottom: 4 }}>
                      DESCRIBE YOUR ISSUE
                    </label>
                    <textarea
                      rows={3}
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder="Explain what happened and what error you encountered..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #deded8', fontSize: 12 }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="hero-explore"
                    style={{
                      background: '#111',
                      color: '#fff',
                      padding: '10px 18px',
                      borderRadius: 6,
                      border: 'none',
                      fontWeight: 700,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>SUBMIT TICKET</span>
                    <b>↗</b>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: DIGITAL CARD
             ======================================================== */}
          {activeTab === 'Digital Card' && (
            <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#82b91a', letterSpacing: 1.5, fontWeight: 700 }}>
                  STUDENT IDENTITY VERIFICATION
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0' }}>Digital Campus ID</h1>
              </div>

              {/* HOLOGRAPHIC CARD */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #111413 0%, #1a1e1d 100%)',
                  color: '#fff',
                  borderRadius: 16,
                  padding: 28,
                  border: '1px solid rgba(168, 230, 46, 0.3)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(168, 230, 46, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="landing-logo-mark" aria-hidden="true">
                      <span></span><span></span><span></span>
                    </span>
                    <strong style={{ fontSize: 13, letterSpacing: 1.5 }}>CAMPUSCODE</strong>
                  </div>
                  <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#a8e62e', border: '1px solid #a8e62e', padding: '2px 8px', borderRadius: 12 }}>
                    ACTIVE BUILDER
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: '#a8e62e',
                      color: '#111',
                      fontSize: 22,
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, margin: 0, fontWeight: 800 }}>{user.name}</h2>
                    <span style={{ fontFamily: 'DM Mono', fontSize: 12, color: '#a8e62e' }}>
                      ID: {user.campusId}
                    </span>
                    <small style={{ display: 'block', color: '#888', marginTop: 2 }}>{user.university}</small>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8 }}>
                  <div>
                    <span style={{ fontSize: 8, fontFamily: 'DM Mono', color: '#888' }}>ROLE</span>
                    <strong style={{ fontSize: 11, display: 'block' }}>STUDENT</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 8, fontFamily: 'DM Mono', color: '#888' }}>VALID THRU</span>
                    <strong style={{ fontSize: 11, display: 'block' }}>DEC 2026</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 8, fontFamily: 'DM Mono', color: '#888' }}>STATUS</span>
                    <strong style={{ fontSize: 11, color: '#a8e62e', display: 'block' }}>VERIFIED ✓</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontFamily: 'DM Mono',
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                  onClick={() => addToast('Digital Campus ID copied to clipboard!', 'success')}
                >
                  <Share2 size={14} />
                  <span>SHARE DIGITAL BADGE</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: CERTIFICATES
             ======================================================== */}
          {activeTab === 'Certificates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                  VERIFIED CREDENTIALS
                </span>
                <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>Your Certificates</h1>
                <p style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
                  All certificates are verifiable by employers and universities through the public verification portal.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
                {[
                  {
                    title: '1st Place — AI Innovation Hackathon',
                    code: 'CC-2026-WIN',
                    issued: 'Nov 02, 2026',
                    type: 'WINNER CERTIFICATE',
                  },
                  {
                    title: 'Participation — Campus Web Summit',
                    code: 'CC-2026-PART',
                    issued: 'Oct 18, 2026',
                    type: 'PARTICIPATION',
                  },
                ].map((cert, idx) => (
                  <div
                    key={idx}
                    className="step-card"
                    style={{
                      background: '#fff',
                      padding: 24,
                      borderRadius: 10,
                      border: '1px solid #deded8',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontFamily: 'DM Mono', fontSize: 9, color: '#82b91a', fontWeight: 700 }}>
                        {cert.type}
                      </span>
                      <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#888' }}>
                        {cert.issued}
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 8px 0', fontSize: 17, fontWeight: 800 }}>{cert.title}</h3>
                    <p style={{ fontFamily: 'DM Mono', fontSize: 12, color: '#7665ff', marginBottom: 18 }}>
                      Code: {cert.code}
                    </p>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        type="button"
                        onClick={() => navigate(`/verify/${cert.code}`)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: '#111',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          fontFamily: 'DM Mono',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        VERIFY PROOF ↗
                      </button>
                      <button
                        type="button"
                        onClick={() => addToast(`Downloaded Certificate PDF (${cert.code})`, 'success')}
                        style={{
                          padding: '10px 14px',
                          background: '#f0f0ec',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                        }}
                        title="Download PDF"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: PROFILE (EXACT 1:1 MATCH TO SCREENSHOT)
             ======================================================== */}
          {activeTab === 'Profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100 }}>
              <div>
                <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#65a30d', letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                  ACCOUNT / BACKEND PROFILE
                </span>
                <h1 style={{ fontSize: 36, fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-1px', color: '#111' }}>
                  YOUR PROFILE.
                </h1>
                <p style={{ color: '#666', fontSize: 13, margin: 0 }}>
                  Edit your student profile and save the changes directly to the CampusCode backend.
                </p>
              </div>

              {/* 2 Columns x 3 Rows Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
                {/* Box 1: NAME */}
                <div style={{ background: '#ffffff', border: '1px solid #deded8', borderRadius: 8, padding: '18px 22px' }}>
                  <small style={{ fontFamily: 'DM Mono', fontSize: 9, fontWeight: 700, color: '#858580', letterSpacing: 0.8, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                    NAME
                  </small>
                  <strong style={{ fontSize: 14, fontWeight: 800, color: '#111', display: 'block' }}>
                    {user.name}
                  </strong>
                </div>

                {/* Box 2: EMAIL */}
                <div style={{ background: '#ffffff', border: '1px solid #deded8', borderRadius: 8, padding: '18px 22px' }}>
                  <small style={{ fontFamily: 'DM Mono', fontSize: 9, fontWeight: 700, color: '#858580', letterSpacing: 0.8, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                    EMAIL
                  </small>
                  <strong style={{ fontSize: 14, fontWeight: 800, color: '#111', display: 'block' }}>
                    {user.email}
                  </strong>
                </div>

                {/* Box 3: ROLE */}
                <div style={{ background: '#ffffff', border: '1px solid #deded8', borderRadius: 8, padding: '18px 22px' }}>
                  <small style={{ fontFamily: 'DM Mono', fontSize: 9, fontWeight: 700, color: '#858580', letterSpacing: 0.8, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                    ROLE
                  </small>
                  <strong style={{ fontSize: 14, fontWeight: 800, color: '#111', display: 'block' }}>
                    {user.role}
                  </strong>
                </div>

                {/* Box 4: CAMPUSCODE ID */}
                <div style={{ background: '#ffffff', border: '1px solid #deded8', borderRadius: 8, padding: '18px 22px' }}>
                  <small style={{ fontFamily: 'DM Mono', fontSize: 9, fontWeight: 700, color: '#858580', letterSpacing: 0.8, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                    CAMPUSCODE ID
                  </small>
                  <strong style={{ fontFamily: 'DM Mono', fontSize: 14, fontWeight: 800, color: '#111', display: 'block' }}>
                    {user.campusId || 'CC-ZZW4VY'}
                  </strong>
                </div>

                {/* Box 5: BIO */}
                <div style={{ background: '#ffffff', border: '1px solid #deded8', borderRadius: 8, padding: '18px 22px' }}>
                  <small style={{ fontFamily: 'DM Mono', fontSize: 9, fontWeight: 700, color: '#858580', letterSpacing: 0.8, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                    BIO
                  </small>
                  <strong style={{ fontSize: 14, fontWeight: 800, color: '#111', display: 'block' }}>
                    {user.bio || '—'}
                  </strong>
                </div>

                {/* Box 6: SKILLS */}
                <div style={{ background: '#ffffff', border: '1px solid #deded8', borderRadius: 8, padding: '18px 22px' }}>
                  <small style={{ fontFamily: 'DM Mono', fontSize: 9, fontWeight: 700, color: '#858580', letterSpacing: 0.8, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                    SKILLS
                  </small>
                  <strong style={{ fontSize: 13, fontWeight: 700, color: '#111', display: 'block', lineHeight: 1.4 }}>
                    {Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || 'React, Node.js, MongoDB, Express.js, HTML, CSS, JavaScript'}
                  </strong>
                </div>
              </div>

              {/* EDIT PROFILE Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsProfileEditOpen(true)}
                  style={{
                    background: '#fff',
                    border: '1px solid #deded8',
                    padding: '10px 18px',
                    borderRadius: 6,
                    fontFamily: 'DM Mono',
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#111',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f7f7f4'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
                >
                  <span>EDIT PROFILE</span>
                  <b>↗</b>
                </button>
              </div>

              {/* Profile Edit Modal in React */}
              {isProfileEditOpen && (
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(3px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                  }}
                  onClick={() => setIsProfileEditOpen(false)}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: 12,
                      border: '1px solid #deded8',
                      width: '100%',
                      maxWidth: 520,
                      padding: 28,
                      boxShadow: '0 20px 45px rgba(0,0,0,0.2)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                      <div>
                        <span style={{ fontSize: 9.5, fontFamily: 'DM Mono', color: '#65a30d', letterSpacing: 1.5, fontWeight: 700 }}>
                          ACCOUNT / EDIT
                        </span>
                        <h2 style={{ fontSize: 20, fontWeight: 900, margin: '2px 0 0 0', color: '#111' }}>
                          EDIT PROFILE
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsProfileEditOpen(false)}
                        style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#888' }}
                      >
                        ✕
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setUser((prev) => ({
                          ...prev,
                          name: editProfile.name,
                          bio: editProfile.bio || '—',
                          skills: editProfile.skills.split(',').map((s) => s.trim()).filter(Boolean),
                        }));
                        setIsProfileEditOpen(false);
                        addToast('Profile updated and saved to backend!', 'success');
                      }}
                    >
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#888', display: 'block', marginBottom: 4 }}>
                          NAME
                        </label>
                        <input
                          type="text"
                          value={editProfile.name}
                          onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #deded8', fontSize: 13, outline: 'none' }}
                        />
                      </div>

                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#888', display: 'block', marginBottom: 4 }}>
                          BIO
                        </label>
                        <textarea
                          rows={3}
                          value={editProfile.bio}
                          placeholder="e.g. Frontend developer, competing in hackathons..."
                          onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #deded8', fontSize: 13, outline: 'none' }}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#888', display: 'block', marginBottom: 4 }}>
                          SKILLS (COMMA-SEPARATED)
                        </label>
                        <input
                          type="text"
                          value={editProfile.skills}
                          onChange={(e) => setEditProfile({ ...editProfile, skills: e.target.value })}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #deded8', fontSize: 13, outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => setIsProfileEditOpen(false)}
                          style={{ padding: '8px 16px', background: '#fff', border: '1px solid #deded8', borderRadius: 6, fontFamily: 'DM Mono', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          style={{ padding: '8px 18px', background: '#a8e62e', border: 'none', borderRadius: 6, fontFamily: 'DM Mono', fontSize: 11, fontWeight: 800, color: '#111', cursor: 'pointer' }}
                        >
                          SAVE CHANGES ↗
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
