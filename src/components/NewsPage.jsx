import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, ChevronLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. 引入

// 2. 将模拟数据改为双语结构，方便演示
const newsData = [
    {
        id: 1,
        regionId: 'new-york',
        source: "The New York Times",
        dateEn: "Dec 12, 2025",
        dateZh: "2025年12月12日",
        titleEn: "Art as Resistance: Global Projections Challenge Censorship",
        titleZh: "艺术作为抗争：全球投影挑战审查机制",
        contentEn: "Activists in New York are using high-lumen projectors to transform the facades of diplomatic landmarks into messages of freedom. The 'China Action' initiative has successfully projected tributes to Liu Xiaobo...",
        contentZh: "纽约的行动者们正利用高流明投影仪，将外交地标的外墙转变为自由的宣言墙。“中国行动”计划已成功投射了对刘晓波的致敬影像..."
    },
    {
        id: 2,
        regionId: 'berlin',
        source: "The Guardian",
        dateEn: "Jan 02, 2026",
        dateZh: "2026年1月2日",
        titleEn: "Berlin Landmark Becomes Canvas for Human Rights Tributes",
        titleZh: "柏林地标成为人权致敬的画布",
        contentEn: "As the clock struck midnight on New Year's Day, the city of Berlin witnessed a powerful display of digital activism. Images of prisoners of conscience were projected, demanding an end to totalitarian narratives...",
        contentZh: "当新年的钟声敲响，柏林见证了一场震撼的数字抗争展示。良心犯的肖像被投射在城市地标上，以此要求终结极权主义的叙事..."
    },
    {
        id: 3,
        regionId: 'new-york',
        source: "Reuters",
        dateEn: "Dec 15, 2025",
        dateZh: "2025年12月15日",
        titleEn: "Projections in NYC Spark Diplomatic Conversations",
        titleZh: "纽约投影行动引发外交对话",
        contentEn: "Following the recent projections at the consulate, local officials in New York have commented on the intersection of art and political speech in public spaces...",
        contentZh: "继近期领事馆投影事件后，纽约当地官员就公共空间内艺术与政治言论的交集发表了评论..."
    }
];

const NewsPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // 这里之前漏了引入
    const { t, i18n } = useTranslation(); // 3. 初始化
    const isZh = i18n.language === 'zh'; // 判断中文环境

    // 优先级：1. 从地图传来的 state 2. 默认 'new-york'
    const initialRegion = location.state?.regionId || 'new-york';

    const [activeRegion, setActiveRegion] = useState(initialRegion);
    const [selectedNews, setSelectedNews] = useState(null);

    // 根据选中的地区过滤新闻列表
    const filteredNews = newsData.filter(news => news.regionId === activeRegion);

    // 当切换地区时，默认选中该地区的第一条新闻
    useEffect(() => {
        if (filteredNews.length > 0) {
            setSelectedNews(filteredNews[0]);
        } else {
            setSelectedNews(null);
        }
    }, [activeRegion]);

    // 辅助函数：获取对应的地区名称翻译
    const getRegionName = (id) => {
        if (id === 'new-york') return t('hero.locations.ny.name');
        if (id === 'berlin') return t('hero.locations.berlin.name');
        return id;
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">

            {/* 左侧：列表 + 地区导航 */}
            <div className="w-1/3 md:w-1/4 border-r border-slate-200 bg-white flex flex-col">
                <div className="px-6 py-12 overflow-y-auto flex-1">
                    <Link to="/" className="mb-10 flex items-center gap-2 text-[#8BA4C1] hover:text-slate-600 transition-colors uppercase tracking-widest text-[10px] font-bold">
                        {/* 翻译 Back to Map */}
                        <ChevronLeft size={14} /> {t('nav.back_map')}
                    </Link>

                    {/* 地区切换 Tab */}
                    <div className="flex gap-6 mb-8 border-b border-slate-100 pb-2">
                        {['new-york', 'berlin'].map((rId) => (
                            <button
                                key={rId}
                                onClick={() => setActiveRegion(rId)}
                                // Tab 字体：中文稍微加宽
                                className={`text-[10px] font-black uppercase pb-2 transition-all relative ${isZh ? 'tracking-wider' : 'tracking-widest'} ${
                                    activeRegion === rId ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                {getRegionName(rId)}
                                {activeRegion === rId && (
                                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
                                )}
                            </button>
                        ))}
                    </div>

                    <h3 className={`text-xs font-black text-slate-400 uppercase mb-6 px-2 ${isZh ? 'tracking-widest' : 'tracking-[0.3em]'}`}>
                        {getRegionName(activeRegion)} {t('news.media_label')}
                    </h3>

                    <div className="space-y-2">
                        {filteredNews.map((news) => (
                            <div
                                key={news.id}
                                onClick={() => setSelectedNews(news)}
                                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                                    selectedNews?.id === news.id
                                        ? "bg-[#D2DEEB] shadow-sm"
                                        : "hover:bg-slate-50"
                                }`}
                            >
                                <p className={`text-[10px] font-bold mb-1 uppercase tracking-tight ${
                                    selectedNews?.id === news.id ? "text-slate-700" : "text-slate-400"
                                }`}>
                                    {/* 动态显示日期 */}
                                    {news.source} • {isZh ? news.dateZh : news.dateEn}
                                </p>
                                {/* 列表标题：中文常规字体，英文紧凑 */}
                                <h4 className={`text-sm font-bold leading-tight ${
                                    selectedNews?.id === news.id ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                                } ${isZh ? 'tracking-normal' : 'tracking-tight'}`}>
                                    {isZh ? news.titleZh : news.titleEn}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 右侧：详情内容 */}
            <div className="flex-1 overflow-y-auto bg-white relative">
                <AnimatePresence mode="wait">
                    {selectedNews ? (
                        <motion.div
                            key={selectedNews.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-3xl mx-auto px-10 py-20"
                        >
                            <div className="mb-12">
                                <span className={`bg-[#D2DEEB] text-slate-700 px-3 py-1 rounded-full text-[10px] font-black uppercase ${isZh ? 'tracking-wider' : 'tracking-widest'}`}>
                                    {selectedNews.source}
                                </span>

                                {/* 文章大标题：中文去斜体，加宽字间距 */}
                                <h1 className={`text-4xl md:text-5xl font-black text-slate-900 mt-6 mb-4 leading-tight uppercase ${isZh ? 'not-italic tracking-wide' : 'italic tracking-tighter'}`}>
                                    {isZh ? selectedNews.titleZh : selectedNews.titleEn}
                                </h1>
                                <p className="text-slate-400 text-sm font-medium">
                                    {isZh ? selectedNews.dateZh : selectedNews.dateEn}
                                </p>
                            </div>

                            <div className="prose prose-slate max-w-none mb-20">
                                {/* 正文：中文两端对齐 + 宽松行高 */}
                                <p className={`text-lg text-slate-600 font-medium ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                                    {isZh ? selectedNews.contentZh : selectedNews.contentEn}
                                </p>
                            </div>

                            {/* 底部 CTA 区域 */}
                            <div className="border-t border-slate-100 pt-16 flex flex-col items-center">
                                <div className="bg-[#D2DEEB]/30 p-10 rounded-[3rem] w-full text-center border border-[#D2DEEB]/50">
                                    <h3 className={`text-2xl font-black text-slate-900 mb-4 uppercase ${isZh ? 'not-italic tracking-wide' : 'italic'}`}>
                                        {t('news.cta_title')}
                                    </h3>
                                    <p className={`text-slate-500 text-sm mb-8 max-w-md mx-auto font-medium ${isZh ? 'leading-loose' : ''}`}>
                                        {t('news.cta_desc')}
                                    </p>
                                    <button
                                        onClick={() => navigate('/join')}
                                        className={`flex items-center justify-center gap-3 bg-slate-900 text-white mx-auto px-10 py-5 rounded-full font-black uppercase text-sm hover:bg-slate-800 transition-all shadow-xl group ${isZh ? 'tracking-widest' : 'tracking-widest'}`}
                                    >
                                        <Users size={18} />
                                        {t('nav.join')}
                                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 italic">
                            {t('news.select_prompt')}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NewsPage;