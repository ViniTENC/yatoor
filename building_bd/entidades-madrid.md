# Madrid — Entidades y grafo de relaciones

> Complementa a `madrid.md`. Mismo espíritu: research real, nunca de memoria, voz Yatoor.
> Una **entidad** es una persona, institución, evento o concepto que sale mencionado dentro
> del `qué contar` de un POI (nivel 2) o dentro del contenido de otra entidad (nivel 3, y así).
> El objetivo: que un POI "desbloquee" otros temas — y a veces otro POI en la otra punta de
> la ciudad — sin escribir contenido geolocalizado nuevo. Ver `CLAUDE_2.md` para el porqué.

- **Ciudad:** Madrid, España
- **Registro de voz:** tú (igual que `madrid.md`)
- **Última actualización:** 2026-09-01

---

## Formato por entidad

- id: slug único, ej. `alfonso-xiii`
- tipo: `persona` | `institucion` | `concepto` | `evento`
- nivel: `2` (sale directo de un POI) | `3` (sale de otra entidad)
- nombre
- contenido: en voz Yatoor
- dato de gancho
- fuente
- última verificación
- conecta con: ids de POIs o entidades relacionadas (ver también sección "Relaciones" al final)

---

## Nivel 2 — entidades que salen directo de un POI

### Alfonso XIII
- id: alfonso-xiii
- tipo: persona
- nivel: 2
- conecta con: poi:gran-via
- contenido: Fue proclamado rey el mismo día que nació, en 1886, en este mismo Palacio Real — y gobernó bajo la regencia de su madre hasta los 16 años. Sobrevivió a tres atentados, el más grave el día de su boda, cuando un anarquista escondió una bomba en un ramo de flores y mató a once personas frente a su carruaje. En 1931, con la Segunda República ya proclamada, se fue de España sin abdicar formalmente. Murió en Roma diez años después.
- dato de gancho: El rey que abrió la Gran Vía nació rey: lo proclamaron el mismo día de su nacimiento.
- fuente: https://es.wikipedia.org/wiki/Alfonso_XIII_de_Espa%C3%B1a
- última verificación: 2026-09-01

### Felipe III
- id: felipe-iii
- tipo: persona
- nivel: 2
- conecta con: poi:plaza-mayor
- contenido: Fue quien ordenó construir la Plaza Mayor en 1617, pensada como un espacio único de representación para una ciudad que recién unas décadas antes se había vuelto capital del reino — mercados, fiestas y ceremonias oficiales, todo en el mismo lugar. Su estatua ecuestre, en el centro de la plaza, es en realidad un regalo de un duque italiano — y la bajaron dos veces de su pedestal, en 1873 y 1931, cada vez que se proclamaba una República.
- dato de gancho: La estatua del rey que mandó construir esta plaza fue derribada dos veces, cada vez que España se declaró república.
- fuente: https://artsandculture.google.com/story/0gUhPKgSCOESKg?hl=es
- última verificación: 2026-09-01

### La Inquisición española
- id: inquisicion-espanola
- tipo: institucion
- nivel: 2
- conecta con: poi:plaza-mayor
- contenido: Cuando había un auto de fe grande, la Plaza Mayor se transformaba en teatro: armaban tarimas, jaulas para los acusados y un balcón real para que la familia real mirara desde arriba. El más multitudinario de todos fue en 1680: 118 personas juzgadas en un solo día, 21 condenadas a morir quemadas. El cuadro que retrata esa escena, pintado tres años después, hoy cuelga en el Museo del Prado — a quince minutos caminando de donde pasó todo.
- dato de gancho: El cuadro que retrata el auto de fe más grande de esta plaza está colgado a quince minutos caminando de acá.
- fuente: https://www.museodelprado.es/coleccion/obra-de-arte/auto-de-fe-en-la-plaza-mayor-de-madrid/8d92af03-3183-473a-9997-d9cbf2557462
- última verificación: 2026-09-01

