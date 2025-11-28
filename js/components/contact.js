// Contact Request компонент
class ContactRequest {
  constructor() {
    this.contactSection = document.getElementById("contact");
    this.isSubmitted = false;

    this.init();
  }

  init() {
    this.renderContactForm();
    this.setupEventListeners();
  }

  renderContactForm() {
    const contactHTML = `
            <div class="contact-container">
                <div>
                    <div style="height: 1px; background: linear-gradient(to right, transparent, var(--accent-active), transparent); animation: expand 1s;"></div>
                    <h2 class="section-title">ЗАПРОС АУДИЕНЦИИ</h2>
                    <div style="height: 1px; background: linear-gradient(to right, transparent, var(--accent-active), transparent); animation: expand 1s 0.2s;"></div>
                </div>

                <div id="contact-form-container">
                    <form class="contact-form panel" id="contact-form">
                        <div class="form-field">
                            <label class="form-label">КАНАЛ СВЯЗИ</label>
                            <input type="email" class="form-input" id="contact-email" placeholder="secure.channel@continental.net" required>
                        </div>
                        <div class="form-field">
                            <label class="form-label">ХАРАКТЕР ЗАДАНИЯ</label>
                            <textarea class="form-input form-textarea" id="contact-message" placeholder="Describe the terms..." required></textarea>
                        </div>
                        <div class="submit-container">
                            <button type="submit" class="submit-btn" id="submit-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="22" y1="2" x2="11" y2="13"/>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                </svg>
                                ОТПРАВИТЬ МЕТКУ
                                <div class="submit-laser"></div>
                            </button>
                            <div id="submit-tooltip" class="submit-tooltip" style="display: none;">
                                <div class="tooltip-arrow"></div>
                                <p style="font-size: 0.75rem; font-style: italic; color: var(--text-secondary);">Один вопрос: Это было личное?</p>
                            </div>
                        </div>
                    </form>
                </div>

                <div id="contact-success" class="success-container" style="display: none;">
                    ${this.createSuccessState()}
                </div>
            </div>
        `;

    this.contactSection.innerHTML = contactHTML;
  }

  createSuccessState() {
    return `
            <div class="dissolve-marker">
                <div class="dissolve-marker-inner"></div>
                ${this.createSmokeParticles()}
            </div>

            <div class="success-message-container">
                <p style="font-size: 1.5rem; letter-spacing: 0.3em; color: var(--text-primary); margin-bottom: 16px;">ЗАПРОС ПРИНЯТ</p>
                <p class="owl-message" style="font-size: 1.125rem; font-style: italic; color: var(--text-secondary);">Ожидайте совы.</p>
            </div>
        `;
  }

  createSmokeParticles() {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    return angles
      .map(
        (angle) =>
          `<div class="smoke-particle" style="--angle: ${angle}deg"></div>`
      )
      .join("");
  }

  setupEventListeners() {
    this.contactSection.addEventListener("submit", (e) => {
      if (e.target.id === "contact-form") {
        e.preventDefault();
        this.handleFormSubmit(e);
      }
    });

    this.contactSection.addEventListener("mouseenter", (e) => {
      if (e.target.id === "submit-btn" || e.target.closest("#submit-btn")) {
        this.showTooltip();
      }
    });

    this.contactSection.addEventListener("mouseleave", (e) => {
      if (e.target.id === "submit-btn" || e.target.closest("#submit-btn")) {
        this.hideTooltip();
      }
    });
  }

  handleFormSubmit(e) {
    if (this.isSubmitted) return;

    const contactFormContainer = this.contactSection.querySelector(
      "#contact-form-container"
    );
    const contactSuccess =
      this.contactSection.querySelector("#contact-success");

    // Показать состояние успеха
    this.isSubmitted = true;
    contactFormContainer.style.display = "none";
    contactSuccess.style.display = "flex";

    // Анимация частиц дыма
    const smokeParticles =
      this.contactSection.querySelectorAll(".smoke-particle");
    smokeParticles.forEach((particle, index) => {
      particle.style.animation = `smoke-particle 2s ${
        1000 + index * 50
      }ms both`;
    });

    // Сброс формы через 4 секунды
    setTimeout(() => {
      this.resetForm();
    }, 4000);
  }

  resetForm() {
    const contactFormContainer = this.contactSection.querySelector(
      "#contact-form-container"
    );
    const contactSuccess =
      this.contactSection.querySelector("#contact-success");
    const contactForm = this.contactSection.querySelector("#contact-form");

    contactForm.reset();
    contactFormContainer.style.display = "block";
    contactSuccess.style.display = "none";
    this.isSubmitted = false;

    // Сброс анимации частиц
    const smokeParticles =
      this.contactSection.querySelectorAll(".smoke-particle");
    smokeParticles.forEach((particle) => {
      particle.style.animation = "none";
    });
  }

  showTooltip() {
    const tooltip = this.contactSection.querySelector("#submit-tooltip");
    if (tooltip) {
      tooltip.style.display = "block";
    }
  }

  hideTooltip() {
    const tooltip = this.contactSection.querySelector("#submit-tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
    }
  }
}

// Инициализация Contact Request
let contactRequest;

document.addEventListener("DOMContentLoaded", () => {
  contactRequest = new ContactRequest();
});
