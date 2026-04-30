import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', color: 'white', marginTop: 'auto' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center" style={{ border: '1px solid #3D3D3D' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', fontWeight: 500, color: 'white', letterSpacing: '0.04em' }}>IC</span>
              </div>
              <span className="font-semibold text-sm" style={{ color: 'white' }}>Isioma & Co.</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: '#9E9E9E' }}>
              Chartered accountancy, strategic consultancy, and mentorship services for individuals and organisations ready to grow with clarity.
            </p>
            <div className="flex items-center gap-3">
              <a href="mailto:Isijik@gmail.com" className="w-9 h-9 flex items-center justify-center transition-colors" style={{ background: '#2C2C2C' }}>
                <Mail size={16} style={{ color: '#9E9E9E' }} />
              </a>
              <a href="tel:+32485584252" className="w-9 h-9 flex items-center justify-center transition-colors" style={{ background: '#2C2C2C' }}>
                <Phone size={16} style={{ color: '#9E9E9E' }} />
              </a>
              <a href="https://wa.me/32485584252" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center transition-colors" style={{ background: '#2C2C2C' }}>
                <MessageCircle size={16} style={{ color: '#25D366' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#9E9E9E' }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {['About', 'Services', 'Projects', 'Consultancy', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: '#9E9E9E' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#9E9E9E' }}>
              Get in touch
            </h4>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: '#9E9E9E' }}>
              <li className="flex items-center gap-2">
                <Mail size={14} style={{ color: '#B8923F' }} />
                Isijik@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} style={{ color: '#B8923F' }} />
                +32 485 58 42 52
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: '#B8923F' }} />
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: '#2C2C2C' }}>
          <p className="text-xs" style={{ color: '#737373' }}>
            &copy; {new Date().getFullYear()} Isioma &amp; Co. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#737373' }}>
            Chartered Accountants &middot; Business Consultants &middot; Mentors
          </p>
        </div>
      </div>
    </footer>
  )
}