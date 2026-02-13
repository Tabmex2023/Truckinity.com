// ======================
// TRANSLATIONS
// ======================
const translations = {
    de: {
        hero_title: "Willkommen bei Truckinity",
        hero_subtitle: "Das internationale Netzwerk für LKW-Fahrer",
        hero_button: "Jetzt starten",
        feature1_title: "Finde Parkplätze",
        feature1_text: "Entdecke sichere und kostenlose Parkplätze entlang deiner Route.",
        feature2_title: "Community",
        feature2_text: "Verbinde dich mit anderen Fahrern und teile Tipps.",
        feature3_title: "Support",
        feature3_text: "Erhalte Hilfe und Informationen jederzeit."
    },
    en: {
        hero_title: "Welcome to Truckinity",
        hero_subtitle: "The international network for truck drivers",
        hero_button: "Get Started",
        feature1_title: "Find Parking",
        feature1_text: "Discover safe and free parking along your route.",
        feature2_title: "Community",
        feature2_text: "Connect with other drivers and share tips.",
        feature3_title: "Support",
        feature3_text: "Get help and information anytime."
    },
    ru: {
        hero_title: "Добро пожаловать в Truckinity",
        hero_subtitle: "Международная сеть для водителей грузовиков",
        hero_button: "Начать",
        feature1_title: "Найти парковку",
        feature1_text: "Найдите безопасные и бесплатные парковки вдоль вашего маршрута.",
        feature2_title: "Сообщество",
        feature2_text: "Связывайтесь с другими водителями и делитесь советами.",
        feature3_title: "Поддержка",
        feature3_text: "Получайте помощь и информацию в любое время."
    }
};

// ======================
// LANGUAGE SWITCH
// ======================
let currentLang = localStorage.getItem('lang') || 'de';

function setLanguage(lang){
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.getElementById('currentLanguage').textContent = {
        de: "Deutsch",
        en: "English",
        ru: "Русский"
    }[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || key;
    });
}

function toggleLangMenu(){
    document.getElementById('langMenu').classList.toggle('show');
}

// Initialize on page load
setLanguage(currentLang);

// ======================
// FIREBASE LOGIN
// ======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase Config
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

// MODAL ELEMENTS
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');
const switchMode = document.getElementById('switchMode');
const modalTitle = document.getElementById('modalTitle');
const authSubmit = document.getElementById('authSubmit');
const authForm = document.getElementById('authForm');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authError = document.getElementById('authError');
let isLogin = true;

// Öffnen/Schließen Modal
loginBtn.onclick = () => authModal.style.display = 'block';
closeModal.onclick = () => authModal.style.display = 'none';
window.onclick = (e) => { if(e.target === authModal) authModal.style.display = 'none'; };

// Modus wechseln
switchMode.onclick = () => {
    isLogin = !isLogin;
    if(isLogin){
        modalTitle.textContent = 'Login';
        authSubmit.textContent = 'Login';
        switchMode.textContent = 'Registrieren';
    } else {
        modalTitle.textContent = 'Registrieren';
        authSubmit.textContent = 'Registrieren';
        switchMode.textContent = 'Login';
    }
};

// Formular Submit
authForm.onsubmit = (e) => {
    e.preventDefault();
    authError.textContent = '';
    const email = authEmail.value;
    const password = authPassword.value;

    if(isLogin){
        signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                authModal.style.display = 'none';
                authForm.reset();
                // Nach Login auf aktuelle Sprache weiterleiten
                setLanguage(currentLang);
            })
            .catch(err => authError.textContent = err.message);
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then(user => {
                authModal.style.display = 'none';
                authForm.reset();
                setLanguage(currentLang);
            })
            .catch(err => authError.textContent = err.message);
    }
};

// Auth State beobachten
onAuthStateChanged(auth, (user) => {
    if(user){
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = () => signOut(auth).then(() => { loginBtn.textContent='Login'; });
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = () => authModal.style.display='block';
    }
});
