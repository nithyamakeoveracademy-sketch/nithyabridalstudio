import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/nithya.webp';

const LoadingScreen = () => {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 1024 : false
    );

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center pointer-events-none"
        >
            <div className="relative flex flex-col items-center justify-center pointer-events-auto">
                {/* Logo Image Animation (Coin Spin) */}
                <motion.div
                    style={{ perspective: 1000 }} // Add perspective for 3D effect
                    className="mb-6"
                >
                    <motion.img
                        layoutId="main-logo"
                        src={logoImg}
                        alt="Nithya Studio"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            rotateY: [0, 720, 1080],
                        }}
                        transition={{
                            opacity: { duration: 0.5 },
                            rotateY: {
                                duration: 2.2,
                                ease: [0.25, 0.1, 0.25, 1],
                            },
                        }}
                        className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] rounded-full z-50 origin-center"
                        style={{ transformStyle: "preserve-3d" }}
                    />
                </motion.div>

                {/* Text Animation */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: 0.5,
                            ease: [0.25, 1, 0.5, 1], // ease out cubic
                        }}
                        className="text-2xl md:text-4xl font-serif text-[#D4AF37] tracking-widest uppercase text-center drop-shadow-md"
                    >
                        Nithya Studio
                    </motion.h1>
                </div>
                <div className="overflow-hidden mt-2">
                    <motion.h2
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: 0.8,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                        className="text-sm md:text-lg font-light text-white/70 tracking-[0.3em] uppercase text-center"
                    >
                        & Academy
                    </motion.h2>
                </div>

                {/* Loading Line */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "150px", opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        delay: 1.2,
                        ease: "easeInOut"
                    }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-8"
                />
            </div>

            {/* Subtle background glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none"
            />
        </motion.div>
    );
};

export default LoadingScreen;
