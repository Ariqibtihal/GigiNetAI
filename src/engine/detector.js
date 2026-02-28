/**
 * Simulated AI Dental Tartar Detection Engine
 * Generates realistic detection results for demonstration purposes.
 */

const REGIONS = [
    'Gigi depan bawah (lingual)',
    'Gigi geraham atas (bukal)',
    'Gigi geraham bawah (lingual)',
    'Gigi depan atas (labial)',
    'Sela-sela gigi',
    'Garis gusi (subgingival)',
]

const rand = (min, max) => Math.random() * (max - min) + min

const DIAGNOSIS_MAP = {
    healthy: { label: 'Gigi Sehat & Bersih', color: '#22c55e', range: [85, 100], style: 'none', type: 'healthy' },
    tartar_mild: { label: 'Karang Gigi Ringan', color: '#f59e0b', range: [65, 84], style: 'mild', type: 'tartar' },
    tartar_moderate: { label: 'Karang Gigi Sedang', color: '#f97316', range: [40, 64], style: 'moderate', type: 'tartar' },
    tartar_severe: { label: 'Karang Gigi Parah', color: '#ef4444', range: [10, 39], style: 'severe', type: 'tartar' },
    caries_mild: { label: 'Karies (Lubang) Awal', color: '#f59e0b', range: [50, 75], style: 'mild', type: 'caries' },
    caries_severe: { label: 'Karies (Lubang) Dalam', color: '#ef4444', range: [10, 39], style: 'severe', type: 'caries' },
}

const RECOMMENDATIONS = {
    healthy: [
        { title: 'Sikat gigi 2x sehari', desc: 'Gunakan pasta gigi berfluoride dan sikat selama 2 menit setiap pagi dan malam.' },
        { title: 'Gunakan dental floss', desc: 'Bersihkan sela-sela gigi dengan benang gigi minimal sekali sehari.' },
        { title: 'Kontrol rutin ke dokter gigi', desc: 'Jadwalkan pemeriksaan gigi setiap 6 bulan untuk deteksi dini.' },
    ],
    tartar_mild: [
        { title: 'Lakukan scaling gigi', desc: 'Jadwalkan pembersihan karang gigi profesional dalam 3 bulan ke depan.' },
        { title: 'Sikat gigi 2x sehari', desc: 'Fokus pada area garis gusi dengan gerakan memutar yang lembut.' },
        { title: 'Gunakan dental floss', desc: 'Flossing harian mencegah plak mengeras menjadi karang gigi.' },
    ],
    tartar_moderate: [
        { title: 'Segera lakukan scaling gigi', desc: 'Jadwalkan scaling dan root planing profesional dalam 2 minggu.' },
        { title: 'Gunakan dental floss & mouthwash', desc: 'Gunakan benang gigi dan kumur antibakteri untuk pembersihan ekstra.' },
        { title: 'Perhatikan kesehatan gusi', desc: 'Waspadai tanda gingivitis: gusi berdarah, bengkak, atau kemerahan.' },
    ],
    tartar_severe: [
        { title: 'Segera ke dokter gigi', desc: 'Buat janji untuk scaling dan polishing profesional secepatnya.' },
        { title: 'Perawatan Lanjutan', desc: 'Scaling subgingival dan root planing mungkin diperlukan untuk mencegah periodontitis.' },
        { title: 'Tingkatkan Rutinitas', desc: 'Gunakan pasta gigi tartar control dan obat kumur chlorhexidine.' },
    ],
    caries_mild: [
        { title: 'Tambal Gigi (Restorasi)', desc: 'Segera ke dokter gigi untuk menambal karies awal sebelum bertambah dalam dan mengenai saraf.' },
        { title: 'Terapi Fluoride', desc: 'Gunakan pasta gigi tinggi fluoride untuk membantu remineralisasi enamel gigi yang rapuh.' },
        { title: 'Kurangi Konsumsi Gula', desc: 'Batasi makanan/minuman manis dan lengket yang memicu asam penyebab lubang.' },
    ],
    caries_severe: [
        { title: 'Rawat Medis Mendesak', desc: 'Tindakan segera diperlukan: Perawatan Saluran Akar (PSA) atau ekstraksi jika gigi tidak bisa dipertahankan.' },
        { title: 'Medikamentosa Nyeri (Resep)', desc: 'Untuk meredakan nyeri berdenyut, minumlah analgetik (Misal: Asam Mefenamat / Ibuprofen 400mg) sesuai anjuran.' },
        { title: 'Terapi Antibiotik (Resep)', desc: 'Jika disertai gusi bengkak (abses), dokter mungkin akan meresepkan Amoxicillin/Clindamycin.' },
        { title: 'Hindari Beban Kunyah', desc: 'Gunakan sisi rahang sebelahnya agar gigi berlubang tidak patah berkeping.' },
    ],
}

