# Cómo sumar una ciudad nueva a Yatoor

> Este documento deja asentado el proceso completo — desde cero hasta el POI
> corriendo en producción — para que cualquiera del equipo pueda repetirlo sin
> tener que re-derivarlo. Está escrito para que lo siga una persona o un
> agente (LLM) indistintamente.

---

## 0. Qué es "una ciudad" acá

Un archivo `<ciudad>.md` con la misma estructura que `caba.md`, `rio-de-janeiro.md`
y `madrid.md` — con puntos de interés (POIs) reales, redactados en voz Yatoor,
con coordenadas validadas contra Google Places — más su fila correspondiente en
`cities` y sus filas en `pois` una vez corrido `ingest_pois.py`.

No hace falta "terminar" una ciudad para arrancar el beta ahí: con 15-20 POIs
bien elegidos, cubriendo las 2-3 zonas que más free tours concentran, ya alcanza
para una prueba piloto. La cobertura completa es un proceso continuo (ver §6).

---

## 1. Elegir los POIs — no a ojo, cruzando fuentes reales

**No inventar la lista de "lugares importantes" de memoria.** Hay dos fuentes que se combinan:

**A) Lo que ya arma el mercado de free tours** — el criterio de la sección
anterior: ¿qué paradas repiten los free tours de verdad? Eso es lo que un
turista caminando esa ciudad va a pisar sin buscarlo.

1. Buscar en la web: `free tour [ciudad] recorrido gratis paradas [zona]`
   — repetir por cada zona/barrio turístico grande de la ciudad (2-4 búsquedas).
2. De los resultados, anotar qué lugares aparecen repetidos en 3+ operadores
   distintos. Esos son los candidatos con más consenso.

**B) Densidad — lo que hace que caminar se sienta "narrado" todo el tiempo,
no sólo en los 10 hitos más fotografiados.** La app depende de esto: si el
usuario camina 20 cuadras y sólo hay un punto cargado, la propuesta de valor
se cae. Para cada ciudad, buscar activamente en estas categorías — no son
opcionales, son la diferencia entre una ciudad "turística" (10-15 puntos) y
una ciudad "narrada" (40+):

| Categoría | Qué buscar | Ejemplo de query |
|---|---|---|
| **Hitos clásicos** | monumentos, plazas, edificios icónicos | `free tour [ciudad] [zona]` |
| **Museos y centros culturales** | los que tienen entrada gratis o libre suman más porque el usuario los va a visitar de verdad | `museos gratuitos [ciudad]` |
| **Parques, plazas y naturaleza urbana** | reservas, jardines, miradores — cualquier verde caminable | `parques imprescindibles [ciudad]` |
| **Sucesos históricos puntuales** | algo que pasó *en esa calle específica*, no historia general del país | `qué pasó en [calle/plaza] historia [ciudad]` |
| **Misterios y curiosidades** | leyendas urbanas, túneles, fantasmas, anécdotas raras de un edificio | `misterio leyenda [ciudad] curiosidad` |
| **Costumbres y quién vive ahí** | qué hace distinto a un barrio — oficios, comunidades, rituales locales | `costumbres barrio [nombre] [ciudad]` |
| **Cosas que pasan un solo día** | ferias, mercados o rituales que sólo existen un día de la semana — esto es oro para densidad, porque además le da a Yatoor una excusa para decir "hoy es el único día que..." | `feria [ciudad] domingos historia` / `mercado semanal [ciudad]` |
| **Playas** (si aplica) | tramos con identidad propia, no la costa genérica | `playas [ciudad] historia curiosidad` |
| **Edificios con historia particular** | no sólo el más lindo — el que tiene una anécdota | `edificio histórico [ciudad] anécdota` |

No hace falta agotar las nueve categorías en la primera pasada, pero **cada
ciudad nueva debería tener al menos una entrada de "costumbre/feria
semanal" y una de "misterio/curiosidad"** — son las que más "enganchan" en
el audio y las que menos aparecen en las guías genéricas, así que son
también las que más valor le agregan a Yatoor frente a googlear "qué ver en
[ciudad]".

3. Agrupar los candidatos (de A y B) por zona/barrio para asegurar cobertura
   geográfica, no sólo temática (evitar que los puntos queden todos en el
   centro).

## 2. Investigar cada POI — con fuente real, no de memoria (esto es lo más importante de todo el proceso)

Todo lo que entra a un `.md` de ciudad, sin excepción — sea un hito clásico,
una leyenda, una costumbre de barrio o un dato de "quién vive ahí" — pasa
primero por una fuente real. Nada se redacta de memoria ni se aproxima "total
después alguien lo corrige": si Yatoor le cuenta a alguien caminando un dato
mal chequeado, no hay geofencing ni voz simpática que lo arregle. La
credibilidad de la app se juega acá, no en el diseño.

