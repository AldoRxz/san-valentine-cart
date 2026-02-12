import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './LoveLetter.css'

const letterLines = [
    'Mi Jacky hermosa,',
    '',
    'Perdóname si últimamente',
    'no he estado al 100% contigo.',
    '',
    'Sé que a veces me dejo llevar',
    'por mis ocupaciones y, sin querer,',
    'no te he dedicado el tiempo',
    'y la atención que te mereces.',
    '',
    'Reconozco que descuidé un poco',
    'la relación y lamento haberte',
    'hecho sentir en segundo plano.',
    'No es lo que quiero para nosotros.',
    '',
    'Me importas mucho y tengo muchas',
    'ganas de seguir contigo.',
    '',
    'Solo te pido la oportunidad',
    'de organizarme mejor para',
    'demostrarte que eres mi prioridad,',
    'pasando más tiempo de calidad juntos',
    'y cuidando lo que tenemos,',
    'sin distracciones.',
    '',
    'Te quiero mucho. ❤️',
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
