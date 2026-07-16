# Guía para crear contenido

Cualquier persona puede escribir textos para Leo y Pienso sin saber programar. Solo necesitás un editor de texto.

## Formato

Cada texto es un archivo JSON. Acá hay un ejemplo mínimo:

```json
{
  "id": "ejemplo-001",
  "titulo": "El viaje de la hormiga",
  "nivel": "exploradores",
  "genero": "narrativo",
  "palabras": 85,
  "texto": "Texto completo aquí...",
  "segmentos": [...],
  "preguntas": [...],
  "prediccion": {...},
  "metadatos": {...}
}
```

## Estructura del archivo

### Campos obligatorios

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único (ej: expl-001, avent-001) |
| `titulo` | Título atractivo para el niño |
| `nivel` | `"exploradores"` (6-8) o `"aventureros"` (8-10) |
| `texto` | Texto completo |
| `segmentos` | Array de segmentos para la lectura guiada |
| `preguntas` | Array de preguntas de comprensión |

### Segmentos

Cada segmento tiene:

```json
{
  "id": 1,
  "contenido": "El texto de este segmento...",
  "pausa": {
    "tipo": "preguntar",
    "mensaje": "¿Qué creés que va a pasar después?",
    "opciones": ["Que encuentra un amigo", "Que se pierde", "Que llega a su casa"]
  }
}
```

**Tipos de pausa disponibles:**
- `pensar_voz_alta` — el compañero modela su pensamiento (sin respuesta del niño)
- `preguntar` — pregunta de predicción con opciones
- `semaforo` — "¿cómo vas entendiendo?" (verde/amarillo/rojo)
- `vocabulario` — pregunta sobre el significado de una palabra

### Preguntas

```json
{
  "id": 1,
  "tipo": "literal",
  "pregunta": "¿Dónde vivía la hormiga?",
  "opciones": ["En un hormiguero", "En un árbol", "En una cueva", "En una flor"],
  "respuesta_correcta": 0
}
```

**Tipos de pregunta:** `literal`, `inferencial`, `vocabulario`

### Predicción (antes de leer)

```json
{
  "pregunta": "¿De qué creés que va a tratar este cuento?",
  "opciones": ["De un viaje", "De una mascota", "De una aventura en el espacio"]
}
```

## Consejos para escribir

### Para nivel Exploradores (6-8 años)
- **50-150 palabras**
- Oraciones cortas y simples
- Vocabulario cotidiano
- Una sola idea principal
- Personajes y situaciones familiares

### Para nivel Aventureros (8-10 años)
- **150-400 palabras**
- Oraciones más complejas
- Vocabulario variado (con alguna palabra nueva)
- Múltiples ideas conectadas
- Inferencias no triviales

### Pausas estratégicas
- Cada 2-4 oraciones (depende de la longitud)
- Variar los tipos de pausa (no todas preguntas, no todos semáforos)
- Las pausas de "pensar en voz alta" no requieren respuesta — modelan

## ¿Dónde guardar el archivo?

En `/content/es/` con el nombre del ID (ej: `expl-001.json`).

## Recursos

- Validá tu archivo contra el esquema: `/schemas/contenido.schema.json`
- Buscá inspiración en los textos existentes en `/content/es/`
- Si tenés dudas, abrí un issue en el repositorio
