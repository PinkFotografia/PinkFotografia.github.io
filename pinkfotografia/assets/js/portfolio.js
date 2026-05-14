// ===== DATOS DE ÁLBUMES POR CATEGORÍA =====
// Fernanda puede editar este archivo para agregar/quitar álbumes y fotos
const ALBUMS = {
  estudio: [
    {
      id: 'est-01', nombre: 'Amelie · 6 años', fecha: '2024', fotos: [
        '../assets/img/port-04.jpg',
        '../assets/img/port-05.jpg',
        '../assets/img/port-12.jpg',
        '../assets/img/port-14.jpg',
        '../assets/img/port-26.jpg',
      ]
    },
    {
      id: 'est-02', nombre: 'Bebé dinosaurio · 1 año', fecha: '2024', fotos: [
        '../assets/img/port-05.jpg',
        '../assets/img/port-12.jpg',
        '../assets/img/port-26.jpg',
      ]
    },
  ],
  exterior: [
    {
      id: 'ext-01', nombre: 'Sesión otoño · Niño con hojas', fecha: '2024', fotos: [
        '../assets/img/port-01.jpg',
        '../assets/img/port-06.jpg',
        '../assets/img/port-09.jpg',
      ]
    },
    {
      id: 'ext-02', nombre: 'Familia en la playa', fecha: '2024', fotos: [
        '../assets/img/port-02.jpg',
        '../assets/img/port-08.jpg',
        '../assets/img/port-19.jpg',
      ]
    },
    {
      id: 'ext-03', nombre: 'Nicolás · 2 años', fecha: '2024', fotos: [
        '../assets/img/port-07.jpg',
        '../assets/img/port-10.jpg',
        '../assets/img/port-18.jpg',
      ]
    },
  ],
  embarazadas: [
    {
      id: 'emb-01', nombre: 'Familia embarazo playa', fecha: '2024', fotos: [
        '../assets/img/port-03.jpg',
        '../assets/img/port-21.jpg',
        '../assets/img/port-27.jpg',
        '../assets/img/port-28.jpg',
      ]
    },
    {
      id: 'emb-02', nombre: 'Sesión maternidad estudio', fecha: '2024', fotos: [
        '../assets/img/port-23.jpg',
        '../assets/img/port-27.jpg',
      ]
    },
  ],
  pelotero: [
    {
      id: 'pel-01', nombre: 'Fiesta 15 años neon', fecha: '2024', fotos: [
        '../assets/img/port-25.jpg',
        '../assets/img/port-16.jpg',
      ]
    },
  ],
  casamientos: [
    {
      id: 'cas-01', nombre: 'Casamiento · Flores', fecha: '2024', fotos: [
        '../assets/img/port-17.jpg',
        '../assets/img/port-22.jpg',
      ]
    },
    {
      id: 'cas-02', nombre: 'Sesión 15 años · Caballo', fecha: '2024', fotos: [
        '../assets/img/port-11.jpg',
        '../assets/img/port-13.jpg',
        '../assets/img/port-15.jpg',
      ]
    },
  ],
  comuniones: [
    {
      id: 'com-01', nombre: 'Comunión · Iglesia', fecha: '2024', fotos: [
        '../assets/img/port-24.jpg',
      ]
    },
  ],
};

const CATS = {
  estudio:     { label_es: 'Estudio', label_en: 'Studio' },
  exterior:    { label_es: 'Exterior', label_en: 'Outdoor' },
  embarazadas: { label_es: 'Embarazadas', label_en: 'Maternity' },
  pelotero:    { label_es: 'Pelotero', label_en: 'Kids Party' },
  casamientos: { label_es: 'Casamientos', label_en: 'Weddings' },
  comuniones:  { label_es: 'Comuniones', label_en: 'Communions' },
};

let isES = true;
let slideshowOpen = false;
let slideshowIndex = 0;
let slideshowPhotos = [];