### Felipe V
- id: felipe-v
- tipo: persona
- nivel: 2
- conecta con: poi:palacio-real
- contenido: Era nieto del rey de Francia y el primer Borbón en gobernar España — y nunca se sintió cómodo en el viejo Alcázar de los Austrias: le parecía oscuro y anticuado comparado con Versalles, donde había nacido. Cuando se incendió en 1734 mandó demoler lo poco que quedaba en pie para construir el Palacio Real de cero, con piedra en vez de madera, justamente para que no se volviera a quemar.
- dato de gancho: Al rey que construyó este palacio no le gustaba el edificio anterior — y algunos todavía sospechan que el incendio no fue casualidad.
- fuente: https://www.investigart.com/2016/04/25/el-incendio-del-alcazar-de-madrid-en-la-nochebuena-de-1734/
- última verificación: 2026-09-01

### Diego Velázquez
- id: diego-velazquez
- tipo: persona
- nivel: 2
- conecta con: poi:palacio-real, poi:museo-del-prado
- contenido: Fue pintor de cámara del rey Felipe IV durante más de treinta años, y su obra maestra, Las Meninas, la pintó en 1656 dentro del propio Alcázar — en el mismo cuarto que después ardería en el incendio de 1734. Se autorretrató en el cuadro, pincel en mano, mirando hacia donde estarían el rey y la reina: una de las primeras veces que un pintor se puso a sí mismo como protagonista de una escena real.
- dato de gancho: Se pintó a sí mismo pintando al rey, en el mismo cuarto que después se incendió.
- fuente: https://es.wikipedia.org/wiki/Las_meninas
- última verificación: 2026-09-01

### Manuela Malasaña
- id: manuela-malasana
- tipo: persona
- nivel: 2
- conecta con: poi:malasana-dos-de-mayo
- contenido: Tenía 17 años y era bordadora. La versión más repetida dice que las tropas francesas la pararon de vuelta a su casa, el 2 de mayo de 1808, y la encontraron con las tijeras de su oficio — que tomaron como arma. La fusilaron ese mismo día. Su cuerpo quedó registrado con el número 74 entre las más de 400 víctimas de esa jornada, en documentos que todavía se conservan en los archivos de Madrid.
- dato de gancho: Su cuerpo quedó anotado con el número 74 en una lista de más de 400 víctimas que todavía se puede consultar.
- fuente: https://es.wikipedia.org/wiki/Manuela_Malasa%C3%B1a
- última verificación: 2026-09-01

### La Movida madrileña
- id: movida-madrilena
- tipo: evento
- nivel: 2
- conecta con: poi:malasana-dos-de-mayo
- contenido: Arrancó, según la fecha que todos citan, el 9 de febrero de 1980, con un concierto homenaje a un baterista que acababa de morir. De ahí salieron bandas como Mecano y Alaska, y cineastas como Almodóvar — y Malasaña fue la base, aunque las noches también se estiraban hacia Chueca y Gran Vía. Duró apenas seis años en su momento más fuerte, pero definió cómo Madrid se ve a sí misma hasta hoy.
- dato de gancho: El movimiento que definió a Madrid duró apenas seis años y arrancó con un homenaje a un baterista.
- fuente: https://www.telemadrid.es/programas/la-movida/Descubre-curiosidades-Movida-madrilena-0-2202079778--20200206062137.html
- última verificación: 2026-09-01

### Manuel Azaña
- id: manuel-azana
- tipo: persona
- nivel: 2
- conecta con: poi:palacio-de-cristal-retiro
- contenido: Antes de ser político fue escritor y traductor. Fue jefe de Gobierno durante los primeros años de la Segunda República, y en 1936 lo eligieron presidente ahí mismo, en el Palacio de Cristal, porque el Congreso no tenía lugar para toda la asamblea que tenía que votar. Terminó exiliado en Francia al final de la Guerra Civil, y murió ahí en 1940 sin volver a pisar España.
- dato de gancho: Lo hicieron presidente en un invernadero de plantas porque el Congreso se había quedado chico.
- fuente: https://es.wikipedia.org/wiki/Manuel_Aza%C3%B1a
- última verificación: 2026-09-01

