import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16" style={{ background: 'var(--bg-primary)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6"
      >
        <p className="text-8xl font-bold mb-4" style={{ color: 'var(--charcoal-100)' }}>404</p>
        <h1 className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Page not found</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>This page doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="btn-primary"
        >
          Back to home
        </Link>
      </motion.div>
    </section>
  )
}