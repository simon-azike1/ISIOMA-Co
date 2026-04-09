import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ title, category, description, year, tags = [] }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group card cursor-pointer"
      style={{ padding: 0, overflow: 'hidden' }}
    >
      <div className="h-48 bg-gradient-to-br from-[var(--charcoal-800)] to-[var(--charcoal-900)] flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <span 
          className="text-5xl font-semibold tracking-tighter relative z-10"
          style={{ 
            fontFamily: 'var(--font-serif)',
            color: 'var(--charcoal-300)',
          }}
        >
          {title.charAt(0)}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {category}
          </span>
          <span 
            className="text-xs flex items-center gap-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <Calendar size={12} />
            {year}
          </span>
        </div>
        <h3 
          className="text-lg font-semibold mb-2 flex items-center gap-2"
          style={{ 
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
          }}
        >
          {title}
          <ArrowUpRight 
            size={16} 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--accent)' }}
          />
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ 
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-md flex items-center gap-1"
              style={{ 
                background: 'var(--charcoal-50)',
                color: 'var(--text-muted)',
              }}
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}