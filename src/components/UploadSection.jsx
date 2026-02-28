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

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragging(false)
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
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2 tracking-tight">Upload Foto Gigi</h2>
                    <p className="text-[#6B7280]">
                        Unggah gambar klinis gigi Anda untuk analisis berbasis AI secara instan dan profesional.
                    </p>
                </div>

                {!preview ? (
                    /* ─── Empty State: Drop Zone ─── */
                    <>
                        <div
                            role="button"
                            tabIndex={0}
                            aria-label="Klik atau seret file untuk mengunggah foto gigi"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={openPicker}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
                            className={`relative group cursor-pointer rounded-[12px] border-2 border-dashed transition-all duration-300 ease-out flex flex-col items-center justify-center p-12 sm:p-16
                ${isDragging
                                    ? 'border-[#1F3A5F] bg-[#f0f4f8] scale-[1.01]'
                                    : 'border-[#E5E7EB] hover:border-[#4A90A4] hover:bg-[#f8fafc]'
                                }`}
                        >
                            <svg className="w-12 h-12 text-[#4A90A4] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Upload Foto Klinis</h3>
                            <p className="text-[#6B7280] mb-4 text-center max-w-sm">Pilih file atau seret file Anda ke area ini. Pastikan gambar jelas dan terang.</p>
                            <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">
                                JPG, PNG (Maks 10MB)
                            </p>
                        </div>

                        {/* Guidelines */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                            <TipCard
                                title="01. Pencahayaan"
                                desc="Gunakan cahaya terang dan merata."
                            />
                            <TipCard
                                title="02. Fokus"
                                desc="Pastikan gambar tajam tidak blur."
                            />
                            <TipCard
                                title="03. Sudut"
                                desc="Ambil dari depan dengan jelas."
                            />
                        </div>
                    </>
                ) : (
                    /* ─── Preview State ─── */
                    <>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]/60">
                                <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" />
                                STATUS: SIAP
                            </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0F172A] mb-4">Pratinjau Gambar</h3>

                        <div className="relative rounded-2xl overflow-hidden bg-[#0f172a] shadow-xl shadow-black/10 group">
                            <img
                                src={preview}
                                alt="Pratinjau foto gigi yang diunggah"
                                className="w-full h-auto max-h-[420px] object-contain block"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                            {/* File info */}
                            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                                <div className="truncate pr-4">
                                    <p className="text-sm font-semibold text-white drop-shadow-md truncate">{file.name}</p>
                                    <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">{fileSize} · {fileExt}</p>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); openPicker() }}
                                        className="flex-1 sm:flex-none px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest text-[#0F172A] bg-white hover:bg-[#e2e8f0] transition-colors duration-200"
                                    >
                                        Ganti
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onRemove() }}
                                        className="flex-1 sm:flex-none px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest text-white bg-[#EF4444] hover:bg-[#dc2626] transition-colors duration-200"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

/* ─── Sub Components ─── */

function TipCard({ title, desc }) {
    return (
        <div className="flex flex-col p-4 border border-[#E5E7EB] rounded-lg bg-white text-center hover:shadow-sm transition-shadow">
            <p className="text-sm font-semibold text-[#1A1A1A] mb-1">{title}</p>
            <p className="text-xs text-[#6B7280] leading-relaxed">{desc}</p>
        </div>
    )
}
