import { useState, useEffect } from 'react'

export default function HistorySection({ onBack }) {
    const [history, setHistory] = useState([])

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('dentascan_history') || '[]')
            setHistory(data)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const clearHistory = () => {
        if (window.confirm('Hapus semua riwayat scan?')) {
            localStorage.removeItem('dentascan_history')
            setHistory([])
        }
    }

    return (
        <section className="animate-fade-in-up space-y-4 text-[#0F172A]">
            <div className="card p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 border-b-2 border-[#1E293B] pb-2">
                    <h2 className="text-lg font-bold flex items-center gap-2.5 tracking-tight uppercase">
                        <div className="w-2.5 h-2.5 bg-[#1E293B]" />
                        Riwayat Analisis
                    </h2>
                    {history.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="text-[10px] uppercase font-bold text-[#EF4444] hover:underline"
                        >
                            [ Clear All ]
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div className="text-center py-12 bg-[#f8fafc] border border-dashed border-[#cbd5e1] rounded-lg">
                        <p className="text-sm font-semibold text-[#64748B] mb-1">DATA KOSONG</p>
                        <p className="text-xs text-[#94a3b8] font-mono">Belum ada riwayat pemindaian.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-[#e2e8f0] bg-[#f8fafc] hover:border-[#cbd5e1] transition-colors rounded-sm">
                                <div>
                                    <div className="text-[10px] font-mono font-bold text-[#94a3b8] mb-1 uppercase tracking-widest">
                                        ID: {item.id} · {new Date(item.timestamp).toLocaleString('id-ID')}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.severityColor }} />
                                        <p className="text-sm font-bold uppercase tracking-wide">
                                            {item.severityLabel}
                                        </p>
                                    </div>
                                    <p className="text-xs text-[#64748B] mt-0.5">
                                        Skor: {item.score} / 100 · Temuan: {item.detectionsCount} area
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={onBack} className="w-full px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#0F172A] bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] rounded-md transition-colors duration-200">
                Kembali ke Beranda
            </button>
        </section>
    )
}
