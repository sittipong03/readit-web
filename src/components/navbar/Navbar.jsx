import { useLocation } from 'react-router-dom';
import LoginNavbar from './GuestNavbar';
import GuestNavbar from './LoginNavbar';
import SearchNavbar from './SearchNavbar'

function Navbar({ user, currentPage }) {
    const location = useLocation();
    const path = location.pathname.toLowerCase().replace(/\/$/, '');
    const isHome = path === '' || path === '/home';
    return (
        <nav className="bg-[#12100e] text-[#d5c4a1] px-6 py-3 flex items-center justify-between">
            {/* Left: Logo + Search */}
            <div className="flex items-center gap-6">
                <span className="text-2xl font-serif font-semibold">Readit</span>
                {!isHome && <SearchNavbar />}
            </div>

            {/* Center: Navigation */}
            <div className="hidden md:flex gap-8 text-sm font-medium">
                <a href="#" className="hover:text-orange-400">Browse a book</a>
                <a href="#" className="hover:text-orange-400">About Us</a>
                <a href="#" className="hover:text-orange-400">Contact Us</a>
            </div>

            {/* Right: Auth Conditional */}
            <div className="flex items-center gap-4 text-sm">
                {user?.id ? <LoginNavbar user={user} /> : <GuestNavbar />}
            </div>
        </nav>
    );
}
export default Navbar