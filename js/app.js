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
function toggleLangMenu() {
    const menu = document.getElementById("langMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function setLanguage(lang) {
    loadLanguage(lang);

    const languageNames = {
        de: "Deutsch",
        en: "English",
        ru: "Русский"
    };

    document.getElementById("currentLanguage").textContent = languageNames[lang];

    document.getElementById("langMenu").style.display = "none";
}
