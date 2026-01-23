import React from 'react';
import { motion } from 'framer-motion';

const Purpose = () => {
    return (
        <section id="purpose" className="py-40 bg-white text-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* 顶部标题 */}
                <div className="flex flex-col mb-32 items-center text-center">
                    <span className="text-[#8BA4C1] text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">
                        Our Strategic Roadmap
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                        THE PATH TO <br />
                        <span className="text-slate-200">LIBERATION.</span>
                    </h2>
                </div>

                {/* 路径图容器 */}
                <div className="relative">

                    {/* 贯穿中心的中轴线 */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-100 transform md:-translate-x-1/2" />

                    <div className="space-y-32">

                        {/* Phase 1: 短期目标 */}
                        <RoadmapItem
                            side="left"
                            year="2026"
                            phase="Phase I: Global Visibility"
                            title="100 COORDINATES"
                            desc="Establish a presence at 100 strategic landmarks worldwide. Each projection serves as a visual beacon, breaking the silence and connecting the global resistance."
                        />

                        {/* Phase 2: 中期目标 (反转到右边) */}
                        <RoadmapItem
                            side="right"
                            year="2028"
                            phase="Phase II: Infrastructure"
                            title="DECENTRALIZED NETWORK"
                            desc="Deploy 1,000+ encrypted projection kits to activists globally. Transition from centralized actions to a self-sustaining, untraceable movement of light."
                        />

                        {/* Phase 3: 长期目标 (居中或左侧) */}
                        <RoadmapItem
                            side="left"
                            year="Beyond"
                            phase="Phase III: Transformation"
                            title="DEMOCRATIC CHINA"
                            desc="The dismantling of totalitarian structures. We visualize freedom until our light becomes the reality of a constitutional, democratic China."
                            isFinal={true}
                        />

                    </div>
                </div>

                {/* 底部宣言 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 text-center"
                >
                    <p className="text-[15px] font-black uppercase tracking-[0.6em] text-slate-300">
                        History is written by those who act.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// 路径节点子组件
const RoadmapItem = ({ side, year, phase, title, desc, isFinal }) => {
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
                <span className="text-[15px] font-black text-[#8BA4C1] uppercase tracking-widest block mb-2">{year} / {phase}</span>
                <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-4">{title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{desc}</p>
                {isFinal && (
                    <div className={`mt-6 inline-block h-[2px] w-20 bg-slate-900 ${isLeft ? 'md:float-right' : ''}`} />
                )}
            </div>
        </motion.div>
    );
};

export default Purpose;