let translations = {};

async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    translations = await response.json();
    applyTranslations();
    localStorage.setItem("language", lang);
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[key];
    });
}

function setLanguage(lang) {
    loadLanguage(lang);
}

window.onload = () => {
    const savedLang = localStorage.getItem("language") || "de";
    loadLanguage(savedLang);
};
