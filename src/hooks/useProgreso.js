import { useState, useCallback } from 'react'

const STORAGE_KEY = 'leo-y-pienso-progreso'

function cargarProgreso() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {
      textosCompletados: [],
      puntajes: {},
      estrategiasUsadas: [],
      fechaUltimo: null,
    }
  } catch {
    return {
      textosCompletados: [],
      puntajes: {},
      estrategiasUsadas: [],
      fechaUltimo: null,
    }
  }
}

function guardarProgreso(progreso) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso))
  } catch {
    // localStorage may be full or unavailable
  }
}

export function useProgreso() {
  const [progreso, setProgreso] = useState(cargarProgreso)

  const registrarLectura = useCallback((textoId, puntaje, estimacion, estrategias) => {
    setProgreso(prev => {
      const next = {
        ...prev,
        textosCompletados: prev.textosCompletados.includes(textoId)
          ? prev.textosCompletados
          : [...prev.textosCompletados, textoId],
        puntajes: {
          ...prev.puntajes,
          [textoId]: { puntaje, estimacion, fecha: new Date().toISOString() },
        },
        estrategiasUsadas: [
          ...prev.estrategiasUsadas,
          ...estrategias.filter(e => !prev.estrategiasUsadas.includes(e)),
        ],
        fechaUltimo: new Date().toISOString(),
      }
      guardarProgreso(next)
      return next
    })
  }, [])

  const reiniciarProgreso = useCallback(() => {
    const vacio = {
      textosCompletados: [],
      puntajes: {},
      estrategiasUsadas: [],
      fechaUltimo: null,
    }
    setProgreso(vacio)
    guardarProgreso(vacio)
  }, [])

  const contarNivel = useCallback((nivel) => {
    const prefix = nivel === 'exploradores' ? 'expl' : 'avent'
    return progreso.textosCompletados.filter(id => id.startsWith(prefix)).length
  }, [progreso])

  return {
    progreso,
    registrarLectura,
    reiniciarProgreso,
    contarNivel,
  }
}
