import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import useThemeStore from "../stores/themeStore";

export default function GuestLayout() {

    const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`bg-black-main ${theme}`}>
      <Navbar className="overflow-hidden" />
      <Outlet />
      <Footer />
    </div>
  );
}
