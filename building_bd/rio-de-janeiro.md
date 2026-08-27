# Río de Janeiro — Contexto Yatoor

> Fuente primaria para el modelo. Misma lógica que `caba.md`: Yatoor busca acá primero
> (por nombre o cercanía a lat/lng dentro del radio de geofencing); sólo si no hay match
> dispara Google Places/web, y el resultado se anota en "Pendientes de scrapear".

- **Ciudad:** Río de Janeiro, Brasil
- **Registro de voz:** el mismo tono cercano de Yatoor (ver `CLAUDE_2.md`), pero el
  contenido es hiperlocal de Río — nada de porteñismos ni referencias a Buenos Aires.
  Si el usuario está en Brasil, considerar tú/você según a quién le habla la app en esa versión.
- **Radio de geofencing:** 50 m
- **Última actualización:** 2026-08-27
- **Formato de coordenadas:** WGS84 (lat, lng)
- **Cobertura de zonas:** Centro/Cinelândia, Lapa, Santa Teresa, Urca, Corcovado, Copacabana, Ipanema, Maracanã, Catete/Flamengo, São Cristóvão, Zona Portuária/Saúde, Alto da Boa Vista. Pendientes: Botafogo, Barra da Tijuca.
- **Categorías cubiertas:** historia, arquitectura, arte, anécdota, gastronomía, costumbre (ferias semanales), naturaleza/parques.

---

## Formato por punto

Igual al de `caba.md`: id, barrio, lat/lng, categoría, qué contar, dato de gancho, fuente, última verificación.

---

## Puntos cargados

### Cristo Redentor
- id: cristo-redentor
- barrio: Corcovado (Parque Nacional da Tijuca)
- lat, lng: -22.951916, -43.2104872
- place_id: ChIJP6FKmNV_mQAR3gKVAdeEyZ0
- categoría: historia, arquitectura
- qué contar: Antes de instalarse en el Corcovado, el monumento estuvo a punto de construirse en el Pan de Azúcar. Lo esculpió en Francia Paul Landowski, que nunca llegó a pisar Brasil ni a ver la obra terminada en su lugar: la cara sola se armó en 50 piezas separadas, y las manos en 8, para poder subirlas por partes hasta la cima.
- dato de gancho: El escultor que lo hizo nunca vino a Río a verlo terminado.
- fuente: https://comandantenobre.com.br/a-historia-do-cristo-redentor/
- última verificación: 2026-08-27

### Pão de Açúcar y Bondinho
- id: pao-de-acucar
- barrio: Urca
- lat, lng: -22.9557706, -43.1669827
- place_id: ChIJRT3BUBqAmQAR1QC7ISuAbV8
- categoría: historia, arquitectura
- qué contar: El teleférico se inauguró en 1912 y fue el tercero del mundo — el primero de todo Brasil. Un ingeniero brasileño soñó con conectar los dos morros después de ver la idea en una exposición de 1908; en la época no había tecnología local para fabricar cables de ese porte, así que las piezas vinieron enteras desde Alemania.
- dato de gancho: Este teleférico de 1912 fue el tercero del mundo, con piezas traídas desde Alemania.
- fuente: https://www.rodrigoindiotours.com.br/post/bondinho-do-p%C3%83%C2%A3o-de-a%C3%83%C2%A7%C3%83%C2%BAcar-hist%C3%83%C2%B3ria-curiosidades-e-dicas-para-sua-visita
- última verificación: 2026-08-27

### Escadaria Selarón
- id: escadaria-selaron
- barrio: Lapa / Santa Teresa
- lat, lng: -22.9152923, -43.1792036
- place_id: ChIJXWj-VXt_mQARNSwlewQeAXY
- categoría: arte, anécdota
- qué contar: Un artista chileno, cansado de ver los escalones frente a su casa en mal estado, empezó a cubrirlos de a poco con azulejos de colores en 1990 — al principio los vecinos se reían de las combinaciones. Terminó convirtiéndose en su obra de toda la vida: hoy tiene más de 2.000 azulejos de más de 60 países, muchos donados por turistas. En 2013 lo encontraron muerto ahí mismo, en su escalera, y nunca se aclaró del todo qué pasó.
- dato de gancho: El artista que armó esta escalera murió en ella, sin resolverse nunca del todo cómo.
- fuente: https://pt.wikipedia.org/wiki/Escadaria_Selar%C3%B3n
- última verificación: 2026-08-27

