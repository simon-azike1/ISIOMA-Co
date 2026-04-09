import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Briefcase, Calculator, TrendingUp, GraduationCap, Heart, Shield } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import { servicesAPI } from '../services/api'

const iconMap = {
  Briefcase,
  Calculator,
  TrendingUp,
  GraduationCap,
  Heart,
  Shield
};

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => setServices(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--gold-50)] rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--charcoal-100)] rounded-full blur-3xl opacity-30 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="eyebrow">Our Services</span>
                {/* <Sparkles className="text-[var(--accent)]" size={16} /> */}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--text-primary)] leading-tight mb-6"
              >
                Comprehensive{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]">
                  financial
                </span>{' '}
                and advisory services
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8"
              >
                Every service we offer is delivered with the rigour of a chartered accountant and the strategic lens of a business advisor. We're committed to your financial clarity and growth.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="btn-primary"
                  >
                    Get started
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/consultancy"
                    className="btn-outline"
                  >
                    Learn more
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Stats/Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-light)] p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '6+', label: 'Core Services' },
                    { number: '15+', label: 'Years Experience' },
                    { number: '100+', label: 'Clients Served' },
                    { number: '100%', label: 'Commitment' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-center p-4"
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}
                    >
                      <p className="text-3xl font-bold text-[var(--accent)] mb-1">{stat.number}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent origin-center"
                />
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-6 text-center text-sm text-[var(--text-secondary)] italic"
                >
                  "Precision in every engagement, excellence in every outcome."
                </motion.p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-[var(--accent)] -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[var(--gold-50)] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader 
              eyebrow="What we offer" 
              title="Services tailored to your needs" 
              description="From audit and tax to mentorship and nonprofit advisory — our services are designed for organisations and individuals who demand precision and trust."
              center
            />
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const IconComponent = iconMap[s.icon] || Briefcase;
              return (
                <motion.div
                  key={s._id || s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ServiceCard icon={IconComponent} title={s.title} description={s.description} index={i} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader 
                eyebrow="Why choose us" 
                title="The Isioma advantage" 
              />
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Chartered expertise',
                    description: 'Fellow of ICAN with over 15 years of hands-on experience in audit, tax, and financial advisory.'
                  },
                  {
                    title: 'Strategic approach',
                    description: 'We don\'t just crunch numbers — we provide actionable insights that drive business growth and sustainability.'
                  },
                  {
                    title: 'Personalized service',
                    description: 'Every client receives dedicated attention and solutions tailored to their unique financial landscape.'
                  },
                  {
                    title: 'Proven track record',
                    description: 'Trusted by corporations, SMEs, and nonprofits across Nigeria and West Africa for reliable financial guidance.'
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--gold-50)] flex items-center justify-center">
                      <span className="text-[var(--accent)] font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src="/isiomaservice.png"
                  alt="Financial services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-[var(--accent)] -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[var(--gold-50)] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'var(--bg-inverse)', color: 'var(--text-inverse)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2" style={{ color: 'var(--text-inverse)' }}>Not sure which service fits your needs?</h2>
              <p className="text-base" style={{ color: 'var(--text-muted)' }}>Let's have a conversation and figure it out together.</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/contact" 
                className="whitespace-nowrap text-sm font-semibold px-8 py-3 inline-flex items-center gap-2"
                style={{ 
                  background: 'var(--text-inverse)', 
                  color: 'var(--bg-inverse)',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Book a free call
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
