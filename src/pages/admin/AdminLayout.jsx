import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Briefcase, Image as ImageIcon, Youtube, LogOut, Loader2, Menu, X, Mail, GraduationCap } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close sidebar on route change logically
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/login');
            } else {
                setLoading(false);
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate('/admin/login');
            }
        });

        return () => subscription?.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
            </div>
        );
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
        { name: 'Enquiries', href: '/admin/enquiries', icon: Mail },
        { name: 'Services', href: '/admin/services', icon: Briefcase },
        { name: 'Academy', href: '/admin/academy', icon: GraduationCap },
        { name: 'Portfolio', href: '/admin/portfolio', icon: ImageIcon },
        { name: 'Videos', href: '/admin/videos', icon: Youtube },
    ];

    return (
        <div className="flex h-screen bg-[#050505] font-sans text-luxury-nude selection:bg-luxury-gold selection:text-luxury-black overflow-hidden">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-luxury-gold/10 flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-luxury-gold/10">
                    <h1 className="text-xl font-serif text-luxury-gold uppercase tracking-widest">Makeover Admin</h1>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-luxury-nude/50 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = location.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm uppercase tracking-wider transition-colors ${isActive
                                    ? 'bg-luxury-gold text-luxury-black font-medium'
                                    : 'text-luxury-nude/70 hover:bg-white/5 hover:text-luxury-gold'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-luxury-gold/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col w-full">
                {/* Mobile Header bar */}
                <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-[#0a0a0a] border-b border-luxury-gold/10 z-30">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setSidebarOpen(true)} className="text-luxury-nude hover:text-luxury-gold">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-serif text-luxury-gold uppercase tracking-widest">Makeover Admin</h1>
                    </div>
                </div>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
