# 🦉 Leo y Pienso

**Mejora la comprensión lectora de tu hijo a través de la metacognición.**

Una web app gratuita, open source y sin publicidad para que niños de 6 a 10 años aprendan a *darse cuenta de cómo entienden* lo que leen.

> 🧠 **La idea central:** Los buenos lectores se hacen preguntas constantemente mientras leen. Esta app enseña ese diálogo interno de forma explícita y jugable.

---

## ✨ Demo

[leo-y-pienso.app](https://leo-y-pienso.app) — funciona en cualquier navegador (Chromebook, tablet, celular). Sin instalación, sin cuentas, sin datos personales.

---

## 📖 Para padres y docentes

Cada sesión dura **5-10 minutos** y sigue esta estructura:

1. **Antes de leer** — El niño predice de qué tratará el texto.
2. **Durante la lectura** — Texto en segmentos con pausas estratégicas: pensar en voz alta, preguntas, semáforo de comprensión.
3. **Después de leer** — Preguntas literal, inferencial y de vocabulario.
4. **Reflexión** — El niño identifica qué estrategias usó y ve crecer su "caja de herramientas de lector".

**Dos niveles:**
- 🔵 **Exploradores (6-8 años):** textos de 50-150 palabras, apoyo de audio, preguntas con imágenes.
- 🟢 **Aventureros (8-10 años):** textos de 150-400 palabras, inferencias, resumen, reflexión explícita.

---

## 🛠️ Para desarrolladores

```bash
git clone https://github.com/pablocarabelli/leo-y-pienso.git
cd leo-y-pienso
npm install
npm run dev
```

**Stack:** React + Vite | GitHub Pages | Contenido en JSON | Progreso en localStorage

El contenido vive separado del código en `/content/es/`. Cualquier persona puede escribir textos nuevos sin saber programar. [Guía para crear contenido →](docs/guia-contenido.md)

---

## 🤝 Cómo contribuir

- **Docentes:** escriban textos nivelados — [guía aquí](docs/guia-contenido.md)
- **Desarrolladores:** issues, PRs, mejoras — [guía aquí](CONTRIBUTING.md)
- **Traductores:** contenido a portugués, inglés y más

Este proyecto vive gracias a su comunidad. Toda contribución es bienvenida.

---

## 📐 Arquitectura

```
leo-y-pienso/
├── content/es/          # Textos en JSON (licencia CC BY-SA)
├── src/                  # Código React
├── schemas/              # Esquemas JSON
└── docs/                 # Documentación pedagógica y técnica
```

**Licencias:** MIT (código) + CC BY-SA 4.0 (contenido)

---

## 🎯 Por qué existe

Soy padre de dos niños. Cuando empecé a investigar cómo ayudarlos con la comprensión lectora, descubrí que la metacognición —pensar sobre el propio pensamiento— tiene la evidencia más sólida en la ciencia de la lectura. Pero no encontré herramientas gratuitas, sin publicidad y bien diseñadas que enseñaran esto. Así que lo construí.

Si este proyecto ayuda aunque sea a un niño a detenerse mientras lee y decir *"esperá, no entendí, voy a releer"*, habrá valido la pena.

---

## 📄 Licencia

- **Código:** MIT — puedes usar, modificar y distribuir libremente.
- **Contenido educativo:** CC BY-SA 4.0 — comparte y adapta, siempre con la misma licencia.

---

## 🌎 English

**Leo y Pienso** (I Read and I Think) is a free, open-source web app that improves reading comprehension in children aged 6-10 through metacognition strategies. No accounts, no ads, no data collection. [Full English README →](README-EN.md)