// Detectar categoría actual desde el nombre del archivo HTML
function getCurrentCat() {
  const path = window.location.pathname;
  const file = path.split('/').pop().replace('.html', '');
  return file;
}

// Renderizar lista de álbumes
function renderAlbums() {
  const cat = getCurrentCat();
  const albums = ALBUMS[cat] || [];
  const container = document.getElementById('albums-container');
  if (!container) return;

  container.innerHTML = albums.map((album, i) => {
    const cover = album.fotos[0];
    return `
    <div class="album-card reveal" style="transition-delay:${i * 0.1}s" onclick="openAlbum('${album.id}')">
      <div class="album-cover">
        <img src="${cover}" alt="${album.nombre}" loading="lazy">
        <div class="album-overlay">
          <div class="album-count">${album.fotos.length} fotos</div>
        </div>
      </div>
      <div class="album-info">
        <div class="album-nombre">${album.nombre}</div>
        <div class="album-fecha">${album.fecha}</div>
      </div>
    </div>`;
  }).join('');

  initReveal();
}

// Abrir álbum → mostrar fotos en masonry
function openAlbum(albumId) {
  const cat = getCurrentCat();
  const album = (ALBUMS[cat] || []).find(a => a.id === albumId);
  if (!album) return;

  const container = document.getElementById('albums-container');
  const photosSection = document.getElementById('photos-section');
  const albumTitle = document.getElementById('album-title');
  const albumBack = document.getElementById('album-back');
  const photoGrid = document.getElementById('photo-grid');

  container.style.display = 'none';
  photosSection.style.display = 'block';
  albumTitle.textContent = album.nombre;
  slideshowPhotos = album.fotos;

  const rots = [-3, 2, -1.5, 3, -2, 1, -3.5, 2.5];
  photoGrid.innerHTML = album.fotos.map((foto, i) => {
    const isPol = i % 5 === 2;
    const rot = isPol ? rots[i % rots.length] * 0.6 : rots[i % rots.length];
    return `
    <div class="port-item ${isPol ? 'is-polaroid' : ''}"
         style="transform:rotate(${rot}deg)"
         onclick="openSlideshow(${i})">
      <div class="port-frame">
        <img class="port-photo" src="${foto}" alt="${album.nombre}" loading="lazy">
        <div class="port-overlay"><div class="port-overlay-icon">🔍</div></div>
        ${isPol ? `<div class="port-cap">${album.nombre}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  initReveal();
}

function backToAlbums() {
  document.getElementById('albums-container').style.display = 'grid';
  document.getElementById('photos-section').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Slideshow
function openSlideshow(i) {
  slideshowIndex = i;
  document.getElementById('slideshow').classList.add('open');
  document.body.style.overflow = 'hidden';
  showSlide();
}

function showSlide() {
  document.getElementById('ss-img').src = slideshowPhotos[slideshowIndex];
  document.getElementById('ss-counter').textContent = `${slideshowIndex + 1} / ${slideshowPhotos.length}`;
}

function navSlide(dir) {
  slideshowIndex = (slideshowIndex + dir + slideshowPhotos.length) % slideshowPhotos.length;
  showSlide();
}

function closeSlideshow() {
  document.getElementById('slideshow').classList.remove('open');
  document.body.style.overflow = '';
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

function toggleLang() {
  isES = !isES;
  document.getElementById('lang-btn').textContent = isES ? 'EN' : 'ES';
  document.querySelectorAll('[data-es]').forEach(el => {
    el.innerHTML = isES ? el.dataset.es : el.dataset.en;
  });
}

function initNav() {
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderAlbums();

  // Slideshow keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSlideshow();
    if (e.key === 'ArrowRight') navSlide(1);
    if (e.key === 'ArrowLeft') navSlide(-1);
  });

  document.getElementById('slideshow').addEventListener('click', e => {
    if (e.target === document.getElementById('slideshow')) closeSlideshow();
  });
});
