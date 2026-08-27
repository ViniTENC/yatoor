# Buenos Aires — Contexto Yatoor

> Fuente primaria para el modelo. Antes de llamar a Google Places o buscar en vivo,
> Yatoor consulta este archivo. Sólo si no hay match (ni por nombre ni por cercanía
> geográfica al punto de la geocerca) se dispara la búsqueda externa — y el resultado
> nuevo se agrega acá abajo, en la sección "Pendientes de scrapear", para no volver a pagar
> esa búsqueda la próxima vez que alguien pase por el mismo lugar.

- **Ciudad:** Buenos Aires, Argentina
- **Registro de voz:** voseo rioplatense, informalidad leve (ver `CLAUDE_2.md` — sección Voz)
- **Radio de geofencing:** 50 m
- **Última actualización:** 2026-08-27
- **Cobertura de barrios:** Monserrat/Centro Histórico, San Telmo, Puerto Madero, Palermo, La Boca, Retiro, Recoleta, San Nicolás, Belgrano, Almagro, Chacarita, Mataderos. Pendientes: Villa Crespo, Colegiales, Núñez, Caballito.
- **Categorías cubiertas:** historia, arquitectura, arte, anécdota, gastronomía, costumbre (feria semanal), naturaleza/parques, misterio.
- **Formato de coordenadas:** WGS84 (lat, lng)

---

## Formato por punto

```
### [Nombre del lugar]
- id: slug único
- barrio:
- lat, lng: (validado contra Google Places)
- place_id: (Google Places place_id, para pgvector/Supabase)
- categoría: [historia | arquitectura | gastronomía | arte | anécdota | política]
- qué contar: 2–4 líneas, voz Yatoor (presente, segunda persona, un dato que engancha)
- dato de gancho: la frase corta que dispara la curiosidad (para notificación)
- fuente:
- última verificación:
```

---

## Puntos cargados

### Obelisco
- id: obelisco
- barrio: San Nicolás
- lat, lng: -34.6037014, -58.3816048
- place_id: ChIJ217apvCpSgARi1VOI06tvhE
- categoría: historia, arquitectura
- qué contar: Lo levantaron en 1936 para los 400 años de la fundación de la ciudad, y lo hicieron en sólo 31 días con 157 obreros — un récord para la época, justo sobre el cruce de las líneas B y C del subte. No conmemora una batalla ni a un prócer: marca el lugar donde se izó por primera vez la bandera argentina en la ciudad, en 1812.
- dato de gancho: Este obelisco se construyó en 31 días, arriba de dos líneas de subte.
- fuente: https://turismo.buenosaires.gob.ar/es/otros-establecimientos/obelisco
- última verificación: 2026-08-26

### Caminito
- id: caminito
- barrio: La Boca
- lat, lng: -34.6393256, -58.3626807
- place_id: ChIJk5Zj-LA0o5URFK_uteT36Z4
- categoría: arte, historia
- qué contar: Era la traza de un ramal de tren abandonado. El pintor Benito Quinquela Martín, huérfano criado en el barrio, impulsó convertirlo en museo a cielo abierto en 1959. Los colores no son casualidad: los inmigrantes que vivían ahí pintaban las chapas de sus casas con la pintura que les sobraba de los barcos, mezclando lo que había.
- dato de gancho: Estos colores nacieron de la pintura que sobraba de pintar barcos.
- fuente: https://www.lanacion.com.ar/cultura/benito-quinquela-martin-huerfano-transformo-la-boca-nid2486991/
- última verificación: 2026-08-26

