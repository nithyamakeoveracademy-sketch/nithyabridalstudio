import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animations.jsx';
import { Award, CheckCircle2, Sparkles, BookOpen, Users, Clock, Briefcase, GraduationCap, ArrowRight, Quote, Star, ChevronLeft, ChevronRight, X, Crown } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

import heroBg from '../assets/hero3.webp';
import course1 from '../assets/hero1.webp';
import course2 from '../assets/hero4.webp';
import course3 from '../assets/hero2.webp';
import academyImg from '../assets/Academy.webp';

// Swiper component imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Academy = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [studentWorks, setStudentWorks] = useState([]);
    const [graduationImages, setGraduationImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await supabase.from('academy_images').select('*').order('created_at', { ascending: false });
            if (!error && data) {
                setStudentWorks(data.filter(item => item.category === 'Transformation').map(item => item.src));
                setGraduationImages(data.filter(item => item.category === 'Graduation').map(item => ({ img: item.src, name: item.name || 'Graduate' })));
            }
        };
        fetchImages();
    }, []);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = () => setLightboxIndex((prev) => (prev + 1) % graduationImages.length);
    const prevImage = () => setLightboxIndex((prev) => (prev - 1 + graduationImages.length) % graduationImages.length);

    const reasons = [
        { icon: <Award size={24} />, title: "Expert Trainers", desc: "Learn directly from Nithya and industry-leading professionals." },
        { icon: <Briefcase size={24} />, title: "Hands-on Training", desc: "Practical, real-world experience over pure theoretical learning." },
        { icon: <Sparkles size={24} />, title: "Premium Products", desc: "Train using high-end international vanity brands." },
        { icon: <Users size={24} />, title: "Live Model Practice", desc: "Execute complete looks on real diverse models." },
        { icon: <GraduationCap size={24} />, title: "Certification", desc: "Receive an industry-recognized professional certificate upon completion." },
        { icon: <ArrowRight size={24} />, title: "Career Guidance", desc: "Business, marketing, and client-handling support post-course." }
    ];

    const academyCourses = [
        { img: course1, title: "Professional Makeup Course", desc: "A comprehensive masterclass covering everything from basics to advanced bridal artistry in 40 days." },
        { img: course2, title: "Makeup + Beautician Course", desc: "The ultimate 70-day master program covering both luxury bridal makeup and advanced beautician treatments." }
    ];

    const skills = [
        "Professional Skin Preparation",
        "Perfect Foundation & Concealing",
        "Advanced Eye Makeup (Cut Crease, Smokey)",
        "Traditional & Modern Bridal Looks",
        "Advanced Hair Styling & Draping",
        "Client Handling & Consultation",
        "Social Media & Portfolio Building",
        "Product & Vanity Knowledge"
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-[#f5f5f5] overflow-hidden">

            {/* 1. Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-6">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
                    <img src={heroBg} alt="Academy Hero" className="w-full h-full object-cover object-top opacity-50" />
                </div>
                <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-luxury-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-medium"
                    >
                        Nithya Studio & Academy
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-[40px] md:text-[60px] lg:text-[76px] font-serif leading-[1.1] mb-6 drop-shadow-2xl text-white"
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
                    >
                        Master the Art of <span className="text-luxury-gold italic">Beauty</span>
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-2xl text-luxury-gold font-light tracking-wide mb-6"
                    >
                        Transform your passion into a professional career
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-[#cccccc] text-base md:text-lg max-w-2xl font-light leading-relaxed mb-10"
                    >
                        Learn premium makeup techniques from industry experts in a luxury training environment.
                    </motion.p>
                    <StaggerContainer delay={0.6} className="flex flex-col sm:flex-row gap-5 w-full max-w-sm sm:max-w-md justify-center">
                        <StaggerItem className="w-full">
                            <Link to="/contact" className="flex items-center justify-center w-full px-8 py-3.5 bg-luxury-gold text-luxury-black font-medium tracking-[1px] uppercase rounded-sm text-[13px] md:text-[14px] transition-all duration-300 hover:bg-[#b08d2c] shadow-[0_4px_20px_rgba(212,175,55,0.4)]">
                                Join Academy
                            </Link>
                        </StaggerItem>
                        <StaggerItem className="w-full">
                            <Link to="/course-details" className="flex items-center justify-center w-full px-8 py-3.5 border border-luxury-gold text-[#f5f5f5] font-medium tracking-[1px] uppercase rounded-sm text-[13px] md:text-[14px] hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300">
                                View Courses
                            </Link>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* 2. About the Academy */}
            <section className="py-24 px-6 relative">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <FadeIn direction="up" className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Where Passion Meets <span className="text-luxury-gold italic">Perfection</span></h2>
                            <div className="w-16 h-[1px] bg-luxury-gold mb-8"></div>
                            <p className="text-lg md:text-xl text-[#cccccc] font-light leading-relaxed mb-6">
                                At Nithya Academy, we don't just teach makeup; we cultivate artists. Our curriculum is deeply focused on intensive hands-on training, providing absolute real-world experience, and driving aggressive professional growth to ensure our students graduate ready to dominate the luxury bridal industry.
                            </p>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.2} className="lg:w-1/2">
                            <div className="border border-luxury-gold/20 p-2 rounded-sm bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group">
                                <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none"></div>
                                <img src={academyImg} alt="Academy Students with Certificates" className="w-full h-auto max-h-[500px] object-cover rounded-sm filter brightness-90 group-hover:brightness-100 transition-all duration-500" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. Why Choose Us */}
            <section className="py-24 px-6 bg-[#0a0a0a]">
                <div className="container mx-auto max-w-6xl">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-4 block">The Nithya Advantage</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white">Why Choose <span className="italic text-luxury-gold">Us</span></h2>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reasons.map((reason, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1} direction="up">
                                <div className="bg-[#111111] p-8 rounded-sm border border-luxury-gold/10 hover:border-luxury-gold/40 transition-all duration-500 group">
                                    <div className="w-14 h-14 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                                        {reason.icon}
                                    </div>
                                    <h3 className="text-xl font-serif text-white mb-3">{reason.title}</h3>
                                    <p className="text-[#a0a0a0] font-light text-sm leading-relaxed">{reason.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Courses Section */}
            <section className="py-24 px-6 relative">
                <div className="container mx-auto max-w-6xl">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Professional <span className="text-luxury-gold italic">Courses</span></h2>
                            <p className="text-[#cccccc] font-light">Curated programs tailored to your artistry goals.</p>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {academyCourses.map((course, idx) => (
                            <FadeIn key={idx} delay={idx * 0.15} direction="up">
                                <div className="bg-[#0a0a0a] rounded-sm overflow-hidden border border-luxury-gold/10 group flex flex-col h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-luxury-gold/30 transition-all duration-500">
                                    <div className="h-64 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow text-center">
                                        <h3 className="text-2xl font-serif text-luxury-gold mb-4">{course.title}</h3>
                                        <p className="text-[#999999] text-base font-light leading-relaxed mb-8 flex-grow">{course.desc}</p>
                                        <Link to="/course-details" className="mx-auto px-8 py-3 bg-transparent border border-luxury-gold text-luxury-gold uppercase tracking-widest text-xs font-medium hover:bg-luxury-gold hover:text-luxury-black transition-colors rounded-sm inline-flex items-center gap-2">
                                            Enroll Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Skills Section */}
            <section className="py-24 px-6 bg-[url('../assets/hero1.webp')] bg-fixed bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black/90 md:bg-black/85"></div>
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <FadeIn direction="right">
                                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">What You Will <span className="text-luxury-gold italic">Learn</span></h2>
                                <p className="text-[#cccccc] font-light leading-relaxed mb-8">
                                    Our curriculum leaves no stone unturned. We empower you with a comprehensive toolkit to handle any client requirement flawlessly, from flawless bases to extreme glam.
                                </p>
                                <Link to="/course-details" className="px-8 py-3 border border-luxury-gold text-luxury-gold uppercase tracking-widest text-xs font-medium hover:bg-luxury-gold hover:text-luxury-black transition-colors rounded-sm inline-block">
                                    View Detailed Syllabus
                                </Link>
                            </FadeIn>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {skills.map((skill, idx) => (
                                    <FadeIn key={idx} delay={idx * 0.1} direction="up">
                                        <div className="flex items-start gap-3 bg-[#111111]/80 backdrop-blur-sm p-4 border border-luxury-gold/10 rounded-sm">
                                            <CheckCircle2 size={18} className="text-luxury-gold shrink-0 mt-0.5" />
                                            <span className="text-sm font-light text-[#e0e0e0]">{skill}</span>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Student Work Gallery */}
            <section className="py-24 px-6 bg-[#0a0a0a]">
                <div className="container mx-auto max-w-6xl">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Student <span className="text-luxury-gold italic">Transformations</span></h2>
                            <p className="text-[#cccccc] font-light">Real results from our talented academy graduates.</p>
                        </div>
                    </FadeIn>
                    {studentWorks.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {studentWorks.map((workImg, idx) => (
                                <FadeIn key={idx} delay={idx * 0.1} direction="up">
                                    <div className="aspect-[4/5] overflow-hidden rounded-sm group relative border border-luxury-gold/10">
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                                        <img src={workImg} alt={"Student Work " + idx} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-luxury-gold text-xs tracking-widest uppercase font-medium drop-shadow-md">Look {idx + 1}</span>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-luxury-nude/50 font-light border border-luxury-gold/10 rounded-xl bg-[#080808]">
                            <p>No transformations uploaded yet. Add them in the Admin Panel.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 6.5 Graduation Day Moments */}
            <section className="py-24 px-6 bg-[#050505] relative border-t border-luxury-gold/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Graduation Day <span className="text-luxury-gold italic">Moments</span></h2>
                            <p className="text-[#cccccc] font-light">Celebrating the success of our talented artists</p>
                        </div>
                    </FadeIn>

                    {/* CSS for Linear Continuous Scroll */}
                    <style>
                        {`
                        .grad-slider .swiper-wrapper {
                            transition-timing-function: linear !important;
                        }
                        `}
                    </style>

                    {/* Continuous Auto-scrolling Slider */}
                    <FadeIn direction="up">
                        <div className="relative overflow-hidden py-4 -mx-6 px-6 md:mx-0 md:px-0 group">
                            {/* Soft Gradient Edges */}
                            <div className="absolute top-0 left-0 w-8 md:w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-8 md:w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

                            {graduationImages.length > 0 ? (
                                <Swiper
                                    modules={[Autoplay, Navigation, Pagination]}
                                    spaceBetween={24}
                                    slidesPerView={1.2}
                                    loop={graduationImages.length > 4 ? true : false}
                                    speed={4000}
                                    autoplay={{
                                        delay: 0,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: true,
                                    }}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3.5 },
                                        1280: { slidesPerView: 4.5 },
                                    }}
                                    className="grad-slider w-full cursor-grab active:cursor-grabbing"
                                >
                                    {(graduationImages.length > 4 ? graduationImages.concat(graduationImages) : graduationImages).map((item, idx) => (
                                        <SwiperSlide key={idx} className="h-auto">
                                            <div
                                                className="aspect-[3/4] rounded-lg overflow-hidden relative group/card cursor-pointer border border-luxury-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-luxury-gold/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500"
                                                onClick={() => openLightbox(idx % graduationImages.length)}
                                            >
                                                <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/70 transition-colors duration-500 z-10"></div>
                                                <img src={item.img} alt={`Graduate ${idx}`} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" />

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-y-4 group-hover/card:translate-y-0 p-6 text-center">
                                                    <div className="w-12 h-12 rounded-full border border-luxury-gold/50 flex items-center justify-center text-luxury-gold mb-4 backdrop-blur-sm bg-black/30">
                                                        <Crown size={20} />
                                                    </div>
                                                    <h3 className="text-2xl font-serif text-white mb-2">{item.name}</h3>
                                                    <span className="text-luxury-gold text-[10px] tracking-[0.2em] uppercase font-bold">Certified Makeup Artist</span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="text-center py-12 mb-8 mx-auto w-full text-luxury-nude/50 font-light border border-luxury-gold/10 rounded-xl bg-[#080808]">
                                    <p>No graduation images uploaded yet. Add them in the Admin Panel.</p>
                                </div>
                            )}
                        </div>
                    </FadeIn>

                    <FadeIn direction="up">
                        <div className="text-center mt-12 max-w-2xl mx-auto">
                            <p className="text-luxury-gold text-sm md:text-base font-light tracking-wide italic">
                                "Every artist we train leaves with confidence, certification, and a career-ready mindset."
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-xl touch-none"
                    >
                        <button
                            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-luxury-gold transition-colors z-50 p-2"
                            onClick={() => setLightboxOpen(false)}
                        >
                            <X size={36} />
                        </button>

                        <button
                            className="absolute left-2 lg:left-10 text-white/50 hover:text-luxury-gold transition-colors z-50 p-4"
                            onClick={prevImage}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <div className="relative max-w-5xl max-h-[85vh] w-full px-16 lg:px-24 aspect-[3/4] md:aspect-auto h-full flex flex-col items-center justify-center">
                            <motion.img
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                src={graduationImages[lightboxIndex].img}
                                alt="Graduation Moment"
                                className="max-w-full max-h-[70vh] object-contain rounded-md shadow-2xl ring-1 ring-luxury-gold/20"
                            />
                            <div className="text-center mt-8">
                                <h3 className="text-3xl font-serif text-white mb-2">{graduationImages[lightboxIndex].name}</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <Crown size={14} className="text-luxury-gold" />
                                    <span className="text-luxury-gold text-xs tracking-widest uppercase font-medium">Certified Makeup Artist</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="absolute right-2 lg:right-10 text-white/50 hover:text-luxury-gold transition-colors z-50 p-4"
                            onClick={nextImage}
                        >
                            <ChevronRight size={48} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 7. Testimonials */}
            <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="container mx-auto max-w-5xl relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-10 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 md:mb-4">Academy <span className="text-luxury-gold italic">Voices</span></h2>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <FadeIn delay={0.1} direction="up">
                            <div className="bg-[#0a0a0a] p-6 md:p-10 border border-luxury-gold/10 relative rounded-sm group hover:border-luxury-gold/30 transition-colors">
                                <Quote className="w-8 h-8 md:w-10 md:h-10 text-luxury-gold/20 absolute top-4 left-4 md:top-6 md:left-6" />
                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-3 md:mb-4">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-[12px] md:w-[14px] fill-luxury-gold text-luxury-gold" />)}
                                    </div>
                                    <p className="text-[#cccccc] text-[13px] md:text-base font-light leading-snug md:leading-relaxed italic mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">"The professional makeup course completely changed my career trajectory. The personal attention Nithya gives is unmatched. I secured my first bridal booking within a week of graduating!"</p>
                                    <div>
                                        <span className="block text-white font-serif text-base md:text-lg">Priya S.</span>
                                        <span className="text-luxury-gold text-[10px] md:text-xs tracking-widest uppercase">Certified MUA</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2} direction="up">
                            <div className="bg-[#0a0a0a] p-6 md:p-10 border border-luxury-gold/10 relative rounded-sm group hover:border-luxury-gold/30 transition-colors">
                                <Quote className="w-8 h-8 md:w-10 md:h-10 text-luxury-gold/20 absolute top-4 left-4 md:top-6 md:left-6" />
                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-3 md:mb-4">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-[12px] md:w-[14px] fill-luxury-gold text-luxury-gold" />)}
                                    </div>
                                    <p className="text-[#cccccc] text-[13px] md:text-base font-light leading-snug md:leading-relaxed italic mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">"The absolute best decision I made. The academy uses strictly high-end international vanity products. Handling real live models gave me the extreme confidence I lacked."</p>
                                    <div>
                                        <span className="block text-white font-serif text-base md:text-lg">Anita R.</span>
                                        <span className="text-luxury-gold text-[10px] md:text-xs tracking-widest uppercase">Masterclass Graduate</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section >

            {/* 8. Course Details & 9. Career Support */}
            < section className="py-16 md:py-24 px-4 sm:px-6 bg-[#0a0a0a]" >
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Course Details Info */}
                        <FadeIn direction="right">
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Program <span className="text-luxury-gold italic">Overview</span></h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 pb-6 border-b border-[#222]">
                                    <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold"><Clock size={20} /></div>
                                    <div>
                                        <h4 className="text-sm tracking-widest uppercase text-luxury-gold font-medium mb-1">Duration</h4>
                                        <p className="text-white font-light">40 - 70 Intensive Days</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 pb-6 border-b border-[#222]">
                                    <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold"><Users size={20} /></div>
                                    <div>
                                        <h4 className="text-sm tracking-widest uppercase text-luxury-gold font-medium mb-1">Batch Size</h4>
                                        <p className="text-white font-light">Strictly Limited (1-on-1 focus)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 pb-6 border-b border-[#222]">
                                    <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold"><BookOpen size={20} /></div>
                                    <div>
                                        <h4 className="text-sm tracking-widest uppercase text-luxury-gold font-medium mb-1">Mode of Study</h4>
                                        <p className="text-white font-light">Offline Hands-on Studio Training</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold"><Award size={20} /></div>
                                    <div>
                                        <h4 className="text-sm tracking-widest uppercase text-luxury-gold font-medium mb-1">Credentials</h4>
                                        <p className="text-white font-light">Industry Validated Certification</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Career Support */}
                        <FadeIn direction="left" className="bg-[#111] p-10 md:p-14 rounded-sm border border-luxury-gold/20 flex flex-col justify-center">
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Build Your Career <span className="text-luxury-gold italic">With Us</span></h2>
                            <p className="text-[#a0a0a0] font-light leading-relaxed mb-8">
                                We go far beyond makeup execution. Our academy rigorously preps you for industry dominance. You will learn expert level social media marketing tactics, dynamic client interaction phrasing, establishing booking rates, and structuring high-end bridal consultation strategies to consistently land premium clients.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-[#050505] text-xs text-white uppercase tracking-widest px-4 py-2 border border-[#333]">Marketing</span>
                                <span className="bg-[#050505] text-xs text-white uppercase tracking-widest px-4 py-2 border border-[#333]">Social Media</span>
                                <span className="bg-[#050505] text-xs text-white uppercase tracking-widest px-4 py-2 border border-[#333]">Client Securing</span>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section >

            {/* 10. Final CTA & Urgency */}
            < section className="py-24 px-6 text-center relative overflow-hidden" >
                <div className="absolute inset-0 bg-luxury-gold/5"></div>
                <div className="container mx-auto max-w-3xl relative z-10">
                    <FadeIn direction="up">
                        <span className="text-[#ff4040] text-xs tracking-[0.2em] uppercase font-bold mb-4 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff4040] animate-pulse"></span> Limited seats available for each batch
                        </span>
                        <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">Start Your Journey <span className="text-luxury-gold italic">Today</span></h2>
                        <p className="text-xl text-[#cccccc] font-light mb-10">Take the absolute first step towards a highly lucrative and deeply rewarding luxury career in styling.</p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link to="/contact" className="px-10 py-4 bg-luxury-gold text-luxury-black font-medium tracking-[1px] uppercase rounded-sm text-[13px] md:text-[14px] hover:bg-white transition-all duration-300 shadow-xl">
                                Join Now
                            </Link>
                            <Link to="/contact" className="px-10 py-4 border border-luxury-gold text-luxury-gold font-medium tracking-[1px] uppercase rounded-sm text-[13px] md:text-[14px] hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300">
                                Contact Us
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section >

        </div >
    );
};

export default Academy;
