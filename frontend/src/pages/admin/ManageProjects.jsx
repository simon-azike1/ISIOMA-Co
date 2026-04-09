import { useState, useEffect } from 'react';
import { projectsAPI } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Edit, Trash2, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: '', description: '', tags: '', year: '', isVisible: true });
  const { isDark } = useTheme();

  const fetchProjects = async () => {
    const res = await projectsAPI.getAll();
    setProjects(Array.isArray(res.data?.data) ? res.data.data : []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean), year: formData.year ? parseInt(formData.year) : null };
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, data);
      } else {
        await projectsAPI.create(data);
      }
      setShowForm(false);
      setEditingProject(null);
      setFormData({ title: '', category: '', description: '', tags: '', year: '', isVisible: true });
      fetchProjects();
    } catch (error) {
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({ title: project.title, category: project.category, description: project.description, tags: project.tags?.join(', ') || '', year: project.year || '', isVisible: project.isVisible });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      await projectsAPI.delete(id);
      fetchProjects();
    }
  };

  if (loading) return <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading...</div>;

  return (
    <div className="p-8 min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Projects</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage your projects</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => { setShowForm(true); setEditingProject(null); setFormData({ title: '', category: '', description: '', tags: '', year: '', isVisible: true }); }} className="flex items-center gap-2 text-white px-4 py-2" style={{ background: '#B8860B' }}>
          <Plus size={20} /> Add Project
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="shadow-md border mb-6 p-6" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{editingProject ? 'Edit' : 'Add'} Project</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} required />
            <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} required />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} rows={3} required />
            <input type="text" placeholder="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} />
            <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full p-2 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }} />
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
        {projects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="shadow-md border p-8 text-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <FolderKanban size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>No projects yet</p>
          </motion.div>
        ) : projects.map((p, index) => (
          <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="shadow-md border p-4 flex justify-between items-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                <span className="text-xs px-2 py-1" style={{ background: p.isVisible ? (isDark ? '#064e3b' : '#d1fae5') : 'var(--border-light)', color: p.isVisible ? (isDark ? '#6ee7b7' : '#065f46') : 'var(--text-muted)' }}>{p.isVisible ? 'Visible' : 'Hidden'}</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{p.description?.substring(0, 100)}...</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{p.category} • {p.year}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} style={{ color: '#B8860B' }}><Edit size={20} /></button>
              <button onClick={() => handleDelete(p._id)} style={{ color: '#dc2626' }}><Trash2 size={20} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
