// ======================
// MAIN.JS + INDEX.JS FINAL
// Semua fungsi berjalan normal tanpa bentrok
// ======================
// ======================
// SIDEBAR & SOCIAL TOGGLE
// ======================
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const mobileSidebar = document.querySelector(".mobile-sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const toggleBtn = document.querySelector(".social-toggle");
  const socialCol = document.querySelector(".social-col");

  if (hamburgerBtn && mobileSidebar && sidebarOverlay) {
    hamburgerBtn.addEventListener("click", () => {
      mobileSidebar.classList.toggle("active");
      sidebarOverlay.classList.toggle("active");
      hamburgerBtn.classList.toggle("active");
      sidebarOverlay.style.pointerEvents = sidebarOverlay.classList.contains("active") ? 'auto' : 'none';
    });

    sidebarOverlay.addEventListener("click", () => {
      mobileSidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      hamburgerBtn.classList.remove("active");
      sidebarOverlay.style.pointerEvents = 'none';
    });
  }

  if (toggleBtn && socialCol) {
    toggleBtn.addEventListener("click", () => {
      socialCol.classList.toggle("active");
      toggleBtn.classList.toggle("active");
    });
  }
})();

// ======================
// BOTTOM INSIGHT TOGGLE
// ======================
(() => {
  const btToggle = document.querySelector('.bottom-toggle');
  const btInsight = document.querySelector('.bottom-insight');

  if (!btToggle || !btInsight) return;

  btToggle.addEventListener('click', () => {
    btInsight.classList.toggle('active');
    btToggle.classList.toggle('open');
  });
})();

// ======================
// SOFT PARTICLE GENERATOR
// ======================
(() => {
  const particleContainer = document.querySelector('.particle-container');
  if (!particleContainer) return;

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 4 + 6;
    particle.style.animationDuration = `${duration}s`;

    particleContainer.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
  }

  const particleInterval = window.innerWidth < 768 ? 400 : 200;
  setInterval(createParticle, particleInterval);
})();

// ======================
// MAIN CAROUSEL (FIXED VERSION)
// ======================
(() => {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const slides = Array.from(track.children);
  const dots = document.querySelectorAll('.dot');
  const carousel = document.querySelector('.carousel');
  let currentIndex = 0;
  let slideInterval = null;
  const intervalTime = 4000; // 4 detik
  let isHovered = false;

  // Fungsi geser slide
  function goToSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transition = 'transform 0.6s ease';
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');

    currentIndex = index;
  }

  // Fungsi mulai autoplay
  function startAutoSlide() {
    stopAutoSlide(); // pastikan tidak double interval
    slideInterval = setInterval(() => {
      if (!isHovered) { // hanya jalan kalau tidak dihover
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }
    }, intervalTime);
  }

  // Fungsi berhenti autoplay
  function stopAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = null;
  }

  // Reset interval agar stabil
  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Klik dot manual
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      restartAutoSlide();
    });
  });

  // Hover pause
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoSlide();
    });
    carousel.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoSlide();
    });
  }

  // Responsif resize
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    goToSlide(currentIndex);
  });

  // Inisialisasi
  goToSlide(currentIndex);
  startAutoSlide();
})();

// ======================
// MINI CAROUSEL
// ======================
(() => {
  const miniCards = document.querySelectorAll('.small-card');
  if (!miniCards.length) return;

  function goToMiniSlide(index) {
    miniCards.forEach(card => card.style.transform = `translateX(-${index * 100}%)`);
  }
})();

// ======================
// PROGRESS BAR
// ======================
(() => {
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  if (!progressBar || !progressPercent) return;

  let progress = 0;
  function animateProgress() {
    if (progress < 14) {
      progress++;
      progressBar.style.width = `${progress}%`;
      progressPercent.textContent = `${progress}%`;
      requestAnimationFrame(animateProgress);
    }
  }
  animateProgress();
})();

// ======================
// ENTRANCE STAGGER ANIMATION
// ======================
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.add('no-js');
    return;
  }

  const orderSelectors = [
    '.navbar',
    '.social-col',
    '.event-title',
    '.poster-left',
    '.poster-right',
    '.small-row .small-card:nth-child(1)',
    '.small-row .small-card:nth-child(2)',
    '.small-row .small-card:nth-child(3)',
    '.small-row .small-card:nth-child(4)',
    '.dots',
    '.progress-card'
  ];

  const targets = [];
  orderSelectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) targets.push(el);
  });

  // Part Fallback
  if (!targets.length) {
    const fallback = [
      document.querySelector('.navbar'),
      document.querySelector('.social-col'),
      document.querySelector('.content-col')
    ].filter(Boolean);
    targets.push(...fallback);
  }

  // Add all small-cards to avoid duplicates
  document.querySelectorAll('.small-row .small-card').forEach(c => {
    if (!targets.includes(c)) targets.push(c);
  });

  const maybeDots = document.querySelector('.dots');
  if (maybeDots && !targets.includes(maybeDots)) targets.push(maybeDots);

  const STAGGER_GAP = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--stagger-gap')) || 120;

  setTimeout(() => {
    targets.forEach((el, idx) => {
      el.style.setProperty('--stagger', `${idx * STAGGER_GAP}ms`);
      requestAnimationFrame(() => el.classList.add('enter'));
    });
  }, 80);
})();