### La Campaña de Nubia (UNESCO)
- id: campana-nubia-unesco
- tipo: evento
- nivel: 2
- conecta con: poi:templo-de-debod
- contenido: Cuando Egipto empezó a construir la presa de Asuán en los años 60, decenas de templos milenarios iban a quedar bajo el agua para siempre — incluido el mundialmente famoso Abu Simbel. La UNESCO organizó un rescate internacional: desarmar los templos piedra por piedra y mudarlos. Solo cuatro países ayudaron lo suficiente como para llevarse uno de regalo: España se quedó con Debod, y Estados Unidos, Italia y Países Bajos con otros tres.
- dato de gancho: Solo cuatro países del mundo tienen un templo egipcio real como agradecimiento — España es uno.
- fuente: https://www.barcelo.com/guia-turismo/es/espana/madrid/que-ver/templo-debod-madrid/
- última verificación: 2026-09-01

### Felipe II
- id: felipe-ii
- tipo: persona
- nivel: 2
- conecta con: poi:casa-siete-chimeneas
- contenido: Fue el rey que trasladó la corte a Madrid en 1561, convirtiendo una villa chica en la capital de un imperio donde, según la frase que le atribuyen, no se ponía el sol. Con el poder que tenía, la leyenda de la Casa de las Siete Chimeneas no suena tan descabellada: un rey acostumbrado a que nadie le dijera que no.
- dato de gancho: El rey de la leyenda de esta casa es el mismo que convirtió a Madrid en capital de un imperio.
- fuente: https://es.wikipedia.org/wiki/Real_Alc%C3%A1zar_de_Madrid
- última verificación: 2026-09-01

### El Kilómetro Cero
- id: kilometro-cero
- tipo: concepto
- nivel: 2
- conecta con: poi:puerta-del-sol
- contenido: Es el punto exacto, marcado desde 1950, desde donde se miden las seis carreteras radiales que salen de Madrid hacia el resto de España — la N-I, la N-II, y así. No es solo una placa curiosa: hasta hoy, cualquier distancia oficial en carretera española a Madrid se cuenta desde acá, desde esta vereda.
- dato de gancho: Cualquier cartel de carretera que dice "Madrid, tantos km" se mide desde esta placa exacta.
- fuente: https://es.wikipedia.org/wiki/Puerta_del_Sol
- última verificación: 2026-09-01

### La Real Casa de Correos
- id: casa-de-correos
- tipo: institucion
- nivel: 2
- conecta con: poi:puerta-del-sol
- contenido: Es el edificio más viejo de la Puerta del Sol, de finales del siglo XVIII, y hoy funciona como sede del gobierno de la Comunidad de Madrid. Pero lo que lo hizo famoso fue su reloj, donado en 1866 por un relojero — no es un reloj cualquiera: sus campanadas de fin de año se televisan sin cortes desde 1962, ininterrumpidamente.
- dato de gancho: El reloj de este edificio lleva más de 60 años sin faltar a una sola Nochevieja en la televisión.
- fuente: https://es.wikipedia.org/wiki/Real_Casa_de_Correos
- última verificación: 2026-09-01

### Las doce uvas de la suerte
- id: doce-uvas-nochevieja
- tipo: evento
- nivel: 2
- conecta con: poi:puerta-del-sol
- contenido: La versión que más se repite dice que nació en 1909, cuando los viticultores del Levante español tuvieron una cosecha tan grande que no sabían qué hacer con el excedente — y la regalaron para Nochevieja, inventando sobre la marcha que traía suerte comer una uva por campanada. Un siglo después, la costumbre se volvió nacional.
- dato de gancho: La tradición de las doce uvas nació, literalmente, porque sobraba mucha uva un año.
- fuente: https://www.esmadrid.com/agenda/nochevieja-puerta-del-sol
- última verificación: 2026-09-01

### La Mariblanca
- id: mariblanca
- tipo: concepto
- nivel: 2
- conecta con: poi:oso-madrono
- contenido: Es la estatua más viajera de Madrid: la trajeron de Italia en 1625 para coronar una fuente que ya no existe, y en cuatro siglos cambió de lugar más de una vez — hasta pasó años guardada en un depósito municipal por obras del metro. Nadie se pone de acuerdo en quién representa exactamente: unos dicen que es Venus, otros que es una alegoría de la Fe. Lo que sí es seguro es que el nombre viene del color blanco de su mármol.
- dato de gancho: Nadie se pone de acuerdo en si esta estatua representa a Venus o a la Fe — llevan cuatro siglos discutiéndolo.
- fuente: https://es.wikipedia.org/wiki/Estatua_y_fuentes_de_la_Mariblanca
- última verificación: 2026-09-01

