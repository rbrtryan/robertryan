/* ==========================================================================
   main.js: the only JavaScript on the site
   Plain script, no libraries, no network use. Works when index.html is opened
   straight from disk.

   1. Theme toggle (light / dark)
   2. Footer year
   3. Fade sections in and out as the visitor scrolls

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

  /* ---- 3. Fade sections in and out as you scroll ------------------------
     Any element with class "reveal" gets class "is-visible" while it crosses
     the middle of the screen, and loses it when it moves away. So the section
     you scroll past fades out and the next one fades in. The animation itself
     is in styles.css (section 13). */
  var items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Very old browser: skip the animation and just show everything.
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });   // watches a thin band across the middle of the screen

    items.forEach(function (el) { observer.observe(el); });
  }
})();
