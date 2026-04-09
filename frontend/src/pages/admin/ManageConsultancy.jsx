import { useState, useEffect } from 'react';
import { consultancyAPI } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageConsultancy() {
  const [consultancies, setConsultancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingConsultancy, setEditingConsultancy] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Briefcase',
    benefits: '',
    process: '',
    isActive: true
  });
  const { isDark } = useTheme();

  const fetchConsultancies = async () => {
    try {
      console.log('Fetching consultancies...')
      const res = await consultancyAPI.getAll();
      console.log('Admin consultancy response:', res.data);
      if (res.data && res.data.success) {
        setConsultancies(res.data.data || []);
      } else {
        console.error('Unexpected response format:', res.data);
        setConsultancies([]);
      }
    } catch (err) {
      console.error('Error fetching consultancies:', err);
      console.error('Error response:', err.response);
      setConsultancies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConsultancies(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
      process: formData.process.split('\n').map((p, i) => {
        const [title, ...desc] = p.split('-');
        return { step: i + 1, title: title?.trim(), description: desc.join('-').trim() };
      }).filter(p => p.title)
    };
    try {
      if (editingConsultancy) {
        await consultancyAPI.update(editingConsultancy._id, data);
      } else {
        await consultancyAPI.create(data);
      }
      setShowForm(false);
      setEditingConsultancy(null);
      setFormData({ title: '', description: '', icon: 'Briefcase', benefits: '', process: '', isActive: true });
      fetchConsultancies();
    } catch (error) {
      alert('Error saving consultancy');
    }
  };

  const handleEdit = (consultancy) => {
    setEditingConsultancy(consultancy);
    setFormData({
      title: consultancy.title,
      description: consultancy.description,
      icon: consultancy.icon || 'Briefcase',
      benefits: consultancy.benefits?.join('\n') || '',
      process: consultancy.process?.map(p => `${p.title} - ${p.description}`).join('\n') || '',
      isActive: consultancy.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this consultancy?')) {
      await consultancyAPI.delete(id);
      fetchConsultancies();
    }
  };

  if (loading) return <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading...</div>;

  return (
    <div className="p-8 min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Consultancy</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage consultancy services</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          onClick={() => { setShowForm(true); setEditingConsultancy(null); setFormData({ title: '', description: '', icon: 'Briefcase', benefits: '', process: '', isActive: true }); }} 
          className="flex items-center gap-2 text-white px-4 py-2"
          style={{ background: '#B8860B' }}
        >
          <Plus size={20} /> Add Consultancy
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="shadow-md border mb-6 p-6"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{editingConsultancy ? 'Edit' : 'Add'} Consultancy</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} required />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} rows={3} required />
            <input type="text" placeholder="Icon name (e.g. Briefcase, Settings, CheckCircle)" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} />
            <textarea placeholder="Benefits (one per line)" value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} rows={3} />
            <textarea placeholder="Process (format: Step Title - Description, one per line)" value={formData.process} onChange={(e) => setFormData({ ...formData, process: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} rows={3} />
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
        {consultancies.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="shadow-md border p-8 text-center"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
          >
            <Briefcase size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>No consultancy services yet</p>
          </motion.div>
        ) : consultancies.map((c, index) => (
          <motion.div 
            key={c._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="shadow-md border p-4"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={18} style={{ color: '#B8860B' }} />
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{c.title}</h3>
                  <span className={`text-xs px-2 py-1`} style={{ background: c.isActive ? (isDark ? '#064e3b' : '#d1fae5') : 'var(--border-light)', color: c.isActive ? (isDark ? '#6ee7b7' : '#065f46') : 'var(--text-muted)' }}>
                    {c.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{c.description.substring(0, 150)}...</p>
                {c.benefits && c.benefits.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.benefits.slice(0, 3).map((b, i) => (
                      <span key={i} className="text-xs px-2 py-1" style={{ background: 'var(--border-light)', color: 'var(--text-secondary)' }}>{b}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(c)} style={{ color: '#B8860B' }}><Edit size={20} /></button>
                <button onClick={() => handleDelete(c._id)} style={{ color: '#dc2626' }}><Trash2 size={20} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}