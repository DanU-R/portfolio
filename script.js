/* Portfolio v2 — sidebar toggle, scroll reveal, theme switcher, nav highlight.
   Loaded with defer → DOM is ready. */

// ===== Theme Switcher (global — called by inline onclick) =====

function applyTheme(theme) {
  var isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
}

function setTheme(theme) {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
  highlightThemeBtn(theme);
}

function highlightThemeBtn(theme) {
  var btns = document.querySelectorAll('[onclick^="setTheme"]');
  btns.forEach(function (btn) {
    btn.style.backgroundColor = '';
  });
  var active = document.querySelector('[onclick="setTheme(\'' + theme + ')"]');
  if (active) active.style.backgroundColor = 'rgba(255,255,255,0.6)';
}

// ===== Init: apply saved theme on page load =====

(function initTheme() {
  var saved = localStorage.getItem('theme') || 'system';
  applyTheme(saved);
  highlightThemeBtn(saved);
})();

// ===== System theme change listener =====

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
  var saved = localStorage.getItem('theme') || 'system';
  if (saved === 'system') applyTheme('system');
});

// ===== Mobile Sidebar =====

var mobileMenuBtn = document.getElementById('mobile-menu-btn');
var closeSidebarBtn = document.getElementById('close-sidebar');
var sidebar = document.getElementById('sidebar');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function () {
    sidebar.style.display = 'flex';
    document.body.classList.add('overflow-hidden');
  });
}

function closeSidebar() {
  if (window.innerWidth <= 1024) {
    sidebar.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
  }
}

if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);

document.querySelectorAll('.nav-item').forEach(function (item) {
  item.addEventListener('click', closeSidebar);
});

// Reset sidebar display on resize (mobile → desktop)
window.addEventListener('resize', function () {
  if (window.innerWidth > 1024) {
    sidebar.style.display = '';
    document.body.classList.remove('overflow-hidden');
  } else if (sidebar.style.display !== 'flex') {
    sidebar.style.display = 'none';
  }
});

// ===== Scroll Reveal (IntersectionObserver) =====

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-scale').forEach(function (el) {
  observer.observe(el);
});

// ===== Nav Highlighting on Scroll =====

window.addEventListener('scroll', function () {
  var sections = document.querySelectorAll('section');
  var navLinks = document.querySelectorAll('.nav-item');

  var current = '';
  sections.forEach(function (section) {
    if (pageYOffset >= section.offsetTop - 250) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active-nav', 'text-brand-600', 'bg-brand-50',
      'dark:bg-brand-900/20', 'dark:text-brand-400');
    link.classList.add('text-slate-600', 'dark:text-slate-400');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active-nav');
      link.classList.remove('text-slate-600', 'dark:text-slate-400');
    }
  });
});

// ===== Dynamic year =====

var year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
