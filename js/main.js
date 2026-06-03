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

  // --- Contact form (Formspree) ----------------------------
  const form = document.querySelector('.contact-form');
  if (form) {
    const statusEl = form.querySelector('.contact-form__status');
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Message';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const action = form.getAttribute('action') || '';
      if (action.includes('YOUR_FORMSPREE_ID')) {
        if (statusEl) {
          statusEl.textContent = 'Form is not configured yet. Please email casey@redsidemapping.com directly.';
          statusEl.style.color = 'var(--color-rust)';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      if (statusEl) statusEl.textContent = '';

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          if (submitBtn) {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#2C3E2D';
          }
          if (statusEl) {
            statusEl.textContent = 'Thanks. We received your message and will reply within 1–2 business days.';
          }
          form.reset();
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.textContent = originalBtnText;
              submitBtn.disabled = false;
              submitBtn.style.background = '';
            }
            if (statusEl) {
              statusEl.textContent = "We'll get back to you within 1–2 business days.";
            }
          }, 6000);
        } else {
          throw new Error('Formspree error');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
        if (statusEl) {
          statusEl.textContent = 'Something went wrong. Please email casey@redsidemapping.com directly.';
          statusEl.style.color = 'var(--color-rust)';
        }
      }
    });
  }

});
