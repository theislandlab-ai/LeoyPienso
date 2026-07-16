import { useSesion } from './context/SesionContext'
import PantallaInicio from './components/PantallaInicio'
import PantallaSeleccion from './components/PantallaSeleccion'
import PantallaPrediccion from './components/PantallaPrediccion'
import PantallaLectura from './components/PantallaLectura'
import PantallaPreguntas from './components/PantallaPreguntas'
import PantallaResultados from './components/PantallaResultados'
import PantallaReflexion from './components/PantallaReflexion'
import MapaProgreso from './components/MapaProgreso'
import Compannero from './components/Compannero'
import BarraAccesibilidad from './components/BarraAccesibilidad'

export default function App() {
  const { pantalla, PANTALLAS } = useSesion()

  function renderPantalla() {
    switch (pantalla) {
      case PANTALLAS.INICIO:
        return <PantallaInicio />
      case PANTALLAS.SELECCION:
        return <PantallaSeleccion />
      case PANTALLAS.PREDICCION:
        return <PantallaPrediccion />
      case PANTALLAS.LECTURA:
        return <PantallaLectura />
      case PANTALLAS.PREGUNTAS:
      case PANTALLAS.ESTIMACION:
        return <PantallaPreguntas />
      case PANTALLAS.RESULTADOS:
        return <PantallaResultados />
      case PANTALLAS.REFLEXION:
        return <PantallaReflexion />
      case PANTALLAS.MAPA:
        return <MapaProgreso />
      default:
        return <PantallaInicio />
    }
  }

  return (
    <div className="app">
      <BarraAccesibilidad />
      <div className="pantalla animar-entrada">
        {renderPantalla()}
      </div>
      <Compannero />
    </div>
  )
}
