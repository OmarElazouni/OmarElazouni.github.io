(function () {
  "use strict";
  var root = document.documentElement;
  var P = window.PROJECTS || {};
  var ARROW = '<div class="flow-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>';

  /* ---------- Theme ---------- */
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.setAttribute("data-theme", currentTheme());
  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Mobile nav ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var links = document.getElementById("navLinks");
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { links.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Helpers ---------- */
  function flowHTML(steps) {
    return '<div class="flow">' + steps.map(function (s, i) {
      return (i ? ARROW : "") + '<div class="flow-step"><span class="n">0' + (i + 1) + '</span><b>' + s.t + '</b><span>' + s.d + '</span></div>';
    }).join("") + "</div>";
  }
  function dir(id) { return "assets/img/" + id + "/"; }

  /* ---------- Card media: screenshot if present, else pipeline diagram ---------- */
  document.querySelectorAll("[data-media]").forEach(function (el) {
    var id = el.getAttribute("data-media");
    var p = P[id];
    if (!p) return;
    var fallback = function () { el.innerHTML = '<div class="placeholder-flow">' + flowHTML(p.flow) + "</div>"; };
    if (!p.cover) return fallback();
    var img = new Image();
    img.alt = p.title + " screenshot";
    img.decoding = "async";
    img.onload = function () { el.innerHTML = ""; el.appendChild(img); };
    img.onerror = fallback;
    img.src = p.cover;
    fallback(); // show diagram until the image loads
  });

  /* ---------- Modal ---------- */
  var modal = document.getElementById("modal");
  var mTitle = document.getElementById("modalTitle");
  var mBody = document.getElementById("modalBody");
  var lastFocus = null;

  function galleryHTML(id, items) {
    if (!items || !items.length) return "";
    return '<div class="gallery">' + items.map(function (it) {
      var src = dir(id) + it[0];
      return '<figure><button type="button" data-lb="' + src + '" data-cap="' + it[1].replace(/"/g, "&quot;") + '">' +
        '<img src="' + src + '" alt="' + it[1].replace(/"/g, "&quot;") + '" loading="lazy" onerror="this.closest(\'figure\').remove()"></button>' +
        "<figcaption>" + it[1] + "</figcaption></figure>";
    }).join("") + "</div>";
  }

  function openProject(id) {
    var p = P[id];
    if (!p) return;
    lastFocus = document.activeElement;
    mTitle.textContent = p.title;
    var html = p.html.replace("{{flow}}", flowHTML(p.flow)).replace(/\{\{gallery:(\w+)\}\}/g, function (_, g) {
      return galleryHTML(id, (p.galleries || {})[g]);
    });
    mBody.innerHTML = html;
    // Remove empty galleries (all images missing) after a tick
    setTimeout(function () {
      mBody.querySelectorAll(".gallery").forEach(function (g) { if (!g.querySelector("figure")) g.remove(); });
    }, 1500);
    modal.hidden = false;
    modal.classList.add("open");
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal-panel").scrollTop = 0;
    modal.querySelector("[data-close].icon-btn").focus();
    history.replaceState(null, "", "#" + id);
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    history.replaceState(null, "", "#projects");
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll("[data-open]").forEach(function (b) {
    b.addEventListener("click", function () { openProject(b.getAttribute("data-open")); });
  });
  document.querySelectorAll(".fcard-media").forEach(function (m) {
    m.style.cursor = "pointer";
    m.addEventListener("click", function () { openProject(m.getAttribute("data-media")); });
  });
  modal.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeModal(); });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbItems = [], lbIndex = 0;
  function showLb(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    var b = lbItems[lbIndex];
    lbImg.src = b.getAttribute("data-lb");
    lbImg.alt = b.getAttribute("data-cap");
    lbCap.textContent = b.getAttribute("data-cap");
  }
  mBody.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lb]");
    if (!b) return;
    lbItems = Array.prototype.slice.call(b.closest(".gallery").querySelectorAll("[data-lb]"));
    lb.hidden = false; lb.classList.add("open");
    showLb(lbItems.indexOf(b));
    document.getElementById("lbClose").focus();
  });
  function closeLb() { lb.classList.remove("open"); lb.hidden = true; }
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function () { showLb(lbIndex - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { showLb(lbIndex + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });

  document.addEventListener("keydown", function (e) {
    if (lb.classList.contains("open")) {
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") showLb(lbIndex - 1);
      else if (e.key === "ArrowRight") showLb(lbIndex + 1);
      return;
    }
    if (modal.classList.contains("open") && e.key === "Escape") closeModal();
  });

  // Deep link: index.html#theftguard opens that case study
  var h = location.hash.slice(1);
  if (P[h]) openProject(h);

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Stat count-up ---------- */
  if (!reduce) {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = +el.getAttribute("data-count"), suffix = el.getAttribute("data-suffix") || "", start = null;
      function step(ts) {
        if (!start) start = ts;
        var k = Math.min((ts - start) / 1100, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
})();
