import { useState, useEffect } from 'react'

export default function Navbar({ currentView, onHomeClick, onScanClick, onAboutClick, onContactClick, onHistoryClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNav = (fn) => {
        setIsMenuOpen(false)
        fn()
    }

    const navLinks = [
        { label: 'Beranda', view: 'home', fn: onHomeClick },
        { label: 'Deteksi', view: 'upload', fn: onScanClick },
        { label: 'Tentang', view: 'about', fn: onAboutClick },
        { label: 'Kontak', view: 'contact', fn: onContactClick },
    ]

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-glass shadow-sm' : 'bg-white/70 backdrop-blur-sm border-b border-transparent'
                }`}
        >
            <div className="max-w-[1060px] mx-auto px-5 h-16 flex items-center justify-between">

                {/* ── Brand ── */}
                <button
                    onClick={onHomeClick}
                    className="flex items-center gap-2.5 group focus:outline-none"
                >
                    {/* Logo mark */}
                    <img src="/logogigi.png" alt="GigiNet AI Logo" className="w-[38px] h-[38px] object-contain drop-shadow-[0_2px_4px_rgba(31,58,95,0.15)] group-hover:scale-105 transition-transform duration-300" />
                    <span className="text-[17px] font-bold tracking-tight text-[#0f172a] group-hover:text-[#1F3A5F] transition-colors">
                        GigiNet <span className="text-[#4A90A4]">AI</span>
                    </span>
                </button>

                {/* ── Mobile toggle ── */}
                <button
                    className="md:hidden p-2 -mr-1.5 text-[#475569] hover:text-[#1F3A5F] hover:bg-[#f0f6ff] rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMenuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>

                {/* ── Desktop Nav ── */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ label, view, fn }) => (
                        <a
                            key={view}
                            href="#"
                            onClick={(e) => { e.preventDefault(); fn() }}
                            className={`relative px-4 py-2 text-[13.5px] font-medium rounded-lg transition-colors duration-150 ${currentView === view
                                ? 'text-[#1F3A5F] bg-[#eef5ff]'
                                : 'text-[#64748b] hover:text-[#1F3A5F] hover:bg-[#f4f8ff]'
                                }`}
                        >
                            {label}
                            {currentView === view && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4A90A4]" />
                            )}
                        </a>
                    ))}

                    <button
                        onClick={onHistoryClick}
                        className={`ml-3 px-4 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 ${currentView === 'history'
                            ? 'bg-[#1F3A5F] text-white shadow-sm'
                            : 'bg-[#1F3A5F] text-white hover:bg-[#192e4c] shadow-sm hover:shadow-md hover:-translate-y-px'
                            }`}
                    >
                        Riwayat
                    </button>


                </nav>
            </div>

            {/* ── Mobile Nav Dropdown ── */}
            {isMenuOpen && (
                <div className="md:hidden animate-slide-down border-t border-[#e2e8f0] bg-white/95 backdrop-blur-md absolute top-16 left-0 right-0 shadow-xl pb-4 px-3 z-40">
                    <nav className="flex flex-col pt-2 gap-0.5">
                        {navLinks.map(({ label, view, fn }) => (
                            <a
                                key={view}
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNav(fn) }}
                                className={`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-all ${currentView === view
                                    ? 'bg-[#eef5ff] text-[#1F3A5F] font-semibold'
                                    : 'text-[#64748b] hover:bg-[#f4f8ff] hover:text-[#1F3A5F]'
                                    }`}
                            >
                                {currentView === view && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A90A4] shrink-0" />
                                )}
                                {label}
                            </a>
                        ))}
                        <button
                            onClick={() => handleNav(onHistoryClick)}
                            className="mt-2 w-full p-3 text-sm font-semibold text-white bg-[#1F3A5F] rounded-xl hover:bg-[#192e4c] transition-colors text-center"
                        >
                            Riwayat
                        </button>
                    </nav>
                </div>
            )}
        </header>
    )
}
