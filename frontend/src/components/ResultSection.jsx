import { useState } from 'react'

const SEVERITY_STYLES = {
    none: { bg: 'bg-[#F0FDF4]', border: 'border-[#BBF7D0]', text: 'text-[#15803D]', dot: 'bg-[#22C55E]', marker: 'border-[#22C55E] bg-[#22C55E]/15', label: 'bg-[#22C55E] text-white', bar: 'bg-[#22C55E]' },
    mild: { bg: 'bg-[#FFFBEB]', border: 'border-[#FEF08A]', text: 'text-[#B45309]', dot: 'bg-[#F59E0B]', marker: 'border-[#F59E0B] bg-[#F59E0B]/15', label: 'bg-[#F59E0B] text-white', bar: 'bg-[#F59E0B]' },
    moderate: { bg: 'bg-[#FFF7ED]', border: 'border-[#FED7AA]', text: 'text-[#C2410C]', dot: 'bg-[#F97316]', marker: 'border-[#F97316] bg-[#F97316]/15', label: 'bg-[#F97316] text-white', bar: 'bg-[#F97316]' },
    severe: { bg: 'bg-[#FEF2F2]', border: 'border-[#FCA5A5]', text: 'text-[#B91C1C]', dot: 'bg-[#EF4444]', marker: 'border-[#EF4444] bg-[#EF4444]/15', label: 'bg-[#EF4444] text-white', bar: 'bg-[#EF4444]' },
}

