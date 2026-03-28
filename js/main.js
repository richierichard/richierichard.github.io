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
    d.addEventListener('click', () => tags.scrollTo({ top: i * pageH, behavior: 'smooth' }));
    dotsEl.appendChild(d);
    dots.push(d);
  }

  tags.addEventListener('scroll', () => {
    const cur = Math.round(tags.scrollTop / pageH);
    dots.forEach((d, i) => d.style.background = i === cur ? 'var(--accent)' : 'var(--border2)');
  });
}
window.addEventListener('load', initCloudDots);

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('theme-label').textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  document.getElementById('theme-label').textContent = 'Dark';
}

/* ============================================================
   CONTACT FORM — AJAX SUBMIT (no redirect)
   ============================================================ */
document.getElementById('contact-form').addEventListener('submit', async function(e) {
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
