import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import flashlight from '../assets/flashlight.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (

        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo 区域 */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                    <img
                        src={flashlight}
                        alt="flashlight logo"
                        className="w-10 h-10 object-contain rounded-full shadow-sm"
                    />
                    {/* 可选：加上你的项目名称 */}
                    <span className="font-black text-slate-900 uppercase tracking-tighter text-lg italic">
                        China Action
                    </span>
                      </Link>
                </div>

                {/* 中间导航链接 */}
                <ul className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold items-center">
                    <li>
                        <ScrollLink to="hero" smooth={true} duration={500} offset={-100} className="cursor-pointer hover:text-slate-900 transition-colors">
                            Mission
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="about" smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-slate-900 transition-colors">
                            Initiatives
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="projects" smooth={true} duration={500} offset={-60} className="cursor-pointer hover:text-slate-900 transition-colors">
                            Purpose
                        </ScrollLink>
                    </li>
                </ul>

                {/* 右侧操作区域 */}
                <div className="flex items-center gap-8">
                    {/* Join Us: 作为次级链接 */}
                    <p onClick={() => navigate('/join')} className="hidden sm:block text-slate-400 hover:text-slate-900 cursor-pointer font-black transition-all duration-300 uppercase tracking-widest text-[10px]">
                        Join Us
                    </p>

                    {/* Donate: 作为主级按钮 */}
                    <button
                        onClick={() => navigate('/donate')} // 确保你在 App.js 里配置了这个路由
                        className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-700 hover:shadow-lg transition-all active:scale-95"
                    >
                        Donate
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Header;