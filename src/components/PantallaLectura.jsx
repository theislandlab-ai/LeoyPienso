import { useState, useCallback, useRef, useEffect } from 'react'
import { useSesion } from '../context/SesionContext'
import Compannero from './Compannero'
import Semaforo from './Semaforo'
import i18n from '../i18n/es'
import './PantallaLectura.css'

function PausaPreguntar({ pausa, onResponder }) {
  const [seleccion, setSeleccion] = useState(null)

  return (
    <div className="pausa animar-entrada">
      <p className="pausa-mensaje">{pausa.mensaje}</p>
      <div className="pausa-opciones">
        {pausa.opciones?.map((opcion, idx) => (
          <button
            key={idx}
            className={`opcion-btn-chica ${seleccion === idx ? 'seleccionada' : ''}`}
            onClick={() => setSeleccion(idx)}
          >
            {opcion}
          </button>
        ))}
      </div>
      <button
        className="btn-chico"
        onClick={() => seleccion !== null && onResponder()}
        disabled={seleccion === null}
      >
        {i18n.lectura.boton_siguiente}
      </button>
    </div>
  )
}

function PausaVocabulario({ pausa, onResponder }) {
  const [seleccion, setSeleccion] = useState(null)

  return (
    <div className="pausa animar-entrada">
      <p className="pausa-mensaje">{pausa.mensaje}</p>
      <div className="pausa-opciones">
        {pausa.opciones?.map((opcion, idx) => (
          <button
            key={idx}
            className={`opcion-btn-chica ${seleccion === idx ? 'seleccionada' : ''}`}
            onClick={() => setSeleccion(idx)}
          >
            {opcion}
          </button>
        ))}
      </div>
      <button
        className="btn-chico"
        onClick={() => seleccion !== null && onResponder()}
        disabled={seleccion === null}
      >
        {i18n.lectura.boton_siguiente}
      </button>
    </div>
  )
}

export default function PantallaLectura() {
  const {
    texto, segmentoActual, mostrarPausa, enPausa, responderPausa, avanzarSegmento, irAInicio,
  } = useSesion()

  const segmento = texto?.segmentos?.[segmentoActual]
  const esUltimo = segmentoActual === (texto?.segmentos?.length || 1) - 1
  const pausaVista = useRef(false)
  const [primeraVez, setPrimeraVez] = useState(true)

  useEffect(() => {
    if (!segmento) return
    pausaVista.current = false
    if (primeraVez) {
      setPrimeraVez(false)
    }
  }, [segmentoActual, segmento, primeraVez])

  const handleClickContinuar = useCallback(() => {
    if (enPausa) {
      responderPausa()
      return
    }
    if (segmento?.pausa && !pausaVista.current) {
      pausaVista.current = true
      mostrarPausa()
      return
    }
    avanzarSegmento()
  }, [enPausa, segmento, mostrarPausa, responderPausa, avanzarSegmento])

  if (!texto || !segmento) {
    return (
      <div className="lectura animar-entrada">
        <p>No hay texto para mostrar.</p>
        <button className="btn-secundario" onClick={irAInicio}>Volver</button>
      </div>
    )
  }

  const pausa = enPausa ? segmento.pausa : null

  return (
    <div className="lectura animar-slide">
      <div className="lectura-bar">
        <span className="lectura-progreso">
          {segmentoActual + 1} / {texto.segmentos.length}
        </span>
        <div className="barra-progreso">
          <div
            className="barra-progreso-llena"
            style={{ width: `${((segmentoActual + 1) / texto.segmentos.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="lectura-texto">
        <p key={segmento.id} className="animar-entrada">{segmento.contenido}</p>
      </div>

      {pausa && pausa.tipo === 'semaforo' && (
        <Semaforo
          mensaje={pausa.mensaje || i18n.lectura.semaforo_pausa}
          onResponder={responderPausa}
        />
      )}

      {pausa && pausa.tipo === 'preguntar' && (
        <PausaPreguntar pausa={pausa} onResponder={responderPausa} />
      )}

      {pausa && pausa.tipo === 'vocabulario' && (
        <PausaVocabulario pausa={pausa} onResponder={responderPausa} />
      )}

      {pausa && pausa.tipo === 'pensar_voz_alta' && (
        <div className="pausa-voz-alta animar-entrada">
          <Compannero expresion="pensativo" mensaje={pausa.mensaje} />
          <button className="btn-chico" onClick={responderPausa}>
            {i18n.lectura.boton_siguiente}
          </button>
        </div>
      )}

      {!enPausa && (
        <button className="btn-primario lectura-siguiente" onClick={handleClickContinuar}>
          {esUltimo ? i18n.lectura.boton_terminar : i18n.lectura.boton_siguiente}
        </button>
      )}
    </div>
  )
}
