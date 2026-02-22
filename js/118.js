function setLanguage(lang) {
  localStorage.setItem("language", lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.innerText = translations[lang][key];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || navigator.language.slice(0,2) || "de";
  const finalLang = ["de","en","ru"].includes(savedLang) ? savedLang : "de";
  applyLanguage(finalLang);
});
