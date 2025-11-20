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