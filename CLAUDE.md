# CLAUDE.md — Project Context for Claude Code

## Project overview
Personal portfolio website for Richie Richard Rajkumar (Senior DevOps Engineer, Berlin).
Deployed as a static site via **GitHub Pages** at `https://richierichard.com/`.

## File structure
```
richierichard.github.io/
├── index.html               # Homepage — hero, intro, skills, experience, projects, contact
├── about.html               # Dedicated detailed About Me page
├── blog.html                # Blog coming soon page
├── favicon.svg              # SVG favicon — transparent background, green R³ in Courier New
├── github-profile-README.md # Source file for GitHub profile README (deploy to richierichard/richierichard repo)
├── css/
│   └── style.css            # All styles, organised by section with comments
├── js/
│   └── main.js              # All scripts: network animation, scroll reveal, cloud dots, theme toggle, contact form
├── CNAME                    # GitHub Pages custom domain → richierichard.com
└── README.md
```

## Tech stack
- Plain HTML/CSS/JS — no framework, no build tool, no bundler
- Fonts loaded from Google Fonts (Nunito + Fira Code)
- Contact form submitted via **Formspree** (`https://formspree.io/f/mgoporww`) using fetch + JSON — no page redirect
- Deployed automatically by GitHub Pages on push to `main`

## Navigation structure
Top nav (all pages): **Home · About · Blog · Contact** only.
- `Blog` links to `blog.html` — "Something is cooking" coming soon page
- Active page link is highlighted with `style="color:var(--accent)"`
- All links use **relative paths** (`about.html`, `blog.html`, `index.html#contact`) — no leading `/` — so they work locally with `file://` and on GitHub Pages

## index.html — Homepage sections (by anchor ID)
| ID           | Content                                         |
|--------------|-------------------------------------------------|
| `#hero`      | Hero — name, role, stats, terminal visual       |
| `#about-me`  | "Get to Know Me" — intro text + highlight cards |
| `#skills`    | Skills grid — cards by category                 |
| `#experience`| Timeline of work history                        |
| `#projects`  | Consulting projects                             |
| `#contact`   | Contact info + form                             |

Notes:
- Certifications section removed from homepage — full detailed certs live on `about.html`
- Education section removed from homepage — lives on `about.html` only
- Browser tab title: "Richie Richard Rajkumar — Leader · Visionary · Architect"

## Side navigation (index.html only)
A fixed right-side dot navigator (`.side-nav` div, NOT a `<nav>` element — avoid `<nav>` or it inherits the top nav styles).
- Links: Introduction, Skills, Experience, Projects, Contact (Certifications removed)
- Labels hidden by default, slide in on hover
- Active section dot scales up via scroll-spy JS at the bottom of `index.html`
- Scroll-spy array: `['about-me','skills','experience','projects','contact']`
- Hidden on screens narrower than 1200px (`@media (max-width: 1200px)`)
- `.side-nav` must NOT be in the `section, footer, .hero { position: relative }` grouping — it has its own `position: fixed` rule

## about.html — Dedicated About page
A separate full page at `richierichard.com/about.html` with:
- Extended bio + sidebar info cards
- Stats row (15+ yrs, 8 certs, 7+ platforms, 5+ teams)
- Four pillar cards (What I Do)
- Skill proficiency bars with animated fill (JS IntersectionObserver)
- Engineering philosophy (6 cards)
- Career direction / What I'm looking for (Director of DevOps & Infrastructure / Staff Principal)
- Consulting services (3 cards)
- **Detailed certifications** — 8 cards with description, issuer, and skill tags (`.cert-detail-card`)
- Education
- Contact CTA block
- Page-specific styles are inline `<style>` block in `about.html` — not in `style.css`

## blog.html — Coming soon page
- "Something is cooking" message with a terminal `git status` widget showing 3 articles in progress
- Same nav and canvas animation as other pages
- Inline styles in `blog.html`

## favicon.svg
- SVG favicon, transparent background, green R³ in Courier New bold
- `<link rel="icon" href="favicon.svg" type="image/svg+xml">` added to all pages
- For `about.html` and `blog.html` the path is relative from the same root directory

## Network topology background animation
Canvas-based animation in `main.js` (`#bg-canvas` element, first child of `<body>`).
- Applied to `index.html`, `about.html`, and `blog.html`
- 28 floating nodes (25% larger "server" nodes with pulse ring, 75% smaller endpoint nodes)
- Connection lines drawn between nodes within 200px, opacity fades with distance
- Data packets (small dots, green or cyan) travel along connections
- Adapts to light/dark mode by reading `document.body.classList.contains('light')`
- Canvas: `position: fixed; z-index: 0` — sections/footer have `position: relative; z-index: 1` to sit above it
- `main.js` guards page-specific elements with null checks: `cloud-tags` and `contact-form`
- **Do NOT use `<nav>` for the side nav** — the global `nav {}` CSS rule would override its positioning

## Nav logo
```html
<a href="index.html" class="nav-logo">
  <span class="nav-logo-mark">R<sup style="font-size:0.6em;letter-spacing:0;">3</sup></span>
  <span class="nav-logo-tag">build · scale · secure</span>
</a>
```
- `.nav-logo-mark` and `.nav-logo-tag` have `display: block` to ensure they always stack vertically
- Tagline: "build · scale · secure"

## Footer
- Both `index.html` and `about.html` footer reads: `© 2026 Richie Richard Rajkumar · Built with Claude`

## Contact links
- Email: `contact@richierichard.com` (HTML-entity-encoded in HTML to deter scrapers)
- LinkedIn: `https://www.linkedin.com/in/richierichard/`
- GitHub: `https://github.com/richierichard` (icon: GitHub dark favicon image)
- X/Twitter: `https://x.com/RajkumarRichie`
- Location: Berlin, Germany

## Conventions
- **No build step** — edits to HTML, CSS, or JS files are live on push
- **CSS variables** for theming (`--bg`, `--accent`, `--muted`, etc.) — dark mode by default, light mode toggled via `body.light`
- **Scroll reveal** — add class `reveal` to any element to animate it in on scroll
- **Emails are HTML-entity-encoded** in HTML files to deter scrapers — do not decode them
- All inter-page links use relative paths (no leading `/`) — absolute paths break `file://` local testing
- Avoid adding frameworks, build tools, or extra dependencies; keep it static and fast
- Preview files (`preview-*.html`) are throwaway — can be deleted after use

## Deployment
Push to `main` → GitHub Actions auto-deploys to GitHub Pages → live at `https://richierichard.com/` within ~1 minute.
