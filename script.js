/* ==============================================
   RED BEACON ASSET MANAGEMENT — script.js
   ============================================== */

/* ==============================================
   SMOOTH SCROLL
   All anchor links scroll smoothly to target
   ============================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();

    // Close mobile menu before scrolling
    closeMenu();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ==============================================
   STICKY NAV — solidify background on scroll
   ============================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ==============================================
   HAMBURGER MENU
   ============================================== */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');

function openMenu() {
  navMenu.classList.add('open');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

// Close menu on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
});

/* ==============================================
   SCROLL FADE-IN
   Observes .fade-in elements and adds .visible
   when they enter the viewport
   ============================================== */
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ==============================================
   ANIMATED NUMBER COUNTERS
   data-target    — numeric end value
   data-prefix    — string before number (e.g. "$")
   data-suffix    — string after number  (e.g. "B", "+")
   data-decimals  — decimal places (default 0)
   data-integer   — "true" to use toLocaleString for commas
   ============================================== */
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const prefix   = el.dataset.prefix   || '';
  const suffix   = el.dataset.suffix   || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const isInt    = el.dataset.integer === 'true';
  const duration = 1800; // ms
  const startTime = performance.now();

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic for a smooth deceleration
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = target * eased;
    const display  = isInt
      ? Math.floor(current).toLocaleString()
      : current.toFixed(decimals);

    el.textContent = `${prefix}${display}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Trigger counters when the hero stats enter view
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ==============================================
   TESTIMONIAL CAROUSEL
   Auto-rotates every 5 seconds; supports prev/next
   buttons, dot navigation, and touch swipe
   ============================================== */
const carouselTrack  = document.getElementById('carouselTrack');
const dots           = document.querySelectorAll('.dot');
const carouselWrapper = document.querySelector('.carousel-wrapper');
const totalSlides    = document.querySelectorAll('.testimonial-card').length;
let currentIndex     = 0;
let autoplayTimer    = null;

function goToSlide(index) {
  currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, i) => {
    const active = i === currentIndex;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-selected', String(active));
  });
}

function startAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

document.getElementById('prevBtn').addEventListener('click', () => {
  goToSlide(currentIndex - 1);
  startAutoplay(); // reset timer after manual nav
});

document.getElementById('nextBtn').addEventListener('click', () => {
  goToSlide(currentIndex + 1);
  startAutoplay();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    startAutoplay();
  });
});

// Pause autoplay on hover
carouselWrapper.addEventListener('mouseenter', stopAutoplay);
carouselWrapper.addEventListener('mouseleave', startAutoplay);

// Touch / swipe support
let touchStartX = 0;

carouselWrapper.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

carouselWrapper.addEventListener('touchend', e => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 48) {
    goToSlide(currentIndex + (delta > 0 ? 1 : -1));
    startAutoplay();
  }
}, { passive: true });

// Kick off autoplay on page load
startAutoplay();

/* ==============================================
   ENQUIRY FORM — VALIDATION & ASYNC SUBMIT
   ============================================== */
const form        = document.getElementById('enquiryForm');
const submitBtn   = document.getElementById('submitBtn');
const formFeedback = document.getElementById('formFeedback');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const span  = document.getElementById(errorId);
  if (span)  span.textContent = message;
  if (input) input.classList.add('error');
}

function clearFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const span  = document.getElementById(errorId);
  if (span)  span.textContent = '';
  if (input) input.classList.remove('error');
}

function validateForm() {
  let valid = true;
  const name  = document.getElementById('fullName');
  const email = document.getElementById('email');

  clearFieldError('fullName', 'nameError');
  clearFieldError('email',    'emailError');

  if (!name.value.trim()) {
    setFieldError('fullName', 'nameError', 'Full name is required.');
    valid = false;
  }

  if (!email.value.trim()) {
    setFieldError('email', 'emailError', 'Email address is required.');
    valid = false;
  } else if (!EMAIL_RE.test(email.value.trim())) {
    setFieldError('email', 'emailError', 'Please enter a valid email address.');
    valid = false;
  }

  return valid;
}

// Live-clear errors as the user corrects them
document.getElementById('fullName').addEventListener('input', () => clearFieldError('fullName', 'nameError'));
document.getElementById('email').addEventListener('input',    () => clearFieldError('email',    'emailError'));

function showFeedback(type, message) {
  formFeedback.className = `form-feedback ${type}`;
  formFeedback.textContent = message;
  formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Reset any previous feedback
  formFeedback.className = 'form-feedback';
  formFeedback.textContent = '';

  if (!validateForm()) return;

  // Enter loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    /*
      FormSubmit.co returns JSON when the Accept header is set to application/json.
      This lets us handle the response without a page redirect.
    */
    const response = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      showFeedback('success', '✓ Thank you! Your enquiry has been received. We\'ll be in touch within one business day.');
      form.reset();
    } else {
      throw new Error(`Server responded with ${response.status}`);
    }
  } catch (err) {
    console.error('Form submission error:', err);
    showFeedback('error', 'Something went wrong. Please try again or email us directly at josephine.wee@redbeaconam.com.');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

/* ==============================================
   FOOTER — DYNAMIC COPYRIGHT YEAR
   ============================================== */
const yearEl = document.getElementById('copyrightYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
