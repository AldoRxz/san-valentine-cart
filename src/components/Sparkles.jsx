import { useEffect, useRef } from 'react'
import './Sparkles.css'

function Sparkles() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const createSparkle = () => {
            const sparkle = document.createElement('div')
            sparkle.className = 'sparkle'

            sparkle.style.left = `${Math.random() * 100}vw`
            sparkle.style.top = `${Math.random() * 100}vh`
            sparkle.style.width = `${3 + Math.random() * 6}px`
            sparkle.style.height = sparkle.style.width
            sparkle.style.animationDelay = `${Math.random() * 3}s`
            sparkle.style.animationDuration = `${1.5 + Math.random() * 2}s`

            container.appendChild(sparkle)
        }

        // Create sparkles
        for (let i = 0; i < 40; i++) {
            createSparkle()
        }

        // Reposition sparkles periodically
        const interval = setInterval(() => {
            const sparkles = container.querySelectorAll('.sparkle')
            sparkles.forEach(sparkle => {
                sparkle.style.left = `${Math.random() * 100}vw`
                sparkle.style.top = `${Math.random() * 100}vh`
            })
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    return <div ref={containerRef} className="sparkles-container" />
}

export default Sparkles
