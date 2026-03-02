import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/nithya.webp';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 1024 : false
    );
    const location = useLocation();

    // Resize listener for conditional rendering
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Detect Scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close Mobile Menu on Route Change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinksLeft = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Academy', path: '/academy' },
        { name: 'Course Details', path: '/course-details' },
    ];

    const navLinksRight = [
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'About', path: '/about' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Contact', path: '/contact' },
        { name: 'Book Now', path: '/booking', isBtn: true },
    ];

    const allLinks = [...navLinksLeft, ...navLinksRight];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-in-out ${isScrolled
                ? 'bg-black/85 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.4)] py-3'
                : 'bg-transparent py-4'
                }`}
        >
            {/* Desktop */}
            {!isMobile && (
                <div
                    className="w-full items-center container mx-auto px-4 lg:px-8 xl:px-12 grid"
                    style={{ gridTemplateColumns: '1fr auto 1fr' }}
                >
                    {/* Left Nav */}
                    <nav className="flex justify-end gap-5 xl:gap-6 items-center pr-3 lg:pr-4 xl:pr-6">
                        {navLinksLeft.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-[11px] xl:text-[13px] tracking-[0.15em] uppercase transition-colors duration-300 font-medium whitespace-nowrap ${location.pathname === link.path
                                    ? 'text-[#D4AF37]'
                                    : 'text-white hover:text-[#D4AF37]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Center Brand */}
                    <div className="flex items-center justify-center px-0">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-[6px] group"
                        >
                            {/* Logo */}
                            <div className="relative flex items-center justify-center">
                                {/* Halo effect that pulses after layout transition */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.5, 2.5] }}
                                    transition={{ duration: 1.5, delay: 3.3, ease: "easeOut" }}
                                    className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[6px]"
                                />
                                <motion.img
                                    layoutId="main-logo"
                                    src={logoImg}
                                    alt="logo"
                                    className={`relative z-10 block w-auto flex-shrink-0 object-contain transition-all duration-300 ${isScrolled
                                        ? 'h-[28px] min-w-[28px] xl:h-[34px] xl:min-w-[34px]'
                                        : 'h-[36px] min-w-[36px] xl:h-[44px] xl:min-w-[44px]'
                                        }`}
                                />
                            </div>

                            {/* Text */}
                            <span
                                className={`text-[#D4AF37] flex-shrink-0 font-serif font-bold leading-none whitespace-nowrap transition-all duration-300 ml-[2px] ${isScrolled
                                    ? 'text-[16px] xl:text-[20px]'
                                    : 'text-[18px] xl:text-[24px]'
                                    }`}
                                style={{
                                    textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                                }}
                            >
                                Nithya Studio & Academy
                            </span>
                        </Link>
                    </div>

                    {/* Right Nav */}
                    <nav className="flex justify-start gap-4 xl:gap-6 items-center pl-3 lg:pl-4 xl:pl-6">
                        {navLinksRight.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-[11px] xl:text-[13px] tracking-[0.15em] uppercase transition-all duration-300 font-medium whitespace-nowrap flex items-center ${link.isBtn
                                    ? 'border border-[#D4AF37] px-4 py-2 hover:bg-[#D4AF37] hover:text-black rounded-sm'
                                    : ''
                                    }
                                ${!link.isBtn && location.pathname === link.path
                                        ? 'text-[#D4AF37]'
                                        : ''
                                    }
                                ${!link.isBtn && location.pathname !== link.path
                                        ? 'text-white hover:text-[#D4AF37]'
                                        : ''
                                    }
                                ${link.isBtn && location.pathname === link.path
                                        ? 'bg-[#D4AF37] text-black'
                                        : link.isBtn
                                            ? 'text-[#D4AF37]'
                                            : ''
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

            {/* Mobile */}
            {isMobile && (
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link
                        to="/"
                        className="flex items-center gap-[6px]"
                    >
                        <div className="relative flex items-center justify-center">
                            {/* Halo effect that pulses after layout transition */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.5, 2.5] }}
                                transition={{ duration: 1.5, delay: 3.3, ease: "easeOut" }}
                                className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[6px]"
                            />
                            <motion.img
                                layoutId="main-logo"
                                src={logoImg}
                                alt="logo"
                                className={`relative z-10 block w-auto flex-shrink-0 object-contain ${isScrolled ? 'h-[28px] min-w-[28px]' : 'h-[34px] min-w-[34px]'}`}
                            />
                        </div>
                        <span
                            className={`text-[#D4AF37] flex-shrink-0 font-serif font-bold leading-none whitespace-nowrap ml-[2px] ${isScrolled ? 'text-[14px]' : 'text-[16px]'
                                }`}
                        >
                            Nithya Studio
                        </span>
                    </Link>

                    {/* Menu Button */}
                    <button
                        className="text-[#D4AF37]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-[#D4AF37]/20">
                    <div className="flex flex-col px-6 py-4 gap-2">
                        {allLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm uppercase py-3 ${link.isBtn
                                    ? 'mt-4 text-center w-full px-6 py-3 bg-[#D4AF37] text-black'
                                    : location.pathname === link.path
                                        ? 'text-[#D4AF37]'
                                        : 'text-white hover:text-[#D4AF37]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;