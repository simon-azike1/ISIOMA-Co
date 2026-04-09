import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function TestimonialCard({ quote, name, role, company }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="card"
    >
      <div className="flex items-start gap-3 mb-4">
        <Quote className="text-[var(--accent)] flex-shrink-0" size={24} />
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">"{quote}"</p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-light)]">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: 'var(--charcoal-200)', color: 'var(--text-primary)' }}>
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{name}</p>
          <p className="text-xs text-[var(--text-muted)]">{role}, {company}</p>
        </div>
      </div>
    </motion.div>
  )
}