### El Matadero Viejo de la Villa
- id: matadero-viejo-de-la-villa
- tipo: institucion
- nivel: 2
- conecta con: poi:el-rastro
- contenido: Fue el primer matadero municipal de Madrid, instalado en 1496 cerca de donde hoy está la Plaza de Cascorro. Alrededor se instalaron curtidores, zapateros y fabricantes de velas de sebo — todo lo que se podía hacer con lo que sobraba de un animal faenado. El matadero se mudó de lugar hace mucho, pero el barrio nunca dejó de vivir del comercio de segunda mano que arrancó a su alrededor.
- dato de gancho: Todo el barrio de comercio de segunda mano de hoy nació como el vecindario de un matadero de 1496.
- fuente: https://es.wikipedia.org/wiki/El_Rastro_de_Madrid
- última verificación: 2026-09-01

---

## Nivel 3 — entidades que salen de otra entidad (y a veces vuelven a un POI)

### La Casa de Borbón
- id: casa-de-borbon
- tipo: institucion
- nivel: 3
- conecta con: entidad:felipe-v, entidad:alfonso-xiii
- contenido: Es la dinastía que sigue en el trono español hoy. Empezó con Felipe V en 1700, el mismo que construyó el Palacio Real después del incendio del Alcázar; dos siglos después Alfonso XIII, bisabuelo del rey Felipe VI, seguía siendo de la misma familia cuando abrió la Gran Vía. Entre uno y otro, la dinastía sobrevivió guerras, una invasión francesa y una república.
- dato de gancho: La misma familia real conecta el Palacio Real con la Gran Vía, a doscientos años de distancia.
- fuente: https://amcselekt.es/blog/canal-historia/perfiles/alfonso-xiii
- última verificación: 2026-09-01

### La Segunda República española
- id: segunda-republica-espanola
- tipo: evento
- nivel: 3
- conecta con: entidad:manuel-azana, entidad:alfonso-xiii
- contenido: Se proclamó en 1931 apenas se fue Alfonso XIII, y duró hasta el final de la Guerra Civil en 1939. Manuel Azaña fue su presidente más conocido, elegido justamente en el Palacio de Cristal del Retiro. Es uno de esos casos donde dos POIs de Yatoor que están a varios kilómetros — la Gran Vía y el Retiro — terminan hablando del mismo momento histórico desde ángulos opuestos: uno el rey que se fue, el otro el presidente que llegó.
- dato de gancho: El rey que se fue y el presidente que llegó están conectados por el mismo momento — y por dos POIs a kilómetros de distancia.
- fuente: https://es.wikipedia.org/wiki/Manuel_Aza%C3%B1a
- última verificación: 2026-09-01

### La Guerra de la Independencia española
- id: guerra-de-la-independencia-espanola
- tipo: evento
- nivel: 3
- conecta con: entidad:manuela-malasana
- contenido: Empezó, para casi todos los madrileños, el mismo 2 de mayo de 1808 en que murió Manuela Malasaña: ese día el pueblo se levantó contra las tropas de Napoleón, que llevaban meses ocupando la ciudad con la excusa de pasar hacia Portugal. La represión francesa dejó más de 400 muertos en Madrid en una sola jornada — Malasaña fue solo una de ellas, pero la que quedó como símbolo.
- dato de gancho: La guerra que después duró seis años empezó el mismo día en que mataron a la costurera del barrio.
- fuente: https://es.wikipedia.org/wiki/Manuela_Malasa%C3%B1a
- última verificación: 2026-09-01

### La Casa de Austria (los Habsburgo españoles)
- id: casa-de-austria
- tipo: institucion
- nivel: 3
- conecta con: entidad:felipe-ii, entidad:felipe-iii
- contenido: Fue la dinastía que gobernó España antes de los Borbones, desde Carlos V hasta Carlos II. Felipe II trajo la corte a Madrid; su hijo Felipe III construyó la Plaza Mayor unos años después. Toda la Plaza Mayor y buena parte del Madrid de los Austrias — el barrio, no por casualidad — es herencia directa de esta familia.
- dato de gancho: El barrio que hoy caminás con ese nombre le debe el nombre a esta misma dinastía.
- fuente: https://es.wikipedia.org/wiki/Real_Alc%C3%A1zar_de_Madrid
- última verificación: 2026-09-01