### Plaza de Mayo
- id: plaza-de-mayo
- barrio: Monserrat
- lat, lng: -34.6083667, -58.3722832
- place_id: ChIJXx79V9vKvJURS2GosE58c8w
- categoría: historia, política
- qué contar: Acá Juan de Garay fundó la ciudad por segunda vez, en 1580, después de que la primera fundación de Pedro de Mendoza fracasara y fuera arrasada por los pueblos originarios. Con los siglos se volvió el escenario de cada momento bisagra del país: la Revolución de Mayo, el discurso de Evita desde el balcón de la Casa Rosada, y desde 1977 la vuelta de los jueves de las Madres, que empezaron a reclamar ahí por sus hijos desaparecidos en plena dictadura.
- dato de gancho: Esta plaza fundó la ciudad dos veces y sostiene una vuelta que ya lleva casi 50 años.
- fuente: https://es.wikipedia.org/wiki/Plaza_de_Mayo
- última verificación: 2026-08-26

### Cementerio de la Recoleta
- id: cementerio-recoleta
- barrio: Recoleta
- lat, lng: -34.5873639, -58.3929555
- place_id: ChIJs5EH8aLKvJURw6UX3MYKGKE
- categoría: historia, arquitectura
- qué contar: Es una ciudad en miniatura de mausoleos y calles — algunos con más metros cuadrados que un departamento porteño real. Ahí está la tumba de Eva Perón, cinco metros bajo tierra y blindada como una bóveda bancaria: su cuerpo fue secuestrado y escondido durante casi 16 años tras el golpe de 1955, y la familia no quiso arriesgarse de nuevo.
- dato de gancho: La tumba de Evita está blindada porque su cuerpo ya desapareció una vez, durante 16 años.
- fuente: https://www.revistaanfibia.com/cuerpo-por-cuerpo/
- última verificación: 2026-08-26

### Teatro Colón
- id: teatro-colon
- barrio: San Nicolás
- lat, lng: -34.601152, -58.3833278
- place_id: ChIJIxYSMMbKvJURqZGJyCpvOFM
- categoría: arquitectura, arte
- qué contar: Los rankings de acústica lo ponen entre los cinco mejores teatros de ópera del mundo, a la par de Viena o Milán. Tardó casi 20 años en construirse: el primer arquitecto, Tamburini, murió antes de arrancar la obra; su sucesor, Meano, fue asesinado en 1904 sin verla terminada. La terminó un tercero, Jules Dormal — el mismo dúo Meano-Dormal que después construyó el Congreso.
- dato de gancho: Dos arquitectos del Colón murieron antes de verlo terminado.
- fuente: https://teatrocolon.org.ar/el-teatro/
- última verificación: 2026-08-26

### El Ateneo Grand Splendid
- id: ateneo-grand-splendid
- barrio: Recoleta / Barrio Norte
- lat, lng: -34.5959833, -58.3942285
- place_id: ChIJlRIZ_L3KvJURwGSeZ0wIEIE
- categoría: arquitectura, anécdota
- qué contar: Era el cine-teatro Grand Splendid, inaugurado en 1919 por un empresario que trajo el primer proyector de cine al país. Ahí funcionó Radio Splendid, donde Carlos Gardel grabó y hasta se probó la voz antes de salir al aire. Hoy es librería, pero no tocaron casi nada: los palcos son salas de lectura y la cúpula pintada en 1919 sigue ahí arriba.
- dato de gancho: Antes de ser librería, en este escenario Gardel probaba la voz para la radio.
- fuente: https://www.lanacion.com.ar/buenos-aires/como-un-cine-y-teatro-de-1919-destinado-a-desaparecer-se-convirtio-en-la-libreria-mas-nid30092022/
- última verificación: 2026-08-26

### San Telmo (casco histórico)
- id: san-telmo-casco
- barrio: San Telmo
- lat, lng: -34.6204914, -58.3717481
- place_id: ChIJifSktCzLvJURsTMaMFXLu3E
- categoría: historia, gastronomía
- qué contar: Es el barrio más antiguo que conserva su trama original. Antes de ser el epicentro del tango y el anticuario, era zona de familias ricas — hasta la fiebre amarilla de 1871, que mató a más de 13.000 personas y los espantó hacia el norte. Dejaron sus casonas, que se llenaron de inmigrantes viviendo de a varias familias por conventillo.
- dato de gancho: Recoleta es el barrio caro que es porque una epidemia vació San Telmo en 1871.
- fuente: https://elhistoriador.com.ar/la-fiebre-amarilla-en-buenos-aires/
- última verificación: 2026-08-26

