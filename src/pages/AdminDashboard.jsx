import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Activity,
  Users,
  Database,
  Terminal,
  LogOut,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function AdminDashboard({ navigate, currentUser }) {
  const [activeSection, setActiveSection] = useState('telemetry');
  const { addToast } = useToast();

  const user = currentUser || {
    name: 'DevOps / Admin',
    email: 'admin@campuscode.co.in',
    role: 'ADMIN',
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    addToast('Admin console secured');
    navigate('/login');
  };

  return (
    <div
      className=""
      style={{
        minHeight: '100vh',
        background: '#0d0f10',
        color: '#f4f8f5',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ADMIN HEADER */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 28px',
          background: '#111413',
          borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981',
            }}
          />
          <strong style={{ fontFamily: 'DM Mono', letterSpacing: 2, fontSize: 13, color: '#10b981' }}>
            CAMPUSCODE / ROOT SYSTEM CONSOLE
          </strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#34d399' }}>
            STATUS: ONLINE · LATENCY 14MS
          </span>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'rgba(255, 102, 123, 0.1)',
              color: '#ff667b',
              border: '1px solid rgba(255, 102, 123, 0.3)',
              borderRadius: 4,
              padding: '6px 12px',
              fontFamily: 'DM Mono',
              fontSize: 10,
              cursor: 'pointer',
            }}
          >
            EXIT SESSION
          </button>
        </div>
      </header>

      {/* ADMIN WORKSPACE */}
      <div style={{ display: 'flex', flex: 1 }}>
        <aside
          style={{
            width: 240,
            background: '#101413',
            borderRight: '1px solid rgba(16, 185, 129, 0.15)',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span style={{ fontSize: 9, fontFamily: 'DM Mono', color: '#10b981', letterSpacing: 1, marginBottom: 8 }}>
            INFRASTRUCTURE
          </span>
          {[
            { id: 'telemetry', label: 'Cluster Telemetry', icon: Activity },
            { id: 'approvals', label: 'Pending Approvals', icon: ShieldAlert },
            { id: 'users', label: 'User Registry', icon: Users },
            { id: 'database', label: 'PostgreSQL State', icon: Database },
            { id: 'terminal', label: 'Audit Logs', icon: Terminal },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 4,
                  border: 'none',
                  background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  color: isActive ? '#34d399' : '#888',
                  fontSize: 12,
                  fontFamily: 'DM Mono',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        <main style={{ flex: 1, padding: '32px 4vw' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'CPU LOAD', val: '12.4%', note: 'Normal' },
              { label: 'MEMORY CONSUMPTION', val: '1.42 GB / 4.00 GB', note: 'Healthy' },
              { label: 'EMAIL QUOTA', val: '842 / 10,000 sent', note: 'Tier 1' },
              { label: 'ACTIVE SOCKET CONNECTIONS', val: '438', note: 'Live SSE' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: '#101413',
                  padding: 20,
                  borderRadius: 6,
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                <span style={{ fontFamily: 'DM Mono', fontSize: 9, color: '#34d399', display: 'block', marginBottom: 4 }}>
                  {stat.label}
                </span>
                <strong style={{ fontSize: 20, color: '#f4f8f5', display: 'block', marginBottom: 4 }}>
                  {stat.val}
                </strong>
                <span style={{ fontSize: 10, color: '#888', fontFamily: 'DM Mono' }}>{stat.note}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: '#101413',
              borderRadius: 6,
              padding: 24,
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <strong style={{ fontFamily: 'DM Mono', fontSize: 14, color: '#34d399' }}>
                HACKATHON EVENT APPROVAL PIPELINE
              </strong>
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(16,185,129,0.3)',
                  color: '#34d399',
                  borderRadius: 4,
                  padding: '4px 10px',
                  fontFamily: 'DM Mono',
                  fontSize: 10,
                  cursor: 'pointer',
                }}
                onClick={() => addToast('Approval queue synchronized')}
              >
                ↻ REFRESH QUEUE
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { title: 'Chennai Smart Health Hackathon', org: 'Anna University', req: 'Prize pool ₹1,50,000' },
                { title: 'ZeroKnowledge Campus Identity Challenge', org: 'IIT Madras Builders', req: 'Prize pool ₹2,00,000' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 14,
                    background: '#0d0f10',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 13, color: '#f4f8f5' }}>{item.title}</strong>
                    <span style={{ display: 'block', fontSize: 11, color: '#888', fontFamily: 'DM Mono', marginTop: 2 }}>
                      Organized by {item.org} · {item.req}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      style={{
                        background: '#10b981',
                        color: '#0d0f10',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 4,
                        fontFamily: 'DM Mono',
                        fontSize: 10,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                      onClick={() => addToast(`Approved "${item.title}"!`, 'success')}
                    >
                      APPROVE ✓
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
