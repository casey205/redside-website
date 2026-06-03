/* ============================================================
   Redside Surveying & Mapping — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky nav background on scroll --------------------
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile nav toggle ----------------------------------
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) navLinks.classList.remove('open');
    });
  }

  // --- Active nav link ------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Fade-in on scroll (Intersection Observer) ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // --- Contact form: show thank-you after Formspree redirect (?sent=1) ---
  const contactSuccess = document.getElementById('contact-success');
  const contactForm = document.querySelector('.contact-form');
  const params = new URLSearchParams(window.location.search);

  if (params.get('sent') === '1' && contactSuccess) {
    contactSuccess.hidden = false;
    if (contactForm) contactForm.hidden = true;
    window.history.replaceState({}, '', window.location.pathname);
  }

  if (contactForm) {
    const submitBtn = contactForm.querySelector('[type="submit"]');
    contactForm.addEventListener('submit', () => {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
    });
  }

});
