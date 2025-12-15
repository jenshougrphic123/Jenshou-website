// ======================
// MAIN.JS + INDEX.JS FINAL
// Semua fungsi berjalan normal tanpa bentrok
// ======================

// ===== DARK MODE TOGGLE =====


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
// MAIN CAROUSEL
// ======================
(() => {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const slides = Array.from(track.children);
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let slideInterval;

  function goToSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
    currentIndex = index;
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      restartAutoSlide();
    });
  });

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 4000);
  }

  function stopAutoSlide() { clearInterval(slideInterval); }
  function restartAutoSlide() { stopAutoSlide(); startAutoSlide(); }

  startAutoSlide();

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
  }

  window.addEventListener('resize', () => goToSlide(currentIndex));
  goToSlide(currentIndex);
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
    if (progress < 50) {
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

  // Fallback
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
// SETTINGS: DARK / LIGHT MODE TOGGLE
// ======================
(() => {
  const themeToggleCheckbox = document.getElementById("settingsDarkMode");

  if (!themeToggleCheckbox) return;

  // Restore saved theme
  const savedTheme = localStorage.getItem("themeMode");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleCheckbox.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    themeToggleCheckbox.checked = false;
  }

  themeToggleCheckbox.addEventListener("change", () => {
    const isDark = themeToggleCheckbox.checked;
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("themeMode", isDark ? "dark" : "light");

    // Jika dark mode diaktifkan, ubah background menjadi default dark
    // tapi simpan gradient custom sebelumnya agar bisa dikembalikan
    if (isDark) {
      if (!document.body.dataset.savedGradient) {
        document.body.dataset.savedGradient = document.body.style.background || "";
      }
      document.body.style.background = "#1a1a1a"; // default background dark
    } else {
      // Restore gradient sebelumnya jika ada
      const savedGradient = document.body.dataset.savedGradient || localStorage.getItem("customBgGradient") || "";
      document.body.style.background = savedGradient;
    }
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

/* ===========================
   GALLERY.JS - FINAL VERSION
   =========================== */

// Pastikan script ini di-load setelah HTML
document.addEventListener("DOMContentLoaded", () => {
// ========== FILTER KATEGORI ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Hapus class active dari semua tombol
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      const categories = item.getAttribute("data-category").split(" ");
      const isVisible = filter === "all" || categories.includes(filter);

      if (isVisible) {
        item.style.display = "block"; // tampilkan dulu
        // biar browser sempat render display:block sebelum animasi
        requestAnimationFrame(() => item.classList.add("show"));
      } else {
        item.classList.remove("show"); // hilangkan efek
        // tunggu transisi selesai dulu baru disembunyikan
        setTimeout(() => (item.style.display = "none"), 400);
      }
    });
  });
});

  // ========== ANIMASI FADE-IN SAAT SCROLL ==========
  const fadeItems = document.querySelectorAll(".gallery-item");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeUp 1s ease forwards";
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeItems.forEach((item) => fadeObserver.observe(item));

  // ========== VIEW OPTION (GRID SWITCH) ==========
  const viewButtons = document.querySelectorAll(".view-btn");
  const galleryGrid = document.querySelector(".gallery-grid");

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.getAttribute("data-view");
      if (view === "compact") {
        galleryGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(220px, 1fr))";
        galleryGrid.style.gap = "20px";
      } else {
        galleryGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(300px, 1fr))";
        galleryGrid.style.gap = "30px";
      }
    });
  });

  // ========== LIGHTBOX / MODAL ==========
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img class="lightbox-image" src="" alt="">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&#10094;</button>
      <button class="lightbox-next">&#10095;</button>
      <div class="lightbox-info">
        <div class="lightbox-title"></div>
        <div class="lightbox-meta"></div>
        <div class="lightbox-share">
          <a href="#" title="Share on Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" title="Share on Pinterest"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
    </div>
  `;

  // Navigasi Gambar
  const updateLightbox = (index) => {
    const item = galleryArray[index];
    const img = item.querySelector("img");
    const title = item.getAttribute("data-title") || "Untitled Work";
    const meta = item.getAttribute("data-meta") || "";

    lightboxImage.src = img.src;
    lightboxTitle.textContent = title;
    lightboxMeta.textContent = meta;
  };

  btnPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
    updateLightbox(currentIndex);
  });

  btnNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryArray.length;
    updateLightbox(currentIndex);
  });

  // Navigasi Keyboard
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "ArrowRight") btnNext.click();
    if (e.key === "ArrowLeft") btnPrev.click();
    if (e.key === "Escape") btnClose.click();
  });

  // ========== LAZY LOADING ==========
  const lazyImages = document.querySelectorAll(".gallery-item img");

  const lazyLoad = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "100px" }
  );

  lazyImages.forEach((img) => lazyLoad.observe(img));

  // ========== ANIMASI SMOOTH SCROLL KE FILTER ==========
  const smoothScroll = (target) => {
    const top = target.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const heroBtn = document.querySelector(".gallery-cta-btn");
  if (heroBtn) {
    heroBtn.addEventListener("click", () => {
      const filterSection = document.querySelector(".gallery-filter");
      if (filterSection) smoothScroll(filterSection);
    });
  }
});

const slider = document.querySelector('.board-slider');
const boards = document.querySelectorAll('.board-item');
const prevBtn = document.querySelector('.board-prev');
const nextBtn = document.querySelector('.board-next');

let currentIndex = 0;
let slideInterval = null;
const intervalTime = 5000; // 5 detik

const moodPalettes = [
  ['#3F44A6', '#353A8C', '#181A40', '#3C7DA6', '#F2F2F2'], // Board 1
  ['#733C4A', '#F26B9C', '#F2A0BE', '#F2F2F2', '#0D0D0D'], // Board 2
  ['#59232D', '#BF5A6C', '#F2CED8', '#D95995', '#F26BCE']  // Board 3
];

const paletteBoxes = document.querySelectorAll('.palette-box');

// ===== Fungsi Update Slider =====
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updatePalette(currentIndex); // pastikan palette ikut update
}

// ===== Mood Palette =====
function updatePalette(index) {
  const colors = moodPalettes[index];
  paletteBoxes.forEach((box, i) => {
    box.style.background = colors[i];
  });
}

// ===== Next / Prev Function =====
function nextSlide() {
  currentIndex = (currentIndex + 1) % boards.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + boards.length) % boards.length;
  updateSlider();
}

// ===== Tombol navigasi =====
nextBtn.addEventListener('click', () => {
  nextSlide();
  stopSlide();
  startSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  stopSlide();
  startSlide();
});

// ===== Auto Slide =====
function startSlide() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

function stopSlide() {
  clearInterval(slideInterval);
}

function updatePalette(index) {
  const colors = moodPalettes[index];
  paletteBoxes.forEach((box, i) => {
    // Reset animation
    box.classList.remove('show');
    // Update warna
    box.style.background = colors[i];
    // Delay animasi masuk per kotak
    setTimeout(() => {
      box.classList.add('show');
    }, i * 100); // delay 100ms tiap kotak
  });
}

// Pause saat hover dan resume saat mouse keluar
slider.addEventListener('mouseenter', stopSlide);
slider.addEventListener('mouseleave', startSlide);

// ===== Inisialisasi =====
updateSlider();
startSlide();

// ========== FOOTER YEAR AUTO UPDATE ==========
(() => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();

// ===== DATA GALERI =====
const galleryItems = [
  // ===== GFX ===== //
  {
    title: "Ellen Joe — Zenless Zone Zero",
    subtitle: "Special Tagwall by host:ditt",
    image: "assets/gallery-page/gfx-events-ellenjoe.png",
    categories: ["gfx", "events"],
    pinterest: "https://pin.it/1mt907rQe",
    instagram: "",
    date: "2025-11-12"
  },
  {
    title: "Wiš'adel — Arknights",
    subtitle: "Part of Collaboration on Ig",
    image: "assets/gallery-page/gfx-events-wisadel.webp",
    categories: ["gfx", "events"],
    pinterest: "https://pin.it/4zdNexfOh",
    instagram: "https://www.instagram.com/p/DQ-Lt-_k24E/?img_index=1&igsh=OTdkZWJtaTU0aHRx",
    date: "2025-11-12"
  },
  {
    title: "Thorns — Arknights",
    subtitle: "Simple design used alight motion",
    image: "assets/gallery-page/gfx-thorns.png",
    categories: ["gfx"],
    pinterest: "https://pin.it/3eksFOfks",
    instagram: "https://www.instagram.com/p/DQ8jEBRiQlM/?igsh=MXhmYWs1M3VueGJhMw==",
    date: "2025-11-12"
  },
  {
    title: "Alice — Zenless Zone Zero",
    subtitle: "Part of Collaboration on Ig",
    image: "assets/gallery-page/gfx-alice.webp",
    categories: ["gfx", "events"],
    pinterest: "https://pin.it/1Vfuf4zcV",
    instagram: "https://www.instagram.com/p/DQnQeY6ksUA/?igsh=Z29hdHQydnZrcXlp",
    date: "2025-11-04"
  },
  {
    title: "Yuzuha — Zenless Zone Zero",
    subtitle: "Part of Collaboration on Ig",
    image: "assets/gallery-page/gfx-yuzuha.webp",
    categories: ["gfx", "events"],
    pinterest: "https://pin.it/26FAEgZdX",
    instagram: "https://www.instagram.com/p/DQjUs-PkpVd/?igsh=MjhzeTU2aHRrc2Jn",
    date: "2025-11-02"
  },
  {
    title: "Exusiai the New Covenant — Arknights",
    subtitle: "First Collaboration on Ig",
    image: "assets/gallery-page/gfx-exusiai-the-new-covenant.webp",
    categories: ["gfx", "events"],
    pinterest: "https://pin.it/2HHCHPAL3",
    instagram: "https://www.instagram.com/p/DQRD9KYkcLp/?igsh=MTZwcTV6YTd0NzBldQ==",
    date: "2025-10-26"
  },
  {
    title: "Lighter — Zenless Zone Zero",
    subtitle: "Part of Tagwall on @clover_ofc1",
    image: "assets/gallery-page/gfx-event-clover-lighter.png",
    categories: ["gfx", "events"],
    pinterest: "https://pin.it/69eB31mpc",
    instagram: "https://www.instagram.com/p/DQmSJ7pD395/?igsh=NHM2bGRsMWJ4Y2Y0",
    date: "2025-10-21"
  },
  {
    title: "Xiangli Yao — Wuthering Waves",
    subtitle: "Design with clean proportional",
    image: "assets/gallery-page/gfx-xiangliyao.jpg",
    categories: ["gfx"],
    pinterest: "https://pin.it/1CtGVlFm3",
    instagram: "https://www.instagram.com/p/DPssLRYkd1Y/?igsh=MXNzamV0M2Vra3lx",
    date: "2025-10-12"
  },
  {
    title: "Robin — Honkai:Star Rail",
    subtitle: "Just clean and minimalism",
    image: "assets/gallery-page/gfx-robin.jpg",
    categories: ["gfx"],
    pinterest: "https://pin.it/6jjPeZpTk",
    instagram: "https://www.instagram.com/p/DN5lkZ9CfEn/?igsh=MWFva3VvZ2V2cmF3OA==",
    date: "2025-08-28"
  },
  {
    title: "Chisa — Wuthering Waves",
    subtitle: "Masking & coloring design part 15, stylist the font",
    image: "assets/gallery-page/gfx-100design(15)-chisa.webp",
    categories: ["gfx","100"],
    pinterest: "https://id.pinterest.com/pin/1023724559058736678/",
    instagram: "https://www.instagram.com/jenshouuu/p/DRhV5fdCePP/",
    date: "2025-11-26"
  },
  {
    title: "Lynae — Wuthering Waves",
    subtitle: "first design on photoshop",
    image: "assets/gallery-page/gfx-lynae.webp",
    categories: ["gfx","100"],
    pinterest: "",
    instagram: "https://www.instagram.com/jenshouuu/p/DRzyuTlkrLL/",
    date: "2025-12-04"
  },
  {
    title: "Closure — Arknights",
    subtitle: "Part of collaboration community",
    image: "assets/gallery-page/gfx-closure2.webp",
    categories: ["gfx","events"],
    pinterest: "https://id.pinterest.com/pin/1023724559059482007/",
    instagram: "",
    date: "2025-12-10"
  },
  {
    title: "Watanabe epitaph I — Punishing: Gray Raven",
    subtitle: "Try to improve a new style",
    image: "assets/gallery-page/gfx-watanabe_epitaph1.jpg",
    categories: ["gfx"],
    pinterest: "https://id.pinterest.com/pin/1023724559059409875/",
    instagram: "https://www.instagram.com/jenshouuu/p/DSMO7SMETTL/",
    date: "2025-12-13"
  },
  {
    title: "Watanabe epitaph II — Punishing: Gray Raven",
    subtitle: "Try to improve a new style",
    image: "assets/gallery-page/gfx-watanabe_epitaph2.jpg",
    categories: ["gfx"],
    pinterest: "https://id.pinterest.com/pin/1023724559059409904/",
    instagram: "https://www.instagram.com/jenshouuu/p/DSMO7SMETTL/",
    date: "2025-12-13"
  },
  {
    title: "Lucia: Crimson Weave I — Punishing: Gray Raven",
    subtitle: "Another design with label style",
    image: "assets/gallery-page/gfx-lucia_crimson1.jpg",
    categories: ["gfx"],
    pinterest: "https://id.pinterest.com/pin/1023724559059451085/",
    instagram: "https://www.instagram.com/jenshouuu/p/DSPbSz8CSiR/",
    date: "2025-12-14"
  },
  {
    title: "Lucia: Crimson Weave II — Punishing: Gray Raven",
    subtitle: "Another design with label style",
    image: "assets/gallery-page/gfx-lucia_crimson2.jpg",
    categories: ["gfx"],
    pinterest: "https://id.pinterest.com/pin/1023724559059451098/",
    instagram: "https://www.instagram.com/jenshouuu/p/DSPbSz8CSiR/",
    date: "2025-12-14"
  },
  // ===== ARTSTYLE ===== //
  {
    title: "Yanami Anna — Too Many Losing Heroines!",
    subtitle: "Events on @enpisicommunity | Host:nabeeajaa",
    image: "assets/gallery-page/artstyle-events-yanamianna.webp",
    categories: ["artstyle","events"],
    pinterest: "https://pin.it/2sI5FIFl5",
    instagram: "",
    date: "2025-11-09"
  },
  {
    title: "Maruyama Aya — Bang! Dream",
    subtitle: "Figure 3D box cover",
    image: "assets/gallery-page/artstyle-coverbox3d.webp",
    categories: ["artstyle"],
    pinterest: "https://pin.it/2sI5FIFl5",
    instagram: "https://www.instagram.com/p/DQlH77ZCc1B/?igsh=MWYycW1rNnU4N3BrMA==",
    date: "2025-11-09"
  },
  {
    title: "Lucia Crimson — Punishing Gray Raven",
    subtitle: "Fractal abstract Sci-Fi vibes",
    image: "assets/gallery-page/artstyle-scifi.webp",
    categories: ["artstyle"],
    pinterest: "https://pin.it/6mbKSlDT3",
    instagram: "https://www.instagram.com/p/DQhA9GbidxZ/?igsh=bHFzcHZxODgyYXFt",
    date: "2025-11-01"
  },
  {
    title: "Rin Shima — Yuru Camp",
    subtitle: "Event on @enpisicommunity | host:@n4yoka",
    image: "assets/gallery-page/artstyle-event-enpisi-rinshima.webp",
    categories: ["artstyle","events"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DQikJqvEsUR/?igsh=a2YzcXFqNzFoeDgw",
    date: "2025-10-29"
  },
  {
    title: "Eta Carnis — Brutalism Style",
    subtitle: "Part of Tagwall on @ocdesaingrafis on Ig",
    image: "assets/gallery-page/artstyle-etacarnis.png",
    categories: ["artstyle","events"],
    pinterest: "https://pin.it/41XNcvrwa",
    instagram: "https://www.instagram.com/p/DQXOQJsEjzT/?igsh=MXE0YnlkcWpscDF6dg==",
    date: "2025-10-24"
  },
  {
    title: "Evernight — Honkai: Star Rail",
    subtitle: "Masking & coloring design part 11",
    image: "assets/gallery-page/artstyle-100design(11)-evernight.webp",
    categories: ["artstyle","100"],
    pinterest: "https://pin.it/4AEzZw6Ur",
    instagram: "https://www.instagram.com/p/DPSf7SekhNz/?igsh=MTNwOTZ3YTFhdmthOQ==",
    date: "2025-10-01"
  },
  {
    title: "Logos — Arknights",
    subtitle: "Masking & coloring design part 10 | fractal glass tutorial",
    image: "assets/gallery-page/artstyle-100design(10)-logos.jpg",
    categories: ["artstyle","100"],
    pinterest: "https://pin.it/2vUh50hKE",
    instagram: "https://www.instagram.com/p/DPEYXddiSYl/?igsh=ZDF5cmdla2Jjc2N1",
    date: "2025-09-26"
  },
  {
    title: "Ciaccona — Wuthering Waves",
    subtitle: "Masking & coloring design part 09 | shading on tree tutorial",
    image: "assets/gallery-page/artstyle-100design(9)-ciaccona.jpg",
    categories: ["artstyle","100"],
    pinterest: "https://pin.it/u8QrxHCbC",
    instagram: "https://www.instagram.com/p/DO8fCr4iQlh/?igsh=MTRhdGNwZGc4a3d4Yw==",
    date: "2025-09-22"
  },
  {
    title: "Cartethyia — Wuthering Waves",
    subtitle: "Masking & coloring design part 08 | Coloring guide",
    image: "assets/gallery-page/artstyle-100design(8)-cartethyia.jpg",
    categories: ["artstyle","100"],
    pinterest: "https://pin.it/3b9GAykd9",
    instagram: "https://www.instagram.com/p/DOs-5zhicez/?igsh=dWl4b3I3bTNvcHdl",
    date: "2025-09-17"
  },
  {
    title: "JVKE — Musician",
    subtitle: "Part of Tagwall on @artisanalley",
    image: "assets/gallery-page/artstyle-event-artisanalley-musician.jpg",
    categories: ["artstyle","events"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DPY0RIUEtQm/?igsh=OXRvMXYxeWRjNWc1",
    date: "2025-09-14"
  },
  {
    title: "Frieren — Sousou No Frieren",
    subtitle: "Masking & coloring design part 07 | Coloring & tune guide",
    image: "assets/gallery-page/artstyle-100design(7)-frieren.jpg",
    categories: ["artstyle","100"],
    pinterest: "https://pin.it/5iqHrWeu2",
    instagram: "hhttps://www.instagram.com/p/DOgX3kKCdv3/?igsh=MTVodDQzbWhwcmhmMg==",
    date: "2025-09-12"
  },
  {
    title: "Anaxa — Honkai: Star Rail",
    subtitle: "Masking & coloring design part 06 | vibe approach",
    image: "assets/gallery-page/artstyle-100design(6)-anaxa.jpg",
    categories: ["artstyle","100"],
    pinterest: "https://pin.it/4JBdXywZb",
    instagram: "https://www.instagram.com/p/DOa8N1liZAI/?igsh=dXdraWd6Y3h2Zzhn",
    date: "2025-09-10"
  },
  {
    title: "Hatsune Miku — Vocaloid",
    subtitle: "Masking & coloring design part 02 | Glow & lighting guide",
    image: "assets/gallery-page/artstyle-100design(2)-miku.jpg",
    categories: ["artstyle","100"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DOOYodmidPR/?igsh=MWZkdjYyancycDZteA==",
    date: "2025-09-05"
  },
  {
    title: "Into The Light",
    subtitle: "Masking & coloring design part 01 | Effects & color harmony guide",
    image: "assets/gallery-page/artstyle-100designs(1)-asiangirl.jpg",
    categories: ["artstyle","100"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DONGHMQidLC/?igsh=NjB5bzFrN2V1Yzdy",
    date: "2025-09-04"
  },
  {
    title: "Lupa — Wuthering Waves",
    subtitle: "try making with high contras",
    image: "assets/gallery-page/artstyle-lupa.jpg",
    categories: ["artstyle"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DNyAiW90hXg/?igsh=OWxqM2pqNXcyZjA1",
    date: "2025-08-25"
  },
  {
    title: "Iuno — Wuthering Waves",
    subtitle: "Second try of coloring",
    image: "assets/gallery-page/artstyle-iuno.jpg",
    categories: ["artstyle"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DNvcoNp0oKZ/?igsh=bGdhdTF6aHNxaGNk",
    date: "2025-08-24"
  },
  {
    title: "Augusta — Wuthering Waves",
    subtitle: "First try of coloring",
    image: "assets/gallery-page/artstyle-augusta.jpg",
    categories: ["artstyle"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DNpr7g8Rz_7/?igsh=ZmhrMTVib2U2OHRr",
    date: "2025-08-21"
  },
  {
    title: "Hysilens — Honkai: Star Rail",
    subtitle: "Making bubble & under sea vibes",
    image: "assets/gallery-page/artstyle-hysilens.jpg",
    categories: ["artstyle"],
    pinterest: "https://pin.it/RA2g78YLE",
    instagram: "https://www.instagram.com/p/DNfdbr8JebW/?igsh=Y2Q5bW92cHE5OWc2",
    date: "2025-08-18"
  },
  {
    title: "Artstyle — My first art",
    subtitle: "Drawing & designed in the same time",
    image: "assets/gallery-page/artstyle-ilustration.webp",
    categories: ["artstyle"],
    pinterest: "https://pin.it/5miPqCNu2",
    instagram: "https://www.instagram.com/p/DQXI7yAkhRt/?igsh=aWtoZHdoNGk0dXFo",
    date: "2025-10-29"
  },
  {
    title: "Cerydra — Honkai: Star Rail",
    subtitle: "Making sharpen highlight",
    image: "assets/gallery-page/artstyle-cerydra.webp",
    categories: ["artstyle"],
    pinterest: "https://pin.it/44z43HREi",
    instagram: "https://www.instagram.com/p/DNIEgcPxM1D/?igsh=dzB0bnZ5bTY1MThk",
    date: "2025-11-13"
  },
  {
    title: "Lifeng — Arknights: Endfield",
    subtitle: "Brush dark theme",
    image: "assets/gallery-page/artstyle-lifeng.webp",
    categories: ["artstyle"],
    pinterest: "https://id.pinterest.com/pin/1023724559058554765/",
    instagram: "https://www.instagram.com/jenshouuu/p/DRUnzxKifiQ/",
    date: "2025-11-22"
  },
  {
    title: "Takamatsu Tomori — BanG Dream! MyGO!!!",
    subtitle: "Coloring & Apply dreamy vibe",
    image: "assets/gallery-page/artstyle-event-takamatsutomori.webp",
    categories: ["artstyle","events"],
    pinterest: "https://id.pinterest.com/pin/1023724559058597939/",
    instagram: "https://www.instagram.com/anonzxth__/p/DRZqG8UElg6/",
    date: "2025-11-23"
  },
  {
    title: "Silverash the Reignfrost — Arknights",
    subtitle: "Increase a contras as freezed",
    image: "assets/gallery-page/silverash-reigfrost-artstyle.webp",
    categories: ["artstyle"],
    pinterest: "https://id.pinterest.com/pin/1023724559058856287/",
    instagram: "https://www.instagram.com/jenshouuu/p/DRr6MlTifgL/",
    date: "2025-12-01"
  },
  {
    title: "Closure — Arknights",
    subtitle: "Lights mode of my design style",
    image: "assets/gallery-page/artstyle-closure1.jpg",
    categories: ["artstyle"],
    pinterest: "https://id.pinterest.com/pin/1023724559059392121/",
    instagram: "https://www.instagram.com/jenshouuu/p/DSLvEHyEoYt/",
    date: "2025-12-12"
  },
  {
    title: "Perlica — Arknights: Endfield",
    subtitle: "time to improve my design with new software",
    image: "assets/gallery-page/artstyle-perlica.jpg",
    categories: ["artstyle"],
    pinterest: "https://id.pinterest.com/pin/1023724559059392121/",
    instagram: "https://www.instagram.com/jenshouuu/p/DSLvEHyEoYt/",
    date: "2025-12-12"
  },
  //===== MANIPULATION =====//
  {
    title: "Dan Heng Permansor Terrae — Honkai: Star Rail",
    subtitle: "Masking & coloring design part 14 | Shading & lighting advance guide",
    image: "assets/gallery-page/manipulation-100design(14)-danheng3.webp",
    categories: ["manipulation","100"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DQeQl2ICakV/?igsh=MWhud2Y3dGE1eTRsNA==",
    date: "2025-10-30"
  },
  {
    title: "Dan Heng Imbibitor Lunae — Honkai: Star Rail",
    subtitle: "Masking & coloring design part 14 | Shading & lighting advance guide",
    image: "assets/gallery-page/manipulation-100design(14)-danheng2.webp",
    categories: ["manipulation","100"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DQeQl2ICakV/?igsh=MWhud2Y3dGE1eTRsNA==",
    date: "2025-10-30"
  },
  {
    title: "Dan Heng — Honkai: Star Rail",
    subtitle: "Masking & coloring design part 14 | Shading & lighting advance guide",
    image: "assets/gallery-page/manipulation-100design(14)-danheng1.webp",
    categories: ["manipulation","100"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DQeQl2ICakV/?igsh=MWhud2Y3dGE1eTRsNA==",
    date: "2025-10-30"
  },
  {
    title: "Sentinel — Reverse: 1999",
    subtitle: "Masking & coloring design part 13 | Masking & used elements",
    image: "assets/gallery-page/manipulation-100design(13)-sentinel.webp",
    categories: ["manipulation","100"],
    pinterest: "https://pin.it/2K6gRgWir",
    instagram: "https://www.instagram.com/p/DP_DslYkcn2/?igsh=d2EzNmRhc2Y2Yjd1",
    date: "2025-10-19"
  },
  {
    title: "Ryo Yamada — Bocchi the Rock!",
    subtitle: "Masking & coloring design part 12 | Masking & used elements",
    image: "assets/gallery-page/manipulation-100design(12)-ryo.jpg",
    categories: ["manipulation","100"],
    pinterest: "https://pin.it/1Apvpjxbg",
    instagram: "https://www.instagram.com/p/DPY8s_6iS45/?igsh=MXM0ZzNleXVxOTVjNQ==",
    date: "2025-10-04"
  },
  {
    title: "Kaedehara Kazuha — Genshin Impact",
    subtitle: "Part of Tagwall on @clover_ofc1",
    image: "assets/gallery-page/manipulation-event-clover-kazuha.jpg",
    categories: ["manipulation","events"],
    pinterest: "https://pin.it/RMd06HJaT",
    instagram: "https://www.instagram.com/p/DO0gpneCYPX/?igsh=MXVpdTJhcHo3aTdjcw==",
    date: "2025-09-20"
  },
  {
    title: "Violet — Evergarden",
    subtitle: "Part of Tagwall on @clover_ofc1",
    image: "assets/gallery-page/manipulation-event-clover-evergarden.jpg",
    categories: ["manipulation","events"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DOvs_FmiUbP/?igsh=MWJtY3ltejhsbG51OA==",
    date: "2025-09-18"
  },
  {
    title: "Qiuyuan — Wuthering Waves",
    subtitle: "Masking & coloring design part 04 | Lighting & highlight standard guide",
    image: "assets/gallery-page/manipulation-100design(4)-qiuyuan.webp",
    categories: ["manipulation","100"],
    pinterest: "https://pin.it/6kPn3yMk4",
    instagram: "https://www.instagram.com/p/DOSV-OfEcMc/?igsh=d2E0M3pvYjFvNnNl",
    date: "2025-09-07"
  },
  {
    title: "Fragments of Reality — Manipulation",
    subtitle: "Masking & coloring design part 03 | Masking & color harmony standard guide",
    image: "assets/gallery-page/manipulation-100design(3)-object.jpg",
    categories: ["manipulation","100"],
    pinterest: "",
    instagram: "https://www.instagram.com/p/DOQ8Ut4ibSc/?igsh=c3Z3OGwzMHAxbnVq",
    date: "2025-09-06"
  },
  {
    title: "Shorekeeper — Wuthering Waves",
    subtitle: "Masking & coloring design part 05 | Combination with different elements",
    image: "assets/gallery-page/manipulation-100design(5)-shorekeeper.jpg",
    categories: ["manipulation","100"],
    pinterest: "https://pin.it/5gSLEsSpr",
    instagram: "https://www.instagram.com/p/DOWFLgbiRPm/?igsh=MmwwOXpscGhxM2dl",
    date: "2025-09-08"
  },
];

const galleryGrid = document.getElementById("galleryGrid");

galleryItems.sort((a, b) => new Date(b.date) - new Date(a.date));

function renderGallery(items) {
  galleryGrid.innerHTML = ""; // bersihkan isi sebelumnya

  items.forEach(item => {
    const categoryString = item.categories.join(" ");
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.setAttribute("data-category", categoryString);

    galleryItem.innerHTML = `
      <img src="${item.image}" loading="lazy" alt="${item.title}">
      <div class="gallery-overlay">
        <div class="overlay-content">
          <div class="overlay-text">
            <h3 class="overlay-title">${item.title}</h3>
            <p class="overlay-subtitle">${item.subtitle}</p>
          </div>
          <div class="overlay-icons social-icons">
  <button class="pin-btn"><i class="fa-brands fa-pinterest"></i></button>
  <button class="ig-btn"><i class="fa-brands fa-instagram"></i></button>