export default function ResultSection({ result, preview }) {
    const [showOverlay, setShowOverlay] = useState(true)
    const s = SEVERITY_STYLES[result.style] || SEVERITY_STYLES.none
    const circumference = 2 * Math.PI * 45; // radius 45

    return (
        <section className="animate-fade-in-up space-y-5">

            {/* ─── Header Laporan yang Elegan ─── */}
            <div className="bg-white rounded-[1.5rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Latar Belakang Abstrak Halus */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#4A90A4]/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-[#1F3A5F]/5 flex items-center justify-center border border-[#1F3A5F]/10">
                            <svg className="w-4 h-4 text-[#1F3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#1F3A5F] tracking-tight">Hasil Analisis AI</h2>
                    </div>
                    <p className="text-[#6B7280] text-[15px] leading-relaxed max-w-lg mb-5">
                        {result.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border shadow-sm ${s.bg} ${s.border} ${s.text}`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse shadow-sm ${s.dot}`} />
                            {result.severityLabel}
                        </span>
                        <span className="text-xs font-semibold text-[#6B7280] bg-[#F8FAFC] px-3.5 py-1.5 rounded-full border border-[#E5E7EB] flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {result.analysisTime}
                        </span>
                    </div>
                </div>

                {/* Score Indicator Lingkar Modern */}
                <div className="relative z-10 flex flex-col items-center shrink-0 bg-[#F8FAFC]/50 p-3 rounded-[1.5rem] border border-[#F1F5F9] shadow-sm">
                    <div className="relative w-[110px] h-[110px]">
                        <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90 drop-shadow-sm">
                            <circle cx="55" cy="55" r="45" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                            <circle
                                cx="55" cy="55" r="45" fill="none"
                                stroke={result.severityColor}
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - (result.score / 100) * circumference}
                                className="transition-all duration-[1.5s] ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold tracking-tight" style={{ color: result.severityColor }}>
                                {result.score}
                            </span>
                            <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mt-1">
                                Skor Klinis
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">

                {/* ─── Penampil Foto & Deteksi (Elegan) ─── */}
                <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col max-h-[460px]">
                    <div className="flex items-center justify-between mb-5 px-2">
                        <h3 className="text-[15px] font-bold text-[#1A1A1A] flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-[#4A90A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Pemindai Visual
                        </h3>
                        {/* Toggle Elegan */}
                        <div className="flex bg-[#F8FAFC] rounded-xl p-1 border border-[#E2E8F0]">
                            <button
                                onClick={() => setShowOverlay(true)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${showOverlay ? 'bg-white text-[#1F3A5F] shadow-sm' : 'text-[#9CA3AF] hover:text-[#1F3A5F]'}`}
                            >
                                Anotasi AI
                            </button>
                            <button
                                onClick={() => setShowOverlay(false)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${!showOverlay ? 'bg-white text-[#1F3A5F] shadow-sm' : 'text-[#9CA3AF] hover:text-[#1F3A5F]'}`}
                            >
                                Foto Asli
                            </button>
                        </div>
                    </div>

                    {/* Latar Belakang Gambar yg Bersih */}
                    <div className="rounded-[1.25rem] overflow-hidden bg-[#F8FAFC] border border-[#F1F5F9] flex-1 flex items-center justify-center min-h-[250px] p-2">

                        {/* WADA INTI GAMBAR (Relative) - Ini fixing bug bounding box! */}
                        <div className="relative inline-block max-w-full max-h-[350px]">
                            <img src={preview} alt="Visual Radiograf" className="w-auto h-auto max-w-full max-h-[350px] object-contain block z-0 filter drop-shadow-sm select-none" />

                            {showOverlay && result.detections.map((d) => {
                                const ds = SEVERITY_STYLES[d.style] || SEVERITY_STYLES.mild
                                return (
                                    <div
                                        key={d.id}
                                        className={`absolute border-[2px] rounded-xl transition-all duration-300 pointer-events-none shadow-sm ${ds.marker}`}
                                        style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%` }}
                                    >
                                        {/* Label Pill Terbang */}
                                        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-md flex items-center gap-1.5 tracking-wide ${ds.label} after:content-[''] after:absolute after:top-[98%] after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[inherit]`}>
                                            <span>{
                                                d.diseaseType === 'caries' ? 'Karies' :
                                                    d.diseaseType === 'gingivitus' || d.diseaseType === 'gingivitis' ? 'Gingivitis' :
                                                        d.diseaseType === 'ulcer' ? 'Ulkus' :
                                                            d.diseaseType === 'toothdiscoloration' || d.diseaseType === 'tooth discoloration' ? 'Diskolorasi' :
                                                                d.diseaseType === 'tartar' || d.diseaseType === 'calculus' ? 'Kalkulus' :
                                                                    d.severityLabel || 'Anomali'
                                            }</span>
                                            <span className="w-1 h-1 rounded-full bg-white/40"></span>
                                            <span>{(d.confidence * 100).toFixed(0)}%</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>

                {/* ─── Daftar Temuan (Bentuk Kartu Modern) ─── */}
                <div className="flex flex-col gap-5 max-h-[460px]">
                    {/* Ringkasan Statistik Cantik */}
                    <div className="grid grid-cols-2 gap-4 shrink-0">
                        <div className="bg-white rounded-[1.5rem] p-5 border border-[#F1F5F9] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                                <span className="text-xl font-bold text-[#0284C7]">{result.stats.regions}</span>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-0.5">Area Dipindai</h4>
                                <p className="text-[13px] font-bold text-[#1F3A5F]">Permukaan Gigi</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-[1.5rem] p-5 border border-[#F1F5F9] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.marker}`}>
                                <span className="text-xl font-bold" style={{ color: result.severityColor }}>{result.stats.detections}</span>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-0.5">Gejala Detail</h4>
                                <p className="text-[13px] font-bold text-[#1F3A5F]">Total Anomali</p>
                            </div>
                        </div>
                    </div>

                    {/* Log Kartu Estetik */}
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] flex-1 flex flex-col min-h-0">
                        <h3 className="text-[15px] font-bold text-[#1A1A1A] flex items-center gap-2.5 mb-5">
                            <svg className="w-4 h-4 text-[#4A90A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Penjelasan Diagnostik
                        </h3>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {result.findings.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#CBD5E1]">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-[#F1F5F9]">
                                        <svg className="w-7 h-7 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-[15px] font-bold text-[#1F3A5F]">Gigi Sehat & Kuat</p>
                                    <p className="text-[13px] text-[#6B7280] mt-1.5 max-w-[220px]">Tidak ditemukan satupun indikasi kerusakan karies atau penumpukan karang.</p>
                                </div>
                            ) : (
                                result.findings.map((f, i) => {
                                    const fs = SEVERITY_STYLES[f.style] || SEVERITY_STYLES.mild
                                    return (
                                        <div key={f.id} className="group p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] hover:bg-white hover:shadow-md hover:border-[#E2E8F0] transition-all">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-3 h-3 rounded-full shadow-sm ${fs.dot}`}></div>
                                                    <span className="text-[14px] font-bold text-[#1F3A5F]">{f.name}</span>
                                                </div>
                                                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${fs.bg} ${fs.text} border ${fs.border}`}>
                                                    Akurasi {(f.confidence * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="pl-5 border-l-2 border-[#E2E8F0] ml-[5px] group-hover:border-[#CBD5E1] transition-colors">
                                                <p className="text-[10px] font-bold text-[#4A90A4] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {f.region}
                                                </p>
                                                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3">{f.desc}</p>

                                                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${fs.bar}`}
                                                        style={{ width: `${f.confidence * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
