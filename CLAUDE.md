# CLAUDE.md - AI Assistant Guidelines for FamilyGuardAngel

This file provides context and guidelines for AI assistants (like Claude) working on this repository.

## Project Overview

**Repository:** marketing_project
**Project:** FamilyGuardAngel Investor Landing Page
**Status:** Active development
**Purpose:** Bilingual (Polish/English) investor landing page for IoT fall detection startup

FamilyGuardAngel is an IoT startup targeting Poland's aging population with mmWave radar technology for elderly fall detection. This repository contains the investor-facing landing page.

---

## Repository Structure

```
marketing_project/
├── CLAUDE.md           # AI assistant guidelines (this file)
├── index.html          # Main landing page (bilingual PL/EN)
├── styles.css          # All CSS styles (responsive, animations)
├── main.js             # JavaScript (i18n, form handling, animations)
├── assets/             # Marketing assets (images, videos, graphics)
└── locales/            # Translation files
    ├── pl/
    │   └── translation.json    # Polish translations
    └── en/
        └── translation.json    # English translations
```

---

## Technology Stack

- **HTML5** - Semantic markup with accessibility considerations
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** - No frameworks, ES6+ features
- **Google Fonts** - Inter font family

### Key Features

- **Bilingual Support** (Polish/English)
  - Language toggle in header (PL | EN)
  - localStorage persistence
  - URL parameter support (`?lang=pl` or `?lang=en`)
  - Browser language auto-detection

- **Responsive Design**
  - Mobile-first approach
  - Breakpoints: 576px, 768px, 968px, 1024px
  - Hamburger menu for mobile

- **Animations**
  - Radar wave CSS animation in hero
  - Scroll-triggered animations via IntersectionObserver
  - Counter animations for statistics
  - Smooth transitions

---

## Brand Guidelines

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Deep Blue) | `#1E3A5F` | Trust, security, headers |
| Accent (Warm Orange) | `#E07A3B` | CTAs, highlights, energy |
| Primary Light | `#2A4A73` | Gradients, hover states |
| Primary Dark | `#152D4A` | Dark sections |

### Typography

- **Font Family:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800
- **Scale:** xs (0.75rem) to 6xl (3.75rem)

---

## Page Sections

1. **Hero** - Headline, key stat, CTA
2. **Problem** - "The Crisis No One Talks About"
3. **Solution** - mmWave technology features, comparison table
4. **Market** - TAM/SAM/Target market opportunity
5. **Business Model** - Pricing, LTV, revenue streams
6. **Financials** - 3-year roadmap
7. **Competitive** - 2x2 positioning matrix
8. **Roadmap** - Timeline of milestones
9. **Team** - 5 team member placeholders
10. **Contact** - Investor inquiry form
11. **Footer** - Copyright, links

---

## Development Guidelines

### Adding/Editing Translations

1. Edit both `locales/pl/translation.json` and `locales/en/translation.json`
2. Use dot notation for nested keys: `"section.subsection.key"`
3. Reference in HTML with `data-i18n="section.subsection.key"`

### CSS Variables

All design tokens are CSS custom properties in `:root`. Modify these for theming:

```css
--color-primary: #1E3A5F;
--color-accent: #E07A3B;
--spacing-md: 1rem;
--radius-md: 0.5rem;
```

### Adding New Sections

1. Add HTML section with `id` attribute
2. Add navigation link in header
3. Add translations to both JSON files
4. Add styles following BEM-like conventions
5. Add `animate-on-scroll` class for scroll animations

### Form Handling

The contact form submits to console (demo mode). To integrate:
1. Update `handleFormSubmit()` in `main.js`
2. Add your API endpoint or form service

---

## Git Workflow

### Branch Naming

- Feature: `feature/<description>`
- Bug fix: `fix/<description>`
- Claude AI: `claude/<description>-<session-id>`

### Commit Messages

- Start with verb: Add, Update, Fix, Remove, Refactor
- Under 72 characters
- Example: `Add contact form validation`

---

## Deployment

### Static Hosting (Recommended)

Deploy to any static host:
- **Vercel:** `vercel --prod`
- **Netlify:** Drag & drop or CLI
- **GitHub Pages:** Push to `gh-pages` branch

### Requirements

- No build step needed
- Serve from root directory
- Ensure `locales/` directory is accessible

### Performance

Target Lighthouse scores: 90+ across all metrics
- Minimize images, use SVG where possible
- Keep JavaScript minimal (no frameworks)
- Use `loading="lazy"` for below-fold images

---

## AI Assistant Instructions

### When Working on This Repository

1. **Read existing files** before modifications
2. **Maintain bilingual parity** - update both language files
3. **Follow CSS variable system** for styling
4. **Test responsive design** at all breakpoints
5. **Preserve animation classes** when editing HTML

### Common Tasks

| Task | Guidelines |
|------|------------|
| Update copy | Edit both `translation.json` files |
| Change colors | Modify CSS variables in `:root` |
| Add section | HTML + nav link + translations + styles |
| Fix mobile | Check breakpoints in `styles.css` |
| Update team | Edit HTML in team section |

### Things to Avoid

- Breaking translation key paths
- Removing `data-i18n` attributes
- Hardcoding text (use translation system)
- Adding heavy dependencies
- Breaking responsive layout

---

## Project-Specific Notes

### Current Status

- **Phase:** MVP Complete
- **Features:** All 11 sections implemented
- **Languages:** Polish (default), English

### Pending Enhancements

- [ ] Add real team photos/bios
- [ ] Integrate form with backend/email service
- [ ] Add calendar booking integration
- [ ] Implement dark mode toggle
- [ ] Add analytics tracking
- [ ] Create favicon and OG images

### External Resources

- [FamilyGuardAngel Brand Guidelines] - TBD
- [Investor Pitch Deck] - TBD

---

## Quick Reference

### Local Development

```bash
# Simple HTTP server (Python)
python -m http.server 8000

# Or with Node.js
npx serve .

# Open browser
open http://localhost:8000
```

### Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main page structure |
| `styles.css` | All styling |
| `main.js` | All JavaScript |
| `locales/*/translation.json` | Translations |

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-01-28 | Initial CLAUDE.md created | Claude AI |
| 2026-01-28 | FamilyGuardAngel landing page MVP | Claude AI |

---

*Last updated: 2026-01-28*