</div>
          <p class="item-date">${item.date}</p>
        </div>
      </div>
    `;

    galleryGrid.appendChild(galleryItem);
    // event icon Pinterest
const pinBtn = galleryItem.querySelector(".pin-btn");
pinBtn.addEventListener("click", () => {
  if (item.pinterest) {
    window.open(item.pinterest, "_blank");
  } else {
    showToast("Desain ini belum dipost di Pinterest");
  }
});

// event icon Instagram
const igBtn = galleryItem.querySelector(".ig-btn");
igBtn.addEventListener("click", () => {
  if (item.instagram) {
    window.open(item.instagram, "_blank");
  } else {
    showToast("Desain ini belum dipost di Instagram");
  }
});
  });
}

// render pertama kali (tampilkan semua)
renderGallery(galleryItems);

// ============================
// 1. GENERATE BANNER DESIGNS
// ============================
const bannerData = [
  {
    img: "assets/gallery-page/board1.webp",
    title: "Beyond the Void — Interspace Sci-Fi",
    desc: "Fake loading screen",
    pinterest: "https://pin.it/1LoGd5lxR",
    instagram: "https://www.instagram.com/p/DQtDnZNCfR-/?igsh=MWt1d3A5M2puNTVvcA==",
    category: ["artstyle"],
    date: "2025-11-06"
  },
  {
    img: "assets/gallery-page/banner-artstyle-events-qiuyuan.webp",
    title: "Qiuyuan — Wuthering Waves",
    desc: "Part of Collaboration on Ig",
    pinterest: "https://pin.it/5Frx7ERhz",
    instagram: "https://www.instagram.com/p/DQULcZ9iSrA/?igsh=NTIwcGIzZTNzZXBo",
    category: ["events","artstyle"],
    date: "2025-10-26"
  },
  {
    img: "assets/gallery-page/banner-artstyle-event-enpisi-jinhsi.jpg",
    title: "Jinhsi — Wuthering Waves",
    desc: "Event on @enpisicommunity | host:@n4yoka",
    pinterest: "",
    instagram: "https://www.instagram.com/p/DPZW_xTgRaq/?igsh=MWRkODd2cmd6emhxeg==",
    category: ["events","artstyle"],
    date: "2025-09-15"
  },
  {
    img: "assets/gallery-page/banner-artstyle-ilustration.jpg",
    title: "Jenshou banner series",
    desc: "First banner with drawing my character",
    pinterest: "",
    instagram: "https://www.instagram.com/p/DNdfpwmpiAN/?igsh=ZWVleXFxN2JhajRi",
    category: ["events","artstyle"],
    date: "2025-08-17"
  },
];

const bannerGrid = document.getElementById("bannerGrid");

bannerData.sort((a, b) => new Date(b.date) - new Date(a.date));

function renderBanner(items) {
  bannerGrid.innerHTML = "";

  items.forEach(item => {
    const categories = Array.isArray(item.category)
      ? item.category
      : [item.category];

    const categoryString = categories.join(" ");

    const bannerItem = document.createElement("div");
    bannerItem.className = "banner-item";
    bannerItem.setAttribute("data-category", categoryString);

    bannerItem.innerHTML = `
      <img src="${item.img}" loading="lazy" alt="${item.title}">
      <div class="banner-overlay">
        <div class="banner-overlay-content">
          <div class="banner-text">
            <h3 class="banner-title">${item.title}</h3>
            <p class="banner-subtitle">${item.desc}</p>
          </div>
          <div class="overlay-icons social-icons">
  <button class="pin-btn"><i class="fa-brands fa-pinterest"></i></button>
  <button class="ig-btn"><i class="fa-brands fa-instagram"></i></button>
