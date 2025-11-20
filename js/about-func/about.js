const hamburgerBtn = document.querySelector(".hamburger-btn");
const mobileSidebar = document.querySelector(".mobile-sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const toggleBtn = document.querySelector(".social-toggle");
const socialCol = document.querySelector(".social-col");

// --- DARK MODE TOGGLE ---
const toggleDarkBtn = document.getElementById('toggle-dark');

if (toggleDarkBtn) {
  const icon = toggleDarkBtn.querySelector('i');

  // Restore theme
  const saved = localStorage.getItem('themeMode');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    if (icon) icon.className = 'fa-solid fa-sun';
  } else {
    if (icon) icon.className = 'fa-solid fa-moon';
  }

  toggleDarkBtn.addEventListener('click', () => {
    const nowDark = document.body.classList.toggle('dark-mode');

    if (icon) {
      icon.className = nowDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      icon.style.transition = 'transform 0.35s ease';
      icon.style.transform = 'rotate(0.5turn)';
      setTimeout(() => icon.style.transform = '', 350);
    }

    try {
      localStorage.setItem('themeMode', nowDark ? 'dark' : 'light');
    } catch {}
  });
}

// 🔹 Sidebar toggle
hamburgerBtn.addEventListener("click", () => {
  mobileSidebar.classList.toggle("active");
  sidebarOverlay.classList.toggle("active");
  hamburgerBtn.classList.toggle("active");
});

// 🔹 Tutup overlay
sidebarOverlay.addEventListener("click", () => {
  mobileSidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
  hamburgerBtn.classList.remove("active");
});

// 🔹 Toggle sosial column
if (toggleBtn && socialCol) {
  toggleBtn.addEventListener("click", () => {
    socialCol.classList.toggle("active");
    toggleBtn.classList.toggle("active");
  });
}

// ✨ Soft Particle Generator
const particleContainer = document.querySelector('.particle-container');

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

  const scrollTopBtn = document.getElementById("scrollTopBtn");
  
  // 🌈 Smooth Reveal Animation (About Section)
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const observerOptions = {
    threshold: 0.15, // muncul ketika 15% bagian elemen terlihat
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealOnScroll.unobserve(entry.target); // biar gak dipantau terus
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealOnScroll.observe(el));
}

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