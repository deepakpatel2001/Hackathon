import React, { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';

export default function LoginPage({ navigate, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: 'student@campuscode.co.in',
    password: 'Password123!',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState('');
  const [captchaText, setCaptchaText] = useState('7B9K2');
  const [captchaInput, setCaptchaInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('STUDENT');

  const { addToast } = useToast();

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let res = '';
    for (let i = 0; i < 5; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(res);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleQuickDemo = (role) => {
    setSelectedRole(role);
    if (role === 'STUDENT') {
      setFormData({ email: 'alex.chen@campuscode.co.in', password: 'Password123!' });
    } else if (role === 'ORGANIZER') {
      setFormData({ email: 'organizer@campuscode.co.in', password: 'Password123!' });
    } else {
      setFormData({ email: 'admin@campuscode.co.in', password: 'Password123!' });
    }
    setCaptchaInput(captchaText);
    addToast(`Pre-filled credentials for ${role} demo`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const email = formData.email.trim();
    if (!email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    if (captchaInput.toUpperCase() !== captchaText) {
      setError('Captcha code did not match. Please try again.');
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsWaiting(true), 800);

    setTimeout(() => {
      clearTimeout(timer);
      setIsLoading(false);
      setIsWaiting(false);

      const user = {
        name: selectedRole === 'ORGANIZER' ? 'Dr. Sarah Smith' : selectedRole === 'ADMIN' ? 'Dev Team Chennai' : 'Alex Chen',
        email: email,
        role: selectedRole,
        campusId: 'CC-84920',
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', selectedRole);
      localStorage.setItem('token', 'mock_jwt_token_campuscode_2026');

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }

      addToast(`Welcome back, ${user.name}!`, 'success');

      if (selectedRole === 'STUDENT') {
        navigate('/student');
      } else if (selectedRole === 'ORGANIZER') {
        navigate('/organizer');
      } else {
        navigate('/admin');
      }
    }, 1400);
  };

  return (
    <div className="campus-login ">
      <div className="login-grid" aria-hidden="true"></div>
      <div className="login-glow login-glow-one" aria-hidden="true"></div>
      <div className="login-glow login-glow-two" aria-hidden="true"></div>

      <div className="login-network" aria-hidden="true">
        <svg viewBox="0 0 1400 800" preserveAspectRatio="none">
          <path d="M0 600 C180 450 250 620 420 430 S680 80 900 270 S1150 500 1400 180"></path>
          <path d="M80 130 C280 300 380 80 570 270 S800 620 1080 500 S1250 400 1400 620"></path>
          <path d="M250 800 C400 600 570 650 720 460 S970 180 1160 80"></path>
          <circle cx="420" cy="430" r="4"></circle>
          <circle cx="900" cy="270" r="4"></circle>
          <circle cx="1080" cy="500" r="4"></circle>
          <circle cx="570" cy="270" r="4"></circle>
          <circle cx="1160" cy="80" r="4"></circle>
        </svg>
      </div>

      {/* HEADER */}
      <header className="login-nav">
        <button
          type="button"
          className="login-brand"
          onClick={() => navigate('/')}
          aria-label="CampusCode home"
        >
          <span className="login-brand-mark" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="login-brand-text">
            <strong>CAMPUSCODE</strong>
            <small>HACKATHON ARENA</small>
          </span>
        </button>
        <button
          type="button"
          className="login-back"
          onClick={() => navigate('/')}
        >
          ← BACK TO HOME
        </button>
      </header>

      {/* MAIN */}
      <main className="login-main">
        {/* INTRO COLUMN */}
        <section className="login-intro">
          <div className="login-status">
            <span></span>CAMPUSCODE / AUTHENTICATION
          </div>
          <div className="login-intro-index">
            <span>ACCESS</span>
            <span>01 / 02</span>
          </div>
          <h1>
            ENTER
            <br />
            THE
            <br />
            <span>ARENA.</span>
          </h1>
          <p className="login-intro-description">
            Sign in to continue building, collaborating and competing with the
            CampusCode community.
          </p>

          <div className="login-features">
            <div>
              <strong>01</strong>
              <span>BUILD</span>
            </div>
            <div>
              <strong>02</strong>
              <span>COMPETE</span>
            </div>
            <div>
              <strong>03</strong>
              <span>SHIP</span>
            </div>
          </div>

          <div className="login-system-info">
            <span>
              <i></i>AUTHENTICATION READY
            </span>
            <span>SECURE ACCESS</span>
            <span>2026</span>
          </div>
        </section>

        {/* FORM CARD COLUMN */}
        <section className="login-card-wrapper">
          <div className="login-card">
            <div className="login-card-top">
              <div>
                <span className="login-card-label">EXISTING ACCOUNT</span>
                <h2>LOGIN</h2>
                <p>Access your CampusCode account.</p>
              </div>
              <div className="login-card-index">
                CC
                <br />
                01
              </div>
            </div>

            {/* Quick Demo Selector */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                padding: '6px 8px',
                background: '#f0f0ec',
                borderRadius: 6,
                marginBottom: 16,
              }}
            >
              {['STUDENT', 'ORGANIZER', 'ADMIN'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleQuickDemo(role)}
                  style={{
                    flex: 1,
                    background: selectedRole === role ? '#111' : 'transparent',
                    color: selectedRole === role ? '#fff' : '#666',
                    border: 'none',
                    padding: '6px 8px',
                    borderRadius: 4,
                    fontSize: 9,
                    fontFamily: 'DM Mono, monospace',
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {role} DEMO
                </button>
              ))}
            </div>

            <div className="login-divider"></div>

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="login-field">
                <label htmlFor="login-email">EMAIL ADDRESS</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">@</span>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="login-field">
                <label htmlFor="login-password">PASSWORD</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">•</span>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span>{showPassword ? '◉' : '○'}</span>
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="login-field">
                <label htmlFor="login-captcha">VERIFICATION CODE</label>
                <div className="login-captcha-row">
                  <span
                    className="login-captcha-img"
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      letterSpacing: 6,
                      fontSize: 16,
                      fontWeight: 700,
                      background: '#111',
                      color: '#a8e62e',
                      padding: '8px 14px',
                      borderRadius: 4,
                      userSelect: 'none',
                    }}
                  >
                    {captchaText}
                  </span>
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={generateCaptcha}
                    disabled={isLoading}
                    aria-label="New captcha"
                  >
                    ↻ NEW
                  </button>
                </div>
                <div className="login-input-wrap" style={{ marginTop: 8 }}>
                  <input
                    id="login-captcha"
                    type="text"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setError('');
                    }}
                    placeholder="Type the 5-letter code above"
                    autoComplete="off"
                    disabled={isLoading}
                    maxLength={5}
                  />
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="login-message login-error" role="alert">
                  <span>!</span>
                  <p>{error}</p>
                </div>
              )}

              {/* INTERACTIVE CAR RIDE ANIMATION */}
              <div
                className={`login-ride-stage ${
                  isLoading ? (isWaiting ? 'waiting' : 'drive') : ''
                }`}
                aria-hidden="true"
              >
                {!isLoading && <span className="login-ride-zzz">Zzz</span>}
                <span className="login-ride">
                  <span className="login-ride-body">
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>
                  <span className="login-ride-wheel left"></span>
                  <span className="login-ride-wheel right"></span>
                </span>
                <span className="login-ride-barrier"></span>
                <span className="login-ride-status">
                  {isLoading
                    ? isWaiting
                      ? 'CONNECTING…'
                      : 'RIDING…'
                    : 'READY'}
                </span>
                <span className="login-ride-traffic">● ● ●</span>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="login-submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'CHECKING...' : `LOGIN AS ${selectedRole}`}</span>
                <b className={isLoading ? 'is-loading' : ''}>
                  {isLoading ? '↻' : '↗'}
                </b>
              </button>
            </form>

            <div className="login-card-footer">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="login-register"
                onClick={() => navigate('/register')}
              >
                CREATE IDENTITY<span>↗</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
