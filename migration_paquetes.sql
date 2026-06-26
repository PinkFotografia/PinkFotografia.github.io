-- ================================================
-- MIGRACIÓN PAQUETES — Pink Fotografía
-- Ejecutar en Supabase > SQL Editor
-- ================================================

-- 1. Agregar columnas nuevas
ALTER TABLE paquetes
  ADD COLUMN IF NOT EXISTS subcategoria TEXT,
  ADD COLUMN IF NOT EXISTS nota         TEXT,
  ADD COLUMN IF NOT EXISTS adicionales  JSONB,
  ADD COLUMN IF NOT EXISTS grupo        TEXT;

-- 2. Limpiar paquetes existentes
DELETE FROM paquetes;

-- 3. Insertar todos los paquetes
INSERT INTO paquetes (categoria, subcategoria, grupo, nombre, precio, featured, orden, items, nota, adicionales) VALUES

-- ── PRE CUMPLE / ESTUDIO ──────────────────────────────────────────────
('pre-cumple','estudio',NULL,'Esencial','$110.000',false,1,
 '[{"es":"1hs en estudio"},{"es":"20 fotos editadas"},{"es":"Galería digital"},{"es":"Hasta 3 familiares"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('pre-cumple','estudio',NULL,'Completo','$150.000',true,2,
 '[{"es":"1:30hs en estudio"},{"es":"35 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 3 familiares"},{"es":"Foto impresa 20x30"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('pre-cumple','estudio',NULL,'Premium','$200.000',false,3,
 '[{"es":"2hs en estudio"},{"es":"50 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 4 familiares"},{"es":"Foto impresa 20x30"},{"es":"Cuadro bastidor 20x30"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

-- ── PRE CUMPLE / EXTERIOR ─────────────────────────────────────────────
('pre-cumple','exterior',NULL,'Esencial','$150.000',false,1,
 '[{"es":"1hs en exterior"},{"es":"20 fotos editadas"},{"es":"Galería digital"},{"es":"Hasta 3 familiares"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('pre-cumple','exterior',NULL,'Completo','$210.000',true,2,
 '[{"es":"1:30hs en exterior"},{"es":"35 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 3 familiares"},{"es":"Foto impresa 20x30"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('pre-cumple','exterior',NULL,'Premium','$270.000',false,3,
 '[{"es":"2hs en exterior"},{"es":"50 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 4 familiares"},{"es":"Foto impresa 20x30"},{"es":"Cuadro bastidor 20x30"},{"es":"Doble locación"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

-- ── CAKE SMASH ────────────────────────────────────────────────────────
('cake-smash',NULL,NULL,'Esencial','$120.000',false,1,
 '[{"es":"1hs de sesión"},{"es":"20 fotos editadas"},{"es":"Galería digital"},{"es":"Baby bath"},{"es":"Hasta 3 familiares"}]',
 'La torta corre por cuenta del cliente',NULL),

('cake-smash',NULL,NULL,'Completo','$170.000',true,2,
 '[{"es":"1:30hs de sesión"},{"es":"35 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Baby bath"},{"es":"Hasta 3 familiares"},{"es":"Foto impresa 20x30"}]',
 'La torta corre por cuenta del cliente',NULL),

('cake-smash',NULL,NULL,'Premium','$220.000',false,3,
 '[{"es":"2hs de sesión"},{"es":"50 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Baby bath"},{"es":"Hasta 4 familiares"},{"es":"Foto impresa 20x30"},{"es":"Cuadro bastidor 20x30"}]',
 'La torta corre por cuenta del cliente',NULL),

-- ── MATERNIDAD ────────────────────────────────────────────────────────
('maternidad',NULL,NULL,'Esencial','$110.000',false,1,
 '[{"es":"1hs de sesión"},{"es":"20 fotos editadas"},{"es":"Galería digital"},{"es":"Estudio o exterior"},{"es":"Hasta 3 familiares"}]',
 NULL,'[{"es":"Segunda escenografía simple +$25.000"}]'),

('maternidad',NULL,NULL,'Completo','$150.000',true,2,
 '[{"es":"1:30hs de sesión"},{"es":"35 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Estudio o exterior"},{"es":"Hasta 3 familiares"},{"es":"Foto impresa 20x30"}]',
 NULL,'[{"es":"Segunda escenografía simple +$25.000"}]'),

('maternidad',NULL,NULL,'Premium','$200.000',false,3,
 '[{"es":"2hs de sesión"},{"es":"50 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Estudio o exterior"},{"es":"Hasta 4 familiares"},{"es":"Foto impresa 20x30"},{"es":"Cuadro bastidor 20x30"}]',
 NULL,'[{"es":"Segunda escenografía simple +$25.000"}]'),

-- ── INDIVIDUAL / FAMILIAR — ESTUDIO ───────────────────────────────────
('individual-familiar','estudio',NULL,'Esencial','$90.000',false,1,
 '[{"es":"1hs en estudio"},{"es":"20 fotos editadas"},{"es":"Galería digital"},{"es":"Hasta 3 familiares"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('individual-familiar','estudio',NULL,'Completo','$140.000',true,2,
 '[{"es":"1:30hs en estudio"},{"es":"35 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 3 familiares"},{"es":"Foto impresa 20x30"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('individual-familiar','estudio',NULL,'Premium','$190.000',false,3,
 '[{"es":"2hs en estudio"},{"es":"50 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 4 familiares"},{"es":"Foto impresa 20x30"},{"es":"Cuadro bastidor 20x30"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

-- ── INDIVIDUAL / FAMILIAR — EXTERIOR ──────────────────────────────────
('individual-familiar','exterior',NULL,'Esencial','$150.000',false,1,
 '[{"es":"1hs en exterior"},{"es":"20 fotos editadas"},{"es":"Galería digital"},{"es":"Hasta 3 familiares"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('individual-familiar','exterior',NULL,'Completo','$210.000',true,2,
 '[{"es":"1:30hs en exterior"},{"es":"35 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 3 familiares"},{"es":"Foto impresa 20x30"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

('individual-familiar','exterior',NULL,'Premium','$270.000',false,3,
 '[{"es":"2hs en exterior"},{"es":"50 fotos editadas"},{"es":"Galería digital"},{"es":"Cambio de vestuario"},{"es":"Hasta 4 familiares"},{"es":"Foto impresa 20x30"},{"es":"Cuadro bastidor 20x30"},{"es":"Doble locación"}]',
 'Familiar adicional: +$15.000 por persona a partir del 4to',NULL),

-- ── PELOTERO ──────────────────────────────────────────────────────────
('pelotero',NULL,NULL,'1:30hs','$150.000',false,1,
 '[{"es":"40 fotos editadas"},{"es":"Galería digital"}]',
 NULL,'[{"es":"30 min extra +$20.000"},{"es":"1hs extra +$35.000"},{"es":"Video resumen +$30.000"},{"es":"Reel para redes +$20.000"}]'),

('pelotero',NULL,NULL,'2hs','$200.000',true,2,
 '[{"es":"60 fotos editadas"},{"es":"Galería digital"},{"es":"Foto impresa grupal 20x30"}]',
 NULL,'[{"es":"30 min extra +$20.000"},{"es":"1hs extra +$35.000"},{"es":"Video resumen +$30.000"},{"es":"Reel para redes +$20.000"}]'),

('pelotero',NULL,NULL,'3hs','$280.000',false,3,
 '[{"es":"90 fotos editadas"},{"es":"Galería digital"},{"es":"Foto impresa grupal 20x30"}]',
 NULL,'[{"es":"30 min extra +$20.000"},{"es":"1hs extra +$35.000"},{"es":"Video resumen +$30.000"},{"es":"Reel para redes +$20.000"}]'),

-- ── EVENTO SOCIAL ─────────────────────────────────────────────────────
('evento-social',NULL,NULL,'3hs','$350.000',false,1,
 '[{"es":"Galería digital"}]',
 NULL,'[{"es":"Video resumen +$80.000"},{"es":"Reel para redes +$30.000"}]'),

('evento-social',NULL,NULL,'4hs','$450.000',true,2,
 '[{"es":"Galería digital"}]',
 NULL,'[{"es":"Video resumen +$80.000"},{"es":"Reel para redes +$30.000"}]'),

('evento-social',NULL,NULL,'5hs','$550.000',false,3,
 '[{"es":"Galería digital"}]',
 NULL,'[{"es":"Video resumen +$80.000"},{"es":"Reel para redes +$30.000"}]'),

-- ── BABY SHOWER ───────────────────────────────────────────────────────
('baby-shower',NULL,NULL,'1:30hs','$150.000',false,1,
 '[{"es":"Galería digital"}]',
 NULL,'[{"es":"30 min extra +$20.000"},{"es":"1hs extra +$35.000"},{"es":"Video resumen +$30.000"},{"es":"Reel para redes +$20.000"}]'),

('baby-shower',NULL,NULL,'2hs','$200.000',true,2,
 '[{"es":"Galería digital"}]',
 NULL,'[{"es":"30 min extra +$20.000"},{"es":"1hs extra +$35.000"},{"es":"Video resumen +$30.000"},{"es":"Reel para redes +$20.000"}]'),

('baby-shower',NULL,NULL,'3hs','$280.000',false,3,
 '[{"es":"Galería digital"}]',
 NULL,'[{"es":"30 min extra +$20.000"},{"es":"1hs extra +$35.000"},{"es":"Video resumen +$30.000"},{"es":"Reel para redes +$20.000"}]'),

-- ── REVELACIÓN DE GÉNERO ──────────────────────────────────────────────
('revelacion-genero',NULL,NULL,'Esencial','$150.000',true,1,
 '[{"es":"1:30hs de cobertura"},{"es":"Interior / exterior / salón"},{"es":"Galería digital"}]',
 NULL,'[{"es":"1hs extra +$35.000"}]'),

-- ── CASAMIENTOS ───────────────────────────────────────────────────────
('casamientos',NULL,'Servicios individuales','Civil','$200.000',false,1,
 '[{"es":"1hs de cobertura"},{"es":"Galería digital"}]',NULL,NULL),

('casamientos',NULL,'Servicios individuales','Iglesia','$200.000',false,2,
 '[{"es":"1hs de cobertura"},{"es":"Galería digital"}]',NULL,NULL),

('casamientos',NULL,'Servicios individuales','Fiesta','$500.000',false,3,
 '[{"es":"4hs de cobertura"},{"es":"Galería digital"}]',NULL,NULL),

('casamientos',NULL,'Servicios individuales','Fiesta extendida','$650.000',false,4,
 '[{"es":"6hs de cobertura"},{"es":"Galería digital"}]',NULL,NULL),

('casamientos',NULL,'Servicios individuales','Getting ready','$150.000',false,5,
 '[]',NULL,NULL),

('casamientos',NULL,'Servicios individuales','Book de novios','$150.000',false,6,
 '[]',NULL,NULL),

('casamientos',NULL,'Paquetes','Completo','$900.000',true,7,
 '[{"es":"Civil o Iglesia"},{"es":"Fiesta 4hs"},{"es":"Getting ready"},{"es":"Galería digital"}]',
 NULL,'[{"es":"Álbum físico fotolibro 15 pág +$230.000"},{"es":"Video resumen +$80.000"},{"es":"Reel +$30.000"},{"es":"2do fotógrafo — consultar"}]'),

('casamientos',NULL,'Paquetes','Premium','$1.500.000',false,8,
 '[{"es":"Civil + Iglesia"},{"es":"Fiesta 6hs"},{"es":"Getting ready"},{"es":"Book de novios"},{"es":"2do fotógrafo"},{"es":"Álbum físico"},{"es":"Galería digital"}]',
 NULL,'[{"es":"Álbum físico fotolibro 15 pág +$230.000"},{"es":"Video resumen +$80.000"},{"es":"Reel +$30.000"},{"es":"2do fotógrafo — consultar"}]'),

-- ── 15 AÑOS ───────────────────────────────────────────────────────────
('quince',NULL,'Servicios individuales','Salón 4hs','$500.000',false,1,
 '[{"es":"4hs de cobertura en salón"},{"es":"Galería digital"}]',NULL,NULL),

('quince',NULL,'Servicios individuales','Salón extendido 6hs','$650.000',false,2,
 '[{"es":"6hs de cobertura en salón"},{"es":"Galería digital"}]',NULL,NULL),

('quince',NULL,'Servicios individuales','Getting ready','$150.000',false,3,
 '[]',NULL,NULL),

('quince',NULL,'Servicios individuales','Book previo','$150.000',false,4,
 '[{"es":"Días antes del evento"}]',NULL,NULL),

('quince',NULL,'Servicios individuales','Book día del evento','$150.000',false,5,
 '[]',NULL,NULL),

('quince',NULL,'Paquetes','Completo','$900.000',true,6,
 '[{"es":"Salón 4hs"},{"es":"Getting ready"},{"es":"Book día del evento"},{"es":"Galería digital"}]',
 NULL,'[{"es":"Álbum físico fotolibro 15 pág +$230.000"},{"es":"Video resumen +$80.000"},{"es":"Reel +$30.000"},{"es":"2do fotógrafo — consultar"}]'),

('quince',NULL,'Paquetes','Premium','$1.500.000',false,7,
 '[{"es":"Salón 6hs"},{"es":"Getting ready"},{"es":"Book previo"},{"es":"Book día del evento"},{"es":"2do fotógrafo"},{"es":"Álbum físico"},{"es":"Galería digital"}]',
 NULL,'[{"es":"Álbum físico fotolibro 15 pág +$230.000"},{"es":"Video resumen +$80.000"},{"es":"Reel +$30.000"},{"es":"2do fotógrafo — consultar"}]'),

-- ── BAUTISMO ──────────────────────────────────────────────────────────
('bautismo',NULL,NULL,'Esencial','$200.000',false,1,
 '[{"es":"1hs de cobertura"},{"es":"Galería digital"}]',NULL,NULL),

('bautismo',NULL,NULL,'Completo','$230.000',true,2,
 '[{"es":"1hs de cobertura"},{"es":"Galería digital"},{"es":"Cuadro bastidor 20x30"}]',NULL,NULL),

('bautismo',NULL,NULL,'Premium','$280.000',false,3,
 '[{"es":"1hs de cobertura"},{"es":"Galería digital"},{"es":"Cuadro bastidor 20x30"},{"es":"Fotolibro 2 páginas"}]',NULL,NULL),

-- ── COMUNIONES ────────────────────────────────────────────────────────
('comuniones',NULL,NULL,'Cobertura',NULL,true,1,
 '[{"es":"Ceremonia religiosa (~2hs)"},{"es":"Galería digital"}]',
 'El precio varía según la cantidad de familias participantes. Consultá por WhatsApp.',
 '[{"es":"2do fotógrafo — consultar según cantidad de familias"}]'),

-- ── TEMPORADA ─────────────────────────────────────────────────────────
('temporada',NULL,NULL,'Mini Sesión','$55.000',true,1,
 '[{"es":"30 minutos de sesión"},{"es":"8-10 fotos editadas"},{"es":"Galería digital"},{"es":"Set temático incluido"},{"es":"Hasta 3 familiares"}]',
 'Sesiones temáticas de temporada.',
 '[{"es":"Familiar extra +$10.000 por persona"}]'),

-- ── COMBO ─────────────────────────────────────────────────────────────
('combo',NULL,NULL,'Completo','$220.000',false,1,
 '[{"es":"Pre cumple 1hs — 20 fotos"},{"es":"Pelotero 1:30hs — 40 fotos"},{"es":"Galería digital"}]',
 '15% de descuento incluido',NULL),

('combo',NULL,NULL,'Premium','$300.000',true,2,
 '[{"es":"Pre cumple 1:30hs — 35 fotos"},{"es":"Pelotero 2hs — 60 fotos"},{"es":"Galería digital"},{"es":"Foto impresa grupal 20x30"}]',
 '15% de descuento incluido',NULL),

-- ── PRODUCTOS ─────────────────────────────────────────────────────────
('productos',NULL,'Fotos impresas','Foto 10x15','$2.000',false,1,'[]',NULL,NULL),
('productos',NULL,'Fotos impresas','Foto 13x18','$3.000',false,2,'[]',NULL,NULL),
('productos',NULL,'Fotos impresas','Foto 20x30','$9.000',false,3,'[]',NULL,NULL),
('productos',NULL,'Fotos impresas','Foto 30x40','$16.000',false,4,'[]',NULL,NULL),
('productos',NULL,'Cuadros bastidor','Cuadro bastidor 15x21','$12.000',false,5,'[]',NULL,NULL),
('productos',NULL,'Cuadros bastidor','Cuadro bastidor 20x30','$20.000',false,6,'[]',NULL,NULL),
('productos',NULL,'Cuadros bastidor','Cuadro bastidor 30x40','$35.000',false,7,'[]',NULL,NULL),
('productos',NULL,'Fotolibros','Fotolibro 2 páginas','$35.000',false,8,'[]',NULL,NULL),
('productos',NULL,'Fotolibros','Fotolibro 3 páginas','$45.000',false,9,'[]',NULL,NULL),
('productos',NULL,'Fotolibros','Fotolibro 10 páginas','$160.000',false,10,'[]',NULL,NULL),
('productos',NULL,'Fotolibros','Fotolibro 15 páginas','$230.000',false,11,'[]',NULL,NULL),
('productos',NULL,'Otros','Polaroid (mínimo 3 unidades)','$2.000 c/u',false,12,'[]',
 'Descuento pack 15%: elegí 3 o más productos distintos con monto mínimo $20.000. Polaroids: mínimo 3 unidades para contar como producto.',NULL),
('productos',NULL,'Otros','Kit decorativo — 5 polaroids + cordel y broches','$13.000',false,13,'[]',NULL,NULL);
