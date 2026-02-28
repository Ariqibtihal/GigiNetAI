export default function Navbar({ currentView, onHomeClick, onScanClick, onHistoryClick }) {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0]">
            <div className="max-w-[900px] mx-auto px-5 h-[64px] flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                            DentalScan AI
                        </h1>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex items-center gap-6">
                    <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-[#1F3A5F]' : 'text-[#6B7280] hover:text-[#1F3A5F]'}`}>
                        Beranda
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onScanClick(); }} className={`text-sm font-medium transition-colors ${currentView === 'upload' ? 'text-[#1F3A5F]' : 'text-[#6B7280] hover:text-[#1F3A5F]'}`}>
                        Deteksi
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-medium text-[#6B7280] hover:text-[#1F3A5F] transition-colors">
                        Tentang
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-medium text-[#6B7280] hover:text-[#1F3A5F] transition-colors">
                        Kontak
                    </a>
                    <button
                        onClick={onHistoryClick}
                        className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#1F3A5F] rounded-lg hover:bg-[#192e4c] transition-colors duration-200"
                    >
                        Riwayat
                    </button>
                </nav>
            </div>
        </header>
    )
}