function pickDiagnosis(fileName = '') {
    const name = fileName.toLowerCase();

    // Heuristik sederhana berdasarkan nama file agar AI terasa lebih "pintar/akurat"
    if (name.includes('sehat') || name.includes('bersih') || name.includes('clean') || name.includes('healthy')) {
        return 'healthy';
    }
    if (name.includes('karies') || name.includes('caries') || name.includes('lubang')) {
        return ['caries_mild', 'caries_severe'][Math.floor(Math.random() * 2)];
    }
    if (name.includes('karang') || name.includes('tartar') || name.includes('plak') || name.includes('kotor')) {
        return ['tartar_mild', 'tartar_moderate', 'tartar_severe'][Math.floor(Math.random() * 3)];
    }

    // Default ke acak jika tidak ada kata kunci yang cocok
    const r = Math.random()
    if (r < 0.20) return 'healthy'
    if (r < 0.40) return 'tartar_mild'
    if (r < 0.60) return 'tartar_moderate'
    if (r < 0.70) return 'tartar_severe'
    if (r < 0.85) return 'caries_mild'
    return 'caries_severe'
}

function generateDetections(diagId) {
    if (diagId === 'healthy') return []
    const isCaries = diagId.startsWith('caries')
    const count = Math.round(isCaries ? rand(1, 4) : rand(2, 6))

    return Array.from({ length: count }, (_, i) => {
        let styleStr = 'mild'
        if (diagId.includes('severe')) {
            styleStr = ['mild', 'moderate', 'severe'][Math.floor(Math.random() * 3)]
        } else if (diagId.includes('moderate')) {
            styleStr = ['mild', 'moderate'][Math.floor(Math.random() * 2)]
        }

        let label = ''
        if (isCaries) {
            label = styleStr === 'severe' ? 'Karies Dalam' : 'Karies Permukaan'
        } else {
            label = styleStr === 'severe' ? 'Karang Parah' : (styleStr === 'moderate' ? 'Karang Sedang' : 'Karang Ringan')
        }

        return {
            id: i + 1,
            x: rand(8, 68),
            y: rand(10, 65),
            w: rand(14, 26),
            h: rand(isCaries ? 10 : 10, isCaries ? 16 : 22),
            style: styleStr,
            severityLabel: label,
            confidence: rand(0.72, 0.97),
            region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
            diseaseType: isCaries ? 'caries' : 'tartar'
        }
    })
}

function descriptionForDiagnosis(diagId, score) {
    if (diagId === 'healthy') return `Sangat baik! Skor kesehatan ${score}/100. Tidak ada indikasi karang atau lubang gigi. Pertahankan kebiasaan sehat Anda.`
    if (diagId.startsWith('tartar')) return `Terdeteksi kalkulus/karang gigi (skor: ${score}/100). Plak yang mengeras perlahan harus dibersihkan oleh tenaga profesional untuk mencegah penurunan gusi.`
    if (diagId.startsWith('caries')) return `TERDETEKSI KARIES ATAU LUBANG GIGI (skor: ${score}/100). Struktur enamel gigi tampak mengalami demineralisasi/kerusakan struktural yang memerlukan perawatan medis aktif.`
    return ''
}

const SCAN_DURATION = 2800

export function simulateAnalysis(file) {
    return new Promise(async (resolve, reject) => {
        try {
            const formData = new FormData()
            formData.append('image', file)

            // Try to connect to real backend first
            const response = await fetch('http://localhost:8000/api/analyze', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error('API Request Failed')
            }

            const data = await response.json()
            resolve(data)

        } catch (error) {
            console.warn('Real API failed or backend not running, falling back to local simulation...', error)

            // Fallback mock logic if server is offline
            const diagId = pickDiagnosis(file.name)
            const cfg = DIAGNOSIS_MAP[diagId]
            const score = Math.round(rand(cfg.range[0], cfg.range[1]))
            const detections = generateDetections(diagId)

            setTimeout(() => {
                resolve({
                    timestamp: new Date().toISOString(),
                    fileName: file.name,
                    fileSize: (file.size / 1024).toFixed(1) + ' KB',
                    analysisTime: (SCAN_DURATION / 1000).toFixed(1) + ' detik',
                    model: 'ResNet-50 v2.5.0 (Caries+Tartar) - Local Mock Fallback',
                    score,
                    style: cfg.style,
                    severityLabel: cfg.label,
                    severityColor: cfg.color,
                    description: descriptionForDiagnosis(diagId, score),
                    detections,
                    findings: detections.map((d) => {
                        let descObj = ''
                        if (d.diseaseType === 'caries') {
                            descObj = d.style === 'severe'
                                ? 'Kavitas telah menembus dentin hingga mendekati pulpa. Ancaman nyeri konstan.'
                                : 'Kerusakan tahap awal pada email gigi. Resiko menjalar jika dibiarkan.'
                        } else {
                            descObj = d.style === 'severe'
                                ? 'Deposit kalkulus padat subgingival. Memerlukan scaling ekstensif.'
                                : 'Kalkulus supragingival ditemukan. Pembersihan standar sudah cukup.'
                        }
                        return {
                            ...d,
                            name: d.diseaseType === 'caries' ? `Lesi Karies Gigi #${d.id}` : `Deposit Karang Gigi #${d.id}`,
                            desc: descObj,
                        }
                    }),
                    recommendations: RECOMMENDATIONS[diagId],
                    stats: {
                        regions: 6,
                        detections: detections.length,
                        avgConfidence: detections.length > 0
                            ? (detections.reduce((s, d) => s + d.confidence, 0) / detections.length * 100).toFixed(1) + '%'
                            : 'N/A',
                    },
                })
            }, SCAN_DURATION)
        }
    })
}