Por cada candidato:

1. Buscar 1-2 fuentes (Wikipedia, sitio oficial de turismo de la ciudad,
   medios reconocidos). Priorizar sitios `.gob`/oficiales de turismo cuando
   existan — son los que después se pueden volver a chequear sin ambigüedad.
   Para leyendas y misterios, que suelen tener versiones contradictorias entre
   sí, buscar al menos 2 fuentes y, si difieren, contar la versión más
   repetida y aclarar en el texto que es "leyenda" — nunca presentarla como
   hecho histórico confirmado.
2. Redactar el campo `qué contar` en voz Yatoor:
   - Presente, segunda persona, frases cortas.
   - Un dato concreto que "engancha" — fecha, cifra, anécdota — no una
     descripción genérica de guía turística.
   - Nunca copiar texto de la fuente: parafrasear siempre (ver
     `CRITICAL_COPYRIGHT_COMPLIANCE` — máximo una cita textual de <15 palabras
     por fuente, y evitar incluso eso si se puede).
   - 2-4 líneas. Ni un párrafo largo ni una sola oración pelada.
3. Redactar `dato de gancho`: la versión de una sola frase que dispara la
   notificación push cuando el usuario entra a la geocerca. Tiene que
   funcionar sola, sin el resto del texto.
4. Completar `fuente` con la URL real usada (no "conocimiento general" —
   eso es lo que se hizo la primera vez con CABA y hubo que rehacerlo).

## 3. Validar coordenadas — siempre, sin excepción

Nunca tipear lat/lng de memoria o aproximando en el mapa. Usar Google Places
(`places_search`) con una query tipo `"[Nombre del lugar] [ciudad]"` y tomar:

- `latitude`, `longitude` → van a `lat, lng`
- `place_id` → va a un campo nuevo `place_id` (clave para cruzar contra
  Google Places on-demand más adelante, y para no volver a buscarlo)

Esto importa por dos razones: el geofencing de 50 m no funciona si la
coordenada está corrida una cuadra, y el `place_id` evita pagarle a Google
Places una búsqueda que ya hicimos una vez.

## 4. Formato del archivo

Usar exactamente esta estructura (copiar `madrid.md` como plantilla — es la
más chica y fácil de razonar):

```
# [Ciudad] — Contexto Yatoor

> [mismo párrafo de fuente-primaria-antes-que-búsqueda-en-vivo]

- **Ciudad:** [Nombre], [País]
- **Registro de voz:** [ver §5]
- **Radio de geofencing:** 50 m
- **Última actualización:** [fecha]
- **Formato de coordenadas:** WGS84 (lat, lng)
- **Cobertura de zonas:** [lista de zonas cargadas]. Pendientes: [lista].

---

## Formato por punto
[el bloque de ejemplo, igual en las tres ciudades existentes]

---

## Puntos cargados
### [Nombre]
- id: slug-unico-en-kebab-case
- barrio:
- lat, lng: (validado contra Google Places)
- place_id:
- categoría: [historia | arquitectura | gastronomía | arte | anécdota | política | costumbre | naturaleza | misterio]
- qué contar:
- dato de gancho:
- fuente:
- última verificación:

---

## Pendientes de scrapear
- —

---

## Notas de uso para el modelo
[las mismas 4 notas, con el conteo actualizado]
```

El `id` tiene que ser único **dentro del archivo** (no hace falta que sea
único cross-ciudad, porque en Supabase la clave real es `id` + el hecho de
que cada fila también tiene `city_slug` — aunque en la práctica, como `id`
es la primary key de `pois`, конviene que sea único globalmente — conviene agregar prefijo
si hay colisión, ej. `obelisco` (CABA) vs `obelisco-guatemala` si
hiciera falta).

## 5. Adaptar el registro de voz — el tono viaja, el contenido no

Regla ya definida en `CLAUDE_2.md`: mismo personaje Yatoor, mismo nivel de
informalidad y cercanía, pero el **registro** local:

| País/región | Registro |
|---|---|
| Argentina | voseo rioplatense |
| España | tú |
| México, gran parte de LatAm | tú (evaluar "usted" si el operador lo pide) |
| Brasil | tú/você — variable regional, definir con nativo si es posible |

