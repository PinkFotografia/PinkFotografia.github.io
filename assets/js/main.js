// ===== PORTFOLIO DATA =====
const PORTFOLIO = [
  { src: 'assets/img/port-01.jpg', cat: 'Exterior', label: 'Niño con hojas', rot: -3 },
  { src: 'assets/img/port-02.jpg', cat: 'Exterior', label: 'Familia en la playa', rot: 2 },
  { src: 'assets/img/port-03.jpg', cat: 'Embarazadas', label: 'Familia embarazo playa', rot: -1.5 },
  { src: 'assets/img/port-04.jpg', cat: 'Estudio', label: 'Detrás de escena', rot: 3 },
  { src: 'assets/img/port-05.jpg', cat: 'Estudio', label: 'Cumpleaños estudio', rot: -2 },
  { src: 'assets/img/port-06.jpg', cat: 'Exterior', label: 'Niño con osito', rot: 1 },
  { src: 'assets/img/port-07.jpg', cat: 'Exterior', label: 'Niño en bici', rot: -3.5 },
  { src: 'assets/img/port-08.jpg', cat: 'Exterior', label: 'Niña en la playa', rot: 2.5 },
  { src: 'assets/img/port-09.jpg', cat: 'Exterior', label: 'Niño diente de león', rot: -1 },
  { src: 'assets/img/port-10.jpg', cat: 'Exterior', label: 'Niño moto', rot: 3 },
  { src: 'assets/img/port-11.jpg', cat: 'Casamientos', label: 'Sesión 15 años caballo', rot: -2.5 },
  { src: 'assets/img/port-12.jpg', cat: 'Estudio', label: 'Bebé smash cake', rot: 1.5 },
  { src: 'assets/img/port-13.jpg', cat: 'Casamientos', label: 'Sesión 15 años guitarra', rot: -3 },
  { src: 'assets/img/port-14.jpg', cat: 'Estudio', label: 'Bebé smash cake 2', rot: 2 },
  { src: 'assets/img/port-15.jpg', cat: 'Casamientos', label: 'Sesión 15 años bosque', rot: -1.5 },
  { src: 'assets/img/port-16.jpg', cat: 'Pelotero', label: 'Niño en pelotero', rot: 3 },
  { src: 'assets/img/port-17.jpg', cat: 'Casamientos', label: 'Casamiento flores', rot: -2 },
  { src: 'assets/img/port-18.jpg', cat: 'Exterior', label: 'Niño en bici racing', rot: 1 },
  { src: 'assets/img/port-19.jpg', cat: 'Exterior', label: 'Niña brazos abiertos', rot: -3.5 },
  { src: 'assets/img/port-20.jpg', cat: 'Estudio', label: 'Fernanda en acción', rot: 2.5 },
  { src: 'assets/img/port-21.jpg', cat: 'Embarazadas', label: 'Embarazada playa', rot: -1 },
  { src: 'assets/img/port-22.jpg', cat: 'Casamientos', label: 'Anillo casamiento', rot: 3 },
  { src: 'assets/img/port-23.jpg', cat: 'Embarazadas', label: 'Familia embarazo estudio', rot: -2.5 },
  { src: 'assets/img/port-24.jpg', cat: 'Comuniones', label: 'Comunión iglesia', rot: 1.5 },
  { src: 'assets/img/port-25.jpg', cat: 'Pelotero', label: 'Fiesta 15 años', rot: -3 },
  { src: 'assets/img/port-26.jpg', cat: 'Estudio', label: 'Sesión estudio', rot: 2 },
  { src: 'assets/img/port-27.jpg', cat: 'Embarazadas', label: 'Embarazada exterior', rot: -1.5 },
  { src: 'assets/img/port-28.jpg', cat: 'Embarazadas', label: 'Silueta atardecer', rot: 3 },
  { src: 'assets/img/port-29.jpg', cat: 'Casamientos', label: 'Fernanda fotógrafa', rot: -2 },
];

const CATS_EN = {
  'Todos': 'All', 'Estudio': 'Studio', 'Exterior': 'Outdoor',
  'Embarazadas': 'Maternity', 'Pelotero': 'Kids Party',
  'Casamientos': 'Weddings', 'Comuniones': 'Communions'
};

let isES = true;
let activeCat = 'Todos';
let lightboxIndex = 0;
let visibleItems = [];

// ===== PORTFOLIO =====
function renderPortfolio() {
  const grid = document.getElementById('port-grid');
  const filters = document.getElementById('port-filters');
  const allCats = ['Todos', ...new Set(PORTFOLIO.map(p => p.cat))];

  filters.innerHTML = allCats.map(cat => {
    const label = isES ? cat : (CATS_EN[cat] || cat);
    return `<button class="port-filter-btn ${activeCat === cat ? 'active' : ''}" onclick="filterPort('${cat}')">${label}</button>`;
  }).join('');

  visibleItems = PORTFOLIO.filter(p => activeCat === 'Todos' || p.cat === activeCat);

  grid.innerHTML = visibleItems.map((p, i) => {
    const isPol = i % 5 === 2;
    const rot = isPol ? p.rot * 0.6 : p.rot;
    return `
    <div class="port-item ${isPol ? 'is-polaroid' : ''}"
         style="transform: rotate(${rot}deg);"
         onclick="openLightbox(${i})">
      <div class="port-frame">
        <img class="port-photo" src="${p.src}" alt="${p.label}" loading="lazy">
        <div class="port-overlay"><div class="port-overlay-icon">🔍</div></div>
        ${isPol ? `<div class="port-cap">${p.label}</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function filterPort(cat) {
  activeCat = cat;
  renderPortfolio();
}

// ===== LIGHTBOX =====
function openLightbox(i) {
  lightboxIndex = i;
  showLightboxItem();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem() {
  const item = visibleItems[lightboxIndex];
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-cap').textContent = item.label + ' · ' + item.cat;
}

function navLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + visibleItems.length) % visibleItems.length;
  showLightboxItem();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navLightbox(1);
    if (e.key === 'ArrowLeft') navLightbox(-1);
  });
});

// ===== HERO SLIDES =====
let cur = 0;
function initSlides() {
  const slides = document.querySelectorAll('.hero-slide');
  const inds = document.querySelectorAll('.hero-ind');

  window.goSlide = function(n) {
    slides[cur].classList.remove('active', 'zoom');
    inds[cur].classList.remove('active');
    cur = n;
    slides[cur].classList.add('active', 'zoom');
    inds[cur].classList.add('active');
  };

  let timer = setInterval(() => goSlide((cur + 1) % slides.length), 5500);
  inds.forEach((ind, i) => ind.addEventListener('click', () => {
    clearInterval(timer);
    goSlide(i);
    timer = setInterval(() => goSlide((cur + 1) % slides.length), 5500);
  }));
}

// ===== NAV =====
function initNav() {
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===== REVEAL =====
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===== IDIOMA =====
window.toggleLang = function() {
  isES = !isES;
  document.getElementById('lang-btn').textContent = isES ? 'EN' : 'ES';
  document.querySelectorAll('[data-es]').forEach(el => {
    el.innerHTML = isES ? el.dataset.es : el.dataset.en;
  });
  renderPortfolio();
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSlides();
  initNav();
  initReveal();
  renderPortfolio();
});

// ===== TOGGLE LANG (también usado en index) =====
window.toggleLang = function() {
  isES = !isES;
  document.getElementById('lang-btn').textContent = isES ? 'EN' : 'ES';
  document.querySelectorAll('[data-es]').forEach(el => {
    el.innerHTML = isES ? el.dataset.es : el.dataset.en;
  });
};
