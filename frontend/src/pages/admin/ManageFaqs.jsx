import { useState, useEffect } from 'react';
import { faqsAPI } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '', category: 'general', order: 0, isActive: true });
  const { isDark } = useTheme();

  const fetchFaqs = async () => {
    const res = await faqsAPI.getAll();
    setFaqs(res.data.data);
    setLoading(false);
  };

  useEffect(() => { fetchFaqs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await faqsAPI.update(editingFaq._id, formData);
      } else {
        await faqsAPI.create(formData);
      }
      setShowForm(false);
      setEditingFaq(null);
      setFormData({ question: '', answer: '', category: 'general', order: 0, isActive: true });
      fetchFaqs();
    } catch (error) {
      alert('Error saving FAQ');
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category || 'general', order: faq.order || 0, isActive: faq.isActive });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this FAQ?')) {
      await faqsAPI.delete(id);
      fetchFaqs();
    }
  };

  if (loading) return <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading...</div>;

  return (
    <div className="p-8 min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>FAQs</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage frequently asked questions</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => { setShowForm(true); setEditingFaq(null); setFormData({ question: '', answer: '', category: 'general', order: 0, isActive: true }); }} className="flex items-center gap-2 text-white px-4 py-2" style={{ background: '#B8860B' }}>
          <Plus size={20} /> Add FAQ
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="shadow-md border mb-6 p-6" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{editingFaq ? 'Edit' : 'Add'} FAQ</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Question" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} required />
            <textarea placeholder="Answer" value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} rows={3} required />
            <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} />
            <input type="number" placeholder="Order" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} />
            <label className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
              Active
            </label>
            <div className="flex gap-2">
              <button type="submit" className="text-white px-4 py-2" style={{ background: '#B8860B' }}>Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2" style={{ background: 'var(--border-light)', color: 'var(--text-primary)' }}>Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div key={faq._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="shadow-md border p-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle size={18} style={{ color: '#B8860B' }} />
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{faq.question}</h3>
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{faq.answer.substring(0, 100)}...</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs px-2 py-1" style={{ background: 'var(--border-light)', color: 'var(--text-secondary)' }}>{faq.category}</span>
                  <span className="text-xs px-2 py-1" style={{ background: faq.isActive ? (isDark ? '#064e3b' : '#d1fae5') : 'var(--border-light)', color: faq.isActive ? (isDark ? '#6ee7b7' : '#065f46') : 'var(--text-muted)' }}>
                    {faq.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(faq)} style={{ color: '#B8860B' }}><Edit size={20} /></button>
                <button onClick={() => handleDelete(faq._id)} style={{ color: '#dc2626' }}><Trash2 size={20} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
