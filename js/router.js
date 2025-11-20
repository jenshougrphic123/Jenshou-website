// ==============================
// Jenshou Router — support full standalone HTML pages
// ==============================

const routes = {
  "#dashboard": "index.html",
  "#gallery": "gallery.html",
  "#commission": "commission.html",
  "#about": "about.html"
};

const content = document.getElementById("contentCol");

async function loadPage() {
  const hash = window.location.hash || "#dashboard";
  const page = routes[hash];

  // Animasi keluar
  content.classList.remove("fade-in");
  content.classList.add("fade-out");

  try {
    // Jika dashboard, biarkan isi asli (tidak fetch ulang)
    if (hash === "#dashboard") {
      setTimeout(() => {
        content.classList.remove("fade-out");
        content.classList.add("fade-in");
        updateActiveLink(hash);
      }, 200);
      return;
    }

    // Ambil halaman target
    const response = await fetch(page);
    if (!response.ok) throw new Error("Halaman tidak ditemukan");
    const html = await response.text();

    // Parsing HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Ambil isi <body> dari file target
    const newBody = doc.querySelector("body");
    const newHead = doc.querySelector("head");

    // Hapus style lama khusus halaman sebelumnya
    document.querySelectorAll("link[data-page-style]").forEach(link => link.remove());

    // Tambahkan stylesheet dari halaman baru
    newHead.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const newLink = document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.href = link.href;
      newLink.dataset.pageStyle = "true";
      document.head.appendChild(newLink);
    });

    // Tambahkan fontawesome jika ada
    const fa = newHead.querySelector('link[href*="font-awesome"]');
    if (fa && !document.querySelector(`link[href="${fa.href}"]`)) {
      const faLink = document.createElement("link");
      faLink.rel = "stylesheet";
      faLink.href = fa.href;
      document.head.appendChild(faLink);
    }

    // Masukkan konten body baru
    setTimeout(() => {
      content.innerHTML = newBody.innerHTML;
      content.classList.remove("fade-out");
      content.classList.add("fade-in");
      updateActiveLink(hash);

      // Jalankan semua <script> dari halaman baru
      newBody.querySelectorAll("script").forEach(oldScript => {
        const script = document.createElement("script");
        if (oldScript.src) {
          script.src = oldScript.src;
        } else {
          script.textContent = oldScript.textContent;
        }
        document.body.appendChild(script);
      });
    }, 250);

  } catch (error) {
    console.error(error);
    content.innerHTML = `
      <div class="error-msg glass-sub">
        <h2>Oops 😢</h2>
        <p>Halaman tidak ditemukan atau gagal dimuat.</p>
      </div>`;
  }
}

// Fungsi ubah link aktif di navbar
function updateActiveLink(activeHash) {
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === activeHash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Event listener
window.addEventListener("hashchange", loadPage);
window.addEventListener("load", loadPage);

// Animasi transisi CSS sederhana
const style = document.createElement("style");
style.textContent = `
  #contentCol.fade-in {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  #contentCol.fade-out {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(style);