### Arcos da Lapa
- id: arcos-da-lapa
- barrio: Lapa
- lat, lng: -22.9126382, -43.1798573
- place_id: ChIJV30alGR_mQARXw03wD-LgiI
- categoría: historia, arquitectura
- qué contar: Es un acueducto colonial construido para traer agua del río Carioca hasta el centro de la ciudad, terminado en 1747. Hoy ya no lleva agua: por arriba pasa el tranvía amarillo de Santa Teresa, y por abajo es el corazón de la vida nocturna carioca.
- dato de gancho: Este acueducto de 1747 hoy no lleva agua — lleva el tranvía y la noche de Lapa.
- fuente: https://umpouquinhodecadalugar.com/brasil/historia-e-boemia-no-centro-do-rio-de-janeiro/
- última verificación: 2026-08-27

### Theatro Municipal
- id: theatro-municipal
- barrio: Cinelândia / Centro
- lat, lng: -22.9090481, -43.1765575
- place_id: ChIJUSQw7WF_mQARQKXFPmK9_6A
- categoría: arquitectura, arte
- qué contar: Se inauguró en 1909 inspirado directamente en la Ópera de París. El concurso para diseñarlo lo ganaron dos proyectos empatados — uno de ellos, curiosamente, presentado por el hijo del intendente que organizó el concurso — así que terminaron fusionando los dos diseños en uno solo.
- dato de gancho: Este teatro nació de fusionar dos proyectos rivales, uno de ellos del hijo del intendente.
- fuente: https://pt.wikipedia.org/wiki/Theatro_Municipal_do_Rio_de_Janeiro
- última verificación: 2026-08-27

### Confeitaria Colombo
- id: confeitaria-colombo
- barrio: Centro
- lat, lng: -22.9051966, -43.1787459
- place_id: ChIJSWWrd15_mQAR2sYl5o7xsoE
- categoría: gastronomía, historia
- qué contar: La abrieron en 1894 dos inmigrantes portugueses, con una arquitectura inspirada en los cafés europeos que representaba el estilo belle époque que Río quería tener en esa época. Está considerada una de las diez confiterías más lindas del mundo.
- dato de gancho: Esta confitería de 1894 fue elegida una de las diez más lindas del mundo.
- fuente: https://en.wikipedia.org/wiki/Confeitaria_Colombo
- última verificación: 2026-08-27

### Calçadão de Copacabana
- id: calcadao-copacabana
- barrio: Copacabana
- lat, lng: -22.9671418, -43.1771158
- place_id: ChIJFYqU9VTVmwARsTnoymTrfUc
- categoría: arquitectura, anécdota
- qué contar: El diseño de olas en blanco y negro está inspirado en un mosaico de una plaza de Lisboa, que representa el encuentro del río Tajo con el océano Atlántico. Se instaló en 1906 con piedras traídas de Portugal, y hasta hoy Río tiene un equipo de trabajadores especializados sólo en mantener ese empedrado.
- dato de gancho: El dibujo de olas de esta vereda es una copia de una plaza de Lisboa.
- fuente: https://blog.stripme.com.br/a-calcada-de-copacabana-e-a-garota-de-ipanema/
- última verificación: 2026-08-27

### Ipanema — esquina de "Garota de Ipanema"
- id: garota-de-ipanema
- barrio: Ipanema
- lat, lng: -22.9851939, -43.1977855
- place_id: ChIJG63wZxfVmwARm8hScVYMzB0
- categoría: arte, anécdota
- qué contar: Vinícius de Moraes y Tom Jobim se sentaban en un bar de esta cuadra a mirar pasar a una chica de 17 años camino a la playa, y de esa costumbre nació la canción bossa nova más grabada de la historia. Se presentó en público por primera vez en 1962, en un boliche a una cuadra de acá.
- dato de gancho: La canción brasileña más grabada de la historia nació de mirar pasar a alguien por esta cuadra.
- fuente: https://es.wikipedia.org/wiki/Garota_de_Ipanema
- última verificación: 2026-08-27

### Estádio do Maracanã
- id: maracana
- barrio: Maracanã
- lat, lng: -22.9121465, -43.230189
- place_id: ChIJDYuIul1-mQAR5XRi7ogx8_U
- categoría: historia, anécdota
- qué contar: Se inauguró para el Mundial de 1950, que Brasil organizó convencido de que lo iba a ganar de local — perdió la final contra Uruguay frente a casi 200.000 personas, en lo que se conoce como "Maracanazo", una herida que tardó décadas en cerrar. Volvió a ser sede mundialista en 2014 y de los Juegos Olímpicos en 2016.
- dato de gancho: Este estadio se construyó para un Mundial que Brasil dio por ganado y perdió en la final, de local.
- fuente: https://www.civitatis.com/es/rio-de-janeiro/estadio-maracana/
- última verificación: 2026-08-27

