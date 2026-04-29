import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Award, Users, CheckCircle2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import { projectsAPI } from '../services/api'

const stats = [
  { number: '35%', label: 'Average cost reduction achieved', icon: TrendingUp },
  { number: '15+', label: 'Years of combined expertise', icon: Award },
  { number: '42%', label: 'Customer satisfaction improvement', icon: Users },
]

const whyChooseUs = [
  {
    title: 'Proven results',
    description: 'Every engagement is measured. We track ROI, cost savings, and compliance outcomes.',
  },
  {
    title: ' Chartered rigour',
    description: 'ICAN-certified expertise with strict adherence to professional standards.',
  },
  {
    title: 'End-to-end support',
    description: 'From initial assessment to implementation — we stay with you until results stick.',
  },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    projectsAPI.getAll()
      .then(res => setProjects(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

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
              Projects
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight mb-6"
            >
              Real results.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]">
                Measurable impact.
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8"
            >
              We don't just deliver reports — we deliver outcomes. From operations management that cut costs by 35% to customer service frameworks with 42% satisfaction improvements, see how we've helped organisations like yours succeed.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a href="/contact" className="btn-primary">
                Discuss your project
                <ArrowRight size={16} />
              </a>
              <a href="/services" className="btn-outline">
                View services
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <img
                src="/isiomaproject.png"
                alt="Isioma - Projects"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-950)]/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-[var(--accent)] -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--gold-50)] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: 'var(--charcoal-950)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
                style={{ color: 'white' }}
              >
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184, 146, 63, 0.2)' }}>
                  <stat.icon size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.number}</p>
                  <p className="text-sm" style={{ color: 'var(--charcoal-400)' }}>{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionHeader 
              eyebrow="Our work"
              title="Featured projects"
              description="A selection of engagements across financial advisory, nonprofit governance, and professional development."
            />
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard {...p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                eyebrow="Why Isioma & Co."
                title="What sets us apart"
              />
              <div className="space-y-6 mt-8">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'var(--accent)' }}>
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border p-8"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)' }}
            >
              <p className="text-lg text-[var(--text-secondary)] italic mb-6 leading-relaxed">
                "Isioma & Co. transformed our financial operations. Their strategic approach didn't just solve immediate problems — it positioned us for sustainable growth."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center" style={{ background: 'var(--charcoal-100)' }}>
                  <span className="text-xl font-bold" style={{ color: 'var(--charcoal-700)' }}>M</span>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Managing Director</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Meridian Capital Group</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process / How It Works */}
      <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader 
            eyebrow="How we work"
            title="From discovery to delivery"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {[
              { step: '01', title: 'Discovery', description: 'We listen. Deep-dive into your challenges and goals.' },
              { step: '02', title: 'Strategy', description: 'Custom roadmap with clear milestones and KPIs.' },
              { step: '03', title: 'Execution', description: 'Hands-on implementation with regular progress updates.' },
              { step: '04', title: 'Review', description: 'Measure results, refine, and ensure lasting impact.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4" style={{ border: '2px solid var(--accent)' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ background: 'var(--bg-inverse)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: 'var(--text-inverse)' }}>
              Ready to achieve measurable results?
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--text-muted)' }}>
              Let's discuss how we can help your organisation grow. Book a free consultation today.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a href="/contact" className="btn-primary">
                Book a free consultation
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}