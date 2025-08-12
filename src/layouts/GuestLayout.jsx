import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function GuestLayout() {
  return (
    <div className="bg-black-main ">
      <ScrollToTop />
      <Navbar className="overflow-hidden"/>
      <Outlet />
      <Footer />
    </div>
  );
}
