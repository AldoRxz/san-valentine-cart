import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import './HeartTree.css'

function HeartTree() {
    const heartEmojis = ['💖', '💗', '💕', '💓', '💝', '❤️', '💘', '🩷', '💞']

    // Generate heart leaves positions around the tree crown
    const heartLeaves = useMemo(() => {
        const leaves = []
        const layers = [
            // Bottom layer (wider)
            { y: 75, xRange: [-120, 120], count: 7, size: 1.1 },
            // Mid-bottom layer
            { y: 60, xRange: [-105, 105], count: 6, size: 1.0 },
            // Middle layer
            { y: 47, xRange: [-90, 90], count: 6, size: 1.0 },
            // Mid-top layer
            { y: 35, xRange: [-70, 70], count: 5, size: 0.95 },
            // Top layer (narrower)
            { y: 23, xRange: [-50, 50], count: 4, size: 0.9 },
            // Very top
            { y: 13, xRange: [-30, 30], count: 3, size: 0.85 },
        ]

        let index = 0
        layers.forEach((layer) => {
            for (let i = 0; i < layer.count; i++) {
                const xSpread = layer.xRange[1] - layer.xRange[0]
                const x = layer.xRange[0] + (xSpread / (layer.count - 1 || 1)) * i
                const yOffset = (Math.random() - 0.5) * 12
                const xOffset = (Math.random() - 0.5) * 15

                leaves.push({
                    id: index,
                    x: 50 + ((x + xOffset) / 300) * 100,
                    y: layer.y + yOffset,
                    emoji: heartEmojis[index % heartEmojis.length],
                    delay: 2.5 + index * 0.08,
                    scale: layer.size + Math.random() * 0.15,
                })
                index++
            }
        })
        return leaves
    }, [])

    // Generate falling hearts
    const fallingHearts = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            emoji: heartEmojis[i % heartEmojis.length],
            delay: 4 + Math.random() * 6,
            duration: 5 + Math.random() * 5,
            size: 0.6 + Math.random() * 0.6,
        }))
    }, [])

    // Generate grass blades
    const grassBlades = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: -80 + (i * 8) + (Math.random() - 0.5) * 6,
            height: 8 + Math.random() * 14,
            rotation: (Math.random() - 0.5) * 30,
            delay: 1.5 + Math.random() * 1,
        }))
    }, [])

    // Generate sparkle particles
    const sparkles = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: 15 + Math.random() * 70,
            y: 10 + Math.random() * 60,
            delay: 3 + Math.random() * 4,
            duration: 2 + Math.random() * 3,
        }))
    }, [])

    return (
        <div className="heart-tree-page">
            <h1 className="page-title">🌳 Nuestro Árbol del Amor 🌳</h1>

            <div className="tree-container">
                {/* Glow behind tree */}
                <div className="tree-glow"></div>

                {/* Tree trunk */}
                <div className="tree-trunk"></div>

                {/* Branches */}
                <div className="branch branch-left-1"></div>
                <div className="branch branch-left-2"></div>
                <div className="branch branch-left-3"></div>
                <div className="branch branch-left-4"></div>
                <div className="branch branch-right-1"></div>
                <div className="branch branch-right-2"></div>
                <div className="branch branch-right-3"></div>
                <div className="branch branch-right-4"></div>

                {/* Tree Crown with heart leaves */}
                <div className="tree-crown">
                    {/* Big heart on top */}
                    <div className="tree-top-heart">💖</div>

                    {/* Heart leaves */}
                    {heartLeaves.map((leaf) => (
                        <span
                            key={leaf.id}
                            className="heart-leaf"
                            style={{
                                left: `${leaf.x}%`,
                                top: `${leaf.y}%`,
                                animationDelay: `${leaf.delay}s`,
                                fontSize: `${leaf.scale}em`,
                            }}
                        >
                            {leaf.emoji}
                        </span>
                    ))}

                    {/* Sparkle particles */}
                    {sparkles.map((s) => (
                        <div
                            key={s.id}
                            className="tree-sparkle"
                            style={{
                                left: `${s.x}%`,
                                top: `${s.y}%`,
                                animationDelay: `${s.delay}s`,
                                animationDuration: `${s.duration}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Ground */}
                <div className="tree-ground">
                    {grassBlades.map((blade) => (
                        <div
                            key={blade.id}
                            className="grass-blade"
                            style={{
                                left: `calc(50% + ${blade.x}px)`,
                                '--grass-height': `${blade.height}px`,
                                '--grass-rotate': `${blade.rotation}deg`,
                                animationDelay: `${blade.delay}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Falling hearts */}
                {fallingHearts.map((h) => (
                    <span
                        key={h.id}
                        className="falling-heart"
                        style={{
                            left: `${h.x}%`,
                            animationDelay: `${h.delay}s`,
                            animationDuration: `${h.duration}s`,
                            fontSize: `${h.size}rem`,
                        }}
                    >
                        {h.emoji}
                    </span>
                ))}
            </div>

            <p className="tree-subtitle">
                Cada corazón representa un momento especial juntos 💕
            </p>

            <Link to="/" className="back-button">
                <span>💌</span>
                <span>Volver a la Carta</span>
            </Link>
        </div>
    )
}

export default HeartTree
