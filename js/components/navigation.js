// Навигация по вкладкам
class Navigation {
  constructor() {
    this.navTabs = document.querySelectorAll(".nav-tab");
    this.tabContents = document.querySelectorAll(".tab-content");
    this.activeTab = "marker";

    this.init();
  }

  init() {
    this.navTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab");
        this.switchTab(tabId);
      });
    });
  }

  switchTab(tabId) {
    // Обновление активной вкладки
    this.navTabs.forEach((t) => t.classList.remove("active"));
    this.tabContents.forEach((content) => content.classList.remove("active"));

    // Активация выбранной вкладки
    const activeTab = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId);

    if (activeTab && activeContent) {
      activeTab.classList.add("active");
      activeContent.classList.add("active");
      this.activeTab = tabId;

      // Прокрутка к верху секции
      window.scrollTo({
        top: activeContent.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }

  getActiveTab() {
    return this.activeTab;
  }
}

// Инициализация навигации
let navigation;

document.addEventListener("DOMContentLoaded", () => {
  navigation = new Navigation();
});
