# Río de Janeiro — Entidades y grafo de relaciones

> Complementa a `rio-de-janeiro.md`. Mismo criterio que `entidades-madrid.md`:
> research real, nunca de memoria, voz Yatoor. No se fuerza un branching factor fijo —
> algunas entidades tienen varias conexiones, otras quedan como nodo final (leaf), y eso
> está bien: lo que importa es que cada conexión sea real y verificable, no completar un árbol.

- **Ciudad:** Río de Janeiro, Brasil
- **Registro de voz:** igual que `rio-de-janeiro.md`
- **Última actualización:** 2026-09-01

---

## Nivel 2 — entidades que salen directo de un POI

### Paul Landowski
- id: paul-landowski
- tipo: persona
- nivel: 2
- conecta con: poi:cristo-redentor
- contenido: Fue un escultor francés de origen polaco que nunca pisó Brasil ni vio el Cristo Redentor terminado en el Corcovado — todo lo esculpió y ensambló en su taller de París, en piezas, antes de mandarlo desarmado a Río. Era descreído, no religioso, y en sus diarios describía la fe como algo que el hombre inventa para encontrarse a sí mismo. Aun así, terminó creando uno de los símbolos religiosos más grandes del mundo.
- dato de gancho: El escultor de este Cristo no era creyente, y nunca lo vio terminado en su lugar.
- fuente: https://alfayomega.es/el-cristo-del-corcovado-y-un-escultor-de-talento/
- última verificación: 2026-09-01

### Jorge Selarón
- id: jorge-selaron
- tipo: persona
- nivel: 2
- conecta con: poi:escadaria-selaron
- contenido: Era un pintor y ceramista chileno de Limache que llegó a Río en 1983 y, sin mucha plata para arrancar su carrera, empezó a decorar la escalera al lado de su casa con azulejos que juntaba de la basura o de obras vecinas. Los últimos meses de su vida los pasó amenazado de muerte por un excolaborador al que había dejado de darle ganancias de la venta de sus cuadros — y apareció muerto en su propia escalera en enero de 2013, con quemaduras que la policía nunca terminó de explicar del todo.
- dato de gancho: Empezó la escalera juntando azulejos de la basura porque no tenía plata — hoy tiene piezas de más de 60 países.
- fuente: https://es.wikipedia.org/wiki/Jorge_Selar%C3%B3n
- última verificación: 2026-09-01

### Vinícius de Moraes y Tom Jobim
- id: vinicius-e-tom-jobim
- tipo: persona
- nivel: 2
- conecta con: poi:garota-de-ipanema
- contenido: Vinícius era poeta, diplomático y letrista; Tom Jobim, pianista y compositor. Se juntaban en un bar de Ipanema — hoy rebautizado con el nombre de la canción — y de ahí salió buena parte del repertorio que inventó la bossa nova, un género que mezcló samba con jazz y que terminó influenciando a Estados Unidos más de lo que la gente cree. "Garota de Ipanema" ganó un Grammy a grabación del año en 1965 y sigue siendo, después de "Yesterday" de los Beatles, una de las canciones más versionadas de la historia.
- dato de gancho: La canción que escribieron en este bar es, según algunos conteos, la segunda más versionada de la historia después de "Yesterday".
- fuente: https://es.wikipedia.org/wiki/Garota_de_Ipanema
- última verificación: 2026-09-01

### Getúlio Vargas
- id: getulio-vargas
- tipo: persona
- nivel: 2
- conecta con: poi:palacio-do-catete
- contenido: Gobernó Brasil diecinueve años en total, primero como dictador entre 1930 y 1945, después como presidente electo entre 1951 y 1954. Impulsó leyes laborales que todavía existen — salario mínimo, vacaciones pagas — y por eso le decían "padre de los pobres". Cuando la presión política se volvió insostenible en 1954, se pegó un tiro en el corazón en su dormitorio del Palácio do Catete y dejó una carta que terminaba: "salgo de la vida para entrar en la historia".
- dato de gancho: Escribió una carta de despedida que terminaba "salgo de la vida para entrar en la historia" — y así fue.
- fuente: https://ensinarhistoria.com.br/linha-do-tempo/suicidio-de-getulio-vargas/
- última verificación: 2026-09-01

