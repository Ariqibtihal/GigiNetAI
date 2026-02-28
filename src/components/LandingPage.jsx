export default function LandingPage({ onStartClick }) {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="bg-white py-16 sm:py-24">
                <div className="max-w-[1000px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-fade-in-up">
                        <h1 className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-tight tracking-tight">
                            Deteksi Karang Gigi Secara Cepat dan Akurat
                        </h1>
                        <p className="text-lg text-[#6B7280] leading-relaxed max-w-md">
                            Unggah foto gigi Anda dan dapatkan analisis berbasis AI secara instan dan profesional. Solusi cerdas diagnostik untuk fasilitas medis dan pasien.
                        </p>
                        <button
                            onClick={onStartClick}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-white bg-[#1F3A5F] rounded-[8px] hover:bg-[#192e4c] shadow-sm transition-colors duration-200"
                        >
                            Mulai Deteksi Sekarang
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </div>

                    {/* Right Side - Medical Graphic */}
                    <div className="relative animate-fade-in-up md:block hidden" style={{ animationDelay: '100ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#eef2f6] to-[#f8fafc] rounded-2xl transform rotate-3 scale-105 -z-10"></div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E7EB] aspect-square flex flex-col items-center justify-center text-center">
                            <div className="relative w-48 h-48 mb-6">
                                <div className="absolute inset-0 bg-[#f0f4f8] rounded-full flex items-center justify-center">
                                    <svg className="w-24 h-24 text-[#4A90A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="absolute top-0 right-4 w-4 h-4 rounded-full bg-[#7FBFB3]"></div>
                                <div className="absolute bottom-8 left-0 w-6 h-6 rounded-full bg-[#1F3A5F] opacity-20"></div>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1F3A5F]">AI Diagnostic Engine</h3>
                            <p className="text-sm text-[#6B7280] mt-2">NeuralNet Ver 2.0</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Information */}
            <section className="py-20 bg-[#F8FAFC] border-y border-[#E5E7EB]">
                <div className="max-w-[1000px] mx-auto px-5 text-center mb-16">
                    <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-4">Mengapa Memilih DentalScan AI?</h2>
                    <p className="text-[#6B7280] max-w-2xl mx-auto leading-relaxed">Kami memadukan teknologi kecerdasan buatan mutakhir dengan standar medis untuk memberikan hasil analisis yang andal dan cepat kapan saja diperlukan.</p>
                </div>

                <div className="max-w-[1000px] mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-[#f0f4f8] flex items-center justify-center text-[#4A90A4] mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">Tingkat Akurasi Tinggi</h3>
                        <p className="text-sm text-[#6B7280] leading-relaxed">Sistem kecerdasan buatan kami dilatih dengan dataset klinis terverifikasi untuk mengenali ciri spesifik penyakit dan meminimalisir kesalahan deteksi.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-[#f0f4f8] flex items-center justify-center text-[#4A90A4] mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">Analisis Real-time</h3>
                        <p className="text-sm text-[#6B7280] leading-relaxed">Dapatkan hasil identifikasi karies, plak, maupun karang gigi beserta tingkat keparahan dalam hitungan detik setelah mengunggah gambar rontgen.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-[#f0f4f8] flex items-center justify-center text-[#4A90A4] mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">Kerahasiaan Privasi</h3>
                        <p className="text-sm text-[#6B7280] leading-relaxed">Keamanan data rekam medis pasien adalah prioritas. Foto yang dianalisis akan segera dihapus permanen dari sistem setelah laporan dihasilkan.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="max-w-[1000px] mx-auto px-5 flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2 w-full order-2 md:order-1">
                        <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 relative overflow-hidden h-[400px] flex items-center justify-center shadow-inner">
                            <div className="absolute inset-0 border-2 border-dashed border-[#bcccdc] opacity-30 m-6 rounded-3xl animate-[spin_60s_linear_infinite]"></div>
                            <div className="w-64 h-64 bg-white shadow-xl shadow-[#1F3A5F]/10 rounded-xl border border-[#E5E7EB] p-5 flex flex-col items-center justify-center z-10 relative">
                                <div className="w-full h-32 bg-[#eef2f6] rounded-lg mb-4 overflow-hidden relative border border-[#E5E7EB]">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A90A4]/20 to-transparent animate-shimmer"></div>
                                    <svg className="w-20 h-20 text-[#4A90A4] opacity-50 m-auto mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="h-2 w-3/4 bg-[#E5E7EB] rounded-full mb-2.5"></div>
                                <div className="h-2 w-1/2 bg-[#E5E7EB] rounded-full mb-4"></div>
                                <div className="w-full flex gap-2">
                                    <div className="h-6 flex-1 bg-[#f0fdf4] border border-[#bbf7d0] rounded pt-1"><div className="w-4 h-1 bg-[#22c55e] ml-2 rounded-full"></div></div>
                                    <div className="h-6 flex-1 bg-[#fef2f2] border border-[#fecaca] rounded pt-1"><div className="w-4 h-1 bg-[#ef4444] ml-2 rounded-full"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 order-1 md:order-2">
                        <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-8">Cara Kerja AI Kami</h2>
                        <div className="space-y-8">
                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-xl bg-[#f0f4f8] border border-[#d9e2ec] text-[#1F3A5F] flex items-center justify-center font-bold shrink-0 text-sm">01</div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#1A1A1A] mb-1.5">Unggah Foto Radiologi / Intraoral</h4>
                                    <p className="text-sm text-[#6B7280] leading-relaxed">Ambil gambar rongga mulut atau foto rontgen gigi pasien yang akan didiagnosa. Pastikan gambar cukup terang, tidak blur, dan fokus pada area target.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-xl bg-[#f0f4f8] border border-[#d9e2ec] text-[#1F3A5F] flex items-center justify-center font-bold shrink-0 text-sm">02</div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#1A1A1A] mb-1.5">Algoritma Memindai Pixel</h4>
                                    <p className="text-sm text-[#6B7280] leading-relaxed">Artificial Intelligence akan melakukan segmentasi gambar dan mendeteksi anomali pada gigi seperti karies atau plak melalui pengenalan pola yang ekstensif.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-xl bg-[#f0f4f8] border border-[#d9e2ec] text-[#1F3A5F] flex items-center justify-center font-bold shrink-0 text-sm">03</div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#1A1A1A] mb-1.5">Terima Laporan Laporan</h4>
                                    <p className="text-sm text-[#6B7280] leading-relaxed">Sistem akan segera memberikan hasil pemindaian langsung dalam bentuk diagram anotasi, laporan metrik klinis, serta panduan rekomendasi penanganan sementara.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1F3A5F] text-center px-5">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-semibold text-white mb-6 tracking-tight">Siap Memeriksa Kesehatan Gigi Hari Ini?</h2>
                    <p className="text-[#9fb3c8] mb-8 text-lg leading-relaxed">Coba alat demonstrasi klinis AI dari DentalScan secara instan tanpa perlu mendaftar. Lihat keakuratannya dengan foto gigi Anda sendiri!</p>
                    <button
                        onClick={onStartClick}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#1F3A5F] bg-white rounded-[8px] hover:bg-[#F8FAFC] shadow-lg transition-transform hover:-translate-y-0.5"
                    >
                        Mulai Analisis Pasien
                    </button>
                    <p className="text-[11px] text-[#4A90A4] font-medium tracking-wide mt-6 uppercase">
                        DentalScan AI Clinical Engine v2.0
                    </p>
                </div>
            </section>
        </div>
    )
}
