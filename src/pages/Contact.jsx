import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Calendar, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        serviceType: '',
        eventDate: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone Number is required";
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            const { error } = await supabase.from('enquiries').insert([{
                full_name: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                service_type: formData.serviceType,
                event_date: formData.eventDate,
                message: formData.message
            }]);

            if (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your inquiry. Please try again.');
                setIsSubmitting(false);
                return;
            }

            // Construct WhatsApp Message
            const whatsappNumber = "919976508775";
            const whatsappMessage = `Hello, I would like to inquire about your services.%0A%0A*Name:* ${formData.fullName}%0A*Phone:* ${formData.phone}${formData.email ? `%0A*Email:* ${formData.email}` : ''}${formData.serviceType ? `%0A*Service Required:* ${formData.serviceType}` : ''}${formData.eventDate ? `%0A*Event Date:* ${formData.eventDate}` : ''}${formData.message ? `%0A*Message:* ${formData.message}` : ''}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');

            console.log('Form Submitted Data & Sent to WhatsApp:', formData);
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset form after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    serviceType: '',
                    eventDate: '',
                    message: ''
                });
            }, 5000);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen py-16 md:py-24 px-4 sm:px-6 mt-16 md:mt-16">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-10 md:mb-24 max-w-3xl mx-auto">
                    <span className="text-luxury-gold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 md:mb-4 block font-medium">Contact Us</span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-luxury-nude mb-4 md:mb-6">Connect With <span className="text-luxury-gold italic">Us</span></h1>
                    <div className="w-12 md:w-16 h-[1px] bg-luxury-gold mx-auto mb-4 md:mb-6"></div>
                    <p className="text-luxury-nude/70 font-light text-sm md:text-lg leading-relaxed px-2 md:px-4">
                        Whether you're inquiring about our premium bridal services or looking to elevate your skills through our academy, our team is ready to assist you.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-16">

                    {/* Left Column: Form Section */}
                    <div className="w-full lg:w-3/5 order-2 lg:order-1">
                        <div className="bg-[#0f0f0f] rounded-2xl md:rounded-3xl p-5 md:p-12 border border-luxury-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <h2 className="hidden md:block text-3xl font-serif text-luxury-nude mb-8">Send an <span className="text-luxury-gold italic">Inquiry</span></h2>

                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center animate-fade-in">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-luxury-gold/20 flex items-center justify-center mb-4 md:mb-6">
                                        <CheckCircle2 size={30} className="text-luxury-gold md:w-10 md:h-10" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif text-luxury-nude mb-3 md:mb-4">Message Received</h3>
                                    <p className="text-luxury-nude/70 font-light leading-relaxed max-w-md">
                                        Thank you for reaching out. Our team will review your inquiry and contact you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                                        {/* Full Name */}
                                        <div className="space-y-1.5 md:space-y-2">
                                            <label className="text-luxury-nude/80 text-[10px] md:text-xs tracking-wider uppercase font-medium ml-1">Name <span className="text-luxury-gold">*</span></label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={`w-full bg-[#161616] border ${errors.fullName ? 'border-red-500/50 focus:border-red-500' : 'border-luxury-gold/20 focus:border-luxury-gold'} rounded-lg md:rounded-xl px-3 py-2.5 md:px-5 md:py-4 text-luxury-nude placeholder-luxury-nude/30 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50 transition-all duration-300 text-[13px] md:text-sm shadow-inner`}
                                                placeholder="Jane Doe"
                                            />
                                            {errors.fullName && <p className="text-red-400 text-[10px] md:text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} className="md:w-3 md:h-3" /> {errors.fullName}</p>}
                                        </div>

                                        {/* Phone Number */}
                                        <div className="space-y-1.5 md:space-y-2">
                                            <label className="text-luxury-nude/80 text-[10px] md:text-xs tracking-wider uppercase font-medium ml-1">Phone <span className="text-luxury-gold">*</span></label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full bg-[#161616] border ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-luxury-gold/20 focus:border-luxury-gold'} rounded-lg md:rounded-xl px-3 py-2.5 md:px-5 md:py-4 text-luxury-nude placeholder-luxury-nude/30 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50 transition-all duration-300 text-[13px] md:text-sm shadow-inner`}
                                                placeholder="+91 99765 08775"
                                            />
                                            {errors.phone && <p className="text-red-400 text-[10px] md:text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} className="md:w-3 md:h-3" /> {errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                                        {/* Email */}
                                        <div className="space-y-1.5 md:space-y-2">
                                            <label className="text-luxury-nude/80 text-[10px] md:text-xs tracking-wider uppercase font-medium ml-1">Email <span className="text-luxury-nude/40 text-[9px] md:text-[10px] lowercase">(optional)</span></label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-[#161616] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-luxury-gold/20 focus:border-luxury-gold'} rounded-lg md:rounded-xl px-3 py-2.5 md:px-5 md:py-4 text-luxury-nude placeholder-luxury-nude/30 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50 transition-all duration-300 text-[13px] md:text-sm shadow-inner`}
                                                placeholder="jane@example.com"
                                            />
                                            {errors.email && <p className="text-red-400 text-[10px] md:text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} className="md:w-3 md:h-3" /> {errors.email}</p>}
                                        </div>

                                        {/* Service Type */}
                                        <div className="space-y-1.5 md:space-y-2">
                                            <label className="text-luxury-nude/80 text-[10px] md:text-xs tracking-wider uppercase font-medium ml-1">Service Required</label>
                                            <div className="relative">
                                                <select
                                                    name="serviceType"
                                                    value={formData.serviceType}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#161616] border border-luxury-gold/20 rounded-lg md:rounded-xl px-3 py-2.5 md:px-5 md:py-4 text-luxury-nude focus:outline-none focus:ring-1 focus:border-luxury-gold focus:ring-luxury-gold/50 transition-all duration-300 text-[13px] md:text-sm shadow-inner appearance-none cursor-pointer leading-tight h-[42px] md:h-auto"
                                                >
                                                    <option value="" disabled className="text-luxury-nude/30">Select a Service</option>
                                                    <option value="Bridal Makeup">Bridal Makeup</option>
                                                    <option value="Reception Makeup">Reception Makeup</option>
                                                    <option value="Pre-Wedding">Pre-Wedding Shoot</option>
                                                    <option value="Academy">Professional Academy</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                {/* Custom dropdown arrow */}
                                                <div className="absolute inset-y-0 right-3 md:right-5 flex items-center pointer-events-none">
                                                    <svg className="w-3 h-3 md:w-4 md:h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Event Date */}
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-luxury-nude/80 text-[10px] md:text-xs tracking-wider uppercase font-medium ml-1 flex items-center gap-1.5 md:gap-2">
                                            <Calendar size={12} className="text-luxury-gold/70 md:w-[14px] md:h-[14px]" /> Event Date <span className="text-luxury-nude/40 text-[9px] md:text-[10px] lowercase">(optional)</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleChange}
                                            className="w-full bg-[#161616] border border-luxury-gold/20 rounded-lg md:rounded-xl px-3 py-2.5 md:px-5 md:py-4 text-luxury-nude focus:outline-none focus:ring-1 focus:border-luxury-gold focus:ring-luxury-gold/50 transition-all duration-300 text-[13px] md:text-sm shadow-inner cursor-pointer color-scheme-dark h-[42px] md:h-auto"
                                            style={{ colorScheme: 'dark' }}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-luxury-nude/80 text-[10px] md:text-xs tracking-wider uppercase font-medium ml-1 flex items-center gap-1.5 md:gap-2">
                                            <MessageSquare size={12} className="text-luxury-gold/70 md:w-[14px] md:h-[14px]" /> Tell us more <span className="text-luxury-nude/40 text-[9px] md:text-[10px] lowercase">(optional)</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            rows="3"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-[#161616] border border-luxury-gold/20 rounded-lg md:rounded-xl px-3 py-3 md:px-5 md:py-4 text-luxury-nude placeholder-luxury-nude/30 focus:outline-none focus:ring-1 focus:border-luxury-gold focus:ring-luxury-gold/50 transition-all duration-300 text-[13px] md:text-sm shadow-inner resize-none md:rows-4"
                                            placeholder="Share details..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-2 md:mt-4 flex items-center justify-center min-h-[44px] md:min-h-[56px] py-2.5 md:py-4 bg-luxury-gold/10 backdrop-blur-md border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500 uppercase tracking-widest text-[11px] md:text-sm font-semibold md:font-bold rounded-lg md:rounded-xl shadow-[0_5px_15px_rgba(201,164,92,0.1)] group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Processing...' : 'Book Consultation'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Contact Details & Info */}
                    <div className="w-full lg:w-2/5 order-1 lg:order-2 flex flex-col md:gap-8">
                        {/* Interactive Info Cards */}
                        <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl md:rounded-3xl p-5 md:p-10 border border-luxury-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex-grow">
                            <h3 className="hidden md:block text-2xl font-serif text-luxury-nude mb-8">Contact <span className="text-luxury-gold italic">Information</span></h3>

                            {/* Consolidated Contact Grid for Mobile / List for Desktop */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 md:gap-8">
                                {/* Direct Contact */}
                                <div className="flex sm:flex-col md:flex-row items-center sm:items-start md:items-center gap-3 md:gap-5 group cursor-default text-center sm:text-left">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center shrink-0 group-hover:bg-luxury-gold/20 transition-colors duration-500">
                                        <Phone size={16} className="text-luxury-gold md:w-5 md:h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="hidden md:block text-luxury-nude/90 font-medium text-sm sm:text-base mb-1">Direct Bookings</h4>
                                        <p className="text-luxury-nude/80 md:text-luxury-nude/60 font-medium md:font-light text-[13px] md:text-sm lg:text-base tracking-wide">+91 99765 08775</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex sm:flex-col md:flex-row items-center sm:items-start md:items-center gap-3 md:gap-5 group cursor-default text-center sm:text-left">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center shrink-0 group-hover:bg-luxury-gold/20 transition-colors duration-500">
                                        <Mail size={16} className="text-luxury-gold md:w-5 md:h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="hidden md:block text-luxury-nude/90 font-medium text-sm sm:text-base mb-1">Email Inquiry</h4>
                                        <p className="text-luxury-nude/80 md:text-luxury-nude/60 font-medium md:font-light text-[13px] md:text-sm lg:text-base tracking-wide lowercase">nithyabridalstudio@gmail.com</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex sm:flex-col md:flex-row items-center sm:items-start md:items-center gap-3 md:gap-5 group cursor-default text-center sm:text-left text-balance">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center shrink-0 group-hover:bg-luxury-gold/20 transition-colors duration-500">
                                        <MapPin size={16} className="text-luxury-gold md:w-5 md:h-5" />
                                    </div>
                                    <div className="flex-1 text-left sm:text-left md:text-left">
                                        <h4 className="hidden md:block text-luxury-nude/90 font-medium text-sm sm:text-base mb-1">Studio Address</h4>
                                        <p className="text-luxury-nude/80 md:text-luxury-nude/60 font-medium md:font-light text-[12px] md:text-sm lg:text-base tracking-wide leading-tight md:leading-relaxed">
                                            Kavithalaya complex, New Bus stand Road, <span className="hidden md:inline"><br /></span>Salem, Tamil Nadu-636004
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent my-6 md:my-10"></div>

                            {/* WhatsApp Direct Button */}
                            <a
                                href="https://wa.me/919976508775"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-lg md:rounded-xl hover:bg-[#25D366] hover:text-black hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all duration-300 font-medium tracking-wide uppercase text-[11px] md:text-sm"
                            >
                                {/* Custom WhatsApp Icon Path */}
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.347-.272.271-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                                Connect on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Social Follow Footnote */}
                <div className="text-center py-10 md:py-16 mt-8 md:mt-12 border-t border-luxury-gold/5">
                    <span className="text-luxury-gold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block">Follow Our Artistry</span>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.instagram.com/nithyamakeoverjn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold/70 hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all duration-300 hover:scale-110">
                            <Instagram size={18} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61574766068355" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold/70 hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all duration-300 hover:scale-110">
                            <Facebook size={18} />
                        </a>
                        <a href="https://youtube.com/@nithyamakeoverandvlogger2883?si=w-Oej2DhRuy6Qw55" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold/70 hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all duration-300 hover:scale-110">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
