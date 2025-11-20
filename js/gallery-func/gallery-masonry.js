document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  // ===== Fungsi untuk hitung width tiap item berdasarkan screen =====
function setItemWidths() {
  const width = window.innerWidth;
  let colNum = 4; // desktop
  if (width < 1024) colNum = 3; // tablet
  if (width < 768) colNum = 2;  // mobile

  const galleryWidth = galleryGrid.clientWidth;
  const gutter = 20;
  const itemWidth = (galleryWidth - (colNum - 1) * gutter) / colNum;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.width = `${itemWidth}px`;
  });

  return itemWidth; // kembalikan sebagai columnWidth
}

  // ===== Init Masonry =====
  let msnry = new Masonry(galleryGrid, {
  itemSelector: '.gallery-item',
  columnWidth: setItemWidths(), // jangan pakai '.gallery-item'
  percentPosition: false,       // karena kita pakai pixel
  gutter: 20,
  transitionDuration: '0.4s'
});

  // ===== Render gallery items =====
  function renderGalleryItems(items) {
    galleryGrid.innerHTML = "";
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
            <div class="overlay-icons">
              <a href="${item.pinterest}" target="_blank" aria-label="Pinterest"><i class="fa-brands fa-pinterest"></i></a>
              <a href="${item.instagram}" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      `;
      galleryGrid.appendChild(galleryItem);
    });

    // ===== Pastikan Masonry layout setelah semua gambar loaded =====
    imagesLoaded(galleryGrid, () => {
      setItemWidths(); // set ulang width sesuai kolom
      msnry.reloadItems();
      msnry.layout();
    });
  }

  renderGalleryItems(galleryItems);

  // ===== Filter system =====
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      const filtered = galleryItems.filter(item => filter === "all" || item.categories.includes(filter));
      renderGalleryItems(filtered);
    });
  });

  // ===== Re-layout saat resize =====
  window.addEventListener("resize", () => {
    setItemWidths();
    msnry.reloadItems();
    msnry.layout();
  });
});