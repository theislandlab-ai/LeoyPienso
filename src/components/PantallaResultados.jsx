import { useSesion } from '../context/SesionContext'
import { useProgreso } from '../hooks/useProgreso'
import Compannero from './Compannero'
import i18n from '../i18n/es'
import './PantallaResultados.css'

export default function PantallaResultados() {
  const { texto, respuestas, puntaje, estimacion, irAReflexion, irAMapa, estrategias, semaforoRespuestas } = useSesion()
  const { registrarLectura } = useProgreso()

  const totalPreguntas = texto?.preguntas?.length || 1
  const porcentaje = Math.round((puntaje / totalPreguntas) * 100)
  const bien = porcentaje >= 70
  const regular = porcentaje >= 40 && porcentaje < 70

  const estimacionMap = { bien: '😊 Bien', regular: '😐 Regular', mal: '😔 Mal' }

  // Obtener nombre del niño y evaluar feedback pedagógico
  const nombreChild = localStorage.getItem('isla-child-name') || 'amiguito'
  const tuvoDudas = semaforoRespuestas.includes('amarillo') || semaforoRespuestas.includes('rojo')

  const preguntasErradas = texto?.preguntas?.filter((pregunta) => {
    const respChild = respuestas.find(r => r.preguntaId === pregunta.id)
    return !respChild || respChild.respuesta !== pregunta.respuesta_correcta
  }) || []

  const falloLiteral = preguntasErradas.some(p => p.tipo === 'literal')
  const falloInferencial = preguntasErradas.some(p => p.tipo === 'inferencial')
  const falloVocabulario = preguntasErradas.some(p => p.tipo === 'vocabulario')

  let baseMsg = ""
  if (bien) {
    baseMsg = `¡Qué gran lectura, ${nombreChild}! Leíste con súper atención.`
  } else if (regular) {
    baseMsg = `¡Buen intento, ${nombreChild}! Tu cerebro está creciendo.`
  } else {
    baseMsg = `No te preocupes, ${nombreChild}. ¡El camino del lector se hace paso a paso!`
  }

  let tipMsg = ""
  if (tuvoDudas) {
    tipMsg = " Vi que tuviste dudas al leer (marcaste amarillo/rojo en el semáforo). ¡Darte cuenta es genial! Recordá Releer 📖 ese pedacito la próxima vez."
  } else if (falloVocabulario) {
    tipMsg = " Si encontrás palabras difíciles, intentá leer las oraciones de antes y después ➡️ para adivinar qué significa por el contexto."
  } else if (falloInferencial) {
    tipMsg = " Para responder preguntas que no están escritas en el texto, usá pistas del cuento y conéctalas con lo que ya sabés 🧠."
  } else if (falloLiteral) {
    tipMsg = " Si te olvidás de algún detalle, recordá que siempre podés volver atrás y buscar el dato en la lectura 📖."
  } else {
    tipMsg = " ¡Seguí usando tus herramientas de súper lector para explorar nuevos mundos!"
  }

  const mensajeCompanero = baseMsg + " " + tipMsg
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
