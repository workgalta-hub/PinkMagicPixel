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
    id: 'VJhKfLaxcsc',
    kicker: 'Cinematic Reel',
    title: 'Midnight Velocity',
    description: 'Preview utama untuk showreel dengan tone sinematik dan ritme editing yang tegas.',
  },
  {
    id: 'Nmy9LUj0US8',
    kicker: 'Brand Story',
    title: 'TechVision Launch',
    description: 'Cocok untuk company profile atau video campaign dengan presentasi yang modern.',
  },
  {
    id: 'xduFidLVGxE',
    kicker: 'Digital Ad',
    title: 'Lumina Motion',
    description: 'Potongan cepat yang menonjolkan visual tajam, fokus detail, dan pacing yang hidup.',
  },
  {
    id: 'P-lkQrkyeMg',
    kicker: 'Feature Cut',
    title: 'Horizon Feature',
    description: 'Alternatif preview untuk highlight produksi yang terasa premium dan terkurasi.',
  },
  {
    id: 'FqEqJD54kP8',
    kicker: 'Commercial',
    title: 'Pulse Campaign',
    description: 'Format yang ideal untuk iklan digital, teaser, atau materi promosi yang ringkas.',
  },
  {
    id: 'J3n_h0doqiA',
    kicker: 'Behind The Scene',
    title: 'Studio Notes',
    description: 'Preview untuk potongan produksi di balik layar yang memberi konteks proses kreatif.',
  },
  {
    id: 'rUo6XpRq8uA',
    kicker: 'Company Profile',
    title: 'Corporate Frame',
    description: 'Menampilkan sisi profesional brand melalui framing yang rapi dan percaya diri.',
  },
  {
    id: 'sHV5y_b3H2o',
    kicker: 'Final Cut',
    title: 'Closing Sequence',
    description: 'Showreel penutup untuk membangun kesan akhir yang kuat dan mudah diingat.',
  },
];

const videosPerPage = 3;

const toYouTubeEmbedUrl = (videoId, autoplay = false) => {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  if (autoplay) {
    params.set('autoplay', '1');
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

if (showreelGallery) {
  const prevButton = showreelGallery.querySelector('[data-carousel-prev]');
  const nextButton = showreelGallery.querySelector('[data-carousel-next]');
  const countLabel = showreelGallery.querySelector('[data-carousel-count]');
  const viewport = showreelGallery.querySelector('[data-carousel-viewport]');
  const track = showreelGallery.querySelector('[data-carousel-track]');

  track.innerHTML = portfolioVideos
    .map(
      (video, index) => `
        <article class="showreel-card" data-video-index="${index}">
          <div class="showreel-thumb">
            <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title} preview" loading="lazy" />
            <span class="showreel-thumb-badge" aria-hidden="true">
              <span class="material-symbols-outlined">play_arrow</span>
            </span>
            <button class="showreel-play" type="button" aria-label="Play ${video.title}" data-play-video="${index}">
              <span class="showreel-play-badge">
                <span class="material-symbols-outlined" aria-hidden="true">play_circle</span>
                <span>Play</span>
              </span>
            </button>
          </div>
          <div class="showreel-card-copy">
            <p class="tag">${video.kicker}</p>
            <h4>${video.title}</h4>
            <p>${video.description}</p>
          </div>
        </article>
      `,
    )
    .join('');

  const cards = Array.from(track.querySelectorAll('.showreel-card'));
  let activePage = 0;
  let activeVideoIndex = 0;

  const totalPages = Math.max(1, Math.ceil(portfolioVideos.length / videosPerPage));

  const updateCountLabel = () => {
    if (countLabel) {
      countLabel.textContent = `${activePage + 1} / ${totalPages}`;
    }
  };

  const deactivatePlayers = () => {
    cards.forEach((card, index) => {
      card.classList.remove('is-playing');
      card.querySelector('[data-player-frame]')?.remove();
      card.querySelector('[data-play-video]')?.removeAttribute('hidden');
      if (index === activeVideoIndex) {
        card.setAttribute('aria-current', 'true');
      } else {
        card.removeAttribute('aria-current');
      }
    });
  };

  const playVideo = (index) => {
    const card = cards[index];
    const video = portfolioVideos[index];

    if (!card || !video) {
      return;
    }

    activeVideoIndex = index;
    deactivatePlayers();
    card.classList.add('is-playing');
    card.setAttribute('aria-current', 'true');

    const thumb = card.querySelector('.showreel-thumb');
    const playButton = card.querySelector('[data-play-video]');

    if (!thumb || !playButton) {
      return;
    }

    playButton.setAttribute('hidden', '');

    const player = document.createElement('iframe');
    player.setAttribute('data-player-frame', '');
    player.src = toYouTubeEmbedUrl(video.id, true);
    player.title = video.title;
    player.loading = 'lazy';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.setAttribute('allowfullscreen', '');

    thumb.appendChild(player);
  };

  const selectPage = (pageIndex) => {
    const clampedPage = Math.min(Math.max(pageIndex, 0), totalPages - 1);
    activePage = clampedPage;
    const scrollTarget = cards[clampedPage * videosPerPage];
    scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    updateCountLabel();
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
      playVideo(index);
    });
  });

  viewport?.addEventListener('scroll', () => {
    const firstCard = cards.find((card) => {
      const rect = card.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();
      return rect.left >= viewportRect.left - rect.width * 0.25;
    });

    if (!firstCard) {
      return;
    }

    const index = Number(firstCard.getAttribute('data-video-index')) || 0;
    const page = Math.floor(index / videosPerPage);
    if (page !== activePage) {
      activePage = page;
      updateCountLabel();
    }
  });

  viewport?.addEventListener('click', (event) => {
    const card = event.target.closest?.('.showreel-card');
    if (!card || !viewport.contains(card)) {
      return;
    }

    const index = Number(card.getAttribute('data-video-index'));
    if (!Number.isNaN(index)) {
      activePage = Math.floor(index / videosPerPage);
      updateCountLabel();
    }
  });

  updateCountLabel();
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
