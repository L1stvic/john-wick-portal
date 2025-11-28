// Главный файл для быстрого исправления
document.addEventListener("DOMContentLoaded", function () {
  // 1. Навигация
  const navTabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");

  navTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Обновление активной вкладки
      navTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Показать соответствующий контент
      tabContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === tabId) {
          content.classList.add("active");
        }
      });
    });
  });

  // 2. Добавляем интерактивную кровавую метку
  const markerSection = document.getElementById("marker");
  if (markerSection) {
    markerSection.innerHTML = `
            <div class="blood-oath-container">
                <div>
                    <h2 class="section-title">КРОВАВАЯ МЕТКА</h2>
                    <p class="section-subtitle">Введите серийный номер для активации</p>
                </div>

                <!-- Интерактивная метка -->
                <div class="interactive-marker" id="interactive-marker">
                    <div class="marker-outer closed" id="marker-outer">
                        <div class="marker-front">
                            <div class="marker-design">
                                <div class="marker-circle"></div>
                                <div class="marker-cross">
                                    <div class="cross-line vertical"></div>
                                    <div class="cross-line horizontal"></div>
                                </div>
                                <div class="marker-corners">
                                    <div class="corner top-left"></div>
                                    <div class="corner top-right"></div>
                                    <div class="corner bottom-left"></div>
                                    <div class="corner bottom-right"></div>
                                </div>
                                <div class="marker-center-dot"></div>
                            </div>
                        </div>
                        <div class="marker-back">
                            <div class="hell-reveal">
                                <div class="hell-text">HELL</div>
                            </div>
                        </div>
                    </div>
                </div>

                <form class="marker-form panel">
                    <div class="form-group">
                        <label class="form-label">СЕРИЙНЫЙ НОМЕР МЕТКИ</label>
                        <input type="text" class="form-input" id="coin-serial" maxlength="4" placeholder="****" required>
                        <div class="error-message" id="error-message" style="display: none;">НЕВЕРНЫЙ СЕРИЙНЫЙ НОМЕР</div>
                    </div>
                    <button type="submit" class="submit-btn">АКТИВИРОВАТЬ МЕТКУ</button>
                </form>

                <div class="success-message" id="success-message" style="display: none;">
                    <p style="font-size: 1.5rem; color: #8B0000; letter-spacing: 0.3em;">МЕТКА АКТИВИРОВАНА</p>
                    <p style="color: #C0A050; margin-top: 10px;">Континенталь приветствует вас.</p>
                    
                    <!-- Контактная информация -->
                    <div class="contact-info" style="margin-top: 30px; padding: 20px; border: 1px solid rgba(192, 160, 80, 0.3); background: rgba(0, 0, 0, 0.4);">
                        <div style="display: grid; grid-template-columns: 1fr; gap: 20px; max-width: 500px; margin: 0 auto;">
                            <div style="text-align: center;">
                                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0A050" stroke-width="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <span style="font-size: 0.875rem; letter-spacing: 0.2em; color: #C0A050;">ПРЯМАЯ ЛИНИЯ</span>
                                </div>
                                <p style="font-size: 1.5rem; color: #C0A050; letter-spacing: 0.1em;">+1 (555) 7734</p>
                            </div>
                            
                            <div style="text-align: center;">
                                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0A050" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <span style="font-size: 0.875rem; letter-spacing: 0.2em; color: #C0A050;">МЕСТОПОЛОЖЕНИЕ</span>
                                </div>
                                <p style="font-size: 1.125rem; color: #C0A050; line-height: 1.4;">
                                    1 Wall Street Court<br/>
                                    New York, NY 10005
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="hint-text">Подсказка: Нажмите на метку чтобы увидеть подсказку</p>
            </div>
        `;

    // Стили для интерактивной метки
    const style = document.createElement("style");
    style.textContent = `
            .interactive-marker {
                width: 300px;
                height: 300px;
                margin: 40px auto;
                perspective: 1000px;
                cursor: pointer;
            }

            .marker-outer {
                width: 100%;
                height: 100%;
                position: relative;
                transform-style: preserve-3d;
                transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                transform: rotateY(0deg);
            }

            .marker-outer.opened {
                transform: rotateY(180deg);
            }

            .marker-front, .marker-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .marker-front {
                background: radial-gradient(circle at center, #2a1a1a, #0a0a0a);
                border: 3px solid #C0A050;
                box-shadow: 
                    0 0 30px rgba(192, 160, 80, 0.3),
                    inset 0 0 20px rgba(192, 160, 80, 0.1);
            }

            .marker-back {
                background: radial-gradient(circle at center, #1a0000, #000000);
                border: 3px solid #8B0000;
                transform: rotateY(180deg);
                box-shadow: 
                    0 0 40px rgba(139, 0, 0, 0.5),
                    inset 0 0 30px rgba(139, 0, 0, 0.2);
            }

            .marker-design {
                position: relative;
                width: 200px;
                height: 200px;
            }

            .marker-circle {
                width: 100%;
                height: 100%;
                border: 2px solid #C0A050;
                border-radius: 50%;
                position: absolute;
            }

            .marker-cross {
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .cross-line {
                position: absolute;
                background: #C0A050;
            }

            .cross-line.vertical {
                width: 2px;
                height: 100%;
                left: 50%;
                transform: translateX(-50%);
            }

            .cross-line.horizontal {
                height: 2px;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }

            .marker-corners {
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .corner {
                position: absolute;
                width: 12px;
                height: 12px;
                background: #8B0000;
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(139, 0, 0, 0.8);
            }

            .corner.top-left { top: 15px; left: 15px; }
            .corner.top-right { top: 15px; right: 15px; }
            .corner.bottom-left { bottom: 15px; left: 15px; }
            .corner.bottom-right { bottom: 15px; right: 15px; }

            .marker-center-dot {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                background: #8B0000;
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(139, 0, 0, 0.6);
            }

            .hell-reveal {
                text-align: center;
            }

            .hell-text {
                font-size: 3.5rem;
                font-weight: bold;
                color: #8B0000;
                letter-spacing: 0.5em;
                text-shadow: 
                    0 0 20px rgba(139, 0, 0, 0.8),
                    0 0 40px rgba(139, 0, 0, 0.4);
                animation: hell-pulse 2s infinite;
                margin-left: 0.25em;
            }

            @keyframes hell-pulse {
                0%, 100% { 
                    transform: scale(1);
                    text-shadow: 
                        0 0 20px rgba(139, 0, 0, 0.8),
                        0 0 40px rgba(139, 0, 0, 0.4);
                }
                50% { 
                    transform: scale(1.1);
                    text-shadow: 
                        0 0 30px rgba(139, 0, 0, 1),
                        0 0 60px rgba(139, 0, 0, 0.6);
                }
            }

            .interactive-marker:hover .marker-front {
                border-color: #8B0000;
                box-shadow: 
                    0 0 40px rgba(139, 0, 0, 0.4),
                    inset 0 0 25px rgba(139, 0, 0, 0.1);
            }

            .interactive-marker:hover .marker-outer:not(.opened) {
                transform: rotateY(0deg) scale(1.05);
            }

            .contact-info {
                animation: slideUp 0.6s ease-out 0.3s both;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
    document.head.appendChild(style);

    // Обработчик клика на метку
    const marker = document.getElementById("interactive-marker");
    const markerOuter = document.getElementById("marker-outer");

    marker.addEventListener("click", function () {
      markerOuter.classList.toggle("opened");
    });

    // Обработчик формы - ТОЛЬКО правильный код 7734
    const markerForm = markerSection.querySelector("form");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    markerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = document.getElementById("coin-serial");

      // ТОЛЬКО код 7734 работает
      if (input.value === "7734") {
        errorMessage.style.display = "none";
        successMessage.style.display = "block";
        markerForm.style.display = "none";

        // Анимация успеха
        markerOuter.style.transform = "rotateY(180deg) scale(1.1)";
        setTimeout(() => {
          markerOuter.style.transform = "rotateY(180deg) scale(1)";
        }, 300);
      } else {
        errorMessage.style.display = "block";
        successMessage.style.display = "none";

        // Анимация ошибки
        markerOuter.style.transform = "rotateY(0deg) translateX(10px)";
        setTimeout(() => {
          markerOuter.style.transform = "rotateY(0deg) translateX(-10px)";
          setTimeout(() => {
            markerOuter.style.transform = "rotateY(0deg) translateX(0)";
          }, 100);
        }, 100);
      }
    });
  }

  // 3. Добавляем контент для Правил
  const rulesSection = document.getElementById("rules");
  if (rulesSection) {
    rulesSection.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <h2 class="section-title">ПРАВИЛА КОНТИНЕНТАЛЯ</h2>
                <p class="section-subtitle">Абсолютные законы Высшего Стола</p>
                
                <div style="max-width: 800px; margin: 0 auto;">
                    <div style="border-left: 3px solid #8B0000; padding: 20px; margin: 20px 0; background: rgba(0,0,0,0.3);">
                        <div style="font-size: 1.5rem; color: #8B0000; font-weight: bold; margin-bottom: 10px;">ПРАВИЛО №1</div>
                        <div style="font-size: 1.2rem; margin-bottom: 10px;">Никакие дела не могут вестись на территории Континенталя.</div>
                        <div style="color: #C0A050; font-style: italic;">Континенталь — нейтральная территория. Любое нарушение карается смертью.</div>
                    </div>

                    <div style="border-left: 3px solid #8B0000; padding: 20px; margin: 20px 0; background: rgba(0,0,0,0.3);">
                        <div style="font-size: 1.5rem; color: #8B0000; font-weight: bold; margin-bottom: 10px;">ПРАВИЛО №2</div>
                        <div style="font-size: 1.2rem; margin-bottom: 10px;">Все метки должны быть выполнены.</div>
                        <div style="color: #C0A050; font-style: italic;">Кровавая метка — это священный контракт. Отказ невозможен.</div>
                    </div>

                    <div style="border-left: 3px solid #8B0000; padding: 20px; margin: 20px 0; background: rgba(0,0,0,0.3);">
                        <div style="font-size: 1.5rem; color: #8B0000; font-weight: bold; margin-bottom: 10px;">ПРАВИЛО №3</div>
                        <div style="font-size: 1.2rem; margin-bottom: 10px;">Верность Высшему Столу абсолютна.</div>
                        <div style="color: #C0A050; font-style: italic;">Высший Стол — высшая власть. Неповиновение означает отлучение.</div>
                    </div>

                    <div style="text-align: center; margin-top: 40px; padding: 20px; border-top: 1px solid rgba(139,0,0,0.3);">
                        <p style="font-style: italic; color: #C0A050; line-height: 1.8;">
                            "В мире убийц существует порядок. Континенталь — это островок цивилизации в океане хаоса."
                        </p>
                        <p style="margin-top: 15px; font-size: 0.9rem; color: rgba(192,160,80,0.6);">
                            — УПРАВЛЯЮЩИЙ КОНТИНЕНТАЛЯ
                        </p>
                    </div>
                </div>
            </div>
        `;
  }

  // 4. Добавляем базовый контент для других вкладок
  const sections = ["dossier", "gallery", "contact"];
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && !section.innerHTML.trim()) {
      section.innerHTML = `<div style="text-align: center; padding: 40px;"><h2 class="section-title">${sectionId.toUpperCase()}</h2><p style="color: #C0A050;">Содержимое загружается...</p></div>`;
    }
  });
});
