import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. 引入

const DonatePage = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // 2. 初始化
    const [selectedAmount, setSelectedAmount] = useState(50);
    const [frequency, setFrequency] = useState('once');

    // 判断中文环境，用于微调样式
    const isZh = i18n.language === 'zh';

    const amounts = [10, 25, 50, 100, 250];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-16 text-slate-900 font-sans pb-20">
            {/* 顶部导航 */}
            <nav className="px-8 pt-8 pb-0">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] font-black"
                >
                    {/* 复用 nav 里的 'back' 翻译 */}
                    <ChevronLeft size={14} /> {t('nav.back')}
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-6 mt-0">
                <div className="grid md:grid-cols-2 gap-16 mt-4">

                    {/* 左侧：感性内容区 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            {/* 小标题：中文稍微加宽一点字间距 */}
                            <span className={`text-[#8BA4C1] text-[10px] font-black uppercase ${isZh ? 'tracking-widest' : 'tracking-[0.4em]'}`}>
                                {t('donate.subtitle')}
                            </span>

                            {/* 主标题：中文去掉 italic (斜体)，因为中文字体斜体通常不好看 */}
                            <h1 className={`text-5xl font-black mt-4 mb-6 uppercase ${isZh ? 'tracking-normal' : 'italic tracking-tighter'}`}>
                                {t('donate.title_line1')} <br /> {t('donate.title_line2')}
                            </h1>

                            <div className="w-20 h-1 bg-[#D2DEEB] mb-8" />

                            {/* 描述段落：中文增加行高 leading-loose */}
                            <p className={`text-slate-500 font-medium ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                                {t('donate.desc')}
                            </p>
                        </div>

                        {/* 透明度承诺 */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                    <ShieldCheck size={18} className="text-slate-900" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-tight">
                                        {t('donate.trust.transparency_title')}
                                    </h4>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {t('donate.trust.transparency_desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                    <Zap size={18} className="text-slate-900" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-tight">
                                        {t('donate.trust.impact_title')}
                                    </h4>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {t('donate.trust.impact_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 右侧：捐赠卡片 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
                    >
                        {/* 频率选择 */}
                        <div className="flex bg-slate-50 p-1 rounded-full mb-8">
                            {['once', 'monthly'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFrequency(f)}
                                    // 动态样式：中文时字间距稍小，英文保持极宽
                                    className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase transition-all ${isZh ? 'tracking-wider' : 'tracking-widest'} ${
                                        frequency === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {/* 动态翻译 Key */}
                                    {f === 'once' ? t('donate.frequency.once') : t('donate.frequency.monthly')}
                                </button>
                            ))}
                        </div>

                        {/* 金额选择 */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {amounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setSelectedAmount(amount)}
                                    className={`py-4 rounded-2xl border-2 transition-all font-black text-sm ${
                                        selectedAmount === amount
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-100 text-slate-400 hover:border-[#D2DEEB]"
                                    }`}
                                >
                                    ${amount}
                                </button>
                            ))}
                            <div className="col-span-3 mt-2 relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                <input
                                    type="number"
                                    // 占位符也要翻译
                                    placeholder={t('donate.custom_placeholder')}
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-8 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] transition-all placeholder:font-medium"
                                    onChange={(e) => setSelectedAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* 支付方式 Placeholder */}
                        <div className="space-y-4 mb-8">
                            <h4 className={`text-[10px] font-black text-slate-400 uppercase px-2 ${isZh ? 'tracking-wider' : 'tracking-[0.2em]'}`}>
                                {t('donate.payment_method')}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-slate-100 p-4 rounded-3xl flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition-all">
                                    <span className="font-bold text-slate-300">Apple Pay</span>
                                </div>
                                <div className="border border-slate-100 p-4 rounded-3xl flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition-all">
                                    <span className="font-bold text-slate-300">PayPal</span>
                                </div>
                            </div>
                        </div>

                        {/* 提交按钮 */}
                        <button className={`w-full bg-slate-900 text-white py-5 rounded-full font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] ${isZh ? 'tracking-widest' : 'tracking-[0.3em]'}`}>
                            <Heart size={16} fill="white" />
                            {t('donate.submit')}
                        </button>

                        <p className="text-center text-[10px] text-slate-400 mt-6 font-medium px-4">
                            {t('donate.disclaimer')}
                        </p>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default DonatePage;