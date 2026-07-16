import { useSesion } from '../context/SesionContext'
import { useProgreso } from '../hooks/useProgreso'
import Compannero from './Compannero'
import i18n from '../i18n/es'
import './MapaProgreso.css'

const ESTRATEGIAS_INFO = {
  releer: { emoji: '📖', label: i18n.reflexion.opciones.releer },
  seguir: { emoji: '➡️', label: i18n.reflexion.opciones.seguir },
  imagen: { emoji: '🖼️', label: i18n.reflexion.opciones.imagen },
  preguntar: { emoji: '🙋', label: i18n.reflexion.opciones.preguntar },
}

const TEXTOS_POR_NIVEL = {
  exploradores: Array.from({ length: 10 }, (_, i) => `expl-${String(i + 1).padStart(3, '0')}`),
  aventureros: Array.from({ length: 15 }, (_, i) => `avent-${String(i + 1).padStart(3, '0')}`),
}

export default function MapaProgreso() {
  const { irAInicio, nivel } = useSesion()
  const { progreso, contarNivel } = useProgreso()

  const totalExploradores = TEXTOS_POR_NIVEL.exploradores.length
  const totalAventureros = TEXTOS_POR_NIVEL.aventureros.length
  const leidosExploradores = contarNivel('exploradores')
  const leidosAventureros = contarNivel('aventureros')
  const totalLeidos = progreso.textosCompletados.length
  const estrategias = progreso.estrategiasUsadas

  return (
    <div className="mapa animar-slide">
      <button className="btn-volver" onClick={irAInicio}>← {i18n.mapa.volver_inicio}</button>
      <h2 className="mapa-titulo">{i18n.mapa.titulo}</h2>

      {totalLeidos === 0 ? (
        <div className="mapa-vacio">
          <Compannero expresion="normal" mensaje={i18n.mapa.sin_textos} />
          <button className="btn-primario" onClick={irAInicio}>
            {i18n.inicio.boton_empezar}
          </button>
        </div>
      ) : (
        <>
          <div className="mapa-resumen">
            <div className="resumen-card">
              <span className="resumen-numero">{totalLeidos}</span>
              <span className="resumen-label">{i18n.mapa.textos_leidos}</span>
            </div>
            <div className="resumen-card">
              <span className="resumen-numero">{estrategias.length}/4</span>
              <span className="resumen-label">{i18n.mapa.estrategias}</span>
            </div>
          </div>

          <div className="mapa-niveles">
            <div className="mapa-nivel">
              <h3>🔵 {i18n.inicio.nivel_exploradores}</h3>
              <div className="mapa-progreso-bar">
                <div
                  className="mapa-progreso-llena expl"
                  style={{ width: `${(leidosExploradores / totalExploradores) * 100}%` }}
                />
              </div>
              <span className="mapa-progreso-texto">{leidosExploradores}/{totalExploradores}</span>
            </div>
            <div className="mapa-nivel">
              <h3>🟢 {i18n.inicio.nivel_aventureros}</h3>
              <div className="mapa-progreso-bar">
                <div
                  className="mapa-progreso-llena avent"
                  style={{ width: `${(leidosAventureros / totalAventureros) * 100}%` }}
                />
              </div>
              <span className="mapa-progreso-texto">{leidosAventureros}/{totalAventureros}</span>
            </div>
          </div>

          {estrategias.length > 0 && (
            <div className="mapa-estrategias">
              <h3>🧰 {i18n.reflexion.herramientas}</h3>
              <div className="mapa-estrategias-grid">
                {Object.entries(ESTRATEGIAS_INFO).map(([id, info]) => (
                  <div key={id} className={`estrategia-card ${estrategias.includes(id) ? 'desbloqueada' : 'bloqueada'}`}>
                    <span className="estrategia-emoji">{info.emoji}</span>
                    <span className="estrategia-label">{info.label}</span>
                    {!estrategias.includes(id) && <span className="estrategia-lock">🔒</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
