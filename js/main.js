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
   STICKY HEADER — add border on scroll
   ============================================================ */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function check() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', check, { passive: true });
  check();
}());

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-nav-menu]');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  // Close menu on link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}());

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(function (el) { observer.observe(el); });
}());

/* ============================================================
   TABLE OF CONTENTS (article pages — auto-generated)
   ============================================================ */
(function () {
  var articleBody = document.querySelector('.article-body');
  if (!articleBody) return;

  var headings = articleBody.querySelectorAll('h2[id]');
  if (headings.length < 2) return;

  var toc = document.createElement('div');
  toc.className = 'article-toc';

  var title = document.createElement('div');
  title.className = 'article-toc-title';
  title.textContent = 'On this page';
  toc.appendChild(title);

  var links = [];
  headings.forEach(function (h2) {
    var a = document.createElement('a');
    a.className = 'article-toc-link';
    a.href = '#' + h2.id;
    a.textContent = h2.textContent;
    toc.appendChild(a);
    links.push(a);
  });

  document.body.appendChild(toc);

  function updateActive() {
    var active = null;
    headings.forEach(function (h2) {
      if (h2.getBoundingClientRect().top <= 120) active = h2;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', active !== null && a.getAttribute('href') === '#' + active.id);
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () { updateActive(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  updateActive();
}());

/* ============================================================
   CONTACT FORM — AJAX SUBMIT (no redirect)
   ============================================================ */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending\u2026';

    try {
      var res = await fetch('https://formspree.io/f/mgoporww', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        form.reset();
        var modal = document.getElementById('contact-modal');
        if (modal) {
          modal.style.display = 'flex';
          modal.addEventListener('click', function (ev) {
            if (ev.target === modal) modal.style.display = 'none';
          }, { once: true });
        }
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
}());
