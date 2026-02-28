export default function HeroSection({ onStartClick }) {
    return (
        <section className="bg-white border-b border-[#E5E7EB] py-16 sm:py-24">
            <div className="max-w-[1000px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-tight tracking-tight">
                        Deteksi Karang Gigi Secara Cepat dan Akurat
                    </h1>
                    <p className="text-lg text-[#6B7280] leading-relaxed max-w-md">
                        Upload foto gigi Anda dan dapatkan analisis berbasis AI secara instan dan profesional.
                    </p>
                    <button
                        onClick={onStartClick}
                        className="btn-primary rounded-[8px] bg-[#1F3A5F] hover:bg-[#192e4c] text-white px-8 py-3.5 text-sm font-medium shadow-sm"
                    >
                        Mulai Deteksi
                    </button>

                    {/* Features Row */}
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E7EB] mt-8">
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#f0f4f8] flex items-center justify-center text-[#4A90A4] mb-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h4 className="font-semibold text-[#1A1A1A] text-sm mb-1">Akurat</h4>
                            <p className="text-xs text-[#6B7280]">Validasi AI</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#f0f4f8] flex items-center justify-center text-[#4A90A4] mb-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h4 className="font-semibold text-[#1A1A1A] text-sm mb-1">Cepat</h4>
                            <p className="text-xs text-[#6B7280]">Instan</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#f0f4f8] flex items-center justify-center text-[#4A90A4] mb-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <h4 className="font-semibold text-[#1A1A1A] text-sm mb-1">Aman</h4>
                            <p className="text-xs text-[#6B7280]">Terpercaya</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Medical Graphic */}
                <div className="relative animate-fade-in-up md:block hidden" style={{ animationDelay: '100ms' }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#eef2f6] to-[#f8fafc] rounded-2xl transform rotate-3 scale-105 -z-10"></div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E7EB] aspect-square flex flex-col items-center justify-center text-center">
                        <div className="relative w-48 h-48 mb-6">
                            {/* Medical Cross / Abstract Tooth Placeholder */}
                            <div className="absolute inset-0 bg-[#f0f4f8] rounded-full flex items-center justify-center">
                                <svg className="w-24 h-24 text-[#4A90A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            {/* Decorative dots */}
                            <div className="absolute top-0 right-4 w-4 h-4 rounded-full bg-[#7FBFB3]"></div>
                            <div className="absolute bottom-8 left-0 w-6 h-6 rounded-full bg-[#1F3A5F] opacity-20"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-[#1F3A5F]">AI Diagnostic Engine</h3>
                        <p className="text-sm text-[#6B7280] mt-2">DentaScan Ver 2.0</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
