// Specialization Dossier компонент
class SpecializationDossier {
  constructor() {
    this.dossierSection = document.getElementById("dossier");
    this.specializations = [
      {
        id: "cqc",
        title: "БЛИЖНИЙ БОЙ",
        icon: this.getCQCIcon(),
        stat: "98.7%",
        tagline: "Проблема перестаёт существовать.",
        targets: 12,
      },
      {
        id: "firearms",
        title: "ОГНЕСТРЕЛЬНОЕ",
        icon: this.getFirearmsIcon(),
        stat: "99.2%",
        tagline: "Один выстрел. Одно решение.",
        targets: 15,
      },
      {
        id: "tactical",
        title: "ТАКТИЧЕСКОЕ ВОЖДЕНИЕ",
        icon: this.getTacticalIcon(),
        stat: "97.4%",
        tagline: "Погоня заканчивается здесь.",
        targets: 8,
      },
    ];

    this.init();
  }

  init() {
    this.renderDossier();
    this.setupEventListeners();
  }

  renderDossier() {
    const dossierHTML = `
            <div class="dossier-container">
                <div>
                    <div style="height: 1px; background: linear-gradient(to right, transparent, var(--accent-active), transparent); animation: expand 1s;"></div>
                    <h2 class="section-title">ДОСЬЕ</h2>
                    <div style="height: 1px; background: linear-gradient(to right, transparent, var(--accent-active), transparent); animation: expand 1s 0.2s;"></div>
                </div>

                <div class="specialization-list">
                    ${this.specializations
                      .map((spec, index) =>
                        this.createSpecializationItem(spec, index)
                      )
                      .join("")}
                </div>
            </div>
        `;

    this.dossierSection.innerHTML = dossierHTML;
  }

  createSpecializationItem(spec, index) {
    return `
            <div class="specialization-item" style="animation-delay: ${
              index * 100
            }ms;">
                <div class="specialization-header" data-id="${spec.id}">
                    <div class="specialization-title">
                        ${spec.icon}
                        <span class="specialization-name">${spec.title}</span>
                    </div>
                    <svg class="specialization-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="specialization-content" id="${spec.id}-content">
                    <div class="specialization-details">
                        <div class="specialization-grid">
                            <div>
                                <p class="contact-label">ЗАХВАТ ЦЕЛИ</p>
                                <div class="target-grid">
                                    ${this.createTargets(spec.targets)}
                                </div>
                            </div>
                            <div class="stat-container">
                                <div>
                                    <p class="contact-label">ЭФФЕКТИВНОСТЬ</p>
                                    <p class="stat-value">${spec.stat}</p>
                                </div>
                                <div class="stat-tagline">
                                    <p style="font-size: 0.875rem; font-style: italic; color: var(--text-secondary);">${
                                      spec.tagline
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  createTargets(count) {
    let targetsHTML = "";
    for (let i = 0; i < count; i++) {
      targetsHTML += `
                <div class="target-item" style="animation-delay: ${i * 50}ms;">
                    <div class="target-silhouette"></div>
                    <div class="target-crosshair">
                        <div class="crosshair-line crosshair-horizontal"></div>
                        <div class="crosshair-line crosshair-vertical"></div>
                    </div>
                </div>
            `;
    }
    return targetsHTML;
  }

  getCQCIcon() {
    return `
            <svg class="specialization-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
            </svg>
        `;
  }

  getFirearmsIcon() {
    return `
            <svg class="specialization-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
            </svg>
        `;
  }

  getTacticalIcon() {
    return `
            <svg class="specialization-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10h-4l-2-3H7L5 10 2.5 11.1C1.7 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"/>
                <circle cx="7" cy="17" r="2"/>
                <circle cx="17" cy="17" r="2"/>
            </svg>
        `;
  }

  setupEventListeners() {
    this.dossierSection.addEventListener("click", (e) => {
      const header = e.target.closest(".specialization-header");
      if (header) {
        this.toggleSpecialization(header);
      }
    });
  }

  toggleSpecialization(header) {
    const id = header.getAttribute("data-id");
    const content = document.getElementById(`${id}-content`);
    const chevron = header.querySelector(".specialization-chevron");

    // Закрыть все открытые секции
    document.querySelectorAll(".specialization-content").forEach((item) => {
      if (item !== content && item.classList.contains("expanded")) {
        item.classList.remove("expanded");
        const otherChevron = item.parentElement.querySelector(
          ".specialization-chevron"
        );
        otherChevron.style.transform = "rotate(0deg)";
      }
    });

    // Переключить текущую секцию
    if (content.classList.contains("expanded")) {
      content.classList.remove("expanded");
      chevron.style.transform = "rotate(0deg)";
    } else {
      content.classList.add("expanded");
      chevron.style.transform = "rotate(180deg)";
    }
  }
}

// Инициализация Dossier
let specializationDossier;

document.addEventListener("DOMContentLoaded", () => {
  specializationDossier = new SpecializationDossier();
});
