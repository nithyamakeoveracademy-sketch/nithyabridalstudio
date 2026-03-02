import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Shield, Check, X, ArrowLeftRight, Maximize2, Loader2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animations.jsx';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import { supabase } from '../lib/supabaseClient';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';
import nithyaprofile from '../assets/nithyaprofile.jpeg';
import BridalImg from '../assets/Bridal.webp';
import EngagementImg from '../assets/Engagement.webp';
import partlookImg from '../assets/partlook.webp';
import before1 from '../assets/before1.webp';
import after1 from '../assets/after1.webp';
import before2 from '../assets/before2.webp';
import after2 from '../assets/after2.webp';
import before3 from '../assets/before3.webp';
import after3 from '../assets/after3.webp';
import before4 from '../assets/before4.webp';
import after4 from '../assets/after4.webp';
import academyImg from '../assets/academy.webp';

const heroImages = [hero1, hero2, hero3, hero4];

const LazyYoutube = ({ videoId }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "200px 0px 0px 0px" });

    return (
        <div ref={ref} className="w-full h-full object-cover rounded-2xl bg-[#080808]">
            {isInView ? (
                <iframe
                    className="w-full h-full object-cover rounded-2xl bg-black animate-[fadeIn_1s_ease-out]"
                    src={`https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    {/* Placeholder pulse while waiting for scroll intersection */}
                    <div className="w-12 h-12 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

const testimonials = [
    { text: "Absolutely stunning work! The team made me feel like an absolute queen on my wedding day. The makeup lasted all night and looked flawless in photos.", author: "Sarah J.", rating: 5 },
    { text: "Taking the Professional Masterclass was the best investment for my career. The detail and luxury standard taught here is simply unparalleled.", author: "Priya P.", rating: 5 },
    { text: "I booked them for my engagement and wedding. The transition between the looks was perfectly managed, and the gold accents used in my eye makeup were just divine. I felt so confident.", author: "Ananya M.", rating: 5 },
    { text: "Their academy doesn't just teach you how to apply makeup; it teaches you how to present yourself as a premium artist. The skin-safe techniques and product knowledge were a game changer.", author: "Kavya R.", rating: 5 }
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [sliderImages, setSliderImages] = useState({
        b: before1,
        a: after1
    });
    const [videos, setVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase.from('videos').select('video_id').order('created_at', { ascending: false }).limit(3);
            if (!error && data) {
                setVideos(data.map(v => v.video_id));
            } else {
                // Fallback to defaults if no table or error
                setVideos(["OTWSRZ_oFtU", "gm0un88VqSQ", "REPq_BQiDh4"]);
            }
            setLoadingVideos(false);
        };
        fetchVideos();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
                {/* Render all images and fade between them to prevent flashing */}
                {heroImages.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={src}
                            alt={`Top Rated Bridal Makeup Artist in Salem - Wedding Beauty Style ${index + 1}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                ))}

                {/* Fixed Dark Overlay for better readability */}
                <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>

                <div className="relative z-20 w-full px-6 flex flex-col items-center justify-center max-w-[700px] mx-auto pt-10 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col items-center w-full text-center mb-6 md:mb-8"
                    >
                        <span className="text-luxury-gold text-[12px] md:text-[14px] uppercase tracking-[4px] font-medium mb-3 md:mb-4 drop-shadow-md">
                            Best Bridal Makeup Artist in Salem, Tamil Nadu
                        </span>

                        <h1
                            className="text-white font-serif font-normal leading-[1.1] md:leading-[1.2] text-[40px] md:text-[56px] lg:text-[72px] w-full"
                            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                        >
                            Elevating Beauty, <br className="hidden sm:block" /> Empowering Artists
                        </h1>
                    </motion.div>

                    <StaggerContainer delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-[450px] justify-center mx-auto">
                        <StaggerItem className="w-full">
                            <Link to="/booking" className="flex items-center justify-center w-full px-4 py-2.5 md:py-3 bg-luxury-gold text-luxury-black font-medium tracking-[1px] uppercase rounded-md lg:rounded-lg text-[12px] md:text-[13px] transition-all duration-300 hover:bg-[#b08d2c] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.4)]">
                                Begin Your Journey
                            </Link>
                        </StaggerItem>
                        <StaggerItem className="w-full">
                            <Link to="/academy" className="flex items-center justify-center w-full px-4 py-2.5 md:py-3 border border-luxury-gold bg-transparent text-luxury-gold hover:text-luxury-black font-medium tracking-[1px] uppercase rounded-md lg:rounded-lg text-[12px] md:text-[13px] hover:bg-luxury-gold transition-all duration-300" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                Become Artist
                            </Link>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* About the Artist */}
            <section className="py-12 md:py-20 lg:py-28 bg-luxury-black relative overflow-hidden px-4 sm:px-6">
                {/* Subtle gradient background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">

                        {/* Image Column */}
                        <FadeIn direction="up" className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                            <div className="relative group w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px]">
                                {/* Decorative Border */}
                                <div className="absolute inset-0 border border-luxury-gold/40 rounded-t-full rounded-b-[24px] md:rounded-b-[32px] transform translate-x-2 md:translate-x-3 translate-y-2 md:translate-y-3 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                <div className="relative rounded-t-full rounded-b-[24px] md:rounded-b-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] md:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-shadow duration-700 bg-[#080808] border border-luxury-gold/10">
                                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                                    <img
                                        src={nithyaprofile}
                                        alt="Famous Bridal Makeup Artist in Salem Tamil Nadu"
                                        className="w-full h-[320px] sm:h-[480px] lg:h-[560px] object-cover object-[center_15%] transform transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </FadeIn>

                        {/* Text Column */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:items-start text-center lg:text-left">
                            <FadeIn delay={0.2} direction="up" className="w-full">
                                <span className="text-luxury-gold text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 md:mb-4 block font-medium">Top Rated Beauty Services Near Me in Salem</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif mb-3 md:mb-6 text-luxury-nude leading-[1.15] md:leading-[1.2]">
                                    Experienced Makeup Artist in Salem & <br className="hidden lg:block" /> <span className="text-luxury-gold italic">World Record Holder</span>
                                </h2>

                                <p className="text-luxury-nude/90 text-base md:text-lg lg:text-xl font-light mb-3 md:mb-6 italic border-l-2 border-luxury-gold pl-3 md:pl-4 sm:mx-auto max-w-lg lg:max-w-none lg:mx-0 leading-snug">
                                    "Crafting flawless bridal makeup with precision, passion, and global recognition. Your trusted makeup artist in Salem."
                                </p>

                                <p className="text-luxury-nude/70 text-[13px] md:text-base leading-snug md:leading-relaxed font-light mb-6 md:mb-10 max-w-lg sm:mx-auto lg:mx-0">
                                    Recognized as a <span className="text-luxury-gold">World Record Holder</span> in Professional Makeup Artistry. We offer premium, high-definition, and waterproof bridal makeup directly at your doorstep anywhere in Salem, Tamil Nadu, ensuring every bride radiates timeless beauty.
                                </p>

                                {/* Badges */}
                                <div className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-row sm:flex-wrap justify-center lg:justify-start sm:gap-4 mb-6 md:mb-10 w-full max-w-[280px] mx-auto sm:max-w-none">
                                    <div className="flex items-center gap-2.5 sm:gap-3 bg-[#0a0a0a] border border-luxury-gold/20 px-3 py-2 sm:px-4 sm:py-3 min-w-0 sm:min-w-[200px] justify-center lg:justify-start">
                                        <Award className="text-luxury-gold w-[14px] sm:w-[18px]" />
                                        <span className="text-luxury-nude/80 text-[10px] sm:text-[11px] tracking-widest uppercase font-medium">World Record Holder</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 sm:gap-3 bg-[#0a0a0a] border border-luxury-gold/20 px-3 py-2 sm:px-4 sm:py-3 min-w-0 sm:min-w-[200px] justify-center lg:justify-start">
                                        <Star className="text-luxury-gold w-[14px] sm:w-[18px]" />
                                        <span className="text-luxury-nude/80 text-[10px] sm:text-[11px] tracking-widest uppercase font-medium">Certified Professional</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 sm:gap-3 bg-[#0a0a0a] border border-luxury-gold/20 px-3 py-2 sm:px-4 sm:py-3 min-w-0 sm:min-w-[200px] justify-center lg:justify-start">
                                        <Shield className="text-luxury-gold w-[14px] sm:w-[18px]" />
                                        <span className="text-luxury-nude/80 text-[10px] sm:text-[11px] tracking-widest uppercase font-medium">Premium Skin-Safe</span>
                                    </div>
                                </div>

                                <Link to="/about" className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-luxury-gold text-luxury-black uppercase tracking-widest text-xs md:text-[13px] font-medium hover:bg-luxury-lightGold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(201,164,92,0.2)]">
                                    Meet The Artist
                                </Link>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-20 lg:py-28 bg-[#050505] px-4 sm:px-6 border-t border-luxury-gold/10">
                <div className="container mx-auto max-w-6xl">
                    <FadeIn direction="up">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-16">
                            <div>
                                <span className="text-luxury-gold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 block">What We Offer</span>
                                <h2 className="text-4xl sm:text-5xl font-serif text-luxury-nude">Signature <span className="text-luxury-gold italic">Services</span></h2>
                            </div>
                            <Link to="/services" className="text-luxury-gold flex items-center gap-2 hover:text-luxury-lightGold uppercase text-[11px] sm:text-sm tracking-widest transition-colors mt-6 md:mt-0 group pb-1.5 border-b border-luxury-gold hover:border-luxury-lightGold">
                                View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                title: "Bridal Makeup in Salem",
                                img: BridalImg,
                                desc: "Experience unparalleled luxury with our custom HD skin finish makeup tailored to enhance your natural beauty. Look flawless for your wedding in Salem.",
                                price: "₹15,000"
                            },
                            {
                                title: "Engagement Makeup",
                                img: EngagementImg,
                                desc: "Radiate elegance on your special day with our long-lasting, photo-ready engagement makeup services in Salem, tailored for your premium events.",
                                price: "₹10,000"
                            },
                            {
                                title: "Party & Reception Makeup",
                                img: partlookImg,
                                desc: "Stand out at any event with our signature party glam. Book the best makeup artist for functions and receptions in Salem.",
                                price: "₹5,000"
                            }
                        ].map((service, idx) => (
                            <StaggerItem key={idx}>
                                <div className="group relative overflow-hidden bg-[#080808] border border-luxury-gold/15 rounded-[20px] transition-all duration-500 hover:border-luxury-gold/40 shadow-xl flex flex-col md:block md:h-[380px] lg:h-[420px]">

                                    {/* Image (Top on mobile, Background on desktop) */}
                                    <div className="w-full aspect-video md:aspect-auto md:absolute md:inset-0 md:h-full overflow-hidden">
                                        <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-[1.5s] md:group-hover:scale-105" />
                                        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent"></div>
                                    </div>

                                    {/* Content (Below image on mobile, Overlaid on desktop) */}
                                    <div className="p-6 md:p-8 flex flex-col justify-between flex-grow md:absolute md:inset-0 md:z-10 md:justify-end">
                                        <div className="md:transform md:translate-y-[85px] md:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col h-full md:h-auto">

                                            <div className="hidden md:block w-8 h-[1px] bg-luxury-gold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>

                                            <h3 className="text-2xl font-serif text-luxury-gold md:text-luxury-nude md:group-hover:text-luxury-gold transition-colors duration-300">
                                                {service.title}
                                            </h3>

                                            <div className="md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 mt-3 md:mt-4 flex flex-col justify-between flex-grow md:flex-grow-0">
                                                <p className="text-luxury-nude/80 text-sm font-light leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 md:mb-6">
                                                    {service.desc}
                                                </p>

                                                <div className="flex justify-end items-center w-full mt-auto md:mt-0">
                                                    <Link to="/booking" className="text-[11px] uppercase tracking-widest text-luxury-gold hover:text-luxury-lightGold flex items-center gap-1.5 group/btn">
                                                        Book <span className="hidden sm:inline">Session</span> <ArrowRight size={13} className="transform group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section >

            {/* Academy Section */}
            < section className="py-16 lg:py-28 bg-[#050505] relative overflow-hidden px-4 sm:px-6" >
                {/* Decorative background glow for mobile */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.1)_0%,transparent_60%)] pointer-events-none lg:hidden"></div>

                <div className="container mx-auto max-w-6xl relative z-10">

                    {/* Mobile-Only Header Area */}
                    <div className="lg:hidden flex flex-col items-center text-center mb-10 relative z-20">
                        <FadeIn direction="up">
                            {/* Premium Badge */}
                            <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1a150b] via-[#2a2215] to-[#1a150b] border border-luxury-gold/30 shadow-[0_5px_15px_rgba(201,164,92,0.15)]">
                                <Award size={14} className="text-luxury-gold" />
                                <span className="text-luxury-gold text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium">Top Rated Course in Salem</span>
                            </div>

                            {/* Short Heading */}
                            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4 drop-shadow-md px-2">
                                Professional Makeup Training in <span className="text-luxury-gold italic">Salem</span>
                            </h2>

                            {/* Star Rating Strip */}
                            <div className="flex flex-col items-center justify-center gap-4 w-full">
                                <div className="flex items-center gap-2 sm:gap-3 bg-black/40 px-4 py-2 rounded-full border border-luxury-gold/10 backdrop-blur-sm shadow-sm">
                                    <div className="flex text-luxury-gold">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                    </div>
                                    <span className="text-luxury-nude/70 text-[10px] sm:text-xs tracking-wider uppercase font-medium border-l border-luxury-gold/30 pl-2 sm:pl-3">4.9/5 Average</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-16 bg-[#080808] lg:bg-transparent rounded-3xl lg:rounded-none border border-luxury-gold/10 lg:border-none shadow-2xl lg:shadow-none overflow-hidden lg:overflow-visible relative">
                        {/* Overlapping Decorative Border on Card for Mobile */}
                        <div className="absolute inset-0 border border-luxury-gold/20 rounded-3xl pointer-events-none lg:hidden z-20 mix-blend-overlay"></div>

                        {/* Text Column (Left on desktop, Bottom on mobile) */}
                        <div className="w-full lg:w-1/2 flex flex-col items-start text-left order-2 lg:order-1 p-5 md:p-6 sm:p-8 lg:p-0">
                            <FadeIn direction="up" className="w-full">
                                {/* Desktop-only Heading */}
                                <div className="hidden lg:block">
                                    <span className="text-luxury-gold text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.3em] uppercase mb-3 lg:mb-4 block font-medium">Best Makeup Academy Near Me Salem</span>
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4 lg:mb-6 text-luxury-nude leading-[1.2]">
                                        Professional Makeup <span className="text-luxury-gold italic">Training</span> <br className="hidden lg:block" /> in Salem
                                    </h2>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-5 lg:mb-6 lg:mt-0">
                                    <span className="bg-luxury-gold/10 border border-luxury-gold/20 px-2 md:px-3 py-1 md:py-1.5 rounded text-luxury-gold text-[9px] md:text-[10px] sm:text-xs tracking-wider uppercase font-medium">Beauty Institute</span>
                                    <span className="text-luxury-nude/70 text-[10px] md:text-xs sm:text-sm font-light">Duration: 4 Weeks</span>
                                    <span className="text-luxury-gold/30 text-[10px] md:text-sm block">•</span>
                                    <span className="text-luxury-nude/70 text-[10px] md:text-xs sm:text-sm font-light">Premium Certification</span>
                                </div>

                                <p className="text-luxury-nude/90 text-sm md:text-[15px] lg:text-xl font-light mb-3 md:mb-4 lg:mb-6 leading-snug md:leading-normal">
                                    Learn from a World Record Holding Artist and enroll in our makeup artist diploma course in Salem.
                                </p>

                                <p className="text-luxury-nude/70 text-[13px] md:text-sm lg:text-base leading-snug lg:leading-relaxed font-light mb-5 md:mb-6 lg:mb-8 max-w-lg">
                                    Our beauty training institute in Salem offers hands-on training, global industry techniques, and personalized guidance to help you build a successful career as a <span className="text-luxury-gold">certified beautician</span>.
                                </p>

                                {/* Benefits List */}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4 mb-6 md:mb-8 lg:mb-10 w-full max-w-lg">
                                    {[
                                        "Certified Training",
                                        "Hands-On Practice",
                                        "Industry Techniques",
                                        "Career Guidance"
                                    ].map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-2 md:gap-3 justify-start">
                                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="text-luxury-gold w-[10px] md:w-[12px]" strokeWidth={3} />
                                            </div>
                                            <span className="text-luxury-nude/80 text-[11px] md:text-xs sm:text-sm font-light tracking-wide leading-tight">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/academy" className="inline-flex items-center justify-center w-full sm:w-auto px-6 md:px-8 lg:px-10 py-3 md:py-3.5 lg:py-4 bg-transparent border border-luxury-gold text-luxury-gold uppercase tracking-widest text-[11px] md:text-xs lg:text-[13px] font-medium hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 transform hover:-translate-y-1">
                                    Course Details
                                </Link>
                            </FadeIn>
                        </div>

                        {/* Image Column (Right on desktop, Top on mobile) */}
                        <FadeIn delay={0.2} direction="up" className="w-full lg:w-1/2 order-1 lg:order-2">
                            <div className="relative group max-w-none w-full">
                                {/* Decorative Border (Desktop only) */}
                                <div className="hidden lg:block absolute inset-0 border border-luxury-gold/20 rounded-2xl transform -translate-x-4 -translate-y-4 transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl lg:bg-[#080808]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 via-transparent to-transparent z-10 pointer-events-none"></div>
                                    <img
                                        src={academyImg}
                                        alt="Professional Makeup Masterclass"
                                        className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </FadeIn>

                    </div>
                </div>
            </section >

            {/* Transformations Section */}
            <section className="py-24 lg:py-32 bg-[#050505] relative overflow-hidden px-6 border-t border-luxury-gold/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.05)_0%,transparent_50%)] pointer-events-none"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <FadeIn direction="up">
                            <span className="text-luxury-gold text-xs sm:text-sm tracking-[0.2em] font-medium uppercase mb-4 block">Proven Results</span>
                            <h2 className="text-4xl sm:text-5xl font-serif text-luxury-nude mb-6">Salem Bridal <span className="text-luxury-gold italic pr-2">Transformations</span></h2>
                            <div className="w-12 h-[1px] bg-luxury-gold mx-auto mb-6"></div>
                            <p className="text-luxury-nude/70 font-light text-base md:text-lg leading-relaxed px-4">
                                Experience the power of our premium bridal makeover studio in Salem. We enhance natural features to reveal the most breathtaking version of you.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Main Interaction Slider Area (Grid: Image Left, Text Right) */}
                    <FadeIn direction="up" delay={0.2} className="mb-20 max-w-5xl lg:max-w-6xl mx-auto">
                        <div id="main-slider" className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-6 sm:p-8 lg:p-10 bg-[#080808] rounded-3xl border border-luxury-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            {/* Before/After Image Container (Square) */}
                            <div className="w-full lg:w-1/2 shrink-0">
                                <div className="relative group rounded-2xl overflow-hidden p-1 bg-[#111] border border-luxury-gold/20 shadow-[0_10px_30px_rgba(201,164,92,0.1)] aspect-square">
                                    <BeforeAfterSlider
                                        beforeImage={sliderImages.b}
                                        afterImage={sliderImages.a}
                                    />
                                </div>
                            </div>

                            {/* Text Area */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                                <span className="text-luxury-gold text-xs tracking-[0.2em] font-medium uppercase mb-3 block">The Process</span>
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-5">Witness The <span className="text-luxury-gold italic">Difference</span></h3>
                                <p className="text-luxury-nude/70 font-light text-base md:text-lg leading-relaxed mb-8">
                                    Swipe across the image to see our makeup artistry in action. We believe in enhancing your natural beauty, seamlessly smoothing imperfections, and creating a flawless, premium glow that looks stunning both in person and on camera.
                                </p>
                                <div className="grid grid-cols-2 gap-4 border-t border-luxury-gold/10 pt-6">
                                    <div className="text-left border-l-2 border-luxury-gold/30 pl-4">
                                        <span className="block text-luxury-gold font-serif text-xl mb-1">Correction</span>
                                        <span className="text-luxury-nude/60 text-xs font-light tracking-wide uppercase">Flawless evening</span>
                                    </div>
                                    <div className="text-left border-l-2 border-luxury-gold/30 pl-4">
                                        <span className="block text-luxury-gold font-serif text-xl mb-1">Enhancement</span>
                                        <span className="text-luxury-nude/60 text-xs font-light tracking-wide uppercase">Highlighting beauty</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Grid of Smaller Transformations */}
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                b: before2,
                                a: after2,
                                title: "Reception Glam"
                            },
                            {
                                b: before3,
                                a: after3,
                                title: "Haldi Glowing Look"
                            },
                            {
                                b: before4,
                                a: after4,
                                title: "South Indian Bridal"
                            }
                        ].map((item, idx) => (
                            <StaggerItem key={idx}>
                                <div
                                    className="group relative h-72 sm:h-80 md:h-[350px] rounded-xl overflow-hidden shadow-lg border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-500 hover:shadow-[0_15px_30px_rgba(201,164,92,0.15)] cursor-pointer"
                                    onClick={() => {
                                        setSliderImages({ b: item.b, a: item.a });
                                        document.getElementById('main-slider')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }}
                                >
                                    {/* Default: Before State */}
                                    <div className="absolute inset-0 transition-opacity duration-700 z-10 opacity-100 group-hover:opacity-0 pointer-events-none">
                                        <img src={item.b} alt="Before" className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505]/90 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-luxury-black/70 backdrop-blur-sm border border-luxury-gold/20 tracking-widest uppercase text-[10px] text-white px-3 py-1 rounded shadow-md">Before</span>
                                        </div>
                                    </div>

                                    {/* Hover: After State */}
                                    <div className="absolute inset-0 transition-opacity duration-700 z-20 opacity-0 group-hover:opacity-100 pointer-events-none">
                                        <img src={item.a} alt="After" className="w-full h-full object-cover transform transition-transform duration-1000 scale-110 group-hover:scale-100" loading="lazy" />
                                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505]/90 via-[#050505]/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-luxury-gold/90 backdrop-blur-sm tracking-widest uppercase text-[10px] text-luxury-black font-bold px-3 py-1 rounded shadow-[0_5px_15px_rgba(201,164,92,0.3)]">After</span>
                                        </div>
                                        <div className="absolute bottom-4 right-4 text-center">
                                            <h4 className="text-luxury-gold text-lg font-serif drop-shadow-md">{item.title}</h4>
                                        </div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-luxury-gold flex items-center justify-center text-luxury-gold shadow-xl">
                                                <Maximize2 size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <div className="text-center mt-12 mb-8">
                        <Link to="/portfolio" className="inline-flex items-center text-luxury-gold hover:text-luxury-lightGold transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-luxury-gold pb-1 px-2 group">
                            View Full Portfolio <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* Video Showcase Section */}
            <section className="py-24 lg:py-32 bg-luxury-black relative overflow-hidden px-6 border-t border-luxury-gold/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.05)_0%,transparent_50%)] pointer-events-none"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <FadeIn direction="up">
                            <span className="text-luxury-gold text-xs sm:text-sm tracking-[0.2em] font-medium uppercase mb-4 block">Our Work</span>
                            <h2 className="text-4xl sm:text-5xl font-serif text-luxury-nude mb-6">Salem Wedding <span className="text-luxury-gold italic pr-2">Showcase</span></h2>
                            <div className="w-12 h-[1px] bg-luxury-gold mx-auto mb-6"></div>
                            <p className="text-luxury-nude/70 font-light text-base md:text-lg leading-relaxed px-4">
                                Watch the magic unfold. See real-time transformations and behind-the-scenes moments captured in motion by the best salon for bridal makeup in Salem.
                            </p>
                        </FadeIn>
                    </div>

                    <FadeIn direction="up" delay={0.2} className="w-full">
                        {loadingVideos ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
                            </div>
                        ) : videos.length > 0 ? (
                            <div className="flex overflow-x-auto pb-10 -mx-6 px-6 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory justify-start md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {videos.map((videoId, idx) => (
                                    <div key={idx} className="snap-center shrink-0 w-[260px] sm:w-[300px] lg:w-[340px] aspect-[9/16] rounded-2xl overflow-hidden border border-luxury-gold/30 bg-[#050505] shadow-[0_10px_30px_rgba(201,164,92,0.15)] transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(201,164,92,0.3)] relative group">
                                        <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/10 transition-colors duration-500 pointer-events-none z-10"></div>
                                        <LazyYoutube videoId={videoId} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-luxury-nude/50 italic py-10 border border-luxury-gold/10 rounded-2xl">
                                Showcase videos coming soon.
                            </div>
                        )}
                    </FadeIn>
                </div>
            </section>

            {/* Testimonials Carousel */}
            < section className="py-16 md:py-32 bg-luxury-black text-center border-t border-luxury-gold/10 overflow-hidden relative" >
                <div className="container mx-auto max-w-5xl mb-10 md:mb-16 relative z-10 px-4 sm:px-6">
                    <FadeIn direction="up">
                        <span className="text-luxury-gold text-[10px] md:text-sm tracking-[0.2em] uppercase mb-2 md:mb-4 block">Words of Praise</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-luxury-nude">Client <span className="text-luxury-gold italic">Experiences</span></h2>
                    </FadeIn>
                </div>

                {/* Infinite Scroll Container */}
                <div className="relative w-full overflow-hidden flex z-10 pt-4 md:pt-8 pb-10 md:pb-16 -mt-4 md:-mt-8">
                    {/* The scrolling track */}
                    <div className="flex w-max animate-scroll gap-4 md:gap-6 sm:gap-8 hover:!play-state-paused px-4 sm:px-8">
                        {duplicatedTestimonials.map((test, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedTestimonial(test)}
                                style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
                                className="w-[280px] md:w-[320px] sm:w-[450px] flex-shrink-0 cursor-pointer relative overflow-hidden ring-1 ring-inset ring-luxury-gold/20 hover:ring-luxury-gold/60 p-6 md:p-8 sm:p-12 bg-[#080808] transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(201,164,92,0.15)] rounded-tl-[20px] md:rounded-tl-3xl rounded-br-[20px] md:rounded-br-3xl text-left"
                            >
                                <span className="absolute top-2 md:top-4 left-4 md:left-6 text-4xl md:text-6xl font-serif text-luxury-gold/10 group-hover:text-luxury-gold/20 transition-colors duration-500">"</span>
                                <div className="flex justify-start gap-1 mb-4 md:mb-6 text-luxury-gold relative z-10 text-shadow-gold">
                                    {[...Array(test.rating)].map((_, idx) => <Star key={idx} className="w-[12px] md:w-[14px]" fill="currentColor" />)}
                                </div>
                                <p className="text-luxury-nude/80 font-light italic mb-6 md:mb-8 text-[13px] md:text-base leading-snug md:leading-relaxed relative z-10 line-clamp-3 md:line-clamp-4">
                                    "{test.text}"
                                </p>
                                <div className="w-8 md:w-12 h-[1px] bg-luxury-gold/30 mb-3 md:mb-4 group-hover:w-16 md:group-hover:w-24 transition-all duration-500"></div>
                                <div className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-luxury-gold font-medium">
                                    {test.author}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>      `   `
            </section >

            {/* Testimonial Modal Popup */}
            < AnimatePresence >
                {selectedTestimonial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                    >
                        {/* Dim Overlay */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer z-0"
                            onClick={() => setSelectedTestimonial(null)}
                        ></div>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 w-full max-w-xl bg-[#080808] border border-luxury-gold/30 p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-tl-[40px] rounded-br-[40px] overflow-hidden"
                        >
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/10 blur-[80px] rounded-full pointer-events-none"></div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedTestimonial(null)}
                                className="absolute top-6 right-6 text-luxury-nude/50 hover:text-luxury-gold transition-colors duration-300 z-20"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative z-10 text-center">
                                <span className="text-8xl font-serif text-luxury-gold/15 absolute -top-8 -left-4 pointer-events-none">"</span>

                                <div className="flex justify-center gap-1 mb-8 text-luxury-gold text-shadow-gold text-left">
                                    {[...Array(selectedTestimonial.rating)].map((_, idx) => <Star key={idx} size={18} fill="currentColor" />)}
                                </div>

                                <p className="text-luxury-nude text-base sm:text-lg lg:text-xl font-light italic mb-10 leading-relaxed text-center">
                                    "{selectedTestimonial.text}"
                                </p>

                                <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mb-6"></div>
                                <div className="uppercase tracking-[0.2em] text-sm text-luxury-gold font-medium">
                                    {selectedTestimonial.author}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >

            {/* Call To Action */}
            < section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-6" >
                {/* Background Image */}
                < div className="absolute inset-0 z-0" >
                    <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop"
                        alt="Ready to Shine CTA"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Dark Overlay using linear-gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10"></div>
                </div >

                {/* Content */}
                < div className="relative z-20 text-center max-w-3xl mx-auto flex flex-col items-center" >
                    <FadeIn direction="up">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-nude mb-6 leading-tight">
                            Ready to <span className="text-luxury-gold italic">Shine?</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up">
                        <p className="text-white/90 text-sm md:text-base lg:text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
                            Book your consultation today and let us bring your dream look to life. Slots fill up fast for the wedding season.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="up">
                        <Link to="/booking" className="inline-flex items-center justify-center px-10 py-4 bg-luxury-gold text-luxury-black uppercase tracking-widest text-[13px] font-medium hover:bg-luxury-lightGold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(201,164,92,0.2)]">
                            Book Appointment
                        </Link>
                    </FadeIn>
                </div >
            </section >
        </>
    );
};

export default Home;
