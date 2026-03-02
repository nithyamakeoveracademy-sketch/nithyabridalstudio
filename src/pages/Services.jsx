import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animations.jsx';
import { supabase } from '../lib/supabaseClient';

const Services = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [servicesList, setServicesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
            if (!error && data) {
                const parsedData = data.map(item => {
                    let parsedFeatures = [];
                    try { parsedFeatures = JSON.parse(item.features); } catch (e) { }
                    return {
                        ...item,
                        features: Array.isArray(parsedFeatures) ? parsedFeatures : []
                    };
                });
                setServicesList(parsedData);
            }
            setLoading(false);
        };
        fetchServices();
    }, []);

    return (
        <div className="bg-[#0a0a0a] min-h-screen py-16 md:py-24 px-4 sm:px-6 relative">
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-luxury-gold/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto relative z-10 max-w-5xl">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <FadeIn direction="up">
                        <span className="text-luxury-gold text-xs sm:text-sm tracking-[0.2em] font-medium uppercase mb-4 block">Our Expertise</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-luxury-nude mb-6">Signature <span className="text-luxury-gold italic pr-2">Services</span></h1>
                        <div className="w-12 md:w-16 h-[1px] bg-luxury-gold mx-auto mb-6 md:mb-8"></div>
                        <p className="text-luxury-nude/70 font-light text-base md:text-lg leading-relaxed px-4">
                            Discover our comprehensive range of luxury beauty services, precision-crafted to define your features and elevate your natural elegance.
                        </p>
                    </FadeIn>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="bg-[#080808] border border-luxury-gold/10 overflow-hidden flex flex-col h-[340px] md:h-[400px] lg:h-[440px] rounded-xl shadow-lg relative animate-pulse">
                                {/* Image placeholder */}
                                <div className="absolute inset-0 bg-white/5 z-0"></div>

                                {/* Content placeholder */}
                                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end z-20">
                                    <div className="flex flex-col mb-1 md:mb-2 gap-2">
                                        <div className="h-6 md:h-8 bg-white/10 rounded w-2/3"></div>
                                        <div className="h-4 md:h-5 bg-white/10 rounded w-24"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : servicesList.length === 0 ? (
                    <div className="text-center py-20 text-luxury-nude/50 font-light border border-luxury-gold/10 rounded-xl bg-[#080808]">
                        <p>No services available at the moment. Please check back later.</p>
                    </div>
                ) : (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                        {servicesList.map((service, idx) => {
                            const isActive = activeCard === idx;

                            return (
                                <StaggerItem key={idx}>
                                    <div
                                        className="group bg-[#080808] border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-500 overflow-hidden flex flex-col h-[340px] md:h-[400px] lg:h-[440px] rounded-xl shadow-lg md:hover:shadow-[0_20px_40px_rgba(201,164,92,0.15)] relative cursor-pointer"
                                        onClick={() => setActiveCard(isActive ? null : idx)}
                                    >

                                        {/* Image Stack - Fully Covering the Card */}
                                        <div className="absolute inset-0 overflow-hidden z-0">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-90 z-10 transition-opacity duration-500"></div>

                                            {/* Blur Overlay - shown on mobile active OR desktop hover */}
                                            <div className={`absolute inset-0 bg-[#050505]/80 backdrop-blur-md transition-all duration-700 z-10 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}></div>

                                            <img
                                                src={service.img}
                                                alt={service.title}
                                                className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-110' : 'md:group-hover:scale-110'}`}
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Content Stack - Absolute positioned at bottom */}
                                        <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end z-20">

                                            {/* Title & Price Container */}
                                            <div className={`relative z-30 transition-transform duration-700 ease-out ${isActive ? '-translate-y-1 lg:-translate-y-4' : 'md:group-hover:-translate-y-2 lg:md:group-hover:-translate-y-4'}`}>
                                                <h3 className="text-lg md:text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors duration-500 mb-1.5 md:mb-2 drop-shadow-md">{service.title}</h3>
                                                <div className="mb-2 md:mb-0 transition-all duration-700">
                                                    <span className="inline-block text-luxury-gold font-medium text-[11px] md:text-sm tracking-widest border border-luxury-gold/30 px-2 py-0.5 md:px-3 md:py-1 bg-[#050505]/60 backdrop-blur-sm rounded-md shadow-lg drop-shadow-md">
                                                        {service.price}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Hover/Tap Details Stack */}
                                            <div className={`flex flex-col flex-grow-0 overflow-hidden transition-all duration-700 ease-in-out relative z-30 ${isActive ? 'max-h-[400px] opacity-100 md:mt-4' : 'max-h-0 opacity-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-4'}`}>

                                                {/* Short Description */}
                                                <p className={`text-white/90 font-light text-[12px] md:text-sm leading-snug md:leading-relaxed mb-3 md:mb-5 transition-transform duration-700 delay-100 transform ${isActive ? 'translate-x-0' : '-translate-x-4 md:group-hover:translate-x-0'}`}>
                                                    {service.desc}
                                                </p>

                                                {/* Features List */}
                                                <div className={`mb-3 md:mb-5 flex-grow transition-transform duration-700 delay-150 transform ${isActive ? 'translate-x-0' : '-translate-x-4 md:group-hover:translate-x-0'}`}>
                                                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 md:gap-y-2.5">
                                                        {service.features.map((feat, fidx) => (
                                                            <li key={fidx} className="flex items-start gap-1.5 md:gap-2">
                                                                <div className="mt-0.5 md:mt-1 flex-shrink-0 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                                                                    <Check size={8} className="text-luxury-lightGold md:w-[9px]" strokeWidth={3} />
                                                                </div>
                                                                <span className="text-white/90 text-[10px] md:text-xs font-light drop-shadow-sm leading-tight pr-1">{feat}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className={`mt-auto w-full transition-transform duration-700 delay-200 transform ${isActive ? 'translate-y-0' : 'translate-y-4 md:group-hover:translate-y-0'}`}>
                                                    <Link
                                                        to="/booking"
                                                        state={{ service: service.title }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full flex items-center justify-center min-h-[40px] md:min-h-[48px] py-2 md:py-3.5 bg-luxury-gold/10 backdrop-blur-md border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 uppercase tracking-widest text-[11px] md:text-sm font-medium rounded-lg shadow-[0_5px_15px_rgba(201,164,92,0.15)] hover:shadow-[0_5px_20px_rgba(201,164,92,0.3)]"
                                                    >
                                                        Book Consultation
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                )}
            </div>
        </div>
    );
};

export default Services;