### El Siglo de Oro español
- id: siglo-de-oro-espanol
- tipo: concepto
- nivel: 3
- conecta con: entidad:diego-velazquez, poi:barrio-de-las-letras-cervantes
- contenido: Es como se le dice al momento de mayor esplendor artístico y literario de España, entre finales del 1500 y buena parte del 1600 — la misma época en que Velázquez pintaba en la corte y Cervantes escribía a pocas cuadras de acá, en lo que hoy es el Barrio de las Letras. Los dos vivieron en Madrid casi al mismo tiempo, aunque nunca hay registro de que se hayan cruzado.
- dato de gancho: El pintor de Las Meninas y el autor de El Quijote vivieron en el mismo Madrid, casi al mismo tiempo, y nunca sabemos si se cruzaron.
- fuente: https://historia.nationalgeographic.com.es/a/diego-velazquez-gran-maestro-pintura-barroca-espanola_18042
- última verificación: 2026-09-01

---

## Relaciones (grafo completo)

*(from_type, from_id, to_type, to_id — mismo criterio que la tabla `relaciones` de `schema.sql`)*

```
poi      gran-via                        entidad  alfonso-xiii
poi      plaza-mayor                     entidad  felipe-iii
poi      plaza-mayor                     entidad  inquisicion-espanola
poi      palacio-real                    entidad  felipe-v
poi      palacio-real                    entidad  diego-velazquez
poi      museo-del-prado                 entidad  diego-velazquez
poi      malasana-dos-de-mayo            entidad  manuela-malasana
poi      malasana-dos-de-mayo            entidad  movida-madrilena
poi      palacio-de-cristal-retiro       entidad  manuel-azana
poi      templo-de-debod                 entidad  campana-nubia-unesco
poi      casa-siete-chimeneas            entidad  felipe-ii
poi      puerta-del-sol                  entidad  kilometro-cero
poi      puerta-del-sol                  entidad  casa-de-correos
poi      puerta-del-sol                  entidad  doce-uvas-nochevieja
poi      oso-madrono                     entidad  mariblanca
poi      el-rastro                       entidad  matadero-viejo-de-la-villa

entidad  alfonso-xiii                    entidad  casa-de-borbon
entidad  felipe-v                        entidad  casa-de-borbon
entidad  alfonso-xiii                    entidad  segunda-republica-espanola
entidad  manuel-azana                    entidad  segunda-republica-espanola
entidad  manuela-malasana                entidad  guerra-de-la-independencia-espanola
entidad  felipe-ii                       entidad  casa-de-austria
entidad  felipe-iii                      entidad  casa-de-austria
entidad  diego-velazquez                 entidad  siglo-de-oro-espanol
entidad  siglo-de-oro-espanol            poi      barrio-de-las-letras-cervantes
```

**Caminos de ejemplo que arma este grafo:**
- Gran Vía → Alfonso XIII → Casa de Borbón → Felipe V → **Palacio Real** (dos POIs lejanos, misma dinastía).
- Gran Vía → Alfonso XIII → Segunda República → Manuel Azaña → **Palacio de Cristal (Retiro)** (rey que se va, presidente que llega).
- Palacio Real → Velázquez → Siglo de Oro → **Barrio de las Letras (Cervantes)** (dos genios contemporáneos, dos puntos del mapa).
- Casa de las Siete Chimeneas → Felipe II → Casa de Austria → Felipe III → **Plaza Mayor** (misma dinastía, un siglo de diferencia).

---

## Pendientes

- Mercado de San Miguel quedó sin entidad propia: su contenido (mercados de hierro de moda
  parisina, reconversión gourmet en 2009) no abrió un sub-tema nuevo con suficiente peso propio
  para justificar una entidad separada — se prefirió no forzarlo.
- Mismo criterio para Río de Janeiro y CABA: quedan pendientes, en commits separados.
