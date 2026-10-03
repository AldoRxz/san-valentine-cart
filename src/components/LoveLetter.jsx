import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './LoveLetter.css'
import { letterLines, letterPhoto } from '../config'

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

            {/* Photo below (optional) */}
            {letterPhoto.src && (
                <div className={`letter-photo-container ${isComplete ? 'visible' : ''}`}>
                    <img
                        src={letterPhoto.src}
                        alt="Nosotros"
                        className="letter-photo"
                    />
                    <p className="letter-photo-caption">{letterPhoto.caption}</p>
                </div>
            )}

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
