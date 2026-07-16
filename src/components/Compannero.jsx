import { useSesion } from '../context/SesionContext'
import './Compannero.css'

const EXPRESIONES = {
  normal: {
    ojo_izq: 'M 30 37 a 5 5 0 1 1 10 0',
    ojo_der: 'M 56 37 a 5 5 0 1 1 10 0',
    boca: 'M 38 56 Q 43 60 48 56 Q 53 60 58 56',
    color: '#4F46E5',
    pupila_izq: 'M 32 37 a 2 2 0 1 1 4 0',
    pupila_der: 'M 58 37 a 2 2 0 1 1 4 0',
  },
  feliz: {
    ojo_izq: 'M 30 35 a 5 5 0 1 1 10 0',
    ojo_der: 'M 56 35 a 5 5 0 1 1 10 0',
    boca: 'M 36 54 Q 43 64 50 54 Q 57 64 60 54',
    color: '#10B981',
    pupila_izq: 'M 32 35 a 2 2 0 1 1 4 0',
    pupila_der: 'M 58 35 a 2 2 0 1 1 4 0',
  },
  pensativo: {
    ojo_izq: 'M 30 39 a 5 5 0 1 1 10 0',
    ojo_der: 'M 56 37 a 5 5 0 1 1 10 0',
    boca: 'M 40 60 Q 47 56 56 60',
    color: '#F59E0B',
    pupila_izq: 'M 33 40 a 2 2 0 1 1 4 0',
    pupila_der: 'M 59 39 a 2 2 0 1 1 4 0',
  },
  preocupado: {
    ojo_izq: 'M 30 40 a 5 5 0 1 1 10 0',
    ojo_der: 'M 56 40 a 5 5 0 1 1 10 0',
    boca: 'M 38 62 Q 47 58 58 62',
    color: '#EF4444',
    pupila_izq: 'M 32 41 a 2 2 0 1 1 4 0',
    pupila_der: 'M 58 41 a 2 2 0 1 1 4 0',
  },
  animando: {
    ojo_izq: 'M 30 33 a 6 6 0 1 1 12 0',
    ojo_der: 'M 56 33 a 6 6 0 1 1 12 0',
    boca: 'M 34 52 Q 43 66 52 52 Q 57 62 62 52',
    color: '#8B5CF6',
    pupila_izq: 'M 33 33 a 2 2 0 1 1 4 0',
    pupila_der: 'M 59 33 a 2 2 0 1 1 4 0',
  },
}

export default function Compannero({ expresion = 'normal', mensaje, tamano = 'normal' }) {
  const { pantalla, PANTALLAS } = useSesion()
  const esInicio = pantalla === PANTALLAS.INICIO
  if (!esInicio && !mensaje) return null

  const expr = EXPRESIONES[expresion] || EXPRESIONES.normal
  const size = tamano === 'grande' ? 200 : 100

  return (
    <div className={`compannero ${esInicio ? 'compannero-inicio' : 'compannero-flotante'}`}>
      <div className="compannero-avatar">
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Cuerpo principal */}
          <rect x="22" y="20" width="56" height="56" rx="16" fill={expr.color} opacity="0.12" />
          <rect x="25" y="22" width="50" height="52" rx="14" fill="white" stroke={expr.color} strokeWidth="2" />
          
          {/* Cabeza */}
          <circle cx="50" cy="35" r="18" fill="white" stroke={expr.color} strokeWidth="2" />
          <circle cx="50" cy="35" r="17" fill={expr.color} opacity="0.06" />
          
          {/* Antenas / orejas tecnológicas */}
          <rect x="30" y="14" width="4" height="6" rx="2" fill={expr.color} opacity="0.5" />
          <rect x="66" y="14" width="4" height="6" rx="2" fill={expr.color} opacity="0.5" />
          <circle cx="32" cy="13" r="3" fill={expr.color} opacity="0.7" />
          <circle cx="68" cy="13" r="3" fill={expr.color} opacity="0.7" />
          
          {/* Ojos */}
          <circle cx="37" cy="33" r="7" fill="white" stroke={expr.color} strokeWidth="1.5" />
          <circle cx="63" cy="33" r="7" fill="white" stroke={expr.color} strokeWidth="1.5" />
          <circle cx="39" cy="33" r="4" fill={expr.color} />
          <circle cx="65" cy="33" r="4" fill={expr.color} />
          <circle cx="40" cy="31" r="1.5" fill="white" />
          <circle cx="66" cy="31" r="1.5" fill="white" />
          
          {/* Cejas */}
          <path d="M 30 26 Q 35 23 42 26" stroke={expr.color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 58 26 Q 65 23 70 26" stroke={expr.color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Boca */}
          <path d={expr.boca} stroke={expr.color} strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Brazo izquierdo - señalando */}
          <path d="M 25 42 L 8 32" stroke={expr.color} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 8 32 L 3 28" stroke={expr.color} strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Mano señalando */}
          <circle cx="3" cy="28" r="3" fill={expr.color} />
          {/* Dedo índice */}
          <line x1="3" y1="28" x2="0" y2="20" stroke={expr.color} strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Brazo derecho */}
          <path d="M 75 48 L 88 42" stroke={expr.color} strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="90" cy="41" r="3" fill={expr.color} />
          
          {/* Pantalla / cuerpo con detalles tecnológicos */}
          <rect x="35" y="52" width="30" height="18" rx="4" fill={expr.color} opacity="0.08" stroke={expr.color} strokeWidth="1" />
          {/* Líneas de código en la pantalla */}
          <line x1="39" y1="57" x2="52" y2="57" stroke={expr.color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
          <line x1="39" y1="61" x2="56" y2="61" stroke={expr.color} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
          <line x1="39" y1="65" x2="48" y2="65" stroke={expr.color} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
          
          {/* Nombre ISLA */}
          {esInicio && (
            <text x="50" y="84" textAnchor="middle" fill={expr.color} fontSize="10" fontWeight="800" fontFamily="sans-serif">
              ISLA
            </text>
          )}
        </svg>
      </div>
      {mensaje && (
        <div className="compannero-burbuja animar-entrada">
          <p>{mensaje}</p>
        </div>
      )}
    </div>
  )
}
