# CLAUDE.md — Project Context for Claude Code

## Project overview
Personal portfolio website and technical blog for Richie Richard Rajkumar (Senior DevOps Engineer, Berlin).
Deployed as a static site via **Vercel** at `https://www.richierichard.com/`.

## File structure
```
richierichard.github.io/
├── index.html               # Homepage — hero, intro, skills, experience, projects, contact
├── about.html               # Dedicated detailed About Me page
├── blog.html                # Blog listing page — search, tag filters, post cards
├── favicon.svg              # SVG favicon — transparent background, green R³ in Courier New
├── vercel.json              # Vercel config — clean URLs + .html → clean URL redirects
├── github-profile-README.md # Source file for GitHub profile README (deploy to richierichard/richierichard repo)
├── css/
│   └── style.css            # All styles, organised by section with comments
├── js/
│   └── main.js              # All scripts: network animation, scroll reveal, cloud dots, theme toggle, contact form
├── blog/
│   ├── s3-regional-namespaces.html         # Article: AWS S3 Account-Regional Namespaces (March 2026)
│   ├── kubernetes-mcp-server.html          # Article: Kubernetes MCP Server in Practice (April 2026)
│   └── kubernetes-mcp-server-centralised.html # Article: Centralised MCP Server with IRSA (April 2026)
├── CNAME                    # GitHub Pages artefact (no longer used by Vercel)
└── README.md
```

## Tech stack
- Plain HTML/CSS/JS — no framework, no build tool, no bundler
- Fonts loaded from Google Fonts (Nunito + Fira Code)
- Contact form submitted via **Formspree** (`https://formspree.io/f/mgoporww`) using fetch + JSON — no page redirect
- Deployed automatically by **Vercel** on push to `main`

## Navigation structure
Top nav (all pages): **Home · About · Blog · Contact** only.
- `Blog` links to `/blog` — blog listing page with search, tag filters, and post cards
- Active page link is highlighted with `style="color:var(--accent)"`
- All nav links use **absolute paths** (`/about`, `/blog`, `/#contact`, `/`)
- All asset paths (CSS, JS, favicon) use **absolute paths** (`/css/style.css`, `/js/main.js`, `/favicon.svg`) — required because Vercel serves `about.html` at `/about` and relative paths would resolve incorrectly

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

## blog.html — Blog listing page
Full blog listing with client-side search and tag filtering.

**Layout:**
- Hero section with title and search bar
- Two-column grid: sticky sidebar (210px) + post cards (1fr)
- Responsive: sidebar stacks at 860px, post cards simplify at 600px
- Inline styles in `blog.html` (~290 lines)

**Sidebar:**
- Tag filter buttons with post counts (e.g., `AWS (2)`, `Kubernetes (2)`)
- Active tag highlighted; "All posts" is default
- "Articles published" stat counter
- Tags: AWS, Kubernetes, DevOps, AI, Platform Engineering, S3, Infrastructure, GitOps

**Post cards:**
- Each card is an `<a>` with `data-tags`, `data-title`, `data-excerpt` attributes for filtering
- Tags, title, excerpt, date, read time, hover arrow
- Cards link to `/blog/{slug}` (clean URLs)

**Search & filter JS** (inline `<script>` at bottom):
- Text search matches against title, excerpt, and tags (case-insensitive)
- Tag buttons filter by `data-tags` attribute
- "No results" message shown when nothing matches
- `#visible-count` updates dynamically

**"More coming" section:**
- Terminal widget showing `git status` on `blog/drafts` branch with article count in progress
- Update the article count when publishing new posts

**When adding a new blog post:**
1. Create `blog/{slug}.html` using an existing article as template
2. Add a post card `<a>` in `blog.html` (newest first, above existing cards)
3. Update tag filter counts in the sidebar
4. Update the "All posts" count and `#visible-count` stat
5. Update the "articles in progress" count in the terminal widget if applicable

