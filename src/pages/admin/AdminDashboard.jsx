import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { CalendarDays, Briefcase, Image as ImageIcon, Mail } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        bookings: 0,
        enquiries: 0,
        services: 0,
        portfolio: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const [bookRes, enqRes, servRes, portRes] = await Promise.all([
                supabase.from('bookings').select('*', { count: 'exact', head: true }),
                supabase.from('enquiries').select('*', { count: 'exact', head: true }),
                supabase.from('services').select('*', { count: 'exact', head: true }),
                supabase.from('portfolio').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                bookings: bookRes.count || 0,
                enquiries: enqRes.count || 0,
                services: servRes.count || 0,
                portfolio: portRes.count || 0
            });
            setLoading(false);
        };

        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Bookings', value: stats.bookings, icon: CalendarDays },
        { title: 'Total Enquiries', value: stats.enquiries, icon: Mail },
        { title: 'Total Services', value: stats.services, icon: Briefcase },
        { title: 'Portfolio Items', value: stats.portfolio, icon: ImageIcon },
    ];

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-luxury-gold uppercase tracking-widest mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-luxury-gold/20 p-6 rounded-xl shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-luxury-nude/60 text-xs uppercase tracking-wider mb-2">{card.title}</p>
                            {loading ? (
                                <div className="h-10 w-16 bg-white/10 rounded animate-pulse mt-1"></div>
                            ) : (
                                <p className="text-4xl font-serif text-white">{card.value}</p>
                            )}
                        </div>
                        <div className="p-4 bg-luxury-gold/10 rounded-full text-luxury-gold">
                            <card.icon className="w-8 h-8" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-8 bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl">
                <h2 className="text-xl font-serif text-luxury-gold uppercase tracking-widest mb-4">Welcome to Admin Panel</h2>
                <p className="text-luxury-nude/70 font-light leading-relaxed">
                    Here you can manage your bookings, services, and portfolio seamlessly.
                    Changes made here reflect immediately on the frontend website.
                    Be sure to use high-quality images for your portfolio and services.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
