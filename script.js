document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const yearEl = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const showreelGallery = document.querySelector('[data-showreel-gallery]');
const teamGrid = document.querySelector('[data-team-grid]');
const heroShowreel = document.querySelector('[data-hero-showreel]');

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
    title: 'Company Profile Poltekkes Tanka',
    description: 'Preview utama untuk showreel dengan tone sinematik dan ritme editing yang tegas.',
  },
  {
    url: 'https://youtu.be/Nmy9LUj0US8',
    kicker: 'Brand Story',
    title: 'Company Profile Pelindo',
    description: 'Cocok untuk company profile atau video campaign dengan presentasi yang modern.',
  },
  {
    url: 'https://youtu.be/xduFidLVGxE',
    kicker: 'Digital Ad',
    title: 'Company Profile PBP',
    description: 'Potongan cepat yang menonjolkan visual tajam, fokus detail, dan pacing yang hidup.',
  },
  {
    url: 'https://youtu.be/P-lkQrkyeMg',
    kicker: 'Feature Cut',
    title: 'Company Profile Kanian',
    description: 'Alternatif preview untuk highlight produksi yang terasa premium dan terkurasi.',
  },
  {
    url: 'https://youtu.be/FqEqJD54kP8',
    kicker: 'Commercial',
    title: 'Pertamina Geotermal Energy Documentation',
    description: 'Format yang ideal untuk iklan digital, teaser, atau materi promosi yang ringkas.',
  },
  {
    url: 'https://youtu.be/J3n_h0doqiA',
    kicker: 'Documentation',
    title: 'PLN DOCUMENTATION, WOMAN DAYS',
    description: 'Preview untuk potongan produksi di balik layar yang memberi konteks proses kreatif.',
  },
  {
    url: 'https://youtu.be/rUo6XpRq8uA',
    kicker: 'Documentation',
    title: 'BRI Documentation Hut BRI',
    description: 'Menampilkan sisi profesional brand melalui framing yang rapi dan percaya diri.',
  },
  {
    url: 'https://youtu.be/sHV5y_b3H2o',
    kicker: 'Documentation',
    title: 'Honda Documentation Honda X FIF Group',
    description: 'Showreel penutup untuk membangun kesan akhir yang kuat dan mudah diingat.',
  },
  {
    url: 'https://youtu.be/f-zIT2nk3-U',
    kicker: 'Motion Reel',
    title: 'Compro PertaGas, Energized to grow, Lead The MidWay',
    description: 'Tambahan showreel untuk memperkaya kumpulan portfolio dengan nuansa motion yang dinamis.',
  },
];

