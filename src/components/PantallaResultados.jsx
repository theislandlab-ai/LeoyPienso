import { useSesion } from '../context/SesionContext'
import { useProgreso } from '../hooks/useProgreso'
import Compannero from './Compannero'
import i18n from '../i18n/es'
import './PantallaResultados.css'

export default function PantallaResultados() {
  const { texto, puntaje, estimacion, irAReflexion, irAMapa, estrategias } = useSesion()
  const { registrarLectura } = useProgreso()

  const totalPreguntas = texto?.preguntas?.length || 1
  const porcentaje = Math.round((puntaje / totalPreguntas) * 100)
  const bien = porcentaje >= 70
  const regular = porcentaje >= 40 && porcentaje < 70

  const estimacionMap = { bien: '😊 Bien', regular: '😐 Regular', mal: '😔 Mal' }

  const mensajeCompanero = bien
    ? '¡Muy bien! Se nota que leíste con atención.'
    : regular
    ? 'Bien, pero podemos seguir practicando.'
    : 'No te preocupes. Cada vez que leemos, aprendemos algo nuevo.'

  const expresionCompanero = bien ? 'feliz' : regular ? 'pensativo' : 'preocupado'

  function handleVerMapa() {
    registrarLectura(
      texto?.id,
      puntaje,
      estimacion,
      estrategias
    )
    irAMapa()
  }

  function handleReflexion() {
    registrarLectura(
      texto?.id,
      puntaje,
      estimacion,
      estrategias
    )
    irAReflexion()
  }

  return (
    <div className="resultados animar-slide">
      <h2 className="resultados-titulo">{i18n.resultados.titulo}</h2>

      <div className={`resultados-puntaje ${bien ? 'bien' : regular ? 'regular' : 'menos'}`}>
        <div className="puntaje-circular">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-border)" strokeWidth="10" />
            <circle
              cx="70" cy="70" r="60" fill="none"
              stroke={bien ? 'var(--color-green)' : regular ? 'var(--color-yellow)' : 'var(--color-red)'}
              strokeWidth="10"
              strokeDasharray={`${(porcentaje / 100) * 377} 377`}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
            <text x="70" y="70" textAnchor="middle" dominantBaseline="central" fontSize="32" fontWeight="800" fill="var(--color-text)">
              {puntaje}/{totalPreguntas}
            </text>
          </svg>
        </div>
      </div>

      <div className="resultados-detalle">
        <div className="detalle-item">
          <span className="detalle-label">{i18n.resultados.estimacion}</span>
          <span className="detalle-valor">{estimacionMap[estimacion]}</span>
        </div>
        <div className="detalle-item">
          <span className="detalle-label">{i18n.resultados.resultado}</span>
          <span className="detalle-valor">
            {bien ? i18n.resultados.bienvenido : regular ? i18n.resultados.regular : i18n.resultados.seguir_practicando}
          </span>
        </div>
      </div>

      <Compannero
        expresion={expresionCompanero}
        mensaje={mensajeCompanero}
      />

      <div className="resultados-acciones">
        <button className="btn-primario" onClick={handleReflexion}>
          {i18n.resultados.boton_reflexion}
        </button>
        <button className="btn-secundario" onClick={handleVerMapa}>
          {i18n.resultados.boton_mapa}
        </button>
      </div>
    </div>
  )
}
