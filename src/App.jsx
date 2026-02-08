import { useState, useRef } from 'react'
import FloatingHearts from './components/FloatingHearts'
import Sparkles from './components/Sparkles'
import Envelope from './components/Envelope'
import ValentineCard from './components/ValentineCard'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const audioRef = useRef(null)

  const handleOpenEnvelope = () => {
    setIsOpen(true)

    // Play the song when envelope opens
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err)
      })
    }
  }

  const handleReset = () => {
    setIsOpen(false)

    // Stop and reset the song
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div className="app">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
        preload="auto"
      />

      <FloatingHearts />
      <Sparkles />

      <main className="main-content">
        {!isOpen ? (
          <Envelope onOpen={handleOpenEnvelope} />
        ) : (
          <ValentineCard onReset={handleReset} />
        )}
      </main>
    </div>
  )
}

export default App