const teamProfiles = [
  {
    name: 'Alvian Husin',
    role: 'Videographer / Photographer / Editor',
    photo: 'assets/team/alvian-husin.jpg',
    bio: 'Lebih dari satu dekade di industri kreatif. Memulai fotografi dan editing gambar sejak 2014, lalu mengembangkan videografi dan editing video sejak 2017 untuk menangani proyek visual berskala besar.',
    highlights: ['Video Profile Lampung Barat (2023)', 'Subroto Awards 2025 Pertamina Geotermal Energy', 'The Guardian "Lampung Dive Club Mini Series" (2020)'],
  },
  {
    name: 'Arso Wibowo',
    role: 'Cinematographer / Director of Photography',
    photo: 'assets/team/arso-wibowo.jpg',
    bio: 'Sejak 2018 merayakan setiap momen di dunia sinematografi. Fokus pada pengambilan gambar dan editing untuk menerjemahkan ide kreatif menjadi visual yang artistik dan efektif.',
    highlights: ['BPKH Company Profile (2024)', 'Beeme Short Movie (2023)', 'Artotel Indonesia "Like a Local" Campaign (2026)'],
  },
  {
    name: 'Eriko Ramadhan',
    role: 'Director',
    photo: 'assets/team/eriko-ramadhan.jpg',
    bio: 'Berfokus pada penyutradaraan dan penulisan karya audiovisual untuk company profile, campaign commercials, film, dan music video dengan pengalaman lebih dari 7 tahun.',
    highlights: ['Nescafe x Raisa Digital Ads - Assistant to Director (2026)', 'Batas Senja "Ketakutanku" Music Video (2026)', 'Poltekkes Tanjung Karang Profile Video (2023)'],
  },
  {
    name: 'Fariz Gunsan',
    role: 'Production Team / Camera Department / Photographer',
    photo: 'assets/team/fariz-gunsan.jpg',
    bio: 'Production team, camera department team, dan photographer dengan 7 tahun pengalaman di industri kreatif, berfokus pada production, photography, camera assisting, lighting, dan visual storytelling.',
    highlights: ['Poltekkes Kemenkes Tanjung Karang Company Profile (2024)', 'Wahaha Seafood Company Profile (2025)', 'Tubaba Art Festival Documentation (2024)'],
  },
  {
    name: 'Ismi Anindita',
    role: 'Creative Producer',
    photo: 'assets/team/ismi-anindita.jpg',
    bio: 'Produser kreatif dengan pengalaman di industri film dan production house. Terbiasa mengelola workflow produksi end-to-end dari perencanaan, budgeting, scheduling, hingga quality control.',
    highlights: ['Batas Senja "Ketakutanku" Music Video (2026)', 'Wahaha Seafood Profile Video (2025)', 'Seruit Buk Lin Profile Video (2025)'],
  },
  {
    name: 'Rachmat SB',
    role: 'FPV Pilot / Drone Aerial Pilot',
    photo: 'assets/team/rachmat-sb.jpg',
    bio: 'Pilot FPV dan aerial drone dengan lebih dari 5 tahun pengalaman. Berfokus pada estetika dan penyampaian pesan visual melalui sudut pandang yang luas.',
    highlights: ['PTBA Lampung CSR Video (2026)', 'Indonesian Drift Series Competition (2026)', 'HK Tol Bakter Company Profile (2024)'],
  },
  {
    name: 'Raden Tri Buana',
    role: 'Videographer / Photographer / Editor / Motion Designer',
    photo: 'assets/team/raden-tri-buana.jpg',
    bio: 'Sejak 2019 menekuni videography, editing video, dan motion design. Pada 2022 menambah skill photography dan terus mengembangkan disiplin kerja untuk berbagai proyek visual.',
    highlights: ['Profile Putri Indonesia Lampung (2026)', 'Tol Bakter Hutama Karya Company Profile (2024)', 'Video Content MarketU (Agency USA) (2026)'],
  },
  {
    name: 'Ridwan Ramadhan',
    role: 'Executive Producer / Editor / Colorist',
    photo: 'assets/team/ridwan-ramadhan.jpg',
    bio: 'Dengan pengalaman lebih dari 9 tahun di industri kreatif, Ridwan menggeluti direction, art direction, graphic design, photography, color grading, editing, 3D, dan motion design untuk storytelling yang kuat.',
    highlights: ['Artotel Indonesia - Like a Local Campaign (2025)', 'Arga Bumi Indonesia Company Profile (2026)', 'Inspektorat Jenderal Kementerian ESDM Company Profile (2024)'],
  },
  {
    name: 'Wisq Asmoro',
    role: 'Cinematographer & Photographer (LSP Certified)',
    photo: 'assets/team/wisq-asmoro.jpg',
    bio: 'Cinematographer dan photographer tersertifikasi LSP dengan pengalaman lebih dari 10 tahun di company profile, TV commercial, branded content, dan film, menggabungkan visual storytelling dan strategi komunikasi.',
    highlights: ['Company Profile Production', 'TV Commercial Production', 'Branded Content & Film'],
  },
];

const renderTeamGrid = () => {
  if (!teamGrid) {
    return;
  }

  teamGrid.innerHTML = teamProfiles
    .map(
      (profile, index) => `
        <article class="team-card reveal">
          <div class="team-card-portrait">
            <img src="${profile.photo}" alt="${profile.name} portrait" loading="lazy" />
            <span class="team-card-index">${String(index + 1).padStart(2, '0')}</span>
          </div>
          <div class="team-card-body">
            <p class="tag">${profile.role}</p>
            <h3>${profile.name}</h3>
            <p>${profile.bio}</p>
            <ul class="team-points">
              ${profile.highlights.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </article>
      `,
    )
    .join('');

  const teamCards = teamGrid.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && teamCards.length > 0) {
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

    teamCards.forEach((item) => observer.observe(item));
  } else {
    teamCards.forEach((item) => item.classList.add('is-visible'));
  }
};

renderTeamGrid();

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

