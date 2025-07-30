import { Outlet,useLocation } from 'react-router';
import UserNavbar from '../components/navbar/UserNavbar';
import NonSearchNavbar from '../components/navbar/NonSearchNavbar';
import Footer from '../components/Footer';

export default function GuestLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <>
      {/* ถ้าอยู่ที่หน้า /home ให้ใช้ NonSearchNavbar, ถ้าไม่ GuestNavbar */}
      {isHomePage ? <NonSearchNavbar /> : <UserNavbar />}
      
      <main className="main-content">
        {/* เนื้อหาของแต่ละหน้าจะถูกแสดงที่นี่ */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}