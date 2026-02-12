import { useMemo } from 'react'
import './TwinklingStars.css'

function TwinklingStars() {
    const stars = useMemo(() => {
        return Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 3,
            delay: Math.random() * 6,
            duration: 2 + Math.random() * 4,
            opacity: 0.2 + Math.random() * 0.6,
        }))
    }, [])

    return (
        <div className="twinkling-stars-container">
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="twinkle-star"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                        '--star-opacity': s.opacity,
                    }}
                />
            ))}
        </div>
    )
}

export default TwinklingStars
