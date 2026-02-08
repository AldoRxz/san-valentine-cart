import { useEffect, useRef } from 'react'
import './FloatingHearts.css'

const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '💜', '💛', '🧡', '💚', '🤍', '💞', '🩷', '🩵']

function FloatingHearts() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const createHeart = () => {
            const heart = document.createElement('div')
            heart.className = 'floating-heart'
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]

            // Random position and properties
            heart.style.left = `${Math.random() * 100}vw`
            heart.style.fontSize = `${0.8 + Math.random() * 2}rem`
            heart.style.animationDuration = `${8 + Math.random() * 12}s`
            heart.style.animationDelay = `${Math.random() * 2}s`
            heart.style.opacity = 0.4 + Math.random() * 0.4

            container.appendChild(heart)

            // Remove after animation
            const duration = parseFloat(heart.style.animationDuration) * 1000 + 2000
            setTimeout(() => {
                heart.remove()
            }, duration)
        }

        // Create initial hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(createHeart, i * 300)
        }

        // Continuously create hearts
        const interval = setInterval(createHeart, 800)

        return () => clearInterval(interval)
    }, [])

    return <div ref={containerRef} className="floating-hearts-container" />
}

export default FloatingHearts
