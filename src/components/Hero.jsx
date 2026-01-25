import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. 引入 i18n

// 图片引入保持不变
import Pic from '../assets/picture.jpg';
import pictureBerlin from '../assets/pictureBerlin.png';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// 2. 将不随语言改变的“静态数据”（坐标、ID、图片）移到外面
const staticRegionData = [
    {
        id: 'new-york',
        jsonKey: 'ny', // 对应 json 里的 hero.locations.ny
        coordinates: [-74.006, 40.7128],
        image: Pic,
        locationEn: 'Chinese Consulate',
        locationZh: '中国领事馆'
    },
    {
        id: 'berlin',
        jsonKey: 'berlin', // 对应 json 里的 hero.locations.berlin
        coordinates: [13.405, 52.52],
        image: pictureBerlin,
        locationEn: 'Chinese Embassy',
        locationZh: '中国大使馆'
    }
];

const Hero = () => {
    const { t, i18n } = useTranslation(); // 3. 初始化 hook
    const isZh = i18n.language === 'zh'; // 判断中文环境

    const [selectedRegion, setSelectedRegion] = useState(null);
    const themeColor = "#D2DEEB";

    // 4. 在组件内部动态生成 regions 数组，以便获取实时翻译
    const regions = staticRegionData.map(data => ({
        ...data,
        // 从字典获取名字 (New York / 纽约)
        name: t(`hero.locations.${data.jsonKey}.name`),
        // 从字典获取描述
        desc: t(`hero.locations.${data.jsonKey}.desc`),
        // 处理具体的地点名称 (领事馆/大使馆)
        location: isZh ? data.locationZh : data.locationEn
    }));

    return (
        <section id="hero" className="relative w-full h-screen bg-white overflow-hidden flex flex-col">
            {/* 1. 文字区域 */}
            <div className="relative z-20 pt-32 pl-10 md:pl-20 w-full md:w-5/12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="pointer-events-auto"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={14} className="text-[#8BA4C1]" fill="currentColor" />
                        {/* Subtitle: 中文时加大字间距 */}
                        <span className={`text-[9px] font-bold uppercase text-slate-400 ${isZh ? 'tracking-widest' : 'tracking-[0.4em]'}`}>
                            {t('hero.subtitle')}
                        </span>
                    </div>

                    {/* Title: 中文时稍微增加行高，英文保持紧凑 */}
                    <h1 className={`text-5xl md:text-6xl font-black text-slate-900 mb-8 ${isZh ? 'tracking-wide leading-tight' : 'tracking-normal leading-[0.9]'}`}>
                        {t('hero.title_line1')} <br /> {t('hero.title_line2')}
                    </h1>

                    <div className="border-l-[3px] border-[#D2DEEB] pl-6 max-w-sm">
                        {/* Quote Title: 中文去掉斜体 (italic) */}
                        <h2 className={`text-base font-bold text-slate-800 mb-3 ${isZh ? 'not-italic tracking-wide' : 'italic'}`}>
                            {t('hero.quote_title')}
                        </h2>
                        {/* Quote Desc: 中文使用两端对齐 (text-justify) */}
                        <p className={`text-slate-500 text-xs font-medium ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                            {t('hero.quote_desc')}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* 2. 地图区域 */}
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
                            {/* 将鼠标悬停状态保持在 g 上，但点击逻辑下放 */}
                            <g className="group pointer-events-auto cursor-pointer">

                                {/* 装饰性光环 */}
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

                                {/* 实际点击区域 */}
                                <circle
                                    r={12}
                                    fill="transparent"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRegion(region);
                                    }}
                                />

                                {/* 视觉圆心 */}
                                <circle
                                    r={6}
                                    fill="#2D3748"
                                    className="group-hover:fill-blue-700 transition-colors shadow-lg pointer-events-none"
                                />

                                {/* 地名标签：中文名字需要稍微调整位置或字体 */}
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

            {/* 3. 弹出详情框 */}
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

                            {/* Popup Title: New York / 纽约 */}
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

                            {/* Popup Desc: 动态翻译的内容 */}
                            <p className={`text-[12px] text-slate-700 font-semibold mb-6 px-2 ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                                {selectedRegion.desc}
                            </p>

                            <div className="space-y-4">
                                <div className={`bg-white/40 py-2 px-4 rounded-xl text-[10px] font-bold text-slate-600 uppercase text-center ${isZh ? 'tracking-wider' : 'tracking-widest'}`}>
                                    {/* 翻译 "Target" */}
                                    {t('hero.target_label')}: {selectedRegion.location}
                                </div>

                                <Link
                                    to="/news"
                                    state={{ regionId: selectedRegion.id }}
                                    className={`flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-full font-bold uppercase text-[10px] hover:bg-slate-800 transition-all shadow-lg group ${isZh ? 'tracking-wider' : 'tracking-widest'}`}
                                >
                                    {/* 翻译 "View Details" */}
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

export default Hero;