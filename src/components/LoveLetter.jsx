import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './LoveLetter.css'

const letterLines = [
    'Mi Jacky hermosa,',
    '',
    'Sé que no siempre he sido perfecto,',
    'y que muchas veces no te di',
    'el tiempo que te mereces.',
    '',
    'Reconozco que hubo momentos',
    'en los que no estuve presente',
    'como debí haber estado,',
    'y por eso te pido perdón.',
    '',
    'Pero quiero que sepas algo:',
    'lo que siento por ti es real.',
    'Quiero seguir a tu lado,',
    'quiero demostrarte cada día',
    'que puedo ser mejor para ti.',
    '',
    'Dame otra oportunidad',
    'para quererte como mereces.',
    'Para dedicarte mi tiempo,',
    'mi atención, y todo mi corazón.',
    '',
    'Quiero seguir construyendo',
    'nuestra historia juntos,',
    'aprender de mis errores',
    'y hacerte la mujer más feliz.',
    '',
    'Porque tú eres mi persona favorita,',
    'y no me imagino mi vida sin ti.',
    '',
    'Te quiero con todo lo que soy,',
    'hoy y siempre. ❤️',
    '',
    'Tuyo por siempre,',
    'Aldo 💕',
]

function LoveLetter() {
    const [visibleChars, setVisibleChars] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const letterRef = useRef(null)

    const fullText = letterLines.join('\n')
    const totalChars = fullText.length

    useEffect(() => {
        if (visibleChars >= totalChars) {
            setIsComplete(true)
            return
        }

        const speed = fullText[visibleChars] === '\n' ? 200 : 45
        const timer = setTimeout(() => {
            setVisibleChars((prev) => prev + 1)
        }, speed)

        return () => clearTimeout(timer)
    }, [visibleChars, totalChars, fullText])

    // Auto-scroll as text appears
    useEffect(() => {
        if (letterRef.current) {
            letterRef.current.scrollTop = letterRef.current.scrollHeight
        }
    }, [visibleChars])

    const displayedText = fullText.slice(0, visibleChars)

    return (
        <div className="love-letter-page">
            <div className="letter-scene">
                <div className="letter-paper" ref={letterRef}>
                    <div className="paper-lines"></div>

                    <div className="letter-text">
                        {displayedText.split('\n').map((line, i) => (
                            <p key={i} className={`letter-line ${i === 0 ? 'letter-greeting' : ''}`}>
                                {line || '\u00A0'}
                            </p>
                        ))}
                        {!isComplete && <span className="typing-cursor">|</span>}
                    </div>

                    {/* Decorative elements */}
                    <div className="letter-stamp">💌</div>
                    <div className="letter-wax">❤️</div>
                </div>
            </div>

            {/* Photo below */}
            <div className={`letter-photo-container ${isComplete ? 'visible' : ''}`}>
                <img
                    src="/Gemini_Generated_Image_f90a35f90a35f90a.png"
                    alt="Nosotros"
                    className="letter-photo"
                />
                <p className="letter-photo-caption">Tú y yo, siempre juntos 💕</p>
            </div>

            <div className={`letter-buttons ${isComplete ? 'visible' : ''}`}>
                <Link to="/" className="letter-back-btn">
                    <span>💌</span>
                    <span>Volver a la Carta</span>
                </Link>
            </div>
        </div>
    )
}

export default LoveLetter
