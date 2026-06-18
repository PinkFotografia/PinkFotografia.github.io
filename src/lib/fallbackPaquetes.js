const i = es => ({ es })

const notaFamiliar = 'Familiar adicional: +$15.000 por persona a partir del 4to'
const adMakeup = [i('Servicio de maquilladora — consultar precio')]
const adPelotero = [i('30 min extra +$20.000'), i('1hs extra +$35.000'), i('Video resumen +$30.000'), i('Reel para redes +$20.000')]
const adEvento = [i('Video resumen +$80.000'), i('Reel para redes +$30.000')]
const adBoda = [i('Álbum físico fotolibro 15 pág +$230.000'), i('Video resumen +$80.000'), i('Reel +$30.000'), i('2do fotógrafo — consultar')]

export const FALLBACK_PAQUETES = {
  'pre-cumple': [
    { id:'f-pc-e1', categoria:'pre-cumple', subcategoria:'estudio', nombre:'Esencial', precio:'$110.000', featured:false, orden:1, nota:notaFamiliar, adicionales:null,
      items:[i('1hs en estudio'),i('20 fotos editadas'),i('Galería digital'),i('Hasta 3 familiares')] },
    { id:'f-pc-c1', categoria:'pre-cumple', subcategoria:'estudio', nombre:'Completo', precio:'$150.000', featured:true, orden:2, nota:notaFamiliar, adicionales:null,
      items:[i('1:30hs en estudio'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 3 familiares'),i('Foto impresa 20x30')] },
    { id:'f-pc-p1', categoria:'pre-cumple', subcategoria:'estudio', nombre:'Premium', precio:'$200.000', featured:false, orden:3, nota:notaFamiliar, adicionales:null,
      items:[i('2hs en estudio'),i('50 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 4 familiares'),i('Foto impresa 20x30'),i('Cuadro bastidor 20x30')] },
    { id:'f-pc-e2', categoria:'pre-cumple', subcategoria:'exterior', nombre:'Esencial', precio:'$150.000', featured:false, orden:1, nota:notaFamiliar, adicionales:null,
      items:[i('1hs en exterior'),i('20 fotos editadas'),i('Galería digital'),i('Hasta 3 familiares')] },
    { id:'f-pc-c2', categoria:'pre-cumple', subcategoria:'exterior', nombre:'Completo', precio:'$210.000', featured:true, orden:2, nota:notaFamiliar, adicionales:null,
      items:[i('1:30hs en exterior'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 3 familiares'),i('Foto impresa 20x30')] },
    { id:'f-pc-p2', categoria:'pre-cumple', subcategoria:'exterior', nombre:'Premium', precio:'$270.000', featured:false, orden:3, nota:notaFamiliar, adicionales:null,
      items:[i('2hs en exterior'),i('50 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 4 familiares'),i('Foto impresa 20x30'),i('Cuadro bastidor 20x30'),i('Doble locación')] },
  ],

  'cake-smash': [
    { id:'f-cs-1', categoria:'cake-smash', subcategoria:null, nombre:'Esencial', precio:'$120.000', featured:false, orden:1, nota:'La torta corre por cuenta del cliente', adicionales:null,
      items:[i('1hs de sesión'),i('20 fotos editadas'),i('Galería digital'),i('Baby bath'),i('Hasta 3 familiares')] },
    { id:'f-cs-2', categoria:'cake-smash', subcategoria:null, nombre:'Completo', precio:'$170.000', featured:true, orden:2, nota:'La torta corre por cuenta del cliente', adicionales:null,
      items:[i('1:30hs de sesión'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Baby bath'),i('Hasta 3 familiares'),i('Foto impresa 20x30')] },
    { id:'f-cs-3', categoria:'cake-smash', subcategoria:null, nombre:'Premium', precio:'$220.000', featured:false, orden:3, nota:'La torta corre por cuenta del cliente', adicionales:null,
      items:[i('2hs de sesión'),i('50 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Baby bath'),i('Hasta 4 familiares'),i('Foto impresa 20x30'),i('Cuadro bastidor 20x30')] },
  ],

  'maternidad': [
    { id:'f-mat-1', categoria:'maternidad', subcategoria:null, nombre:'Esencial', precio:'$110.000', featured:false, orden:1, nota:null, adicionales:adMakeup,
      items:[i('1hs de sesión'),i('20 fotos editadas'),i('Galería digital'),i('Estudio o exterior'),i('Hasta 3 familiares')] },
    { id:'f-mat-2', categoria:'maternidad', subcategoria:null, nombre:'Completo', precio:'$150.000', featured:true, orden:2, nota:null, adicionales:adMakeup,
      items:[i('1:30hs de sesión'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Estudio o exterior'),i('Hasta 3 familiares'),i('Foto impresa 20x30')] },
    { id:'f-mat-3', categoria:'maternidad', subcategoria:null, nombre:'Premium', precio:'$200.000', featured:false, orden:3, nota:null, adicionales:adMakeup,
      items:[i('2hs de sesión'),i('50 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Estudio o exterior'),i('Hasta 4 familiares'),i('Foto impresa 20x30'),i('Cuadro bastidor 20x30')] },
  ],

  'individual-familiar': [
    { id:'f-if-e1', categoria:'individual-familiar', subcategoria:'estudio', nombre:'Esencial', precio:'$90.000', featured:false, orden:1, nota:notaFamiliar, adicionales:null,
      items:[i('1hs en estudio'),i('20 fotos editadas'),i('Galería digital'),i('Hasta 3 familiares')] },
    { id:'f-if-c1', categoria:'individual-familiar', subcategoria:'estudio', nombre:'Completo', precio:'$140.000', featured:true, orden:2, nota:notaFamiliar, adicionales:null,
      items:[i('1:30hs en estudio'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 3 familiares'),i('Foto impresa 20x30')] },
    { id:'f-if-p1', categoria:'individual-familiar', subcategoria:'estudio', nombre:'Premium', precio:'$190.000', featured:false, orden:3, nota:notaFamiliar, adicionales:null,
      items:[i('2hs en estudio'),i('50 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 4 familiares'),i('Foto impresa 20x30'),i('Cuadro bastidor 20x30')] },
    { id:'f-if-e2', categoria:'individual-familiar', subcategoria:'exterior', nombre:'Esencial', precio:'$150.000', featured:false, orden:1, nota:notaFamiliar, adicionales:null,
      items:[i('1hs en exterior'),i('20 fotos editadas'),i('Galería digital'),i('Hasta 3 familiares')] },
    { id:'f-if-c2', categoria:'individual-familiar', subcategoria:'exterior', nombre:'Completo', precio:'$210.000', featured:true, orden:2, nota:notaFamiliar, adicionales:null,
      items:[i('1:30hs en exterior'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 3 familiares'),i('Foto impresa 20x30')] },
    { id:'f-if-p2', categoria:'individual-familiar', subcategoria:'exterior', nombre:'Premium', precio:'$270.000', featured:false, orden:3, nota:notaFamiliar, adicionales:null,
      items:[i('2hs en exterior'),i('50 fotos editadas'),i('Galería digital'),i('Cambio de vestuario'),i('Hasta 4 familiares'),i('Foto impresa 20x30'),i('Cuadro bastidor 20x30'),i('Doble locación')] },
  ],

  'profesional': [
    { id:'f-pro-e1', categoria:'profesional', subcategoria:'estudio', nombre:'Esencial', precio:'$90.000', featured:false, orden:1, nota:null, adicionales:[i('Persona adicional +$20.000')],
      items:[i('1hs en estudio'),i('20 fotos editadas'),i('Galería digital')] },
    { id:'f-pro-c1', categoria:'profesional', subcategoria:'estudio', nombre:'Completo', precio:'$140.000', featured:true, orden:2, nota:null, adicionales:[i('Persona adicional +$20.000')],
      items:[i('1:30hs en estudio'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario')] },
    { id:'f-pro-e2', categoria:'profesional', subcategoria:'exterior', nombre:'Esencial', precio:'$150.000', featured:false, orden:1, nota:null, adicionales:[i('Persona adicional +$20.000')],
      items:[i('1hs en exterior'),i('20 fotos editadas'),i('Galería digital')] },
    { id:'f-pro-c2', categoria:'profesional', subcategoria:'exterior', nombre:'Completo', precio:'$210.000', featured:true, orden:2, nota:null, adicionales:[i('Persona adicional +$20.000')],
      items:[i('1:30hs en exterior'),i('35 fotos editadas'),i('Galería digital'),i('Cambio de vestuario')] },
  ],

  'pelotero': [
    { id:'f-pel-1', categoria:'pelotero', subcategoria:null, nombre:'1:30hs', precio:'$150.000', featured:false, orden:1, nota:null, adicionales:adPelotero,
      items:[i('40 fotos editadas'),i('Galería digital')] },
    { id:'f-pel-2', categoria:'pelotero', subcategoria:null, nombre:'2hs', precio:'$200.000', featured:true, orden:2, nota:null, adicionales:adPelotero,
      items:[i('60 fotos editadas'),i('Galería digital'),i('Foto impresa grupal 20x30')] },
    { id:'f-pel-3', categoria:'pelotero', subcategoria:null, nombre:'3hs', precio:'$280.000', featured:false, orden:3, nota:null, adicionales:adPelotero,
      items:[i('90 fotos editadas'),i('Galería digital'),i('Foto impresa grupal 20x30')] },
  ],

  'evento-social': [
    { id:'f-ev-1', categoria:'evento-social', subcategoria:null, nombre:'3hs', precio:'$350.000', featured:false, orden:1, nota:null, adicionales:adEvento,
      items:[i('Galería digital')] },
    { id:'f-ev-2', categoria:'evento-social', subcategoria:null, nombre:'4hs', precio:'$450.000', featured:true, orden:2, nota:null, adicionales:adEvento,
      items:[i('Galería digital')] },
    { id:'f-ev-3', categoria:'evento-social', subcategoria:null, nombre:'5hs', precio:'$550.000', featured:false, orden:3, nota:null, adicionales:adEvento,
      items:[i('Galería digital')] },
  ],

  'baby-shower': [
    { id:'f-bs-1', categoria:'baby-shower', subcategoria:null, nombre:'1:30hs', precio:'$150.000', featured:false, orden:1, nota:null, adicionales:adPelotero,
      items:[i('Galería digital')] },
    { id:'f-bs-2', categoria:'baby-shower', subcategoria:null, nombre:'2hs', precio:'$200.000', featured:true, orden:2, nota:null, adicionales:adPelotero,
      items:[i('Galería digital')] },
    { id:'f-bs-3', categoria:'baby-shower', subcategoria:null, nombre:'3hs', precio:'$280.000', featured:false, orden:3, nota:null, adicionales:adPelotero,
      items:[i('Galería digital')] },
  ],

  'revelacion-genero': [
    { id:'f-rg-1', categoria:'revelacion-genero', subcategoria:null, nombre:'Esencial', precio:'$150.000', featured:true, orden:1, nota:null, adicionales:[i('1hs extra +$35.000')],
      items:[i('1:30hs de cobertura'),i('Interior / exterior / salón'),i('Galería digital')] },
  ],

  'casamientos': [
    { id:'f-cas-1', categoria:'casamientos', grupo:'Servicios individuales', nombre:'Civil', precio:'$200.000', featured:false, orden:1, nota:null, adicionales:null,
      items:[i('1hs de cobertura'),i('Galería digital')] },
    { id:'f-cas-2', categoria:'casamientos', grupo:'Servicios individuales', nombre:'Iglesia', precio:'$200.000', featured:false, orden:2, nota:null, adicionales:null,
      items:[i('1hs de cobertura'),i('Galería digital')] },
    { id:'f-cas-3', categoria:'casamientos', grupo:'Servicios individuales', nombre:'Fiesta', precio:'$500.000', featured:false, orden:3, nota:null, adicionales:null,
      items:[i('4hs de cobertura'),i('Galería digital')] },
    { id:'f-cas-4', categoria:'casamientos', grupo:'Servicios individuales', nombre:'Fiesta extendida', precio:'$650.000', featured:false, orden:4, nota:null, adicionales:null,
      items:[i('6hs de cobertura'),i('Galería digital')] },
    { id:'f-cas-5', categoria:'casamientos', grupo:'Servicios individuales', nombre:'Getting ready', precio:'$150.000', featured:false, orden:5, nota:null, adicionales:null, items:[] },
    { id:'f-cas-6', categoria:'casamientos', grupo:'Servicios individuales', nombre:'Book de novios', precio:'$150.000', featured:false, orden:6, nota:null, adicionales:null, items:[] },
    { id:'f-cas-7', categoria:'casamientos', grupo:'Paquetes', nombre:'Completo', precio:'$900.000', featured:true, orden:7, nota:null, adicionales:adBoda,
      items:[i('Civil o Iglesia'),i('Fiesta 4hs'),i('Getting ready'),i('Galería digital')] },
    { id:'f-cas-8', categoria:'casamientos', grupo:'Paquetes', nombre:'Premium', precio:'$1.500.000', featured:false, orden:8, nota:null, adicionales:adBoda,
      items:[i('Civil + Iglesia'),i('Fiesta 6hs'),i('Getting ready'),i('Book de novios'),i('2do fotógrafo'),i('Álbum físico'),i('Galería digital')] },
  ],

  'quince': [
    { id:'f-q-1', categoria:'quince', grupo:'Servicios individuales', nombre:'Salón 4hs', precio:'$500.000', featured:false, orden:1, nota:null, adicionales:null,
      items:[i('4hs de cobertura en salón'),i('Galería digital')] },
    { id:'f-q-2', categoria:'quince', grupo:'Servicios individuales', nombre:'Salón extendido 6hs', precio:'$650.000', featured:false, orden:2, nota:null, adicionales:null,
      items:[i('6hs de cobertura en salón'),i('Galería digital')] },
    { id:'f-q-3', categoria:'quince', grupo:'Servicios individuales', nombre:'Getting ready', precio:'$150.000', featured:false, orden:3, nota:null, adicionales:null, items:[] },
    { id:'f-q-4', categoria:'quince', grupo:'Servicios individuales', nombre:'Book previo', precio:'$150.000', featured:false, orden:4, nota:null, adicionales:null,
      items:[i('Días antes del evento')] },
    { id:'f-q-5', categoria:'quince', grupo:'Servicios individuales', nombre:'Book día del evento', precio:'$150.000', featured:false, orden:5, nota:null, adicionales:null, items:[] },
    { id:'f-q-6', categoria:'quince', grupo:'Paquetes', nombre:'Completo', precio:'$900.000', featured:true, orden:6, nota:null, adicionales:adBoda,
      items:[i('Salón 4hs'),i('Getting ready'),i('Book día del evento'),i('Galería digital')] },
    { id:'f-q-7', categoria:'quince', grupo:'Paquetes', nombre:'Premium', precio:'$1.500.000', featured:false, orden:7, nota:null, adicionales:adBoda,
      items:[i('Salón 6hs'),i('Getting ready'),i('Book previo'),i('Book día del evento'),i('2do fotógrafo'),i('Álbum físico'),i('Galería digital')] },
  ],

  'bautismo': [
    { id:'f-bau-1', categoria:'bautismo', subcategoria:null, nombre:'Esencial', precio:'$200.000', featured:false, orden:1, nota:null, adicionales:null,
      items:[i('1hs de cobertura'),i('Galería digital')] },
    { id:'f-bau-2', categoria:'bautismo', subcategoria:null, nombre:'Completo', precio:'$230.000', featured:true, orden:2, nota:null, adicionales:null,
      items:[i('1hs de cobertura'),i('Galería digital'),i('Cuadro bastidor 20x30')] },
    { id:'f-bau-3', categoria:'bautismo', subcategoria:null, nombre:'Premium', precio:'$280.000', featured:false, orden:3, nota:null, adicionales:null,
      items:[i('1hs de cobertura'),i('Galería digital'),i('Cuadro bastidor 20x30'),i('Fotolibro 2 páginas')] },
  ],

  'comuniones': [
    { id:'f-com-1', categoria:'comuniones', subcategoria:null, nombre:'Cobertura', precio:null, featured:true, orden:1,
      nota:'El precio varía según la cantidad de familias participantes. Consultá por WhatsApp.',
      adicionales:[i('2do fotógrafo — consultar según cantidad de familias')],
      items:[i('Ceremonia religiosa (~2hs)'),i('Galería digital')] },
  ],

  'temporada': [
    { id:'f-tmp-1', categoria:'temporada', subcategoria:null, nombre:'Mini Sesión', precio:'$55.000', featured:true, orden:1,
      nota:'Sesiones temáticas de temporada.',
      adicionales:[i('Familiar extra +$10.000 por persona')],
      items:[i('30 minutos de sesión'),i('8-10 fotos editadas'),i('Galería digital'),i('Set temático incluido'),i('Hasta 3 familiares')] },
  ],

  'combo': [
    { id:'f-cb-1', categoria:'combo', subcategoria:null, nombre:'Completo', precio:'$220.000', featured:false, orden:1, nota:'15% de descuento incluido', adicionales:null,
      items:[i('Pre cumple 1hs — 20 fotos'),i('Pelotero 1:30hs — 40 fotos'),i('Galería digital')] },
    { id:'f-cb-2', categoria:'combo', subcategoria:null, nombre:'Premium', precio:'$300.000', featured:true, orden:2, nota:'15% de descuento incluido', adicionales:null,
      items:[i('Pre cumple 1:30hs — 35 fotos'),i('Pelotero 2hs — 60 fotos'),i('Galería digital'),i('Foto impresa grupal 20x30')] },
  ],

  'productos': [
    { id:'f-pr-1',  categoria:'productos', grupo:'Fotos impresas',  nombre:'Foto 10x15',     precio:'$2.000',   featured:false, orden:1,  nota:null, adicionales:null, items:[] },
    { id:'f-pr-2',  categoria:'productos', grupo:'Fotos impresas',  nombre:'Foto 13x18',     precio:'$3.000',   featured:false, orden:2,  nota:null, adicionales:null, items:[] },
    { id:'f-pr-3',  categoria:'productos', grupo:'Fotos impresas',  nombre:'Foto 20x30',     precio:'$9.000',   featured:false, orden:3,  nota:null, adicionales:null, items:[] },
    { id:'f-pr-4',  categoria:'productos', grupo:'Fotos impresas',  nombre:'Foto 30x40',     precio:'$16.000',  featured:false, orden:4,  nota:null, adicionales:null, items:[] },
    { id:'f-pr-5',  categoria:'productos', grupo:'Cuadros bastidor',nombre:'Cuadro bastidor 15x21', precio:'$12.000', featured:false, orden:5, nota:null, adicionales:null, items:[] },
    { id:'f-pr-6',  categoria:'productos', grupo:'Cuadros bastidor',nombre:'Cuadro bastidor 20x30', precio:'$20.000', featured:false, orden:6, nota:null, adicionales:null, items:[] },
    { id:'f-pr-7',  categoria:'productos', grupo:'Cuadros bastidor',nombre:'Cuadro bastidor 30x40', precio:'$35.000', featured:false, orden:7, nota:null, adicionales:null, items:[] },
    { id:'f-pr-8',  categoria:'productos', grupo:'Fotolibros',      nombre:'Fotolibro 2 páginas',   precio:'$35.000',  featured:false, orden:8,  nota:null, adicionales:null, items:[] },
    { id:'f-pr-9',  categoria:'productos', grupo:'Fotolibros',      nombre:'Fotolibro 3 páginas',   precio:'$45.000',  featured:false, orden:9,  nota:null, adicionales:null, items:[] },
    { id:'f-pr-10', categoria:'productos', grupo:'Fotolibros',      nombre:'Fotolibro 10 páginas',  precio:'$160.000', featured:false, orden:10, nota:null, adicionales:null, items:[] },
    { id:'f-pr-11', categoria:'productos', grupo:'Fotolibros',      nombre:'Fotolibro 15 páginas',  precio:'$230.000', featured:false, orden:11, nota:null, adicionales:null, items:[] },
    { id:'f-pr-12', categoria:'productos', grupo:'Otros',           nombre:'Polaroid (mínimo 3 unidades)', precio:'$2.000 c/u', featured:false, orden:12,
      nota:'Descuento pack 15%: elegí 3 o más productos distintos con monto mínimo $20.000. Polaroids: mínimo 3 unidades.',
      adicionales:null, items:[] },
    { id:'f-pr-13', categoria:'productos', grupo:'Otros',           nombre:'Kit decorativo — 5 polaroids + cordel y broches', precio:'$13.000', featured:false, orden:13, nota:null, adicionales:null, items:[] },
  ],
}
