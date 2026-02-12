import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './ValentineCard.css'
import {
    useDoubleTap,
    useLongPress,
    useKissCounter,
    useShakeDetection,
    useSurpriseTimer,
    createHeartExplosion,
    createConfetti,
    createFloatingKiss,
    showSecretMessage,
    requestMotionPermission
} from '../hooks/useEasterEggs'

function ValentineCard({ onReset }) {
    const [isVisible, setIsVisible] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [motionEnabled, setMotionEnabled] = useState(false)

    const recipientName = import.meta.env.VITE_RECIPIENT_NAME || 'Mi Amor'

    // Fecha de inicio desde variable de entorno
    const startDate = new Date(import.meta.env.VITE_START_DATE || '2025-06-13')

    // ========== EASTER EGGS ==========

    // 1. Doble tap en el corazón → mensaje secreto
    const handleDoubleTap = useDoubleTap(() => {
        showSecretMessage(
            '¡Mensaje Secreto! 💕',
            'Cada día que pasa me doy cuenta de lo afortunado que soy de tenerte. Eres mi persona favorita en el mundo. Te amo más de lo que las palabras pueden expresar. 💖',
            '🥰'
        )
    })

    // 2. Long press → explosión de corazones
    const longPressHandlers = useLongPress(() => {
        createHeartExplosion(60)
    }, 800)

    // 3. Contador de besos → cada tap suma un beso
    const { kisses, addKiss } = useKissCounter(10, () => {
        showSecretMessage(
            '¡10 Besitos para ti! 💋',
            'Cada uno de estos besos representa lo mucho que te quiero. Pronto te los daré todos en persona... 😘💕',
            '💋'
        )
        createConfetti(150)
    })

    // 4. Agitar el teléfono → confetti
    const handleShake = useCallback(() => {
        createConfetti(80)
    }, [])

    useShakeDetection(handleShake, 15)

    // 5. Mensaje sorpresa después de 4 minutos (240000ms)
    useSurpriseTimer(240000, () => {
        showSecretMessage(
            '¡Sorpresa Especial! ⭐',
            'Has estado aquí por 4 minutos... Eso me hace muy feliz 🥺 Gracias por tomarte el tiempo de leer todo esto. Significa el mundo para mí. Te quiero con todo mi corazón. 💖',
            '🌟'
        )
        createHeartExplosion(100)
    })

    // Manejar el tap en el corazón grande
    const handleHeartTap = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top
        createFloatingKiss(x, y)
        addKiss()
    }, [addKiss])

    useEffect(() => {
        // Request motion permission on first interaction (for iOS)
        const enableMotion = async () => {
            const granted = await requestMotionPermission()
            setMotionEnabled(granted)
        }

        // Try to enable on first touch
        const handleFirstTouch = () => {
            enableMotion()
            window.removeEventListener('touchstart', handleFirstTouch)
        }
        window.addEventListener('touchstart', handleFirstTouch, { once: true })

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
                            src="/jacky.jpeg"
                            alt="Jacky y yo"
                            className="couple-photo"
                        />
                        <div className="photo-heart">💕</div>
                    </div>
                    <p className="photo-caption">Jacky & Yo 💖</p>
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

            {/* Buttons */}
            <div className="card-buttons-row">
                <button className="reset-button" onClick={onReset}>
                    <span className="btn-icon">💌</span>
                    <span className="btn-text">Ver de nuevo</span>
                </button>

                <Link to="/arbol" className="tree-nav-button">
                    <span>🌳</span>
                    <span>Nuestro Árbol de Amor</span>
                </Link>
            </div>
        </div>
    )
}

export default ValentineCard
