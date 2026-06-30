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
  const stageFrame = showreelGallery.querySelector('[data-stage-frame]');
  const stageKicker = showreelGallery.querySelector('[data-stage-kicker]');
  const stageTitle = showreelGallery.querySelector('[data-stage-title]');
  const stageDescription = showreelGallery.querySelector('[data-stage-description]');
  const prevButton = showreelGallery.querySelector('[data-carousel-prev]');
  const nextButton = showreelGallery.querySelector('[data-carousel-next]');
  const viewport = showreelGallery.querySelector('[data-carousel-viewport]');
  const track = showreelGallery.querySelector('[data-carousel-track]');
  let activeIndex = 0;

  const renderStagePreview = (video) => {
    if (!stageFrame || !stageKicker || !stageTitle || !stageDescription) {
      return;
    }

    stageFrame.innerHTML = `
      <button class="showreel-play" type="button" aria-label="Play ${video.title}">
        <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title} preview" />
        <span class="showreel-play-badge">
          <span class="material-symbols-outlined" aria-hidden="true">play_circle</span>
          <span>Play showreel</span>
        </span>
      </button>
    `;

    stageFrame.querySelector('.showreel-play')?.addEventListener('click', () => {
      stageFrame.innerHTML = `
        <iframe
          src="${toYouTubeEmbedUrl(video.id, true)}"
          title="${video.title}"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      `;
    });

    stageKicker.textContent = video.kicker;
    stageTitle.textContent = video.title;
    stageDescription.textContent = video.description;
  };

  const selectVideo = (index, scrollIntoView = false) => {
    activeIndex = index;
    const video = portfolioVideos[activeIndex];

    track.querySelectorAll('.showreel-card').forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex;
      card.classList.toggle('is-active', isActive);
      card.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    renderStagePreview(video);

    if (scrollIntoView) {
      const activeCard = track.querySelector(`[data-video-index="${activeIndex}"]`);
      activeCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  track.innerHTML = portfolioVideos
    .map(
      (video, index) => `
        <button class="showreel-card${index === 0 ? ' is-active' : ''}" type="button" data-video-index="${index}" aria-current="${index === 0 ? 'true' : 'false'}">
          <div class="showreel-thumb">
            <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title} preview" loading="lazy" />
            <span class="showreel-thumb-badge" aria-hidden="true">
              <span class="material-symbols-outlined">play_arrow</span>
            </span>
          </div>
          <div class="showreel-card-copy">
            <p class="tag">${video.kicker}</p>
            <h4>${video.title}</h4>
            <p>${video.description}</p>
          </div>
        </button>
      `,
    )
    .join('');

  track.querySelectorAll('.showreel-card').forEach((card) => {
    card.addEventListener('click', () => {
      const index = Number(card.getAttribute('data-video-index'));
      selectVideo(index, true);
    });
  });

  prevButton?.addEventListener('click', () => {
    viewport?.scrollBy({ left: -(viewport.clientWidth * 0.88), behavior: 'smooth' });
  });

  nextButton?.addEventListener('click', () => {
    viewport?.scrollBy({ left: viewport.clientWidth * 0.88, behavior: 'smooth' });
  });

  selectVideo(0);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (mobileMenu) {
      mobileMenu.hidden = true;
    }
  });
});