const fnavLinks = document.querySelectorAll('.floating-bottom-nav .fnav-link');
fnavLinks.forEach(link => {
  if(link.href === window.location.href){
    link.classList.add('active');
  }
});

// ======================
// RIGHT INSIGHT SECTION ANIMATION
// ======================
(() => {
  const rightInsightSections = document.querySelectorAll(".right-insight .insight-section");
  if (!rightInsightSections.length) return;

  setTimeout(() => {
    rightInsightSections.forEach((section, index) => {
      setTimeout(() => {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }, index * 200);
    });
  }, 1000);
})();

// ======================
// SIDEBAR MOBILE SETTINGS (Archive, Portfolio, Settings submenu)
// ======================
(() => {
  const settingsItem = document.querySelector(".has-submenu");
  const settingsLink = document.querySelector(".settings-link");
  const submenuContainer = document.querySelector(".submenu-container");
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const mobileSidebar = document.querySelector(".mobile-sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  if (!settingsItem || !settingsLink || !submenuContainer) return;

  // Toggle submenu Settings
  settingsLink.addEventListener("click", e => {
    e.preventDefault();
    settingsItem.classList.toggle("active");
    if (settingsItem.classList.contains("active")) {
      submenuContainer.style.maxHeight = submenuContainer.scrollHeight + "px";
    } else {
      submenuContainer.style.maxHeight = 0;
    }
  });

  // Change Font (applies to all pages)
  const fontSelector = document.getElementById("fontSelector");
  if (fontSelector) {
    fontSelector.addEventListener("change", () => {
      document.documentElement.style.setProperty('--main-font', fontSelector.value);
      document.body.style.fontFamily = fontSelector.value;
      localStorage.setItem("customFont", fontSelector.value); // simpan font
    });

    // Restore saved font
    const savedFont = localStorage.getItem("customFont");
    if (savedFont) {
      document.body.style.fontFamily = savedFont;
      fontSelector.value = savedFont;
    }
  }

  // Change Background Gradient (applies to all pages)
  const bgStart = document.getElementById("bgGradientStart");
  const bgEnd = document.getElementById("bgGradientEnd");
  const applyBtn = document.getElementById("applyGradient");

  if (bgStart && bgEnd && applyBtn) {
    applyBtn.addEventListener("click", () => {
      const gradient = `linear-gradient(135deg, ${bgStart.value}, ${bgEnd.value})`;
      document.body.style.background = gradient;
      localStorage.setItem("customBgGradient", gradient); // simpan gradient
    });

    // Restore saved gradient
    const savedGradient = localStorage.getItem("customBgGradient");
    if (savedGradient) document.body.style.background = savedGradient;
  }

  // Optional: tutup sidebar saat klik link Archive / Portfolio
  const sidebarLinks = mobileSidebar.querySelectorAll(".sidebar-menu a:not(.settings-link)");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileSidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      hamburgerBtn.classList.remove("active");
      sidebarOverlay.style.pointerEvents = 'none';
    });
  });
})();

// ======================
// DESKTOP SETTINGS SIDEBAR
// ======================
(() => {
  const fontSelector = document.getElementById('desktopFontSelector');
  const bgStart = document.getElementById('desktopBgStart');
  const bgEnd = document.getElementById('desktopBgEnd');
  const applyGradientBtn = document.getElementById('desktopApplyGradient');

  // ==== FONT CHANGE ====
  if (fontSelector) {
    // Restore saved font
    const savedFont = localStorage.getItem('desktopFont');
    if (savedFont) document.body.style.fontFamily = savedFont;
    fontSelector.value = savedFont || 'Poppins';

    fontSelector.addEventListener('change', () => {
      const selected = fontSelector.value;
      document.body.style.fontFamily = selected;
      try { localStorage.setItem('desktopFont', selected); } catch {}
    });
  }

  // ==== BACKGROUND GRADIENT ====
  if (applyGradientBtn) {
    // Restore saved gradient
    const savedBgStart = localStorage.getItem('desktopBgStart') || '#a46de9';
    const savedBgEnd = localStorage.getItem('desktopBgEnd') || '#6496ff';
    document.body.style.background = `linear-gradient(135deg, ${savedBgStart}, ${savedBgEnd})`;
    if (bgStart) bgStart.value = savedBgStart;
    if (bgEnd) bgEnd.value = savedBgEnd;

    applyGradientBtn.addEventListener('click', () => {
      const start = bgStart.value;
      const end = bgEnd.value;
      document.body.style.background = `linear-gradient(135deg, ${start}, ${end})`;
      try {
        localStorage.setItem('desktopBgStart', start);
        localStorage.setItem('desktopBgEnd', end);
      } catch {}
    });
  }
})();

