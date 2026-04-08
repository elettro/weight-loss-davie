import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
