import { useState, useEffect } from 'react'
import { useSesion } from '../context/SesionContext'
import './Compannero.css'

// --- FRASES DIVERTIDAS EN ESPAÑOL ---
const PHRASES = [
  "¡Hola! ¿Listo para sumergirte en una divertida aventura lectora? 📚",
  "¡Tu cerebro crece cada vez que lees un libro! ¡Sigue así! 🧠✨",
  "¡Eres súper inteligente! Me encanta leer contigo. ❤️",
  "¡Increíble! Cada palabra nueva es un superpoder para tu mente. ⚡",
  "¿Sabías que los libros pueden llevarte a mundos mágicos? 🧚‍♀️🧙‍♂️",
  "¡Me encanta el color que elegiste para mí! ¡Me veo genial! 🎨",
  "¡Wow! ¡Tus accesorios me quedan espectaculares! 🎩🕶️",
  "¡Cualquier momento es perfecto para abrir un libro y soñar! 🌟",
  "¡Qué bien lees! ¡Eres todo un explorador de historias! 🧭",
  "¡Choca esos cinco! ✋ ¡Sigamos leyendo juntos!"
];

const COLOR_THEMES = {
  green: {
    stop1: "#4ade80", stop2: "#059669",
    stroke: "#059669", accent: "#047857"
  },
  purple: {
    stop1: "#c084fc", stop2: "#7c3aed",
    stroke: "#7c3aed", accent: "#6d28d9"
  },
  blue: {
    stop1: "#60a5fa", stop2: "#2563eb",
    stroke: "#2563eb", accent: "#1d4ed8"
  },
  pink: {
    stop1: "#f472b6", stop2: "#db2777",
    stroke: "#db2777", accent: "#be185d"
  },
  orange: {
    stop1: "#fb923c", stop2: "#ea580c",
    stroke: "#ea580c", accent: "#c2410c"
  }
};

// --- SINTETIZADOR DE AUDIO (Web Audio API) ---
let audioCtx = null;
function playSound(type) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    
    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } 
    else if (type === 'dress') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(650, now + 0.05);
      osc.frequency.setValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } 
    else if (type === 'success') {
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const oscNode = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscNode.type = 'sine';
        oscNode.frequency.setValueAtTime(freq, now + idx * 0.08);
        oscNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.setValueAtTime(0.1, now + idx * 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);
        oscNode.start(now + idx * 0.08);
        oscNode.stop(now + idx * 0.08 + 0.25);
      });
    }
  } catch (e) {
    console.warn("AudioContext error", e);
  }
}

