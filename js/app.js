import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // Firebase Config
  // ========================
  const firebaseConfig = {
    apiKey: "AIzaSyD2RHKOn6gaQmQ-AqJTvD2E5vsLp9z54h0",
    authDomain: "truckinity.firebaseapp.com",
    projectId: "truckinity",
    storageBucket: "truckinity.firebasestorage.app",
    messagingSenderId: "150787942012",
    appId: "1:150787942012:web:47214cfb6f3fb1c66c0bf9",
    measurementId: "G-P2S4B6N6PR"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // ========================
  // DOM Elemente
  // ========================
  const loginBtn = document.getElementById('loginBtn');
  const authModal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const switchMode = document.getElementById('switchMode');
  const modalTitle = document.getElementById('modalTitle');
  const authForm = document.getElementById('authForm');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');
  const authSubmit = document.getElementById('authSubmit');
  const authError = document.getElementById('authError');
  const joinBtn = document.getElementById('joinBtn');

  const currentLangEl = document.getElementById('currentLanguage');
  const langMenu = document.getElementById('langMenu');

  let isLogin = true;
  let currentLang = 'de'; // default

  // ========================
  // i18n Texte
  // ========================
  const i18n = {
    de: {
      hero_title: "Truckinity – Fahrer vereint",
      hero_subtitle: "Finde sichere und kostenlose Parkplätze entlang deiner Route.",
      hero_button: "Jetzt beitreten",
      feature1_title: "Frei Parken",
      feature1_text: "Sicher parken ohne Gebühren in ganz Europa.",
      feature2_title: "Community",
      feature2_text: "Tausche dich mit anderen LKW-Fahrern aus.",
      feature3_title: "Routenplaner",
      feature3_text: "Plane deine Route mit freien Parkplätzen entlang des Weges."
    },
    en: {
      hero_title: "Truckinity – Drivers United",
      hero_subtitle: "Find safe and free parking along your route.",
      hero_button: "Join Now",
      feature1_title: "Free Parking",
      feature1_text: "Park safely without fees across Europe.",
      feature2_title: "Community",
      feature2_text: "Connect with other truck drivers.",
      feature3_title: "Route Planner",
      feature3_text: "Plan your route with free parking along the way."
    },
    ru: {
      hero_title: "Truckinity – Водители вместе",
      hero_subtitle: "Находите безопасную и бесплатную парковку по маршруту.",
      hero_button: "Присоединиться",
      feature1_title: "Бесплатная парковка",
      feature1_text: "Паркуйтесь безопасно без оплаты по всей Европе.",
      feature2_title: "Сообщество",
      feature2_text: "Общайтесь с другими водителями.",
      feature3_title: "Планировщик маршрута",
      feature3_text: "Планируйте маршрут с бесплатной парковкой по пути."
    }
  };

  // ========================
  // Sprache setzen
  // ========================
  function setLanguage(lang){
    currentLang = lang;
    currentLangEl.textContent = lang === 'de' ? "🌍 Deutsch" : (lang === 'en' ? "🌍 English" : "🌍 Русский");
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = i18n[lang][key];
    });
    langMenu.style.display = 'none';
  }

  currentLangEl.addEventListener('click', () => {
    langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
  });

  langMenu.querySelectorAll('div[data-lang]').forEach(item => {
    item.addEventListener('click', e => setLanguage(e.target.getAttribute('data-lang')));
  });

  setLanguage(currentLang);

  // ========================
  // Modal Login/Register
  // ========================
  loginBtn.addEventListener('click', () => authModal.style.display = 'block');
  closeModal.addEventListener('click', () => authModal.style.display = 'none');
  window.addEventListener('click', e => { if(e.target === authModal) authModal.style.display = 'none'; });

  switchMode.addEventListener('click', () => {
    isLogin = !isLogin;
    modalTitle.textContent = isLogin ? 'Login' : 'Registrieren';
    authSubmit.textContent = isLogin ? 'Login' : 'Registrieren';
    switchMode.textContent = isLogin ? 'Registrieren' : 'Login';
  });

  // ========================
  // Join Button = Registrieren
  // ========================
  joinBtn.addEventListener('click', () => {
    isLogin = false;
    modalTitle.textContent = 'Registrieren';
    authSubmit.textContent = 'Registrieren';
    switchMode.textContent = 'Login';
    authModal.style.display = 'block';
  });

  // ========================
  // Auth Formular
  // ========================
  authForm.addEventListener('submit', e => {
    e.preventDefault();
    authError.textContent = '';
    const email = authEmail.value;
    const password = authPassword.value;

    if(isLogin){
      signInWithEmailAndPassword(auth,email,password)
      .then(u => { authModal.style.display='none'; authForm.reset(); setLanguage(currentLang); })
      .catch(err => authError.textContent = err.message);
    } else {
      createUserWithEmailAndPassword(auth,email,password)
      .then(u => { authModal.style.display='none'; authForm.reset(); setLanguage(currentLang); })
      .catch(err => authError.textContent = err.message);
    }
  });

  // ========================
  // Auth State
  // ========================
  onAuthStateChanged(auth,user => {
    if(user){
      loginBtn.textContent = 'Logout';
      loginBtn.onclick = () => {
        signOut(auth).then(()=>{ loginBtn.textContent='Login'; });
      };
    } else {
      loginBtn.textContent = 'Login';
      loginBtn.onclick = () => authModal.style.display='block';
    }
  });

});
