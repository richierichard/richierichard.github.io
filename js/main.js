/* ============================================================
   SITE CONFIG — edit values here, they update everywhere
   ============================================================ */
var SITE_CONFIG = {
  yearsExperience : '15+',
  certifications  : '8',
  cloudPlatforms  : '7+',
  teamsLed        : '5+',
  copyrightYear   : new Date().getFullYear()
};

(function () {
  document.querySelectorAll('[data-site-value]').forEach(function (el) {
    var key = el.getAttribute('data-site-value');
    if (SITE_CONFIG[key] !== undefined) el.textContent = SITE_CONFIG[key];
  });
}());

/* ============================================================
   NETWORK TOPOLOGY BACKGROUND
   ============================================================ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const COUNT = 28;
  const MAX_DIST = 200;
  const SPEED = 0.25;
  const MAX_PACKETS = 20;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeNode() {
    const server = Math.random() < 0.25;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: server ? 3.5 : 1.8,
      server,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.015 + Math.random() * 0.01,
    };
  }

  function makePacket(a, b) {
    return {
      ax: a.x, ay: a.y,
      bx: b.x, by: b.y,
      t: 0,
      speed: 0.004 + Math.random() * 0.004,
      cyan: Math.random() < 0.4,
    };
  }

  const nodes = [];
  let packets = [];
  let lastSpawn = 0;

  function init() {
    resize();
    nodes.length = 0;
    for (let i = 0; i < COUNT; i++) nodes.push(makeNode());
  }

  function isLight() { return document.body.classList.contains('light'); }

  function update() {
    nodes.forEach(function (n) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.phase += n.phaseSpeed;
    });
    packets = packets.filter(function (p) { p.t += p.speed; return p.t < 1; });
  }

  function spawnPackets(now) {
    if (now - lastSpawn < 500 || packets.length >= MAX_PACKETS) return;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < MAX_DIST * MAX_DIST && Math.random() < 0.04) {
          const rev = Math.random() < 0.5;
          packets.push(makePacket(rev ? nodes[j] : nodes[i], rev ? nodes[i] : nodes[j]));
        }
      }
    }
    lastSpawn = now;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const light = isLight();
    const nodeColor  = light ? '2,132,199'   : '56,189,248';
    const cyanColor  = light ? '2,132,199'   : '56,189,248';
    const lineAlpha  = light ? 0.12 : 0.18;
    const nodeAlpha  = light ? 0.55 : 0.55;

    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MAX_DIST * MAX_DIST) {
          const a = (1 - Math.sqrt(d2) / MAX_DIST) * lineAlpha;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(' + nodeColor + ',' + a + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // nodes
    nodes.forEach(function (n) {
      const glow = (Math.sin(n.phase) + 1) * 0.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + nodeColor + ',' + (nodeAlpha + glow * 0.3) + ')';
      ctx.fill();
      if (n.server) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 4 + glow * 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + nodeColor + ',' + (0.12 * glow) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // packets
    packets.forEach(function (p) {
      const x = p.ax + (p.bx - p.ax) * p.t;
      const y = p.ay + (p.by - p.ay) * p.t;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + (p.cyan ? cyanColor : nodeColor) + ',0.9)';
      ctx.fill();
    });
  }

  function loop(now) {
    update();
    spawnPackets(now);
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', function () {
    resize();
    nodes.forEach(function (n) {
      n.x = Math.min(n.x, W);
      n.y = Math.min(n.y, H);
    });
  });

  init();
  requestAnimationFrame(loop);
}());

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ============================================================
   CLOUD TAGS PAGINATION DOTS
   ============================================================ */
function initCloudDots() {
  const tags = document.getElementById('cloud-tags');
  const dotsEl = document.getElementById('cloud-dots');
  const pageH = tags.clientHeight;
  const pageCount = Math.ceil(tags.scrollHeight / pageH);
  const dots = [];

  for (let i = 0; i < pageCount; i++) {
    const d = document.createElement('button');
    d.style.cssText =
      'width:10px;height:10px;border-radius:50%;border:none;cursor:pointer;padding:0;' +
      'transition:background 0.2s;background:' + (i === 0 ? 'var(--accent)' : 'var(--border2)') + ';';
    d.addEventListener('click', () => {
      // Read maxScroll at click time so fonts/layout are fully settled
      const maxScroll = tags.scrollHeight - tags.clientHeight;
      const scrollPos = i === pageCount - 1 ? maxScroll : i * pageH;
      tags.scrollTo({ top: scrollPos, behavior: 'smooth' });
    });
    dotsEl.appendChild(d);
    dots.push(d);
  }

  tags.addEventListener('scroll', () => {
    const cur = Math.round(tags.scrollTop / pageH);
    dots.forEach((d, i) => d.style.background = i === cur ? 'var(--accent)' : 'var(--border2)');
  });
}
// Use document.fonts.ready so scrollHeight is measured after fonts are applied
if (document.getElementById('cloud-tags')) document.fonts.ready.then(initCloudDots);

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('theme-label').textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}


// Default is dark; switch to light only if explicitly saved
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  document.getElementById('theme-label').textContent = 'Dark';
}

/* ============================================================
   CONTACT FORM — AJAX SUBMIT (no redirect)
   ============================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const res = await fetch('https://formspree.io/f/mgoporww', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    if (res.ok) {
      form.reset();
      const modal = document.getElementById('contact-modal');
      modal.style.display = 'flex';
      modal.addEventListener('click', function(ev) {
        if (ev.target === modal) modal.style.display = 'none';
      }, { once: true });
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch {
    alert('Network error. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send message';
  }
});
