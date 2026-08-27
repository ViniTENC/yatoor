# Madrid — Contexto Yatoor

> Fuente primaria para el modelo. Misma lógica que `caba.md` y `rio-de-janeiro.md`.

- **Ciudad:** Madrid, España
- **Registro de voz:** el mismo tono cercano de Yatoor, adaptado al "tú" en vez del voseo
  (ver nota de `CLAUDE_2.md`: "el tono viaja, el contenido no" — mismo personaje, registro local).
- **Radio de geofencing:** 50 m
- **Última actualización:** 2026-08-27
- **Formato de coordenadas:** WGS84 (lat, lng)
- **Cobertura de zonas:** Madrid de los Austrias / Centro histórico (Sol, Plaza Mayor, Palacio Real, San Miguel, Barrio de las Letras), Retiro, Malasaña, Gran Vía, Chueca, Embajadores/La Latina, Moncloa-Aravaca. Pendientes: Lavapiés, Salamanca.
- **Categorías cubiertas:** historia, arquitectura, arte, anécdota, costumbre (feria semanal), misterio/leyenda.

---

## Formato por punto

Igual al de `caba.md`: id, barrio, lat/lng, categoría, qué contar, dato de gancho, fuente, última verificación.

---

## Puntos cargados

### Puerta del Sol
- id: puerta-del-sol
- barrio: Centro (Sol)
- lat, lng: 40.4169473, -3.7035285
- place_id: ChIJx319oIAoQg0RecYd2lfuSmk
- categoría: historia, anécdota
- qué contar: Acá está el Kilómetro Cero, el punto exacto desde el que se miden todas las carreteras radiales de España, marcado con una placa en el piso. Cada 31 de diciembre miles de personas se juntan bajo el reloj de la Casa de Correos para comer las doce uvas de la suerte, una por campanada — una tradición que se transmite en vivo por televisión a todo el país.
- dato de gancho: Todas las carreteras de España se miden desde una placa en el piso de esta plaza.
- fuente: https://www.esmadrid.com/informacion-turistica/puerta-del-sol
- última verificación: 2026-08-27

### Estatua del Oso y el Madroño
- id: oso-madrono
- barrio: Centro (Sol)
- lat, lng: 40.4170313, -3.7027423
- place_id: ChIJN-KUGX4oQg0R0eKI7ogGgq8
- categoría: arte, historia
- qué contar: Es el símbolo heráldico de Madrid desde hace siglos: un oso empinado comiendo de un madroño, el árbol que abundaba en la zona cuando era apenas una villa. Comparte protagonismo con la Mariblanca, una estatua cercana que marca dónde había antes una fuente.
- dato de gancho: Este oso comiendo de un árbol es, literalmente, el escudo de Madrid.
- fuente: https://www.barcelo.com/guia-turismo/es/espana/madrid/que-ver/el-oso-y-el-madrono/
- última verificación: 2026-08-27

### Plaza Mayor
- id: plaza-mayor
- barrio: Centro (Madrid de los Austrias)
- lat, lng: 40.415511, -3.7074009
- place_id: ChIJZX56134oQg0RHBgRAVQ8pkk
- categoría: historia, arquitectura
- qué contar: Felipe III la mandó construir en 1617 para tener un espacio único donde hacer mercados, corridas de toros y también autos de fe de la Inquisición — ejecuciones públicas incluidas. Se incendió tres veces a lo largo de su historia, así que lo que ves hoy es en gran parte reconstrucción del siglo XIX.
- dato de gancho: En esta plaza se hacían mercados, corridas de toros y ejecuciones de la Inquisición, todo en el mismo lugar.
- fuente: https://es.wikipedia.org/wiki/Historia_de_la_plaza_Mayor_de_Madrid
- última verificación: 2026-08-27

### Palacio Real
- id: palacio-real
- barrio: Centro (Palacio)
- lat, lng: 40.417955, -3.714312
- place_id: ChIJwamkfX4oQg0RUUjO1nnsfy4
- categoría: historia, arquitectura
- qué contar: Se construyó sobre las cenizas del antiguo Alcázar medieval, que se incendió en Nochebuena de 1734. Perdió más de 500 obras de arte esa noche — Las Meninas de Velázquez se salvó porque unos frailes la tiraron por una ventana. Hay teorías, nunca confirmadas, de que el propio rey Felipe V pudo haber provocado el incendio porque odiaba el edificio viejo.
- dato de gancho: Las Meninas se salvó de este incendio porque la tiraron por una ventana.
- fuente: https://es.wikipedia.org/wiki/Incendio_del_Real_Alc%C3%A1zar_de_Madrid
- última verificación: 2026-08-27

