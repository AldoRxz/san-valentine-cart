import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import FloatingHearts from './FloatingHearts'
import Sparkles from './Sparkles'
import './HeartTree.css'

function HeartTree() {
    const heartEmojis = ['💖', '💗', '💕', '💓', '💝', '❤️', '💘', '🩷', '💞']
    const flowerEmojis = ['🌸', '🌺', '🌷']

    // Generate heart leaves in a lush oval crown shape
    const heartLeaves = useMemo(() => {
        const leaves = []
        const totalHearts = 55
        let index = 0

        // Create oval canopy using parametric distribution
        for (let i = 0; i < totalHearts; i++) {
            // Golden angle distribution for natural look
            const angle = i * 137.508 * (Math.PI / 180)
            const r = Math.sqrt(i / totalHearts)

            // Oval shape: wider horizontally
            const radiusX = 42 + Math.random() * 5
            const radiusY = 38 + Math.random() * 5

            const x = 50 + r * radiusX * Math.cos(angle)
            const y = 38 + r * radiusY * Math.sin(angle)

            // Skip if outside bounds
            if (x < 5 || x > 95 || y < 2 || y > 78) continue

            leaves.push({
                id: index,
                x,
                y,
                emoji: heartEmojis[index % heartEmojis.length],
                delay: 2.0 + index * 0.05,
                scale: 0.7 + Math.random() * 0.5 + (1 - r) * 0.3,
            })
            index++
        }
        return leaves
    }, [])

    // Some flowers scattered in the crown
    const flowers = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const r = 0.4 + Math.random() * 0.3
            return {
                id: i,
                x: 50 + r * 35 * Math.cos(angle),
                y: 38 + r * 30 * Math.sin(angle),
                emoji: flowerEmojis[i % flowerEmojis.length],
                delay: 3.5 + i * 0.15,
            }
        })
    }, [])

    // Generate falling hearts
    const fallingHearts = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            emoji: heartEmojis[i % heartEmojis.length],
            delay: 5 + Math.random() * 10,
            duration: 7 + Math.random() * 6,
            size: 0.5 + Math.random() * 0.5,
        }))
    }, [])

    // Generate grass blades
    const grassBlades = useMemo(() => {
        return Array.from({ length: 28 }, (_, i) => ({
            id: i,
            x: -100 + (i * 7.2) + (Math.random() - 0.5) * 4,
            height: 6 + Math.random() * 16,
            rotation: (Math.random() - 0.5) * 40,
            delay: 1.5 + Math.random() * 1.5,
        }))
    }, [])

    // Generate sparkle particles
    const sparkles = useMemo(() => {
        return Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: 8 + Math.random() * 84,
            y: 5 + Math.random() * 75,
            delay: 3 + Math.random() * 6,
            duration: 2 + Math.random() * 3,
            size: 2 + Math.random() * 4,
        }))
    }, [])

    // Fireflies
    const fireflies = useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 60,
            delay: Math.random() * 8,
            duration: 4 + Math.random() * 5,
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

            <h1 className="page-title">Nuestro Árbol</h1>
            <p className="page-intro">Un árbol que crece con cada momento juntos 💕</p>

            <div className="tree-scene">
                <div className="tree-container">
                    {/* Glow behind tree */}
                    <div className="tree-glow"></div>
                    <div className="tree-glow-secondary"></div>

                    {/* Tree trunk */}
                    <div className="tree-trunk">
                        <div className="trunk-texture"></div>
                        <div className="trunk-roots trunk-root-left"></div>
                        <div className="trunk-roots trunk-root-right"></div>
                    </div>

                    {/* Tree Crown with heart leaves */}
                    <div className="tree-crown">
                        {/* Crown background shape */}
                        <div className="crown-bg"></div>

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

                        {/* Flowers in the crown */}
                        {flowers.map((f) => (
                            <span
                                key={`flower-${f.id}`}
                                className="heart-leaf flower-leaf"
                                style={{
                                    left: `${f.x}%`,
                                    top: `${f.y}%`,
                                    animationDelay: `${f.delay}s`,
                                    fontSize: '1em',
                                }}
                            >
                                {f.emoji}
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
                        {/* Little flowers on ground */}
                        <span className="ground-flower" style={{ left: 'calc(50% - 60px)', animationDelay: '2s' }}>🌸</span>
                        <span className="ground-flower" style={{ left: 'calc(50% + 50px)', animationDelay: '2.5s' }}>🌷</span>
                        <span className="ground-flower" style={{ left: 'calc(50% - 30px)', animationDelay: '2.8s' }}>🌼</span>
                        <span className="ground-flower" style={{ left: 'calc(50% + 25px)', animationDelay: '3.1s' }}>🌸</span>
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
                Cada corazón es un momento especial juntos ✨
            </p>

            <Link to="/" className="back-button">
                <span>💌</span>
                <span>Volver a la Carta</span>
            </Link>
        </div>
    )
}

export default HeartTree
