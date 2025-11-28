// Blood Oath Marker компонент
class BloodOathMarker {
  constructor() {
    this.markerSection = document.getElementById("marker");
    this.isUnlocked = false;
    this.secretCode = "7734"; // HELL на калькуляторе

    this.init();
  }

  init() {
    this.renderMarker();
    this.setupEventListeners();
  }

  renderMarker() {
    const markerHTML = `
            <div class="blood-oath-container">
                <div>
                    <h2 class="section-title">КРОВАВАЯ МЕТКА</h2>
                    <p class="section-subtitle" id="marker-subtitle">Введите серийный номер для активации</p>
                </div>

                <div class="marker-container" id="marker-visual">
                    <div class="marker-back">
                        <div class="marker-outer-circle">
                            <div class="marker-cross">
                                <div class="marker-line-vertical"></div>
                                <div class="marker-line-horizontal"></div>
                                <div class="marker-center">
                                    <span class="marker-hell-text">HELL</span>
                                </div>
                                ${this.createMarkerDots()}
                            </div>
                        </div>
                        <div class="marker-glow"></div>
                    </div>
                    <div class="marker-front">
                        <div class="marker-outer-circle">
                            <div class="marker-cross">
                                <div class="marker-line-vertical"></div>
                                <div class="marker-line-horizontal"></div>
                                <div class="marker-center">
                                    <span class="marker-hell-text">HELL</span>
                                </div>
                                ${this.createMarkerDots()}
                            </div>
                        </div>
                        <div class="marker-glow"></div>
                    </div>
                </div>

                <form class="marker-form panel" id="marker-form">
                    <div class="form-group">
                        <label class="form-label">СЕРИЙНЫЙ НОМЕР МЕТКИ</label>
                        <input type="text" class="form-input" id="coin-serial" maxlength="4" placeholder="****" required>
                        <div id="error-message" class="error-message">НЕВЕРНЫЙ СЕРИЙНЫЙ НОМЕР</div>
                    </div>
                    <button type="submit" class="submit-btn">АКТИВИРОВАТЬ МЕТКУ</button>
                </form>

                <div id="unlocked-state" class="unlocked-container" style="display: none;">
                    ${this.createUnlockedState()}
                </div>

                <p class="hint-text">Подсказка: Посмотрите на четыре угла метки</p>
            </div>
        `;

    this.markerSection.innerHTML = markerHTML;
  }

  createMarkerDots() {
    const angles = [0, 90, 180, 270];
    return angles
      .map(
        (angle) => `<div class="marker-dot" style="--angle: ${angle}deg"></div>`
      )
      .join("");
  }

  createUnlockedState() {
    return `
            <div class="success-marker">
                <div class="success-marker-inner"></div>
                ${this.createSmokeParticles()}
            </div>

            <div class="access-granted">
                <p style="font-size: 1.5rem; letter-spacing: 0.3em; color: var(--accent-active); margin-bottom: 8px;">МЕТКА АКТИВИРОВАНА</p>
                <p class="section-subtitle">Контракт теперь в силе</p>
            </div>

            <div class="contact-grid">
                <div class="contact-card contact-card-left">
                    <div class="contact-header">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span class="contact-label">ПРЯМАЯ ЛИНИЯ</span>
                    </div>
                    <p class="contact-value" style="animation: phone-reveal 0.5s 1s both;">+1 (555) 7734</p>
                </div>

                <div class="contact-card contact-card-right">
                    <div class="contact-header">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span class="contact-label">МЕСТОПОЛОЖЕНИЕ</span>
                    </div>
                    <p class="contact-address" style="animation: address-reveal 0.5s 1.2s both;">
                        1 Wall Street Court<br/>
                        New York, NY 10005
                    </p>
                </div>
            </div>

            <div class="welcome-message">
                <p class="section-subtitle">«Континенталь приветствует вас.»</p>
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
    this.markerSection.addEventListener("submit", (e) => {
      if (e.target.id === "marker-form") {
        e.preventDefault();
        this.handleFormSubmit(e);
      }
    });
  }

  handleFormSubmit(e) {
    const serialInput = this.markerSection.querySelector("#coin-serial");
    const errorMessage = this.markerSection.querySelector("#error-message");
    const markerForm = this.markerSection.querySelector("#marker-form");
    const unlockedState = this.markerSection.querySelector("#unlocked-state");
    const markerSubtitle = this.markerSection.querySelector("#marker-subtitle");

    const serial = serialInput.value;

    if (serial === this.secretCode) {
      // Успешная активация
      this.isUnlocked = true;
      errorMessage.style.display = "none";

      // Показать разблокированное состояние
      markerForm.style.display = "none";
      unlockedState.style.display = "flex";
      markerSubtitle.textContent = "Контракт заключён";

      // Анимация частиц дыма
      const smokeParticles =
        this.markerSection.querySelectorAll(".smoke-particle");
      smokeParticles.forEach((particle, index) => {
        particle.style.animation = `smoke-particle 2s ${
          1000 + index * 50
        }ms both`;
      });
    } else {
      // Ошибка
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 2000);
    }
  }
}

// Инициализация Blood Oath Marker
let bloodOathMarker;
document.addEventListener("DOMContentLoaded", () => {
  bloodOathMarker = new BloodOathMarker();
});
