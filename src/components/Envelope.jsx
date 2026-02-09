import { useState } from 'react'
import './Envelope.css'

function Envelope({ onOpen }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isOpening, setIsOpening] = useState(false)

    const handleOpen = (e) => {
        e.preventDefault()
        if (isOpening) return
        setIsOpening(true)

        // Wait for animation then trigger open
        setTimeout(() => {
            onOpen()
        }, 1000)
    }

    return (
        <div
            className={`envelope ${isHovered ? 'hovered' : ''} ${isOpening ? 'opening' : ''}`}
            onClick={handleOpen}
            onTouchEnd={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleOpen(e)}
            aria-label="Abrir carta de San Valentín"
            style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
            {/* Envelope Shadows and Glow */}
            <div className="envelope-glow"></div>

            {/* Main Envelope Body */}
            <div className="envelope-body">
                {/* Paper inside */}
                <div className="envelope-paper">
                    <div className="paper-lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                {/* Heart seal */}
                <div className="heart-seal">
                    <span className="heart-emoji">💌</span>
                    <div className="seal-glow"></div>
                </div>

                {/* Text */}
                <p className="envelope-text">
                    <span className="tap-icon">👆</span>
                    Toca para abrir
                </p>
            </div>

            {/* Envelope Flap */}
            <div className="envelope-flap">
                <div className="flap-inner"></div>
            </div>

            {/* Decorative Hearts */}
            <div className="envelope-hearts">
                <span className="deco-heart" style={{ '--delay': '0s' }}>💕</span>
                <span className="deco-heart" style={{ '--delay': '0.2s' }}>💗</span>
                <span className="deco-heart" style={{ '--delay': '0.4s' }}>💕</span>
            </div>
        </div>
    )
}

export default Envelope
