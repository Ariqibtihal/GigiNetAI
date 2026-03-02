import { useState, useEffect } from 'react'

const TOTAL_DURATION = 2800

export default function LoadingState() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = 40
        const increment = 100 / (TOTAL_DURATION / interval)
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= 100) {
                current = 100
                clearInterval(timer)
            }
            setProgress(Math.min(Math.round(current), 100))
        }, interval)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="animate-fade-in-up">
            {/* Full-screen interaction blocker */}
            <div className="fixed inset-0 z-40 bg-[#f8fafc]/60 backdrop-blur-sm" aria-hidden="true" />

            <div className="card p-8 sm:p-12 relative z-50">
                <div className="flex flex-col items-center text-center max-w-sm mx-auto">
                    {/* Animated spinner */}
                    <div className="relative w-24 h-24 mb-8">
                        {/* Outer ring */}
                        <svg className="w-full h-full animate-spin" style={{ animationDuration: '1.5s' }} viewBox="0 0 96 96" fill="none">
                            <circle cx="48" cy="48" r="42" stroke="#E5E7EB" strokeWidth="4" />
                            <circle
                                cx="48" cy="48" r="42"
                                stroke="#4A90A4"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="180"
                                strokeDashoffset="120"
                            />
                        </svg>
                        {/* Center number */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-bold font-mono text-[#4A90A4]">
                                RUN
                            </span>
                        </div>
                    </div>

                    {/* Text */}
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 tracking-tight">
                        Menganalisis gambar...
                    </h2>
                    <p className="text-sm text-[#6B7280] mb-8">
                        AI sedang mendeteksi karies & karang gigi
                    </p>

                    {/* Progress bar */}
                    <div className="w-full">
                        <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-100 ease-linear bg-[#1F3A5F]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-3">
                            <p className="text-xs text-[#6B7280]">Memproses...</p>
                            <p className="text-xs text-[#1F3A5F] font-semibold font-mono tabular-nums">{progress}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
