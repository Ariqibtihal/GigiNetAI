export default function ScanButton({ disabled, onClick }) {
    return (
        <button
            id="btn-analyze"
            disabled={disabled}
            onClick={onClick}
            className={`w-full py-4 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${disabled ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed' : 'bg-[#1F3A5F] hover:bg-[#192e4c] shadow-sm hover:shadow'
                }`}
        >
            <ScanIcon disabled={disabled} />
            Mulai Analisis
        </button>
    )
}

function ScanIcon({ disabled }) {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5" />
            {!disabled && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
            )}
        </svg>
    )
}
