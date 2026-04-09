import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { path: '/',            label: 'Home' },
  { path: '/about',      label: 'About' },
  { path: '/services',   label: 'Services' },
  { path: '/projects',   label: 'Projects' },
  { path: '/consultancy',label: 'Consultancy' },
  { path: '/team',       label: 'Team' },
  { path: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname }              = useLocation()
  const { theme, toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          background: scrolled ? 'var(--bg-primary)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
            paddingLeft: 'clamp(1.25rem, 4vw, 3rem)',
            paddingRight: 'clamp(1.25rem, 4vw, 3rem)',
          }}
        >
          {/* ── Logo ─────────────────────────── */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}
          >
            {/* Monogram */}
            <div style={{
              width: '34px', height: '34px',
              border: '1px solid var(--text-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                userSelect: 'none',
              }}>
                IC
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '0.01em',
              }}>
                Isioma & Co.
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginTop: '2px',
              }}>
                Chartered Accountants
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }} className="hidden-mobile">
            {links.map(({ path, label }) => {
              const active = pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    fontWeight: active ? 500 : 400,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--text-primary)' : 'var(--charcoal-500)',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: '2px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--charcoal-500)' }}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: '-1px', left: 0,
                        width: '100%', height: '1px',
                        background: 'var(--accent)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── CTA + Theme Toggle + Hamburger ────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: 'none',
                border: '1px solid var(--border-medium)',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight:"4px",
                color: 'var(--text-primary)',
                // borderRadius: '4px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--charcoal-100)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>

            {/* Desktop CTA */}
            <Link
              to="/contact"
              className="btn-primary hidden-mobile"
              style={{ fontSize: '0.72rem', padding: '0.7rem 1.5rem' }}
            >
              Book a call
              <ArrowUpRight size={13} strokeWidth={2} />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              aria-label="Open menu"
              style={{
                background: 'none',
                border: '1px solid var(--border-medium)',
                padding: '0.45rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
            >
              {menuOpen
                ? <X size={18} strokeWidth={1.5} />
                : <Menu size={18} strokeWidth={1.5} />
              }
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Fullscreen Menu ──────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'var(--charcoal-950)',
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            }}
          >
            {/* Top bar inside overlay */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--charcoal-100)',
                letterSpacing: '0.02em',
              }}>
                Isioma & Co.
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'none',
                  border: '1px solid var(--charcoal-700)',
                  padding: '0.45rem',
                  cursor: 'pointer',
                  color: 'var(--charcoal-300)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
              {links.map(({ path, label }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: 'easeOut', duration: 0.3 }}
                >
                  <Link
                    to={path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.1rem 0',
                      borderBottom: '1px solid var(--charcoal-800)',
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                      fontWeight: 500,
                      color: pathname === path ? 'var(--gold-300)' : 'var(--charcoal-100)',
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-300)'}
                    onMouseLeave={e => e.currentTarget.style.color = pathname === path ? 'var(--gold-300)' : 'var(--charcoal-100)'}
                  >
                    {label}
                    <ArrowUpRight size={20} strokeWidth={1} style={{ opacity: 0.4 }} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom contact info */}
            <div style={{ marginTop: '2.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--charcoal-500)',
                marginBottom: '0.75rem',
              }}>
                Get in touch
              </p>
              <a
                href="mailto:Isijik@gmail.com"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--charcoal-300)',
                  fontWeight: 400,
                }}
              >
                Isijik@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}