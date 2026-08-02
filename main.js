/**
 * NavarroCampos Services — main.js
 * Handles: announcement bar · navbar scroll · hamburger menu · tabs · contact form
 */

/* ============================================================
   UTILITY
   ============================================================ */

/**
 * Safe querySelector — returns null instead of throwing if selector is bad.
 */
function qs(selector, context) {
  return (context || document).querySelector(selector);
}

/**
 * Safe querySelectorAll — always returns a real array.
 */
function qsa(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}

/* ============================================================
   1. FOOTER YEAR
   ============================================================ */
(function setFooterYear() {
  var el = qs('#footerYear');
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}());

/* ============================================================
   2. ANNOUNCEMENT BAR
   Dismisses on close button click, persists in sessionStorage
   so it stays closed during the session but returns on next visit.
   ============================================================ */
(function initAnnouncement() {
  var bar     = qs('.announcement-bar');
  var closeBtn = qs('#closeAnnouncement');
  var navbar  = qs('#navbar');
  var mobileMenu = qs('#mobileMenu');

  if (!bar || !closeBtn) { return; }

  /* If already dismissed this session, hide immediately */
  if (sessionStorage.getItem('nc_ann_dismissed') === '1') {
    dismissAnnouncement(false);
    return;
  }

  closeBtn.addEventListener('click', function () {
    dismissAnnouncement(true);
  });

  function dismissAnnouncement(animate) {
    bar.classList.add('is-hidden');
    document.body.classList.add('ann-gone');
    if (navbar)     { navbar.classList.add('ann-gone'); }
    if (mobileMenu) { mobileMenu.classList.add('ann-gone'); }
    if (animate) {
      sessionStorage.setItem('nc_ann_dismissed', '1');
    }
  }
}());

/* ============================================================
   3. NAVBAR — scroll shadow
   ============================================================ */
(function initNavbarScroll() {
  var navbar = qs('#navbar');
  if (!navbar) { return; }

  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 10) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* Run once on load in case page is already scrolled */
}());

/* ============================================================
   4. HAMBURGER MENU
   ============================================================ */
(function initHamburger() {
  var hamburger  = qs('#hamburger');
  var mobileMenu = qs('#mobileMenu');
  var closeLinks = qsa('[data-close-menu]');

  if (!hamburger || !mobileMenu) { return; }

  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; /* Prevent background scroll */
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close when a nav link is tapped */
  closeLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* Close if user resizes to desktop width */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && hamburger.classList.contains('is-open')) {
      closeMenu();
    }
  });
}());

/* ============================================================
   5. TABS — Recommendations section
   ============================================================ */
(function initTabs() {
  var tabButtons = qsa('[role="tab"]');
  var tabPanels  = qsa('[role="tabpanel"]');

  if (tabButtons.length === 0) { return; }

  function activateTab(targetTab) {
    /* Deactivate all tabs */
    tabButtons.forEach(function (btn) {
      btn.classList.remove('tab--active');
      btn.setAttribute('aria-selected', 'false');
    });

    /* Hide all panels */
    tabPanels.forEach(function (panel) {
      panel.classList.remove('tab-panel--active');
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'none';
    });

    /* Activate the selected tab */
    targetTab.classList.add('tab--active');
    targetTab.setAttribute('aria-selected', 'true');

    /* Show the corresponding panel */
    var panelId = targetTab.getAttribute('aria-controls');
    var panel   = qs('#' + panelId);
    if (panel) {
      panel.classList.add('tab-panel--active');
      panel.setAttribute('aria-hidden', 'false');
      panel.style.display = 'block';
    }
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateTab(btn);
    });

    /* Keyboard navigation: arrow keys move between tabs */
    btn.addEventListener('keydown', function (e) {
      var index   = tabButtons.indexOf(btn);
      var nextIdx = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIdx = (index + 1) % tabButtons.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIdx = (index - 1 + tabButtons.length) % tabButtons.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = tabButtons.length - 1;
      }

      if (nextIdx !== null) {
        e.preventDefault();
        activateTab(tabButtons[nextIdx]);
        tabButtons[nextIdx].focus();
      }
    });
  });

  /* Activate the first tab on load */
  activateTab(tabButtons[0]);
}());

/* ============================================================
   6. CONTACT FORM — client-side validation
   Note: for real form submission you will integrate a backend
   service (e.g. Cloudflare Workers, Formspree, or EmailJS).
   ============================================================ */
(function initContactForm() {
  var form       = qs('#contactForm');
  var submitBtn  = qs('#submitBtn');
  var successMsg = qs('#formSuccess');

  if (!form) { return; }

  /* Validation rules per field */
  var rules = {
    fieldName:    { errorId: 'errorName',    validate: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'; } },
    fieldEmail:   { errorId: 'errorEmail',   validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; } },
    fieldMessage: { errorId: 'errorMessage', validate: function (v) { return v.trim().length >= 10 ? '' : 'Please tell us a little more (at least 10 characters).'; } }
  };

  function validateField(fieldId) {
    var field = qs('#' + fieldId);
    var rule  = rules[fieldId];
    if (!field || !rule) { return true; }

    var errorEl = qs('#' + rule.errorId);
    var msg     = rule.validate(field.value);

    if (msg) {
      field.classList.add('is-error');
      if (errorEl) { errorEl.textContent = msg; }
      field.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      field.classList.remove('is-error');
      if (errorEl) { errorEl.textContent = ''; }
      field.setAttribute('aria-invalid', 'false');
      return true;
    }
  }

  /* Live validation: validate on blur */
  Object.keys(rules).forEach(function (fieldId) {
    var field = qs('#' + fieldId);
    if (field) {
      field.addEventListener('blur', function () {
        validateField(fieldId);
      });
      field.addEventListener('input', function () {
        /* Clear error on input once the user starts correcting */
        if (field.classList.contains('is-error')) {
          validateField(fieldId);
        }
      });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validate all fields */
    var allValid = Object.keys(rules).map(function (id) {
      return validateField(id);
    }).every(Boolean);

    if (!allValid) {
      /* Focus the first error field */
      var firstError = qs('.form-input.is-error');
      if (firstError) { firstError.focus(); }
      return;
    }

    /* Disable button during submission */
    submitBtn.disabled  = true;
    submitBtn.textContent = 'Sending…';

    /*
     * TODO: Replace this timeout with a real API call.
     * Example using Formspree:
     *
     *   fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *     method: 'POST',
     *     headers: { 'Accept': 'application/json' },
     *     body: new FormData(form)
     *   })
     *   .then(function(res) { ... })
     *   .catch(function() { ... });
     */
    setTimeout(function () {
      form.style.display  = 'none';
      if (successMsg) {
        successMsg.removeAttribute('hidden');
        successMsg.focus();
      }
    }, 1200);
  });
}());

/* ============================================================
   7. SMOOTH SCROLL — anchor links with offset for fixed header
   ============================================================ */
(function initSmoothScroll() {
  /* Only intercept internal hash links */
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor) { return; }

    var targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) { return; }

    var target = document.getElementById(targetId);
    if (!target) { return; }

    e.preventDefault();

    /* Calculate offset: navbar + announcement bar (if visible) */
    var navbar = qs('#navbar');
    var annBar = qs('.announcement-bar');
    var offset = 0;
    if (navbar) { offset += navbar.offsetHeight; }
    if (annBar && !annBar.classList.contains('is-hidden')) {
      offset += annBar.offsetHeight;
    }

    var top = target.getBoundingClientRect().top + window.pageYOffset - offset - 16;

    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  });
}());