### Puerto Madero
- id: puerto-madero
- barrio: Puerto Madero
- lat, lng: -34.6177194, -58.3620561
- place_id: ChIJiQPXwtk0o5URj2cW455eew4
- categoría: historia, arquitectura
- qué contar: Se inauguró como puerto en 1897 y en apenas diez años ya había quedado obsoleto: los barcos crecieron más rápido que los diques. Quedó casi un siglo abandonado hasta que en 1989 arrancó la reconversión que lo hizo el barrio más nuevo y caro de la ciudad, reciclando los mismos galpones de ladrillo original.
- dato de gancho: El barrio más caro de Buenos Aires fue, durante casi un siglo, un puerto abandonado.
- fuente: https://es.wikipedia.org/wiki/Puerto_Madero
- última verificación: 2026-08-26

### Palacio del Congreso
- id: palacio-congreso
- barrio: Balvanera / Monserrat
- lat, lng: -34.6100346, -58.3925879
- place_id: ChIJxVZvzMLKvJURG_3nIH3yI7k
- categoría: historia, arquitectura
- qué contar: Lo empezó a construir el mismo arquitecto que el Teatro Colón, Vittorio Meano, y lo terminó el mismo que lo reemplazó ahí, Jules Dormal — los dos edificios más grandes de la ciudad comparten arquitectos. En la plaza de enfrente hay un monolito desde 1935: el Kilómetro Cero, el punto exacto donde arrancan a medirse todas las rutas nacionales.
- dato de gancho: Todas las rutas del país se miden desde el monolito de esta plaza.
- fuente: https://en.wikipedia.org/wiki/Palace_of_the_Argentine_National_Congress
- última verificación: 2026-08-26

### Cabildo
- id: cabildo
- barrio: Monserrat
- lat, lng: -34.6087606, -58.3737851
- place_id: ChIJiWKwE9PKvJURb6neokWdC4o
- categoría: historia, arquitectura
- qué contar: Fue la sede del gobierno colonial español y el escenario de los debates de la Revolución de Mayo en 1810. Lo construyeron en 1751 con adobe y techo de paja; a fines del 1800 le demolieron partes enteras para ensanchar las avenidas laterales, así que lo que ves hoy es más chico que el original.
- dato de gancho: Le demolieron pedazos enteros al edificio para hacer lugar a las avenidas.
- fuente: https://travelcurious.com/argentina/buenos-aires/attractions/catedral-metropolitana-de-buenos-aires-AHI6L0
- última verificación: 2026-08-27

### Catedral Metropolitana
- id: catedral-metropolitana
- barrio: Monserrat
- lat, lng: -34.6075694, -58.3732574
- place_id: ChIJw1s1NMG5vJURNA2CAhYcYec
- categoría: historia, arquitectura
- qué contar: Por fuera parece un edificio de gobierno neoclásico, con columnas y ningún signo religioso visible — no tiene cúpulas ni campanario. Adentro descansan los restos de José de San Martín, el prócer de la independencia, y ahí ofició misa durante años el cardenal Jorge Bergoglio antes de ser el papa Francisco.
- dato de gancho: Por fuera no parece una iglesia. Adentro descansa el prócer más importante del país.
- fuente: https://www.quieroviajarsola.com/argentina/centro/que-hacer-en-el-centro-de-buenos-aires/
- última verificación: 2026-08-27

