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
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function StudentDashboard({ navigate, currentUser }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);
  const [ideaText, setIdeaText] = useState('');
  const [ideaAnalyzing, setIdeaAnalyzing] = useState(false);
  const [ideaResult, setIdeaResult] = useState(null);
  const [submittedFile, setSubmittedFile] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const { addToast } = useToast();

  const user = currentUser || {
    name: 'Alex Chen',
    email: 'alex.chen@campuscode.co.in',
    role: 'STUDENT',
    campusId: 'CC-84920',
  };

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
    { name: 'Notifications', icon: Bell, badge: notificationsCount },
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

  const handleAnalyzeIdea = (e) => {
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
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!submittedFile) {
      addToast('Please select a project repository or zip file.');
      return;
    }
    setSubmissionSuccess(true);
    addToast('Milestone submitted to arena evaluation judges!', 'success');
  };

  return (
    <div className="student-panel " style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ---------------- TOPBAR ---------------- */}
      <header
        className="student-topbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          background: '#fff',
          borderBottom: '1px solid #deded8',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            className="student-menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: '#f0f0ec',
              border: 'none',
              borderRadius: 6,
              padding: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <button
            type="button"
            className="landing-logo"
            onClick={() => handleTabChange('Overview')}
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            <span className="landing-logo-mark" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span>
              <strong>CAMPUSCODE</strong>
              <small>HACKATHON ARENA</small>
            </span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f7f7f4',
            border: '1px solid #deded8',
            borderRadius: 8,
            padding: '6px 14px',
            width: '320px',
            maxWidth: '100%',
          }}
        >
          <Search size={14} color="#858580" style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search hackathons, teams, docs..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 12,
              fontFamily: 'Inter, sans-serif',
              width: '100%',
              color: '#111',
            }}
          />
        </div>

        {/* RIGHT TOP ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className={notificationsCount > 0 ? 'bell-has-notification' : ''}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setNotificationsCount(0);
              }}
              style={{
                background: '#f0f0ec',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              aria-label="Notifications"
            >
              <Bell size={16} color="#111" />
              {notificationsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    background: '#a8e62e',
                    color: '#111',
                    fontSize: 9,
                    fontWeight: 800,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 6px rgba(168, 230, 46, 0.6)',
                  }}
                >
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 44,
                  width: 320,
                  background: '#fff',
                  border: '1px solid #deded8',
                  borderRadius: 8,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  padding: 16,
                  zIndex: 50,
                  animation: 'toastSlideUp 0.2s ease-out',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <strong style={{ fontSize: 12, fontFamily: 'DM Mono' }}>NOTIFICATIONS</strong>
                  <span style={{ fontSize: 10, color: '#82b91a', fontWeight: 700 }}>2 NEW</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ padding: 10, background: '#f7f7f4', borderRadius: 6, fontSize: 12 }}>
                    <strong style={{ display: 'block', color: '#111' }}>Round 2 Submission Open</strong>
                    <span style={{ fontSize: 11, color: '#666' }}>AI Innovation Hackathon prototype portal is now live.</span>
                  </div>
                  <div style={{ padding: 10, background: '#f7f7f4', borderRadius: 6, fontSize: 12 }}>
                    <strong style={{ display: 'block', color: '#111' }}>Mentor Feedback Available</strong>
                    <span style={{ fontSize: 11, color: '#666' }}>Reviewer #04 left comments on your system diagram.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '4px 12px 4px 6px',
              background: '#f7f7f4',
              border: '1px solid #deded8',
              borderRadius: 30,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#111',
                color: '#a8e62e',
                fontWeight: 800,
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#111', display: 'block', lineHeight: 1.1 }}>
                {user.name}
              </span>
              <small style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#858580' }}>
                {user.campusId}
              </small>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#858580',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 6,
            }}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* ---------------- MAIN CONTAINER WITH SIDEBAR & CONTENT ---------------- */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR */}
        <aside
          className={`student-sidebar ${sidebarOpen ? 'open' : ''}`}
          style={{
            width: 240,
            background: '#fff',
            borderRight: '1px solid #deded8',
            padding: '20px 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span
              style={{
                fontSize: 9,
                fontFamily: 'DM Mono',
                letterSpacing: 1.5,
                color: '#858580',
                padding: '4px 12px 8px 12px',
              }}
            >
              STUDENT ARENA
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleTabChange(item.name)}
                  className={isActive ? 'active' : ''}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 6,
                    border: 'none',
                    background: isActive ? '#f0f0ec' : 'transparent',
                    color: isActive ? '#111' : '#666',
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={15} color={isActive ? '#111' : '#777'} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span
                      style={{
                        background: '#a8e62e',
                        color: '#111',
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: 10,
                      }}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Quick Hub Badge */}
          <div
            style={{
              padding: 12,
              background: '#f7f7f4',
              borderRadius: 8,
              border: '1px solid #deded8',
              marginTop: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span className="live-pulse-dot"></span>
              <span style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#111' }}>
                HACKATHON LIVE
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 11, color: '#666' }}>
              AI Innovation Arena: Round 2 ends tomorrow.
            </p>
          </div>
        </aside>

        {/* MAIN VIEW AREA */}
        <main
          className="student-main"
          style={{
            flex: 1,
            background: 'var(--bg, #f7f7f4)',
            padding: '32px 5vw',
            overflowY: 'auto',
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
                      <span>EXPLORE CHALLENGES</span>
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

                  <form onSubmit={handleProjectSubmit}>
                    <div
                      style={{
                        border: '2px dashed #deded8',
                        borderRadius: 8,
                        padding: '24px 16px',
                        textAlign: 'center',
                        marginBottom: 16,
                        background: '#f7f7f4',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                      }}
                      onClick={() => {
                        setSubmittedFile('neuralshift-ai-prototype.zip');
                        addToast('Attached neuralshift-ai-prototype.zip');
                      }}
                    >
                      <Upload size={24} color="#858580" style={{ margin: '0 auto 8px auto' }} />
                      <span style={{ fontSize: 12, fontWeight: 700, display: 'block', color: '#111' }}>
                        {submittedFile ? submittedFile : 'Click to select project zip or drop repo'}
                      </span>
                      <small style={{ fontSize: 10, color: '#888' }}>Max 25MB · ZIP, PDF or TAR</small>
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
                      <span>{submissionSuccess ? 'RESUBMIT UPDATE' : 'SUBMIT PROTOTYPE'}</span>
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
              TAB: EVENTS
             ======================================================== */}
          {activeTab === 'Events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580', letterSpacing: 1.5 }}>
                    CAMPUSCODE / CHALLENGES
                  </span>
                  <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>HACKATHON ARENA</h1>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['All', 'Live Now', 'Upcoming'].map((fil, idx) => (
                    <button
                      key={fil}
                      type="button"
                      style={{
                        padding: '6px 14px',
                        background: idx === 0 ? '#111' : '#fff',
                        color: idx === 0 ? '#fff' : '#666',
                        borderRadius: 20,
                        border: '1px solid #deded8',
                        fontFamily: 'DM Mono',
                        fontSize: 10,
                        cursor: 'pointer',
                      }}
                    >
                      {fil}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {[
                  {
                    title: 'AI INNOVATION 2026',
                    cat: 'ARTIFICIAL INTELLIGENCE',
                    prize: '₹2,50,000',
                    deadline: '48h remaining',
                    status: 'LIVE',
                    desc: 'Build multimodal AI models solving education and health problems.',
                  },
                  {
                    title: 'FUTURE WEB ODYSSEY',
                    cat: 'FULLSTACK WEB',
                    prize: '₹1,75,000',
                    deadline: 'Starts in 4 days',
                    status: 'OPEN',
                    desc: 'Push the limits of client performance with WebAssembly and Edge networks.',
                  },
                  {
                    title: 'SMART CAMPUS TECH',
                    cat: 'IOT & SMART HARDWARE',
                    prize: '₹1,00,000',
                    deadline: 'Starts Nov 20',
                    status: 'UPCOMING',
                    desc: 'Build connected campus infrastructure and energy conservation systems.',
                  },
                ].map((ev, i) => (
                  <div
                    key={i}
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
                        onClick={() => addToast(`Registered team for ${ev.title}!`, 'success')}
                      >
                        <span>REGISTER TEAM</span>
                        <b>↗</b>
                      </button>
                    </div>
                  </div>
                ))}
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
                  CAMPUSCODE AI ENGINE
                </span>
                <h1 style={{ fontSize: 26, fontWeight: 900, margin: '4px 0 8px 0' }}>IdeaCheck AI Evaluator</h1>
                <p style={{ color: '#666', fontSize: 13 }}>
                  Validate your hackathon project concept before building. Get instant evaluation on feasibility, uniqueness, and architectural advice.
                </p>
              </div>

              <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #deded8' }}>
                <form onSubmit={handleAnalyzeIdea}>
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
                        <span style={{ fontSize: 10, fontFamily: 'DM Mono', color: '#888' }}>INNOVATION</span>
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
                    <small style={{ display: 'block', color: '#888', marginTop: 2 }}>{user.email}</small>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8 }}>
                  <div>
                    <span style={{ fontSize: 8, fontFamily: 'DM Mono', color: '#888' }}>ROLE</span>
                    <strong style={{ fontSize: 11, display: 'block' }}>STUDENT</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 8, fontFamily: 'DM Mono', color: '#888' }}>ISSUED</span>
                    <strong style={{ fontSize: 11, display: 'block' }}>NOV 2026</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 8, fontFamily: 'DM Mono', color: '#888' }}>STATUS</span>
                    <strong style={{ fontSize: 11, color: '#a8e62e', display: 'block' }}>VERIFIED ✓</strong>
                  </div>
                </div>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              FALLBACK / OTHER TABS (RuleBot AI, Profile, Help, etc.)
             ======================================================== */}
          {['RuleBot AI', 'Student Guide', 'Official Communication', 'Notifications', 'Help & Support', 'Profile', 'My Events', 'HackMate AI'].includes(activeTab) && (
            <div style={{ background: '#fff', borderRadius: 10, padding: 32, border: '1px solid #deded8', maxWidth: 650, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#a8e62e' }}></span>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{activeTab}</h2>
              </div>
              <p style={{ color: '#4f4f4b', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                This section is fully active within the CampusCode arena ecosystem. You are connected as <strong>{user.name}</strong> ({user.email}).
              </p>
              <div style={{ background: '#f7f7f4', padding: 16, borderRadius: 8, border: '1px solid #deded8', fontFamily: 'DM Mono', fontSize: 11, color: '#666' }}>
                STATUS: SYNCHRONIZED WITH CHENNAI NODE 01 · LATENCY 18ms
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