## blog/ — Article pages
Each article is a standalone HTML file in the `blog/` directory with:
- Same nav, canvas animation, and theme toggle as all pages
- Page-specific inline `<style>` block (~200+ lines) — not in `style.css`
- All asset paths use absolute paths (`/css/style.css`, `/js/main.js`, `/favicon.svg`)

**Article structure (top to bottom):**
| Component | Class | Content |
|-----------|-------|---------|
| Back link | `.article-back` | `← Back to Blog` linking to `/blog` |
| Header | `.article-header` | Tags (`.article-tag`), title (`.article-title` with accent `<span>`), meta (author, date, read time) |
| Hero image | `.article-hero` | Inline SVG diagram (~760×320–420px), dark gradient background, Fira Code labels |
| Intro | `.article-intro` | 1–2 paragraphs of context before the main body |
| Body | `.article-body` | Sections with `h2` (bordered bottom), `h3` (accent color), paragraphs, lists, code blocks |
| Divider | `.article-divider` | Horizontal line |
| Footer | `.article-footer` | Author card (R³ avatar, name, role) + "← All articles" back button |

**Reusable content components in articles:**
- **Code blocks** — `<pre>` with syntax highlighting via span classes: `.cm` (comment/muted), `.ky` (keyword/accent), `.st` (string/pink), `.nm` (name/yellow)
- **Callout boxes** — `.callout` div with accent left border, used for key takeaways and author opinions
- **Comparison tables** — `.compare-table` with `.good` (accent/green) and `.bad` (red) cell classes
- **Conversation blocks** — `.conversation` div with `.human` (accent blue), `.ai` (purple #a78bfa), `.msg` children; used for AI dialogue examples

**Published articles:**
| Slug | Title | Date | Tags |
|------|-------|------|------|
| `s3-regional-namespaces` | AWS S3 Bucket Naming Just Changed Forever | March 2026 | AWS, S3, Infrastructure, DevOps |
| `kubernetes-mcp-server` | Talk to Your Cluster: Kubernetes MCP Server in Practice | April 2026 | Kubernetes, AI, DevOps, Platform Engineering |
| `kubernetes-mcp-server-centralised` | One MCP Server, Eight Clusters: Centralised AI Access with IRSA | April 2026 | Kubernetes, AWS, AI, Platform Engineering, DevOps |

## favicon.svg
- SVG favicon, transparent background, green R³ in Courier New bold
- `<link rel="icon" href="favicon.svg" type="image/svg+xml">` added to all pages
- For `about.html` and `blog.html` the path is relative from the same root directory

## Network topology background animation
Canvas-based animation in `main.js` (`#bg-canvas` element, first child of `<body>`).
- Applied to `index.html`, `about.html`, `blog.html`, and all `blog/*.html` article pages
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
- All asset paths (`/css/style.css`, `/js/main.js`, `/favicon.svg`) use absolute paths — do not use relative paths or they will break on `/about` and `/blog`
- All nav links use absolute paths (`/`, `/about`, `/blog`, `/#contact`)
- Avoid adding frameworks, build tools, or extra dependencies; keep it static and fast
- Preview files (`preview-*.html`) are throwaway — can be deleted after use

## Deployment
Hosted on **Vercel** (migrated from GitHub Pages).
- Push to `main` on GitHub → Vercel auto-deploys → live at `https://www.richierichard.com/` within ~30 seconds
- **`vercel.json`** configures clean URLs (`cleanUrls: true`) and permanent redirects for `.html` → clean URL (`/index.html` → `/`, `/about.html` → `/about`, `/blog.html` → `/blog`)
- Vercel serves clean URLs: `/` → `index.html`, `/about` → `about.html`, `/blog` → `blog.html`, `/blog/slug` → `blog/slug.html`
- Every branch/PR gets an auto-generated preview URL for reviewing changes before merging
- The `CNAME` file is a GitHub Pages artefact and no longer used by Vercel (DNS is managed in Vercel dashboard)
- Vercel automatically redirects `richierichard.com` → `www.richierichard.com` (apex to www redirect handled at the platform level, no config needed)
- Local testing with `file://` will not reflect clean URLs — use `vercel dev` CLI or `python3 -m http.server` for local previews
