import { useState } from 'react'
import './Semaforo.css'

export default function Semaforo({ onResponder, mensaje }) {
  const [seleccion, setSeleccion] = useState(null)

  function confirmar() {
    if (seleccion !== null) onResponder(seleccion)
  }

  return (
    <div className="semaforo animar-entrada">
      <p className="semaforo-mensaje">{mensaje}</p>
      <div className="semaforo-opciones">
        <button
          className={`semaforo-btn verde ${seleccion === 'verde' ? 'activo' : ''}`}
          onClick={() => setSeleccion('verde')}
        >
          <span className="semaforo-emoji">🟢</span>
          <span>Entiendo bien</span>
        </button>
        <button
          className={`semaforo-btn amarillo ${seleccion === 'amarillo' ? 'activo' : ''}`}
          onClick={() => setSeleccion('amarillo')}
        >
          <span className="semaforo-emoji">🟡</span>
          <span>Más o menos</span>
        </button>
        <button
          className={`semaforo-btn rojo ${seleccion === 'rojo' ? 'activo' : ''}`}
          onClick={() => setSeleccion('rojo')}
        >
          <span className="semaforo-emoji">🔴</span>
          <span>No entiendo</span>
        </button>
      </div>
      <button className="btn-chico" onClick={confirmar} disabled={!seleccion}>
        Continuar
      </button>
    </div>
  )
}
