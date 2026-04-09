import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LayoutDashboard, LogOut, Home, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleGoToWebsite = () => {
    navigate('/');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/services', label: 'Services' },
    { to: '/admin/consultancy', label: 'Consultancy' },
    { to: '/admin/projects', label: 'Projects' },
    { to: '/admin/testimonials', label: 'Testimonials' },
    { to: '/admin/faqs', label: 'FAQs' },
    { to: '/admin/messages', label: 'Messages' },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <aside className="w-64 flex flex-col shadow-xl" style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-light)' }}>
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6"
          style={{ borderBottom: '1px solid var(--border-light)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <div>
              <h1 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Isioma</h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Admin Panel</p>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider px-4 mb-2" style={{ color: 'var(--text-muted)' }}>Menu</p>
          {navItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#B8860B] text-white shadow-md' 
                      : ''+ (isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                  }`
                }
              >
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="px-4 py-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 transition-colors w-full"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="px-4 py-2">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={handleGoToWebsite}
            className="flex items-center gap-3 px-4 py-3 transition-colors w-full"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Home size={20} />
            <span className="font-medium">View Website</span>
          </motion.button>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4"
          style={{ borderTop: '1px solid var(--border-light)', background: 'var(--bg-primary)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--border-light)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{admin?.name?.charAt(0) || 'A'}</span>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{admin?.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Admin</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 transition-colors text-sm w-full px-2 py-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </motion.div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto" style={{ background: 'var(--bg-primary)' }}>
        <Outlet />
      </main>
    </div>
  );
}