// ======================
// DESKTOP SETTINGS PANEL TOGGLE (NEW FEATURE)
// ======================
(() => {
  const btn = document.getElementById("desktopSettingsBtn");
  const panel = document.getElementById("desktopSettingsPanel");

  if (!btn || !panel) return;

  // Toggle panel muncul / hilang
  btn.addEventListener("click", e => {
    e.stopPropagation();
    panel.classList.toggle("active");
  });

  // Klik di luar panel menutupnya
  document.addEventListener("click", e => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove("active");
    }
  });

  // Restore saved font
  const fontSelector = document.getElementById("fontSelectorDesktop");
  if (fontSelector) {
    const savedFont = localStorage.getItem("desktopFont");
    if (savedFont) document.body.style.fontFamily = savedFont;
    fontSelector.value = savedFont || "Poppins";

    fontSelector.addEventListener("change", () => {
      document.body.style.fontFamily = fontSelector.value;
      localStorage.setItem("desktopFont", fontSelector.value);
    });
  }

  // Restore background gradient
  const bgStart = document.getElementById("bgGradientStartDesktop");
  const bgEnd = document.getElementById("bgGradientEndDesktop");
  const applyGradient = document.getElementById("applyGradientDesktop");

  if (applyGradient) {
    const savedStart = localStorage.getItem("desktopBgStart") || "#a46de9";
    const savedEnd = localStorage.getItem("desktopBgEnd") || "#6496ff";
    document.body.style.background = `linear-gradient(135deg, ${savedStart}, ${savedEnd})`;
    bgStart.value = savedStart;
    bgEnd.value = savedEnd;

    applyGradient.addEventListener("click", () => {
      const start = bgStart.value;
      const end = bgEnd.value;
      document.body.style.background = `linear-gradient(135deg, ${start}, ${end})`;
      localStorage.setItem("desktopBgStart", start);
      localStorage.setItem("desktopBgEnd", end);
    });
  }
})();

// ======================
// UNIVERSAL THEME & BACKGROUND SYNC
// ======================
(() => {
  const themeToggleMobile = document.getElementById("settingsDarkMode");
  const themeToggleDesktop = document.getElementById("desktopToggleDark");
  const bgStartMobile = document.getElementById("bgGradientStart");
  const bgEndMobile = document.getElementById("bgGradientEnd");
  const bgStartDesktop = document.getElementById("bgGradientStartDesktop");
  const bgEndDesktop = document.getElementById("bgGradientEndDesktop");
  const applyGradientMobile = document.getElementById("applyGradient");
  const applyGradientDesktop = document.getElementById("applyGradientDesktop");

  // === Restore Universal Theme ===
  const savedTheme = localStorage.getItem("themeMode");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleMobile) themeToggleMobile.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggleMobile) themeToggleMobile.checked = false;
  }

  const toggleTheme = (isDark) => {
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("themeMode", isDark ? "dark" : "light");
  };

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("change", () => {
      toggleTheme(themeToggleMobile.checked);
    });
  }

  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener("click", () => {
      const nowDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("themeMode", nowDark ? "dark" : "light");
      if (themeToggleMobile) themeToggleMobile.checked = nowDark;
    });
  }

  // === Restore Universal Background ===
  const savedGradient = localStorage.getItem("customBgGradient");
  if (savedGradient) {
    document.body.style.background = savedGradient;
    if (bgStartMobile && bgEndMobile) {
      const match = savedGradient.match(/linear-gradient\(135deg, (#[0-9a-fA-F]+), (#[0-9a-fA-F]+)\)/);
      if (match) {
        bgStartMobile.value = match[1];
        bgEndMobile.value = match[2];
      }
    }
    if (bgStartDesktop && bgEndDesktop) {
      const match = savedGradient.match(/linear-gradient\(135deg, (#[0-9a-fA-F]+), (#[0-9a-fA-F]+)\)/);
      if (match) {
        bgStartDesktop.value = match[1];
        bgEndDesktop.value = match[2];
      }
    }
  }

  const applyUniversalGradient = (start, end) => {
    const gradient = `linear-gradient(135deg, ${start}, ${end})`;
    document.body.style.background = gradient;
    localStorage.setItem("customBgGradient", gradient);
  };

  if (applyGradientMobile && bgStartMobile && bgEndMobile) {
    applyGradientMobile.addEventListener("click", () => {
      applyUniversalGradient(bgStartMobile.value, bgEndMobile.value);
      if (bgStartDesktop && bgEndDesktop) {
        bgStartDesktop.value = bgStartMobile.value;
        bgEndDesktop.value = bgEndMobile.value;
      }
    });
  }

  if (applyGradientDesktop && bgStartDesktop && bgEndDesktop) {
    applyGradientDesktop.addEventListener("click", () => {
      applyUniversalGradient(bgStartDesktop.value, bgEndDesktop.value);
      if (bgStartMobile && bgEndMobile) {
        bgStartMobile.value = bgStartDesktop.value;
        bgEndMobile.value = bgEndDesktop.value;
      }
    });
  }
})();