/* Portfolio v2 — sidebar toggle, scroll reveal, theme switcher, nav highlight,
   count-up, skill bars, 3D tilt, parallax hero, scroll progress.
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

// ===== Count-Up Animation (hero stat cards) =====

var countObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var el = entry.target;
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals, 10) || 0;
    var duration = 1800;
    var startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;
      var progress = Math.min((time - startTime) / duration, 1);
      // easeOutExpo
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = target * eased;
      el.textContent = decimals > 0
        ? current.toFixed(decimals)
        : Math.floor(current).toString();
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = decimals > 0
        ? target.toFixed(decimals)
        : Math.round(target).toString();
    }

    requestAnimationFrame(animate);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(function (el) {
  countObserver.observe(el);
});

// ===== Skill Bar Animation =====

var skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var bar = entry.target;
    var pct = bar.dataset.progress;
    // Stagger each bar slightly for cascade feel
    var delay = Array.from(bar.closest('.space-y-3').querySelectorAll('.skill-bar')).indexOf(bar) * 80;
    setTimeout(function () {
      bar.style.width = pct + '%';
    }, delay);
    skillObserver.unobserve(bar);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar').forEach(function (el) {
  skillObserver.observe(el);
});

// ===== 3D Tilt Card Hover =====

var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(1000px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
}

// ===== Parallax Hero Background =====

var heroBg = document.querySelector('.hero-bg');

if (heroBg && !prefersReduced) {
  window.addEventListener('scroll', function () {
    var scrolled = window.pageYOffset;
    if (scrolled < 800) {
      heroBg.style.transform = 'translateY(' + (scrolled * 0.4) + 'px)';
    }
  }, { passive: true });
}

// ===== Scroll Progress Bar =====

var progressBar = document.getElementById('scroll-progress');

if (progressBar) {
  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = 'scaleX(' + pct + ')';
  }, { passive: true });
}

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
