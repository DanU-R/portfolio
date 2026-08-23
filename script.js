/* Portfolio — vanilla JS, no dependencies.
   nav toggle · active nav · print CV */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ---- Active nav highlight ----
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__menu a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = "#" + entry.target.id;
            navLinks.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === id);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  // ---- Download CV → print ----
  var btnCv = document.getElementById("btn-download-cv");
  if (btnCv) {
    btnCv.addEventListener("click", function () { window.print(); });
  }

  // ---- Footer year ----
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // ---- Reduced-motion gate (motion only when user is fine with it) ----
  var motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  // ---- Navbar transition on scroll ----
  var header = document.querySelector(".site-header");
  function onScrollNav() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  // ---- Scroll-reveal (subtle; ENHANCEMENT-ONLY).
  //      Targets are non-nested leaf blocks: a section's container is NOT also
  //      a target, so no element animates on top of its own animated children.
  //      Resting state is fully visible (see CSS) -> no-JS / static / print /
  //      reduced-motion all render every section. `in` only plays an entry. ----
  var revealEls = document.querySelectorAll(
    ".about, .exp, .proj, .skills__row, .edu, .contact__grid"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if (motionOK && "IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    // No motion or no observer: ensure everything is visible (safety net)
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- Back-to-top button ----
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    function onScrollTop() {
      toTop.classList.toggle("show", window.scrollY > 640);
    }
    window.addEventListener("scroll", onScrollTop, { passive: true });
    onScrollTop();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: motionOK ? "smooth" : "auto" });
    });
  }
})();
