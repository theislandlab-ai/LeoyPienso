import { useState } from 'react'
import { useSesion } from '../context/SesionContext'
import Compannero from './Compannero'
import i18n from '../i18n/es'
import './PantallaPreguntas.css'

export default function PantallaPreguntas() {
  const {
    texto, respuestas, responderPregunta, irAEstimacion,
    confirmarEstimacion, PANTALLAS, pantalla,
  } = useSesion()

  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respondidas, setRespondidas] = useState({})
  const [estimacionSel, setEstimacionSel] = useState(null)

  const preguntas = texto?.preguntas || []
  const pregunta = preguntas[preguntaActual]
  const esEstimacion = pantalla === PANTALLAS.ESTIMACION

  function responder(idx) {
    if (!pregunta || esEstimacion) return
    setRespondidas(prev => ({ ...prev, [preguntaActual]: idx }))
    responderPregunta(pregunta.id, idx)
  }

  function siguiente() {
    if (esEstimacion) return
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1)
    } else {
      irAEstimacion()
    }
  }

  function confirmarEstimacionClick() {
    if (estimacionSel !== null) {
      confirmarEstimacion(estimacionSel)
    }
  }

  if (esEstimacion) {
    return (
      <div className="preguntas animar-slide">
        <Compannero
          expresion="pensativo"
          mensaje={i18n.preguntas.estimacion}
        />
        <div className="estimacion-opciones">
          {['bien', 'regular', 'mal'].map((tipo) => (
            <button
              key={tipo}
              className={`estimacion-btn ${tipo} ${estimacionSel === tipo ? 'activo' : ''}`}
              onClick={() => setEstimacionSel(tipo)}
            >
              <span className="estimacion-emoji">
                {tipo === 'bien' ? '😊' : tipo === 'regular' ? '😐' : '😔'}
              </span>
              <span>{i18n.preguntas[tipo]}</span>
            </button>
          ))}
        </div>
        <button
          className="btn-primario"
          onClick={confirmarEstimacionClick}
          disabled={!estimacionSel}
        >
          {i18n.preguntas.boton_ver_resultados}
        </button>
      </div>
    )
  }

  if (!pregunta) {
    return <p>Cargando preguntas...</p>
  }

  const respondio = respondidas[preguntaActual] !== undefined
  const seleccionada = respondidas[preguntaActual]

  return (
    <div className="preguntas animar-slide">
      <div className="preguntas-bar">
        <span className="pregunta-numero">
          {i18n.preguntas[pregunta.tipo]} — {preguntaActual + 1} de {preguntas.length}
        </span>
        <div className="barra-progreso">
          <div
            className="barra-progreso-llena"
            style={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="pregunta-card animar-entrada">
        <p className="pregunta-texto">{pregunta.pregunta}</p>
        <div className="pregunta-opciones">
          {pregunta.opciones?.map((opcion, idx) => (
            <button
              key={idx}
              className={`opcion-btn ${seleccionada === idx ? 'seleccionada' : ''}`}
              onClick={() => responder(idx)}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn-primario"
        onClick={siguiente}
        disabled={!respondio}
      >
        {preguntaActual < preguntas.length - 1
          ? i18n.preguntas.boton_siguiente
          : i18n.preguntas.boton_ver_resultados}
      </button>
    </div>
  )
}
