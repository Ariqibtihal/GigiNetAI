import { useState, useCallback } from 'react'

import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import UploadSection from './components/UploadSection'
import ScanButton from './components/ScanButton'
import LoadingState from './components/LoadingState'
import ResultSection from './components/ResultSection'
import RecommendationSection from './components/RecommendationSection'
import HistorySection from './components/HistorySection'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import Footer from './components/Footer'
import { useToast } from './components/Toast'
import { simulateAnalysis } from './engine/detector'

export default function App() {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [view, setView] = useState('home')   // home | upload | loading | results | history
    const [result, setResult] = useState(null)
    const toast = useToast()

    /* ─── Handlers ─── */
    const handleFileSelect = useCallback((f) => {
        setFile(f)
        const reader = new FileReader()
        reader.onload = (e) => {
            setPreview(e.target.result)
            toast.success('Foto berhasil diunggah!')
        }
        reader.onerror = () => toast.error('Gagal membaca file. Silakan coba lagi.')
        reader.readAsDataURL(f)
    }, [toast])

    const handleRemove = useCallback(() => {
        setFile(null)
        setPreview(null)
        toast.info('Foto dihapus.')
    }, [toast])

    const handleAnalyze = useCallback(() => {
        if (!file) return
        setView('loading')
        simulateAnalysis(file)
            .then((res) => {
                setResult(res)
                setView('results')
                window.scrollTo({ top: 0, behavior: 'smooth' })
                toast.success('Analisis selesai!')

                // Save to history
                try {
                    const hData = JSON.parse(localStorage.getItem('dentascan_history') || '[]')
                    hData.unshift({
                        id: Date.now().toString(),
                        timestamp: res.timestamp,
                        score: res.score,
                        severityLabel: res.severityLabel,
                        severityColor: res.severityColor,
                        detectionsCount: res.stats.detections
                    })
                    localStorage.setItem('dentascan_history', JSON.stringify(hData.slice(0, 50)))
                } catch (e) { console.error('History save failed:', e) }
            })
            .catch(() => {
                setView('upload')
                toast.error('Analisis gagal. Silakan coba lagi.')
            })
    }, [file, toast])

    const handleNewScan = useCallback(() => {
        setFile(null)
        setPreview(null)
        setResult(null)
        setView('upload')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleHeroStartClick = useCallback(() => {
        setView('upload')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleNavHome = useCallback(() => {
        setView('home')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleNavScan = useCallback(() => {
        if (view !== 'upload') {
            handleNewScan()
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [view, handleNewScan])

    const handleNavHistory = useCallback(() => {
        setView('history')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleNavAbout = useCallback(() => {
        setView('about')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleNavContact = useCallback(() => {
        setView('contact')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    /* ─── Render ─── */
    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-[#1A1A1A] antialiased">
            <Navbar
                currentView={view}
                onHomeClick={handleNavHome}
                onScanClick={handleNavScan}
                onHistoryClick={handleNavHistory}
                onAboutClick={handleNavAbout}
                onContactClick={handleNavContact}
            />

            <main className="flex-1 w-full flex flex-col">
                {/* Home View */}
                {view === 'home' && (
                    <LandingPage onStartClick={handleHeroStartClick} />
                )}

                {/* About View */}
                {view === 'about' && (
                    <AboutPage />
                )}

                {/* Contact View */}
                {view === 'contact' && (
                    <ContactPage />
                )}

                {/* Upload View */}
                {view === 'upload' && (
                    <div id="upload-section" className="w-full max-w-[900px] mx-auto px-5 py-12 space-y-4">
                        <UploadSection
                            file={file}
                            preview={preview}
                            onFileSelect={handleFileSelect}
                            onRemove={handleRemove}
                        />
                        {preview && (
                            <ScanButton disabled={!file} onClick={handleAnalyze} />
                        )}
                    </div>
                )}

                {/* Loading */}
                {view === 'loading' && (
                    <div className="w-full max-w-[900px] mx-auto px-5 py-12">
                        <LoadingState />
                    </div>
                )}

                {/* Results */}
                {view === 'results' && result && (
                    <div id="dentascan-report" className="w-full max-w-[900px] mx-auto px-5 py-12 space-y-4">
                        <ResultSection result={result} preview={preview} />
                        <RecommendationSection
                            recommendations={result.recommendations}
                            severity={result.severity}
                            onNewScan={handleNewScan}
                            result={result}
                            preview={preview}
                        />
                    </div>
                )}

                {/* History */}
                {view === 'history' && (
                    <div className="w-full max-w-[900px] mx-auto px-5 py-12">
                        <HistorySection onBack={handleNavScan} />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
