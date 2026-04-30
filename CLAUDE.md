# CLAUDE.md — Project Context for Claude Code

## Project overview
Personal portfolio website and technical blog for Richie Richard Rajkumar (Infrastructure Architect & Engineering Leader, Berlin).
Deployed as a static site via **Vercel** at `https://www.richierichard.com/`.

## File structure
```
richierichard.github.io/
├── index.html               # Homepage — hero with photo, metrics, operating model, skills, experience, projects, writing, contact
├── about.html               # Dedicated detailed About Me page
├── blog.html                # Blog listing page — search, tag filters, post cards
├── favicon.svg              # SVG favicon — candy red background, white R³ in Courier New
├── vercel.json              # Vercel config — clean URLs + .html → clean URL redirects
├── github-profile-README.md # Source file for GitHub profile README (deploy to richierichard/richierichard repo)
├── css/
│   └── style.css            # All shared styles — design tokens, nav, hero, sections, footer, responsive
├── js/
│   └── main.js              # Scripts: sticky header, mobile nav toggle, scroll reveal, TOC, contact form, site config
├── img/
│   └── richie.jpeg          # Portrait photo used in hero section (300×300, displayed at 4:5 ratio via CSS)
├── blog/
│   ├── s3-regional-namespaces.html         # Article: AWS S3 Account-Regional Namespaces (March 2026)
│   ├── kubernetes-mcp-server.html          # Article: Kubernetes MCP Server in Practice (April 2026)
│   ├── kubernetes-mcp-server-centralised.html # Article: Centralised MCP Server with IRSA (April 2026)
│   ├── s3-files-filesystem.html            # Article: S3 Files — S3 Buckets as File Systems (April 2026)
│   ├── eks-spot-instances.html             # Article: EKS Spot Instances Cost Optimisation (April 2026)
│   ├── eks-scaling-with-keda.html         # Article: KEDA Event-Driven Scaling with SQS (April 2026)
│   ├── eks-scaling-with-karpenter.html    # Article: Karpenter Node Scaling on EKS (May 2026)
│   ├── eks-cluster-autoscaler-vs-karpenter.html # Article: CAS vs Karpenter Comparison (May 2026)
│   └── helm-to-kustomize.html                  # Article: Helm to Kustomize Migration (May 2026)
├── CNAME                    # GitHub Pages artefact (no longer used by Vercel)
└── README.md
```

## Tech stack
- Plain HTML/CSS/JS — no framework, no build tool, no bundler
- Fonts loaded from Google Fonts (Inter + Fira Code)
- Headings use Georgia (system serif font) — no Google Fonts load needed
- Contact form submitted via **Formspree** (`https://formspree.io/f/mgoporww`) using fetch + JSON — no page redirect
- Deployed automatically by **Vercel** on push to `main`

## Design system
Warm executive aesthetic — single light theme, no dark mode.

**Colour palette (CSS variables in `:root`):**
| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#f7f5f0` | Page background (warm sandalwood) |
| `--surface` | `#fffdfa` | Card/panel background |
| `--surface-strong` | `#ffffff` | Strong card background |
| `--ink` | `#171717` | Primary text |
| `--muted` | `#5d615d` | Secondary text |
| `--line` | `#dfdbd2` | Borders |
| `--line-strong` | `#c9c2b6` | Strong borders |
| `--accent` | `#c41e3a` | Accent — Mazda Soul Red Crystal (candy red) |
| `--accent-deep` | `#8b1425` | Dark accent (hover, deep text) |
| `--accent-soft` | `#fce8ec` | Light accent background (blush tint) |

**Typography:**
| Variable | Value | Usage |
|----------|-------|-------|
| `--sans` | Inter, system stack | Body text |
| `--serif` | Georgia, Times New Roman | Headings (h1, h2) |
| `--mono` | Fira Code | Code blocks, labels, eyebrows |

**Other tokens:** `--shadow`, `--radius: 8px`, `--shell: 1180px`, `--section`, `--section-tight`

