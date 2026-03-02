import React, { useState } from 'react'
import { useToast } from './Toast'

export default function ContactPage() {
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        // Simulate sending email
        setTimeout(() => {
            setLoading(false)
            toast.success('Pesan Anda telah terkirim! Tim kami akan segera merespons.')
            e.target.reset()
        }, 1500)
    }

    return (
        <div className="animate-fade-in-up w-full max-w-[900px] mx-auto px-5 py-12 md:py-20">

            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f4f8] border border-[#E5E7EB] mb-2">
                    <span className="text-xs font-semibold text-[#1F3A5F] tracking-wide uppercase">Hubungi Kami</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight">
                    Ada Pertanyaan Klinis atau <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F3A5F] to-[#4A90A4]">Teknis AI?</span>
                </h1>
                <p className="text-[#6B7280] text-lg leading-relaxed pt-2">
                    Tim dukungan kami dari divisi medis dan *machine learning* siap membantu Anda kapan saja.
                </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">

                {/* Form Section */}
                <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:border-[#bcccdc] transition-all">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Kirimkan Pesan</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[#1F3A5F] tracking-tight">Nama Lengkap</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Dr. John Doe"
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#4A90A4]/20 focus:border-[#4A90A4] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[#1F3A5F] tracking-tight">Email Aktif</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="john@hospital.com"
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#4A90A4]/20 focus:border-[#4A90A4] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#1F3A5F] tracking-tight">Topik Keluhan</label>
                            <select className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#4A90A4]/20 focus:border-[#4A90A4] transition-all">
                                <option>Integrasi API ke Klinik</option>
                                <option>Pertanyaan Medis/Akurasi</option>
                                <option>Sistem Error/Bug</option>
                                <option>Lainnya</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#1F3A5F] tracking-tight">Detail Pesan</label>
                            <textarea
                                required
                                rows="4"
                                placeholder="Jelaskan secara detail pesan Anda..."
                                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#4A90A4]/20 focus:border-[#4A90A4] transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-3.5 bg-[#1F3A5F] text-white font-semibold rounded-lg hover:bg-[#192e4c] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </>
                            ) : 'Kirim Pesan'}
                        </button>
                    </form>
                </div>

                {/* Info Section */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
                        <div className="w-10 h-10 bg-[#f0f4f8] rounded-full flex items-center justify-center mb-4 border border-[#e2e8f0]">
                            <svg className="w-5 h-5 text-[#4A90A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 className="text-sm font-bold text-[#1F3A5F] tracking-tight mb-1">Email Resmi</h4>
                        <p className="text-sm text-[#6B7280]">support@dentalscan.ai</p>
                        <p className="text-xs text-[#94a3b8] mt-1">SLA Respons maksimal 24 Jam.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
                        <div className="w-10 h-10 bg-[#f0f4f8] rounded-full flex items-center justify-center mb-4 border border-[#e2e8f0]">
                            <svg className="w-5 h-5 text-[#4A90A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h4 className="text-sm font-bold text-[#1F3A5F] tracking-tight mb-1">Kantor Utama</h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed">
                            Gedung Cipta AI, Lt 8.<br />
                            Silicon Valley Medical District,<br />
                            Kawasan Sudirman, ID.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
