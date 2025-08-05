import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

export default function GuestLayout() {
  return (
    <div className="bg-black-main ">
      <Navbar className="overflow-hidden"/>
      <Outlet />
      <Footer />
    </div>
  );
}
