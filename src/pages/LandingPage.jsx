import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '../components/Toast';

export default function LandingPage({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);
  const { addToast } = useToast();

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (selectedHackathon || videoModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedHackathon(null);
          setVideoModalOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedHackathon, videoModalOpen]);

  // Scroll listener for sticky navbar blur & scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for video auto-play on scroll
  useEffect(() => {
    const video = videoRef.current;
    const section = videoSectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    observer.observe(section);

    return () => {
      observer.disconnect();
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (isMuted) {
        video.muted = false;
        setIsMuted(false);
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const hackathonsData = [
    {
      id: '01',
      tag: 'ARTIFICIAL INTELLIGENCE',
      title: 'AI INNOVATION',
      desc: 'Build intelligent solutions for problems that matter.',
      status: 'LIVE',
      active: true,
      prize: '₹2,50,000',
      teams: '342 registered',
      deadline: '48h remaining',
    },
    {
      id: '02',
      tag: 'WEB DEVELOPMENT',
      title: 'FUTURE WEB',
      desc: 'Design and ship the next generation of digital experiences.',
      status: 'OPEN',
      active: false,
      prize: '₹1,75,000',
      teams: '180 registered',
      deadline: 'Starts in 4 days',
    },
    {
      id: '03',
      tag: 'SMART TECHNOLOGY',
      title: 'CAMPUS TECH',
      desc: 'Create technology that makes student life better.',
      status: 'UPCOMING',
      active: false,
      prize: '₹1,00,000',
      teams: '75 registered',
      deadline: 'Opens Nov 20',
    },
  ];

  return (
    <div className="campus-landing ">
      {/* ---------------- NAVIGATION ---------------- */}
      <header className={`landing-nav ${isScrolled ? 'scrolled' : ''}`}>
        <button
          type="button"
          className="landing-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="CampusCode home"
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

        <nav className={`landing-links ${menuOpen ? 'mobile-open' : ''}`}>
          <button type="button" onClick={() => scrollToSection('about')}>
            ABOUT
          </button>
          <button type="button" onClick={() => scrollToSection('how')}>
            HOW IT WORKS
          </button>
          <button type="button" onClick={() => scrollToSection('hackathons')}>
            HACKATHONS
          </button>
          <button type="button" onClick={() => scrollToSection('community')}>
            COMMUNITY
          </button>
          <button
            type="button"
            className="landing-join mobile-join"
            onClick={() => navigate('/register')}
          >
            JOIN CAMPUSCODE<span>↗</span>
          </button>
        </nav>

        <div className="landing-nav-actions">
          <button
            type="button"
            className="landing-login"
            onClick={() => navigate('/login')}
          >
            LOGIN
          </button>
          <button
            type="button"
            className="landing-join"
            onClick={() => navigate('/register')}
          >
            JOIN CAMPUSCODE<span>↗</span>
          </button>
        </div>

        <button
          type="button"
          className="landing-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="landing-hero">
        <div className="landing-hero-grid"></div>
        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>
        <div className="hero-glow glow-three"></div>

        <div className="hero-network" aria-hidden="true">
          <svg viewBox="0 0 1400 800" preserveAspectRatio="none">
            <path d="M0 600 C180 450 250 620 420 430 S680 80 900 270 S1150 500 1400 180"></path>
            <path d="M80 130 C280 300 380 80 570 270 S800 620 1080 500 S1250 400 1400 620"></path>
            <path d="M250 800 C400 600 570 650 720 460 S970 180 1160 80"></path>
            <circle cx="420" cy="430" r="5"></circle>
            <circle cx="900" cy="270" r="5"></circle>
            <circle cx="1080" cy="500" r="5"></circle>
            <circle cx="570" cy="270" r="5"></circle>
            <circle cx="1160" cy="80" r="5"></circle>
          </svg>
        </div>

        <div className="hero-top-line">
          <span>
            <i></i>THE DIGITAL HOME FOR STUDENT INNOVATION
          </span>
          <span>CHENNAI · INDIA</span>
        </div>

        <div className="hero-content">
          <div className="hero-label">CAMPUSCODE / 001</div>
          <h1>
            BUILD
            <br />
            <span>COMPETE</span>
            <br />
            SHIP.
          </h1>
          <div className="hero-description">
            <p>
              A digital arena for students
              <br />
              who don't just have ideas.
              <br />
              They build them.
            </p>
            <button
              type="button"
              className="hero-explore"
              onClick={() => scrollToSection('hackathons')}
            >
              <span>EXPLORE HACKATHONS</span>
              <b>↗</b>
            </button>
          </div>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <div className="hero-scroll-line">
            <i></i>
          </div>
          <span>01 / 05</span>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <section className="landing-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>IDEAS</span>
          <b>✦</b>
          <span>PEOPLE</span>
          <b>✦</b>
          <span>PRODUCTS</span>
          <b>✦</b>
          <span>INNOVATION</span>
          <b>✦</b>
          <span>COMMUNITY</span>
          <b>✦</b>
          <span>IDEAS</span>
          <b>✦</b>
          <span>PEOPLE</span>
          <b>✦</b>
          <span>PRODUCTS</span>
          <b>✦</b>
          <span>INNOVATION</span>
          <b>✦</b>
        </div>
      </section>

      {/* ---------------- ABOUT (01) ---------------- */}
      <section id="about" className="landing-about">
        <div className="section-number">01</div>
        <div className="about-content">
          <div className="small-label">
            <i></i>WHAT IS CAMPUSCODE?
          </div>
          <h2>
            WHERE
            <br />
            STUDENTS
            <br />
            <em>BUILD.</em>
          </h2>
          <p>
            CampusCode brings students, teams, organizers and hackathons into
            one connected ecosystem.
          </p>
        </div>
        <div className="about-visual" aria-hidden="true">
          <div className="about-ring ring-a"></div>
          <div className="about-ring ring-b"></div>
          <div className="about-ring ring-c"></div>
          <div className="about-core">CC</div>
          <span className="about-node node-1">01</span>
          <span className="about-node node-2">02</span>
          <span className="about-node node-3">03</span>
        </div>
      </section>

      {/* ---------------- EXPERIENCE FILM (02) ---------------- */}
      <section
        id="experience"
        ref={videoSectionRef}
        className="landing-video experience-inline"
      >
        <div className="video-grid"></div>
        <div className="video-top">
          <span>02 — EXPERIENCE</span>
          <span>00:30</span>
        </div>
        <div className="video-center">
          <small>THE CAMPUSCODE EXPERIENCE</small>
          <strong>
            BUILD
            <br />
            TOGETHER.
          </strong>
        </div>

        <div
          className="experience-film"
          role="button"
          tabIndex={0}
          aria-label="Play the What is CampusCode film"
          onClick={handleVideoClick}
          onKeyDown={(e) => e.key === 'Enter' && handleVideoClick()}
        >
          <video
            ref={videoRef}
            src="/videos/what-is-campuscode.mp4"
            loop
            playsInline
            muted={isMuted}
            preload="metadata"
          />
          <span className="experience-play-badge">
            {isPlaying ? '❚❚' : '▶'}
          </span>
          <span className="experience-hint">
            {isPlaying ? 'TAP TO PAUSE' : 'TAP TO PLAY'}
          </span>
        </div>

        <div className="video-bottom">
          <span>WATCH THE STORY</span>
          <span
            className="video-auto-note"
            style={{ cursor: 'pointer' }}
            onClick={() => setVideoModalOpen(true)}
          >
            EXPAND CINEMATIC VIEW ↗
          </span>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS (03) ---------------- */}
      <section id="how" className="landing-how">
        <div className="section-heading">
          <div>
            <span>03</span>
            <h2>HOW IT WORKS</h2>
          </div>
          <p>
            FROM IDEA
            <br />
            TO IMPACT.
          </p>
        </div>

        <div className="steps-grid">
          <div
            className="step-card"
            onClick={() => {
              scrollToSection('hackathons');
              addToast('Showing available arena challenges');
            }}
          >
            <div className="step-number">01</div>
            <div className="step-line"></div>
            <h3>DISCOVER</h3>
            <p>Find a challenge that makes you want to build.</p>
            <span className="step-arrow">↗</span>
          </div>

          <div
            className="step-card"
            onClick={() => {
              navigate('/register');
              addToast('Connect with talented builders');
            }}
          >
            <div className="step-number">02</div>
            <div className="step-line"></div>
            <h3>TEAM UP</h3>
            <p>Find people who share your ambition.</p>
            <span className="step-arrow">↗</span>
          </div>

          <div
            className="step-card"
            onClick={() => {
              navigate('/student');
              addToast('Enter student development workspace');
            }}
          >
            <div className="step-number">03</div>
            <div className="step-line"></div>
            <h3>BUILD</h3>
            <p>Turn your idea into something people can use.</p>
            <span className="step-arrow">↗</span>
          </div>

          <div
            className="step-card"
            onClick={() => {
              navigate('/student');
              addToast('Ship to arena for judging');
            }}
          >
            <div className="step-number">04</div>
            <div className="step-line"></div>
            <h3>SHIP</h3>
            <p>Submit your work and take it to the arena.</p>
            <span className="step-arrow">↗</span>
          </div>
        </div>
      </section>

      {/* ---------------- HACKATHONS ARENA (04) ---------------- */}
      <section id="hackathons" className="landing-hackathons">
        <div className="section-heading">
          <div>
            <span>04</span>
            <h2>ENTER THE ARENA</h2>
          </div>
          <button type="button" onClick={() => navigate('/student')}>
            VIEW ALL ↗
          </button>
        </div>

        <div className="hackathon-list">
          {hackathonsData.map((hack) => (
            <article
              key={hack.id}
              className="hackathon-row"
              onClick={() => setSelectedHackathon(hack)}
            >
              <div className="hack-number">{hack.id}</div>
              <div className="hack-title">
                <small>{hack.tag}</small>
                <h3>{hack.title}</h3>
              </div>
              <p>{hack.desc}</p>
              <div className="hack-status">
                <i className={hack.active ? 'active' : ''}></i>
                {hack.status}
              </div>
              <span className="hack-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- MISSION STATEMENT (05) ---------------- */}
      <section className="landing-statement">
        <div className="statement-watermark">CAMPUSCODE</div>
        <div className="statement-content">
          <span>05 — THE MISSION</span>
          <h2>
            GREAT
            <br />
            IDEAS
            <br />
            <em>NEED BUILDERS.</em>
          </h2>
          <p>
            Your university is full of people with ideas. CampusCode gives those
            ideas somewhere to go.
          </p>
        </div>
      </section>

      {/* ---------------- COMMUNITY ---------------- */}
      <section id="community" className="landing-community">
        <div className="community-left">
          <span>THE NETWORK</span>
          <h2>
            FIND
            <br />
            YOUR
            <br />
            <em>PEOPLE.</em>
          </h2>
        </div>
        <div className="community-right">
          <div className="community-orbit" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <strong>CC</strong>
          </div>
          <p>
            Build with developers.
            <br />
            Think with designers.
            <br />
            Compete with builders.
          </p>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="landing-cta">
        <div className="cta-grid"></div>
        <div className="cta-content">
          <small>READY?</small>
          <h2>
            YOUR NEXT
            <br />
            <span>PROJECT</span>
            <br />
            STARTS HERE.
          </h2>
          <button type="button" onClick={() => navigate('/register')}>
            JOIN CAMPUSCODE<span>↗</span>
          </button>
        </div>
        <div className="cta-orb"></div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="landing-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-mark" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span>
                <strong>CAMPUSCODE</strong>
                <small>HACKATHON ARENA</small>
              </span>
            </div>
            <p>
              The student hackathon arena.
              <br />
              You build the idea,
              <br />
              we run the competition.
            </p>
          </div>

          <div className="footer-column">
            <h4>PRODUCT</h4>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            <a href="#hackathons" onClick={(e) => { e.preventDefault(); scrollToSection('hackathons'); }}>Hackathons</a>
            <a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('how'); }}>How it works</a>
            <a href="#community" onClick={(e) => { e.preventDefault(); scrollToSection('community'); }}>Community</a>
          </div>

          <div className="footer-column">
            <h4>BUILDERS</h4>
            <button type="button" style={{ background: 'none', border: 'none', color: '#777', textAlign: 'left', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => navigate('/student')}>Students</button>
            <button type="button" style={{ background: 'none', border: 'none', color: '#777', textAlign: 'left', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => navigate('/student')}>Teams</button>
            <button type="button" style={{ background: 'none', border: 'none', color: '#777', textAlign: 'left', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => navigate('/organizer')}>Organizers</button>
            <button type="button" style={{ background: 'none', border: 'none', color: '#777', textAlign: 'left', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => navigate('/student')}>Developers</button>
          </div>

          <div className="footer-column">
            <h4>GUIDES</h4>
            <a href="#about" onClick={(e) => { e.preventDefault(); addToast('Official Hackathon Rules Loaded'); }}>Hackathon Rules</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); addToast('FAQ Section'); }}>FAQ</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); addToast('Support channel online 24/7'); }}>Support</a>
            <button type="button" style={{ background: 'none', border: 'none', color: '#777', textAlign: 'left', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => navigate('/verify/CC-2026-WIN')}>Verify Certificate</button>
          </div>
        </div>

        <div className="footer-status">
          <div>
            <i className="live-pulse-dot" style={{ marginRight: 6 }}></i>
            ALL SYSTEMS OPERATIONAL
          </div>
          <a href="#terms" onClick={(e) => { e.preventDefault(); addToast('CampusCode Terms & Conditions'); }}>TERMS</a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); addToast('CampusCode Privacy Policy'); }}>PRIVACY</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); addToast('hello@campuscode.co.in'); }}>CONTACT</a>
        </div>

        <div className="footer-watermark">CampusCode</div>

        <div className="footer-bottom">
          <span>© 2026 CAMPUSCODE</span>
          <span>LEARN · BUILD · COMPETE · SHIP</span>
          <span>CHENNAI · INDIA</span>
        </div>
      </footer>

      {/* ---------------- INTERACTIVE HACKATHON DETAILS MODAL ---------------- */}
      {selectedHackathon &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="arena-modal-overlay"
            onClick={() => setSelectedHackathon(null)}
          >
            <div
              className="arena-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      letterSpacing: 1.5,
                      color: '#858580',
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    {selectedHackathon.tag} · {selectedHackathon.id}
                  </span>
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      margin: 0,
                      color: '#111',
                    }}
                  >
                    {selectedHackathon.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHackathon(null)}
                  style={{
                    background: '#f0f0ec',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: 15,
                    color: '#111',
                  }}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <p
                style={{
                  color: '#4f4f4b',
                  fontSize: 13,
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {selectedHackathon.desc}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10,
                  marginBottom: 24,
                  background: '#f7f7f4',
                  padding: 14,
                  borderRadius: 8,
                  border: '1px solid #deded8',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'DM Mono',
                      fontSize: 9,
                      color: '#858580',
                      display: 'block',
                    }}
                  >
                    PRIZE POOL
                  </span>
                  <strong
                    style={{
                      fontSize: 15,
                      color: '#82b91a',
                      fontWeight: 800,
                    }}
                  >
                    {selectedHackathon.prize}
                  </strong>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'DM Mono',
                      fontSize: 9,
                      color: '#858580',
                      display: 'block',
                    }}
                  >
                    TEAMS
                  </span>
                  <strong style={{ fontSize: 13, color: '#111' }}>
                    {selectedHackathon.teams}
                  </strong>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'DM Mono',
                      fontSize: 9,
                      color: '#858580',
                      display: 'block',
                    }}
                  >
                    TIMELINE
                  </span>
                  <strong style={{ fontSize: 13, color: '#7665ff' }}>
                    {selectedHackathon.deadline}
                  </strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="hero-explore"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 8,
                    background: '#111',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                  onClick={() => {
                    setSelectedHackathon(null);
                    navigate('/student');
                    addToast(
                      `Entered ${selectedHackathon.title} Arena!`,
                      'success'
                    );
                  }}
                >
                  <span>ENTER ARENA WORKSPACE</span>
                  <b>↗</b>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ---------------- CINEMATIC VIDEO MODAL ---------------- */}
      {videoModalOpen && (
        <div
          className="video-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(16px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'videoModalIn 0.3s ease-out',
          }}
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: 960,
              width: '100%',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 0 50px rgba(168, 230, 46, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              ✕
            </button>
            <video
              src="/videos/what-is-campuscode.mp4"
              controls
              autoPlay
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
