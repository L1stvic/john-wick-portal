// Утилиты для проекта
class JohnWickUtils {
  // Генерация случайной задержки анимации
  static getRandomDelay(min = 0, max = 300) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Проверка на мобильное устройство
  static isMobile() {
    return window.innerWidth <= 768;
  }

  // Плавная прокрутка к элементу
  static scrollToElement(element, offset = 0) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  // Форматирование текста для отображения
  static formatText(text, type = "normal") {
    const formats = {
      title: (text) => text.toUpperCase(),
      subtitle: (text) => text,
      normal: (text) => text,
    };

    return formats[type](text);
  }

  // Создание элемента с атрибутами
  static createElement(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);

    Object.keys(attributes).forEach((key) => {
      if (key === "className") {
        element.className = attributes[key];
      } else if (key === "dataset") {
        Object.keys(attributes[key]).forEach((dataKey) => {
          element.dataset[dataKey] = attributes[key][dataKey];
        });
      } else {
        element.setAttribute(key, attributes[key]);
      }
    });

    if (typeof content === "string") {
      element.innerHTML = content;
    } else if (Array.isArray(content)) {
      content.forEach((child) => {
        if (typeof child === "string") {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    }

    return element;
  }

  // Добавление множественных обработчиков событий
  static addMultipleEventListeners(element, events, handler) {
    events.forEach((event) => {
      element.addEventListener(event, handler);
    });
  }

  // Предотвращение частых вызовов функции (debounce)
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Экспорт для использования в других модулях
if (typeof module !== "undefined" && module.exports) {
  module.exports = JohnWickUtils;
}
