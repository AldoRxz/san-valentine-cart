import { useEffect, useState, useCallback, useRef } from 'react'

// Double tap detection
export function useDoubleTap(callback, delay = 300) {
    const lastTap = useRef(0)

    const handleTap = useCallback((e) => {
        e?.preventDefault?.()
        const now = Date.now()
        if (now - lastTap.current < delay) {
            callback()
            lastTap.current = 0
        } else {
            lastTap.current = now
        }
    }, [delay, callback])

    return handleTap
}

// Long press detection
export function useLongPress(callback, duration = 800) {
    const timeoutRef = useRef(null)
    const isPressed = useRef(false)

    const start = useCallback((e) => {
        e?.preventDefault?.()
        isPressed.current = true
        timeoutRef.current = setTimeout(() => {
            if (isPressed.current) {
                callback()
            }
        }, duration)
    }, [callback, duration])

    const stop = useCallback(() => {
        isPressed.current = false
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    }
}

// Kiss counter
export function useKissCounter(targetKisses, callback) {
    const [kisses, setKisses] = useState(0)
    const [triggered, setTriggered] = useState(false)

    const addKiss = useCallback(() => {
        if (triggered) return

        setKisses(prev => {
            const newKisses = prev + 1
            if (newKisses >= targetKisses) {
                callback()
                setTriggered(true)
            }
            return newKisses
        })
    }, [targetKisses, callback, triggered])

    return { kisses, addKiss, triggered }
}

// Shake detection for mobile
export function useShakeDetection(callback, threshold = 15) {
    const lastShake = useRef(0)
    const lastX = useRef(0)
    const lastY = useRef(0)
    const lastZ = useRef(0)

    useEffect(() => {
        const handleMotion = (e) => {
            const { accelerationIncludingGravity } = e
            if (!accelerationIncludingGravity) return

            const { x, y, z } = accelerationIncludingGravity
            const deltaX = Math.abs(x - lastX.current)
            const deltaY = Math.abs(y - lastY.current)
            const deltaZ = Math.abs(z - lastZ.current)

            if ((deltaX > threshold || deltaY > threshold || deltaZ > threshold)) {
                const now = Date.now()
                if (now - lastShake.current > 1000) {
                    callback()
                    lastShake.current = now
                }
            }

            lastX.current = x
            lastY.current = y
            lastZ.current = z
        }

        // Request permission for iOS 13+
        if (typeof DeviceMotionEvent !== 'undefined' &&
            typeof DeviceMotionEvent.requestPermission === 'function') {
            // Will be requested on first user interaction
        } else {
            window.addEventListener('devicemotion', handleMotion)
        }

        return () => window.removeEventListener('devicemotion', handleMotion)
    }, [callback, threshold])
}

// Request motion permission (for iOS)
export async function requestMotionPermission() {
    if (typeof DeviceMotionEvent !== 'undefined' &&
        typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceMotionEvent.requestPermission()
            return permission === 'granted'
        } catch {
            return false
        }
    }
    return true
}

// Delayed surprise message
export function useSurpriseTimer(delayMs, callback) {
    const [triggered, setTriggered] = useState(false)
    const [timeLeft, setTimeLeft] = useState(Math.floor(delayMs / 1000))

    useEffect(() => {
        if (triggered) return

        const timer = setTimeout(() => {
            callback()
            setTriggered(true)
        }, delayMs)

        const interval = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1))
        }, 1000)

        return () => {
            clearTimeout(timer)
            clearInterval(interval)
        }
    }, [delayMs, callback, triggered])

    return { triggered, timeLeft }
}

// ========== VISUAL EFFECTS ==========

