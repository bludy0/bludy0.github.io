// Menü kapatma
function closeMenu() {
  var menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.checked = false;
  }
}

// Language switching system
function getCurrentLanguage() {
  try {
    var savedLanguage = localStorage.getItem('site-language');
    return savedLanguage === 'en' || savedLanguage === 'tr' ? savedLanguage : 'tr';
  } catch (error) {
    return 'tr';
  }
}

function setLanguage(lang) {
  var nextLanguage = lang === 'en' ? 'en' : 'tr';

  try {
    localStorage.setItem('site-language', nextLanguage);
  } catch (error) {
    // The language switch still works when browser storage is unavailable.
  }

  document.documentElement.lang = nextLanguage;
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.checked = nextLanguage === 'en';
    langToggle.setAttribute(
      'aria-label',
      nextLanguage === 'tr' ? 'Switch language to English' : 'Dili Türkçeye çevir'
    );
  }

  // Update all data-tr and data-en elements
  document.querySelectorAll('[data-tr][data-en]').forEach(function(el) {
    el.textContent = nextLanguage === 'tr' ? el.dataset.tr : el.dataset.en;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize language
  var currentLang = getCurrentLanguage();
  setLanguage(currentLang);
  
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('change', function() {
      setLanguage(this.checked ? 'en' : 'tr');
    });
  }

  var sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    sections.forEach(function(s) { observer.observe(s); });
  } else {
    sections.forEach(function(s) { s.classList.add('visible'); });
  }

  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
});
