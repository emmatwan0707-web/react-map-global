import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // 1. 引入

const Purpose = () => {
    const { t, i18n } = useTranslation(); // 2. 初始化
    const isZh = i18n.language === 'zh'; // 判断中文环境

    return (
        <section id="purpose" className="py-40 bg-white text-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* 顶部标题 */}
                <div className="flex flex-col mb-32 items-center text-center">
                    {/* 小标题：中文 tracking-widest, 英文 tracking-[0.4em] */}
                    <span className={`text-[#8BA4C1] text-[10px] font-black uppercase mb-6 block ${isZh ? 'tracking-widest' : 'tracking-[0.4em]'}`}>
                        {t('purpose.subtitle')}
                    </span>

                    {/* 主标题：中文去斜体 */}
                    <h2 className={`text-5xl md:text-7xl font-black uppercase leading-none ${isZh ? 'not-italic tracking-wide' : 'italic tracking-tighter'}`}>
                        {t('purpose.title_line1')} <br />
                        <span className="text-slate-200">{t('purpose.title_line2')}</span>
                    </h2>
                </div>

                {/* 路径图容器 */}
                <div className="relative">

                    {/* 贯穿中心的中轴线 */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-100 transform md:-translate-x-1/2" />

                    <div className="space-y-32">

                        {/* Phase 1 */}
                        <RoadmapItem
                            side="left"
                            // 在 JSON 里我们把 "2026" 和 "Phase I" 合并成了一个 meta 字段，这里直接传给 metaText
                            metaText={t('purpose.phases.1.meta')}
                            title={t('purpose.phases.1.title')}
                            desc={t('purpose.phases.1.desc')}
                            isZh={isZh}
                        />

                        {/* Phase 2 */}
                        <RoadmapItem
                            side="right"
                            metaText={t('purpose.phases.2.meta')}
                            title={t('purpose.phases.2.title')}
                            desc={t('purpose.phases.2.desc')}
                            isZh={isZh}
                        />

                        {/* Phase 3 */}
                        <RoadmapItem
                            side="left"
                            metaText={t('purpose.phases.3.meta')}
                            title={t('purpose.phases.3.title')}
                            desc={t('purpose.phases.3.desc')}
                            isFinal={true}
                            isZh={isZh}
                        />

                    </div>
                </div>

                {/* 底部宣言 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 text-center"
                >
                    {/* 宣言：中文 tracking-widest, 英文 tracking-[0.6em] */}
                    <p className={`text-[15px] font-black uppercase text-slate-300 ${isZh ? 'tracking-widest' : 'tracking-[0.6em]'}`}>
                        {t('purpose.footer_quote')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// 路径节点子组件：增加了 metaText 和 isZh 两个 Props
const RoadmapItem = ({ side, metaText, title, desc, isFinal, isZh }) => {
    const isLeft = side === 'left';

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
        >
            {/* 节点上的小圆点 */}
            <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 bg-slate-900 rounded-full transform -translate-x-1/2 z-10 border-4 border-white shadow-[0_0_0_10px_rgba(248,250,252,1)]" />

            <div className={`ml-12 md:ml-0 md:w-[480px] ${isLeft ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4'}`}>
                {/* Meta 信息 (年份/阶段) */}
                <span className={`text-[15px] font-black text-[#8BA4C1] uppercase block mb-2 ${isZh ? 'tracking-widest' : 'tracking-widest'}`}>
                    {metaText}
                </span>

                {/* 标题：中文去斜体 */}
                <h3 className={`text-5xl font-black uppercase mb-4 ${isZh ? 'not-italic tracking-wide' : 'italic tracking-tighter'}`}>
                    {title}
                </h3>

                {/* 描述：中文 text-justify + leading-loose */}
                <p className={`text-slate-500 text-lg font-medium ${isZh ? 'leading-loose text-justify' : 'leading-relaxed'}`}>
                    {desc}
                </p>

                {isFinal && (
                    <div className={`mt-6 inline-block h-[2px] w-20 bg-slate-900 ${isLeft ? 'md:float-right' : ''}`} />
                )}
            </div>
        </motion.div>
    );
};

export default Purpose;