import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { servicesAPI, projectsAPI, testimonialsAPI, faqsAPI, contactAPI } from '../../services/api';
import { Briefcase, FolderKanban, Users, MessageSquare, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    testimonials: 0,
    faqs: 0,
    messages: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [services, projects, testimonials, faqs, messages] = await Promise.all([
          servicesAPI.getAll(),
          projectsAPI.getAll(),
          testimonialsAPI.getAll(),
          faqsAPI.getAll(),
          contactAPI.getMessages()
        ]);
        
        setStats({
          services: Array.isArray(services.data?.data) ? services.data.data.length : 0,
          projects: Array.isArray(projects.data?.data) ? projects.data.data.length : 0,
          testimonials: Array.isArray(testimonials.data?.data) ? testimonials.data.data.length : 0,
          faqs: Array.isArray(faqs.data?.data) ? faqs.data.data.length : 0,
          messages: Array.isArray(messages.data?.data) ? messages.data.data.length : 0
        });
        
        setRecentMessages(Array.isArray(messages.data?.data) ? messages.data.data.slice(0, 5) : []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: 'Services', value: stats.services, icon: Briefcase, color: '#B8860B', bg: '#fff8e7' },
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: '#059669', bg: '#ecfdf5' },
    { label: 'Testimonials', value: stats.testimonials, icon: Users, color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'FAQs', value: stats.faqs, icon: MessageSquare, color: '#d97706', bg: '#fffbeb' },
    { label: 'Messages', value: stats.messages, icon: Mail, color: '#dc2626', bg: '#fef2f2' },
  ];

  const menuItems = [
    { label: 'Services', count: stats.services, path: '/admin/services', color: '#B8860B' },
    { label: 'Projects', count: stats.projects, path: '/admin/projects', color: '#059669' },
    { label: 'Testimonials', count: stats.testimonials, path: '/admin/testimonials', color: '#7c3aed' },
    { label: 'FAQs', count: stats.faqs, path: '/admin/faqs', color: '#d97706' },
    { label: 'Messages', count: stats.messages, path: '/admin/messages', color: '#dc2626' },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#B8860B' }}></div>
    </div>
  );

  return (
    <div className="p-8 min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Welcome back, {admin?.name}</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="shadow-md border p-6"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(item.path)}
              className="shadow-md border p-4 text-left flex items-center justify-between group"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
            >
              <div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                <p className="text-sm" style={{ color: item.color }}>{item.count} total</p>
              </div>
              <ArrowRight size={18} style={{ color: 'var(--text-muted)' }} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Messages */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="shadow-md border"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Messages</h2>
            {stats.messages > 0 && (
              <button 
                onClick={() => navigate('/admin/messages')}
                className="text-sm flex items-center gap-1 hover:underline"
                style={{ color: '#B8860B' }}
              >
                View all <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          {recentMessages.length === 0 ? (
            <div className="text-center py-8">
              <Mail size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
              <p style={{ color: 'var(--text-muted)' }}>No messages yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((msg, index) => (
                <motion.div 
                  key={msg._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 border hover:shadow-sm transition-shadow"
                  style={{ 
                    borderColor: 'var(--border-light)',
                    backgroundColor: msg.isRead ? 'var(--bg-secondary)' : isDark ? '#1a1a1a' : '#fdfbf7' 
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{msg.name}</span>
                      {!msg.isRead && (
                        <span className="text-xs px-2 py-0.5" style={{ background: '#B8860B', color: 'white' }}>New</span>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{msg.subject}</p>
                  <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-1">{msg.message.substring(0, 80)}...</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
