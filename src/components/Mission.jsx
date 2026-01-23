import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Globe, Shield } from 'lucide-react';

const Mission = () => {
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
                        className="text-6xl md:text-7xl font-black italic tracking-[ -0.05em] uppercase"
                    >
                        The Light <br />
                        <span className="text-slate-200">Manifesto</span>
                    </motion.h2>
                </div>

                {/* 中间：交错式布局的 Pillars */}
                <div className="grid md:grid-cols-3 gap-0 border border-slate-100 rounded-[3rem] bg-white overflow-hidden shadow-2xl shadow-slate-200/50">
                    <PillarCard
                        number="01"
                        icon={<Eye size={20} />}
                        title="Visual Resistance"
                        desc="Reclaiming public space through high-lumen imagery on diplomatic landmarks."
                    />
                    <PillarCard
                        number="02"
                        icon={<Globe size={20} />}
                        title="Global Solidarity"
                        desc="A synchronized web of visual protest across continents and timezones."
                        isMiddle={true}
                    />
                    <PillarCard
                        number="03"
                        icon={<Shield size={20} />}
                        title="Secure Action"
                        desc="Encrypted technical support for those standing in the shadows."
                    />
                </div>

                {/* 底部：大面积冲击力的 Stats */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <StatBox value="2" label="Cities Reached" />
                    <StatBox value="4" label="Projections" />
                    <StatBox value="15" label="Kits Sent" />
                    <StatBox value="28" label="Activists" />
                </div>
            </div>
        </section>
    );
};

const PillarCard = ({ number, icon, title, desc, isMiddle }) => (
    <div className={`p-8 ${isMiddle ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} transition-all duration-500`}>
        <div className="flex justify-between items-start mb-12">
            <span className={`text-4xl font-black italic ${isMiddle ? 'text-slate-700' : 'text-slate-100'}`}>{number}</span>
            <div className={`p-3 rounded-xl ${isMiddle ? 'bg-slate-800' : 'bg-slate-50'}`}>{icon}</div>
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 italic">{title}</h3>
        <p className={`text-sm leading-relaxed font-medium ${isMiddle ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
    </div>
);

const StatBox = ({ value, label }) => (
    <div className="group cursor-default">
        <div className="flex items-baseline gap-1">
            <span className="text-7xl font-black italic tracking-tighter group-hover:text-[#8BA4C1] transition-colors">{value}</span>
            <span className="text-3xl font-black text-slate-900">+</span>
        </div>
        <div className="w-8 h-1 bg-slate-900 mt-4 mb-2 group-hover:w-20 transition-all duration-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{label}</span>
    </div>
);

export default Mission;