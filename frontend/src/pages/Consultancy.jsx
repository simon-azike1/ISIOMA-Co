import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Shield, Users, Target, Award, CheckCircle2, Phone, ChevronDown, Lightbulb, Briefcase, FileText, GraduationCap, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import { consultancyAPI, faqsAPI } from '../services/api'

const iconMap = {
  Lightbulb,
  TrendingUp,
  Shield,
  Users,
  Target,
  Award,
  Briefcase,
  FileText,
  GraduationCap,
  Heart
}

const stats = [
  { number: '100+', label: 'Clients served', icon: Users },
  { number: '15+', label: 'Years experience', icon: Award },
  { number: '98%', label: 'Client satisfaction', icon: Target },
  { number: '40+', label: 'Projects completed', icon: TrendingUp },
]

const whyChooseUs = [
  {
    title: 'Chartered expertise',
    description: 'ICAN-certified professionals with deep experience across sectors.',
    icon: Award
  },
  {
    title: 'Tailored solutions',
    description: 'No generic templates — every strategy is built for your specific context.',
    icon: Target
  },
  {
    title: 'End-to-end support',
    description: 'From diagnosis to implementation, we stay with you until results stick.',
    icon: Shield
  },
  {
    title: 'Proven track record',
    description: 'Documented outcomes across financial, governance, and mentorship engagements.',
    icon: TrendingUp
  },
]

export default function Consultancy() {
  const [consultancies, setConsultancies] = useState([])
  const [faqs, setFaqs] = useState([])
  const [openFaq, setOpenFaq] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      consultancyAPI.getAllActive(),
      faqsAPI.getAll()
    ])
    .then(([consultancyRes, faqsRes]) => {
      if (consultancyRes.data?.success) {
        setConsultancies(Array.isArray(consultancyRes.data.data) ? consultancyRes.data.data : [])
      }
      if (faqsRes.data?.success) {
        setFaqs(Array.isArray(faqsRes.data.data) ? faqsRes.data.data : [])
      }
    })
    .catch(err => {
      console.error('Consultancy: API Error:', err)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

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
              Consultancy
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight mb-4"
            >
              Business Consultancy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8"
            >
              Strategic guidance for your business growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn-primary">
                Book a free discovery call
                <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-outline">
                View all services
              </Link>
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
                src="/isiomaconsult.png"
                alt="Isioma - Consultancy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-950)]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-[var(--accent)] -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--gold-50)] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Consultancy Services Cards */}
      {consultancies.length > 0 && (
        <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeader 
              eyebrow="Our Services"
              title="What we offer"
              description="Comprehensive consultancy services tailored to your needs."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {consultancies.map((item, index) => {
                const IconComponent = iconMap[item.icon] || Lightbulb
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border p-8 hover:shadow-lg transition-shadow"
                    style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)' }}
                  >
                    <div className="w-12 h-12 bg-[var(--gold-50)] flex items-center justify-center mb-6">
                      <IconComponent size={24} className="text-[var(--accent)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{item.title}</h3>
                    <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{item.description}</p>
                    {item.benefits && item.benefits.length > 0 && (
                      <ul className="space-y-2">
                        {item.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle2 size={16} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section style={{ background: 'var(--charcoal-950)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center md:text-left"
                style={{ color: 'white' }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</p>
                <p className="text-sm" style={{ color: 'var(--charcoal-400)' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                eyebrow="Why Isioma"
                title="What makes us different"
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
                    <div className="w-12 h-12 bg-[var(--gold-50)] flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-[var(--accent)]" />
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
                "Working with Isioma was a game-changer for our organisation. Their strategic guidance helped us streamline our finances and achieve audit-ready status within months."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center" style={{ background: 'var(--charcoal-100)' }}>
                  <span className="text-xl font-bold" style={{ color: 'var(--charcoal-700)' }}>E</span>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Executive Director</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>GreenPath NGO</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ - from database */}
      {faqs.length > 0 && (
        <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <SectionHeader 
              eyebrow="Questions"
              title="Frequently asked questions"
              center
            />
            <div className="mt-12 space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{faq.question}</h3>
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        color: 'var(--text-muted)',
                        transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24" style={{ background: 'var(--bg-inverse)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: 'var(--text-inverse)' }}>
                Ready to transform your business?
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
                Book a free 30-minute discovery call. No obligation, no hard sell — just a conversation about what you need.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Book a free call
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:+234000000000" className="btn-outline" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-inverse)' }}>
                  <Phone size={16} />
                  Call now
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}
            >
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>What to expect</h3>
              <ul className="space-y-4">
                {[
                  'Free 30-minute discovery call',
                  'No commitment required',
                  'Personalised recommendations',
                  'Clear pricing structure',
                  'Flexible engagement options'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}