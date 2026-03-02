import React, { useState, useEffect } from 'react';
import { FadeIn } from '../components/Animations.jsx';
import { supabase } from '../lib/supabaseClient';
import heroImage from '../assets/hero3.webp';

const Portfolio = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('All');
    const [activeMobileItem, setActiveMobileItem] = useState(null);
    const categories = ['All', 'Bridal', 'Reception', 'Portrait'];

    useEffect(() => {
        const fetchPortfolio = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
            if (!error && data) {
                setPortfolioItems(data);
            }
            setLoading(false);
        };
        fetchPortfolio();
    }, []);

    const filteredItems = activeTab === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeTab);

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-110px)] flex items-center justify-center overflow-hidden w-full">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Portfolio Background"
                        className="w-full h-full object-cover object-[center_30%]"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/70 z-10"></div>
                </div>

                {/* Content */}
                <div className="relative z-20 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
                    <FadeIn direction="up">
                        <span className="text-luxury-gold text-xs sm:text-sm tracking-[0.3em] font-medium uppercase mb-6 block">Visual Diary</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-luxury-nude tracking-widest uppercase mb-6 leading-tight">
                            Portfolio
                        </h1>
                        <div className="w-16 h-[1px] bg-luxury-gold mx-auto justify-center"></div>
                    </FadeIn>
                </div>
            </section>

            {/* Portfolio Grid Section */}
            <section className="py-24 px-4 sm:px-6 relative z-10 w-full max-w-7xl mx-auto">
                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(cat)}
                            className={`px-6 py-2 border rounded-full text-sm uppercase tracking-widest transition-colors duration-300 ${activeTab === cat ? 'bg-luxury-gold text-luxury-black border-luxury-gold font-medium' : 'bg-transparent text-luxury-nude/70 border-luxury-gold/30 hover:border-luxury-gold hover:text-luxury-gold font-light'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry-style Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
                {loading ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-8 mx-auto">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="bg-[#080808] border border-luxury-gold/10 rounded-md mb-6 sm:mb-8 break-inside-avoid w-full h-[320px] sm:h-[400px] overflow-hidden shadow-lg animate-pulse inline-block">
                                <div className="w-full h-full bg-white/5"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20 text-luxury-nude/50 font-light border border-luxury-gold/10 rounded-xl bg-[#080808]">
                        <p>No portfolio images available in this category.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-8 mx-auto">
                        {filteredItems.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveMobileItem(activeMobileItem === idx ? null : idx)}
                                className={`group relative overflow-hidden bg-[#080808] border border-luxury-gold/10 rounded-md mb-6 sm:mb-8 break-inside-avoid w-full h-[320px] sm:h-[400px] ${item.height} shadow-lg md:hover:shadow-[0_20px_40px_rgba(201,164,92,0.15)] transition-shadow duration-500 cursor-pointer text-left`}
                            >
                                <img
                                    src={item.src}
                                    alt={`${item.category} Portfolio`}
                                    loading="lazy"
                                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 ${activeMobileItem === idx ? 'scale-105' : ''}`}
                                />

                                {/* Overlay tap on mobile, hover on desktop */}
                                <div className={`absolute inset-0 transition-colors duration-500 z-10 flex flex-col items-center justify-center pointer-events-none md:bg-transparent ${activeMobileItem === idx ? 'bg-black/60' : 'bg-transparent'} md:group-hover:bg-black/60`}>
                                    <div className={`transform transition-all duration-700 ease-out flex flex-col items-center md:opacity-0 md:translate-y-4 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${activeMobileItem === idx ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                        <span className="text-white uppercase tracking-[0.25em] font-serif text-lg md:text-xl mb-1 md:mb-2 drop-shadow-md">
                                            {item.category}
                                        </span>
                                        {/* Animated Underline */}
                                        <div className={`h-[1px] bg-luxury-gold transition-all duration-700 delay-100 ease-out md:w-0 md:group-hover:w-[50px] ${activeMobileItem === idx ? 'w-[50px]' : 'w-0'}`}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Portfolio;
