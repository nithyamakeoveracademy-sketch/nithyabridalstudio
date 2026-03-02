import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BeforeAfterSlider = ({ beforeImage, afterImage, className = '' }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = useCallback((clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(position);
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    }, [isDragging, handleMove]);

    const onTouchMove = useCallback((e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    }, [isDragging, handleMove]);

    const handleInteractionStart = () => setIsDragging(true);

    const handleInteractionEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        window.addEventListener('mouseup', handleInteractionEnd);
        window.addEventListener('touchend', handleInteractionEnd);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => {
            window.removeEventListener('mouseup', handleInteractionEnd);
            window.removeEventListener('touchend', handleInteractionEnd);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
        };
    }, [handleInteractionEnd, onMouseMove, onTouchMove]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden select-none group rounded-2xl cursor-ew-resize touch-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-full ${className}`}
            onMouseDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
        >
            {/* Height constraint */}
            <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px]">
                {/* After Image (Background - Right Side) */}
                <img
                    src={afterImage}
                    alt="After Transformation"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable="false"
                />

                {/* Before Image (Foreground overlay - Left Side - styled by clip-path) */}
                <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    <img
                        src={beforeImage}
                        alt="Before Transformation"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable="false"
                    />
                </div>

                {/* Vertical Divider Line */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2"
                    style={{ left: `${sliderPosition}%` }}
                >
                    {/* Circle Handle */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.4)]">
                        <ChevronLeft className="text-luxury-gold/70 -mr-1" size={20} />
                        <ChevronRight className="text-luxury-gold/70 -ml-1" size={20} />
                    </div>
                </div>

                {/* Labels styling matching the exact screenshot */}

                {/* Before Label - Bottom Left (White bg, Black text) */}
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                    <span className="bg-[#f5f5f5] text-[#111] px-4 md:px-5 py-2 rounded font-bold text-[10px] sm:text-xs tracking-widest uppercase shadow-lg">
                        Before
                    </span>
                </div>

                {/* After Label - Bottom Right (Black bg, White text) */}
                <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                    <span className="bg-[#111] text-[#f5f5f5] px-4 md:px-5 py-2 rounded font-bold text-[10px] sm:text-xs tracking-widest uppercase shadow-lg">
                        After
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
