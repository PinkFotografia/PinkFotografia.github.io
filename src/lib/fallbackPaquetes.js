// Contenido hardcodeado de los paquetes.
// Se muestra cuando la tabla `paquetes` de Supabase está vacía para esa categoría.
// Editable desde el panel de administración.

const i = (es, en) => ({ es, en }) // helper

export const FALLBACK_PAQUETES = {
  estudio: [
    {
      id: 'f-est-1', nombre: 'Básico', precio: null, featured: false, orden: 1,
      items: [i('1 hora en estudio','1 hour studio'), i('Hasta 2 personas','Up to 2 people'), i('15 fotos editadas','15 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download')],
    },
    {
      id: 'f-est-2', nombre: 'Completo', precio: null, featured: true, orden: 2,
      items: [i('2 horas en estudio','2 hours studio'), i('Familia completa','Full family'), i('30 fotos editadas','30 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('Cambio de vestuario','Outfit change')],
    },
    {
      id: 'f-est-3', nombre: 'Premium', precio: null, featured: false, orden: 3,
      items: [i('3 horas en estudio','3 hours studio'), i('Familia completa','Full family'), i('50 fotos editadas','50 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('Cambio de vestuario','Outfit change'), i('Props incluidos','Props included')],
    },
  ],

  exterior: [
    {
      id: 'f-ext-1', nombre: 'Básico', precio: null, featured: false, orden: 1,
      items: [i('1 hora exterior','1 hour outdoor'), i('Hasta 3 personas','Up to 3 people'), i('20 fotos editadas','20 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download')],
    },
    {
      id: 'f-ext-2', nombre: 'Completo', precio: null, featured: true, orden: 2,
      items: [i('2 horas exterior','2 hours outdoor'), i('Familia completa','Full family'), i('35 fotos editadas','35 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('Elección de locación','Location selection')],
    },
    {
      id: 'f-ext-3', nombre: 'Premium', precio: null, featured: false, orden: 3,
      items: [i('3 horas exterior','3 hours outdoor'), i('Familia completa','Full family'), i('50 fotos editadas','50 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('2 locaciones distintas','2 locations')],
    },
  ],

  embarazadas: [
    {
      id: 'f-emb-1', nombre: 'Esencial', precio: null, featured: false, orden: 1,
      items: [i('1 hora de sesión','1 hour session'), i('Pareja o individual','Couple or individual'), i('20 fotos editadas','20 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download')],
    },
    {
      id: 'f-emb-2', nombre: 'Especial', precio: null, featured: true, orden: 2,
      items: [i('2 horas de sesión','2 hour session'), i('Familia completa','Full family'), i('35 fotos editadas','35 edited photos'), i('Estudio + exterior','Studio + outdoor'), i('Galería digital','Digital gallery'), i('Props y vestuario','Props & wardrobe')],
    },
  ],

  pelotero: [
    {
      id: 'f-pel-1', nombre: 'Básico', precio: null, featured: false, orden: 1,
      items: [i('2 horas cobertura','2 hours coverage'), i('30 fotos editadas','30 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download')],
    },
    {
      id: 'f-pel-2', nombre: 'Completo', precio: null, featured: true, orden: 2,
      items: [i('3 horas cobertura','3 hours coverage'), i('60 fotos editadas','60 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('Fotos de detalles y decoración','Detail & decoration shots')],
    },
  ],

  casamientos: [
    {
      id: 'f-cas-1', nombre: 'Civil', precio: null, featured: false, orden: 1,
      items: [i('Cobertura civil','Civil ceremony coverage'), i('2 horas','2 hours'), i('50 fotos editadas','50 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download')],
    },
    {
      id: 'f-cas-2', nombre: 'Completo', precio: null, featured: true, orden: 2,
      items: [i('Cobertura completa','Full coverage'), i('6 horas','6 hours'), i('150 fotos editadas','150 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('Sesión de pareja','Couple session')],
    },
    {
      id: 'f-cas-3', nombre: 'Premium', precio: null, featured: false, orden: 3,
      items: [i('Cobertura completa','Full coverage'), i('8 horas','8 hours'), i('200+ fotos editadas','200+ edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('Sesión de pareja','Couple session'), i('Video highlights','Video highlights')],
    },
  ],

  comuniones: [
    {
      id: 'f-com-1', nombre: 'Básico', precio: null, featured: false, orden: 1,
      items: [i('Cobertura ceremonia','Ceremony coverage'), i('2 horas','2 hours'), i('30 fotos editadas','30 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download')],
    },
    {
      id: 'f-com-2', nombre: 'Completo', precio: null, featured: true, orden: 2,
      items: [i('Ceremonia + sesión previa','Ceremony + pre-session'), i('3 horas','3 hours'), i('60 fotos editadas','60 edited photos'), i('Galería digital','Digital gallery'), i('Descarga alta resolución','High res download'), i('Sesión estudio o exterior','Studio or outdoor session')],
    },
  ],
}
