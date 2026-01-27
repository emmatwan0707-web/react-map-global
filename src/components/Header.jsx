import React from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';
import flashlight from '../assets/flashlight.png';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const isZh = i18n.language === 'zh';
    const activeStyle = "text-slate-900 border-b-2 border-slate-900 pb-1";

    const handleNavClick = (targetId) => {

        if (location.pathname === '/') {

            scroller.scrollTo(targetId, {
                duration: 500,
                smooth: true,
                offset: -80,
            });
        }

        else {
            navigate('/');
            setTimeout(() => {
                scroller.scrollTo(targetId, {
                    duration: 500,
                    smooth: true,
                    offset: -80,
                });
            }, 100);
        }
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'zh' : 'en';
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                <div className="flex items-center gap-3">
                    {/* Logo 点击回顶部：你可以保持 Link，也可以加一个 onClick 强制滚回顶部 */}
                    <Link
                        to="/"
                        onClick={() => {
                            if (location.pathname === '/') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <img src={flashlight} alt="flashlight logo" className="w-10 h-10 object-contain rounded-full shadow-sm" />
                        <span className="font-black text-slate-900 uppercase tracking-tighter text-lg italic">
                            {t('nav.brand')}
                        </span>
                    </Link>
                </div>

                <ul className={`hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 text-[11px] uppercase text-slate-500 font-bold items-center ${isZh ? 'tracking-widest' : 'tracking-[0.2em]'}`}>

                    <li>
                        <ScrollLink
                            to="actions"
                            onClick={() => handleNavClick('actions')} // 现在这个函数在首页也会工作了
                            spy={true}
                            activeClass={activeStyle}
                            smooth={true}
                            duration={500}
                            offset={-80}
                            className="cursor-pointer hover:text-slate-900 transition-colors"
                        >
                            {t('nav.actions')}
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="mission"
                            onClick={() => handleNavClick('mission')}
                            spy={true}
                            activeClass={activeStyle}
                            smooth={true}
                            duration={500}
                            offset={-100}
                            className="cursor-pointer hover:text-slate-900 transition-colors"
                        >
                            {t('nav.mission')}
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="purpose"
                            onClick={() => handleNavClick('purpose')}
                            spy={true}
                            activeClass={activeStyle}
                            smooth={true}
                            duration={500}
                            offset={-60}
                            className="cursor-pointer hover:text-slate-900 transition-colors"
                        >
                            {t('nav.purpose')}
                        </ScrollLink>
                    </li>
                </ul>

                <div className="flex items-center gap-6 sm:gap-8">
                    <p onClick={() => navigate('/join')} className={`hidden sm:block text-slate-400 hover:text-slate-900 cursor-pointer font-black transition-all duration-300 uppercase text-[10px] ${isZh ? 'tracking-wider' : 'tracking-widest'}`}>
                        {t('nav.join')}
                    </p>

                    <button
                        onClick={() => navigate('/donate')}
                        className={`bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase hover:bg-slate-700 hover:shadow-lg transition-all active:scale-95 ${isZh ? 'tracking-wider' : 'tracking-[0.2em]'}`}
                    >
                        {t('nav.donate')}
                    </button>

                    <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>

                    <button
                        onClick={toggleLanguage}
                        className="uppercase text-[10px] font-black tracking-widest text-slate-900 hover:text-slate-500 transition-colors w-8 text-center"
                    >
                        {i18n.language === 'en' ? 'CN' : 'EN'}
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Header;