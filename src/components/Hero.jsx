import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X, Globe, Zap, ExternalLink } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const regions = [
    {
        id: 'new-york',
        name: 'New York',
        coordinates: [-74.006, 40.7128],
        phase: 'Phase 1 & 2',
        location: 'Chinese Consulate',
        detailsUrl: 'https://example.com/ny-details',
        desc: 'On International Human Rights Day 2025, China Action conducted a powerful visual intervention, projecting tributes to Liu Xiaobo and prisoners of conscience. We transformed the space into a global call for justice, demanding the immediate release of all political prisoners in China.' },
    {
        id: 'berlin',
        name: 'Berlin',
        coordinates: [13.405, 52.52],
        phase: 'Phase 3',
        location: 'Chinese Embassy',
        detailsUrl: 'https://example.com/berlin-details',
        desc: "On New Year's Day 2026, China Action launched a strategic projection in Berlin to mark the start of a new year of resistance. By illuminating the city with tributes to Liu Xiaobo and prisoners of conscience, we amplified the global demand for justice and the unconditional release of all political prisoners in China."}
];

const Hero = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const themeColor = "#D2DEEB";

    return (
        <section id="hero" className="relative w-full h-screen bg-white overflow-hidden flex flex-col">

            {/* 1. 文字区域 - 保持 z-20 但通过 pointer-events 允许点击穿透 */}
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

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
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

            {/* 2. 地图区域 - 保持 z-10 但确保 Marker 响应点击 */}
            <div className="absolute -bottom-[3%] -right-20 w-[85%] h-[85%] z-10 opacity-95 pointer-events-none">
                <ComposableMap
                    projectionConfig={{
                        rotate: [-10, 0, 0],
                        center: [15, -10],
                        scale: 210
                    }}
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
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#D2DEEB", outline: "none" }
                                    }}
                                    className="pointer-events-none"
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
                                {/* 1. 外层超大扩散圈 (慢速) */}
                                <circle r={25} fill={themeColor} className="animate-ping opacity-20 [animation-duration:3s]" />

                                {/* 2. 中层快速涟漪 (增强视觉冲击) */}
                                <circle r={15} fill={themeColor} className="animate-ping opacity-40 [animation-duration:1.5s]" />

                                {/* 3. 核心发光底色 (呼吸感) */}
                                <motion.circle
                                    r={10}
                                    fill={themeColor}
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        scale: [1, 1.3, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* 4. 实体中心点 - 增加外发光阴影 */}
                                <circle
                                    r={6}
                                    fill="#2D3748"
                                    className="group-hover:fill-blue-700 transition-colors shadow-[0_0_15px_rgba(210,222,235,0.8)]"
                                />

                                {/* 5. 极小白色核心 (模拟灯泡点，让发光更真实) */}
                                <circle r={1.5} fill="white" className="opacity-80" />

                                {/* 地名标签 */}
                                <text
                                    textAnchor="middle"
                                    y={-28}
                                    className="text-[10px] font-black fill-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest italic"
                                >
                                    {region.name}
                                </text>
                            </g>
                        </Marker>
                    ))}
                </ComposableMap>
            </div>

            {/* 3. 中间弹出详情框 */}
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
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{ backgroundColor: themeColor }}
                            className="relative w-full max-w-[450px] rounded-[3rem] p-10 md:p-14 shadow-2xl flex flex-col border border-white/50"
                        >
                            <button
                                onClick={() => setSelectedRegion(null)}
                                className="absolute top-8 right-8 p-2 hover:bg-white/40 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic">
                                    {selectedRegion.name}
                                </h2>
                                <p className="text-sm text-slate-700 leading-relaxed font-semibold text-left">
                                    {selectedRegion.desc}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/40 p-5 rounded-2xl backdrop-blur-sm">
                                    <div className="text-[12px] font-bold text-slate-600 uppercase tracking-widest mb-1 text-center">
                                        Target: {selectedRegion.location}
                                    </div>
                                </div>

                                <a
                                    href={selectedRegion.detailsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-lg group"
                                >
                                    View Details
                                    <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;