import { motion } from 'framer-motion'
import { Shield, Target, Users, Handshake } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const values = [
  { 
    title: 'Integrity', 
    description: 'Every engagement is grounded in honesty, transparency, and the highest professional standards.',
    icon: Shield
  },
  { 
    title: 'Precision', 
    description: 'We do not cut corners. Accuracy in financial work is non-negotiable.',
    icon: Target
  },
  { 
    title: 'Empowerment', 
    description: 'We equip clients and mentees with the knowledge to sustain growth long after our engagement ends.',
    icon: Users
  },
  { 
    title: 'Partnership', 
    description: 'We work alongside you, not just for you. Your success is our shared goal.',
    icon: Handshake
  },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-4"
            >
              About us
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight mb-4"
            >
              About Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mb-6"
            >
              Trusted operational and strategic advisory services. We provide expertise in operations management, HR, supply chain, project management, and customer service to organizations across diverse industries.
            </motion.p>
          </motion.div>
             
        
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <img
                src="https://media.istockphoto.com/id/1480323436/photo/couple-talking-to-a-financial-advisor-about-an-investment.jpg?b=1&s=1024x1024&w=0&k=20&c=lADXEl9A5axbOqH-e7-gyoaLQQY5ZjNLF9HaFOW_2a4="
                alt="Financial advisor meeting with clients"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-[var(--accent)] -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--gold-50)] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader eyebrow="Our story" title="Built on experience, driven by purpose" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4"
            >
              With over fifteen years in cross-functional expertise, our principal has served corporations, SMEs, and nonprofit organisations across Nigeria and West Africa. What began as a practice focused purely on operational excellence evolved into a full-service consultancy when it became clear that clients needed more than just accurate numbers — they needed strategic guidance.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4"
            >
              Our talent development approach grew naturally from that same insight: too many organizations lacked access to quality operational guidance. Today, capability building is a cornerstone of everything we do.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-[var(--text-secondary)] leading-relaxed"
            >
              We work with organizations across sectors, acting as trusted partners and advocates for operational excellence and sustainable growth.
            </motion.p>
          </motion.div>

          {/* Credentials */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {[
              { label: 'Expertise', value: 'Operations, HR, Supply Chain, Project Management' },
              { label: 'Experience', value: '15+ years in operational and strategic advisory' },
              { label: 'Specialisation', value: 'Process optimization, organizational development, strategic transformation' },
              { label: 'Focus areas', value: 'Nigeria \u00B7 West Africa \u00B7 Diaspora organisations' },
            ].map(({ label, value }, index) => (
              <motion.div 
                key={label} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-[var(--border-light)] p-5 bg-[var(--bg-secondary)]"
              >
                <p className="eyebrow mb-1">{label}</p>
                <p className="text-sm text-[var(--text-primary)] font-medium">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader eyebrow="Our values" title="Principles we work by" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, description, icon: Icon }, index) => (
              <motion.div 
                key={title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="w-12 h-12 bg-[var(--gold-50)] flex items-center justify-center mb-4">
                  <Icon className="text-[var(--accent)]" size={24} />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
