import { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Check, Trash2, Mail, Send, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const fetchMessages = async () => {
    const res = await contactAPI.getMessages();
    setMessages(res.data.data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleMarkAsRead = async (id) => {
    await contactAPI.markAsRead(id);
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      await contactAPI.deleteMessage(id);
      fetchMessages();
    }
  };

  if (loading) return <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading...</div>;

  return (
    <div className="p-8 min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Messages</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>View and manage contact messages</p>
      </motion.div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="shadow-md border p-8 text-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <Mail size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>No messages yet</p>
          </motion.div>
        ) : (
          messages.map((msg, index) => (
            <motion.div key={msg._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="shadow-md border p-6" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', borderLeftWidth: '4px', borderLeftColor: msg.isRead ? 'var(--border-light)' : '#B8860B' }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User size={18} style={{ color: 'var(--text-muted)' }} />
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{msg.name}</h3>
                    {!msg.isRead && (
                      <span className="text-xs px-2 py-0.5" style={{ background: '#B8860B', color: 'white' }}>New</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    <Mail size={14} />
                    <span>{msg.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Send size={14} style={{ color: '#B8860B' }} />
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{msg.subject}</p>
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }}>{msg.message}</p>
                  <div className="flex items-center gap-1 text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                    <Clock size={12} />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!msg.isRead && (
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleMarkAsRead(msg._id)} className="p-2" style={{ color: '#059669' }} title="Mark as read">
                      <Check size={20} />
                    </motion.button>
                  )}
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(msg._id)} className="p-2" style={{ color: '#dc2626' }} title="Delete">
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
