import { useState, useEffect } from 'react'
import i18n from '../i18n/es'
import './BarraAccesibilidad.css'

export default function BarraAccesibilidad() {
  const [dislexia, setDislexia] = useState(false)
  const [letraGrande, setLetraGrande] = useState(false)
  const [altoContraste, setAltoContraste] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('fuente-dislexia', dislexia)
  }, [dislexia])

  useEffect(() => {
    document.body.classList.toggle('letra-grande', letraGrande)
  }, [letraGrande])

  useEffect(() => {
    document.body.classList.toggle('alto-contraste', altoContraste)
  }, [altoContraste])

  return (
    <nav className="barra-accesibilidad" aria-label="Opciones de accesibilidad">
      <button
        className={`accesibilidad-btn ${dislexia ? 'activo' : ''}`}
        onClick={() => setDislexia(prev => !prev)}
        title={i18n.accesibilidad.fuente_dislexia}
        aria-pressed={dislexia}
      >
        <span className="btn-icon">🔤</span>
        <span className="btn-label">{i18n.accesibilidad.fuente_dislexia}</span>
      </button>
      <button
        className={`accesibilidad-btn ${letraGrande ? 'activo' : ''}`}
        onClick={() => setLetraGrande(prev => !prev)}
        title={i18n.accesibilidad.letra_grande}
        aria-pressed={letraGrande}
      >
        <span className="btn-icon">Aa</span>
        <span className="btn-label">{i18n.accesibilidad.letra_grande}</span>
      </button>
      <button
        className={`accesibilidad-btn ${altoContraste ? 'activo' : ''}`}
        onClick={() => setAltoContraste(prev => !prev)}
        title={i18n.accesibilidad.alto_contraste}
        aria-pressed={altoContraste}
      >
        <span className="btn-icon">◐</span>
        <span className="btn-label">{i18n.accesibilidad.alto_contraste}</span>
      </button>
    </nav>
  )
}
