import React, { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';

export default function RegisterPage({ navigate }) {
  const [step, setStep] = useState('details'); // 'details' | 'otp'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(true);
  const [captchaText, setCaptchaText] = useState('4M8W1');
  const [captchaInput, setCaptchaInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpTimer, setOtpTimer] = useState(300);
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  // OTP countdown timer
  useEffect(() => {
    if (step !== 'otp' || otpTimer <= 0) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // Password strength checker
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setError('');

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const { password, confirmPassword } = formData;

    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!ageConfirmed) {
      setError('Please confirm that you are 18 years of age or older.');
      return;
    }

    if (captchaInput.toUpperCase() !== captchaText) {
      setError('Verification code did not match.');
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setOtpTimer(300);
      setGeneratedOtp('849201');
      addToast('A 6-digit verification code was generated!');
    }, 800);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== '123456') {
      setError('Code did not match. Enter 849201 to test.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: 'STUDENT',
        campusId: `CC-${Math.floor(10000 + Math.random() * 90000)}`,
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', 'STUDENT');
      localStorage.setItem('token', 'mock_jwt_token_campuscode_2026');

      addToast(`Identity verified! Welcome to CampusCode, ${user.name}!`, 'success');
      navigate('/student');
    }, 1000);
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="campus-register ">
      <div className="register-grid" aria-hidden="true"></div>
      <div className="register-glow register-glow-one" aria-hidden="true"></div>
      <div className="register-glow register-glow-two" aria-hidden="true"></div>

      <div className="register-network" aria-hidden="true">
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
      <header className="register-nav">
        <button
          type="button"
          className="register-brand"
          onClick={() => navigate('/')}
          aria-label="CampusCode home"
        >
          <span className="register-brand-mark" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span className="register-brand-text">
            <strong>CAMPUSCODE</strong>
            <small>HACKATHON ARENA</small>
          </span>
        </button>
        <button
          type="button"
          className="register-back"
          onClick={() => navigate('/')}
        >
          ← BACK TO HOME
        </button>
      </header>

      {/* MAIN */}
      <main className="register-main">
        {/* INTRO COLUMN */}
        <section className="register-intro">
          <div className="register-status">
            <span></span>CAMPUSCODE / REGISTRATION
          </div>
          <div className="register-intro-index">
            <span>CREATE</span>
            <span>02 / 02</span>
          </div>
          <h1>
            JOIN
            <br />
            THE
            <br />
            <span>ARENA.</span>
          </h1>
          <p className="register-intro-description">
            Create your CampusCode identity and become part of a student
            ecosystem designed around ideas, teams, technology and competition.
          </p>

          <div className="register-info-grid">
            <div className="register-info-card register-info-card-main">
              <div className="register-info-card-top">
                <span>01</span>
                <span>IDENTITY</span>
              </div>
              <strong>CREATE</strong>
              <p>Build your student profile and enter the CampusCode ecosystem.</p>
              <div className="register-info-line">
                <i></i>
              </div>
            </div>

            <div className="register-info-card">
              <div className="register-info-card-top">
                <span>02</span>
                <span>TEAM</span>
              </div>
              <strong>COLLABORATE</strong>
              <p>Find teammates and build projects together.</p>
            </div>

            <div className="register-info-card">
              <div className="register-info-card-top">
                <span>03</span>
                <span>ARENA</span>
              </div>
              <strong>COMPETE</strong>
              <p>Join hackathons and turn ideas into submissions.</p>
            </div>
          </div>

          <div className="register-system-info">
            <div>
              <span className="register-system-dot"></span>
              REGISTRATION OPEN
            </div>
            <div>STUDENT INNOVATION NETWORK</div>
            <div>2026</div>
          </div>
        </section>

        {/* FORM CARD */}
        <section className="register-card-wrapper">
          <div className="register-card">
            <div className="register-card-top">
              <div>
                <span className="register-card-label">NEW ACCOUNT</span>
                <h2>REGISTER</h2>
                <p className="register-card-description">
                  {step === 'details'
                    ? 'Create your CampusCode account.'
                    : 'Verify your email code.'}
                </p>
              </div>
              <div className="register-card-index">
                CC
                <br />
                02
              </div>
            </div>

            <div className="register-divider"></div>

            {step === 'details' ? (
              <form onSubmit={handleDetailsSubmit}>
                {/* FULL NAME */}
                <div className="register-field">
                  <label htmlFor="reg-name">FULL NAME</label>
                  <div className="register-input-wrap">
                    <span className="register-input-icon">◇</span>
                    <input
                      id="reg-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      disabled={isLoading}
                      autoFocus
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="register-field">
                  <label htmlFor="reg-email">EMAIL ADDRESS</label>
                  <div className="register-input-wrap">
                    <span className="register-input-icon">@</span>
                    <input
                      id="reg-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@university.edu"
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="register-field">
                  <label htmlFor="reg-password">PASSWORD</label>
                  <div className="register-input-wrap">
                    <span className="register-input-icon">•</span>
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 8 chars with letter & number"
                      autoComplete="new-password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                  {formData.password && (
                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          style={{
                            height: 3,
                            flex: 1,
                            borderRadius: 2,
                            background:
                              strength >= bar
                                ? strength >= 3
                                  ? '#82b91a'
                                  : '#f59e0b'
                                : '#e5e5e0',
                            transition: 'background-color 0.2s',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="register-field">
                  <label htmlFor="reg-confirm">CONFIRM PASSWORD</label>
                  <div className="register-input-wrap">
                    <span className="register-input-icon">•</span>
                    <input
                      id="reg-confirm"
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* AGE CONFIRMATION CHECKBOX */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    margin: '16px 0 12px 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => setAgeConfirmed(!ageConfirmed)}
                >
                  <input
                    type="checkbox"
                    id="reg-age"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    style={{ accentColor: '#111', cursor: 'pointer' }}
                  />
                  <label
                    htmlFor="reg-age"
                    style={{
                      fontSize: 11,
                      color: '#4f4f4b',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    I confirm that I am 18 years of age or older.
                  </label>
                </div>

                {/* CAPTCHA */}
                <div className="register-field">
                  <label>VERIFICATION CODE</label>
                  <div className="login-captcha-row">
                    <span
                      className="login-captcha-img"
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        letterSpacing: 6,
                        fontSize: 15,
                        fontWeight: 700,
                        background: '#111',
                        color: '#a8e62e',
                        padding: '6px 14px',
                        borderRadius: 4,
                      }}
                    >
                      {captchaText}
                    </span>
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={generateCaptcha}
                      disabled={isLoading}
                    >
                      ↻ NEW
                    </button>
                  </div>
                  <div className="register-input-wrap" style={{ marginTop: 8 }}>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setError('');
                      }}
                      placeholder="Type the 5-letter code above"
                      disabled={isLoading}
                      maxLength={5}
                    />
                  </div>
                </div>

                {error && (
                  <div className="login-message login-error" role="alert">
                    <span>!</span>
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="login-submit"
                  disabled={isLoading}
                  style={{ marginTop: 16 }}
                >
                  <span>{isLoading ? 'PREPARING...' : 'CONTINUE TO VERIFY'}</span>
                  <b>↗</b>
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <div
                  style={{
                    background: '#f7f7f4',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 20,
                    border: '1px solid #deded8',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 13, color: '#111' }}>
                    Enter verification code sent to:
                  </p>
                  <strong style={{ fontSize: 14, color: '#7665ff' }}>
                    {formData.email}
                  </strong>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: 'DM Mono',
                      fontSize: 10,
                      color: '#82b91a',
                      background: 'rgba(130, 185, 26, 0.1)',
                      padding: '4px 8px',
                      borderRadius: 4,
                      display: 'inline-block',
                    }}
                  >
                    Demo Test Code: <strong>{generatedOtp}</strong>
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="reg-otp">6-DIGIT CODE</label>
                  <div className="register-input-wrap">
                    <span className="register-input-icon">#</span>
                    <input
                      id="reg-otp"
                      type="text"
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value);
                        setError('');
                      }}
                      placeholder="849201"
                      maxLength={6}
                      autoFocus
                      disabled={isLoading}
                      style={{ letterSpacing: 4, fontSize: 18, fontWeight: 700 }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 8,
                      fontSize: 11,
                      fontFamily: 'DM Mono',
                      color: '#858580',
                    }}
                  >
                    <span>
                      Expires in: {Math.floor(otpTimer / 60)}:
                      {(otpTimer % 60).toString().padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#7665ff',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                      onClick={() => {
                        setOtpTimer(300);
                        addToast('New code sent!');
                      }}
                    >
                      Resend Code
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="login-message login-error" role="alert">
                    <span>!</span>
                    <p>{error}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    style={{
                      background: '#f0f0ec',
                      border: 'none',
                      borderRadius: 8,
                      padding: '12px 18px',
                      fontFamily: 'DM Mono',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    ← BACK
                  </button>
                  <button
                    type="submit"
                    className="login-submit"
                    disabled={isLoading}
                    style={{ flex: 1 }}
                  >
                    <span>{isLoading ? 'VERIFYING...' : 'FINISH REGISTRATION'}</span>
                    <b>↗</b>
                  </button>
                </div>
              </form>
            )}

            <div className="login-card-footer">
              <span>Already have an account?</span>
              <button
                type="button"
                className="login-register"
                onClick={() => navigate('/login')}
              >
                LOGIN HERE<span>↗</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