### Café Tortoni
- id: cafe-tortoni
- barrio: Monserrat
- lat, lng: -34.6086531, -58.3782121
- place_id: ChIJ01wendHKvJURLcQXvCCCC1I
- categoría: gastronomía, historia
- qué contar: Abrió en 1858, inspirado en los cafés parisinos, y es el más antiguo del país. Por sus mesas de mármol pasaron Borges, Gardel, Einstein y hasta reyes — arriba funciona la Academia Nacional de Tango.
- dato de gancho: En este café tomaron algo Borges, Gardel y Einstein, cada uno por su lado.
- fuente: https://ba-h.com.ar/el-centro-downtown-barrios-de-buenos-aires-argentina/
- última verificación: 2026-08-27

### Palacio Barolo
- id: palacio-barolo
- barrio: Monserrat / Balvanera
- lat, lng: -34.6095914, -58.3858428
- place_id: ChIJW3Va2NrKvJUROiaH5K0ualk
- categoría: arquitectura, anécdota
- qué contar: El arquitecto italiano que lo diseñó se inspiró entero en la Divina Comedia de Dante: el edificio tiene 22 pisos que replican los círculos del infierno, el purgatorio y el paraíso, y termina en un faro arriba de todo. Inaugurado en 1923, fue el edificio más alto de Sudamérica durante años.
- dato de gancho: Este edificio de oficinas está construido siguiendo, piso por piso, la Divina Comedia de Dante.
- fuente: https://www.viajeroscallejeros.com/que-ver-en-buenos-aires/
- última verificación: 2026-08-27

### Mercado de San Telmo y Plaza Dorrego
- id: mercado-san-telmo-dorrego
- barrio: San Telmo
- lat, lng: -34.6193062, -58.37282
- place_id: ChIJ01hQWivLvJURgrAJYmqWsHE
- categoría: gastronomía, historia
- qué contar: La plaza nació en 1783 como pedido de los vecinos para tener un mercado barrial propio; el mercado actual se inauguró en 1897 y hoy es Monumento Histórico Nacional. Desde 1970 los domingos se llena con la feria de antigüedades — más de 250 puestos — que le dio a San Telmo su fama de barrio de anticuarios.
- dato de gancho: Los domingos esta plaza recibe unos 10.000 visitantes por la feria de antigüedades.
- fuente: https://www.elsoldesantelmo.com.ar/historia-de-una-plaza-y-un-mercado/
- última verificación: 2026-08-27

### Estatua de Mafalda
- id: estatua-mafalda
- barrio: San Telmo
- lat, lng: -34.615832, -58.3716461
- place_id: ChIJeRQn1k01o5UR5o5Yb5aJJ5Y
- categoría: arte, anécdota
- qué contar: Está en Chile y Defensa porque a metros de ahí, en Chile 371, vivió Quino, el dibujante que la creó. La sentó sola en el banco cuando se inauguró en 2009, pero como decía que le daba lástima verla sola, poco después se sumaron Susanita y Manolito para hacerle compañía.
- dato de gancho: Mafalda está sentada acá porque a metros de esta esquina vivía Quino, su creador.
- fuente: https://www.infobae.com/cultura/2020/09/30/mafalda-patrona-de-san-telmo/
- última verificación: 2026-08-27

### Puente de la Mujer
- id: puente-de-la-mujer
- barrio: Puerto Madero
- lat, lng: -34.6079845, -58.3651612
- place_id: ChIJbSLzQyk1o5URPBMjt-fRU98
- categoría: arquitectura
- qué contar: Es la primera obra en toda Latinoamérica del arquitecto español Santiago Calatrava. El diseño representa una pareja bailando tango — el mástil blanco es el hombre, la curva es la mujer — y el tramo central gira 90 grados para dejar pasar los barcos que navegan el dique.
- dato de gancho: Este puente gira entero para dejar pasar los barcos, como una escultura con bisagra.
- fuente: https://es.wikipedia.org/wiki/Puente_de_la_Mujer
- última verificación: 2026-08-27

