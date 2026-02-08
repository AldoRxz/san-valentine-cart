import { useState } from 'react'
import FloatingHearts from './components/FloatingHearts'
import Sparkles from './components/Sparkles'
import Envelope from './components/Envelope'
import ValentineCard from './components/ValentineCard'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenEnvelope = () => {
    setIsOpen(true)
  }

  const handleReset = () => {
    setIsOpen(false)
  }

  return (
    <div className="app">
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
