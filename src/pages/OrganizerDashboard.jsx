import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Award,
  FileText,
  BarChart3,
  LogOut,
  Plus,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function OrganizerDashboard({ navigate, currentUser }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const { addToast } = useToast();

  const user = currentUser || {
    name: 'Dr. Sarah Smith',
    email: 'organizer@campuscode.co.in',
    role: 'ORGANIZER',
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    addToast('Organizer session ended');
    navigate('/login');
  };

  return (
    <div className="organizer-page " style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TOPBAR */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 28px',
          background: '#fff',
          borderBottom: '1px solid #deded8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            className="landing-logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            <span className="landing-logo-mark" aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
            <span>
              <strong>CAMPUSCODE</strong>
              <small>ORGANIZER ARENA</small>
            </span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 12, fontWeight: 700, display: 'block' }}>{user.name}</span>
            <small style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#858580' }}>ORGANIZER CONSOLE</small>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* BODY */}
      <div style={{ display: 'flex', flex: 1 }}>
        <aside
          style={{
            width: 220,
            background: '#fff',
            borderRight: '1px solid #deded8',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#858580', marginBottom: 8 }}>MANAGEMENT</span>
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'My Hackathons', icon: Calendar },
            { name: 'Review Submissions', icon: FileText },
            { name: 'Participants', icon: Users },
            { name: 'Issue Certificates', icon: Award },
            { name: 'Analytics', icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveTab(item.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
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
                <Icon size={15} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </aside>

        <main style={{ flex: 1, padding: '32px 5vw', background: 'var(--bg, #f7f7f4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <span style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#858580' }}>CONSOLE / ORGANIZER</span>
              <h1 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0 0' }}>Organizer Arena Dashboard</h1>
            </div>
            <button
              type="button"
              className="hero-explore"
              style={{
                background: '#111',
                color: '#fff',
                padding: '10px 18px',
                borderRadius: 6,
                border: 'none',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              onClick={() => addToast('Launched Hackathon Creation Wizard!', 'success')}
            >
              <Plus size={14} />
              <span>CREATE NEW HACKATHON</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'ACTIVE CHALLENGES', val: '02' },
              { label: 'TOTAL TEAMS REGISTERED', val: '522' },
              { label: 'PENDING SUBMISSIONS', val: '38' },
              { label: 'CERTIFICATES DISPATCHED', val: '140' },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #deded8' }}>
                <span style={{ fontFamily: 'DM Mono', fontSize: 9, color: '#858580', display: 'block', marginBottom: 4 }}>
                  {stat.label}
                </span>
                <strong style={{ fontSize: 24, fontWeight: 900, color: '#111' }}>{stat.val}</strong>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 8, padding: 24, border: '1px solid #deded8' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800 }}>Managed Hackathons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'AI INNOVATION 2026', teams: 342, status: 'ROUND 2 LIVE', deadline: 'Ends in 18h' },
                { title: 'FUTURE WEB ODYSSEY', teams: 180, status: 'REGISTRATION OPEN', deadline: 'Starts in 4d' },
              ].map((hack, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f7f7f4', borderRadius: 6, border: '1px solid #deded8' }}>
                  <div>
                    <strong style={{ fontSize: 14, color: '#111' }}>{hack.title}</strong>
                    <span style={{ display: 'block', fontSize: 11, color: '#666', marginTop: 2 }}>
                      {hack.teams} teams registered · {hack.deadline}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 10, fontFamily: 'DM Mono', fontWeight: 700, color: '#82b91a', background: 'rgba(130, 185, 26, 0.1)', padding: '4px 10px', borderRadius: 12 }}>
                      {hack.status}
                    </span>
                    <button
                      type="button"
                      style={{ background: '#111', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4, fontSize: 11, cursor: 'pointer' }}
                      onClick={() => addToast(`Opening management panel for ${hack.title}`)}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