### Jardín Japonés
- id: jardin-japones
- barrio: Palermo
- lat, lng: -34.5746412, -58.4098358
- place_id: ChIJx8VHQXq1vJURH4ffL_cLk_w
- categoría: arte, anécdota
- qué contar: Nació en 1967 como regalo de la comunidad japonesa de Buenos Aires, para celebrar la primera visita de un miembro de la familia imperial japonesa al país: el entonces príncipe Akihito, que después fue emperador. Tiene un puente, cuevas subacuáticas con peces koi y una casa de té traída desde Japón.
- dato de gancho: Este jardín se construyó para la primera visita de un futuro emperador japonés al país.
- fuente: https://es.wikipedia.org/wiki/Jard%C3%ADn_japon%C3%A9s_de_Buenos_Aires
- última verificación: 2026-08-27

### La Bombonera (Estadio Alberto J. Armando)
- id: la-bombonera
- barrio: La Boca
- lat, lng: -34.6356109, -58.3647563
- place_id: ChIJc1RekrY0o5URDbRYiHSypRw
- categoría: historia, anécdota
- qué contar: El arquitecto que la diseñó vio una vez una caja de bombones y notó que tenía la misma forma que su proyecto — desde ahí, todos en la obra empezaron a llamarla "la bombonera", y el apodo quedó para siempre aunque el nombre oficial sea otro. Se inauguró el 25 de mayo de 1940, justo el día del aniversario de River, el clásico rival.
- dato de gancho: El nombre "Bombonera" nació porque a alguien se le pareció a una caja de bombones.
- fuente: https://turismo.buenosaires.gob.ar/es/otros-establecimientos/estadio-de-boca-juniors-la-bombonera
- última verificación: 2026-08-27

### Torre Monumental y Plaza San Martín
- id: torre-monumental-retiro
- barrio: Retiro
- lat, lng: -34.5922006, -58.3737583
- place_id: ChIJMcYzB7XKvJURDiQPXjxCqTU
- categoría: historia, arquitectura
- qué contar: La torre la donó la comunidad británica en 1910 para el centenario de la Revolución de Mayo, y por eso se llamaba "Torre de los Ingleses". Después de la guerra de Malvinas en 1982 la rebautizaron Torre Monumental, aunque muchos porteños todavía la llaman por el nombre viejo.
- dato de gancho: Esta torre cambió de nombre después de una guerra, pero medio barrio la sigue llamando como antes.
- fuente: https://en.wikipedia.org/wiki/Torre_Monumental
- última verificación: 2026-08-27

### Barrio Chino (Belgrano)
- id: barrio-chino-belgrano
- barrio: Belgrano
- lat, lng: -34.557942, -58.4502905
- place_id: ChIJI4BCOM21vJURmZOS0FZ5bM0
- categoría: historia, gastronomía
- qué contar: A pesar del nombre, no lo fundaron inmigrantes chinos sino taiwaneses, que se instalaron en los 80 y abrieron los primeros almacenes vendiendo productos que traían en la valija porque extrañaban el sabor de sus casas. El arco de entrada es un regalo de la comunidad china a la ciudad: lo trajeron en barco desde China y lo armaron en dos días y medio.
- dato de gancho: Este barrio se llama Chino pero lo fundaron inmigrantes taiwaneses en los años 80.
- fuente: https://www.lanacion.com.ar/sociedad/el-origen-taiwanes-del-barrio-chino-de-buenos-aires-la-inmigracion-de-los-80-y-los-comercios-que-le-nid10022024/
- última verificación: 2026-08-27

### Mercado de Abasto
- id: mercado-de-abasto
- barrio: Almagro
- lat, lng: -34.6038802, -58.4109897
- place_id: ChIJP9FLhYzKvJURoUraVMD1DPw
- categoría: historia, arquitectura
- qué contar: Funcionó como mercado central de frutas y verduras de la ciudad desde 1893 hasta 1984, y en esa época todo el barrio vivía alrededor de la lógica de abastecer Buenos Aires — con teatros, circos y fondas para los changarines. Hoy es un shopping, pero conserva la fachada art déco original. Carlos Gardel, "el Morocho del Abasto", se crió a metros de acá.
- dato de gancho: Este shopping fue durante casi un siglo el mercado que alimentaba a toda la ciudad.
- fuente: https://buenosairesconnect.com/carlos-gardel-una-leyenda-francoargentina/
- última verificación: 2026-08-27

