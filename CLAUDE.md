# CLAUDE.md — Project Context for Claude Code

## Project overview
Personal portfolio website for Richie Richard Rajkumar (Senior DevOps Engineer, Berlin).
Deployed as a static site via **GitHub Pages** at `https://richierichard.com/`.

## File structure
```
richierichard.github.io/
├── index.html      # All markup — single-page site, sections linked by anchor IDs
├── css/
│   └── style.css   # All styles, organised by section with comments
├── js/
│   └── main.js     # All scripts: scroll reveal, cloud dots, theme toggle, contact form
├── CNAME           # GitHub Pages custom domain → richierichard.com
└── README.md
```

## Tech stack
- Plain HTML/CSS/JS — no framework, no build tool, no bundler
- Fonts loaded from Google Fonts (Nunito + Fira Code)
- Contact form submitted via **Formspree** (`https://formspree.io/f/mgoporww`) using fetch + JSON — no page redirect
- Deployed automatically by GitHub Pages on push to `main`

## Sections (by anchor ID)
| ID           | Content                          |
|--------------|----------------------------------|
| `#about`     | Hero — name, role, stats, terminal visual |
| `#skills`    | Skills grid — cards by category  |
| `#experience`| Timeline of work history         |
| `#certs`     | Certifications grid              |
| `#education` | Education entry                  |
| `#contact`   | Contact info + form              |

## Conventions
- **No build step** — edits to `index.html`, `css/style.css`, or `js/main.js` are live on push
- **CSS variables** for theming (`--bg`, `--accent`, `--muted`, etc.) — dark mode by default, light mode toggled via `body.light`
- **Scroll reveal** — add class `reveal` to any element to animate it in on scroll
- **Emails are HTML-entity-encoded** in `index.html` to deter scrapers — do not decode them
- Avoid adding frameworks, build tools, or extra dependencies; keep it static and fast

## Deployment
Push to `main` → GitHub Actions auto-deploys to GitHub Pages → live at `https://richierichard.com/` within ~1 minute.