### Dom Pedro II
- id: dom-pedro-ii
- tipo: persona
- nivel: 2
- conecta con: poi:floresta-da-tijuca
- contenido: Fue el segundo y último emperador de Brasil, coronado a los 15 años. Además de ser el que mandó reforestar la Tijuca, trajo el telégrafo y el teléfono al país, impulsó el sistema métrico decimal y mantenía correspondencia con científicos de toda Europa. Lo depusieron en 1889, cuando proclamaron la República — un año después de que Brasil aboliera la esclavitud, la última nación de América en hacerlo.
- dato de gancho: Fue coronado emperador a los 15 años y depuesto un año después de que Brasil aboliera la esclavitud.
- fuente: https://www.portalsaofrancisco.com.br/biografias/dom-pedro-ii
- última verificación: 2026-09-01

### El tráfico transatlántico de personas esclavizadas
- id: trafico-de-escravizados
- tipo: evento
- nivel: 2
- conecta con: poi:cais-do-valongo
- contenido: Por el Cais do Valongo pasó casi un millón de personas africanas esclavizadas en apenas veinte años de funcionamiento — más que por cualquier otro puerto del mundo. Lo construyeron en 1811 a propósito lejos del centro, para que los vecinos no tuvieran que ver el desembarco. Inglaterra presionó para prohibir el tráfico en 1831, pero siguió funcionando de manera clandestina bajo lo que en la época llamaban, con ironía amarga, "ley para inglés ver".
- dato de gancho: Por acá pasó más gente esclavizada que por cualquier otro puerto del mundo — y siguió funcionando en secreto después de "prohibido".
- fuente: https://pt.wikipedia.org/wiki/Cais_do_Valongo
- última verificación: 2026-09-01

---

## Nivel 3 — entidades que salen de otra entidad

### El Art Déco
- id: art-deco
- tipo: concepto
- nivel: 3
- conecta con: entidad:paul-landowski
- contenido: Es el estilo artístico de líneas geométricas y simplificadas que dominó entre los años 20 y 30 — el mismo que se ve en el Empire State o en los carteles de la época. El Cristo Redentor es, según varios historiadores del arte, una de las expresiones de art déco más grandes y reconocibles del mundo, aunque nadie lo piensa así a primera vista por tratarse de una figura religiosa.
- dato de gancho: El Cristo Redentor es, técnicamente, una de las obras de art déco más grandes del planeta.
- fuente: https://historia-arte.com/obras/el-cristo-redentor
- última verificación: 2026-09-01

### La Bossa Nova
- id: bossa-nova
- tipo: concepto
- nivel: 3
- conecta con: entidad:vinicius-e-tom-jobim
- contenido: Nació a fines de los años 50 mezclando samba con armonías de jazz, con un canto más susurrado que gritado — una reacción, casi, contra el samba tradicional más orquestal. "Chega de Saudade", grabada en 1957 por Jobim y Vinícius, se considera la primera canción del género. Pocos años después, la bossa nova cruzó a Estados Unidos y terminó influenciando al jazz norteamericano, no al revés.
- dato de gancho: Este género nacido en Río terminó influenciando al jazz de Estados Unidos, no al revés.
- fuente: https://en.wikipedia.org/wiki/Chega_de_Saudade
- última verificación: 2026-09-01

### La Era Vargas
- id: era-vargas
- tipo: evento
- nivel: 3
- conecta con: entidad:getulio-vargas
- contenido: Es como se le dice a los diecinueve años, repartidos en dos etapas, en que Getúlio Vargas gobernó Brasil. La primera etapa (1930-1945) incluyó una dictadura abierta, el Estado Novo; la segunda (1951-1954), un regreso por voto popular que terminó en su suicidio. En el medio, creó la Petrobras y el Banco Nacional de Desenvolvimento — instituciones que todavía hoy sostienen buena parte de la economía brasileña.
- dato de gancho: La empresa petrolera más grande de Brasil nació durante este mismo gobierno.
- fuente: https://www.ebiografia.com/getulio_vargas/
- última verificación: 2026-09-01