### Tumba de Carlos Gardel (Cementerio de la Chacarita)
- id: tumba-gardel-chacarita
- barrio: Chacarita
- lat, lng: -34.5877675, -58.4563446
- place_id: ChIJ0xIi3fy1vJURyNbnwNKbFYA
- categoría: historia, anécdota
- qué contar: El cementerio nació en 1871 en tiempo récord por la epidemia de fiebre amarilla, cuando los cementerios existentes ya no daban abasto. En el mausoleo de Gardel, inaugurado en 1937, sus fans todavía le dejan un cigarrillo prendido entre los dedos de la estatua — de ahí nace la frase "andá a cantarle a Gardel", pedirle un favor a alguien que ya hizo lo imposible.
- dato de gancho: A la estatua de Gardel todavía le prenden un cigarrillo entre los dedos, casi 90 años después.
- fuente: https://www.canal26.com/historia/2025/12/14/los-secretos-de-la-tumba-de-carlos-gardel-en-la-chacarita-el-detalle-de-la-escultura-y-el-ritual-que-se-repite/
- última verificación: 2026-08-27

### Feria de Mataderos
- id: feria-de-mataderos
- barrio: Mataderos
- lat, lng: -34.6625904, -58.5001388
- place_id: ChIJ0_L-pn_JvJUR9F3hqqxX8Yg
- categoría: costumbre, gastronomía
- qué contar: Sólo pasa acá, y sólo domingos y feriados: es la feria de tradiciones populares más grande de la ciudad, inaugurada en 1986 frente al viejo Mercado de Hacienda. Hay jinetes haciendo la sortija a caballo en plena avenida, folclore en vivo y locro — es la cara gaucha de Buenos Aires, a 40 minutos del Obelisco.
- dato de gancho: Los domingos, esta avenida se llena de jinetes haciendo acrobacias a caballo en plena calle.
- fuente: https://www.canal26.com/historia/2026/05/02/en-el-oeste-de-caba-la-feria-donde-cobran-vida-las-tradiciones-argentinas-con-locro-gauchos-y-folklore/
- última verificación: 2026-08-27

### El Zanjón de Granados
- id: el-zanjon-de-granados
- barrio: San Telmo
- lat, lng: -34.6166056, -58.3720675
- place_id: ChIJxWZS0yrLvJUREyl88eDpbeM
- categoría: historia, anécdota
- qué contar: En 1985 un vecino compró esta casa destruida para hacer un restaurante, y cuando arrancó la obra aparecieron 200 metros de túneles bajo tierra. Tardaron casi 20 años en restaurarlo, sin un peso de la ciudad. Algunos historiadores creen que estas mismas barrancas fueron el sitio de la primera fundación de Buenos Aires en 1536, aunque nunca se encontraron los restos de esa ciudad.
- dato de gancho: Un vecino que quería abrir un restaurante encontró 200 metros de túneles bajo su casa.
- fuente: https://buenosairesconnect.com/zanjon-de-granados-el-tunel-del-tiempo/
- última verificación: 2026-08-27

### Floralis Genérica
- id: floralis-generica
- barrio: Recoleta
- lat, lng: -34.5816767, -58.3939805
- place_id: ChIJJVKN0QbLvJURL3F-pxpZUjY
- categoría: arte, curiosidad
- qué contar: Es una flor de acero de 23 metros y 18 toneladas que se abre solita cada mañana a las 8 y se cierra al atardecer, como una flor real reaccionando a la luz. La donó a la ciudad el mismo arquitecto que la diseñó, en 2002. Se queda abierta toda la noche sólo cuatro fechas al año: 25 de mayo, 21 de septiembre, Nochebuena y Nochevieja.
- dato de gancho: Esta flor de acero de 18 toneladas abre y cierra sola, como si fuera de verdad.
- fuente: https://es.wikipedia.org/wiki/Floralis_Gen%C3%A9rica
- última verificación: 2026-08-27

