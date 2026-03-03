/* =============================================
   PokeVault — Main Script
   ============================================= */

/* ----- Navbar scroll effect ----- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ----- Mobile burger menu ----- */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
const navBtn = document.querySelector('.btn--nav');

burger.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '80px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(15,15,26,0.98)';
  navLinks.style.backdropFilter = 'blur(20px)';
  navLinks.style.padding = '24px';
  navLinks.style.gap = '20px';
  navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
  burger.setAttribute('aria-expanded', String(!isOpen));
});

/* Close nav on link click (mobile) */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = 'none';
    }
  });
});

/* ----- Intersection Observer — Reveal animations ----- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ----- Animated stat counters ----- */
function animateCounter(el, target, duration = 1800) {
  const isFloat = String(target).includes('.');
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);

    el.textContent = isFloat
      ? value.toFixed(1)
      : value.toLocaleString('fr-FR');

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isFloat
      ? String(target)
      : Number(target).toLocaleString('fr-FR');
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.dataset.target);
        animateCounter(el, target);
        statObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.hero__stat-num').forEach(el => statObserver.observe(el));

/* ----- Card 3D tilt effect ----- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 12;
    const rotX = -((y - cy) / cy) * 12;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ----- Collection filter ----- */
const filterBtns = document.querySelectorAll('.filter-btn');
const pokeCards = document.querySelectorAll('.poke-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const filter = btn.dataset.filter;

    pokeCards.forEach(card => {
      const categories = card.dataset.category || '';
      const show = filter === 'all' || categories.includes(filter);

      if (show) {
        card.classList.remove('hidden');
        // Re-trigger entrance animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 10);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ----- CTA Form submission ----- */
const ctaForm = document.getElementById('ctaForm');
const toast = document.getElementById('toast');

function showToast(message, duration = 3500) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

ctaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = ctaForm.querySelector('input[type="email"]');
  const email = input.value.trim();

  if (!email) return;

  const btn = ctaForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Inscription...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    input.value = '';
    showToast('Bienvenue dans la communauté PokeVault !');
  }, 1000);
});

/* ----- Smooth hover on poke-card btns ----- */
document.querySelectorAll('.poke-card__btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.poke-card');
    const name = card.querySelector('.poke-card__name').textContent;
    showToast(`Consultation de : ${name}`);
  });
});

/* ----- Parallax on hero orbs ----- */
window.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const dx = (e.clientX / innerWidth - 0.5) * 30;
  const dy = (e.clientY / innerHeight - 0.5) * 30;

  const orbs = document.querySelectorAll('.hero__orb');
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});

/* ----- Nav active link on scroll ----- */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--yellow)';
    }
  });
}, { passive: true });

/* ----- Initial reveal for cards already in viewport ----- */
window.addEventListener('load', () => {
  document.querySelectorAll('.poke-card').forEach(card => {
    card.classList.add('visible');
  });
});
