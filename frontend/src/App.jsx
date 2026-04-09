import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollButtons from './components/ScrollButtons';
import WelcomeBanner from './components/WelcomeBanner';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Consultancy from './pages/Consultancy';
import Contact from './pages/Contact';
import Team from './pages/Team';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageConsultancy from './pages/admin/ManageConsultancy';
import ManageProjects from './pages/admin/ManageProjects';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageFaqs from './pages/admin/ManageFaqs';
import ManageMessages from './pages/admin/ManageMessages';
import { useState, useEffect } from 'react';

function PrivateRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return admin ? children : <Navigate to="/admin/login" />;
}

function PublicRoutes() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem('welcomeBannerShown')
      if (hasVisited) {
        setShowWelcome(false)
      }
    } catch (e) {
      // localStorage not available
    }
    setChecked(true)
  }, [])

  const handleWelcomeClose = () => {
    setShowWelcome(false)
    localStorage.setItem('welcomeBannerShown', 'true')
  }

  if (!checked) return null

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollButtons />
      {showWelcome && <WelcomeBanner onClose={handleWelcomeClose} />}
    </>
  );
}

function AdminRoutes() {
  const { admin, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <Routes>
      <Route path="/login" element={admin ? <Navigate to="/admin" /> : <AdminLogin />} />
      <Route path="/" element={admin ? <AdminLayout /> : <Navigate to="/admin/login" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="consultancy" element={<ManageConsultancy />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="faqs" element={<ManageFaqs />} />
        <Route path="messages" element={<ManageMessages />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route path="/*" element={<PublicRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}