import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ScrollButtons from '../components/ScrollButtons';

export default function PublicLayout() {
  return (
    <ScrollToTop />
  );
}

export function PublicPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollButtons />
    </div>
  );
}