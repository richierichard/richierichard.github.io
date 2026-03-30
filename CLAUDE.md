# CLAUDE.md — Project Context for Claude Code

## Project overview
Personal portfolio website for Richie Richard Rajkumar (Senior DevOps Engineer, Berlin).
Deployed as a static site via **GitHub Pages** at `https://richierichard.com/`.

## File structure
```
richierichard.github.io/
├── index.html               # Homepage — hero, intro, skills, experience, projects, certs, contact
├── about.html               # Dedicated detailed About Me page
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
Top nav (both pages): **Home · About · Blog · Contact** only.
- `Blog` links to `blog.html` (not yet built)
- Active page link is highlighted with `style="color:var(--accent)"`
- All links use **relative paths** (`about.html`, `index.html#contact`) — no leading `/` — so they work locally and on GitHub Pages

## index.html — Homepage sections (by anchor ID)
| ID           | Content                                        |
|--------------|------------------------------------------------|
| `#hero`      | Hero — name, role, stats, terminal visual      |
| `#about-me`  | "Get to Know Me" — intro text + highlight cards |
| `#skills`    | Skills grid — cards by category               |
| `#experience`| Timeline of work history                       |
| `#projects`  | Consulting projects                            |
| `#certs`     | Certifications grid                            |
| `#contact`   | Contact info + form                            |

Note: Education section was intentionally removed from the homepage — it lives on `about.html`.

## Side navigation (index.html only)
A fixed right-side dot navigator (`.side-nav` div, NOT a `<nav>` element — avoid `<nav>` or it inherits the top nav styles).
- Links: Introduction, Skills, Experience, Projects, Certifications, Contact
- Labels hidden by default, slide in on hover
- Active section dot scales up via scroll-spy JS at the bottom of `index.html`
- Hidden on screens narrower than 1200px (`@media (max-width: 1200px)`)

## about.html — Dedicated About page
A separate full page at `richierichard.com/about.html` with:
- Extended bio + sidebar info cards
- Stats row (15+ yrs, 8 certs, 7+ platforms, 5+ teams)
- Four pillar cards (What I Do)
- Skill proficiency bars with animated fill (JS IntersectionObserver)
- Engineering philosophy (6 cards)
- Career direction / What I'm looking for (Director of DevOps & Infrastructure / Staff Principal)
- Consulting services (3 cards)
- Certifications grid
- Education
- Contact CTA block
- Page-specific styles are inline `<style>` block in `about.html` — not in `style.css`

## Network topology background animation
Canvas-based animation in `main.js` (`#bg-canvas` element, first child of `<body>`).
- 28 floating nodes (25% larger "server" nodes with pulse ring, 75% smaller endpoint nodes)
- Connection lines drawn between nodes within 200px, opacity fades with distance
- Data packets (small dots, green or cyan) travel along connections
- Adapts to light/dark mode by reading `document.body.classList.contains('light')`
- Canvas: `position: fixed; z-index: 0` — sections/footer have `position: relative; z-index: 1` to sit above it
- **Do NOT use `<nav>` for the side nav** — the global `nav {}` CSS rule would override its positioning

## Contact links
- Email: `contact@richierichard.com` (HTML-entity-encoded in HTML to deter scrapers)
- LinkedIn: `https://www.linkedin.com/in/richierichard/`
- GitHub: `https://github.com/richierichard` (icon: GitHub dark favicon image)
- X/Twitter: `https://x.com/RajkumarRichie`
- Location: Berlin, Germany

## Conventions
- **No build step** — edits to `index.html`, `about.html`, `css/style.css`, or `js/main.js` are live on push
- **CSS variables** for theming (`--bg`, `--accent`, `--muted`, etc.) — dark mode by default, light mode toggled via `body.light`
- **Scroll reveal** — add class `reveal` to any element to animate it in on scroll
- **Emails are HTML-entity-encoded** in HTML files to deter scrapers — do not decode them
- All inter-page links use relative paths (no leading `/`)
- Avoid adding frameworks, build tools, or extra dependencies; keep it static and fast

## Deployment
Push to `main` → GitHub Actions auto-deploys to GitHub Pages → live at `https://richierichard.com/` within ~1 minute.
