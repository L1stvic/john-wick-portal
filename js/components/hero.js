// Hero Section с эффектами
class HeroSection {
  constructor() {
    this.heroImageContainer = document.querySelector(".hero-image-container");
    this.lightningFlash = document.querySelector(".lightning-flash");
    this.lightningDetail = document.querySelector(".lightning-detail");

    this.scrollY = 0;
    this.hasScrolledDown = false;
    this.hideImage = false;
    this.showLightning = false;

    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupResizeHandler();
  }

  setupScrollEffects() {
    window.addEventListener(
      "scroll",
      JohnWickUtils.debounce(() => {
        this.scrollY = window.scrollY;
        this.updateHeroEffects();
      }, 10)
    );
  }

  updateHeroEffects() {
    // Параллакс и масштабирование
    const opacity = Math.max(0, 1 - this.scrollY / 400);
    const scale = 1 + (this.scrollY / 400) * 0.2;

    this.heroImageContainer.style.opacity = opacity;
    this.heroImageContainer.style.transform = `scale(${scale})`;

    // Вспышка молнии
    if (this.scrollY > 100 && this.scrollY < 300 && !this.showLightning) {
      this.triggerLightning();
    }

    // Отслеживание прокрутки вниз
    if (this.scrollY > 300) {
      this.hasScrolledDown = true;
    }

    // Исчезновение изображения при возврате наверх
    if (this.hasScrolledDown && this.scrollY < 100) {
      this.hideImage = true;
      this.heroImageContainer.style.opacity = "0";
    } else {
      this.hideImage = false;
    }
  }

  triggerLightning() {
    this.showLightning = true;
    this.lightningFlash.style.opacity = "1";
    this.lightningDetail.style.opacity = "0.8";

    setTimeout(() => {
      this.showLightning = false;
      this.lightningFlash.style.opacity = "0";
      this.lightningDetail.style.opacity = "0";
    }, 150);
  }

  setupResizeHandler() {
    window.addEventListener(
      "resize",
      JohnWickUtils.debounce(() => {
        // Обновление эффектов при изменении размера окна
        this.updateHeroEffects();
      }, 250)
    );
  }
}

// Инициализация Hero Section
let heroSection;

document.addEventListener("DOMContentLoaded", () => {
  heroSection = new HeroSection();
});
