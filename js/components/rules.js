// Rules Access компонент
class RulesAccess {
  constructor() {
    this.rulesSection = document.getElementById("rules");
    this.init();
  }

  init() {
    this.renderRules();
  }

  renderRules() {
    const rulesHTML = `
            <div class="rules-container">
                <div>
                    <div style="height: 1px; background: linear-gradient(to right, transparent, var(--accent-active), transparent); animation: expand 1s;"></div>
                    <h2 class="section-title">ПРАВИЛА КОНТИНЕНТАЛЯ</h2>
                    <div style="height: 1px; background: linear-gradient(to right, transparent, var(--accent-active), transparent); animation: expand 1s 0.2s;"></div>
                </div>

                <div class="panel">
                    <div class="rules-list">
                        <div class="rule-item" style="animation-delay: 0ms;">
                            <div class="rule-header">
                                <div class="rule-number">1</div>
                                <p class="rule-title">ПРАВИЛО №1</p>
                            </div>
                            <p class="rule-text">Никакие дела не могут вестись на территории Континенталя.</p>
                            <p class="rule-description">Континенталь — нейтральная территория. Любое нарушение карается смертью.</p>
                        </div>

                        <div class="rule-item" style="animation-delay: 200ms;">
                            <div class="rule-header">
                                <div class="rule-number">2</div>
                                <p class="rule-title">ПРАВИЛО №2</p>
                            </div>
                            <p class="rule-text">Все метки должны быть выполнены.</p>
                            <p class="rule-description">Кровавая метка — это священный контракт. Отказ невозможен.</p>
                        </div>

                        <div class="rule-item" style="animation-delay: 400ms;">
                            <div class="rule-header">
                                <div class="rule-number">3</div>
                                <p class="rule-title">ПРАВИЛО №3</p>
                            </div>
                            <p class="rule-text">Верность Высшему Столу абсолютна.</p>
                            <p class="rule-description">Высший Стол — высшая власть. Неповиновение означает отлучение.</p>
                        </div>

                        <div class="rule-item" style="animation-delay: 600ms;">
                            <div class="rule-header">
                                <div class="rule-number">4</div>
                                <p class="rule-title">ПРАВИЛО №4</p>
                            </div>
                            <p class="rule-text">Честь среди убийц должна соблюдаться.</p>
                            <p class="rule-description">Даже в мире наемников существуют кодексы чести и уважения.</p>
                        </div>
                    </div>

                    <div class="rules-divider"></div>

                    <div class="rules-lore">
                        <div style="display: flex; justify-content: center; margin-bottom: 24px;">
                            <svg class="rules-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>

                        <p class="rules-quote">
                            «В мире убийц существует порядок. Континенталь — это островок цивилизации 
                            в океане хаоса. Здесь правила абсолютны, а последствия их нарушения — 
                            неотвратимы.»
                        </p>

                        <div style="padding-top: 24px;">
                            <p class="rules-signature">— УПРАВЛЯЮЩИЙ КОНТИНЕНТАЛЯ</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

    this.rulesSection.innerHTML = rulesHTML;
  }
}

// Инициализация Rules Access
let rulesAccess;
document.addEventListener("DOMContentLoaded", () => {
  rulesAccess = new RulesAccess();
});
