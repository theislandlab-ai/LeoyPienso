import { useState, useEffect } from 'react'
import { useSesion } from '../context/SesionContext'
import { cargarTextosPorNivel } from '../utils/contenido'
import i18n from '../i18n/es'
import './PantallaSeleccion.css'

export default function PantallaSeleccion() {
  const { nivel, iniciarSesion, irAInicio } = useSesion()
  const [textos, setTextos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!nivel) return
    setCargando(true)
    cargarTextosPorNivel(nivel)
      .then(setTextos)
      .finally(() => setCargando(false))
  }, [nivel])

  if (cargando) {
    return (
      <div className="seleccion animar-entrada">
        <p className="cargando">Cargando textos...</p>
      </div>
    )
  }

  return (
    <div className="seleccion animar-slide">
      <button className="btn-volver" onClick={irAInicio}>← Volver</button>
      <h2 className="seleccion-titulo">{i18n.inicio.elegir_texto}</h2>

      <div className="lista-textos">
        {textos.map(texto => (
          <button
            key={texto.id}
            className="texto-card"
            onClick={() => iniciarSesion(nivel, texto)}
          >
            <span className="texto-genero">{texto.genero}</span>
            <h3 className="texto-titulo">{texto.titulo}</h3>
            <p className="texto-palabras">{texto.palabras} palabras</p>
          </button>
        ))}
      </div>
    </div>
  )
}
