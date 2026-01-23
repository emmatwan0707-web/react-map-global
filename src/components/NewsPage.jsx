import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const newsData = [
    {
        id: 1,
        regionId: 'new-york',
        source: "The New York Times",
        title: "Art as Resistance: Global Projections Challenge Censorship",
        date: "Dec 12, 2025",
        content: "Activists in New York are using high-lumen projectors to transform the facades of diplomatic landmarks into messages of freedom. The 'China Action' initiative has successfully projected tributes to Liu Xiaobo...",
    },
    {
        id: 2,
        regionId: 'berlin',
        source: "The Guardian",
        title: "Berlin Landmark Becomes Canvas for Human Rights Tributes",
        date: "Jan 02, 2026",
        content: "As the clock struck midnight on New Year's Day, the city of Berlin witnessed a powerful display of digital activism. Images of prisoners of conscience were projected, demanding an end to totalitarian narratives...",
    },
    {
        id: 3,
        regionId: 'new-york',
        source: "Reuters",
        title: "Projections in NYC Spark Diplomatic Conversations",
        date: "Dec 15, 2025",
        content: "Following the recent projections at the consulate, local officials in New York have commented on the intersection of art and political speech in public spaces...",
    }
];

const regions = [
    { id: 'new-york', name: 'New York' },
    { id: 'berlin', name: 'Berlin' }
];

const NewsPage = () => {
    const location = useLocation();

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

    return (
        <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">

            {/* 左侧：列表 + 地区导航 */}
            <div className="w-1/3 md:w-1/4 border-r border-slate-200 bg-white flex flex-col">
                <div className="px-6 py-12 overflow-y-auto flex-1">
                    <Link to="/" className="mb-10 flex items-center gap-2 text-[#8BA4C1] hover:text-slate-600 transition-colors uppercase tracking-widest text-[10px] font-bold">
                        <ChevronLeft size={14} /> Back to Map
                    </Link>

                    {/* 地区切换 Tab */}
                    <div className="flex gap-6 mb-8 border-b border-slate-100 pb-2">
                        {regions.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => setActiveRegion(r.id)}
                                className={`text-[10px] font-black uppercase tracking-widest pb-2 transition-all relative ${
                                    activeRegion === r.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                {r.name}
                                {activeRegion === r.id && (
                                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
                                )}
                            </button>
                        ))}
                    </div>

                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-2">
                        {activeRegion.replace('-', ' ')} Media
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
                                    {news.source} • {news.date}
                                </p>
                                <h4 className={`text-sm font-bold leading-tight ${
                                    selectedNews?.id === news.id ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                                }`}>
                                    {news.title}
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
                                <span className="bg-[#D2DEEB] text-slate-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {selectedNews.source}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-6 mb-4 tracking-tighter italic leading-tight">
                                    {selectedNews.title}
                                </h1>
                                <p className="text-slate-400 text-sm font-medium">{selectedNews.date}</p>
                            </div>

                            <div className="prose prose-slate max-w-none mb-20">
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    {selectedNews.content}
                                </p>
                            </div>

                            <div className="border-t border-slate-100 pt-16 flex flex-col items-center">
                                <div className="bg-[#D2DEEB]/30 p-10 rounded-[3rem] w-full text-center border border-[#D2DEEB]/50">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 italic uppercase">Be Part of the Action</h3>
                                    <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto font-medium">
                                        Our movement grows through global solidarity. Join us in demanding justice for those silenced.
                                    </p>
                                    <button className="flex items-center justify-center gap-3 bg-slate-900 text-white mx-auto px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-xl group">
                                        <Users size={18} />
                                        Join Us
                                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 italic">
                            Select a news article to read.
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NewsPage;