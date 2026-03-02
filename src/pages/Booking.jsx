import React, { useState, useEffect } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useLocation } from 'react-router-dom';

const Booking = () => {
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: location.state?.service || 'General Inquiry',
        date: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [servicesList, setServicesList] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase.from('services').select('title').order('created_at', { ascending: true });
            if (!error && data) {
                setServicesList(data);
                if (!location.state?.service && data.length > 0) {
                    setFormData(prev => ({ ...prev, service: data[0].title }));
                }
            }
        };
        fetchServices();
    }, [location.state]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Submit to Supabase
            const { error } = await supabase.from('bookings').insert([{
                name: formData.name,
                phone: formData.phone,
                service: formData.service,
                event_date: formData.date,
                message: formData.message
            }]);

            if (error) {
                console.error("Booking Error:", error);
                alert("Failed to submit booking. Please try again.");
                return;
            }

            // Formatting the WhatsApp message
            const messageStr = `*New Booking Inquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Date Needed:* ${formData.date}%0A*Additional Details:* ${formData.message}`;
            const whatsappUrl = `https://wa.me/919976508775?text=${messageStr}`;

            window.open(whatsappUrl, '_blank');

            // Reset form (keep the selected service if dynamic, or fallback to first)
            setFormData({ name: '', phone: '', service: servicesList.length > 0 ? servicesList[0].title : 'General Inquiry', date: '', message: '' });
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen py-16 md:py-24 px-4 sm:px-6 flex items-center">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-luxury-gold text-[10px] md:text-sm tracking-[0.2em] uppercase mb-2 md:mb-4 block">Reserve Your Spot</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-luxury-nude mb-4 md:mb-6">Book an <span className="text-luxury-gold italic">Appointment</span></h1>
                    <p className="text-luxury-nude/70 font-light text-[13px] md:text-base leading-snug md:leading-relaxed">
                        Fill out the form below to secure your date. We require advance booking for all bridal and premium services. A team member will confirm your slot via WhatsApp immediately.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-luxury-black border border-luxury-gold/20 p-6 md:p-14 mb-6 md:mb-10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-5 md:mb-8">
                        <div>
                            <label className="block text-luxury-gold text-[10px] md:text-xs uppercase tracking-widest mb-1.5 md:mb-3">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Eleanor Vance"
                                className="w-full bg-transparent border-b border-luxury-nude/20 py-2 md:py-3 text-[13px] md:text-base text-luxury-nude font-light focus:outline-none focus:border-luxury-gold transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-luxury-gold text-[10px] md:text-xs uppercase tracking-widest mb-1.5 md:mb-3">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 99765 08775"
                                className="w-full bg-transparent border-b border-luxury-nude/20 py-2 md:py-3 text-[13px] md:text-base text-luxury-nude font-light focus:outline-none focus:border-luxury-gold transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-5 md:mb-8">
                        <div>
                            <label className="block text-luxury-gold text-[10px] md:text-xs uppercase tracking-widest mb-1.5 md:mb-3">Service Required *</label>
                            <select
                                name="service"
                                required
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full bg-[#0a0a0a] border-b border-luxury-nude/20 py-2 md:py-3 text-[13px] md:text-base text-luxury-nude/80 font-light focus:outline-none focus:border-luxury-gold transition-colors appearance-none cursor-pointer"
                            >
                                {servicesList.length > 0 ? (
                                    servicesList.map((srv, idx) => (
                                        <option key={idx} value={srv.title}>{srv.title}</option>
                                    ))
                                ) : (
                                    <option value={formData.service}>{formData.service}</option>
                                )}

                                {location.state?.service && !servicesList.find(s => s.title === location.state.service) && (
                                    <option value={location.state.service}>{location.state.service}</option>
                                )}

                                <option value="Academy Enrollment">Academy Enrollment</option>
                                <option value="Other">Other (Specify in message)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-luxury-gold text-[10px] md:text-xs uppercase tracking-widest mb-1.5 md:mb-3">Date Needed *</label>
                            <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-luxury-nude/20 py-2 md:py-3 text-[13px] md:text-base text-luxury-nude/80 font-light focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    <div className="mb-8 md:mb-12">
                        <label className="block text-luxury-gold text-[10px] md:text-xs uppercase tracking-widest mb-1.5 md:mb-3">Message / Venue Details</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Tell us more about your event..."
                            className="w-full bg-transparent border-b border-luxury-nude/20 py-2 md:py-3 text-[13px] md:text-base text-luxury-nude font-light focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 md:gap-4 bg-luxury-gold text-luxury-black py-3.5 md:py-5 text-sm md:text-base uppercase tracking-widest font-medium hover:bg-luxury-lightGold transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 md:w-[18px] md:h-[18px] animate-spin" />
                        ) : (
                            <MessageSquare className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        )}
                        {loading ? 'Processing...' : 'Connect via WhatsApp'}
                    </button>
                </form>

                <p className="text-center text-luxury-nude/40 text-xs font-light uppercase tracking-widest">
                    Secure Payments powered by Razorpay available upon consultation.
                </p>
            </div>
        </div>
    );
};

export default Booking;
