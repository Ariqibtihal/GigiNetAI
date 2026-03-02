import { useEffect, useRef } from 'react'

/* ─── Stat Counter ─── */
function StatItem({ value, label, suffix = '' }) {
    return (
        <div className="flex flex-col items-center gap-1 animate-count-up">
            <span className="stat-number gradient-text">{value}<span className="text-[#4A90A4]">{suffix}</span></span>
            <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest">{label}</span>
        </div>
    )
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, title, desc, delay = 0 }) {
    return (
        <div className="feature-card animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
            <div className="w-11 h-11 rounded-[13px] bg-gradient-to-br from-[#eef5ff] to-[#ddeeff] flex items-center justify-center text-[#4A90A4] mb-5 shadow-sm">
                {icon}
            </div>
            <h3 className="text-base font-bold text-[#0f172a] mb-2">{title}</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>
        </div>
    )
}

/* ─── Step Card ─── */
function StepCard({ num, imgSrc, title, desc, delay = 0 }) {
    return (
        <div
            className="flex flex-col sm:flex-row gap-5 bg-white p-5 rounded-2xl border border-[#e8eef5] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="relative w-full sm:w-24 h-28 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-[#eef4f8] shadow-inner">
                <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-white shadow text-[#1F3A5F] flex items-center justify-center font-bold text-[11px] ring-1 ring-black/5">
                    {num}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <h4 className="text-base font-bold text-[#0f172a] mb-1.5">{title}</h4>
                <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

/* ─── Floating Badge ─── */
function FloatingBadge({ children, className = '', style = {} }) {
    return (
        <div
            className={`absolute animate-float card-glass px-3 py-2 text-xs font-bold text-[#1F3A5F] shadow-lg ${className}`}
            style={{ borderRadius: 12, animationDuration: '3.5s', ...style }}
        >
            {children}
        </div>
    )
}

export default function LandingPage({ onStartClick }) {
    return (
        <div className="flex flex-col w-full overflow-x-hidden">

            {/* ════════════════════════════════════════
                HERO
            ════════════════════════════════════════ */}
            <section className="relative bg-white py-20 sm:py-28 overflow-hidden">
                {/* Background orbs */}
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#e0eefc] opacity-40 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#d4eef5] opacity-35 blur-[70px] pointer-events-none" />

                <div className="max-w-[1060px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-14 items-center relative z-10">
                    {/* Left */}
                    <div className="space-y-7 animate-fade-in-up">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#eef5ff] border border-[#c5daf5] rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A90A4] animate-pulse" />
                            <span className="text-[11px] font-bold text-[#1F3A5F] uppercase tracking-widest">AI Diagnostik Gigi</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.12] tracking-tight">
                            <span className="gradient-text-hero">Deteksi Penyakit Gigi</span>
                            <br />
                            <span className="text-[#4A90A4]">Cepat</span> &amp; <span className="text-[#4A90A4]">Akurat</span>
                        </h1>

                        <p className="text-[17px] text-[#64748b] leading-relaxed max-w-md">
                            Unggah foto gigi Anda dan dapatkan analisis berbasis AI secara instan. Solusi diagnostik cerdas untuk karies, karang gigi, dan lebih banyak lagi.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={onStartClick}
                                id="hero-cta-btn"
                                className="btn-primary text-[15px] px-7 py-3.5 gap-2.5"
                            >
                                Mulai Deteksi Sekarang
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Trust signals */}
                        <div className="flex items-center gap-6 pt-2">
                            {[
                                { v: '97%', l: 'Akurasi' },
                                { v: '< 5s', l: 'Analisis' },
                                { v: 'GRATIS', l: 'Tanpa Daftar' },
                            ].map(({ v, l }) => (
                                <div key={l} className="text-center">
                                    <div className="text-lg font-extrabold text-[#1F3A5F]">{v}</div>
                                    <div className="text-[10.5px] text-[#94a3b8] uppercase tracking-wider font-semibold">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Illustration */}
                    <div
                        className="relative md:block hidden animate-fade-in-up"
                        style={{ animationDelay: '120ms' }}
                    >
                        {/* Card frame */}
                        <div className="relative bg-gradient-to-br from-[#eef4fb] to-[#dff0f5] rounded-[2rem] aspect-square flex items-center justify-center overflow-hidden border border-white shadow-xl shadow-[#1F3A5F]/08">
                            {/* Soft inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

                            {/* Animated ring */}
                            <div className="absolute inset-8 border-2 border-dashed border-[#4A90A4]/20 rounded-full animate-spin-slow" />

                            {/* Dokter SVG */}
                            <img
                                src="/maskot.png"
                                alt="drg. GigiNet"
                                className="w-64 h-64 object-contain drop-shadow-xl animate-float z-10 relative"
                                style={{ animationDuration: '3.5s' }}
                            />

                            {/* Scan line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4A90A4]/60 to-transparent animate-float opacity-60" style={{ animationDuration: '2s' }} />

                            {/* Gradient fade bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#eef4fb] to-transparent" />
                            <div className="absolute bottom-4 text-center z-10">
                                <p className="text-xs font-bold text-[#1F3A5F]">drg. GigiNet AI</p>
                                <p className="text-[10px] text-[#64748b]">Dental Engine v2.0</p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                STATS BAR
            ════════════════════════════════════════ */}
            <section className="bg-gradient-to-r from-[#1F3A5F] via-[#244672] to-[#1F3A5F] py-8">
                <div className="max-w-[1060px] mx-auto px-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-white/10">
                        {[
                            { value: '97', suffix: '%', label: 'Akurasi AI' },
                            { value: '5', suffix: 'x', label: 'Jenis Penyakit' },
                            { value: '< 5', suffix: 's', label: 'Waktu Analisis' },
                            { value: '100', suffix: '%', label: 'Data Terenkripsi' },
                        ].map(({ value, suffix, label }) => (
                            <div key={label} className="flex flex-col items-center gap-1 px-4">
                                <span className="text-3xl font-extrabold text-white tracking-tight">
                                    {value}<span className="text-[#7FBFB3]">{suffix}</span>
                                </span>
                                <span className="text-[10.5px] font-semibold text-[#9fb3c8] uppercase tracking-widest">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                FEATURES
            ════════════════════════════════════════ */}
            <section className="py-24 bg-[#f4f7fb]">
                <div className="max-w-[1060px] mx-auto px-5">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#eef5ff] border border-[#c5daf5] rounded-full mb-5">
                            <span className="text-[11px] font-bold text-[#4A90A4] uppercase tracking-widest">Keunggulan Platform</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mb-4 tracking-tight">
                            Mengapa Memilih <span className="gradient-text">GigiNet AI?</span>
                        </h2>
                        <p className="text-[#64748b] max-w-2xl mx-auto text-[16px] leading-relaxed">
                            Kami memadukan kecerdasan buatan mutakhir dengan standar medis klinis untuk memberikan analisis yang andal dan cepat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard
                            delay={0}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="Akurasi Tinggi"
                            desc="Model AI dilatih pada ribuan dataset klinis terverifikasi untuk mengenali karies, karang gigi, ulkus, dan diskolorasi secara presisi."
                        />
                        <FeatureCard
                            delay={80}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            }
                            title="Analisis Real-time"
                            desc="Identifikasi penyakit beserta anotasi bounding box dan tingkat keparahan klinis tersedia dalam hitungan detik setelah foto diunggah."
                        />
                        <FeatureCard
                            delay={160}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                            title="Privasi Terjaga"
                            desc="Data gambar tidak pernah disimpan permanen. Seluruh transmisi terenkripsi end-to-end untuk menjamin kerahasiaan rekam medis."
                        />
                        <FeatureCard
                            delay={80}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                            title="Laporan PDF Lengkap"
                            desc="Ekspor hasil analisis ke dokumen PDF profesional yang siap dibagikan kepada pasien atau dokter gigi untuk tindak lanjut klinis."
                        />
                        <FeatureCard
                            delay={160}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="Riwayat Analisis"
                            desc="Pantau dan bandingkan hasil pemeriksaan dari waktu ke waktu dengan fitur riwayat yang tersimpan lokal di perangkat Anda."
                        />
                        <FeatureCard
                            delay={240}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                </svg>
                            }
                            title="Multi-format Input"
                            desc="Mendukung foto langsung dari kamera, gambar rontgen panoramik, maupun foto klinis biasa dalam format JPG dan PNG."
                        />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                HOW IT WORKS
            ════════════════════════════════════════ */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Decorative bg */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#eef5ff] rounded-full opacity-40 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-[1060px] mx-auto px-5 flex flex-col md:flex-row gap-16 items-center relative z-10">
                    {/* Mock UI */}
                    <div className="md:w-1/2 w-full order-2 md:order-1">
                        <div className="relative bg-[#f4f8fb] border border-[#dde8f0] rounded-2xl p-6 h-[420px] flex items-center justify-center shadow-inner overflow-hidden">
                            {/* Spinning border */}
                            <div className="absolute inset-5 border-2 border-dashed border-[#b8d0e0]/40 rounded-3xl animate-spin-slow" />

                            {/* Mock card */}
                            <div className="w-72 bg-white shadow-2xl shadow-[#1F3A5F]/10 rounded-2xl border border-[#e2eaf2] p-5 flex flex-col items-center z-10 relative">
                                {/* Mock image area */}
                                <div className="w-full h-36 bg-gradient-to-br from-[#eef4fb] to-[#ddeef5] rounded-xl mb-4 relative overflow-hidden border border-[#dde8f2]">
                                    <div className="absolute inset-0 animate-shimmer" />
                                    <svg className="w-16 h-16 text-[#4A90A4] opacity-30 absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {/* Bounding boxes mock */}
                                    <div className="absolute top-4 left-6 w-12 h-8 border-2 border-[#f59e0b] rounded-md bg-[#f59e0b]/10">
                                        <span className="absolute -top-4 left-0 text-[8px] font-bold text-[#f59e0b] bg-white px-1 rounded">Karies</span>
                                    </div>
                                    <div className="absolute top-10 right-8 w-9 h-6 border-2 border-[#ef4444] rounded-md bg-[#ef4444]/10">
                                        <span className="absolute -top-4 left-0 text-[8px] font-bold text-[#ef4444] bg-white px-1 rounded">Parah</span>
                                    </div>
                                </div>

                                {/* Skor */}
                                <div className="flex items-center gap-4 w-full mb-3">
                                    <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                                        <div className="h-full w-[64%] bg-gradient-to-r from-[#f59e0b] to-[#f97316] rounded-full" />
                                    </div>
                                    <span className="text-sm font-bold text-[#f97316]">64</span>
                                </div>

                                <div className="flex w-full gap-2">
                                    <div className="flex-1 py-1.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg text-center text-[9px] font-bold text-[#15803d]">✓ SEHAT</div>
                                    <div className="flex-1 py-1.5 bg-[#fef2f2] border border-[#fecaca] rounded-lg text-center text-[9px] font-bold text-[#ef4444]">⚠ KARIES</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="md:w-1/2 order-1 md:order-2">
                        <div className="mb-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#eef5ff] border border-[#c5daf5] rounded-full mb-4">
                                <span className="text-[11px] font-bold text-[#4A90A4] uppercase tracking-widest">Cara Kerja</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                                3 Langkah Mudah
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <StepCard num="1" imgSrc="/step1.png" title="Unggah Foto Klinis Gigi" desc="Ambil gambar rongga mulut atau foto rontgen. Pastikan cukup terang dan tidak buram." delay={0} />
                            <StepCard num="2" imgSrc="/step2.png" title="AI Memindai Setiap Piksel" desc="Algoritma mendeteksi karies, karang, ulkus, dan anomali lainnya secara mendalam." delay={100} />
                            <StepCard num="3" imgSrc="/step3.png" title="Terima Laporan Diagnostik" desc="Anotasi, skor klinis, dan rekomendasi tindak lanjut tersedia dalam hitungan detik." delay={200} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                CTA SECTION
            ════════════════════════════════════════ */}
            <section className="relative py-24 overflow-hidden">
                {/* Beautiful gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F3A5F] via-[#1a4471] to-[#0f2a48]" />
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(74,144,164,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(127,191,179,0.3) 0%, transparent 50%)'
                }} />
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />

                <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-[18px] bg-white/10 border border-white/20 mb-8 animate-float">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight tracking-tight">
                        Siap Memeriksa Kesehatan Gigi Anda?
                    </h2>
                    <p className="text-[#9fb3c8] mb-10 text-[17px] leading-relaxed max-w-xl mx-auto">
                        Coba alat diagnostik AI dari GigiNet secara instan — gratis dan tanpa perlu mendaftar. Lihat keakuratannya sendiri!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onStartClick}
                            id="cta-start-btn"
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[15px] font-bold text-[#1F3A5F] bg-white rounded-xl hover:bg-[#f0f6ff] shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                        >
                            <svg className="w-5 h-5 text-[#4A90A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            Mulai Analisis Sekarang
                        </button>
                    </div>

                    <p className="text-[11px] text-[#4A90A4] font-semibold tracking-widest mt-8 uppercase opacity-70">
                        GigiNet AI Clinical Engine v2.0  •  Tidak perlu registrasi
                    </p>
                </div>
            </section>
        </div>
    )
}
