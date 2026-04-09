import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group card cursor-default"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-lg bg-[var(--gold-50)] flex items-center justify-center">
          <Icon className="text-[var(--accent)]" size={24} />
        </div>
        <ArrowUpRight className="text-[var(--charcoal-300)] group-hover:text-[var(--accent)] transition-colors" size={20} />
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">{description}</p>
    </motion.div>
  )
}
