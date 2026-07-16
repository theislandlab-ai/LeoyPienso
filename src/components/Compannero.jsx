import { useSesion } from '../context/SesionContext'
import './Compannero.css'

const EXPRESIONES = {
  normal: {
    ojos: 'M 35 35 Q 40 30 45 35',
    boca: 'M 35 60 Q 50 70 65 60',
    color: '#4F46E5',
  },
  feliz: {
    ojos: 'M 35 35 Q 40 30 45 35',
    boca: 'M 35 55 Q 50 75 65 55',
    color: '#10B981',
  },
  pensativo: {
    ojos: 'M 37 33 Q 40 37 43 33',
    boca: 'M 38 62 Q 50 58 62 62',
    color: '#F59E0B',
  },
  preocupado: {
    ojos: 'M 35 38 Q 40 35 45 38',
    boca: 'M 38 62 Q 50 68 62 62',
    color: '#EF4444',
  },
  animando: {
    ojos: 'M 35 33 Q 40 28 45 33',
    boca: 'M 32 55 Q 50 80 68 55',
    color: '#8B5CF6',
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
          <circle cx="50" cy="50" r="45" fill="#1E1B4B" />
          <circle cx="50" cy="50" r="43" fill={expr.color} opacity="0.15" />
          <ellipse cx="50" cy="45" rx="28" ry="25" fill="#FEF3C7" />
          <ellipse cx="36" cy="38" rx="8" ry="9" fill="white" />
          <ellipse cx="64" cy="38" rx="8" ry="9" fill="white" />
          <circle cx="38" cy="40" r="4" fill="#1F2937" />
          <circle cx="62" cy="40" r="4" fill="#1F2937" />
          <ellipse cx="50" cy="28" rx="12" ry="4" fill="#1E1B4B" opacity="0.8" />
          <path d={expr.ojos} stroke="#1F2937" strokeWidth="2" fill="none" />
          <path d={expr.boca} stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="75" rx="15" ry="6" fill="#FEF3C7" opacity="0.5" />
          <path d="M 20 40 Q 10 30 15 20" stroke="#1E1B4B" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M 80 40 Q 90 30 85 20" stroke="#1E1B4B" strokeWidth="3" fill="none" opacity="0.6" />
          {esInicio && (
            <>
              <text x="50" y="92" textAnchor="middle" fill="#8B5CF6" fontSize="8" fontWeight="bold">
                Lumi
              </text>
            </>
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
