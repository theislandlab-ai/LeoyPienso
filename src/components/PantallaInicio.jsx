import { useSesion } from '../context/SesionContext'
import Compannero from './Compannero'
import { useProgreso } from '../hooks/useProgreso'
import i18n from '../i18n/es'
import './PantallaInicio.css'

export default function PantallaInicio() {
  const { irASeleccion, setNivel, irAMapa } = useSesion()
  const { contarNivel } = useProgreso()

  function elegirNivel(nivel) {
    setNivel(nivel)
    irASeleccion()
  }

  return (
    <div className="inicio animar-slide">
      <div className="inicio-header">
        <h1 className="inicio-titulo">{i18n.app.title}</h1>
        <p className="inicio-subtitulo">{i18n.app.subtitle}</p>
      </div>

      <Compannero
        expresion="feliz"
        mensaje={i18n.inicio.titulo}
        tamano="grande"
      />

      <div className="inicio-niveles">
        <button
          className="nivel-card nivel-exploradores"
          onClick={() => elegirNivel('exploradores')}
        >
          <div className="nivel-icono">🔵</div>
          <div className="nivel-info">
            <h2>{i18n.inicio.nivel_exploradores}</h2>
            <p>{i18n.inicio.nivel_exploradores_desc}</p>
            <span className="nivel-progreso">
              {contarNivel('exploradores')} textos leídos
            </span>
          </div>
        </button>

        <button
          className="nivel-card nivel-aventureros"
          onClick={() => elegirNivel('aventureros')}
        >
          <div className="nivel-icono">🟢</div>
          <div className="nivel-info">
            <h2>{i18n.inicio.nivel_aventureros}</h2>
            <p>{i18n.inicio.nivel_aventureros_desc}</p>
            <span className="nivel-progreso">
              {contarNivel('aventureros')} textos leídos
            </span>
          </div>
        </button>
      </div>

      <button className="btn-secundario" onClick={irAMapa}>
        {i18n.mapa.titulo}
      </button>
    </div>
  )
}
