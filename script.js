document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const yearEl = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const showreelGallery = document.querySelector('[data-showreel-gallery]');

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

const portfolioVideos = [
  {
    url: 'https://youtu.be/VJhKfLaxcsc',
    kicker: 'Cinematic Reel',
    title: 'Midnight Velocity',
    description: 'Preview utama untuk showreel dengan tone sinematik dan ritme editing yang tegas.',
  },
  {
    url: 'https://youtu.be/Nmy9LUj0US8',
    kicker: 'Brand Story',
    title: 'TechVision Launch',
    description: 'Cocok untuk company profile atau video campaign dengan presentasi yang modern.',
  },
  {
    url: 'https://youtu.be/xduFidLVGxE',
    kicker: 'Digital Ad',
    title: 'Lumina Motion',
    description: 'Potongan cepat yang menonjolkan visual tajam, fokus detail, dan pacing yang hidup.',
  },
  {
    url: 'https://youtu.be/P-lkQrkyeMg',
    kicker: 'Feature Cut',
    title: 'Horizon Feature',
    description: 'Alternatif preview untuk highlight produksi yang terasa premium dan terkurasi.',
  },
  {
    url: 'https://youtu.be/FqEqJD54kP8',
    kicker: 'Commercial',
    title: 'Pulse Campaign',
    description: 'Format yang ideal untuk iklan digital, teaser, atau materi promosi yang ringkas.',
  },
  {
    url: 'https://youtu.be/J3n_h0doqiA',
    kicker: 'Behind The Scene',
    title: 'Studio Notes',
    description: 'Preview untuk potongan produksi di balik layar yang memberi konteks proses kreatif.',
  },
  {
    url: 'https://youtu.be/rUo6XpRq8uA',
    kicker: 'Company Profile',
    title: 'Corporate Frame',
    description: 'Menampilkan sisi profesional brand melalui framing yang rapi dan percaya diri.',
  },
  {
    url: 'https://youtu.be/sHV5y_b3H2o',
    kicker: 'Final Cut',
    title: 'Closing Sequence',
    description: 'Showreel penutup untuk membangun kesan akhir yang kuat dan mudah diingat.',
  },
];

const videosPerPage = 3;

const getYouTubeVideoId = (input) => {
  if (!input) {
    return '';
  }

  const value = input.trim();

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] || '';
    }

    if (host.endsWith('youtube.com')) {
      if (url.pathname.startsWith('/embed/') || url.pathname.startsWith('/shorts/')) {
        return url.pathname.split('/').filter(Boolean).pop() || '';
      }

      return url.searchParams.get('v') || '';
    }
  } catch (error) {
    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
      return value;
    }
  }

  return '';
};

