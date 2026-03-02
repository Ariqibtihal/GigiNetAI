import { useState } from 'react'
import { useToast } from './Toast'
import { generateClinicalPDF } from '../lib/pdfGenerator'

export default function RecommendationSection({ recommendations, severity, onNewScan, result, preview }) {
    const toast = useToast()
    const [isDownloading, setIsDownloading] = useState(false)

    const handleDownload = async () => {
        try {
            setIsDownloading(true)
            toast.info('Menyiapkan dokumen PDF...')
            const pid = `PT-${Math.floor(Math.random() * 10000)}`
            await generateClinicalPDF('dentascan-report', pid, result, preview)
            toast.success('Laporan PDF berhasil diunduh!')
        } catch (err) {
            console.error(err)
            toast.error('Gagal membuat PDF: ' + err.message)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <section className="animate-fade-in-up space-y-4" style={{ animationDelay: '120ms' }}>
            {/* ─── Recommendation Card ─── */}
            <div className="card p-6 sm:p-8">
                <h3 className="text-[15px] font-semibold text-[#1A1A1A] flex items-center gap-2 mb-5 tracking-tight border-b-2 border-[#1A1A1A] pb-1">
                    <span className="text-xs font-mono text-[#6B7280] bg-[#f8fafc] px-2 py-0.5 rounded-sm border border-[#E5E7EB]">PLAN</span>
                    REKOMENDASI
                </h3>

                <div className="space-y-0">
                    {recommendations.map((rec, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 py-4 border-b border-[#E5E7EB] last:border-b-0 animate-fade-in-up"
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            {/* Indicator */}
                            <div className="text-[#4A90A4] font-mono text-xs font-medium pt-1">
                                [{String(i + 1).padStart(2, '0')}]
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1A1A1A] leading-snug">{rec.title}</p>
                                <p className="text-xs text-[#6B7280] leading-relaxed mt-1">{rec.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Action Buttons ─── */}
            <div className="flex flex-wrap gap-3 mt-6">
                <button onClick={onNewScan} className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white bg-[#1F3A5F] hover:bg-[#192e4c] rounded-[8px] transition-colors duration-200 shadow-sm hover:shadow">
                    Mulai Deteksi Baru
                </button>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-[#1F3A5F] bg-white border border-[#1F3A5F]/20 hover:bg-[#f0f4f8] hover:border-[#1F3A5F]/40 rounded-[8px] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isDownloading ? 'MEMPROSES...' : 'Unduh Laporan PDF'}
                </button>
            </div>

            {/* ─── Disclaimer ─── */}
            <div className="flex gap-3 p-4 bg-[#fffbeb] border border-[#fef08a] rounded-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f59e0b]" />
                <div className="text-xs font-bold text-[#b45309] font-mono shrink-0 uppercase tracking-widest mt-0.5">
                    ATTN:
                </div>
                <div className="text-xs text-[#a16207] leading-relaxed">
                    <strong className="block mb-0.5 font-semibold text-[#92400e]">Disclaimer Medis</strong>
                    Analisis ini dihasilkan oleh simulasi AI dan TIDAK boleh digunakan sebagai pengganti saran dokter gigi profesional.
                    Selalu konsultasikan ke dokter gigi berlisensi untuk diagnosis dan pengobatan. NeuroDent hanya alat demonstrasi.
                </div>
            </div>
        </section>
    )
}
