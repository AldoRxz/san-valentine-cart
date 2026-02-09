import { useEffect, useState } from 'react'
import './ValentineCard.css'

function ValentineCard({ onReset }) {
    const [isVisible, setIsVisible] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })

    const recipientName = import.meta.env.VITE_RECIPIENT_NAME || 'Mi Amor'

    // Fecha de inicio desde variable de entorno
    const startDate = new Date(import.meta.env.VITE_START_DATE || '2025-06-13')

    useEffect(() => {
        // Trigger entrance animation
        requestAnimationFrame(() => {
            setIsVisible(true)
        })

        // Show message after card appears
        const messageTimer = setTimeout(() => {
            setShowMessage(true)
        }, 800)

        // Actualizar el contador cada segundo
        const updateCounter = () => {
            const now = new Date()
            const diff = now - startDate

            const totalSeconds = Math.floor(diff / 1000)
            const totalMinutes = Math.floor(totalSeconds / 60)
            const totalHours = Math.floor(totalMinutes / 60)
            const totalDays = Math.floor(totalHours / 24)

            // Calcular meses y días aproximados
            const months = Math.floor(totalDays / 30.44)
            const days = Math.floor(totalDays % 30.44)
            const hours = totalHours % 24
            const minutes = totalMinutes % 60
            const seconds = totalSeconds % 60

            setTimeElapsed({ months, days, hours, minutes, seconds })
        }

        updateCounter()
        const counterInterval = setInterval(updateCounter, 1000)

        return () => {
            clearTimeout(messageTimer)
            clearInterval(counterInterval)
        }
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

                {/* Anime GIF */}
                <div className="anime-gif-container">
                    <img
                        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemp0aHNoeHpsNmg5cnJhYzk3MmF2ZHdlcXU2NTc2dThhOXFqenZwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eHvTEDvKPjdc4ovRUb/giphy.gif"
                        alt="Anime couple"
                        className="anime-gif"
                    />
                </div>

                {/* Message */}
                <div className={`card-message ${showMessage ? 'show' : ''}`}>
                    <p className="message-text">
                        {message}
                    </p>
                </div>

                {/* Foto de Nosotros */}
                <div className="couple-photo-section">
                    <div className="couple-photo-container">
                        <img
                            src="/photo.jpg"
                            alt="Nosotros"
                            className="couple-photo"
                        />
                        <div className="photo-heart">💕</div>
                    </div>
                    <p className="photo-caption">Tú & Yo 💖</p>
                </div>

                {/* Contador de tiempo juntos */}
                <div className="time-counter-section">
                    <h3 className="counter-title">💕 Tiempo desde que empezamos a hablar 💕</h3>
                    <div className="time-counter">
                        <div className="time-unit">
                            <span className="time-number">{timeElapsed.months}</span>
                            <span className="time-label">meses</span>
                        </div>
                        <div className="time-unit">
                            <span className="time-number">{timeElapsed.days}</span>
                            <span className="time-label">días</span>
                        </div>
                        <div className="time-unit">
                            <span className="time-number">{timeElapsed.hours}</span>
                            <span className="time-label">horas</span>
                        </div>
                        <div className="time-unit">
                            <span className="time-number">{timeElapsed.minutes}</span>
                            <span className="time-label">min</span>
                        </div>
                        <div className="time-unit">
                            <span className="time-number">{timeElapsed.seconds}</span>
                            <span className="time-label">seg</span>
                        </div>
                    </div>
                    <p className="counter-message">...y contando ✨</p>
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
