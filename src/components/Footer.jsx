import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] border-t border-luxury-gold/20 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-serif text-luxury-gold tracking-widest uppercase mb-6">Nithya Bridal</h2>
                    <p className="text-luxury-nude/70 font-light text-sm leading-relaxed mb-6">
                        Establishing the pinnacle of luxury bridal makeup and professional beauty academy training.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/nithyamakeoverjn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all">
                            <Instagram size={18} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61574766068355" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all">
                            <Facebook size={18} />
                        </a>
                        <a href="https://youtube.com/@nithyamakeoverandvlogger2883?si=w-Oej2DhRuy6Qw55" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-serif text-luxury-lightGold uppercase tracking-widest mb-6">Quick Links</h3>
                    <ul className="flex flex-col gap-3 text-sm font-light text-luxury-nude/70">
                        <li><Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-luxury-gold transition-colors">About Us</Link></li>
                        <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Our Services</Link></li>
                        <li><Link to="/academy" className="hover:text-luxury-gold transition-colors">Academy</Link></li>
                        <li><Link to="/portfolio" className="hover:text-luxury-gold transition-colors">Portfolio</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="font-serif text-luxury-lightGold uppercase tracking-widest mb-6">Services</h3>
                    <ul className="flex flex-col gap-3 text-sm font-light text-luxury-nude/70">
                        <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Bridal Makeup</Link></li>
                        <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Engagement Makeup</Link></li>
                        <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Party Makeup</Link></li>
                        <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Hair Styling</Link></li>
                        <li><Link to="/academy" className="hover:text-luxury-gold transition-colors">Pro Masterclass</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-serif text-luxury-lightGold uppercase tracking-widest mb-6">Contact Us</h3>
                    <ul className="flex flex-col gap-4 text-sm font-light text-luxury-nude/70">
                        <li className="flex gap-3 items-start">
                            <MapPin size={18} className="text-luxury-gold shrink-0 mt-0.5" />
                            <span>Kavithalaya complex, New Bus stand Road, Salem, Tamil Nadu-636004</span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <Phone size={18} className="text-luxury-gold shrink-0" />
                            <span>+91 99765 08775</span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <Mail size={18} className="text-luxury-gold shrink-0" />
                            <span>nithyabridalstudio@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-luxury-nude/50 font-light tracking-wide">
                <p>&copy; {new Date().getFullYear()} Nithya Bridal Studio. All rights reserved.</p>
                <p>Designed by <a href="https://crevasolution.com" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors">CrevaSolution</a></p>
            </div>
        </footer>
    );
};

export default Footer;
