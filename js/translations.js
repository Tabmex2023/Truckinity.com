const translations = {
  de: {
    hero_title: "Von Fahrer zu Fahrer",
    hero_subtitle: "Die digitale Community für Trucker",
    cta_button: "Jetzt starten",
    login: "Login",
    register: "Mitglied werden",
    problem_title: "Die Probleme",
    solution_title: "Die Lösung"
  },

  en: {
    hero_title: "From Driver to Driver",
    hero_subtitle: "The Digital Community for Truckers",
    cta_button: "Get Started",
    login: "Login",
    register: "Join Now",
    problem_title: "The Problems",
    solution_title: "The Solution"
  },

  ru: {
    hero_title: "От водителя к водителю",
    hero_subtitle: "Цифровое сообщество для дальнобойщиков",
    cta_button: "Начать",
    login: "Войти",
    register: "Стать участником",
    problem_title: "Проблемы",
    solution_title: "Решение"
  }
};

function setLanguage(lang) {
  localStorage.setItem("language", lang);

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const savedLanguage = localStorage.getItem("language") || "de";
  setLanguage(savedLanguage);
});
