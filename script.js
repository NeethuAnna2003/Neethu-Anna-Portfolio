/* ============================================================
   PORTFOLIO JAVASCRIPT
   - Navbar scroll effect
   - Mobile menu toggle
   - Typed text animation
   - Scroll reveal animations
   - Active nav link highlighting
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL ───────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ─── HAMBURGER / MOBILE MENU ─────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ─── TYPED TEXT ANIMATION ────────────────────────────────
  const phrases = [
    'AI-powered tools.',
    'intelligent systems.',
    'full-stack apps.',
    'NLP solutions.',
    'data-driven products.',
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let pauseTimer  = null;
  const typedEl   = document.getElementById('typed-text');

  function typeEffect() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    typedEl.textContent = current.slice(0, charIndex);

    let speed = isDeleting ? 55 : 90;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing – pause then delete
      pauseTimer = setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1800);
      return;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting – move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }
    setTimeout(typeEffect, speed);
  }
  setTimeout(typeEffect, 800);

  // ─── SCROLL REVEAL ───────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings inside the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 100;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── ACTIVE NAV LINK HIGHLIGHTING ───────────────────────
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--violet-light)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

  // ─── SMOOTH HOVER TILT ON PROJECT CARDS ─────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (-y / rect.height) * 6;
      const rotY = (x / rect.width) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── COUNTER ANIMATION ───────────────────────────────────
  function animateCounter(el, target, suffix, decimals = 0) {
    let start = 0;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = decimals > 0 ? value.toFixed(decimals) + suffix : Math.floor(value) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = [
          { id: 'about-stat-cgpa',     val: 8.10, suffix: '',  dec: 2 },
          { id: 'about-stat-projects', val: 3,    suffix: '+', dec: 0 },
          { id: 'about-stat-skills',   val: 15,   suffix: '+', dec: 0 },
        ];
        counters.forEach(c => {
          const el = document.querySelector(`#${c.id} .stat-number`);
          if (el) animateCounter(el, c.val, c.suffix, c.dec);
        });
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('about');
  if (statsSection) statObserver.observe(statsSection);

  // ─── PARTICLE EFFECT ON HERO ─────────────────────────────
  (function createParticles() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(139,92,246,${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 6}s ease-in-out ${Math.random() * 5}s infinite;
        pointer-events: none;
      `;
      heroBg.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        25% { transform: translateY(-30px) translateX(15px); opacity: 0.8; }
        50% { transform: translateY(-15px) translateX(-10px); opacity: 0.5; }
        75% { transform: translateY(-40px) translateX(5px); opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  })();

});
