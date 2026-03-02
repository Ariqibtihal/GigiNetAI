export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="mt-auto border-t border-[#e2e8f0] bg-white">
            <div className="max-w-[1060px] mx-auto px-5 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Brand */}
                    <div className="flex items-center gap-3 group shrink-0 cursor-default">
                        <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] group-hover:bg-white group-hover:shadow-sm group-hover:border-[#cbd5e1] transition-all duration-300">
                            <img
                                src="/logogigi.png"
                                alt="GigiNet AI Logo"
                                className="w-6 h-6 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                            />
                        </div>
                        <span className="text-[15px] font-extrabold text-[#94a3b8] group-hover:text-[#1F3A5F] transition-colors duration-300 tracking-tight">
                            GigiNet <span className="text-[#cbd5e1] group-hover:text-[#4A90A4] transition-colors duration-300">AI</span>
                        </span>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-[11.5px] text-[#94a3b8] text-center leading-relaxed">
                        © {year} GigiNet AI &nbsp;·&nbsp;
                        <span className="font-semibold text-[#64748b]">TIDAK UNTUK DIAGNOSIS MEDIS</span>
                        &nbsp;·&nbsp; Selalu konsultasikan ke dokter gigi
                    </p>

                    {/* Version tag */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f4f7fb] border border-[#e2e8f0] rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                        <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">v2.0 Live</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
