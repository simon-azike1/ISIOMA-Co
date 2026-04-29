import { motion } from 'framer-motion'
import { Globe, Mail, Phone } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const team = [
  {
    name: 'Isioma Jikeme',
    role: 'Founder & Managing Partner',
    image: '/isioma.png',
    hasImage: true,
    bio: 'Cross-functional expert with over 15 years of experience in operations management, strategic transformation, and organizational development.',
    credentials: ['Operations Expert', '15+ Years Experience', 'MBA'],
    linkedin: '#',
    email: 'Isijik@gmail.com',
    phone: '+32 485 58 42 52'
  },
  {
    name: 'Obi Jikeme',
    role: 'Senior Tax Consultant',
    image: '/obi.png',
    hasImage: true,
    bio: 'Specialises in HR operations and talent strategy for SMEs and growing organizations across diverse industries.',
    credentials: ['ACA', 'HR Specialist', '10+ Years'],
    linkedin: '#',
    email: 'contact@isiomaandco.com',
    phone: '+234 800 000 0000'
  },
  {
    name: 'Emeka Jikeme',
    role: 'Business Advisory Lead',
    image: '/emeke.png',
    hasImage: true,
    bio: 'Expert in supply chain optimization and project management, having worked with over 50 organizations across diverse sectors.',
    credentials: ['MBA', 'Supply Chain Expert', '8+ Years'],
    linkedin: '#',
    email: 'contact@isiomaandco.com',
    phone: '+234 800 000 0000'
  },
  {
    name: 'Ajulu Jikeme',
    role: 'Audit Manager',
    image: '/ajulu.png',
    hasImage: true,
    bio: 'Leads operational efficiency initiatives for nonprofits and corporates, ensuring best practices and measurable outcomes.',
    credentials: ['ACA', 'Operations Lead', '7+ Years'],
    linkedin: '#',
    email: 'contact@isiomaandco.com',
    phone: '+234 800 000 0000'
  },
]

export default function Team() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="eyebrow mb-4">Our Team</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight mb-6">
              Meet the people behind<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]">
                our success
              </span>
            </h1>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              A team of cross-functional experts in operations, HR, supply chain, and project management committed to delivering exceptional results for every client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border"
                style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)' }}
              >
                {/* Image */}
                {member.hasImage && (
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Info */}
                <div className="p-6">
                  <p className="eyebrow mb-1">{member.role}</p>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  {/* Credentials */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.credentials.map((cred) => (
                      <span 
                        key={cred} 
                        className="text-xs px-2 py-1"
                        style={{ background: 'var(--charcoal-50)', color: 'var(--text-muted)' }}
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a 
                      href={member.linkedin} 
                      className="w-9 h-9 flex items-center justify-center"
                      style={{ background: 'var(--charcoal-50)' }}
                    >
                      <Globe size={16} style={{ color: 'var(--charcoal-600)' }} />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-9 h-9 flex items-center justify-center"
                      style={{ background: 'var(--charcoal-50)' }}
                    >
                      <Mail size={16} style={{ color: 'var(--charcoal-600)' }} />
                    </a>
                    <a 
                      href={`tel:${member.phone}`}
                      className="w-9 h-9 flex items-center justify-center"
                      style={{ background: 'var(--charcoal-50)' }}
                    >
                      <Phone size={16} style={{ color: 'var(--charcoal-600)' }} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <SectionHeader 
              eyebrow="Join Our Team"
              title="Want to work with us?"
              description="We're always looking for talented individuals who share our values of operational excellence, innovation, and client-focused service."
              center
            />
            <a href="/contact" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}