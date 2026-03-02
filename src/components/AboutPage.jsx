import React from 'react'

export default function AboutPage() {
    return (
        <div className="animate-fade-in-up w-full max-w-[900px] mx-auto px-5 py-12 md:py-20 space-y-12">

            {/* Header Section */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f4f8] border border-[#E5E7EB] mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#4A90A4] animate-pulse"></span>
                    <span className="text-xs font-semibold text-[#1F3A5F] tracking-wide uppercase">Tentang Kami</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight">
                    Revolusi Diagnosis Gigi dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F3A5F] to-[#4A90A4]">Kecerdasan Buatan</span>
                </h1>
                <p className="text-[#6B7280] text-lg leading-relaxed pt-2">
                    GigiNet AI hadir untuk menjembatani kesenjangan antara teknologi masa depan dan kesehatan klinis sehari-hari.
                </p>
            </div>

            {/* Content Cards */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Visi */}
                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#f0f4f8] rounded-xl flex items-center justify-center mb-6 border border-[#e2e8f0]">
                        <svg className="w-6 h-6 text-[#1F3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Visi Kami</h3>
                    <p className="text-[#6B7280] leading-relaxed">
                        Memberdayakan setiap individu dan praktisi kesehatan dengan alat skrining dini presisi tinggi. Kami percaya bahwa pencegahan yang didukung analisis data dapat menyelamatkan ribuan struktur gigi sebelum kerusakan menjadi permanen.
                    </p>
                </div>

                {/* Teknologi */}
                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#f0f4f8] rounded-xl flex items-center justify-center mb-6 border border-[#e2e8f0]">
                        <svg className="w-6 h-6 text-[#1F3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Teknologi Inti</h3>
                    <p className="text-[#6B7280] leading-relaxed">
                        Ditenagai oleh arsitektur <strong className="text-[#1F3A5F] font-semibold">YOLOv8</strong> dan <strong className="text-[#1F3A5F] font-semibold">Convolutional Neural Networks (CNN)</strong>. AI kami dilatih dengan ribuan dataset radiografi dan citra intraoral medis untuk mengenali anomali struktural mikroskopis pada email gigi.
                    </p>
                </div>
            </div>

            {/* Team / Disclaimer Section */}
            <div className="bg-[#1F3A5F] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Komitmen Klinis</h3>
                <p className="text-[#B0C4DE] max-w-2xl mx-auto leading-relaxed relative z-10">
                    Meskipun algoritma kecerdasan buatan kami memiliki tingkat akurasi yang diasah secara medis, hasil dari GigiNet AI berfungsi sebagai <span className="text-white font-medium">Langkah Skrining Awal (Screening Tool)</span>. Diagnosa akhir dan tindakan invasif harus selalu diputuskan oleh Dokter Gigi Profesional melalui pemeriksaan klinis fisik.
                </p>
            </div>

        </div>
    )
}