const toYouTubeEmbedUrl = (videoId, autoplay = false) => {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
  });

  if (autoplay) {
    params.set('autoplay', '1');
    params.set('mute', '1');
  }

  if (window.location.protocol.startsWith('http')) {
    params.set('origin', window.location.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

if (showreelGallery) {
  const prevButton = showreelGallery.querySelector('[data-carousel-prev]');
  const nextButton = showreelGallery.querySelector('[data-carousel-next]');
  const countLabel = showreelGallery.querySelector('[data-carousel-count]');
  const viewport = showreelGallery.querySelector('[data-carousel-viewport]');
  const track = showreelGallery.querySelector('[data-carousel-track]');
  const modal = document.querySelector('[data-showreel-modal]');
  const modalFrame = modal?.querySelector('[data-modal-frame]');
  const modalTitle = modal?.querySelector('[data-modal-title]');
  const modalKicker = modal?.querySelector('[data-modal-kicker]');
  const modalPause = modal?.querySelector('[data-modal-toggle-pause]');
  const modalCloseButtons = modal ? modal.querySelectorAll('[data-modal-close]') : [];
  const cards = Array.from(track?.querySelectorAll('.showreel-card') || []);
  const totalPages = Math.max(1, Math.ceil(cards.length / videosPerPage));
  let activePage = 0;
  let activeVideoIndex = 0;
  let activePlayer = null;
  let isPaused = false;
  let lastFocusEl = null;

  const updateCountLabel = () => {
    if (countLabel) {
      countLabel.textContent = `${activePage + 1} / ${totalPages}`;
    }
  };

  const updateCardStates = () => {
    cards.forEach((card, index) => {
      card.classList.toggle('is-active', Math.floor(index / videosPerPage) === activePage);
    });
  };

  const postPlayerCommand = (command) => {
    activePlayer?.contentWindow?.postMessage(JSON.stringify({
      event: 'command',
      func: command,
      args: '',
    }), '*');
  };

  const setPauseButtonState = () => {
    if (!modalPause) {
      return;
    }

    modalPause.innerHTML = isPaused
      ? '<span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>'
      : '<span class="material-symbols-outlined" aria-hidden="true">pause</span>';
    modalPause.setAttribute('aria-label', isPaused ? 'Resume video' : 'Pause video');
  };

  const openModal = (index) => {
    const video = portfolioVideos[index];
    const videoId = getYouTubeVideoId(video?.url || '');

    if (!videoId || !modal || !modalFrame || !modalTitle || !modalKicker) {
      return;
    }

    activeVideoIndex = index;
    lastFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('showreel-modal-open');
    modalKicker.textContent = video.kicker;
    modalTitle.textContent = video.title;
    modalFrame.innerHTML = `
      <iframe
        src="${toYouTubeEmbedUrl(videoId, true)}"
        title="${video.title}"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
    activePlayer = modalFrame.querySelector('iframe');
    isPaused = false;
    setPauseButtonState();
    window.setTimeout(() => modalPause?.focus(), 0);
  };

  const selectPage = (pageIndex) => {
    const clampedPage = Math.min(Math.max(pageIndex, 0), totalPages - 1);
    activePage = clampedPage;
    const scrollTarget = cards[clampedPage * videosPerPage];
    scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    updateCountLabel();
    updateCardStates();
  };

  prevButton?.addEventListener('click', () => {
    selectPage(activePage - 1);
  });

  nextButton?.addEventListener('click', () => {
    selectPage(activePage + 1);
  });

  cards.forEach((card) => {
    const index = Number(card.getAttribute('data-video-index'));
    const playButton = card.querySelector('[data-play-video]');

    playButton?.addEventListener('click', (event) => {
      event.stopPropagation();
      openModal(index);
    });

    card.addEventListener('click', () => {
      openModal(index);
    });
  });

  viewport?.addEventListener('scroll', () => {
    if (!viewport) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const firstVisibleCard = cards.find((card) => card.getBoundingClientRect().right > viewportRect.left + 32) || cards[0];
    const index = Number(firstVisibleCard?.getAttribute('data-video-index')) || 0;
    const page = Math.floor(index / videosPerPage);
    if (page !== activePage) {
      activePage = page;
      updateCountLabel();
      updateCardStates();
    }
  });

  const closeModal = () => {
    if (!modal) {
      return;
    }

    if (activePlayer) {
      postPlayerCommand('pauseVideo');
    }

    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('showreel-modal-open');
    modalFrame && (modalFrame.innerHTML = '');
    activePlayer = null;
    isPaused = false;
    setPauseButtonState();
    lastFocusEl?.focus?.();
  };

  const togglePause = () => {
    if (!activePlayer) {
      return;
    }

    if (isPaused) {
      postPlayerCommand('playVideo');
      isPaused = false;
    } else {
      postPlayerCommand('pauseVideo');
      isPaused = true;
    }

    setPauseButtonState();
  };

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modalPause?.addEventListener('click', togglePause);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal?.hidden) {
      closeModal();
    }
  });

  updateCountLabel();
  updateCardStates();
  selectPage(0);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (mobileMenu) {
      mobileMenu.hidden = true;
    }
  });
});
