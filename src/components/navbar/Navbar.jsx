import { useLocation } from "react-router-dom";
import LoginNavbar from "./GuestNavbar";
import GuestNavbar from "./LoginNavbar";
import SearchNavbar from "./SearchNavbar";
import { ReaditLogo } from "@/src/assets/readit";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import useUserStore from "../../stores/userStore"

function Navbar({ user, currentPage }) {
  const location = useLocation();
  const path = location.pathname.toLowerCase().replace(/\/$/, "");
  const isBrowser = path === "" || path === "/home";

  const { userId, userName } = useUserStore()

  const isAuthenticated = !!userId;

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setIsVisible(false);
    } else if (window.scrollY < lastScrollY) {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 transform transition-transform duration-300 ease-in-out ${!isVisible ? "-translate-y-full" : ""} dark`}
    >
      <div className="flex items-center justify-between bg-paper-elevation-2 px-6 py-3 text-[#d5c4a1] shadow-md">
        {/* Left: Logo + Search */}
        <div className="flex flex-1 items-center gap-4">
          <ReaditLogo className="text-secondary-main" size={20} />
          {!isBrowser && <SearchNavbar />}
        </div>
        {/* Center: Navigation */}
        <div className="hidden flex-1 justify-center gap-2 md:flex">
          <Button variant="text" asChild color="neutral">
            <a href="/book">Browse a book</a>
          </Button>
          <Button variant="text" asChild color="neutral">
            <a href="/about">About Us</a>
          </Button>
          <Button variant="text" asChild color="neutral">
            <a href="/buttontest">Design System</a>
          </Button>
        </div>
        {/* Right: Auth Conditional */}
        <div className="flex flex-1 items-center justify-end gap-4 text-sm">
          {isAuthenticated ? (
            <GuestNavbar userName={userName} /> // ✅ show user navbar
          ) : (
            <LoginNavbar /> // ✅ show guest navbar
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
