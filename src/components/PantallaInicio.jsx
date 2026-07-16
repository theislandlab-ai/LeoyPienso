import { useState } from 'react'
import { useSesion } from '../context/SesionContext'
import Compannero from './Compannero'
import { useProgreso } from '../hooks/useProgreso'
import i18n from '../i18n/es'
import './PantallaInicio.css'

export default function PantallaInicio() {
  const { irASeleccion, setNivel, irAMapa } = useSesion()
  const { contarNivel } = useProgreso()

  // --- ESTADO DEL NOMBRE DEL NIÑO ---
  const [nombreChild, setNombreChild] = useState(() => localStorage.getItem('isla-child-name') || '')
  const [mostrarModal, setMostrarModal] = useState(() => !localStorage.getItem('isla-child-name'))
  const [nombreInput, setNombreInput] = useState('')

  function elegirNivel(nivel) {
    setNivel(nivel)
    irASeleccion()
  }

  const guardarNombre = () => {
    if (!nombreInput.trim()) return
    const finalName = nombreInput.trim()
    localStorage.setItem('isla-child-name', finalName)
    setNombreChild(finalName)
    setMostrarModal(false)
  }

  return (
    <div className="inicio animar-slide">
      <div className="inicio-header">
        <h1 className="inicio-titulo">{i18n.app.title}</h1>
        <p className="inicio-subtitulo">
          {nombreChild ? `¡Hola, ${nombreChild}! ` : ''}
          {i18n.app.subtitle}
          {nombreChild && (
            <button 
              className="btn-editar-nombre" 
              onClick={() => {
                setNombreInput(nombreChild)
                setMostrarModal(true)
              }}
              title="Cambiar de nombre"
            >
              ✏️
            </button>
          )}
        </p>
      </div>

      <div className="inicio-grid">
        <div className="inicio-col-mascota">
          <Compannero
            expresion="feliz"
            mensaje={i18n.inicio.titulo}
            tamano="grande"
          />
        </div>

        <div className="inicio-col-contenido">
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
      </div>

      {mostrarModal && (
        <div className="nombre-modal-overlay">
          <div className="nombre-modal-content animar-entrada">
            <h2 className="nombre-modal-title">¡Hola! Soy ISLA 💫</h2>
            <p className="nombre-modal-desc">¿Cómo te llamás? Escribí tu nombre para empezar nuestra aventura de lectura.</p>
            <input 
              type="text" 
              className="nombre-input" 
              value={nombreInput}
              onChange={(e) => setNombreInput(e.target.value)}
              placeholder="Escribí tu nombre..."
              maxLength={20}
              onKeyDown={(e) => {
                if (e.key === 'Enter') guardarNombre()
              }}
              autoFocus
            />
            <button 
              className="btn-primario btn-guardar-nombre" 
              onClick={guardarNombre}
              disabled={!nombreInput.trim()}
            >
              ¡Listo!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
