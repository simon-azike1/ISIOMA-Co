import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/consultancy', label: 'Consultancy' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { toggleTheme, isDark } = useTheme()

  

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-light)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'clamp(60px, 8vw, 72px)',
            padding: '0 clamp(1rem, 4vw, 3rem)',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '1px solid var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '0.8rem' }}>IC</span>
            </div>

            <div style={{ lineHeight: 1 }}>
              <div style={{ fontSize: 'clamp(0.85rem,2.5vw,1rem)' }}>Isioma & Co.</div>
              <div style={{ fontSize: 'clamp(0.55rem,2vw,0.65rem)', opacity: 0.7 }}>
                Chartered Accountants
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden-mobile" style={{ display: 'flex', gap: 'clamp(1rem,2vw,2rem)' }}>
            {links.map(({ path, label }) => {
              const active = pathname === path
              return (
                <Link key={path} to={path} style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  color: active ? 'var(--accent)' : 'var(--accent)',
                  position: 'relative'
                }}>
                  {label}
                  {active && (
                    <motion.span
                      layoutId="underline"
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        width: '100%',
                        height: '1px',
                        background: 'var(--accent)'
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              style={{
                padding: '0.6rem',
                minWidth: '44px',
                minHeight: '44px',
                border: '1px solid var(--border-medium)',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--charcoal-100)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden-mobile"
              style={{ 
                fontSize: '0.72rem', 
                padding: '0.7rem 1.5rem',
                background: 'transparent',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                textDecoration: 'none'
              }}
            >
              Book a call
              <ArrowUpRight size={13} />
            </Link>

            {/* Mobile button */}
            <button
              className="show-mobile"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ padding: '0.6rem', minWidth: '44px', minHeight: '44px', background: 'transparent', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)' }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#FAFAF8',
              padding: 'clamp(1.25rem,6vw,3rem)',
              display: 'flex',
              flexDirection: 'column',
              color: '#0E0E0E',
              zIndex: 200
            }}
          >

            <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Isioma & Co.</span>
                <button onClick={() => setMenuOpen(false)}>
                  <X />
                </button>
              </div>

              <nav style={{ marginTop: '2rem' }}>
                {links.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={link.path} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '1rem 0',
                      fontSize: 'clamp(1.4rem,4vw,2rem)',
                      color: '#A07D35',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#8A6A2A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#A07D35'}>
                      {link.label}
                      <ArrowUpRight />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link 
                to="/contact" 
                onClick={() => setMenuOpen(false)}
                style={{ 
                  marginTop: '2rem', 
                  display: 'flex',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  padding: '0.9rem 1.5rem',
                  border: '1px solid #A07D35',
                  background: '#A07D35',
                  color: '#FAFAF8',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#8A6A2A'; e.currentTarget.style.borderColor = '#8A6A2A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#A07D35'; e.currentTarget.style.borderColor = '#A07D35'; }}
              >
                Book a call
                <ArrowUpRight size={16} />
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
