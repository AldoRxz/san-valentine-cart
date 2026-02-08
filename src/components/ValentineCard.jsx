import { useEffect, useState } from 'react'
import './ValentineCard.css'

function ValentineCard({ onReset }) {
    const [isVisible, setIsVisible] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const recipientName = import.meta.env.VITE_RECIPIENT_NAME || 'Mi Amor'

    useEffect(() => {
        // Trigger entrance animation
        requestAnimationFrame(() => {
            setIsVisible(true)
        })

        // Show message after card appears
        const messageTimer = setTimeout(() => {
            setShowMessage(true)
        }, 800)

        return () => clearTimeout(messageTimer)
    }, [])

    const message = `${recipientName}, en este San Valentín quiero decirte lo mucho que te quiero. Me encanta que compartamos gustos y sigamos viendo animes juntos. Sé que a veces estoy ocupado, pero quiero seguir estudiando y esforzándome para pronto poder dedicarte todo el tiempo que te mereces. Gracias por todo, espero seguir compartiendo mucho más contigo.`

    return (
        <div className={`valentine-card ${isVisible ? 'visible' : ''}`}>
            {/* Glow Effect */}
            <div className="card-glow"></div>

            {/* Card Content */}
            <div className="card-inner">
                {/* Decorative Corners */}
                <div className="corner top-left">✨</div>
                <div className="corner top-right">✨</div>
                <div className="corner bottom-left">🌹</div>
                <div className="corner bottom-right">🌹</div>

                {/* Header */}
                <header className="card-header">
                    <div className="hearts-decoration">
                        <span className="heart-icon" style={{ '--i': 0 }}>💖</span>
                        <span className="heart-icon" style={{ '--i': 1 }}>💗</span>
                        <span className="heart-icon" style={{ '--i': 2 }}>💖</span>
                    </div>

                    <h1 className="card-title">
                        <span className="title-line">Feliz San Valentín</span>
                    </h1>

                    <h2 className="recipient-name">
                        <span className="for-text">Para:</span> {recipientName} 💕
                    </h2>

                    <div className="title-decoration">
                        <span className="deco-line"></span>
                        <span className="deco-heart">💝</span>
                        <span className="deco-line"></span>
                    </div>
                </header>

                {/* Message */}
                <div className={`card-message ${showMessage ? 'show' : ''}`}>
                    <p className="message-text">
                        {message}
                    </p>
                </div>

                {/* Signature */}
                <footer className="card-footer">
                    <div className="signature">
                        <p className="with-love">Con todo mi amor,</p>
                        <div className="signature-heart">
                            <span>❤️</span>
                        </div>
                    </div>

                    <div className="flower-row">
                        <span className="flower" style={{ '--delay': '0s' }}>🌹</span>
                        <span className="flower" style={{ '--delay': '0.15s' }}>🌸</span>
                        <span className="flower" style={{ '--delay': '0.3s' }}>🌷</span>
                        <span className="flower" style={{ '--delay': '0.45s' }}>🌸</span>
                        <span className="flower" style={{ '--delay': '0.6s' }}>🌹</span>
                    </div>
                </footer>
            </div>

            {/* Reset Button */}
            <button className="reset-button" onClick={onReset}>
                <span className="btn-icon">💌</span>
                <span className="btn-text">Ver de nuevo</span>
            </button>
        </div>
    )
}

export default ValentineCard
