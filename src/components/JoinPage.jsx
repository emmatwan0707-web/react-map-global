import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, MapPin, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. 引入 i18n

const JoinPage = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // 2. 初始化
    const isZh = i18n.language === 'zh'; // 判断中文环境

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 text-slate-900 font-sans pb-20">
            {/* 返回按钮 */}
            <nav className="px-8 pt-4 pb-0 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] font-black"
                >
                    {/* 复用 nav.back */}
                    <ChevronLeft size={14} /> {t('nav.back')}
                </button>
            </nav>

            <main className="max-w-xl mx-auto px-6 mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100"
                >
                    <div className="mb-10 text-center">
                        {/* Subtitle: 中文 tracking-widest, 英文 tracking-[0.4em] */}
                        <span className={`text-[#8BA4C1] text-[10px] font-black uppercase ${isZh ? 'tracking-widest' : 'tracking-[0.4em]'}`}>
                            {t('join.subtitle')}
                        </span>

                        {/* Title: 中文去掉斜体 */}
                        <h1 className={`text-3xl font-black mt-4 uppercase ${isZh ? 'tracking-wide' : 'italic tracking-tighter'}`}>
                            {t('join.title')}
                        </h1>

                        {/* Desc: 中文 text-justify 且 leading-loose */}
                        <p className={`text-slate-400 text-xs mt-4 font-medium ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                            {t('join.desc')}
                        </p>
                    </div>

                    <form className="space-y-6">
                        {/* 基础信息 */}
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder={t('join.form.email')}
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none placeholder:font-medium"
                            />
                            <input
                                type="password"
                                placeholder={t('join.form.password')}
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none placeholder:font-medium"
                            />
                        </div>

                        {/* 地址信息 */}
                        <div className="flex items-center gap-2 px-2 text-slate-400">
                            <MapPin size={14} />
                            <span className={`text-[10px] font-black uppercase ${isZh ? 'tracking-wider' : 'tracking-widest'}`}>
                                {t('join.form.shipping_label')}
                            </span>
                        </div>
                        <textarea
                            placeholder={t('join.form.shipping_placeholder')}
                            rows="3"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none placeholder:font-medium"
                        />

                        {/* 留言审核 */}
                        <div className="flex items-center gap-2 px-2 text-slate-400">
                            <Package size={14} />
                            <span className={`text-[10px] font-black uppercase ${isZh ? 'tracking-wider' : 'tracking-widest'}`}>
                                {t('join.form.plan_label')}
                            </span>
                        </div>
                        <textarea
                            placeholder={t('join.form.plan_placeholder')}
                            rows="4"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none placeholder:font-medium"
                        />

                        {/* 提交按钮 */}
                        <button type="submit" className={`w-full bg-slate-900 text-white py-5 rounded-full font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] ${isZh ? 'tracking-widest' : 'tracking-[0.3em]'}`}>
                            <Send size={16} />
                            {t('join.form.submit')}
                        </button>
                    </form>

                    <p className={`text-center text-[9px] text-slate-400 mt-8 font-medium uppercase ${isZh ? 'tracking-wider leading-normal' : 'tracking-tighter leading-relaxed'}`}>
                        {t('join.security_note')}
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default JoinPage;