### Reserva Ecológica Costanera Sur
- id: reserva-ecologica-costanera-sur
- barrio: Puerto Madero
- lat, lng: -34.6068644, -58.351956
- place_id: ChIJl9_7lx81o5URTyXCnVNNCgw
- categoría: naturaleza, curiosidad
- qué contar: Estas 350 hectáreas de pastizales y lagunas eran, hasta los 70, un relleno de escombros pensado para nuevos edificios que nunca se construyeron — la naturaleza se fue apropiando sola del terreno hasta que en 1986 la declararon reserva. Hoy conviven acá más de 300 especies de aves a diez minutos a pie del Obelisco.
- dato de gancho: Esta reserva natural era, hace 50 años, un pozo de escombros de la construcción.
- fuente: https://turismo.buenosaires.gob.ar/es/otros-establecimientos/reserva-ecologica-costanera-sur
- última verificación: 2026-08-27

### Museo Nacional de Bellas Artes
- id: museo-bellas-artes
- barrio: Recoleta
- lat, lng: -34.5839894, -58.3930044
- place_id: ChIJQ_bCmaHKvJURfb4aM7hD5Uk
- categoría: arte, gastronomía
- qué contar: Tiene entrada gratis todos los días, algo raro para un museo con Van Gogh, Monet, Rodin y Goya originales colgados en sus salas. Empezó en 1895 en un local de la calle Florida y en 1909 se mudó a este edificio, que originalmente era el pabellón argentino en la Exposición de París de 1889 — lo desarmaron y lo trajeron entero en barco.
- dato de gancho: Este museo funciona en un edificio que originalmente estaba en París, y lo trajeron en barco.
- fuente: https://en.wikipedia.org/wiki/Museo_Nacional_de_Bellas_Artes_(Buenos_Aires)
- última verificación: 2026-08-27

### Rosedal de Palermo
- id: rosedal-de-palermo
- barrio: Palermo
- lat, lng: -34.5706506, -58.4172996
- place_id: ChIJ10xgN561vJURkon23PB48-E
- categoría: naturaleza, historia
- qué contar: Estos jardines eran parte de la quinta del gobernador Juan Manuel de Rosas, hasta que lo derrotaron en la batalla de Caseros de 1852 y le confiscaron las tierras. El mismo paisajista que diseñó el Jardín Botánico armó acá un parque público a propósito, como gesto simbólico contra el pasado autoritario del lugar. Hoy tiene más de 90 variedades de rosas y un puente griego que cruza el lago.
- dato de gancho: Este jardín de rosas era la quinta de un gobernador derrocado en una batalla.
- fuente: https://palermotour.com.ar/tourdenoticias/la-rosa-el-rosedal-de-palermo-toda-la-historia/
- última verificación: 2026-08-27

---

## Pendientes de scrapear

*(el modelo agrega acá lo que buscó en vivo porque no estaba arriba — mismo formato,
listo para pasar a "Puntos cargados" en la próxima limpieza manual o import a Supabase)*

- —

---

## Notas de uso para el modelo

1. **Buscar primero acá.** Match por nombre/alias o por proximidad a `lat, lng` dentro del radio de geofencing.
2. **Si no hay match:** usar Google Places / búsqueda web para el contexto puntual, redactar en voz Yatoor y **agregarlo a "Pendientes de scrapear"** con el mismo formato — no descartar el resultado una vez usado.
3. **No inventar datos verificables** (fechas, nombres propios, cifras). Si la fuente no está clara, marcar `fuente: sin verificar` en vez de afirmar con seguridad.
4. Los 9 puntos cargados ya fueron validados contra fuente (turismo GCBA, Wikipedia, La Nación, Infobae) — cada `fuente:` es la URL real usada. Falta cargar Plaza de Mayo, que quedó sin verificar en esta pasada.
