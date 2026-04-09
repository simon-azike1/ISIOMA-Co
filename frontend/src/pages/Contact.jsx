import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, CheckCircle2, Calendar, ChevronDown, MessageCircle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import { faqsAPI } from '../services/api'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'Isijik@gmail.com', description: 'We respond within 24 hours' },
  { icon: Phone, label: 'Phone', value: '+32 485 58 42 52', description: 'Mon-Fri, 9am-5pm WAT' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+32 485 58 42 52', description: 'Quick responses on WhatsApp' },
  { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', description: 'Serving clients across Africa and beyond' },
]

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loadingFaqs, setLoadingFaqs] = useState(true)

  useEffect(() => {
    faqsAPI.getAll()
      .then(res => setFaqs(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoadingFaqs(false))
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                Contact
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight mb-6"
              >
                Let's start a<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]">
                  conversation
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md mb-8"
              >
                Whether you have a specific engagement in mind or just want to explore your options, reach out and we'll respond within one business day.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#contact-form" className="btn-primary">
                  Send a message
                  <ArrowRight size={16} />
                </a>
                <a href="#info" className="btn-outline">
                  Contact info
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="card p-6"
                >
                  <div className="w-10 h-10 bg-[var(--gold-50)] flex items-center justify-center mb-4">
                    <item.icon size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                  <p className="eyebrow mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.value}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                eyebrow="Get in touch"
                title="Send us a message"
                description="Fill out the form and we'll get back to you within 24 hours."
              />
              <div className="mt-8 space-y-4">
                {[
                  'Free initial consultation',
                  'No obligation quote',
                  'Flexible meeting times',
                  'Confidential discussions'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                  </div>
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
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader 
            eyebrow="What to expect"
            title="After you reach out"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {[
              { step: '01', title: 'We respond', description: 'Within 24 hours on business days' },
              { step: '02', title: 'Discovery call', description: 'Free 30-minute consultation' },
              { step: '03', title: 'Proposal', description: 'Custom scope and pricing' },
              { step: '04', title: 'Start working', description: 'Begin your engagement' },
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

      {/* FAQ */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionHeader 
            eyebrow="Questions"
            title="Frequently asked questions"
            center
          />
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border"
                style={{ borderColor: 'var(--border-light)', background: 'var(--bg-primary)' }}
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

      {/* CTA */}
      <section style={{ background: 'var(--charcoal-950)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
            style={{ color: 'white' }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{color:"white"}}>
              Prefer to speak directly?
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--charcoal-400)' }}>
              Book a free 30-minute discovery call or chat with us on WhatsApp.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <a 
                  href="https://wa.me/32485584252" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <a href="mailto:Isijik@gmail.com" className="btn-outline" style={{ borderColor: 'var(--charcoal-600)', color: 'white' }}>
                  <Mail size={16} />
                  Send Email
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-0" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.524885873669!3d3.379202610735487!3d6.524379323668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8cf4c5f73f5b%3A0x4d3d3d3d3d3d3d3d!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          />
        </div>
      </section>
    </>
  )
}