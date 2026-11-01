/* ==========================================================================
   main.js: the only JavaScript on the site
   Plain script, no libraries, no network use. Works when index.html is opened
   straight from disk.

   1. Theme toggle (light / dark)
   2. Footer year
   3. Fade-in of sections as the visitor scrolls

   The first theme choice (saved or system preference) is applied by the small
   inline script in the <head> of index.html, so the page never flashes the
   wrong colors. This file only handles clicks on the toggle button.
   ========================================================================== */

(function () {
  var root = document.documentElement;

  /* ---- 1. Theme toggle ------------------------------------------------- */
  var button = document.getElementById('themeToggle');

  // Keep the button's accessible name in step with what a click will do.
  function updateLabel() {
    var isDark = root.dataset.theme === 'dark';
    button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  if (button) {
    button.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage blocked: ignore */ }
      updateLabel();
    });
    updateLabel();
  }

  /* ---- 2. Footer year (so you never have to edit it) -------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- 3. Reveal sections on scroll --------------------------------------
     Any element with class "reveal" gets class "is-visible" the first time it
     scrolls into view. The animation itself is in styles.css (section 13). */
  var items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Very old browser: skip the animation and just show everything.
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);        // animate once only
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }
})();