const loadYouTubeIframeApi = (() => {
  let apiPromise = null;

  return () => {
    if (window.YT?.Player) {
      return Promise.resolve(window.YT);
    }

    if (apiPromise) {
      return apiPromise;
    }

    apiPromise = new Promise((resolve) => {
      const previousReady = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousReady === 'function') {
          previousReady();
        }

        resolve(window.YT);
      };

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    });

    return apiPromise;
  };
})();

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
  let modalOpenToken = 0;
  let isPaused = false;
  let lastFocusEl = null;
  let slideTimer = null;
  const autoSlideDelay = 7000;

  const syncCardContent = () => {
    cards.forEach((card, index) => {
      const video = portfolioVideos[index];
      if (!video) {
        return;
      }

      const thumbnail = card.querySelector('.showreel-thumb img');
      const kicker = card.querySelector('.showreel-card-copy .tag');
      const title = card.querySelector('.showreel-card-copy h4');
      const description = card.querySelector('.showreel-card-copy p:not(.tag)');
      const playButton = card.querySelector('[data-play-video]');

      card.setAttribute('data-video-url', video.url);
      card.setAttribute('data-video-index', String(index));

      if (thumbnail) {
        thumbnail.src = `https://i.ytimg.com/vi/${getYouTubeVideoId(video.url)}/hqdefault.jpg`;
        thumbnail.alt = `${video.title} preview`;
      }

      if (kicker) {
        kicker.textContent = video.kicker;
      }

      if (title) {
        title.textContent = video.title;
      }

      if (description) {
        description.textContent = video.description;
      }

      if (playButton) {
        playButton.setAttribute('aria-label', `Perbesar ${video.title}`);
      }
    });
  };

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
    if (!activePlayer) {
      return;
    }

    if (command === 'pauseVideo') {
      activePlayer.pauseVideo();
    }

    if (command === 'playVideo') {
      activePlayer.playVideo();
    }
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

  const renderLoadingState = () => {
    if (!modalFrame) {
      return;
    }

    modalFrame.innerHTML = `
      <div class="showreel-modal-loading">
        <span class="material-symbols-outlined" aria-hidden="true">smart_display</span>
        <p>Loading video...</p>
      </div>
    `;
  };

  const openModal = async (index) => {
    const video = portfolioVideos[index];
    const videoId = getYouTubeVideoId(video?.url || '');

    if (!videoId || !modal || !modalFrame || !modalTitle || !modalKicker) {
      return;
    }

    modalOpenToken += 1;
    const openToken = modalOpenToken;
    activeVideoIndex = index;
    lastFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('showreel-modal-open');
    modalKicker.textContent = video.kicker;
    modalTitle.textContent = video.title;
    renderLoadingState();
    activePlayer?.destroy?.();
    activePlayer = null;
    isPaused = false;
    setPauseButtonState();
    stopAutoSlide();
    window.setTimeout(() => modalPause?.focus(), 0);

    const YT = await loadYouTubeIframeApi();

    if (openToken !== modalOpenToken || modal.hidden) {
      return;
    }

    modalFrame.innerHTML = '';
    activePlayer = new YT.Player(modalFrame, {
      height: '100%',
      width: '100%',
      videoId,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          isPaused = false;
          setPauseButtonState();
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            isPaused = false;
            setPauseButtonState();
          }

          if (event.data === YT.PlayerState.PAUSED) {
            isPaused = true;
            setPauseButtonState();
          }
        },
      },
    });
  };

  window.showreelOpenModal = openModal;

  const selectPage = (pageIndex) => {
    const clampedPage = Math.min(Math.max(pageIndex, 0), totalPages - 1);
    activePage = clampedPage;
    const scrollTarget = cards[clampedPage * videosPerPage];
    scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    updateCountLabel();
    updateCardStates();
  };

  const stopAutoSlide = () => {
    if (slideTimer) {
      window.clearInterval(slideTimer);
      slideTimer = null;
    }
  };

  const startAutoSlide = () => {
    if (totalPages <= 1 || slideTimer || !modal?.hidden) {
      return;
    }

    slideTimer = window.setInterval(() => {
      if (!modal?.hidden) {
        return;
      }

      selectPage((activePage + 1) % totalPages);
    }, autoSlideDelay);
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

    modalOpenToken += 1;
    activePlayer?.pauseVideo?.();
    activePlayer?.destroy?.();

    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('showreel-modal-open');
    modalFrame && (modalFrame.innerHTML = '');
    activePlayer = null;
    isPaused = false;
    setPauseButtonState();
    startAutoSlide();
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

  showreelGallery.addEventListener('mouseenter', stopAutoSlide);
  showreelGallery.addEventListener('mouseleave', startAutoSlide);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal?.hidden) {
      closeModal();
    }
  });

  updateCountLabel();
  updateCardStates();
  syncCardContent();
  selectPage(0);
  startAutoSlide();
}

