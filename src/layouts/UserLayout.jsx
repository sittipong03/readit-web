import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';

export default function GuestLayout() {

  return (
    <>
      <Navbar />
      <main className="main-content">
        {/* เนื้อหาของแต่ละหน้าจะถูกแสดงที่นี่ */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}