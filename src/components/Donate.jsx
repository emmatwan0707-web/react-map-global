import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, ShieldCheck, Zap, Gift, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DonatePage = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isZh = i18n.language === 'zh';

    const [selectedAmount, setSelectedAmount] = useState(500);
    const [frequency, setFrequency] = useState('once');
    const [showKitDetails, setShowKitDetails] = useState(false);

    const donationTiers = [
        {
            amount: 500,
            title: isZh ? "白银支持者礼包" : "Silver Supporter Kit",
            items: [
                { name: isZh ? "纪念徽章" : "Badge", desc: isZh ? "金属拉丝工艺" : "Brushed Metal Finish" },
                { name: isZh ? "电子证书" : "E-Certificate", desc: isZh ? "永久区块链存证" : "Blockchain Verified" },
                { name: isZh ? "感谢信" : "Thank You Letter", desc: isZh ? "发起人亲笔签名" : "Signed by Founder" }
            ]
        },
        {
            amount: 1000,
            title: isZh ? "黄金行动者礼包" : "Gold Activist Kit",
            items: [
                { name: isZh ? "限量T恤" : "Limited T-Shirt", desc: isZh ? "有机棉材质" : "Organic Cotton" },
                { name: isZh ? "实体证书" : "Physical Certificate", desc: isZh ? "烫金印制" : "Gold Foil Print" },
                { name: isZh ? "贴纸套装" : "Sticker Pack", desc: isZh ? "全套视觉符号" : "Full Icon Set" }
            ]
        },
        {
            amount: 1500,
            title: isZh ? "铂金先锋礼包" : "Platinum Pioneer Kit",
            items: [
                { name: isZh ? "便携投影仪" : "Mini Projector", desc: isZh ? "定制LOGO版" : "Custom Branded" },
                { name: isZh ? "专属铭牌" : "Nameplate", desc: isZh ? "官网永久鸣谢" : "Website Credit" },
                { name: isZh ? "全套周边" : "Full Merch Set", desc: isZh ? "包含以上所有" : "Everything Included" }
            ]
        }
    ];

    const monthlyAmounts = [10, 25, 50, 100, 250];

    const activeTier = frequency === 'once' ? donationTiers.find(t => t.amount === selectedAmount) : null;

    const handleFrequencyChange = (newFrequency) => {
        setFrequency(newFrequency);
        setShowKitDetails(false);
        if (newFrequency === 'once') {
            setSelectedAmount(500);
        } else {
            setSelectedAmount(50);
        }
    };

    const handleAmountClick = (amount) => {
        setSelectedAmount(amount);
        // 切换金额时，如果当前已经打开了详情，建议保持打开状态，或者关闭让用户重点？
        // 这里设置为 false，强迫用户再次点击查看新礼包，交互更清晰
        setShowKitDetails(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-16 text-slate-900 font-sans pb-20">
            <nav className="px-8 pt-8 pb-0">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] font-black"
                >
                    <ChevronLeft size={14} /> {t('nav.back')}
                </button>
            </nav>

            <main className="max-w-6xl mx-auto px-6 mt-0">
                <div className="grid md:grid-cols-2 gap-16 mt-4 items-start">

                    {/* --- 左侧区域 --- */}
                    <div className="space-y-8 md:sticky md:top-24 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {showKitDetails && activeTier ? (
                                <motion.div
                                    key={`tier-${activeTier.amount}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl relative"
                                >
                                    {/* 尖角 (指向右侧) */}
                                    <div className="absolute top-1/2 -right-[11px] -translate-y-1/2 w-5 h-5 bg-white border-t border-r border-slate-200 transform rotate-45"></div>

                                    {/* --- 新增：关闭按钮 X --- */}
                                    <button
                                        onClick={() => setShowKitDetails(false)}
                                        className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900 z-20"
                                    >
                                        <X size={16} />
                                    </button>

                                    {/* --- 新增：返回文字按钮 --- */}
                                    <button
                                        onClick={() => setShowKitDetails(false)}
                                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 mb-6 transition-colors"
                                    >
                                        <ChevronLeft size={12} /> {isZh ? "返回" : "Back"}
                                    </button>

                                    <div className="mb-8 relative z-10">
                                        <span className="text-[#8BA4C1] text-[10px] font-black uppercase tracking-widest">
                                            {isZh ? "当前礼包包含" : "WHAT'S INSIDE"}
                                        </span>
                                        <h2 className="text-3xl font-black mt-2 uppercase italic text-slate-900">
                                            {activeTier.title}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 relative z-10">
                                        {activeTier.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-6 group cursor-default">
                                                <div className="w-24 h-24 bg-slate-100 rounded-2xl border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden transition-all group-hover:border-slate-400 group-hover:shadow-md">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Image {index + 1}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-lg uppercase">{item.name}</h3>
                                                    <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                                        <p className="text-[10px] text-slate-400 font-bold text-center uppercase tracking-widest">
                                            {isZh ? "* 图片仅供参考，实物可能略有不同" : "* Images for reference only"}
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default-content"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div>
                                        <span className={`text-[#8BA4C1] text-[10px] font-black uppercase ${isZh ? 'tracking-widest' : 'tracking-[0.4em]'}`}>
                                            {t('donate.subtitle')}
                                        </span>
                                        <h1 className={`text-5xl font-black mt-4 mb-6 uppercase ${isZh ? 'tracking-normal' : 'italic tracking-tighter'}`}>
                                            {t('donate.title_line1')} <br /> {t('donate.title_line2')}
                                        </h1>
                                        <div className="w-20 h-1 bg-[#D2DEEB] mb-8" />
                                        <p className={`text-slate-500 font-medium ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                                            {t('donate.desc')}
                                        </p>
                                    </div>

                                    <div className="space-y-4 pt-8">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                                <ShieldCheck size={18} className="text-slate-900" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-tight">{t('donate.trust.transparency_title')}</h4>
                                                <p className="text-xs text-slate-400 font-medium">{t('donate.trust.transparency_desc')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                                <Zap size={18} className="text-slate-900" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-tight">{t('donate.trust.impact_title')}</h4>
                                                <p className="text-xs text-slate-400 font-medium">{t('donate.trust.impact_desc')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- 右侧区域 --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-visible"
                    >
                        <div className="flex bg-slate-50 p-1 rounded-full mb-8">
                            {['once', 'monthly'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => handleFrequencyChange(f)}
                                    className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase transition-all ${isZh ? 'tracking-wider' : 'tracking-widest'} ${
                                        frequency === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {f === 'once' ? t('donate.frequency.once') : t('donate.frequency.monthly')}
                                </button>
                            ))}
                        </div>

                        {frequency === 'once' ? (
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {donationTiers.map((tier) => (
                                    <button
                                        key={tier.amount}
                                        onClick={() => handleAmountClick(tier.amount)}
                                        className={`py-6 rounded-2xl border-2 transition-all font-black text-sm relative overflow-hidden ${
                                            selectedAmount === tier.amount
                                                ? "border-slate-900 bg-slate-900 text-white shadow-lg transform scale-[1.02]"
                                                : "border-slate-100 text-slate-400 hover:border-[#D2DEEB] hover:text-slate-600"
                                        }`}
                                    >
                                        ${tier.amount}
                                        {selectedAmount === tier.amount && (
                                            <div className="absolute top-0 right-0 p-1">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {monthlyAmounts.map((amount) => (
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
                                        placeholder={t('donate.custom_placeholder')}
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-8 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] transition-all placeholder:font-medium"
                                        onChange={(e) => setSelectedAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {frequency === 'once' && activeTier && (
                                <motion.div
                                    key={activeTier.amount}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-8"
                                >
                                    {/* --- 修改：点击事件改为 Toggle --- */}
                                    <div
                                        onClick={() => setShowKitDetails(!showKitDetails)} // ✅ 改成了取反，可以反复开关
                                        className={`rounded-2xl p-6 flex items-center gap-4 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                                            showKitDetails
                                                ? "bg-slate-900 ring-2 ring-slate-900 ring-offset-2"
                                                : "bg-slate-900"
                                        }`}
                                    >
                                        <div className="p-3 rounded-xl bg-white/10">
                                            <Gift size={24} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-black uppercase mb-1 text-white">
                                                {activeTier.title}
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-slate-400">
                                                <Eye size={12} />
                                                {/* 根据状态改变提示文字 */}
                                                {showKitDetails
                                                    ? (isZh ? "再次点击关闭详情" : "Click to close details")
                                                    : (isZh ? "点击查看左侧详情" : "Click to view details")
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4 mb-8">
                            <h4 className={`text-[10px] font-black text-slate-400 uppercase px-2 ${isZh ? 'tracking-wider' : 'tracking-[0.2em]'}`}>
                                {t('donate.payment_method')}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-slate-100 p-4 rounded-3xl flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition-all hover:border-slate-300">
                                    <span className="font-bold text-slate-300 hover:text-slate-900">Apple Pay</span>
                                </div>
                                <div className="border border-slate-100 p-4 rounded-3xl flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition-all hover:border-slate-300">
                                    <span className="font-bold text-slate-300 hover:text-slate-900">PayPal</span>
                                </div>
                            </div>
                        </div>

                        <button className={`w-full bg-slate-900 text-white py-5 rounded-full font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] ${isZh ? 'tracking-widest' : 'tracking-[0.3em]'}`}>
                            <Heart size={16} fill="white" />
                            {t('donate.submit')} ${selectedAmount}
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