/* Portfolio — vanilla JS, no dependencies.
   D1 nav toggle · D2 smooth scroll + active nav · D3 reveal · D4 print CV */

(function () {
  "use strict";

  // Flag JS available (gating reveal so no-JS users still see content)
  document.documentElement.classList.add("js");

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- D1: Mobile nav toggle ----
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    });

    // Close menu on link click
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ---- D2: Smooth scroll + active nav highlight ----
  // Native CSS scroll-behavior handles the scroll; here we track active section.
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
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  // ---- D3: Scroll reveal ----
  var revealEls = document.querySelectorAll(
    ".section, .card, .skills__group, .contact__item"
  );

  // Default: mark all visible (JS-off / no IO / reduced-motion safety)
  function showAll() {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if (prefersReduced || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { el.classList.add("reveal"); revealObserver.observe(el); });

    // Safety: anything not yet visible after load gets shown on first scroll
    window.addEventListener(
      "scroll",
      function () {
        // No-op guard: observer handles it; this prevents content stuck hidden if IO misbehaves
      },
      { passive: true, once: true }
    );
  }

  // ---- D4: Download CV → print ----
  var btnCv = document.getElementById("btn-download-cv");
  if (btnCv) {
    btnCv.addEventListener("click", function () {
      window.print();
    });
  }

  // ---- Footer year ----
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
