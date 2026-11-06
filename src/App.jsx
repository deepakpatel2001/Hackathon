import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PublicVerify from './pages/PublicVerify';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import { ToastProvider, useToast } from './components/Toast';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const { addToast } = useToast();

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Render view based on route
  const renderView = () => {
    if (currentPath.startsWith('/verify/')) {
      const code = currentPath.replace('/verify/', '') || 'CC-2026-WIN';
      return <PublicVerify code={code} navigate={navigate} />;
    }

    switch (currentPath) {
      case '/login':
        return <LoginPage navigate={navigate} onLoginSuccess={handleLoginSuccess} />;
      case '/register':
        return <RegisterPage navigate={navigate} />;
      case '/student':
        return <StudentDashboard navigate={navigate} currentUser={user} />;
      case '/organizer':
        return <OrganizerDashboard navigate={navigate} currentUser={user} />;
      case '/admin':
        return <AdminDashboard navigate={navigate} currentUser={user} />;
      case '/':
      default:
        return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <div className="campus-app-root">
      {/* 1. Custom Interactive Cursor */}
      <Cursor />

      {/* 7. Smooth Scroll Progress & Back to Top */}
      <ScrollProgress />

      {/* Main View with Smooth Page Transitions */}
      <div key={currentPath} className="page-transition-container">
        {renderView()}
      </div>

      {/* HACKATHON EVALUATOR / JUDGE QUICK BAR */}
      <div
        className="hackathon-judge-dock"
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(17, 17, 17, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 30,
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 9998,
          boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Mono',
            fontSize: 9,
            color: '#a8e62e',
            fontWeight: 800,
            letterSpacing: 1,
            marginRight: 4,
          }}
        >
          PAGES:
        </span>
        {[
          { path: '/', label: 'Landing' },
          { path: '/login', label: 'Login' },
          { path: '/register', label: 'Register' },
          { path: '/student', label: 'Student Arena' },
          { href: '/student.html', label: 'Pure HTML/CSS/JS' },
          { path: '/organizer', label: 'Organizer' },
          { path: '/admin', label: 'Admin' },
          { path: '/verify/CC-2026-WIN', label: 'Verify' },
        ].map((item) => (
          item.href ? (
            <a
              key={item.href}
              href={item.href}
              style={{
                background: 'rgba(168, 230, 46, 0.18)',
                color: '#a8e62e',
                border: '1px solid rgba(168, 230, 46, 0.4)',
                borderRadius: 20,
                padding: '4px 10px',
                fontSize: 10,
                fontFamily: 'DM Mono',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </a>
          ) : (
            <button
              key={item.path}
              type="button"
              onClick={() => {
                navigate(item.path);
                addToast(`Navigated to ${item.label}`);
              }}
              style={{
                background: currentPath === item.path ? '#a8e62e' : 'transparent',
                color: currentPath === item.path ? '#111' : '#ccc',
                border: 'none',
                borderRadius: 20,
                padding: '4px 10px',
                fontSize: 10,
                fontFamily: 'DM Mono',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </button>
          )
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
