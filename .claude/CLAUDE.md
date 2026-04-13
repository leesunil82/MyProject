# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**my-profile-site** is a Vite-based portfolio website for a full-stack developer. It features a dark/light theme toggle, smooth animations, responsive design, and is deployed on Vercel.

**Tech Stack**: Vite 5.0.8 | Tailwind CSS 3.4.1 | Vanilla JavaScript | ES Modules | PostCSS | Autoprefixer

## Common Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

### JavaScript: Class-Based Pattern

All JavaScript functionality is organized as classes initialized in `DOMContentLoaded`:

1. **ThemeToggler** — Dark/light theme toggle using CSS variables and localStorage
   - Button: `#themeToggleBtn`
   - Saves theme preference to `localStorage.getItem('theme')`
   - Applies theme by toggling `html.light` class

2. **ScrollProgressBar** — Horizontal progress bar at top showing scroll position
   - Element: `#scrollBar`
   - Updates on scroll event

3. **ScrollReveal** — Intersection Observer-based scroll animations
   - Targets: `.reveal`, `.reveal-left`, `.reveal-right` classes
   - Adds `.active` class when 10% visible
   - Rootmargin: `'0px 0px -50px 0px'` for timing control

4. **ParallaxHandler** — Parallax scroll effect on emoji
   - Element: `#parallaxEmoji`
   - Transform: `translateY(scrollY * 0.3)` for slow scroll effect

5. **MobileMenuManager** — Mobile navigation toggle
   - Button: `#mobileMenuBtn`
   - Menu: `#mobileMenu`
   - Closes on link click or button toggle

6. **SmoothScrollHandler** — Smooth scrolling for anchor links (`href="#..."`)
   - Uses `scrollIntoView({ behavior: 'smooth' })`

7. **updateYear()** — Auto-updates footer year
   - Element: `#year`

**Adding new features**: Create a class in `src/main.js`, add initialization in the `DOMContentLoaded` handler.

### Styling: CSS Variables + Tailwind

**Color System** (`src/style.css` `:root`):
```
Dark mode (default):
  --dark-main: #222831
  --dark-bg: #101010
  --card: #393E46
  --cyan: #00ADB5
  --orange: #C84B31
  --lime: #00FF94
  --blue: #001AFF
  --text: #EEEEEE

Light mode (html.light):
  --dark-main: #F5F5F5
  --dark-bg: #FFFFFF
  --card: #E8E8E8
  --text: #101010
  (accent colors unchanged)
```

Use CSS variables inline: `style="background-color: var(--cyan);"` or create Tailwind utilities.

**Animations defined in `src/style.css`**:
- `revealUp`, `revealLeft`, `revealRight` (0.8s ease-out)
- `progressBar` (4s gradient animation)

**Hover effects**: `.skill-card`, `.project-card`, `.career-card` scale up (1.05) with cyan glow on hover.

### HTML Structure

**Page sections** (anchor targets):
- `#page1` — Home (hero with parallax emoji)
- `#page2` — Skills (6 skill cards with progress bars)
- `#page3` — Career (timeline with current job badge)
- `#page4` — Projects (3 project cards with alternating layout)
- `#page5` — Contact (phone, email, call-to-action)

**Key IDs**:
- `#scrollBar` — Progress indicator
- `#mobileMenuBtn`, `#mobileMenu` — Mobile nav
- `#themeToggleBtn` — Theme toggle button
- `#parallaxEmoji` — Parallax element (👨‍💻 on home)
- `#year` — Footer year span

**Layout**: Single-column mobile (default), 2-column at `md` breakpoint (768px). Max width: `max-w-6xl` (1152px). Padding: `px-6`.

## Development Conventions

### JavaScript Patterns

- Use **ES Module syntax** (`import`, `export`); support HMR with `if (import.meta.hot) { import.meta.hot.accept() }`
- **Always use class-based structure** for new features; avoid inline scripts
- Select elements by ID or class; store references as instance properties
- **Initialization**: Add to `DOMContentLoaded`, not at module level

### HTML & Semantic Markup

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`
- Include `aria-label`, `aria-expanded`, `aria-controls` for accessibility
- Use `role="img"` on decorative emoji (or `aria-hidden="true"` for figure/div emoji)
- All content in Korean (`lang="ko"`)

### CSS & Responsive Design

- Prefer **Tailwind utility classes** over custom CSS
- Mobile-first: defaults apply to small screens, `md:` classes for 768px+
- Example: `hidden md:flex` (hidden on mobile, flex on desktop)
- **Custom styles go in `src/style.css`**: animations, scrollbar, color variables, card hover effects
- Dark mode: Use CSS variables and `html.light` class toggle; Tailwind's `dark:` prefix not needed

### Adding New Features

1. **Add HTML**: Create section or elements with appropriate IDs/classes
2. **Add JavaScript**: Create class in `src/main.js`, initialize in `DOMContentLoaded`
3. **Add styles**: Use Tailwind classes inline; add custom CSS to `src/style.css` if needed
4. **Test on mobile**: Use browser DevTools responsive mode at 768px breakpoint

## Vercel Deployment

- **Build command**: `npm run build`
- **Output dir**: `dist`
- **Framework**: Vite (auto-detected)
- **Config file**: `vercel.json`
- Preview deployments on every push; production on `main` branch

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page HTML with all 5 sections |
| `src/main.js` | All JavaScript classes and initialization |
| `src/style.css` | Animations, colors, custom utilities, scrollbar |
| `tailwind.config.js` | Tailwind config; `darkMode: 'class'` |
| `vite.config.js` | Vite config; dev server port 5173 |
| `.claude/rules/project-rules.md` | Detailed project rules (backup reference) |

## Testing & Debugging

- **Dev server**: `npm run dev` → http://localhost:5173 with HMR
- **Inspect theme**: Check `localStorage.theme` in DevTools console
- **Test animations**: Scroll page, resize to `md` breakpoint, toggle theme
- **Mobile menu**: Test at widths < 768px
- **Parallax**: Scroll and confirm emoji moves slower than page scroll

## Notes for Future Changes

- **No build-time SSG/SSR**: This is a static site; all interactivity is client-side
- **No framework dependencies**: Only Vite, Tailwind, PostCSS, Autoprefixer
- **Localization**: Currently Korean-only; translations would require `data-i18n` attributes and a small i18n module
- **SEO**: Basic meta tags set; consider adding Open Graph tags if sharing on social media
- **Analytics**: None currently; Google Analytics or Vercel Analytics can be added if needed
