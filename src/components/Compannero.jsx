import { useSesion } from '../context/SesionContext'
import './Compannero.css'

const EXPRESIONES = {
  normal: {
    color_tunic: '#4F46E5',
    color_accent: '#818CF8',
    blush: '#FBCFE8',
    mouth_d: 'M 38 54 Q 43 58 48 54 Q 53 58 58 54',
    brow_l: 'M 32 28 Q 36 25 42 27',
    brow_r: 'M 58 27 Q 64 25 68 28',
    eye_hl: 'M 37 31 a 2 2 0 1 1 4 0',
    eye_hr: 'M 59 31 a 2 2 0 1 1 4 0',
  },
  feliz: {
    color_tunic: '#10B981',
    color_accent: '#34D399',
    blush: '#FCE7F3',
    mouth_d: 'M 35 50 Q 43 62 51 50 Q 57 60 65 50',
    brow_l: 'M 32 26 Q 36 23 42 25',
    brow_r: 'M 58 25 Q 64 23 68 26',
    eye_hl: 'M 37 30 a 2 2 0 1 1 4 0',
    eye_hr: 'M 59 30 a 2 2 0 1 1 4 0',
  },
  pensativo: {
    color_tunic: '#F59E0B',
    color_accent: '#FBBF24',
    blush: '#FEF3C7',
    mouth_d: 'M 40 58 Q 47 54 56 58',
    brow_l: 'M 33 32 Q 38 34 42 32',
    brow_r: 'M 58 29 Q 64 27 68 30',
    eye_hl: 'M 37 34 a 2 2 0 1 1 4 0',
    eye_hr: 'M 59 31 a 2 2 0 1 1 4 0',
  },
  preocupado: {
    color_tunic: '#EF4444',
    color_accent: '#F87171',
    blush: '#FEE2E2',
    mouth_d: 'M 38 60 Q 47 56 58 60',
    brow_l: 'M 32 32 Q 36 35 42 33',
    brow_r: 'M 58 33 Q 64 35 68 32',
    eye_hl: 'M 37 35 a 2 2 0 1 1 4 0',
    eye_hr: 'M 59 35 a 2 2 0 1 1 4 0',
  },
  animando: {
    color_tunic: '#8B5CF6',
    color_accent: '#A78BFA',
    blush: '#EDE9FE',
    mouth_d: 'M 33 48 Q 43 64 53 48 Q 59 60 67 48',
    brow_l: 'M 32 24 Q 36 21 42 23',
    brow_r: 'M 58 23 Q 64 21 68 24',
    eye_hl: 'M 37 28 a 2 2 0 1 1 4 0',
    eye_hr: 'M 59 28 a 2 2 0 1 1 4 0',
  },
}

