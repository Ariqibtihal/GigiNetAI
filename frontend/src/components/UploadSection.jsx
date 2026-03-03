import { useState, useCallback, useRef } from 'react'
import { useToast } from './Toast'

export default function UploadSection({ file, preview, onFileSelect, onRemove }) {
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef(null)
    const toast = useToast()

    const validateAndSelect = useCallback((f) => {
        const allowed = ['image/jpeg', 'image/png']
        if (!allowed.includes(f.type)) {
            toast.warning('Format tidak didukung. Gunakan JPG atau PNG.')
            return
        }
        if (f.size > 10 * 1024 * 1024) {
            toast.warning('Ukuran file maksimal 10 MB.')
            return
        }
        onFileSelect(f)
    }, [onFileSelect, toast])

    const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true) }, [])
    const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false) }, [])
    const handleDrop = useCallback((e) => {
        e.preventDefault(); setIsDragging(false)
        const f = e.dataTransfer.files?.[0]
        if (f) validateAndSelect(f)
    }, [validateAndSelect])
    const handleChange = useCallback((e) => {
        const f = e.target.files?.[0]
        if (f) validateAndSelect(f)
    }, [validateAndSelect])

    const openPicker = () => inputRef.current?.click()
    const fileSize = file ? (file.size < 1024 * 1024 ? (file.size / 1024).toFixed(1) + ' KB' : (file.size / (1024 * 1024)).toFixed(1) + ' MB') : ''
    const fileExt = file?.name?.split('.').pop()?.toUpperCase() || ''

    return (
        <section className="animate-fade-in-up">
            <input
                ref={inputRef}
                id="file-input"
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleChange}
            />

            <div className="card p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#eef5ff] to-[#ddeeff] text-[#4A90A4] mb-4 shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#0f172a] mb-2 tracking-tight">Upload Foto Gigi</h2>
                    <p className="text-[#64748b] text-[15px]">
                        Unggah gambar klinis untuk analisis AI secara instan dan profesional.
                    </p>
                </div>

                {!preview ? (
                    <>
                        {/* ─── Drop Zone ─── */}
                        <div
                            role="button"
                            tabIndex={0}
                            aria-label="Klik atau seret file untuk mengunggah"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={openPicker}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
                            className={`drop-zone cursor-pointer flex flex-col items-center justify-center p-12 sm:p-16 transition-all duration-300 ${isDragging ? 'dragging scale-[1.01]' : ''}`}
                        >
                            {/* Upload icon with animation */}
                            <div className={`relative mb-5 transition-transform duration-300 ${isDragging ? '-translate-y-2' : ''}`}>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#eef5ff] to-[#ddeeff] flex items-center justify-center shadow-md">
                                    <svg className={`w-8 h-8 text-[#4A90A4] transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                {isDragging && (
                                    <div className="absolute -inset-3 rounded-full border-2 border-[#4A90A4]/40 animate-ping" />
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-[#0f172a] mb-2">
                                {isDragging ? 'Lepaskan File di Sini' : 'Klik atau Seret File'}
                            </h3>
                            <p className="text-[#64748b] text-sm text-center max-w-sm mb-4">
                                Pilih file dari perangkat Anda atau seret langsung ke area ini. Pastikan foto jelas dan pencahayaan merata.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#dde8f0] rounded-full shadow-sm">
                                <svg className="w-3.5 h-3.5 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-[11px] font-semibold text-[#64748b] tracking-wide uppercase">JPG, PNG · Maks 10 MB</span>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                            <TipCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                                title="Pencahayaan"
                                desc="Pastikan pencahayaan natural dan merata, hindari silau atau bayangan gelap pada gigi."
                            />
                            <TipCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>}
                                title="Fokus Tajam"
                                desc="Kamera harus diam untuk mencegah blur. Semakin detail visualnya, diagnosis semakin akurat."
                            />
                            <TipCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>}
                                title="Sudut Tepat"
                                desc="Arahkan lensa tegak lurus ke depan, pastikan seluruh rentang gigi berada di dalam area frame."
                            />
                        </div>

                        {/* Supported Classes Info */}
                        <div className="mt-8 border-t border-[#f1f5f9] pt-6">
                            <h4 className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest text-center mb-4">
                                Kapabilitas Deteksi AI Saat Ini
                            </h4>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['✅ Gigi Sehat', '🦷 Karies (Lubang)', '🪨 Karang Gigi (Kalkulus)', '🩸 Gingivitis', '🤒 Sariawan (Ulser)', '☕ Diskolorasi (Noda)'].map((item) => (
                                    <span key={item} className="px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] text-[12px] font-semibold rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    /* ─── Preview State ─── */
                    <>
                        {/* Status badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]">
                                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                                    Foto Siap Dianalisis
                                </span>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemove() }}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-full hover:bg-[#fee2e2] transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Hapus
                            </button>
                        </div>

                        {/* Image preview */}
                        <div className="relative rounded-2xl overflow-hidden bg-[#0f172a] shadow-2xl shadow-black/20 group">
                            <img
                                src={preview}
                                alt="Pratinjau foto gigi"
                                className="w-full h-auto max-h-[440px] object-contain block group-hover:scale-[1.01] transition-transform duration-500"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                            {/* File info overlay */}
                            <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                        <svg className="w-4.5 h-4.5 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-[10px] text-white/60 mt-0.5">{fileSize} · {fileExt}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); openPicker() }}
                                    className="flex-none px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide text-[#0f172a] bg-white/90 hover:bg-white transition-colors shadow-sm"
                                >
                                    Ganti Foto
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

function TipCard({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-center text-center p-4 border border-[#e8eef5] rounded-[1.25rem] bg-white shadow-[0_2px_10px_rgb(0,0,0,0.01)] hover:shadow-md hover:-translate-y-0.5 hover:border-[#dde8f0] transition-all duration-300 gap-3 group">
            <div className="w-10 h-10 rounded-[14px] bg-[#eef5ff] text-[#4A90A4] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4A90A4] group-hover:text-white transition-all duration-300 shadow-sm border border-[#e2eaf5] group-hover:border-transparent">
                {icon}
            </div>
            <div>
                <p className="text-[13px] font-bold text-[#1F3A5F] tracking-wide mb-1.5">{title}</p>
                <p className="text-[11.5px] text-[#64748b] leading-relaxed px-1">{desc}</p>
            </div>
        </div>
    )
}
