import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Pic from '../assets/picture.jpg';
import pictureBerlin from '../assets/pictureBerlin.png';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const staticRegionData = [
    {
        id: 'new-york',
        jsonKey: 'ny',
        coordinates: [-74.006, 40.7128],
        image: Pic,
        locationEn: 'Chinese Consulate',
        locationZh: '中国领事馆'
    },
    {
        id: 'berlin',
        jsonKey: 'berlin',
        coordinates: [13.405, 52.52],
        image: pictureBerlin,
        locationEn: 'Chinese Embassy',
        locationZh: '中国大使馆'
    }
];

const ActionsMap = () => {
    const { t, i18n } = useTranslation();
    const isZh = i18n.language === 'zh';
    const [selectedRegion, setSelectedRegion] = useState(null);
    const themeColor = "#D2DEEB";

    const regions = staticRegionData.map(data => ({
        ...data,
        name: t(`hero.locations.${data.jsonKey}.name`),
        desc: t(`hero.locations.${data.jsonKey}.desc`),
        location: isZh ? data.locationZh : data.locationEn
    }));

    return (
        <section id="actions" className="relative w-full h-screen bg-slate-50 overflow-hidden flex flex-col">

            {/* --- 1. 左侧文字区域 (文案已修改为 Action 主题) --- */}
            <div className="relative z-20 pt-32 pl-10 md:pl-20 w-full md:w-5/12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }} // 改为 whileInView 让滚动到这里时再触发动画
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="pointer-events-auto"
                >
                    {/* Subtitle: 强调“影响力”与“动员” */}
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={14} className="text-[#8BA4C1]" fill="currentColor" />
                        <span className={`text-[10px] font-bold uppercase text-slate-400 ${isZh ? 'tracking-widest' : 'tracking-[0.4em]'}`}>
                            {t('actions.subtitle', 'Impact & Mobilization')}
                        </span>
                    </div>

                    {/* Title: Direct Actions (直接行动) */}
                    <h1 className={`text-5xl md:text-6xl font-black text-slate-900 mb-8 ${isZh ? 'tracking-wide leading-tight' : 'tracking-normal leading-[0.9]'}`}>
                        {t('actions.title_line1', 'Direct')} <br />
                        <span className="text-transparent bg-clip-text bg-slate-900 ">
                            {t('actions.title_line2', 'Actions')}
                        </span>
                    </h1>

                    {/* Description: 描述具体的抗议和活动 */}
                    <div className="border-l-[3px] border-[#D2DEEB] pl-6 max-w-sm">
                        <h2 className={`text-base font-bold text-slate-800 mb-3 ${isZh ? 'not-italic tracking-wide' : 'italic'}`}>
                            {t('actions.quote_title', 'Turning Dissent into Deed')}
                        </h2>
                        <p className={`text-slate-500 text-xs font-medium ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                            {t('actions.quote_desc', 'We are not just online; we are on the streets. Explore our network of protests, rallies, and projection events. Every marker represents a community standing up for freedom.')}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* --- 2. 地图区域 (保持不变，功能完美) --- */}
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
                                    fill="#E2E8F0" //稍微调深一点点背景色，更有质感
                                    stroke="#CBD5E1"
                                    strokeWidth={0.8}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#CBD5E1", transition: "all 0.3s" },
                                        pressed: { outline: "none" }
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {regions.map((region) => (
                        <Marker key={region.id} coordinates={region.coordinates}>
                            <g className="group pointer-events-auto cursor-pointer">
                                <circle
                                    r={25}
                                    fill={themeColor}
                                    className="animate-ping opacity-20 [animation-duration:3s] pointer-events-none"
                                />
                                <circle
                                    r={15}
                                    fill={themeColor}
                                    className="animate-ping opacity-40 [animation-duration:1.5s] pointer-events-none"
                                />
                                <circle
                                    r={12}
                                    fill="transparent"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRegion(region);
                                    }}
                                />
                                <circle
                                    r={6}
                                    fill="#2D3748"
                                    className="group-hover:fill-blue-700 transition-colors shadow-lg pointer-events-none"
                                />
                                <text
                                    textAnchor="middle"
                                    y={-28}
                                    className={`text-[10px] font-black fill-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase pointer-events-none ${isZh ? 'tracking-widest' : 'tracking-widest italic'}`}
                                >
                                    {region.name}
                                </text>
                            </g>
                        </Marker>
                    ))}
                </ComposableMap>
            </div>

            {/* --- 3. 弹出框 (保持不变) --- */}
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
                            <button
                                onClick={() => setSelectedRegion(null)}
                                className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h2 className={`text-2xl font-black text-slate-900 mb-6 uppercase ${isZh ? 'not-italic' : 'italic'}`}>
                                {selectedRegion.name}
                            </h2>

                            <div className="mx-[-2.5rem] mb-6 overflow-hidden border-y border-white/30">
                                <img
                                    src={selectedRegion.image}
                                    alt={selectedRegion.name}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <p className={`text-[12px] text-slate-700 font-semibold mb-6 px-2 ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                                {selectedRegion.desc}
                            </p>

                            <div className="space-y-4">
                                <div className={`bg-white/40 py-2 px-4 rounded-xl text-[10px] font-bold text-slate-600 uppercase text-center ${isZh ? 'tracking-wider' : 'tracking-widest'}`}>
                                    {t('hero.target_label')}: {selectedRegion.location}
                                </div>

                                <Link
                                    to="/news"
                                    state={{ regionId: selectedRegion.id }}
                                    className={`flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-full font-bold uppercase text-[10px] hover:bg-slate-800 transition-all shadow-lg group ${isZh ? 'tracking-wider' : 'tracking-widest'}`}
                                >
                                    {t('hero.view_details')}
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

export default ActionsMap;