No traducir el contenido de una ciudad a otra ni reciclar datos "genéricos" —
cada dato tiene que ser hiperlocal, así es como se abarata abrir cada ciudad
nueva sin perder la propuesta de valor (ver Plan Maestro: "el tono viaja, el
contenido no").

## 6. Barra mínima para considerar la ciudad "deployable" en beta

- Al menos 25-30 POIs (15 alcanza para un piloto muy acotado; para que la
  caminata se sienta narrada de verdad, apuntar a más).
- Al menos 4-5 zonas/barrios distintos cubiertos (no todo en el centro).
- Al menos una categoría `costumbre` (algo que sólo pasa un día de la
  semana) y una `misterio`/anécdota rara — son las que más densidad
  perceptible le dan a la app sin ser sólo "lo típico".
- 100% de los POIs con `fuente` real (no "conocimiento general") y
  `place_id` validado. **Esto no es negociable** — un dato mal chequeado
  que Yatoor le cuenta a alguien caminando es peor que no contarle nada.
- Sección "Pendientes de scrapear" presente aunque esté vacía (el modelo la
  necesita para saber dónde escribir en runtime).

No hace falta cobertura total de la ciudad — eso se sigue construyendo con
el loop de producción (§8).

## 7. Ingesta a Supabase

Con el archivo `<ciudad>.md` ya escrito y validado:

```bash
pip install supabase openai --break-system-packages
export SUPABASE_URL="https://xxxx.supabase.co"
export SUPABASE_SERVICE_KEY="..."   # service_role, no anon
export OPENAI_API_KEY="..."

python ingest_pois.py <ciudad>.md
```

Esto corre `schema.sql` (si no se corrió antes) implícitamente — en realidad
`schema.sql` hay que correrlo una vez a mano en el SQL editor de Supabase,
`ingest_pois.py` sólo llena las tablas. El script:

1. Hace upsert de la fila en `cities`.
2. Por cada POI en "Puntos cargados": genera embedding de `qué contar` y
   hace upsert en `pois` con `origen='seed'`.
3. Por cada entrada en "Pendientes de scrapear" (si hay): mismo proceso pero
   `origen='live_search'` — son los que el modelo fue completando en
   producción.

Es idempotente: correrlo de nuevo después de agregar POIs sólo toca lo nuevo
o lo modificado (por `id`).

## 8. El loop después del deploy

Una vez la ciudad está en producción, el archivo `.md` deja de ser la única
fuente de verdad — pasa a serlo la tabla `pois`. El `.md` sigue sirviendo
como:

- **Backup legible** y diffable en git de lo que hay en la base.
- **Bandeja de entrada** de lo que el modelo descubre en vivo: cuando un
  usuario pasa por un punto que no está en la base, el modelo busca,
  redacta en voz Yatoor, y ese resultado se debería anotar en
  "Pendientes de scrapear" del `.md` correspondiente (proceso manual por
  ahora — ver §9 para la versión automatizada).
- Cada tanto (semanal/quincenal), alguien del equipo revisa "Pendientes de
  scrapear", valida esas fuentes igual que en §2-3, las pasa a "Puntos
  cargados", y vuelve a correr `ingest_pois.py`.

## 9. Pendiente de automatizar (no bloqueante para el beta)

- Que el propio backend de Yatoor escriba directamente en la tabla `pois`
  cuando resuelve un punto en vivo (`origen='live_search'`), en vez de
  depender de que alguien lo pase a mano desde el `.md`. Hoy `ingest_pois.py`
  ya soporta leer esa sección si se decide mantener el `.md` como intermediario;
  la alternativa es que el Route Handler que atiende la búsqueda en vivo
  haga el insert directo con el mismo shape de fila.
- Función de dedup semántico antes de insertar (usar
  `match_poi_by_similarity` de `schema.sql` para evitar crear un POI
  duplicado cuando dos nombres distintos describen el mismo lugar).

## 10. Pipeline formal de armado de ciudad (v2)

> Versión acordada con el equipo — reemplaza el proceso manual de los §1-8
> como visión objetivo a automatizar. Hoy varios pasos siguen siendo
> semi-manuales (búsqueda web en vez de scraping real, un solo modelo
> haciendo de auditor); queda marcado en cada paso qué falta para
> automatizarlo del todo.

**Paso 1 — Scraping de tours existentes.**
Recopilar los recorridos que ya arman operadores de free tours y plataformas
de reserva (Civitatis, GuruWalks, TripAdvisor, GetYourGuide) para la ciudad.
Esto reemplaza a la búsqueda manual del §1-A con una fuente estructurada y
repetible. **Ojo con los Términos de Servicio**: Civitatis, TripAdvisor y
GetYourGuide prohíben explícitamente el scraping automatizado en sus ToS —
antes de automatizar este paso hay que decidir si se scrapea igual (riesgo
legal/de bloqueo de IP), se usa alguna API oficial de afiliados si existe, o
se mantiene este paso semi-manual (googlear + revisar a mano, como se hace
hoy). No es un detalle menor: es la base de todo el pipeline.

**Paso 2 — Verificar cada punto (real, relevante, seguro).**
De la lista cruda que sale del scraping, filtrar: ¿el lugar existe y es
verificable? ¿tiene peso histórico/cultural real, o es solo una parada
comercial ("trampa turística": tienda de souvenirs con comisión, restaurant
que le paga al guía)? ¿es un punto seguro para mandar a alguien caminando
solo con el celular en la mano? Acá también se suma contexto de barrio/zona
(historia del barrio, no sólo del punto puntual) para que el "qué contar"
tenga más para narrar alrededor. Esto es una extensión de lo que ya hace
el §2 (research con fuente real) pero aplicado como filtro, no sólo como
redacción.

**Paso 3 — Redactar el POI con el formato `nueva-ciudad.md`.**
Para cada punto que pasó el filtro del paso 2: historia, por qué es
relevante, coordenadas (validadas con `places_search`), fuente,
`qué contar` y `dato de gancho` en voz Yatoor. Es exactamente el formato
que ya usan `caba.md`, `madrid.md`, `rio-de-janeiro.md` — ver §3-4.

**Paso 4 — Segunda pasada: ¿falta algún POI importante?**
Con la lista de tours ya cargada, buscar activamente qué falta — lugares
que ningún operador de free tour incluye pero que sí tienen peso real
(ver §1-B: densidad, categorías de museo/parque/feria/misterio). Todo lo
que se sume acá vuelve a pasar por el paso 2 y el paso 3.

**Paso 5 — Con los POIs de primer orden armados, arrancar el grafo.**
Recién ahí, con la base de POIs "cerrada" para esa pasada, se empieza a
construir `entidades-<ciudad>.md`.

**Paso 6 — Identificar disparadores por POI y research recursivo.**
Para cada POI, leer su `qué contar` y sacar los disparadores: un nombre y
apellido, una época, un hecho histórico, un edificio, lo que sea que esté
mencionado explícitamente. Cada disparador se investiga con el mismo
estándar del paso 3 (fuente real, formato completo) — así se arma nivel 2.
Lo que salga de investigar el nivel 2 se vuelve a mirar buscando nuevos
disparadores, y así nivel 3, nivel 4, lo que dé. Dos reglas ya validadas
con los primeros tres armados (Madrid/Río/CABA):
- **No forzar un número fijo de hijos por nodo** (ni todo el mundo tiene
  3 sub-temas reales, ni hace falta). Ver detalle completo en §12.
- **Separar dato duro de marco narrativo** (rival, heredero, enemigo,
  continuador) — el marco necesita el mismo respaldo de fuente que el dato.
  Ver el error real que motivó esta regla en §13.

**Paso 7 — Los ciclos son buenos, no un bug.**
A medida que el grafo crece, es esperable que distintos POIs lleguen al
mismo nodo de entidad (ej. dos POIs mencionan al mismo rey, al mismo
arquitecto). Eso no se evita — al revés, es lo que se busca: cada ciclo es
contenido reusado sin costo adicional, y es lo que conecta POIs que están
lejos entre sí caminando. Cuantos más ciclos reales, más densa la red.

**Paso 8 — Auditoría independiente (modelo 2).**
Un modelo que **no participó de la búsqueda ni redacción** (otra sesión,
sin el research previo en contexto) revisa el grafo terminado punto por
punto contra fuentes propias — no las que ya están citadas, sino buscando
de cero para no heredar los mismos sesgos de búsqueda del modelo 1. Para
cada entidad/relación: ¿el dato está bien? Si hay una duda o discrepancia,
se marca con un flag y una explicación de por qué se sospecha que hay un
problema — no se corrige directamente, queda para revisar.

**Paso 9 — Arbitraje (modelo 3).**
Un tercer modelo, que ve **sólo la lista de flags del paso 8** (no el texto
original completo, para no arrastrar el mismo marco que generó el posible
error) decide, para cada flag, si se corrige o se descarta el flag —
dejando por escrito el motivo de la decisión. El resultado de este paso es
lo que se aplica al archivo final.

> Nota de implementación: hoy los pasos 8 y 9 se hacen con un solo modelo
> (yo mismo) revisando contra las fuentes ya citadas — no es lo mismo que
> un modelo ciego re-buscando de cero, que es lo que pide el paso 8 en su
> versión completa. Es el próximo paso a automatizar en serio: separar la
> sesión de auditoría de la de redacción, sin contexto compartido entre
> ambas, y agregar el paso 9 como arbitraje real en vez de que la misma
> sesión decida sobre su propio flag.

## 11. Verificación de precisión — por qué hace falta separar dato de marco

Tener una fuente citada por dato no garantiza que el texto final sea fiel a
esa fuente. Dos ejemplos reales que aparecieron armando Madrid/Río/CABA:

- **Rosas y Eva Perón enmarcados como "enemigos"** — el dato (mismo
  cementerio) era correcto y estaba bien citado; el problema fue el marco
  narrativo agregado encima, sin respaldo, porque "sonaba bien" que dos
  figuras polémicas fueran rivales. En realidad los separan casi 100 años
  sin relación entre ambos.
- **"Garay refundó en el mismo punto exacto" que la primera fundación de
  1536** — acá el problema no fue el marco sino el dato mismo: la
  ubicación de la primera fundación es un debate histórico sin resolver
  (teoría más aceptada: Parque Lezama/San Telmo), distinto de donde Garay
  refundó en 1580 (Plaza de Mayo). Se afirmó una precisión que ninguna
  fuente sostiene.

Por eso el paso 8/9 no puede ser sólo "¿tiene fuente citada?" — tiene que
comparar específicamente:
1. ¿El dato duro que se afirma está en la fuente, sí o no?
2. ¿El marco narrativo alrededor del dato (relación, causalidad,
   comparación, "el mismo lugar", "el mismo punto") está también en la
   fuente, o fue agregado por asociación?

**Palabras con carga narrativa a las que prestar atención especial**: rival,
enemigo, heredero, continuador, opuesto, símbolo de, en respuesta a, el
mismo lugar/punto exacto. Son las que más fácil se cuelan sin respaldo
directo, porque narrativamente "cierran bien" aunque el dato de base sea
correcto.

## 12. Grafo de entidades — formato y reglas de branching

Cada ciudad tiene un archivo `entidades-<ciudad>.md` con las **entidades**
(personas, instituciones, eventos, conceptos) que salen del `qué contar` de
un POI (nivel 2) o de otra entidad (nivel 3, 4...), más las relaciones entre
ellas. Ver `schema.sql` (tablas `entidades` y `relaciones`) y los tres
archivos `entidades-madrid.md`, `entidades-rio-de-janeiro.md`,
`entidades-caba.md` como referencia de formato exacto.

- **No agregar una entidad si no está mencionada explícitamente** en el
  texto que la dispara (POI o entidad de nivel anterior) — no se investiga
  "lo que podría ser interesante", sólo lo que ya está ahí.
- **No forzar un número fijo de hijos por nodo.** Algunas entidades tienen
  varias conexiones reales, otras ninguna (quedan como nodo final, "leaf"),
  y eso está bien — lo que importa es que cada conexión sea verificable,
  no completar un árbol parejo. Si un POI no abre ningún sub-tema con peso
  real, se deja sin entidad y se anota en "Pendientes" del archivo.
- Documentar las relaciones al final del archivo como lista de aristas
  `from_type / from_id / to_type / to_id`, y agregar 2-4 "caminos de
  ejemplo" que muestren qué POIs quedan conectados a través de qué cadena.
- Cargar todo a Supabase corriendo `ingest_pois.py` ampliado (o su
  equivalente `ingest_entidades.py`, pendiente de escribir — hoy la carga
  de `entidades-<ciudad>.md` a las tablas `entidades`/`relaciones` es manual).

---



## Checklist rápido (para copiar/pegar al arrancar una ciudad)

- [ ] Buscar free tours de la ciudad, agrupados por zona (mínimo 3 zonas)
- [ ] Sumar densidad: al menos un punto de museo, uno de parque/naturaleza,
      uno de costumbre/feria semanal y uno de misterio/curiosidad
- [ ] Armar lista de POIs candidatos (mínimo 25-30) cruzando 3+ operadores
      de free tours + las categorías de densidad
- [ ] Investigar cada uno con fuente real (Wikipedia / turismo oficial /
      medio reconocido) — sin excepciones, incluso para leyendas
- [ ] Redactar `qué contar` + `dato de gancho` en voz Yatoor, sin copiar texto
- [ ] Validar lat/lng + place_id de cada POI con `places_search`
- [ ] Armar `<ciudad>.md` con el formato exacto de `madrid.md`
- [ ] Definir registro de voz (tú / voseo / etc.) en el front-matter
- [ ] Correr `schema.sql` en Supabase (si es la primera ciudad del proyecto)
- [ ] Correr `ingest_pois.py <ciudad>.md`
- [ ] Verificar en Supabase que `cities` y `pois` tienen las filas esperadas