// Create heart explosion effect
export function createHeartExplosion(count = 50) {
    const container = document.createElement('div')
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `
    document.body.appendChild(container)

    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '💜', '💛', '🧡', '💚', '🩷', '🩵', '✨', '⭐']

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span')
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        const startX = 50 + (Math.random() - 0.5) * 20
        const startY = 50 + (Math.random() - 0.5) * 20
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 40 + 20}px;
            left: ${startX}%;
            top: ${startY}%;
            animation: explodeHeart${i % 4} ${Math.random() * 1.5 + 1}s ease-out forwards;
        `
        container.appendChild(heart)
    }

    // Add animation keyframes
    if (!document.getElementById('heart-explosion-style')) {
        const style = document.createElement('style')
        style.id = 'heart-explosion-style'
        style.textContent = `
            @keyframes explodeHeart0 {
                0% { opacity: 1; transform: scale(0) translate(0, 0); }
                100% { opacity: 0; transform: scale(1.5) translate(-200px, -300px); }
            }
            @keyframes explodeHeart1 {
                0% { opacity: 1; transform: scale(0) translate(0, 0); }
                100% { opacity: 0; transform: scale(1.5) translate(200px, -300px); }
            }
            @keyframes explodeHeart2 {
                0% { opacity: 1; transform: scale(0) translate(0, 0); }
                100% { opacity: 0; transform: scale(1.5) translate(-150px, -200px); }
            }
            @keyframes explodeHeart3 {
                0% { opacity: 1; transform: scale(0) translate(0, 0); }
                100% { opacity: 0; transform: scale(1.5) translate(150px, -200px); }
            }
        `
        document.head.appendChild(style)
    }

    setTimeout(() => container.remove(), 3000)
}

// Create confetti effect
export function createConfetti(count = 100) {
    const container = document.createElement('div')
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `
    document.body.appendChild(container)

    const colors = ['#ec4899', '#f472b6', '#db2777', '#fbbf24', '#a855f7', '#3b82f6', '#10b981', '#ef4444']

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div')
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 12 + 6
        const left = Math.random() * 100
        const delay = Math.random() * 0.8

        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 0.4}px;
            background: ${color};
            left: ${left}%;
            top: -20px;
            border-radius: 2px;
            animation: confettiFall ${Math.random() * 2 + 2.5}s ease-out ${delay}s forwards;
            transform-origin: center;
        `
        container.appendChild(confetti)
    }

    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style')
        style.id = 'confetti-style'
        style.textContent = `
            @keyframes confettiFall {
                0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
                100% { opacity: 0; transform: translateY(100vh) rotate(1080deg) scale(0.5); }
            }
        `
        document.head.appendChild(style)
    }

    setTimeout(() => container.remove(), 5000)
}

// Create floating kiss
export function createFloatingKiss(x, y) {
    const kiss = document.createElement('span')
    kiss.textContent = '💋'
    kiss.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: floatKiss 1s ease-out forwards;
    `
    document.body.appendChild(kiss)

    if (!document.getElementById('kiss-style')) {
        const style = document.createElement('style')
        style.id = 'kiss-style'
        style.textContent = `
            @keyframes floatKiss {
                0% { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
            }
        `
        document.head.appendChild(style)
    }

    setTimeout(() => kiss.remove(), 1000)
}

// Secret message popup
export function showSecretMessage(title, message, emoji = '💕') {
    const overlay = document.createElement('div')
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        padding: 1rem;
        box-sizing: border-box;
    `

    const popup = document.createElement('div')
    popup.style.cssText = `
        background: linear-gradient(135deg, #fdf2f8 0%, #fff 50%, #fce7f3 100%);
        padding: 2rem;
        border-radius: 24px;
        text-align: center;
        max-width: 350px;
        width: 100%;
        box-shadow: 0 25px 80px rgba(236, 72, 153, 0.5);
        animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 3px solid rgba(236, 72, 153, 0.3);
    `

    popup.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem; animation: pulse 1s ease-in-out infinite;">${emoji}</div>
        <h3 style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; color: #be185d; margin: 0 0 1rem 0;">${title}</h3>
        <p style="font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #6b2149; margin: 0; line-height: 1.7; font-style: italic;">
            ${message}
        </p>
        <div style="margin-top: 1.5rem; font-size: 1.5rem;">✨💖✨</div>
        <p style="font-size: 0.9rem; color: #9d174d; margin-top: 1rem; opacity: 0.7;">Toca para cerrar</p>
    `

    overlay.appendChild(popup)
    document.body.appendChild(overlay)

    if (!document.getElementById('secret-message-style')) {
        const style = document.createElement('style')
        style.id = 'secret-message-style'
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes popIn {
                from { transform: scale(0.3) rotate(-10deg); opacity: 0; }
                to { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `
        document.head.appendChild(style)
    }

    overlay.addEventListener('click', () => {
        overlay.style.animation = 'fadeIn 0.3s ease reverse'
        popup.style.animation = 'popIn 0.3s ease reverse'
        setTimeout(() => overlay.remove(), 300)
    })
}