## Navigation structure
Sticky header nav (`<header class="site-header">`) on all pages:
- Brand: R³ mark (candy red bg, white text) + name + tagline "build · scale · secure"
- Links: **About · Expertise · Experience · Writing · Contact**
- Contact link styled as CTA button (`.nav-cta`)
- Mobile: hamburger toggle (`[data-nav-toggle]`) shows dropdown menu (`.nav-menu.is-open`)
- All nav links use **absolute paths** (`/about`, `/blog`, `/#contact`, `/#expertise`, `/#experience`)
- All asset paths use **absolute paths** (`/css/style.css`, `/js/main.js`, `/favicon.svg`)

## index.html — Homepage sections (by anchor ID)
| ID | Content |
|----|---------|
| (hero) | Hero — photo with profile card, headline, description, CTAs |
| `#impact` | Metrics bar (15+ yrs, 8 certs, 7+ platforms, 5+ teams) |
| `#expertise` | Operating model — 4 numbered capability cards |
| `#skills` | Core expertise — 9 skill category cards with tags |
| `#experience` | Career arc — 7 timeline items |
| `#projects` | Consulting projects — 2 project cards |
| `#writing` | Latest articles — 3 blog post cards |
| `#contact` | Contact form + links |
| (CTA) | LinkedIn CTA panel |

Notes:
- Hero uses profile photo (`/img/richie.jpeg`) with CSS `aspect-ratio: 4/5` and `object-fit: cover`
- Profile card overlaps photo bottom with `margin: -76px auto 0`
- Numbered sections use eyebrow labels: "01 — Leadership focus", "02 — Technical depth", etc.
- Browser tab title: "Richie Richard Rajkumar — Leader · Visionary · Architect"

## about.html — Dedicated About page
A separate full page at `richierichard.com/about` with:
- Extended bio + sidebar info cards
- Stats row (15+ yrs, 8 certs, 7+ platforms, 5+ teams)
- Four pillar cards (What I Do)
- Skill proficiency bars with animated fill (JS IntersectionObserver)
- Engineering philosophy (6 numbered cards)
- Career direction / What I'm looking for (Director of DevOps & Infrastructure / Staff Principal)
- Consulting services (3 cards)
- **Detailed certifications** — 8 cards with description, issuer, and skill tags
- Education
- Contact CTA block
- Page-specific styles are inline `<style>` block in `about.html` — not in `style.css`

## blog.html — Blog listing page
Full blog listing with client-side search and tag filtering.

**Layout:**
- Hero section with title and search bar
- Two-column grid: sticky sidebar (210px) + post cards (1fr)
- Responsive: sidebar stacks at 860px, post cards simplify at 600px
- Inline styles in `blog.html`

**Sidebar:**
- Tag filter buttons with post counts (e.g., `AWS (7)`, `Kubernetes (7)`)
- Active tag highlighted; "All posts" is default
- "Articles published" stat counter
- Tags: AI, AWS, Cost Engineering, DevOps, FinOps, GitOps, Infrastructure, Kubernetes, Platform Engineering, S3

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
3. Add a writing card `<a>` on `index.html` in the writing section (keep 3 most recent)
4. Update tag filter counts in the sidebar
5. Update the "All posts" count and `#visible-count` stat
6. Update the "articles in progress" count in the terminal widget if applicable

## blog/ — Article pages
Each article is a standalone HTML file in the `blog/` directory with:
- Same sticky header nav and footer as all pages
- Page-specific inline `<style>` block (~200+ lines) — not in `style.css`
- All asset paths use absolute paths (`/css/style.css`, `/js/main.js`, `/favicon.svg`)

**Article structure (top to bottom):**
| Component | Class | Content |
|-----------|-------|---------|
| Back link | `.article-back` | `← Back to Blog` linking to `/blog` |
| Header | `.article-header` | Tags (`.article-tag`), title (`.article-title` with accent `<span>`), meta (author, date, read time) |
| Hero image | `.article-hero` | Inline SVG diagram (~760×320–420px), gradient background, Fira Code labels |
| Intro | `.article-intro` | 1–2 paragraphs of context before the main body |
| Body | `.article-body` | Sections with `h2` (bordered bottom), `h3` (accent color), paragraphs, lists, code blocks |
| Divider | `.article-divider` | Horizontal line |
| Footer | `.article-footer` | Author card (R³ avatar, name, role) + "← All articles" back button |

