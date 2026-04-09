import { useState, useEffect } from 'react';
import { servicesAPI } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', order: 0, isActive: true });
  const { isDark } = useTheme();

  const fetchServices = async () => {
    const res = await servicesAPI.getAll();
    setServices(res.data.data);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await servicesAPI.update(editingService._id, formData);
      } else {
        await servicesAPI.create(formData);
      }
      setShowForm(false);
      setEditingService(null);
      setFormData({ title: '', description: '', icon: '', order: 0, isActive: true });
      fetchServices();
    } catch (error) {
      alert('Error saving service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({ title: service.title, description: service.description, icon: service.icon || '', order: service.order || 0, isActive: service.isActive });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this service?')) {
      await servicesAPI.delete(id);
      fetchServices();
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
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Services</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage your services</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          onClick={() => { setShowForm(true); setEditingService(null); setFormData({ title: '', description: '', icon: '', order: 0, isActive: true }); }} 
          className="flex items-center gap-2 text-white px-4 py-2"
          style={{ background: '#B8860B' }}
        >
          <Plus size={20} /> Add Service
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="shadow-md border mb-6 p-6"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{editingService ? 'Edit' : 'Add'} Service</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Title" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              className="w-full p-2 border"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} 
              required 
            />
            <textarea 
              placeholder="Description" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              className="w-full p-2 border"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} 
              rows={3} 
              required 
            />
            <input 
              type="text" 
              placeholder="Icon (BarChart3, Shield, FileText, etc.)" 
              value={formData.icon} 
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })} 
              className="w-full p-2 border"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} 
            />
            <input 
              type="number" 
              placeholder="Order" 
              value={formData.order} 
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} 
              className="w-full p-2 border"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} 
            />
            <label className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
              Active
            </label>
            <div className="flex gap-2">
              <button type="submit" className="text-white px-4 py-2" style={{ background: '#B8860B' }}>Save</button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="px-4 py-2"
                style={{ background: 'var(--border-light)', color: 'var(--text-primary)' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div 
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="shadow-md border p-4 flex justify-between items-center"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
          >
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{service.description.substring(0, 100)}...</p>
              <span 
                className="text-xs px-2 py-1" 
                style={{ 
                  background: service.isActive ? isDark ? '#064e3b' : '#d1fae5' : 'var(--border-light)',
                  color: service.isActive ? (isDark ? '#6ee7b7' : '#065f46') : 'var(--text-muted)'
                }}
              >
                {service.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(service)} style={{ color: '#B8860B' }}><Edit size={20} /></button>
              <button onClick={() => handleDelete(service._id)} style={{ color: '#dc2626' }}><Trash2 size={20} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