### Mercado de San Miguel
- id: mercado-de-san-miguel
- barrio: Centro (junto a Plaza Mayor)
- lat, lng: 40.4153794, -3.7089697
- place_id: ChIJLW4ZIXkoQg0R6JDRTdPmLxY
- categoría: gastronomía, arquitectura
- qué contar: Es el único mercado de estructura de hierro que sobrevive en Madrid de la época en que se pusieron de moda los mercados cubiertos parisinos, inaugurado en 1916. Estuvo cerca de desaparecer por la competencia de los supermercados hasta que en 2009 lo reconvirtieron en mercado gourmet, y ahí explotó.
- dato de gancho: Este mercado de hierro de 1916 estuvo a punto de desaparecer antes de reinventarse en 2009.
- fuente: https://es.wikipedia.org/wiki/Mercado_de_San_Miguel
- última verificación: 2026-08-27

### Barrio de las Letras y tumba de Cervantes
- id: barrio-de-las-letras-cervantes
- barrio: Barrio de las Letras
- lat, lng: 40.4136921, -3.6975666
- place_id: ChIJndmyHIIoQg0RUZrWMOdDj1I
- categoría: historia, anécdota
- qué contar: Acá vivió y murió Miguel de Cervantes, y lo enterraron en el convento de las Trinitarias — pero durante 400 años nadie supo exactamente dónde estaban sus restos dentro del edificio. Recién en 2015 un equipo de arqueólogos los identificó con certeza, mezclados con los de otras personas en la misma cripta.
- dato de gancho: Durante 400 años nadie supo exactamente dónde estaba enterrado Cervantes.
- fuente: https://www.esmadrid.com/informacion-turistica/iglesia-y-convento-de-las-trinitarias-descalzas
- última verificación: 2026-08-27

### Palacio de Cristal (Parque del Retiro)
- id: palacio-de-cristal-retiro
- barrio: Retiro
- lat, lng: 40.4136352, -3.6819997
- place_id: ChIJmy6-B6AoQg0RWfqNzFXrq3k
- categoría: arquitectura, historia
- qué contar: Lo construyeron en 1887 como invernadero para exhibir plantas tropicales traídas de Filipinas, entonces colonia española — es casi todo hierro y vidrio, pensado para que entrara luz natural en cantidad. En 1936, con la República ya en marcha, ahí adentro se votó y juró como presidente a Manuel Azaña porque el Congreso se había quedado chico para la asamblea.
- dato de gancho: Este invernadero de plantas tropicales terminó siendo el lugar donde juró un presidente de la República.
- fuente: https://es.wikipedia.org/wiki/Palacio_de_Cristal_del_Retiro
- última verificación: 2026-08-27

### Malasaña y Plaza del Dos de Mayo
- id: malasana-dos-de-mayo
- barrio: Malasaña
- lat, lng: 40.426999, -3.7040303
- place_id: ChIJs4IOFWIoQg0RsRhSAEImv3g
- categoría: historia, anécdota
- qué contar: El barrio se llamaba "Maravillas" hasta que le cambiaron el nombre en homenaje a Manuela Malasaña, una costurera de 17 años que murió durante el levantamiento contra las tropas francesas del 2 de mayo de 1808 — hay versiones de que la mataron por llevar unas tijeras de costura, que los soldados tomaron como arma. Siglo y medio después, este mismo barrio fue el epicentro de la Movida madrileña de los 80.
- dato de gancho: Este barrio lleva el nombre de una costurera de 17 años que la mataron por llevar tijeras.
- fuente: https://www.elespanol.com/madrid/20240501/manuela-malasana-madrilena-asesinada-diecisiete-anos-levantamientos-mayo/851414853_0.html
- última verificación: 2026-08-27

### Gran Vía
- id: gran-via
- barrio: Centro
- lat, lng: 40.4189329, -3.6968903
- place_id: ChIJM9-jbX0oQg0RIV1MiW1AGeE
- categoría: historia, arquitectura
- qué contar: El rey Alfonso XIII dio el primer golpe de piqueta en 1910 para empezar a abrirla, y significó demoler más de 300 casas y decenas de calles enteras del Madrid viejo — tardaron casi 20 años en terminarla, en tres tramos distintos. En su apogeo de mediados del siglo XX, con todos sus cines y teatros, la llamaban "el Broadway madrileño".
- dato de gancho: Para abrir esta avenida demolieron más de 300 casas y tardaron casi 20 años en terminarla.
- fuente: https://www.madrid.es/portales/munimadrid/es/Inicio/Actualidad/Noticias/La-Gran-Via-cumple-cien-anos/?vgnextfmt=default&vgnextoid=12ae6d63a8830210VgnVCM1000000b205a0aRCRD&vgnextchannel=a12149fa40ec9410VgnVCM100000171f5a0aRCRD
- última verificación: 2026-08-27

