/* ============================================================
   Navigation
   ============================================================ */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('nav__menu--open');
});

// Mobile dropdown toggles
document.querySelectorAll('.nav__item--has-dropdown .nav__link').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth > 768) return;
    e.preventDefault();
    link.closest('.nav__item').classList.toggle('nav__item--open');
  });
});

// Close nav on outside click
document.addEventListener('click', e => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('nav__menu--open');
    document.querySelectorAll('.nav__item--open').forEach(item => {
      item.classList.remove('nav__item--open');
    });
  }
});

// Active link highlight
(function markActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });
})();

/* ============================================================
   Back to top
   ============================================================ */
const backToTop = document.getElementById('back-to-top');
const footer    = document.querySelector('.footer');

function updateBackToTop() {
  const scrollY     = window.scrollY;
  const footerTop   = footer.getBoundingClientRect().top;
  const winH        = window.innerHeight;
  const pastThresh  = scrollY > 300;
  const footerShown = footerTop < winH;

  if (pastThresh && !footerShown) {
    backToTop.classList.add('back-to-top--visible');
  } else {
    backToTop.classList.remove('back-to-top--visible');
  }
}

window.addEventListener('scroll', updateBackToTop, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   Fade-in on scroll
   ============================================================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in--visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0,
  rootMargin: '0px 0px 120px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Fallback: if observer stalls (slow devices, JS late), reveal everything after 1.5s
setTimeout(() => {
  document.querySelectorAll('.fade-in:not(.fade-in--visible)').forEach(el => {
    el.classList.add('fade-in--visible');
  });
}, 1500);
