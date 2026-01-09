'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface PromoBannerProps {
    title: string;
    description: string;
    ctaText?: string;
    onDismiss?: () => void;
    intent?: 'MORTGAGE' | 'TRAVEL' | 'SAVINGS' | 'RETIREMENT';
}

export function PromoBanner({
    title,
    description,
    ctaText = "Lihat Penawaran",
    onDismiss,
    intent
}: PromoBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    // Dynamic aesthetic based on intent
    const getGradient = () => {
        switch (intent) {
            case 'MORTGAGE': return 'from-blue-600 to-indigo-700';
            case 'TRAVEL': return 'from-teal-500 to-emerald-600';
            case 'RETIREMENT': return 'from-amber-500 to-orange-600';
            default: return 'from-violet-600 to-fuchsia-700';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${getGradient()} p-6 shadow-xl text-white`}
            >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white opacity-10 blur-xl" />
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-white opacity-10 blur-xl" />

                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-2">
                            <Sparkles className="h-5 w-5 text-yellow-300" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                                Rekomendasi Untuk Anda
                            </span>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold leading-tight">{title}</h3>
                        <p className="mb-6 text-white/90">{description}</p>

                        <button
                            className="group flex items-center space-x-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-opacity-90 active:scale-95"
                        >
                            <span>{ctaText}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            setIsVisible(false);
                            onDismiss?.();
                        }}
                        className="ml-4 rounded-full bg-black/20 p-1 transition-colors hover:bg-black/40"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
