import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { contactAPI } from '../services/api'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await contactAPI.submit(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: 'var(--charcoal-600)' }}>Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Amaka Okonkwo"
            className="w-full border px-4 py-3 text-sm focus:outline-none transition-colors"
            style={{ 
              borderColor: 'var(--border-medium)', 
              color: 'var(--text-primary)',
              background: 'white'
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: 'var(--charcoal-600)' }}>Email address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="amaka@example.com"
            className="w-full border px-4 py-3 text-sm focus:outline-none transition-colors"
            style={{ 
              borderColor: 'var(--border-medium)', 
              color: 'var(--text-primary)',
              background: 'white'
            }}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: 'var(--charcoal-600)' }}>Subject</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          placeholder="What can we help you with?"
          className="w-full border px-4 py-3 text-sm focus:outline-none transition-colors"
          style={{ 
            borderColor: 'var(--border-medium)', 
            color: 'var(--text-primary)',
            background: 'white'
          }}
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: 'var(--charcoal-600)' }}>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us more about your goals..."
          className="w-full border px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
          style={{ 
            borderColor: 'var(--border-medium)', 
            color: 'var(--text-primary)',
            background: 'white'
          }}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start inline-flex items-center gap-2 px-8 py-3 text-sm font-medium transition-colors disabled:opacity-50"
        style={{ 
          background: 'var(--charcoal-900)', 
          color: 'white',
          border: '1px solid var(--charcoal-900)'
        }}
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <Send size={16} />
          </>
        )}
      </button>
      {status === 'success' && (
        <p className="text-sm" style={{ color: 'var(--accent)' }}>Message sent. We'll be in touch shortly.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Failed to send message. Please try again.</p>
      )}
    </form>
  )
}