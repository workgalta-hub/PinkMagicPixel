document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const yearEl = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && mobileMenu) {
  const setMenuState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.hidden = !isOpen;
  };

  setMenuState(false);

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    setMenuState(isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });
}

if ('IntersectionObserver' in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (mobileMenu) {
      mobileMenu.hidden = true;
    }
  });
});
