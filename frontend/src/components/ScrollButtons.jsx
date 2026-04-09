import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const getWhatsAppMessage = (pathname) => {
  const messages = {
    '/': 'Hello Isioma & Co., I would like to discuss how you can help my business grow.',
    '/about': 'Hello Isioma & Co., I am interested in learning more about your firm and services.',
    '/services': 'Hello Isioma & Co., I would like to inquire about your services.',
    '/projects': 'Hello Isioma & Co., I am interested in your project portfolio and would like to discuss a potential engagement.',
    '/consultancy': 'Hello Isioma & Co., I am interested in your consultancy services and would like to discuss my needs.',
    '/contact': 'Hello Isioma & Co., I would like to get in touch with you.',
  }
  
  // Default message for unknown routes
  return messages[pathname] || 'Hello Isioma & Co., I would like to discuss how you can help.'
}

const encodeMessage = (message) => encodeURIComponent(message)

export default function ScrollButtons() {
  const location = useLocation()
  const [showButtons, setShowButtons] = useState(false)
  const [whatsAppLink, setWhatsAppLink] = useState('')
  const { isDark } = useTheme()

  useEffect(() => {
    const message = getWhatsAppMessage(location.pathname)
    setWhatsAppLink(`https://wa.me/32485584252?text=${encodeMessage(message)}`)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 300) {
        setShowButtons(true)
      } else {
        setShowButtons(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const buttonBg = isDark ? 'var(--charcoal-200)' : 'var(--charcoal-700)'
  const buttonColor = isDark ? 'var(--charcoal-900)' : 'white'
  const whatsappBg = isDark ? '#25D366' : 'var(--charcoal-900)'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 1000,
      }}
    >
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          width: '50px',
          height: '50px',
          background: buttonBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
          cursor: 'pointer',
          border: 'none',
          opacity: showButtons ? 1 : 0,
          transform: showButtons ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s ease',
          pointerEvents: showButtons ? 'auto' : 'none',
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={22} color={buttonColor} />
      </button>

      {/* WhatsApp Button */}
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '60px',
          height: '60px',
          background: whatsappBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          opacity: showButtons ? 0 : 1,
          transform: showButtons ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          pointerEvents: showButtons ? 'none' : 'auto',
        }}
      >
        <MessageCircle size={28} color={buttonColor} />
      </a>
    </div>
  )
}