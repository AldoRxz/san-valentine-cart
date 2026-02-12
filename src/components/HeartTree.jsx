import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import FloatingHearts from './FloatingHearts'
import Sparkles from './Sparkles'
import './HeartTree.css'

// Pink/red color palette for hearts
const heartColors = [
    '#ff1493', '#ff69b4', '#ff85c8', '#e91e63',
    '#f06292', '#ec407a', '#d81b60', '#c2185b',
    '#ff4081', '#f48fb1', '#f8bbd0', '#ff80ab',
    '#e91e7a', '#ad1457', '#ff6090', '#ff7eb3',
]

function CSSHeart({ color, size, style, className = '' }) {
    return (
        <div
            className={`css-heart ${className}`}
            style={{
                '--heart-color': color,
                '--heart-size': `${size}px`,
                ...style,
            }}
        />
    )
}

function HeartTree() {
    // SVG branch paths - organic curves
    const branches = [
        // Left branches
        { d: 'M 250 420 Q 200 380 150 340 Q 120 320 100 280', hearts: [{ x: 100, y: 275 }, { x: 130, y: 310 }, { x: 155, y: 335 }] },
        { d: 'M 250 380 Q 210 340 180 290 Q 160 260 130 230', hearts: [{ x: 128, y: 225 }, { x: 165, y: 255 }, { x: 185, y: 285 }] },
        { d: 'M 250 340 Q 220 300 200 260 Q 180 230 150 190', hearts: [{ x: 148, y: 185 }, { x: 182, y: 228 }, { x: 205, y: 255 }] },
        { d: 'M 250 300 Q 230 260 210 230 Q 195 210 180 170', hearts: [{ x: 178, y: 165 }, { x: 198, y: 208 }] },
        { d: 'M 250 270 Q 235 240 225 210 Q 218 190 210 160', hearts: [{ x: 208, y: 155 }] },
        // Sub-branches left
        { d: 'M 150 340 Q 130 330 105 340 Q 90 348 75 330', hearts: [{ x: 73, y: 325 }] },
        { d: 'M 130 230 Q 115 215 90 220', hearts: [{ x: 87, y: 215 }] },
        { d: 'M 150 190 Q 130 175 110 165', hearts: [{ x: 108, y: 160 }] },

        // Right branches
        { d: 'M 250 410 Q 300 370 340 330 Q 365 305 390 270', hearts: [{ x: 390, y: 265 }, { x: 360, y: 300 }, { x: 335, y: 325 }] },
        { d: 'M 250 370 Q 290 330 320 280 Q 340 250 370 220', hearts: [{ x: 370, y: 215 }, { x: 338, y: 248 }, { x: 315, y: 275 }] },
        { d: 'M 250 330 Q 280 290 300 250 Q 315 225 340 190', hearts: [{ x: 340, y: 185 }, { x: 312, y: 222 }, { x: 295, y: 248 }] },
        { d: 'M 250 290 Q 270 255 290 220 Q 305 195 320 165', hearts: [{ x: 320, y: 160 }, { x: 302, y: 193 }] },
        { d: 'M 250 260 Q 265 230 275 200 Q 282 180 295 155', hearts: [{ x: 295, y: 150 }] },
        // Sub-branches right
        { d: 'M 340 330 Q 365 320 390 330 Q 405 338 420 315', hearts: [{ x: 420, y: 310 }] },
        { d: 'M 370 220 Q 390 210 405 215', hearts: [{ x: 408, y: 210 }] },
        { d: 'M 340 190 Q 360 175 380 170', hearts: [{ x: 383, y: 165 }] },

        // Top branches
        { d: 'M 250 250 Q 248 210 245 180 Q 242 155 240 130', hearts: [{ x: 238, y: 125 }] },
        { d: 'M 250 250 Q 255 215 260 185 Q 263 160 268 135', hearts: [{ x: 268, y: 130 }] },
    ]

    // Collect all branch-tip hearts + many extras + fill hearts for a DENSE crown
    const allHearts = useMemo(() => {
        const hearts = []
        let idx = 0
        branches.forEach((branch) => {
            branch.hearts.forEach((h) => {
                // Main heart at tip
                hearts.push({
                    id: idx++,
                    x: h.x,
                    y: h.y,
                    color: heartColors[idx % heartColors.length],
                    delay: 2.0 + idx * 0.04,
                    size: 16 + Math.random() * 14,
                })
                // 4-6 extra hearts near each tip for density
                const extras = 4 + Math.floor(Math.random() * 3)
                for (let i = 0; i < extras; i++) {
                    hearts.push({
                        id: idx++,
                        x: h.x + (Math.random() - 0.5) * 50,
                        y: h.y + (Math.random() - 0.5) * 40,
                        color: heartColors[idx % heartColors.length],
                        delay: 2.2 + idx * 0.03,
                        size: 8 + Math.random() * 16,
                    })
                }
            })
        })

        // Fill hearts: 60 extra hearts spread across the crown area (oval)
        // Crown center is around x:250, y:240 in the 500x600 viewBox
        for (let i = 0; i < 60; i++) {
            const angle = i * 137.508 * (Math.PI / 180)
            const r = 0.3 + Math.sqrt(i / 60) * 0.7
            const x = 250 + r * 170 * Math.cos(angle)
            const y = 230 + r * 120 * Math.sin(angle)
            // Skip if outside reasonable bounds
            if (x < 60 || x > 440 || y < 110 || y > 380) continue
            hearts.push({
                id: idx++,
                x,
                y,
                color: heartColors[idx % heartColors.length],
                delay: 2.5 + idx * 0.02,
                size: 7 + Math.random() * 15,
            })
        }

        return hearts
    }, [])

    // Falling hearts
    const fallingHearts = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: 5 + Math.random() * 90,
            color: heartColors[i % heartColors.length],
            delay: 5 + Math.random() * 10,
            duration: 7 + Math.random() * 6,
            size: 8 + Math.random() * 10,
        }))
    }, [])

    // Grass blades
    const grassBlades = useMemo(() => {
        return Array.from({ length: 28 }, (_, i) => ({
            id: i,
            x: -100 + (i * 7.2) + (Math.random() - 0.5) * 4,
            height: 6 + Math.random() * 16,
            rotation: (Math.random() - 0.5) * 40,
            delay: 1.5 + Math.random() * 1.5,
        }))
    }, [])

    // Sparkle particles
    const sparkles = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: 8 + Math.random() * 84,
            y: 5 + Math.random() * 75,
            delay: 3 + Math.random() * 6,
            duration: 2 + Math.random() * 3,
            size: 2 + Math.random() * 4,
        }))
    }, [])

    return (
        <div className="heart-tree-page">
            <FloatingHearts />
            <Sparkles />

            <div className="deco-circle deco-circle-1"></div>
            <div className="deco-circle deco-circle-2"></div>
            <div className="deco-circle deco-circle-3"></div>

            <h1 className="page-title">Nuestro Árbol</h1>
            <p className="page-intro">Un árbol que crece con cada momento juntos 💕</p>

            <div className="tree-scene">
                <div className="tree-svg-container">
                    <svg viewBox="0 0 500 600" className="tree-svg" preserveAspectRatio="xMidYMid meet">
                        {/* Trunk */}
                        <path
                            d="M 245 580 Q 245 520 247 480 Q 248 450 249 420 Q 250 400 250 250"
                            className="tree-trunk-path"
                        />
                        <path
                            d="M 255 580 Q 255 520 253 480 Q 252 450 251 420 Q 250 400 250 250"
                            className="tree-trunk-path"
                        />

                        {/* Branches */}
                        {branches.map((branch, i) => (
                            <path
                                key={i}
                                d={branch.d}
                                className="tree-branch-path"
                                style={{ animationDelay: `${1.5 + i * 0.1}s` }}
                            />
                        ))}
                    </svg>

                    {/* CSS Hearts at branches */}
                    {allHearts.map((h) => (
                        <CSSHeart
                            key={h.id}
                            color={h.color}
                            size={h.size}
                            className="branch-heart"
                            style={{
                                left: `${(h.x / 500) * 100}%`,
                                top: `${(h.y / 600) * 100}%`,
                                animationDelay: `${h.delay}s, ${h.delay + 1}s`,
                                animationDuration: `0.5s, ${2.5 + (h.id % 4) * 0.8}s`,
                                '--float-x': `${(h.id % 2 === 0 ? 1 : -1) * (2 + (h.id % 5))}px`,
                                '--float-y': `${(h.id % 3 === 0 ? -1 : 1) * (2 + (h.id % 4))}px`,
                            }}
                        />
                    ))}

                    {/* Big heart on top */}
                    <CSSHeart
                        color="#ff1493"
                        size={40}
                        className="tree-top-heart"
                    />

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
                        <span className="ground-flower" style={{ left: 'calc(50% - 60px)', animationDelay: '2s' }}>🌸</span>
                        <span className="ground-flower" style={{ left: 'calc(50% + 50px)', animationDelay: '2.5s' }}>🌷</span>
                        <span className="ground-flower" style={{ left: 'calc(50% - 30px)', animationDelay: '2.8s' }}>🌼</span>
                        <span className="ground-flower" style={{ left: 'calc(50% + 25px)', animationDelay: '3.1s' }}>🌸</span>
                    </div>

                    {/* Falling CSS Hearts */}
                    {fallingHearts.map((h) => (
                        <CSSHeart
                            key={`fall-${h.id}`}
                            color={h.color}
                            size={h.size}
                            className="falling-heart"
                            style={{
                                left: `${h.x}%`,
                                animationDelay: `${h.delay}s`,
                                animationDuration: `${h.duration}s`,
                            }}
                        />
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
