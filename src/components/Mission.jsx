import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Globe, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. 引入 i18n

const Mission = () => {
    const { t, i18n } = useTranslation(); // 2. 初始化
    const isZh = i18n.language === 'zh'; // 判断中文环境

    return (
        <section id="mission" className="py-40 bg-[#FBFBFC] text-slate-900">
            <div className="max-w-7xl mx-auto px-6">

                {/* 顶部：极简标题 + 垂直线条 */}
                <div className="flex flex-col items-center mb-32 text-center">
                    <div className="w-[1px] h-20 bg-slate-200 mb-8" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        // 动态样式：中文去掉斜体，改为宽字间距；英文保持紧凑斜体
                        className={`text-6xl md:text-7xl font-black uppercase ${isZh ? 'tracking-wide not-italic' : 'italic tracking-[-0.05em]'}`}
                    >
                        {t('mission.title_line1')} <br />
                        <span className="text-slate-200">{t('mission.title_line2')}</span>
                    </motion.h2>
                </div>

                {/* 中间：交错式布局的 Pillars */}
                <div className="grid md:grid-cols-3 gap-0 border border-slate-100 rounded-[3rem] bg-white overflow-hidden shadow-2xl shadow-slate-200/50">
                    <PillarCard
                        number="01"
                        icon={<Eye size={20} />}
                        title={t('mission.pillars.1.title')}
                        desc={t('mission.pillars.1.desc')}
                        isZh={isZh} // 将语言状态传给子组件
                    />
                    <PillarCard
                        number="02"
                        icon={<Globe size={20} />}
                        title={t('mission.pillars.2.title')}
                        desc={t('mission.pillars.2.desc')}
                        isMiddle={true}
                        isZh={isZh}
                    />
                    <PillarCard
                        number="03"
                        icon={<Shield size={20} />}
                        title={t('mission.pillars.3.title')}
                        desc={t('mission.pillars.3.desc')}
                        isZh={isZh}
                    />
                </div>

                {/* 底部：大面积冲击力的 Stats */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <StatBox value="2" label={t('mission.stats.cities')} isZh={isZh} />
                    <StatBox value="4" label={t('mission.stats.projections')} isZh={isZh} />
                    <StatBox value="15" label={t('mission.stats.kits')} isZh={isZh} />
                    <StatBox value="28" label={t('mission.stats.activists')} isZh={isZh} />
                </div>
            </div>
        </section>
    );
};

// 子组件：接收 isZh 参数来微调内部样式
const PillarCard = ({ number, icon, title, desc, isMiddle, isZh }) => (
    <div className={`p-8 ${isMiddle ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} transition-all duration-500`}>
        <div className="flex justify-between items-start mb-12">
            <span className={`text-4xl font-black italic ${isMiddle ? 'text-slate-700' : 'text-slate-100'}`}>{number}</span>
            <div className={`p-3 rounded-xl ${isMiddle ? 'bg-slate-800' : 'bg-slate-50'}`}>{icon}</div>
        </div>

        {/* 小标题：中文去掉斜体，字间距稍微收敛 */}
        <h3 className={`text-sm font-black uppercase mb-4 ${isZh ? 'tracking-widest not-italic' : 'italic tracking-[0.2em]'}`}>
            {title}
        </h3>

        {/* 描述：中文增加行高并两端对齐 */}
        <p className={`text-sm font-medium ${isMiddle ? 'text-slate-400' : 'text-slate-500'} ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
            {desc}
        </p>
    </div>
);

const StatBox = ({ value, label, isZh }) => (
    <div className="group cursor-default">
        <div className="flex items-baseline gap-1">
            <span className="text-7xl font-black italic tracking-tighter group-hover:text-[#8BA4C1] transition-colors">{value}</span>
            <span className="text-3xl font-black text-slate-300 ml-2">+</span>
        </div>
        <div className="w-8 h-1 bg-slate-900 mt-4 mb-2 group-hover:w-20 transition-all duration-500" />
        {/* 标签：中文 tracking-widest, 英文 tracking-[0.3em] */}
        <span className={`text-[10px] font-black uppercase text-slate-400 ${isZh ? 'tracking-widest' : 'tracking-[0.3em]'}`}>
            {label}
        </span>
    </div>
);

export default Mission;