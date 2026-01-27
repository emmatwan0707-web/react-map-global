import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import createGlobe from 'cobe';
import { useTranslation } from 'react-i18next';
import { ArrowDown, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const { t, i18n } = useTranslation();
    const isZh = i18n.language === 'zh';
    const canvasRef = useRef();

    useEffect(() => {
        let phi = 0;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 2750,
            height: 2800,
            phi: 0,
            theta: 0.2,
            dark: 0,
            diffuse: 1.2,
            mapSamples: 25000,
            mapBrightness: 6,
            baseColor: [1, 1, 1],
            markerColor: [0.1, 0.1, 0.1],
            glowColor: [0.8, 0.8, 0.8],
            opacity: 1,
            markers: [],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.002;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <section className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220vh] h-[220vh] z-0 pointer-events-none flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full opacity-50"
                />
            </div>

            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white via-white/90 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/90 to-transparent z-10" />

            <div className="relative z-20 w-full px-4 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto"
                >

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 mt-10 leading-tight tracking-tighter">
                        {t('hero.title_line1', 'Global')}
                        <span className="block text-transparent pb-2 bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500">
                            {t('hero.title_line2', 'Projections')}
                        </span>
                    </h1>

                    <p className={`text-slate-600 text-sm md:text-sm font-medium max-w-2xl mt-4 mx-auto ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                        {t('hero.quote_desc', 'Visualizing a Democratic China. We project symbols of resistance onto global diplomatic landmarks.')}
                    </p>

                    <div className="mt-16 flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link
                            to="/join"
                            className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-slate-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            {t('hero.join_us', 'Join Movement')}
                        </Link>

                        <button className="px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center gap-3 hover:-translate-y-1">
                            {t('hero.watch_film', 'Watch Film')}
                            <PlayCircle size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-0 w-full flex justify-center text-slate-300 z-20 pointer-events-none"
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
};

export default HeroSection;