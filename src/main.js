// Scroll Progress Bar
class ScrollProgressBar {
  constructor() {
    this.scrollBar = document.getElementById('scrollBar');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.updateProgress());
  }

  updateProgress() {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    this.scrollBar.style.width = scrolled + '%';
  }
}

// Scroll Reveal with Intersection Observer
class ScrollReveal {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.revealElements.forEach(el => observer.observe(el));
  }
}

// Parallax Effect
class ParallaxHandler {
  constructor() {
    this.parallaxEmoji = document.getElementById('parallaxEmoji');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.updateParallax());
  }

  updateParallax() {
    if (!this.parallaxEmoji) return;
    const scrolled = window.scrollY;
    this.parallaxEmoji.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
}

// Mobile Menu Manager
class MobileMenuManager {
  constructor() {
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileMenu = document.getElementById('mobileMenu');

    this.init();
  }

  init() {
    this.mobileMenuBtn.addEventListener('click', () => this.toggle());

    const links = this.mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => this.close());
    });
  }

  toggle() {
    this.mobileMenu.classList.toggle('hidden');
  }

  close() {
    this.mobileMenu.classList.add('hidden');
  }
}

// Smooth Scroll Handler
class SmoothScrollHandler {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

// Update year in footer
function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
}

// Theme Toggler
class ThemeToggler {
  constructor() {
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.init();
  }

  init() {
    // localStorage에서 저장된 테마 로드, 없으면 'dark' 기본값
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.applyTheme(savedTheme);

    this.themeToggleBtn.addEventListener('click', () => this.toggle());
  }

  toggle() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  applyTheme(theme) {
    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      htmlElement.classList.remove('light');
      this.themeToggleBtn.textContent = '☀️';
    } else {
      htmlElement.classList.add('light');
      this.themeToggleBtn.textContent = '🌙';
    }

    localStorage.setItem('theme', theme);
  }
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggler();
  new ScrollProgressBar();
  new ScrollReveal();
  new ParallaxHandler();
  new MobileMenuManager();
  new SmoothScrollHandler();
  updateYear();
});

// Hot Module Replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
}
