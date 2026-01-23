import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, MapPin, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 text-slate-900 font-sans pb-20">
            {/* 返回按钮 */}
            <nav className="px-8 pt-4 pb-0 relative z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] font-black">
                    <ChevronLeft size={14} /> Back
                </button>
            </nav>

            <main className="max-w-xl mx-auto px-6 mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100"
                >
                    <div className="mb-10 text-center">
                        <span className="text-[#8BA4C1] text-[10px] font-black uppercase tracking-[0.4em]">Be the Light</span>
                        <h1 className="text-3xl font-black italic tracking-tighter mt-4 uppercase">Join the Action</h1>
                        <p className="text-slate-400 text-xs mt-4 font-medium leading-relaxed">
                            Apply for a mobile projection kit. We ship globally to those brave enough to challenge the narrative.
                        </p>
                    </div>

                    <form className="space-y-6">
                        {/* 基础信息 */}
                        <div className="space-y-4">
                            <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none" />
                            <input type="password" placeholder="Create Password" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none" />
                        </div>

                        {/* 地址信息 */}
                        <div className="flex items-center gap-2 px-2 text-slate-400">
                            <MapPin size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Shipping Destination</span>
                        </div>
                        <textarea placeholder="Full Shipping Address (City, Country, Zip Code...)" rows="3" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none" />

                        {/* 留言审核 */}
                        <div className="flex items-center gap-2 px-2 text-slate-400">
                            <Package size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Your Plan</span>
                        </div>
                        <textarea placeholder="Tell us where you plan to project and why you want to join..." rows="4" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#D2DEEB] outline-none" />

                        {/* 提交按钮 */}
                        <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-full font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]">
                            <Send size={16} />
                            Request Projection Kit
                        </button>
                    </form>

                    <p className="text-center text-[9px] text-slate-400 mt-8 font-medium leading-relaxed uppercase tracking-tighter">
                        Your data is encrypted. We prioritize the safety of our global activists.
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default JoinPage;