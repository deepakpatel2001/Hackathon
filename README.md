# CampusCode Clone — Hackathon Edition

A pixel-faithful, responsive clone of **[CampusCode](https://www.campuscode.co.in/)** engineered with React, Vite, and custom CSS enhancements. Built to respect 100% of the original design rules, color palettes, typography, and layout, while adding high-impact UX improvements.

---

## 🔒 Constraints Preserved (100% Adherence)

| Constraint | Implementation Detail |
|---|---|
| **Colour Combination** | Exact CSS variables: `--bg: #f7f7f4`, `--surface: #fff`, `--lime: #a8e62e`, `--lime-dark: #82b91a`, `--purple: #7665ff`, `--blue: #526eff`, `--black: #111` |
| **Typography** | Exact font families: `Inter, sans-serif`, `DM Mono, monospace`, `Space Grotesk`, `Times New Roman` with identical weights & line heights |
| **Navbar** | Exact `.landing-nav` skewed 3-bar logo mark, brand typography, links (`ABOUT`, `HOW IT WORKS`, `HACKATHONS`, `COMMUNITY`), action buttons & mobile toggle |
| **Sidebar** | Full 13-tab student sidebar with exact icon styling, active state, and organizer/admin sidebar configurations |
| **Cards & Sections** | Identical DOM structure for Hero, Infinite Marquee, About, Experience Film, How it works (01–04), Arena challenges, Mission statement, Community orbital, and Footer |
| **Buttons** | Identical shapes, fonts, and diagonal arrows (`↗`, `<b>↗</b>`, `<span>↗</span>`) |
| **Spacing & Alignment** | Exact padding, grid gaps, margins, and flex alignments from original CSS |
| **Overall Layout** | 1:1 match with original desktop and mobile responsiveness |

---

## 🚀 The 7 Key Improvements Implemented

1. **Smooth Page Transitions**
   - Seamless cubic-bezier view changes with gentle scaling and fade-in (`animation: pageIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)`).
   - Sticky navbar with automatic backdrop blur and elevation when scrolled.

2. **Button Hover Animations**
   - Magnetic micro-scale lift (`translateY(-2px) scale(1.02)`) with matching ambient colored glows.
   - Smooth diagonal translation on arrow symbols (`translate(4px, -4px)`).
   - Sweeping white light shimmer on primary action buttons (`buttonShine`).
   - Tactile active press state (`scale(0.98)`).

3. **Card Hover Effects**
   - 3D lift with subtle shadow depth on all step cards and dashboard panels (`translateY(-8px)`).
   - Dynamic border highlights with brand lime neon shimmer.
   - Horizontal sliding card hover on hackathon rows with left border accent indicator.

4. **Smooth Loading Animations**
   - Shimmering skeleton loaders with sweeping brand gradient.
   - Dual-ring counter-rotating brand loader spinner.
   - Staggered entrance animations for data rows and leaderboard cards.

5. **Sidebar Transitions**
   - Smooth spring slide-in and slide-out for mobile drawer.
   - Vertical sliding pill indicator on active navigation items with ease-out spring.
   - Micro-indentation and icon glow on hover.

6. **Micro-interactions**
   - Custom floating cursor ring (`.landing-cursor`) that tracks movement with fluid momentum and expands over interactive elements.
   - Interactive animated car ride on login (`login-ride-stage` with spinning wheels, headlights, and traffic lights).
   - Wiggling notification bell with pulse badge.
   - Dynamic confetti burst upon registering for hackathons or submitting projects.
   - One-click quick demo switcher for Student, Organizer, and Admin personas.
   - Interactive AI project feasibility evaluator (`IdeaCheck AI`).
   - Holographic student digital ID card.

7. **Smooth Scrolling**
   - Native momentum scrolling with customized scrollbars matching CampusCode neutral tones.
   - Top reading progress bar indicating position on page.
   - Floating back-to-top pill that appears smoothly past the hero section.

---

## 🧭 Pages Included

- **`/` — Landing Page**: Complete hero, animated neural network, marquee, about rings, film player, step cards, arena list, mission watermark, community orbits, CTA, and footer.
- **`/login` — Login Screen**: Credentials authentication, captcha verification, interactive car animation, password visibility toggle, and one-click persona demos.
- **`/register` — Registration Screen**: 2-step onboarding (Profile Details -> 6-digit OTP verification) with password strength meter.
- **`/student` — Student Arena Dashboard**: Real-time stats, Round 2 countdown clock, milestone upload dropzone, arena leaderboard, IdeaCheck AI evaluator, and digital ID card.
- **`/organizer` — Organizer Arena Console**: Hackathon creation wizard, submission reviews, and participant management.
- **`/admin` — Root System Console**: Dark terminal interface with CPU/memory telemetry, email quota tracking, and event approval queue.
- **`/verify/:code` — Certificate Verification**: Cryptographic certificate verification screen with animated verified stamp.

---

## 🛠️ Tech Stack & Setup

- **Framework**: React 18 + Vite 6
- **Icons**: Lucide React
- **FX**: Canvas Confetti
- **Styles**: Original CampusCode production stylesheet + modular improvement layer (`src/styles/improvements.css`)

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