if (heroShowreel) {
  const stack = heroShowreel.querySelector('[data-hero-stack]');
  const counter = heroShowreel.querySelector('[data-hero-counter]');
  const caption = heroShowreel.querySelector('[data-hero-caption]');
  const dots = heroShowreel.querySelector('[data-hero-dots]');
  const openButton = heroShowreel.querySelector('[data-hero-open]');
  let heroIndex = 0;
  let heroTimer = null;

  const getSlideIndex = (offset) => (heroIndex + offset + portfolioVideos.length) % portfolioVideos.length;

  const createSlide = (video, index, variant) => {
    const slide = document.createElement('button');
    slide.type = 'button';
    slide.className = `hero-showreel-slide hero-showreel-slide-${variant}`;
    slide.dataset.heroVideoIndex = String(index);
    slide.setAttribute('aria-label', `Perbesar ${video.title}`);

    const thumb = document.createElement('img');
    thumb.src = `https://i.ytimg.com/vi/${getYouTubeVideoId(video.url)}/hqdefault.jpg`;
    thumb.alt = `${video.title} preview`;
    thumb.loading = 'lazy';
    slide.appendChild(thumb);

    const overlay = document.createElement('div');
    overlay.className = 'hero-showreel-overlay';

    const meta = document.createElement('div');
    meta.className = 'hero-showreel-meta';

    const kicker = document.createElement('p');
    kicker.className = 'tag';
    kicker.textContent = video.kicker;

    const title = document.createElement('h3');
    title.textContent = video.title;

    const description = document.createElement('p');
    description.textContent = video.description;

    meta.append(kicker, title, description);
    overlay.appendChild(meta);

    const indexBadge = document.createElement('span');
    indexBadge.className = 'hero-showreel-index';
    indexBadge.textContent = String(index + 1).padStart(2, '0');
    overlay.appendChild(indexBadge);

    slide.appendChild(overlay);
    return slide;
  };

  const renderHeroShowreel = () => {
    if (!stack || !counter || !caption || !dots) {
      return;
    }

    const previousIndex = getSlideIndex(-1);
    const nextIndex = getSlideIndex(1);
    const current = portfolioVideos[heroIndex];

    stack.replaceChildren(
      createSlide(portfolioVideos[previousIndex], previousIndex, 'prev'),
      createSlide(current, heroIndex, 'current'),
      createSlide(portfolioVideos[nextIndex], nextIndex, 'next'),
    );

    counter.textContent = `${heroIndex + 1} / ${portfolioVideos.length}`;
    caption.textContent = current.description;

    dots.replaceChildren(
      ...portfolioVideos.map((video, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-showreel-dot';
        dot.setAttribute('aria-label', `Lihat ${video.title}`);
        dot.setAttribute('aria-selected', String(index === heroIndex));
        dot.dataset.heroDotIndex = String(index);
        return dot;
      }),
    );

    if (openButton) {
      openButton.setAttribute('aria-label', `Perbesar ${current.title}`);
      openButton.setAttribute('title', current.title);
    }
  };

  const stopHeroAutoSlide = () => {
    if (heroTimer) {
      window.clearInterval(heroTimer);
      heroTimer = null;
    }
  };

  const startHeroAutoSlide = () => {
    if (heroTimer || portfolioVideos.length <= 1) {
      return;
    }

    heroTimer = window.setInterval(() => {
      if (document.hidden || document.body.classList.contains('showreel-modal-open')) {
        return;
      }

      heroIndex = (heroIndex + 1) % portfolioVideos.length;
      renderHeroShowreel();
    }, 5000);
  };

  const setHeroIndex = (index) => {
    heroIndex = (index + portfolioVideos.length) % portfolioVideos.length;
    renderHeroShowreel();
  };

  stack.addEventListener('click', (event) => {
    const slide = event.target.closest('[data-hero-video-index]');
    if (!slide) {
      return;
    }

    const index = Number(slide.getAttribute('data-hero-video-index'));
    if (Number.isNaN(index)) {
      return;
    }

    window.showreelOpenModal?.(index);
  });

  dots.addEventListener('click', (event) => {
    const dot = event.target.closest('[data-hero-dot-index]');
    if (!dot) {
      return;
    }

    const index = Number(dot.getAttribute('data-hero-dot-index'));
    if (Number.isNaN(index)) {
      return;
    }

    setHeroIndex(index);
  });

  openButton?.addEventListener('click', () => {
    window.showreelOpenModal?.(heroIndex);
  });

  heroShowreel.addEventListener('mouseenter', stopHeroAutoSlide);
  heroShowreel.addEventListener('mouseleave', startHeroAutoSlide);
  heroShowreel.addEventListener('focusin', stopHeroAutoSlide);
  heroShowreel.addEventListener('focusout', startHeroAutoSlide);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopHeroAutoSlide();
    } else {
      startHeroAutoSlide();
    }
  });

  renderHeroShowreel();
  startHeroAutoSlide();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (mobileMenu) {
      mobileMenu.hidden = true;
    }
  });
});
