document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const yearEl = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const youtubeEmbeds = document.querySelectorAll('[data-youtube-url]');

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

const toYouTubeEmbedUrl = (input) => {
  if (!input) {
    return '';
  }

  const value = input.trim();

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const videoId = url.pathname.split('/').filter(Boolean)[0];
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';
    }

    if (host.endsWith('youtube.com')) {
      const embedId = url.pathname.split('/').filter(Boolean).pop();

      if (url.pathname.startsWith('/embed/') || url.pathname.startsWith('/shorts/')) {
        return embedId ? `https://www.youtube-nocookie.com/embed/${embedId}` : '';
      }

      const videoId = url.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      }
    }
  } catch (error) {
    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
      return `https://www.youtube-nocookie.com/embed/${value}`;
    }
  }

  return '';
};

youtubeEmbeds.forEach((embed) => {
  const youtubeUrl = embed.getAttribute('data-youtube-url') || '';
  const embedUrl = toYouTubeEmbedUrl(youtubeUrl);

  if (!embedUrl) {
    return;
  }

  const title = embed.closest('.video-card')?.querySelector('h3')?.textContent?.trim() || 'YouTube video';

  embed.innerHTML = `
    <iframe
      src="${embedUrl}"
      title="${title}"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `;
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (mobileMenu) {
      mobileMenu.hidden = true;
    }
  });
});
