import { useState, useEffect } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const confettiPieces = Array.from({ length: 50 })

export default function WelcomeBanner({ onClose }) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShowConfetti(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 998,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999,
          width: '90%',
          maxWidth: '420px',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-light)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Confetti */}
        {showConfetti && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}>
            {confettiPieces.map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -20, 
                  x: Math.random() * 400,
                  rotate: 0,
                  opacity: 1 
                }}
                animate={{ 
                  y: 500, 
                  rotate: Math.random() * 720,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 1.5 + Math.random(), 
                  ease: 'easeOut',
                  delay: Math.random() * 0.3
                }}
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: ['#B8923F', '#DBBF7D', '#8A6A2A', '#E8D06D', '#C9A455'][Math.floor(Math.random() * 5)],
                  left: `${Math.random() * 100}%`,
                  top: '10%',
                }}
              />
            ))}
          </div>
        )}

        {/* Pulsing glow effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, var(--accent), var(--accent-light), var(--accent))',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 2s ease infinite',
        }} />

        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        <div style={{ padding: '28px', position: 'relative' }}>
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              opacity: 0.6,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = 1
              e.currentTarget.style.background = 'var(--border-light)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = 0.6
              e.currentTarget.style.background = 'var(--bg-secondary)'
            }}
          >
            <X size={16} style={{ color: 'var(--text-secondary)' }} />
          </button>

          {/* Icon with pulse */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'var(--gold-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              border: '2px solid var(--accent)',
            }}
          >
            <MessageCircle size={32} style={{ color: 'var(--accent)' }} />
          </motion.div>

          {/* Content */}
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Welcome to Isioma & Co. 👋
          </h3>
          
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}>
            Thank you for visiting! How can we help you today?
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'var(--accent)',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(184, 146, 63, 0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-dark)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(184, 146, 63, 0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(184, 146, 63, 0.3)'
              }}
            >
              Get in touch
            </a>
            <a
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '8px',
                border: '2px solid var(--border-medium)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-secondary)'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'var(--border-medium)'
              }}
            >
              Our Services
            </a>
          </div>

          {/* Auto-close indicator */}
          <p style={{
            marginTop: '16px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}>
            This message will close automatically
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
