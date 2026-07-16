import { useSesion } from '../context/SesionContext'
import Compannero from './Compannero'
import i18n from '../i18n/es'
import './PantallaReflexion.css'

import { useProgreso } from '../hooks/useProgreso'

const OPCIONES = [
  { id: 'releer', emoji: '📖', label: i18n.reflexion.opciones.releer },
  { id: 'seguir', emoji: '➡️', label: i18n.reflexion.opciones.seguir },
  { id: 'imagen', emoji: '🖼️', label: i18n.reflexion.opciones.imagen },
  { id: 'preguntar', emoji: '🙋', label: i18n.reflexion.opciones.preguntar },
]

export default function PantallaReflexion() {
  const { texto, puntaje, estimacion, estrategias, registrarEstrategia, irAMapa, irAInicio } = useSesion()
  const { registrarLectura } = useProgreso()

  function agregarEstrategia(id) {
    if (estrategias.includes(id)) return
    const updated = [...estrategias, id]
    registrarEstrategia(id)
    registrarLectura(texto?.id, puntaje, estimacion, updated)
  }

  return (
    <div className="reflexion animar-slide">
      <Compannero
        expresion="pensativo"
        mensaje={i18n.reflexion.titulo}
      />

      <div className="reflexion-opciones">
        {OPCIONES.map(op => (
          <button
            key={op.id}
            className={`reflexion-btn ${estrategias.includes(op.id) ? 'seleccionada' : ''}`}
            onClick={() => agregarEstrategia(op.id)}
          >
            <span className="reflexion-emoji">{op.emoji}</span>
            <span>{op.label}</span>
            {estrategias.includes(op.id) && <span className="reflexion-check">✓</span>}
          </button>
        ))}
      </div>

      {estrategias.length > 0 && (
        <div className="caja-herramientas animar-entrada">
          <h3>{i18n.reflexion.herramientas}</h3>
          <div className="herramientas-lista">
            {estrategias.map(est => {
              const op = OPCIONES.find(o => o.id === est)
              return op ? (
                <span key={est} className="herramienta-tag">
                  {op.emoji} {op.label}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}

      <div className="reflexion-acciones">
        <button className="btn-primario" onClick={irAMapa}>
          {i18n.reflexion.boton_mapa}
        </button>
        <button className="btn-secundario" onClick={irAInicio}>
          {i18n.reflexion.boton_inicio}
        </button>
      </div>
    </div>
  )
}
