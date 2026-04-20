# richierichard.github.io

Personal portfolio website for **Richie Richard Rajkumar** — Senior DevOps Engineer & Infrastructure Architect based in Berlin, Germany.

Live at: **[www.richierichard.com](https://www.richierichard.com)**

---

## Pages

| URL | File | Description |
|-----|------|-------------|
| `/` | `index.html` | Homepage — hero, skills, experience, projects, contact |
| `/about` | `about.html` | Detailed about page — bio, certifications, education |
| `/blog` | `blog.html` | Blog listing — search, tag filters, post cards |
| `/blog/s3-regional-namespaces` | `blog/s3-regional-namespaces.html` | Article: AWS S3 Bucket Naming Just Changed Forever |
| `/blog/kubernetes-mcp-server` | `blog/kubernetes-mcp-server.html` | Article: Kubernetes MCP Server in Practice |
| `/blog/kubernetes-mcp-server-centralised` | `blog/kubernetes-mcp-server-centralised.html` | Article: Centralised MCP Server with IRSA |
| `/blog/s3-files-filesystem` | `blog/s3-files-filesystem.html` | Article: S3 Files — S3 Buckets as File Systems |
| `/blog/eks-spot-instances` | `blog/eks-spot-instances.html` | Article: EKS Spot Instances Cost Optimisation |

---

## Tech stack

- Plain HTML, CSS, JavaScript — no framework, no build tool, no bundler
- Fonts: [Nunito](https://fonts.google.com/specimen/Nunito) + [Fira Code](https://fonts.google.com/specimen/Fira+Code) via Google Fonts
- Contact form: [Formspree](https://formspree.io)
- Hosting: [Vercel](https://vercel.com) with automatic deploys on push to `main`

---

## Project structure

```
richierichard.github.io/
├── index.html               # Homepage
├── about.html               # About page
├── blog.html                # Blog listing page
├── favicon.svg              # SVG favicon — green R³ on transparent background
├── vercel.json              # Vercel config — clean URLs + redirects
├── css/
│   └── style.css            # All shared styles
├── js/
│   └── main.js              # Network animation, scroll reveal, theme toggle, contact form
├── blog/
│   ├── s3-regional-namespaces.html
│   ├── kubernetes-mcp-server.html
│   ├── kubernetes-mcp-server-centralised.html
│   ├── s3-files-filesystem.html
│   └── eks-spot-instances.html
├── CNAME                    # Legacy GitHub Pages file (no longer active)
└── README.md
```

---

## Local development

Since the site uses absolute asset paths (`/css/style.css`, `/js/main.js`) for Vercel compatibility, opening HTML files directly with `file://` will not load styles or scripts correctly.

**Option 1 — Python (no install needed):**
```bash
cd /path/to/richierichard.github.io
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

**Option 2 — Vercel CLI (matches production exactly):**
```bash
npm i -g vercel
vercel dev
```
Then open `http://localhost:3000`.

**Option 3 — VS Code:**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html` → **Open with Live Server**.

---

## Deployment

Push to `main` → Vercel auto-deploys → live at `www.richierichard.com` within ~30 seconds.

- `richierichard.com` redirects to `www.richierichard.com` (handled by Vercel)
- Every branch gets an auto-generated preview URL before merging

---

## Notes

- All asset and nav links use absolute paths (e.g. `/css/style.css`, `/about`) — do not change to relative paths
- Email addresses in HTML are entity-encoded to deter scrapers — do not decode them
- Page-specific styles for `about.html` and `blog.html` are in inline `<style>` blocks within those files, not in `style.css`
