import { useState } from 'react'

const SEVERITY_STYLES = {
    none: { bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', text: 'text-[#15803d]', dot: 'bg-[#22C55E]', marker: 'border-[#22C55E] bg-[#22C55E]/10', label: 'bg-[#22C55E]', bar: 'bg-[#22C55E]', finBg: 'bg-white border border-[#E5E7EB]' },
    mild: { bg: 'bg-[#fffbeb]', border: 'border-[#fef08a]', text: 'text-[#b45309]', dot: 'bg-[#F59E0B]', marker: 'border-[#F59E0B] bg-[#F59E0B]/10', label: 'bg-[#F59E0B]', bar: 'bg-[#F59E0B]', finBg: 'bg-white border border-[#E5E7EB]' },
    moderate: { bg: 'bg-[#fff7ed]', border: 'border-[#fed7aa]', text: 'text-[#c2410c]', dot: 'bg-[#f97316]', marker: 'border-[#f97316] bg-[#f97316]/10', label: 'bg-[#f97316]', bar: 'bg-[#f97316]', finBg: 'bg-white border border-[#E5E7EB]' },
    severe: { bg: 'bg-[#fef2f2]', border: 'border-[#fca5a5]', text: 'text-[#b91c1c]', dot: 'bg-[#ef4444]', marker: 'border-[#ef4444] bg-[#ef4444]/10', label: 'bg-[#ef4444]', bar: 'bg-[#ef4444]', finBg: 'bg-white border border-[#E5E7EB]' },
}

export default function ResultSection({ result, preview }) {
    const [showOverlay, setShowOverlay] = useState(true)
    const circumference = 2 * Math.PI * 52
    const s = SEVERITY_STYLES[result.style] || SEVERITY_STYLES.none

    return (
        <section className="animate-fade-in-up space-y-4">
            {/* ─── Summary Card ─── */}
            <div className="card p-6 sm:p-8">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                    <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2.5 tracking-tight border-b-2 border-[#1A1A1A] pb-1">
                        <div className="w-2.5 h-2.5 bg-[#4A90A4]" />
                        LAPORAN PENGUJIAN
                    </h2>
                    <span className="text-[11px] text-[#6B7280] font-mono tracking-wide bg-[#f8fafc] px-3 py-1 rounded-full border border-[#E5E7EB]">
                        {result.model} · {result.analysisTime}
                    </span>
                </div>

                {/* Score + Severity */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8">
                    {/* Score Ring */}
                    <div className="relative w-[130px] h-[130px] shrink-0" role="img" aria-label={`Skor kesehatan: ${result.score} dari 100`}>
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 relative">
                            <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                            <circle
                                cx="60" cy="60" r="52" fill="none"
                                stroke={result.severityColor}
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - (result.score / 100) * circumference}
                                className="transition-all duration-[1.5s] ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[32px] font-extrabold tracking-tight leading-none" style={{ color: result.severityColor }}>
                                {result.score}
                            </span>
                            <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-[0.12em] mt-1">
                                Skor Kesehatan
                            </span>
                        </div>
                    </div>

                    <div className="text-center sm:text-left flex-1">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${s.bg} ${s.border} ${s.text}`}>
                            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                            {result.severityLabel}
                        </span>
                        <p className="text-sm text-[#6B7280] leading-relaxed mt-3 max-w-md">
                            {result.description}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatCard value={result.stats.regions} label="Area Dipindai" color="#0EA5E9" />
                    <StatCard value={result.stats.detections} label="Deteksi" color={result.severityColor} />
                    <StatCard value={result.stats.avgConfidence} label="Rata-rata Akurasi" color="#14B8A6" />
                </div>
            </div>

            {/* ─── Detection Image ─── */}
            <div className="card p-5 sm:p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-semibold text-[#1A1A1A] flex items-center gap-2 tracking-tight">
                        <span className="text-xs font-mono text-[#6B7280] bg-[#f8fafc] px-2 py-0.5 rounded-sm border border-[#E5E7EB]">FIG 1.</span>
                        TAMPILAN RADIOGRAF / FOTO
                    </h3>
                    <div className="flex bg-[#f8fafc] rounded-xl p-0.5 border border-[#E5E7EB]">
                        <button
                            onClick={() => setShowOverlay(true)}
                            aria-label="Tampilan beranotasi"
                            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${showOverlay ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`}
                        >
                            Anotasi
                        </button>
                        <button
                            onClick={() => setShowOverlay(false)}
                            aria-label="Tampilan asli"
                            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${!showOverlay ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`}
                        >
                            Asli
                        </button>
                    </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden bg-[#0f172a] shadow-lg shadow-black/5">
                    <img src={preview} alt="Hasil analisis dengan overlay deteksi" className="w-full h-auto max-h-[440px] object-contain block" />
                    {showOverlay && result.detections.map((d) => {
                        const ds = SEVERITY_STYLES[d.style] || SEVERITY_STYLES.mild
                        return (
                            <div
                                key={d.id}
                                className={`absolute border-2 rounded-sm pointer-events-none ${ds.marker}`}
                                style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%` }}
                            >
                                <span className={`absolute -top-5 left-0 text-[10px] font-bold px-1.5 py-px rounded text-white whitespace-nowrap ${ds.label}`}>
                                    {d.severityLabel} {(d.confidence * 100).toFixed(0)}%
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ─── Findings ─── */}
            {result.findings.length > 0 && (
                <div className="card p-5 sm:p-6">
                    <h3 className="text-[15px] font-semibold text-[#1A1A1A] flex items-center gap-2 mb-5 tracking-tight">
                        <span className="text-xs font-mono text-[#6B7280] bg-[#f8fafc] px-2 py-0.5 rounded-sm border border-[#E5E7EB]">DATA</span>
                        TEMUAN DIAGNOSTIK
                    </h3>
                    <div className="space-y-3">
                        {result.findings.map((f, i) => {
                            const fs = SEVERITY_STYLES[f.style] || SEVERITY_STYLES.mild
                            return (
                                <div
                                    key={f.id}
                                    className="flex gap-4 p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#bcccdc] hover:shadow-sm transition-all duration-200"
                                >
                                    <div className={`w-3 h-3 mt-1.5 rounded-full shrink-0 ${fs.dot}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#1A1A1A]">{f.name}</p>
                                        <p className="text-[11px] text-[#4A90A4] font-medium mt-0.5 mb-1.5">📍 {f.region}</p>
                                        <p className="text-xs text-[#6B7280] leading-relaxed">{f.desc}</p>
                                        <div className="flex items-center gap-2.5 mt-3">
                                            <div className="flex-1 h-1.5 bg-[#f0f4f8] rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${fs.bar}`}
                                                    style={{ width: `${f.confidence * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-medium font-mono text-[#6B7280] tabular-nums">
                                                {(f.confidence * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    )
}

/* ─── Sub-components ─── */

function StatCard({ value, label, color }) {
    return (
        <div className="text-center py-3 sm:py-5 px-2 sm:px-3 bg-white border border-[#E5E7EB] rounded-lg hover:shadow-sm transition-all">
            <div className="text-xl sm:text-2xl font-semibold tracking-tight mb-1" style={{ color }}>{value}</div>
            <div className="text-[9px] text-[#6B7280] font-medium uppercase tracking-[0.1em]">{label}</div>
        </div>
    )
}
