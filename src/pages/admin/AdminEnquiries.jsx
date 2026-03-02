import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Trash2 } from 'lucide-react';

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEnquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            setEnquiries(data || []);
        } else {
            console.error("Error fetching enquiries", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

        const { error } = await supabase
            .from('enquiries')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchEnquiries();
        } else {
            alert('Failed to delete enquiry.');
        }
    };

    if (loading) {
        return (
            <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-serif text-luxury-gold uppercase tracking-widest flex items-center gap-3">
                        <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
                        Enquiries
                    </h1>
                </div>
                <div className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-luxury-gold/5 border-b border-luxury-gold/20">
                                    <th className="p-4"><div className="w-20 h-4 bg-white/10 rounded animate-pulse"></div></th>
                                    <th className="p-4"><div className="w-24 h-4 bg-white/10 rounded animate-pulse"></div></th>
                                    <th className="p-4"><div className="w-24 h-4 bg-white/10 rounded animate-pulse"></div></th>
                                    <th className="p-4"><div className="w-24 h-4 bg-white/10 rounded animate-pulse"></div></th>
                                    <th className="p-4"><div className="w-24 h-4 bg-white/10 rounded animate-pulse"></div></th>
                                    <th className="p-4"><div className="w-32 h-4 bg-white/10 rounded animate-pulse"></div></th>
                                    <th className="p-4"><div className="w-10 h-4 bg-white/10 rounded animate-pulse ml-auto"></div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <tr key={n} className="border-b border-luxury-gold/10">
                                        <td className="p-4"><div className="w-20 h-4 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="w-32 h-4 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="w-24 h-4 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="w-24 h-4 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="w-24 h-4 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="w-48 h-4 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="w-8 h-8 bg-white/5 rounded animate-pulse ml-auto"></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-serif text-luxury-gold uppercase tracking-widest flex items-center gap-3">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
                    Enquiries
                </h1>
            </div>

            <div className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-luxury-gold/5 border-b border-luxury-gold/20">
                                <th className="p-4 text-xs tracking-wider uppercase text-luxury-gold font-medium">Date Created</th>
                                <th className="p-4 text-xs tracking-wider uppercase text-luxury-gold font-medium">Name</th>
                                <th className="p-4 text-xs tracking-wider uppercase text-luxury-gold font-medium">Phone & Email</th>
                                <th className="p-4 text-xs tracking-wider uppercase text-luxury-gold font-medium">Service</th>
                                <th className="p-4 text-xs tracking-wider uppercase text-luxury-gold font-medium">Event Date</th>
                                <th className="p-4 text-xs tracking-wider uppercase text-luxury-gold font-medium">Message</th>
                                <th className="p-4 text-xs tracking-wider uppercase text-luxury-gold font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.map((enquiry) => (
                                <tr key={enquiry.id} className="border-b border-luxury-gold/10 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-sm font-light">
                                        {new Date(enquiry.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-sm font-medium text-white">{enquiry.full_name}</td>
                                    <td className="p-4 text-sm font-light">
                                        <div>{enquiry.phone}</div>
                                        <div className="text-luxury-nude/50 text-xs">{enquiry.email || '-'}</div>
                                    </td>
                                    <td className="p-4 text-sm font-light text-luxury-gold/80">{enquiry.service_type || '-'}</td>
                                    <td className="p-4 text-sm font-light">{enquiry.event_date || '-'}</td>
                                    <td className="p-4 text-sm font-light max-w-xs truncate" title={enquiry.message}>
                                        {enquiry.message || '-'}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(enquiry.id)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {enquiries.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-sm font-light text-luxury-nude/50">
                                        No enquiries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminEnquiries;
