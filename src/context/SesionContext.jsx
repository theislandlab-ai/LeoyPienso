import { createContext, useContext, useState, useCallback } from 'react'

const SesionContext = createContext(null)

const PANTALLAS = {
  INICIO: 'inicio',
  SELECCION: 'seleccion',
  PREDICCION: 'prediccion',
  LECTURA: 'lectura',
  PREGUNTAS: 'preguntas',
  ESTIMACION: 'estimacion',
  RESULTADOS: 'resultados',
  REFLEXION: 'reflexion',
  MAPA: 'mapa',
}

export function SesionProvider({ children }) {
  const [pantalla, setPantalla] = useState(PANTALLAS.INICIO)
  const [nivel, setNivel] = useState(null)
  const [texto, setTexto] = useState(null)
  const [segmentoActual, setSegmentoActual] = useState(0)
  const [enPausa, setEnPausa] = useState(false)
  const [respuestas, setRespuestas] = useState([])
  const [estimacion, setEstimacion] = useState(null)
  const [puntaje, setPuntaje] = useState(null)
  const [estrategias, setEstrategias] = useState([])

  const iniciarSesion = useCallback((nivelSeleccionado, textoSeleccionado) => {
    setNivel(nivelSeleccionado)
    setTexto(textoSeleccionado)
    setSegmentoActual(0)
    setEnPausa(false)
    setRespuestas([])
    setEstimacion(null)
    setPuntaje(null)
    setEstrategias([])
    setPantalla(PANTALLAS.PREDICCION)
  }, [])

  const avanzarSegmento = useCallback(() => {
    if (!texto) return
    const totalSegmentos = texto.segmentos.length
    if (segmentoActual < totalSegmentos - 1) {
      setSegmentoActual(prev => prev + 1)
      setEnPausa(false)
    } else {
      setPantalla(PANTALLAS.PREGUNTAS)
    }
  }, [texto, segmentoActual])

  const mostrarPausa = useCallback(() => {
    setEnPausa(true)
  }, [])

  const responderPausa = useCallback(() => {
    setEnPausa(false)
    avanzarSegmento()
  }, [avanzarSegmento])

  const responderPregunta = useCallback((preguntaId, respuesta) => {
    setRespuestas(prev => {
      const existing = prev.findIndex(r => r.preguntaId === preguntaId)
      if (existing >= 0) {
        const next = [...prev]
        next[existing] = { preguntaId, respuesta }
        return next
      }
      return [...prev, { preguntaId, respuesta }]
    })
  }, [])

  const irAEstimacion = useCallback(() => {
    if (!texto) return
    const correctas = respuestas.filter((r, i) => {
      const pregunta = texto.preguntas[i]
      return pregunta && r.respuesta === pregunta.respuesta_correcta
    }).length
    setPuntaje(correctas)
    setPantalla(PANTALLAS.ESTIMACION)
  }, [texto, respuestas])

  const confirmarEstimacion = useCallback((est) => {
    setEstimacion(est)
    setPantalla(PANTALLAS.RESULTADOS)
  }, [])

  const irAReflexion = useCallback(() => {
    setPantalla(PANTALLAS.REFLEXION)
  }, [])

  const registrarEstrategia = useCallback((estrategia) => {
    setEstrategias(prev => prev.includes(estrategia) ? prev : [...prev, estrategia])
  }, [])

  const irAMapa = useCallback(() => {
    setPantalla(PANTALLAS.MAPA)
  }, [])

  const irAInicio = useCallback(() => {
    setPantalla(PANTALLAS.INICIO)
    setNivel(null)
    setTexto(null)
    setSegmentoActual(0)
    setEnPausa(false)
    setRespuestas([])
    setEstimacion(null)
    setPuntaje(null)
    setEstrategias([])
  }, [])

  const irALectura = useCallback(() => {
    setPantalla(PANTALLAS.LECTURA)
  }, [])

  const irASeleccion = useCallback(() => {
    setPantalla(PANTALLAS.SELECCION)
  }, [])

  return (
    <SesionContext.Provider
      value={{
        pantalla,
        nivel,
        texto,
        segmentoActual,
        enPausa,
        respuestas,
        estimacion,
        puntaje,
        estrategias,
        PANTALLAS,
        iniciarSesion,
        avanzarSegmento,
        mostrarPausa,
        responderPausa,
        responderPregunta,
        irAEstimacion,
        confirmarEstimacion,
        irAReflexion,
        registrarEstrategia,
        irAMapa,
        irAInicio,
        irALectura,
        irASeleccion,
        setNivel,
      }}
    >
      {children}
    </SesionContext.Provider>
  )
}

export function useSesion() {
  const ctx = useContext(SesionContext)
  if (!ctx) throw new Error('useSesion debe usarse dentro de SesionProvider')
  return ctx
}