</div>
          <p class="item-date">${item.date}</p>
        </div>
      </div>
    `;

    bannerGrid.appendChild(bannerItem);
// event icon Pinterest
const pinBtn = bannerItem.querySelector(".pin-btn");
pinBtn.addEventListener("click", () => {
  if (item.pinterest) {
    window.open(item.pinterest, "_blank");
  } else {
    showToast("Desain ini belum dipost di Pinterest");
  }
});

// event icon Instagram
const igBtn = bannerItem.querySelector(".ig-btn");
igBtn.addEventListener("click", () => {
  if (item.instagram) {
    window.open(item.instagram, "_blank");
  } else {
    showToast("Desain ini belum dipost di Instagram");
  }
});
  });
}

renderBanner(bannerData);

function showToast(message) {
  const toast = document.getElementById("toastNotif");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    // gallery
    document.querySelectorAll(".gallery-item").forEach(item => {
      const categories = item.getAttribute("data-category").split(" ");
      item.style.display = (filter === "all" || categories.includes(filter))
        ? "block"
        : "none";
    });

    // banner
    document.querySelectorAll(".banner-item").forEach(item => {
      const categories = item.getAttribute("data-category").split(" ");
      item.style.display = (filter === "all" || categories.includes(filter))
        ? "block"
        : "none";
    });

  });
});