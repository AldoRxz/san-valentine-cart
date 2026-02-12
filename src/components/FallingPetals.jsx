import { useMemo } from 'react'
import './FallingPetals.css'

function FallingPetals() {
    const petals = useMemo(() => {
        return Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 12,
            duration: 8 + Math.random() * 8,
            size: 10 + Math.random() * 14,
            drift: (Math.random() - 0.5) * 80,
            rotation: Math.random() * 360,
            opacity: 0.3 + Math.random() * 0.5,
            color: ['#fbb6ce', '#f9a8d4', '#fbcfe8', '#f472b6', '#fce7f3'][i % 5],
        }))
    }, [])

    return (
        <div className="falling-petals-container">
            {petals.map((p) => (
                <div
                    key={p.id}
                    className="petal"
                    style={{
                        left: `${p.x}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        '--petal-size': `${p.size}px`,
                        '--petal-drift': `${p.drift}px`,
                        '--petal-rotation': `${p.rotation}deg`,
                        '--petal-opacity': p.opacity,
                        '--petal-color': p.color,
                    }}
                />
            ))}
        </div>
    )
}

export default FallingPetals