### Palácio do Catete (Museu da República)
- id: palacio-do-catete
- barrio: Catete / Flamengo
- lat, lng: -22.9259013, -43.1763666
- place_id: ChIJUTDHPoB_mQARATxqvy10AFQ
- categoría: historia, anécdota
- qué contar: Fue la sede de la presidencia de Brasil durante 63 años, hasta que la capital se mudó a Brasilia en 1960. Ahí mismo, en 1954, el presidente Getúlio Vargas se suicidó de un tiro en el pecho después de que su propio gabinete le pidiera la renuncia — dejó una carta que causó tanta conmoción que terminó reforzando su figura en vez de hundirla.
- dato de gancho: En este palacio un presidente se suicidó después de que le pidieran la renuncia, y eso lo volvió más popular.
- fuente: https://pt.wikipedia.org/wiki/Pal%C3%A1cio_do_Catete
- última verificación: 2026-08-27

### Feira de São Cristóvão
- id: feira-de-sao-cristovao
- barrio: São Cristóvão
- lat, lng: -22.8976512, -43.2202037
- place_id: ChIJZ84ogXx_mQARfgVX5YjfTiE
- categoría: costumbre, gastronomía
- qué contar: Nació en 1945 cuando los migrantes del nordeste brasileño, que llegaban a Río a trabajar en la construcción, empezaron a juntarse acá los fines de semana para comer y escuchar la música de su tierra. Hoy es Patrimonio Cultural del estado — más de 700 puestos de forró en vivo, cordel y comida nordestina, casi sin turistas.
- dato de gancho: Esta feria nació porque los obreros que construían Río extrañaban la comida de su tierra.
- fuente: https://www.brasildefato.com.br/2023/11/09/feira-nordestina-de-sao-cristovao-se-torna-patrimonio-historico-cultural-e-gastronomico-do-rio/
- última verificación: 2026-08-27

### Feira Hippie de Ipanema
- id: feira-hippie-ipanema
- barrio: Ipanema
- lat, lng: -22.9851939, -43.1977855
- place_id: ChIJG63wZxfVmwARm8hScVYMzB0
- categoría: costumbre, arte
- qué contar: Funciona todos los domingos desde 1968, cuando un pintor empezó a exponer acá y sus amigos de la contracultura se le fueron sumando. Con los años pasaron por sus puestos Janis Joplin y otros ídolos de paso por Río — hoy son más de 700 puestos de arte y artesanía hecha a mano, declarados patrimonio cultural inmaterial de la ciudad.
- dato de gancho: Esta feria de arte nació en los 60 cuando un pintor empezó a exponer solo, y hasta Janis Joplin pasó por acá.
- fuente: https://www.multirio.rj.gov.br/index.php/reportagens/2977-feira-hippie-de-ipanema-um-patrimonio-do-rio
- última verificación: 2026-08-27

### Cais do Valongo
- id: cais-do-valongo
- barrio: Saúde / Zona Portuária
- lat, lng: -22.8966195, -43.1871808
- place_id: ChIJ20PGW0R_mQARndLz32u6U5A
- categoría: historia
- qué contar: Es el sitio arqueológico más importante de la diáspora africana en América: por este muelle de 1811 desembarcaron cerca de un millón de personas esclavizadas, más que en cualquier otro puerto del continente. Estuvo enterrado bajo capas de relleno durante más de un siglo hasta que las obras del Puerto Maravilha, antes de los Juegos Olímpicos de 2016, lo sacaron a la luz. La UNESCO lo declaró Patrimonio de la Humanidad en 2017.
- dato de gancho: Bajo esta plaza estuvo enterrado, sin que nadie lo supiera, el puerto de esclavos más grande de América.
- fuente: https://pt.wikipedia.org/wiki/Cais_do_Valongo
- última verificación: 2026-08-27

### Floresta da Tijuca
- id: floresta-da-tijuca
- barrio: Alto da Boa Vista
- lat, lng: -22.9560998, -43.2799308
- place_id: ChIJ4zqbyNV_mQAR_BSfApu9sEY
- categoría: naturaleza, historia
- qué contar: Es la selva urbana replantada más grande del mundo, y más antigua como área protegida que Yellowstone. En el siglo XIX la habían desmontado entera para plantar café; cuando eso secó las fuentes de agua de la ciudad, el emperador Pedro II ordenó reforestarla a mano — el trabajo empezó con once personas esclavizadas que plantaron los primeros árboles.
- dato de gancho: Este bosque entero fue plantado a mano en el siglo XIX, para salvar el agua de la ciudad.
- fuente: https://parquenacionaldatijuca.rio/historia-do-parque-nacional-da-tijuca/
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
4. Los 14 puntos cargados salieron de research real (Wikipedia PT/ES, sitios de turismo especializado, IPHAN) — cada `fuente:` es la URL usada. Falta Botafogo y Barra da Tijuca.