### El Império do Brasil
- id: imperio-do-brasil
- tipo: institucion
- nivel: 3
- conecta con: entidad:dom-pedro-ii, poi:cais-do-valongo
- contenido: Fue el régimen monárquico que gobernó Brasil desde su independencia de Portugal en 1822 hasta la proclamación de la República en 1889. Dom Pedro II fue su último emperador. Hay una conexión directa y poco conocida con el otro lado de la ciudad: en 1843, el mismo Cais do Valongo por donde entraban personas esclavizadas fue remodelado y rebautizado "Cais da Imperatriz" para recibir a Teresa Cristina, la mujer con la que se casó Dom Pedro II — el mismo muelle, dos historias completamente opuestas.
- dato de gancho: El mismo muelle donde desembarcaban personas esclavizadas fue remodelado, años después, para recibir a la futura emperatriz.
- fuente: https://pt.wikipedia.org/wiki/Cais_do_Valongo
- última verificación: 2026-09-01

### La abolición de la esclavitud en Brasil
- id: abolicao-da-escravatura
- tipo: evento
- nivel: 3
- conecta con: entidad:trafico-de-escravizados, entidad:imperio-do-brasil
- contenido: Brasil fue el último país de América en abolir la esclavitud, en 1888 — más de veinte años después que buena parte del continente. La firmó la Princesa Isabel, hija de Dom Pedro II, mientras su padre estaba de viaje en Europa. Menos de un año y medio después, en 1889, un golpe militar proclamó la República y depuso a la familia imperial: para muchos historiadores, la abolición fue una de las últimas gotas que hundió al Imperio.
- dato de gancho: La ley que abolió la esclavitud la firmó la hija del emperador — y el Imperio no le sobrevivió ni año y medio.
- fuente: https://pt.wikipedia.org/wiki/Cais_do_Valongo
- última verificación: 2026-09-01

---

## Relaciones (grafo completo)

```
poi      cristo-redentor                 entidad  paul-landowski
poi      escadaria-selaron               entidad  jorge-selaron
poi      garota-de-ipanema               entidad  vinicius-e-tom-jobim
poi      palacio-do-catete               entidad  getulio-vargas
poi      floresta-da-tijuca              entidad  dom-pedro-ii
poi      cais-do-valongo                 entidad  trafico-de-escravizados

entidad  paul-landowski                  entidad  art-deco
entidad  vinicius-e-tom-jobim            entidad  bossa-nova
entidad  getulio-vargas                  entidad  era-vargas
entidad  dom-pedro-ii                    entidad  imperio-do-brasil
entidad  imperio-do-brasil               poi      cais-do-valongo
entidad  trafico-de-escravizados         entidad  abolicao-da-escravatura
entidad  abolicao-da-escravatura         entidad  imperio-do-brasil
```

**Caminos de ejemplo:**
- Floresta da Tijuca (Alto da Boa Vista) → Dom Pedro II → Império do Brasil → **Cais do Valongo** (Zona Portuária) — el mismo muelle que recibió esclavos recibió después a la emperatriz.
- Cais do Valongo → Tráfico de escravizados → Abolição → Império do Brasil → de vuelta a Dom Pedro II — cierra el círculo del final del Imperio.

---

## Pendientes

- Quedaron sin entidad propia (no abrieron sub-tema con peso real, no se fuerza):
  Pão de Açúcar/Bondinho, Arcos da Lapa, Theatro Municipal, Confeitaria Colombo,
  Calçadão de Copacabana, Estádio do Maracanã (Maracanaço 1950 queda pendiente para
  una próxima pasada — conecta bien con historia del fútbol si algún día hay POIs
  de Uruguay), Feira de São Cristóvão, Feira Hippie de Ipanema.
- Sigue CABA en el próximo commit.
