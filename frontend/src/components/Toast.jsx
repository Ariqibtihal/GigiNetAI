import { useState, useEffect, useCallback, createContext, useContext } from 'react'

const ToastContext = createContext(null)

export function useToast() {
    return useContext(ToastContext)
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message, type, removing: false }])
        setTimeout(() => {
            setToasts((prev) => prev.map((t) => t.id === id ? { ...t, removing: true } : t))
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, 300)
        }, duration)
    }, [])

    const toast = useCallback({
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        warning: (msg) => addToast(msg, 'warning'),
        info: (msg) => addToast(msg, 'info'),
    }, [addToast])

    // Fix: need to make toast an object with methods
    const toastApi = {
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        warning: (msg) => addToast(msg, 'warning'),
        info: (msg) => addToast(msg, 'info'),
    }

    return (
        <ToastContext.Provider value={toastApi}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    )
}

/* ─── Toast Container ─── */

const ICONS = {
    success: (
        <svg className="w-4 h-4 text-[#22C55E]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    error: (
        <svg className="w-4 h-4 text-[#EF4444]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
    ),
    warning: (
        <svg className="w-4 h-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    ),
    info: (
        <svg className="w-4 h-4 text-[#4A90A4]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
    ),
}

const BG_STYLES = {
    success: 'border-[#bbf7d0] bg-[#f0fdf4]',
    error: 'border-[#fecaca] bg-[#fef2f2]',
    warning: 'border-[#fef08a] bg-[#fffbeb]',
    info: 'border-[#E5E7EB] bg-white',
}

function ToastContainer({ toasts }) {
    if (toasts.length === 0) return null

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none" aria-live="polite">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300
            ${BG_STYLES[t.type] || BG_STYLES.info}
            ${t.removing ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
          `}
                >
                    {ICONS[t.type] || ICONS.info}
                    <p className="text-sm font-medium text-[#1A1A1A]">{t.message}</p>
                </div>
            ))}
        </div>
    )
}
