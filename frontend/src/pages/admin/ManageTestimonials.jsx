import { useState, useEffect } from 'react';
import { testimonialsAPI } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Edit, Trash2, Quote, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', company: '', quote: '', order: 0, isVisible: true });
  const { isDark } = useTheme();

  const fetchTestimonials = async () => {
    const res = await testimonialsAPI.getAll();
    setTestimonials(Array.isArray(res.data?.data) ? res.data.data : []);
    setLoading(false);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await testimonialsAPI.update(editingTestimonial._id, formData);
      } else {
        await testimonialsAPI.create(formData);
      }
      setShowForm(false);
      setEditingTestimonial(null);
      setFormData({ name: '', role: '', company: '', quote: '', order: 0, isVisible: true });
      fetchTestimonials();
    } catch (error) {
      alert('Error saving testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({ name: testimonial.name, role: testimonial.role, company: testimonial.company, quote: testimonial.quote, order: testimonial.order || 0, isVisible: testimonial.isVisible });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this testimonial?')) {
      await testimonialsAPI.delete(id);
      fetchTestimonials();
    }
  };

  if (loading) return <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading...</div>;

  return (
    <div className="p-8 min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Testimonials</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage client testimonials</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => { setShowForm(true); setEditingTestimonial(null); setFormData({ name: '', role: '', company: '', quote: '', order: 0, isVisible: true }); }} className="flex items-center gap-2 text-white px-4 py-2" style={{ background: '#B8860B' }}>
          <Plus size={20} /> Add Testimonial
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="shadow-md border mb-6 p-6" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{editingTestimonial ? 'Edit' : 'Add'} Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} required />
            <input type="text" placeholder="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} required />
            <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} required />
            <textarea placeholder="Quote" value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} rows={3} required />
            <input type="number" placeholder="Order" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} />
            <label className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <input type="checkbox" checked={formData.isVisible} onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })} />
              Visible
            </label>
            <div className="flex gap-2">
              <button type="submit" className="text-white px-4 py-2" style={{ background: '#B8860B' }}>Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2" style={{ background: 'var(--border-light)', color: 'var(--text-primary)' }}>Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {testimonials.map((t, index) => (
          <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="shadow-md border p-4 flex justify-between items-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User size={16} style={{ color: 'var(--text-muted)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.role} at {t.company}</p>
              <p className="text-sm mt-2 italic flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                <Quote size={14} className="mt-1" style={{ color: '#B8860B' }} />
                "{t.quote.substring(0, 80)}..."
              </p>
              <span className="text-xs px-2 py-1 mt-2 inline-block" style={{ background: t.isVisible ? (isDark ? '#064e3b' : '#d1fae5') : 'var(--border-light)', color: t.isVisible ? (isDark ? '#6ee7b7' : '#065f46') : 'var(--text-muted)' }}>
                {t.isVisible ? 'Visible' : 'Hidden'}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(t)} style={{ color: '#B8860B' }}><Edit size={20} /></button>
              <button onClick={() => handleDelete(t._id)} style={{ color: '#dc2626' }}><Trash2 size={20} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
