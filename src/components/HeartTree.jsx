import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import FloatingHearts from './FloatingHearts'
import Sparkles from './Sparkles'
import './HeartTree.css'

function HeartTree() {
    const heartEmojis = ['💖', '💗', '💕', '💓', '💝', '❤️', '💘', '🩷', '💞']

    // Generate heart leaves positioned around the tree crown
    const heartLeaves = useMemo(() => {
        const leaves = []
        const layers = [
            { y: 78, xRange: [-130, 130], count: 8, size: 1.15 },
            { y: 65, xRange: [-115, 115], count: 7, size: 1.05 },
            { y: 53, xRange: [-95, 95], count: 6, size: 1.0 },
            { y: 42, xRange: [-75, 75], count: 5, size: 0.95 },
            { y: 30, xRange: [-55, 55], count: 4, size: 0.9 },
            { y: 18, xRange: [-35, 35], count: 3, size: 0.85 },
            { y: 8, xRange: [-15, 15], count: 2, size: 0.8 },
        ]

        let index = 0
        layers.forEach((layer) => {
            for (let i = 0; i < layer.count; i++) {
                const xSpread = layer.xRange[1] - layer.xRange[0]
                const x = layer.xRange[0] + (xSpread / (layer.count - 1 || 1)) * i
                const yOffset = (Math.random() - 0.5) * 10
                const xOffset = (Math.random() - 0.5) * 12

                leaves.push({
                    id: index,
                    x: 50 + ((x + xOffset) / 300) * 100,
                    y: layer.y + yOffset,
                    emoji: heartEmojis[index % heartEmojis.length],
                    delay: 2.5 + index * 0.07,
                    scale: layer.size + Math.random() * 0.15,
                })
                index++
            }
        })
        return leaves
    }, [])

    // Generate falling hearts
    const fallingHearts = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: 5 + Math.random() * 90,
            emoji: heartEmojis[i % heartEmojis.length],
            delay: 4 + Math.random() * 8,
            duration: 6 + Math.random() * 6,
            size: 0.6 + Math.random() * 0.5,
        }))
    }, [])

    // Generate grass blades
    const grassBlades = useMemo(() => {
        return Array.from({ length: 24 }, (_, i) => ({
            id: i,
            x: -90 + (i * 7.5) + (Math.random() - 0.5) * 5,
            height: 8 + Math.random() * 16,
            rotation: (Math.random() - 0.5) * 35,
            delay: 1.5 + Math.random() * 1.2,
        }))
    }, [])

    // Generate sparkle particles
    const sparkles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 5 + Math.random() * 70,
            delay: 3 + Math.random() * 5,
            duration: 2 + Math.random() * 3,
            size: 3 + Math.random() * 4,
        }))
    }, [])

    // Fireflies
    const fireflies = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: 15 + Math.random() * 70,
            y: 20 + Math.random() * 50,
            delay: Math.random() * 6,
            duration: 4 + Math.random() * 4,
        }))
    }, [])

    return (
        <div className="heart-tree-page">
            <FloatingHearts />
            <Sparkles />

            {/* Decorative circles background */}
            <div className="deco-circle deco-circle-1"></div>
            <div className="deco-circle deco-circle-2"></div>
            <div className="deco-circle deco-circle-3"></div>

            <h1 className="page-title">🌳 Nuestro Árbol del Amor 🌳</h1>
            <p className="page-intro">Un árbol que crece con cada momento juntos...</p>

            <div className="tree-scene">
                <div className="tree-container">
                    {/* Glow behind tree */}
                    <div className="tree-glow"></div>
                    <div className="tree-glow-secondary"></div>

                    {/* Tree trunk */}
                    <div className="tree-trunk">
                        <div className="trunk-texture"></div>
                    </div>

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
                                    width: `${s.size}px`,
                                    height: `${s.size}px`,
                                }}
                            />
                        ))}

                        {/* Fireflies */}
                        {fireflies.map((f) => (
                            <div
                                key={f.id}
                                className="firefly"
                                style={{
                                    left: `${f.x}%`,
                                    top: `${f.y}%`,
                                    animationDelay: `${f.delay}s`,
                                    animationDuration: `${f.duration}s`,
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
