import { useState } from 'react'
import { useSesion } from '../context/SesionContext'
import Compannero from './Compannero'
import i18n from '../i18n/es'
import './PantallaPrediccion.css'

export default function PantallaPrediccion() {
  const { texto, irALectura } = useSesion()
  const [seleccion, setSeleccion] = useState(null)

  const prediccion = texto?.prediccion
  const pregunta = prediccion?.pregunta || i18n.prediccion.pregunta_default
  const opciones = prediccion?.opciones || []

  function continuar() {
    irALectura()
  }

  return (
    <div className="prediccion animar-slide">
      <h2 className="prediccion-titulo">{texto?.titulo}</h2>

      {texto?.imagen && (
        <div className="prediccion-imagen">
          <div className="imagen-placeholder">
            <span>📖</span>
          </div>
        </div>
      )}

      <Compannero
        expresion="pensativo"
        mensaje={pregunta}
      />

      <div className="prediccion-opciones">
        {opciones.map((opcion, idx) => (
          <button
            key={idx}
            className={`opcion-btn ${seleccion === idx ? 'seleccionada' : ''}`}
            onClick={() => setSeleccion(idx)}
          >
            <span className="opcion-indice">{idx + 1}</span>
            {opcion}
          </button>
        ))}
      </div>

      <button
        className="btn-primario"
        onClick={continuar}
        disabled={seleccion === null}
      >
        {i18n.prediccion.boton_continuar}
      </button>
    </div>
  )
}