### El Rastro
- id: el-rastro
- barrio: Embajadores / La Latina
- lat, lng: 40.4108036, -3.7070998
- place_id: ChIJyXJjMdQnQg0RPMdO34hY4dc
- categoría: costumbre, historia
- qué contar: Sólo existe los domingos, y el nombre no es casual: nació alrededor de 1496 en torno al matadero viejo de la ciudad, y "rastro" era el reguero de sangre que dejaban los animales al arrastrarlos desde el matadero hasta las curtidurías. Hoy, en el mismo trazado, más de 1.000 puestos venden de todo — nada que ver con el origen, pero el nombre quedó pegado para siempre.
- dato de gancho: El mercadillo más famoso de España se llama así por el rastro de sangre de un matadero del siglo XV.
- fuente: https://es.wikipedia.org/wiki/El_Rastro_de_Madrid
- última verificación: 2026-08-27

### Templo de Debod
- id: templo-de-debod
- barrio: Moncloa-Aravaca (Parque del Oeste)
- lat, lng: 40.4240216, -3.7177695
- place_id: ChIJWRLqi24oQg0RqwZ3SsbZah0
- categoría: historia, curiosidad
- qué contar: Es un templo egipcio real, de 2.200 años, en pleno Madrid. Egipto lo regaló entero, piedra por piedra, como agradecimiento a España por ayudar a salvar templos que iban a quedar bajo el agua con la construcción de la represa de Asuán. Lo armaron acá en 1972 respetando la orientación original: de este a oeste, como en el Nilo.
- dato de gancho: Este templo egipcio de 2.200 años está acá porque España ayudó a salvar otros templos de morir bajo una represa.
- fuente: https://www.infobae.com/espana/2025/11/30/el-origen-del-templo-de-debod-el-regalo-de-egipto-a-espana-que-llego-piedra-a-piedra-desde-el-nilo/
- última verificación: 2026-08-27

### Casa de las Siete Chimeneas
- id: casa-siete-chimeneas
- barrio: Chueca
- lat, lng: 40.4201915, -3.6964745
- place_id: ChIJbzS6N4QoQg0R8qUJ8IM5Mrw
- categoría: anécdota, historia
- qué contar: La leyenda del siglo XVI cuenta que Felipe II se encaprichó con Elena, la hija del dueño, y le construyó esta casa. Ella se casó con un capitán al que el rey mandó a una guerra donde murió; poco después Elena también murió, y los sirvientes decían que su cuerpo tenía heridas de cuchillo — el cadáver desapareció antes de que se pudiera investigar. Desde entonces cuentan que su fantasma recorre el techo con una antorcha, señalando hacia el Alcázar.
- dato de gancho: De esta casa desapareció un cadáver con heridas de cuchillo, y dicen que su fantasma sigue en el techo.
- fuente: https://www.infobae.com/espana/viajes/2025/10/30/el-edificio-mas-misterioso-de-madrid-donde-murio-la-amante-de-un-rey-leyendas-dos-esqueletos-y-un-fantasma-en-el-tejado/
- última verificación: 2026-08-27

### Museo del Prado
- id: museo-del-prado
- barrio: Retiro
- lat, lng: 40.4137818, -3.6921271
- place_id: ChIJ7aLYZp0oQg0RWoitk33wlBA
- categoría: arte
- qué contar: Tiene Las Meninas de Velázquez, la misma pintura que sobrevivió al incendio del Alcázar en 1734 gracias a que unos frailes la tiraron por una ventana. Las últimas dos horas del día de entrada abierta al público son gratis — la cola se arma, pero es la manera de entrar sin pagar a uno de los museos de pintura más importantes del mundo.
- dato de gancho: Las últimas dos horas de cada día, entrar a este museo es gratis.
- fuente: https://www.museodelprado.es/visita/horarios-y-tarifas
- última verificación: 2026-08-27

---

## Pendientes de scrapear

*(mismo criterio que en `caba.md`)*

- —

---

## Notas de uso para el modelo

1. Buscar primero acá por nombre o proximidad a `lat, lng` dentro del radio de geofencing.
2. Si no hay match: buscar en vivo, redactar en voz Yatoor y agregar a "Pendientes de scrapear" con el mismo formato.
3. No inventar datos verificables. Si la fuente no está clara, marcar `fuente: sin verificar`.
4. Los 13 puntos cargados salieron de research real (Wikipedia, esmadrid.com, madrid.es, Infobae — fuentes oficiales y medios reconocidos). Falta Lavapiés y Salamanca.
