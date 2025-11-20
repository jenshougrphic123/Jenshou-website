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
    '.navbar'
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

// animasi hover kecil pada quick access
document.querySelectorAll('.qa-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('hovered'));
  card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
});

document.querySelectorAll('.archive-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.background = 'rgba(255,255,255,0.15)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.background = 'rgba(255,255,255,0.05)';
  });
});

const cards = document.querySelectorAll('.qa-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => observer.observe(card));

document.querySelectorAll('.qa-card').forEach((card, index) => {
  // kasih delay makin besar tiap urutan
  card.style.animationDelay = `${index * 0.2}s`;
});

// ======================
// FILTER + SEARCH REORDER SYSTEM (with smooth animation)
// ======================
// ======================
// DYNAMIC RENDER FILES LIST
// ======================

// Data files list
const filesListData = [
  {
    category: "design",
    img: "assets/archive-page/design-manipulation1.webp",
    name: "Watcher of Ruins",
    desc: "My first design manipulation:v",
    date: "2025-06-29"
  },
  {
    category: "design",
    img: "assets/archive-page/design-manipulation2.webp",
    name: "Wandered",
    desc: "My second design manipulation with AI touch btw",
    date: "2025-07-01"
  },
  {
    category: "design",
    img: "assets/archive-page/design-challenge.webp",
    name: "Kemerdekaan",
    desc: "Try to joined challenge from jayjayschool,but, yeah i don't get anything hahaha",
    date: "2025-08-14"
  },
  {
    category: "design",
    img: "assets/gallery-page/gfx-events-ellenjoe.png",
    name: "Ellen Joe — Zenless Zone Zero",
    desc: "Latest design🔥🔥",
    date: "2025-11-12"
  },
  {
    category: "project",
    img: "assets/archive-page/project-infografis.webp",
    name: "Infographic Raden Mas Panji",
    desc: "Commission requests for assignments",
    date: "2025-11-15"
  },
  {
    category: "project",
    img: "assets/archive-page/project-tahutek.jpg",
    name: "Tahu Tek Pak Gino",
    desc: "Simple poster but with qr to website",
    date: "2025-10-08"
  },
  {
    category: "art",
    img: "assets/archive-page/art-oc.webp",
    name: "Sketch Jenshou oc",
    desc: "My first oc,untill now its not used...",
    date: "2025-08-15"
  },
  {
    category: "art",
    img: "assets/archive-page/art-oc2.webp",
    name: "Original Character 2.0",
    desc: "better than previous oc🔥🔥",
    date: "2025-10-28"
  },
];

// Render files list (sorted by date descending)
const archiveGrid = document.querySelector('.archive-grid');
function renderFilesList() {
  archiveGrid.innerHTML = ""; // clear dulu

  // sort filesListData berdasarkan date terbaru
  const sortedFiles = filesListData.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // descending
  });

  sortedFiles.forEach(file => {
    const item = document.createElement('div');
    item.className = "archive-item glass";
    item.dataset.category = file.category;
    item.innerHTML = `
      <img src="${file.img}" alt="" class="archive-img" loading="lazy">
      <div class="archive-info">
        <h3 class="archive-name">${file.name}</h3>
        <p class="archive-desc">${file.desc}</p>
        <div class="archive-line"></div>
        <span class="archive-date">${file.date}</span>
      </div>
    `;
    archiveGrid.appendChild(item);
  });
}

// Initial render
renderFilesList();

(() => {
  const qaCards = document.querySelectorAll('.qa-card');
  const archiveItems = Array.from(document.querySelectorAll('.archive-item'));
  const searchInput = document.getElementById('archiveSearch');
  const showAllBtn = document.getElementById('showAllBtn');
  const archiveGrid = document.querySelector('.archive-grid');
  let currentFilter = 'all';
  let animating = false;

  function applyFilters() {
    if (animating) return;
    animating = true;

    const query = searchInput?.value.toLowerCase().trim() || '';

    // ambil item yang cocok
    const visibleItems = archiveItems.filter(item => {
      const text = item.textContent.toLowerCase();
      const matchQuery = text.includes(query);
      const matchFilter = currentFilter === 'all' || item.dataset.category === currentFilter;
      return matchQuery && matchFilter;
    });

    // sembunyikan item yang gak cocok dengan animasi keluar
    archiveItems.forEach(item => {
      if (!visibleItems.includes(item)) {
        item.classList.add('fade-out');
        setTimeout(() => item.classList.add('hidden'), 300);
      }
    });

    // tampilkan item yang cocok dengan animasi masuk
    setTimeout(() => {
      archiveGrid.innerHTML = '';
      visibleItems.forEach((item, i) => {
        item.classList.remove('hidden', 'fade-out');
        item.classList.add('fade-in');
        archiveGrid.appendChild(item);

        // delay sedikit biar muncul satu-satu
        item.style.animationDelay = `${i * 0.05}s`;
      });
      animating = false;
    }, 300);
  }

  qaCards.forEach(card => {
    card.addEventListener('click', () => {
      qaCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentFilter = card.getAttribute('data-filter') || 'all';
      if (searchInput) searchInput.value = '';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => applyFilters());
  }

  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      qaCards.forEach(c => c.classList.remove('active'));
      currentFilter = 'all';
      if (searchInput) searchInput.value = '';
      applyFilters();
    });
  }
})();

// === SHOW ALL FILES BUTTON ===
const showAllBtn = document.getElementById('showAllBtn');

showAllBtn.addEventListener('click', () => {
  // hapus class active di semua quick access
  qaCards.forEach(card => card.classList.remove('active'));

  // tampilkan semua file kembali
  archiveItems.forEach(item => item.classList.remove('hidden'));
});