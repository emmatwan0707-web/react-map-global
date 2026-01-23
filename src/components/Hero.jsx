import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pic from '../assets/picture.jpg';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const regions = [
    {
        id: 'new-york',
        name: 'New York',
        coordinates: [-74.006, 40.7128],
        location: 'Chinese Consulate',
        desc: 'On International Human Rights Day 2025, We conducted a powerful visual intervention, projecting tributes to Liu Xiaobo and prisoners of conscience.'
    },
    {
        id: 'berlin',
        name: 'Berlin',
        coordinates: [13.405, 52.52],
        location: 'Chinese Embassy',
        desc: "On New Year's Day 2026, We launched a strategic projection in Berlin to mark the start of a new year of resistance."
    }
];

const Hero = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const themeColor = "#D2DEEB";

    return (
        <section id="hero" className="relative w-full h-screen bg-white overflow-hidden flex flex-col">
            {/* 文字区域 */}
            <div className="relative z-20 pt-32 pl-10 md:pl-20 w-full md:w-5/12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="pointer-events-auto"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={14} className="text-[#8BA4C1]" fill="currentColor" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">
                            Global Projection Initiative
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-normal leading-[0.9] mb-8">
                        Global <br /> Projections
                    </h1>

                    <div className="border-l-[3px] border-[#D2DEEB] pl-6 max-w-sm">
                        <h2 className="text-base font-bold text-slate-800 mb-3 italic">
                            "Visualizing a Democratic China"
                        </h2>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            We project symbols of resistance onto global diplomatic landmarks, challenging totalitarian narratives through light and public space.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* 地图区域 */}
            <div className="absolute -bottom-[3%] -right-20 w-[85%] h-[85%] z-10 opacity-95 pointer-events-none">
                <ComposableMap
                    projectionConfig={{ rotate: [-10, 0, 0], center: [15, -10], scale: 210 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#DDE7F0"
                                    stroke="#BCCCDD"
                                    strokeWidth={0.8}
                                    style={{ default: { outline: "none" } }}
                                />
                            ))
                        }
                    </Geographies>

                    {regions.map((region) => (
                        <Marker key={region.id} coordinates={region.coordinates}>
                            <g
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRegion(region);
                                }}
                                className="cursor-pointer group pointer-events-auto"
                            >
                                <circle r={25} fill={themeColor} className="animate-ping opacity-20 [animation-duration:3s]" />
                                <circle r={15} fill={themeColor} className="animate-ping opacity-40 [animation-duration:1.5s]" />
                                <circle r={6} fill="#2D3748" className="group-hover:fill-blue-700 transition-colors shadow-lg" />
                                <text textAnchor="middle" y={-28} className="text-[10px] font-black fill-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest italic">
                                    {region.name}
                                </text>
                            </g>
                        </Marker>
                    ))}
                </ComposableMap>
            </div>

            {/* 弹出详情框 */}
            <AnimatePresence>
                {selectedRegion && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedRegion(null)}
                            className="absolute inset-0 bg-slate-900/20 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            style={{ backgroundColor: themeColor }}
                            className="relative w-full max-w-[420px] rounded-[2.5rem] p-10 shadow-2xl flex flex-col border border-white/50"
                        >
                            <button onClick={() => setSelectedRegion(null)} className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full">
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase italic">{selectedRegion.name}</h2>

                            <div className="mx-[-2.5rem] mb-6 overflow-hidden border-y border-white/30">
                                <img src={Pic} alt={selectedRegion.name} className="w-full h-auto" />
                            </div>

                            <p className="text-[12px] text-slate-700 leading-relaxed font-semibold mb-6 px-2">{selectedRegion.desc}</p>

                            <div className="space-y-4">
                                <div className="bg-white/40 py-2 px-4 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center">
                                    Target: {selectedRegion.location}
                                </div>

                                {/* 关键修改：跳转时带上 regionId */}
                                <Link
                                    to="/news"
                                    state={{ regionId: selectedRegion.id }}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all group"
                                >
                                    View Details
                                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;