export default function Compannero({ expresion = 'normal', mensaje, tamano = 'normal' }) {
  const { pantalla, PANTALLAS } = useSesion()
  const esInicio = pantalla === PANTALLAS.INICIO

  // --- PREVENIR MASCOTA DUPLICADA EN LA PANTALLA DE INICIO ---
  // Si estamos en el inicio, el compañero flotante de App.jsx (tamano === 'normal') se oculta, 
  // dejando solo el compañero grande de la grilla principal.
  if (esInicio && tamano !== 'grande') return null

  // --- ESTADOS DE PERSONALIZACIÓN (Persistidos) ---
  const [skinColor, setSkinColor] = useState(() => localStorage.getItem('isla-color') || 'green')
  const [hat, setHat] = useState(() => localStorage.getItem('isla-hat') || 'none')
  const [hasGlasses, setHasGlasses] = useState(() => localStorage.getItem('isla-glasses') === 'true')

  // --- ESTADOS DE ANIMACIÓN ---
  const [isHappy, setIsHappy] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(mensaje)
  const [bubblePop, setBubblePop] = useState(false)

  // Sincronizar mensaje externo
  useEffect(() => {
    setCurrentMessage(mensaje)
  }, [mensaje])

  // Reaccionar a expresiones felices o de animación externas (ej. respuestas correctas)
  useEffect(() => {
    if (expresion === 'feliz' || expresion === 'animando') {
      setIsHappy(true)
      playSound('success')
      const timer = setTimeout(() => setIsHappy(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [expresion])

  // Ocultar si no estamos en inicio y no hay mensaje
  if (!esInicio && !currentMessage) return null

  const size = tamano === 'grande' ? '260px' : '135px'
  const theme = COLOR_THEMES[skinColor] || COLOR_THEMES.green

  // --- MANEJADORES ---
  const handleMascotClick = () => {
    playSound('click')
    
    // Activar giro
    setIsSpinning(true)
    
    // Activar cara feliz temporal
    setIsHappy(true)
    
    // Cambiar frase en burbuja
    const randIdx = Math.floor(Math.random() * PHRASES.length)
    setCurrentMessage(PHRASES[randIdx])
    
    // Re-activar rebote de burbuja
    setBubblePop(true)
    setTimeout(() => setBubblePop(false), 400)
    
    setTimeout(() => {
      setIsHappy(false)
    }, 1800)
  }

  const handleColorChange = (color) => {
    setSkinColor(color)
    localStorage.setItem('isla-color', color)
    playSound('dress')
    setCurrentMessage("¡Me encanta este nuevo color! ¿A que me veo genial? 🤩")
    setBubblePop(true)
    setTimeout(() => setBubblePop(false), 400)
  }

  const handleHatChange = (newHat) => {
    setHat(newHat)
    localStorage.setItem('isla-hat', newHat)
    playSound('dress')
    if (newHat === 'explorer') {
      setCurrentMessage("¡Listo para buscar palabras perdidas! 🤠🔎")
    } else if (newHat === 'wizard') {
      setCurrentMessage("¡ABRACADABRA! ¡Que aparezcan nuevos cuentos! 🧙‍♂️✨")
    } else {
      setCurrentMessage("¡Volví a mi estado natural, me siento libre! 😊")
    }
    setBubblePop(true)
    setTimeout(() => setBubblePop(false), 400)
  }

  const handleGlassesToggle = () => {
    const nextVal = !hasGlasses
    setHasGlasses(nextVal)
    localStorage.setItem('isla-glasses', String(nextVal))
    playSound('dress')
    if (nextVal) {
      setCurrentMessage("¡Ahora puedo leer letras de todos los tamaños! 🤓👓")
    } else {
      setCurrentMessage("¡Listo, guardé mis lentes de lectura!")
    }
    setBubblePop(true)
    setTimeout(() => setBubblePop(false), 400)
  }

  // Clases CSS dinámicas para la mascota
  const mascotClasses = [
    'mascot-container',
    isHappy ? 'happy' : '',
    isSpinning ? 'spin-anim' : '',
    hasGlasses ? 'has-glasses' : '',
    hat === 'explorer' ? 'has-explorer-hat' : '',
    hat === 'wizard' ? 'has-wizard-hat' : ''
  ].join(' ').trim()

  return (
    <div className={`compannero-wrapper ${esInicio ? 'compannero-inicio-wrapper' : 'compannero-flotante-wrapper'}`}>
      
      {/* Burbuja de Diálogo de ISLA */}
      {currentMessage && (
        <div className="speech-bubble-container">
          <div className={`speech-bubble ${bubblePop ? 'bubble-pop' : ''}`}>
            {currentMessage}
          </div>
        </div>
      )}

      {/* Contenedor del Personaje SVG Animado */}
      <div 
        className={mascotClasses}
        onClick={handleMascotClick}
        onAnimationEnd={() => setIsSpinning(false)}
        role="button"
        tabIndex="0"
        aria-label="Mascota interactiva ISLA"
        style={{ '--mascot-size': size }}
      >
        <svg className="isla-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="isla-body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.stop1} />
              <stop offset="100%" stopColor={theme.stop2} />
            </linearGradient>
            <radialGradient id="isla-body-shadow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
            </radialGradient>
          </defs>

          {/* Sombra de Base Flotante */}
          <ellipse className="mascot-shadow" cx="150" cy="275" rx="60" ry="12" />

          {/* Cuerpo Principal de ISLA */}
          <g className="mascot-body-group">
            
            {/* Antena y su luz */}
            <g className="antenna-group">
              <path d="M150,75 Q150,40 170,32" fill="none" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
              <circle className="antenna-light" cx="172" cy="28" r="10" fill="#facc15" />
            </g>

            {/* Brazos */}
            <path className="arm-left" d="M75,170 Q40,165 25,185" fill="none" stroke={theme.stroke} strokeWidth="12" strokeLinecap="round" />
            <g className="arm-right-group">
              <path className="arm-right" d="M225,170 Q255,165 270,185" fill="none" stroke={theme.stroke} strokeWidth="12" strokeLinecap="round" />
              <g className="magic-pencil" transform="translate(262, 172) rotate(15)">
                <path d="M0,0 L8,24 L16,24 L24,0 Z" fill="#f59e0b" />
                <polygon points="8,24 12,32 16,24" fill="#fecdd3" />
                <circle cx="12" cy="32" r="2.5" fill="#f43f5e" />
                <rect x="3" y="0" width="18" height="6" fill="#3b82f6" rx="1" />
              </g>
            </g>

            {/* Piernas y Pies */}
            <g className="legs-group">
              <rect x="110" y="225" width="14" height="25" rx="7" fill={theme.accent} />
              <ellipse cx="117" cy="252" rx="12" ry="7" fill="#334155" />
              <rect x="176" y="225" width="14" height="25" rx="7" fill={theme.accent} />
              <ellipse cx="183" cy="252" rx="12" ry="7" fill="#334155" />
            </g>

            {/* Forma del Cuerpo */}
            <path className="body-shape" d="M150,70 C215,70 245,115 245,175 C245,225 205,245 150,245 C95,245 55,225 55,175 C55,115 85,70 150,70 Z" fill="url(#isla-body-gradient)" />
            <path d="M150,70 C215,70 245,115 245,175 C245,225 205,245 150,245 C95,245 55,225 55,175 C55,115 85,70 150,70 Z" fill="url(#isla-body-shadow)" />

            {/* Túnica Blanca Uruguaya con Moña Azul */}
            <g className="uruguayan-tunic-group">
              {/* Túnica Blanca */}
              <path 
                className="tunic-white" 
                d="M57,180 C57,222 95,245 150,245 C205,245 243,222 243,180 C210,185 190,187 150,187 C110,187 90,185 57,180 Z" 
                fill="#ffffff" 
                stroke="#94a3b8" 
                strokeWidth="3" 
              />
              {/* Pliegues de la túnica */}
              <path d="M125,195 L125,236" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <path d="M175,195 L175,236" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              
              {/* Moña Azul Uruguaya */}
              <g className="blue-bow">
                {/* Colas de la moña */}
                <path d="M145,190 L130,223 L144,225 L150,195 Z" fill="#1e3a8a" />
                <path d="M155,190 L170,223 L156,225 L150,195 Z" fill="#1e3a8a" />
                {/* Lazos de la moña (loops) */}
                <path d="M146,188 C125,170 115,185 115,200 C115,213 135,205 146,192 Z" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
                <path d="M154,188 C175,170 185,185 185,200 C185,213 165,205 154,192 Z" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
                {/* Nudo central */}
                <rect x="142" y="182" width="16" height="12" rx="4" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="2" />
              </g>
            </g>

            {/* Rostro */}
            <g className="face-group">
              <circle cx="98" cy="172" r="12" fill="#ff8fa3" opacity="0.6" />
              <circle cx="202" cy="172" r="12" fill="#ff8fa3" opacity="0.6" />

              {/* OJO IZQUIERDO */}
              <g className="eye-group eye-left">
                <g className="eye-open">
                  <ellipse cx="115" cy="150" rx="18" ry="22" fill="#1e293b" />
                  <circle cx="110" cy="142" r="6" fill="#ffffff" />
                  <circle cx="121" cy="156" r="3.5" fill="#ffffff" />
                </g>
                <path className="eye-closed" d="M98,150 Q115,162 132,150" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
                <path className="eye-star" d="M115,134 L119,143 L129,144 L121,151 L123,161 L115,156 L107,161 L109,151 L101,144 L111,143 Z" fill="#facc15" />
              </g>

              {/* OJO DERECHO */}
              <g className="eye-group eye-right">
                <g className="eye-open">
                  <ellipse cx="185" cy="150" rx="18" ry="22" fill="#1e293b" />
                  <circle cx="180" cy="142" r="6" fill="#ffffff" />
                  <circle cx="191" cy="156" r="3.5" fill="#ffffff" />
                </g>
                <path className="eye-closed" d="M168,150 Q185,162 202,150" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
                <path className="eye-star" d="M185,134 L189,143 L199,144 L191,151 L193,161 L185,156 L177,161 L179,151 L171,144 L181,143 Z" fill="#facc15" />
              </g>

              <path className="mouth-smile" d="M140,178 Q150,188 160,178" fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
              <path className="mouth-happy" d="M138,178 Q150,202 162,178 Z" fill="#ef4444" stroke="#1e293b" strokeWidth="3" />
            </g>

            {/* ACCESORIOS */}
            <g className="accessory-glasses">
              <circle cx="115" cy="150" r="25" fill="none" stroke="#ea580c" strokeWidth="5.5" />
              <circle cx="185" cy="150" r="25" fill="none" stroke="#ea580c" strokeWidth="5.5" />
              <path d="M140,150 L160,150" stroke="#ea580c" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M90,150 Q75,145 70,155" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
              <path d="M210,150 Q225,145 230,155" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
            </g>

            <g className="accessory-explorer-hat">
              <path d="M90,75 C90,30 210,30 210,75 Z" fill="#d97706" stroke="#78350f" strokeWidth="3.5" />
              <path d="M90,67 C110,63 190,63 210,67 L210,75 C190,71 110,71 90,75 Z" fill="#15803d" />
              <path d="M60,75 C60,70 240,70 240,75 C240,84 60,84 60,75 Z" fill="#b45309" stroke="#78350f" strokeWidth="3.5" />
              <path d="M185,55 Q205,30 210,25 Q195,45 190,52 Z" fill="#ef4444" />
            </g>

            <g className="accessory-wizard-hat">
              <path d="M100,72 L150,5 L200,72 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="3.5" />
              <ellipse cx="150" cy="74" rx="65" ry="10" fill="#1d4ed8" stroke="#172554" strokeWidth="3.5" />
              <polygon points="150,22 152,27 157,27 153,30 155,35 150,32 145,35 147,30 143,27 148,27" fill="#facc15" />
              <polygon points="132,45 133,48 137,48 134,50 135,54 132,52 129,54 130,50 127,48 131,48" fill="#facc15" />
              <polygon points="168,45 169,48 173,48 170,50 171,54 168,52 165,54 166,50 163,48 167,48" fill="#facc15" />
            </g>

          </g>

          {/* Nombre ISLA */}
          {esInicio && (
            <text x="150" y="295" textAnchor="middle" fill={theme.stroke} fontSize="16" fontWeight="900" letterSpacing="3" fontFamily="sans-serif">
              ISLA
            </text>
          )}
        </svg>
      </div>

      {/* PANEL DE PERSONALIZACIÓN (Solo en la pantalla de inicio) */}
      {esInicio && (
        <div className="customizer-card">
          <h2 class="customizer-title">Viste y personaliza a ISLA</h2>
          
          <div className="control-group">
            <span className="control-label">Color de ISLA:</span>
            <div className="color-options">
              {Object.keys(COLOR_THEMES).map((color) => {
                const colors = COLOR_THEMES[color];
                return (
                  <button 
                    key={color}
                    className={`color-btn ${skinColor === color ? 'active' : ''}`}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Color ${color}`}
                    style={{ background: `linear-gradient(135deg, ${colors.stop1}, ${colors.stop2})` }}
                  />
                )
              })}
            </div>
          </div>

          <div className="control-group">
            <span className="control-label">Accesorios de cabeza:</span>
            <div className="accessory-options">
              <button 
                className={`accessory-btn ${hat === 'none' ? 'active' : ''}`}
                onClick={() => handleHatChange('none')}
              >
                Ninguno
              </button>
              <button 
                className={`accessory-btn ${hat === 'explorer' ? 'active' : ''}`}
                onClick={() => handleHatChange('explorer')}
              >
                Explorador
              </button>
              <button 
                className={`accessory-btn ${hat === 'wizard' ? 'active' : ''}`}
                onClick={() => handleHatChange('wizard')}
              >
                Mago
              </button>
            </div>
          </div>

          <div className="control-group">
            <span className="control-label">Complementos:</span>
            <div className="accessory-options">
              <button 
                className={`accessory-btn toggle-btn ${hasGlasses ? 'active' : ''}`}
                onClick={handleGlassesToggle}
              >
                {hasGlasses ? 'Quitar Lentes' : 'Usar Lentes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