**Reusable content components in articles:**
- **Code blocks** — `<pre>` with syntax highlighting via span classes: `.cm` (comment/muted), `.ky` (keyword/accent), `.st` (string/pink), `.nm` (name/yellow)
- **Callout boxes** — `.callout` div with accent left border, used for key takeaways and author opinions
- **Comparison tables** — `.compare-table` with `.good` (accent) and `.bad` (red) cell classes
- **Conversation blocks** — `.conversation` div with `.human` (accent), `.ai` (purple #a78bfa), `.msg` children; used for AI dialogue examples

**Published articles:**
| Slug | Title | Date | Tags |
|------|-------|------|------|
| `s3-regional-namespaces` | AWS S3 Bucket Naming Just Changed Forever | March 2026 | AWS, S3, Infrastructure, DevOps |
| `kubernetes-mcp-server` | Talk to Your Cluster: Kubernetes MCP Server in Practice | April 2026 | Kubernetes, AI, DevOps, Platform Engineering |
| `kubernetes-mcp-server-centralised` | One MCP Server, Eight Clusters: Centralised AI Access with IRSA | April 2026 | Kubernetes, AWS, AI, Platform Engineering, DevOps |
| `s3-files-filesystem` | S3 Files: Your Buckets Are File Systems Now | April 2026 | AWS, S3, Infrastructure, DevOps |
| `eks-spot-instances` | EKS Spot Instances: A Practical Guide to Cutting Your Kubernetes Compute Costs | April 2026 | Kubernetes, AWS, FinOps, Cost Engineering, DevOps, Infrastructure, Platform Engineering |
| `eks-scaling-with-keda` | KEDA on EKS: Event-Driven Scaling with SQS Queue Depth | May 2026 | Kubernetes, AWS, Cost Engineering, DevOps, Infrastructure, Platform Engineering |
| `eks-scaling-with-karpenter` | Karpenter on EKS: Right-Sized Nodes in 60 Seconds | May 2026 | Kubernetes, AWS, Cost Engineering, DevOps, Infrastructure, Platform Engineering |
| `eks-cluster-autoscaler-vs-karpenter` | Cluster Autoscaler vs Karpenter: Choosing the Right Node Scaler for EKS | May 2026 | Kubernetes, AWS, Cost Engineering, DevOps, Infrastructure, Platform Engineering |
| `helm-to-kustomize` | From Helm to Kustomize: Why We Ditched Templates for Overlays | May 2026 | Kubernetes, DevOps, GitOps, Platform Engineering |

## favicon.svg
- SVG favicon, candy red background (`#c41e3a`), white R³ in Courier New bold
- `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` on all pages

## Nav brand
```html
<a class="brand" href="/" aria-label="Richie Richard Rajkumar home">
  <span class="brand-mark">R<sup style="font-size:0.6em">3</sup></span>
  <span class="brand-lockup">
    <span class="brand-name">Richie Richard Rajkumar</span>
    <span class="brand-tagline">build · scale · secure</span>
  </span>
</a>
```
- `.brand-mark` is candy red background with white text
- Tagline: "build · scale · secure"

## Footer
All pages use `<footer class="site-footer">` with:
- Brand mark, description
- Navigation links column
- Connect links column (email, LinkedIn, GitHub, X, location)
- Bottom bar: copyright + "Built with Claude"

## Contact links
- Email: `contact@richierichard.com` (HTML-entity-encoded in HTML to deter scrapers)
- LinkedIn: `https://www.linkedin.com/in/richierichard/`
- GitHub: `https://github.com/richierichard` (icon: GitHub dark favicon image)
- X/Twitter: `https://x.com/RajkumarRichie`
- Location: Berlin, Germany

## Conventions
- **No build step** — edits to HTML, CSS, or JS files are live on push
- **CSS variables** for theming — warm sandalwood palette, single light theme, no dark mode
- **Scroll reveal** — add class `reveal` to any element to animate it in on scroll (via IntersectionObserver in `main.js`)
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