export default function Compannero({ expresion = 'normal', mensaje, tamano = 'normal' }) {
  const { pantalla, PANTALLAS } = useSesion()
  const esInicio = pantalla === PANTALLAS.INICIO
  if (!esInicio && !mensaje) return null

  const expr = EXPRESIONES[expresion] || EXPRESIONES.normal
  const size = tamano === 'grande' ? 240 : 120
  const s = tamano === 'grande' ? 1.0 : 0.5

  return (
    <div className={`compannero ${esInicio ? 'compannero-inicio' : 'compannero-flotante'}`}>
      <div className="compannero-avatar">
        <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Sombra suave */}
          <ellipse cx="50" cy="86" rx="20" ry="4" fill="#00000010" />

          {/* Piernas */}
          <rect x="36" y="76" width="8" height="8" rx="4" fill={expr.color_tunic} opacity="0.6" />
          <rect x="56" y="76" width="8" height="8" rx="4" fill={expr.color_tunic} opacity="0.6" />
          {/* Zapatos */}
          <ellipse cx="40" cy="85" rx="6" ry="3" fill={expr.color_tunic} opacity="0.8" />
          <ellipse cx="60" cy="85" rx="6" ry="3" fill={expr.color_tunic} opacity="0.8" />

          {/* Cuerpo - Túnica escolar */}
          <path d="M 30 40 Q 30 38 32 36 L 38 32 Q 40 30 42 30 L 58 30 Q 60 30 62 32 L 68 36 Q 70 38 70 40 L 72 72 Q 72 76 68 76 L 32 76 Q 28 76 28 72 Z" fill="white" stroke={expr.color_tunic} strokeWidth="2" />
          
          {/* Cuello de la túnica */}
          <path d="M 38 32 Q 40 36 42 34 L 50 33 L 58 34 Q 60 36 62 32" fill="white" stroke={expr.color_tunic} strokeWidth="1.5" />
          
          {/* Solapa izquierda de la túnica */}
          <path d="M 38 32 Q 40 38 42 34 L 46 40 L 44 48 L 40 44 Q 36 40 38 32" fill={expr.color_tunic} opacity="0.1" stroke={expr.color_tunic} strokeWidth="1" />
          
          {/* Botones de la túnica */}
          <circle cx="50" cy="42" r="2.5" fill={expr.color_accent} />
          <circle cx="50" cy="52" r="2.5" fill={expr.color_accent} />
          <circle cx="50" cy="62" r="2.5" fill={expr.color_accent} />

          {/* Brazos */}
          {/* Brazo izquierdo (señalando/animando) */}
          <path d="M 30 42 Q 18 45 12 38" stroke={expr.color_tunic} strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Mano izquierda señalando */}
          <circle cx="12" cy="38" r="4" fill="#FFE4C4" />
          <path d="M 10 36 L 6 28" stroke="#FFE4C4" strokeWidth="3" strokeLinecap="round" />
          <path d="M 8 29 L 5 26" stroke="#FFE4C4" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Brazo derecho */}
          <path d="M 70 42 Q 82 50 86 58" stroke={expr.color_tunic} strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Mano derecha */}
          <circle cx="86" cy="58" r="4" fill="#FFE4C4" />

          {/* Cabeza */}
          <circle cx="50" cy="20" r="16" fill="#FFE4C4" stroke={expr.color_tunic} strokeWidth="2" />

          {/* Cabello - flequillo */}
          <path d="M 34 16 Q 36 6 42 8 Q 46 2 50 6 Q 54 2 58 8 Q 64 6 66 16" fill={expr.color_tunic} opacity="0.8" />
          <path d="M 36 14 Q 40 8 44 10 Q 48 5 52 10 Q 56 8 64 14" fill={expr.color_accent} opacity="0.5" />

          {/* Moño/coleta en la cabeza */}
          <circle cx="50" cy="4" r="5" fill={expr.color_accent} />
          <path d="M 46 2 Q 48 -2 50 0 Q 52 -2 54 2" fill={expr.color_tunic} opacity="0.6" />

          {/* Ojos grandes y expresivos */}
          <ellipse cx="38" cy="20" rx="6" ry="7" fill="white" stroke={expr.color_tunic} strokeWidth="1.5" />
          <ellipse cx="62" cy="20" rx="6" ry="7" fill="white" stroke={expr.color_tunic} strokeWidth="1.5" />
          
          {/* Iris */}
          <circle cx="40" cy="20" r="4" fill={expr.color_tunic} />
          <circle cx="64" cy="20" r="4" fill={expr.color_tunic} />
          
          {/* Brillo de ojos (pupila) */}
          <circle cx="38" cy="18" r="2" fill="white" />
          <circle cx="62" cy="18" r="2" fill="white" />
          <circle cx={expr.eye_hl.includes('37') ? 41 : 39} cy={expr.eye_hl.includes('31') ? 22 : 20} r="1.2" fill="white" opacity="0.7" />
          <circle cx={expr.eye_hr.includes('59') ? 65 : 63} cy={expr.eye_hr.includes('31') ? 22 : 20} r="1.2" fill="white" opacity="0.7" />

          {/* Cejas */}
          <path d={expr.brow_l} stroke={expr.color_tunic} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d={expr.brow_r} stroke={expr.color_tunic} strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Mejillas sonrojadas */}
          <ellipse cx="30" cy="24" rx="4" ry="3" fill={expr.blush} opacity="0.8" />
          <ellipse cx="70" cy="24" rx="4" ry="3" fill={expr.blush} opacity="0.8" />

          {/* Boca - sonrisa */}
          <path d={expr.mouth_d} stroke={expr.color_tunic} strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Lunares/pecas (opcional, da ternura) */}
          <circle cx="35" cy="27" r="0.8" fill={expr.color_tunic} opacity="0.2" />
          <circle cx="38" cy="28" r="0.8" fill={expr.color_tunic} opacity="0.2" />
          <circle cx="62" cy="28" r="0.8" fill={expr.color_tunic} opacity="0.2" />
          <circle cx="65" cy="27" r="0.8" fill={expr.color_tunic} opacity="0.2" />

          {/* Nombre ISLA */}
          {esInicio && (
            <text x="50" y="96" textAnchor="middle" fill={expr.color_tunic} fontSize="11" fontWeight="800" fontFamily="sans-serif" letterSpacing="2">
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
