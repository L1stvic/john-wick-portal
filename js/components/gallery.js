// Gallery компонент
class Gallery {
  constructor() {
    this.gallerySection = document.getElementById("gallery");
    this.lightbox = document.getElementById("lightbox");
    this.currentFilter = "all";

    this.galleryItems = [
      {
        id: 1,
        title: "ПОРТРЕТ",
        category: "Профиль",
        image: "john-wick-chapter-2-movie-wide_0.jpg",
      },
      {
        id: 2,
        title: "АРСЕНАЛ",
        category: "Снаряжение",
        image: "images.jpeg",
      },
      {
        id: 3,
        title: "КОНТИНЕНТАЛЬ",
        category: "Локация",
        image: "18002833_l.webp",
      },
      {
        id: 4,
        title: "ТАКТИЧЕСКАЯ ЭКИПИРОВКА",
        category: "Снаряжение",
        image: "fd82e95f364c177504acc8e142a08a56.png",
      },
      {
        id: 5,
        title: "НОЧНОЙ ГОРОД",
        category: "Локация",
        image: "jGysm8Zq2r2tu3ZS5HE5g.jpg",
      },
      {
        id: 6,
        title: "ЗОЛОТЫЕ МОНЕТЫ",
        category: "Артефакты",
        image: "910d06584c9fdffb81313236e54c333e3d331bea_original.jpeg",
      },
    ];

    this.categories = ["Все", "Профиль", "Снаряжение", "Локация", "Артефакты"];

    this.init();
  }

  init() {
    this.renderGallery();
    this.setupEventListeners();
  }

  renderGallery() {
    const galleryHTML = `
            <div class="gallery-container">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h2 class="section-title">ГАЛЕРЕЯ</h2>
                    <p class="section-subtitle">Архив миссий и достижений</p>
                </div>

                <div class="gallery-filters">
                    ${this.categories
                      .map(
                        (category) =>
                          `<button class="filter-btn ${
                            category === "Все" ? "active" : ""
                          }" 
                                data-filter="${
                                  category === "Все" ? "all" : category
                                }">
                            ${category.toUpperCase()}
                         </button>`
                      )
                      .join("")}
                </div>

                <div class="gallery-grid" id="gallery-grid">
                    ${this.renderGalleryItems(this.galleryItems)}
                </div>
            </div>
        `;

    this.gallerySection.innerHTML = galleryHTML;
  }

  renderGalleryItems(items) {
    return items
      .map(
        (item, index) => `
            <div class="gallery-item" style="animation-delay: ${
              index * 100
            }ms;" data-category="${item.category}">
                <img src="${item.image}" alt="${
          item.title
        }" class="gallery-image">
                <div class="gallery-overlay"></div>
                <div class="gallery-info">
                    <p class="gallery-category">${item.category}</p>
                    <h3 class="gallery-title">${item.title}</h3>
                </div>
                <div class="gallery-border"></div>
                <div class="gallery-crosshair">
                    <div class="crosshair-h"></div>
                    <div class="crosshair-v"></div>
                </div>
            </div>
        `
      )
      .join("");
  }

  setupEventListeners() {
    // Фильтры
    this.gallerySection.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        this.handleFilterClick(e.target);
      }

      if (e.target.closest(".gallery-item")) {
        this.handleImageClick(e.target.closest(".gallery-item"));
      }
    });

    // Lightbox
    this.lightbox.addEventListener("click", (e) => {
      if (e.target === this.lightbox || e.target.closest(".lightbox-close")) {
        this.closeLightbox();
      }
    });

    // Закрытие по ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.lightbox.style.display === "flex") {
        this.closeLightbox();
      }
    });
  }

  handleFilterClick(button) {
    const filter = button.getAttribute("data-filter");

    // Обновить активную кнопку
    this.gallerySection.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    // Применить фильтр
    this.currentFilter = filter;
    const filteredItems =
      filter === "all"
        ? this.galleryItems
        : this.galleryItems.filter((item) => item.category === filter);

    this.updateGalleryGrid(filteredItems);
  }

  updateGalleryGrid(items) {
    const galleryGrid = this.gallerySection.querySelector("#gallery-grid");
    galleryGrid.innerHTML = this.renderGalleryItems(items);
  }

  handleImageClick(galleryItem) {
    const category = galleryItem.getAttribute("data-category");
    const title = galleryItem.querySelector(".gallery-title").textContent;
    const imageSrc = galleryItem.querySelector(".gallery-image").src;

    this.openLightbox(imageSrc, category, title);
  }

  openLightbox(imageSrc, category, title) {
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCategory = document.getElementById("lightbox-category");
    const lightboxTitle = document.getElementById("lightbox-title");

    lightboxImage.src = imageSrc;
    lightboxCategory.textContent = category;
    lightboxTitle.textContent = title;

    this.lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    this.lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Инициализация Gallery
let gallery;

document.addEventListener("DOMContentLoaded", () => {
  gallery = new Gallery();
});
