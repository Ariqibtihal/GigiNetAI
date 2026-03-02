import { jsPDF } from 'jspdf';

// ─── Warna Tema ──────────────────────────────────────────
const C = {
    navy: [31, 58, 95],
    teal: [74, 144, 164],
    white: [255, 255, 255],
    light: [248, 250, 252],
    border: [225, 231, 237],
    gray: [107, 114, 128],
    dark: [26, 26, 26],
    green: [34, 197, 94],
    amber: [245, 158, 11],
    orange: [249, 115, 22],
    red: [239, 68, 68],
};

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function severityRgb(colorHex) {
    if (!colorHex) return C.gray;
    try { return hexToRgb(colorHex); } catch { return C.gray; }
}

// ─── Helper Teks Wrap ─────────────────────────────────────
function addWrappedText(pdf, text, x, y, maxWidth, lineHeight, options = {}) {
    const lines = pdf.splitTextToSize(String(text || ''), maxWidth);
    lines.forEach((line, i) => {
        pdf.text(line, x, y + i * lineHeight, options);
    });
    return y + lines.length * lineHeight;
}

// ─── Chip / Badge ─────────────────────────────────────────
function drawBadge(pdf, label, x, y, rgb) {
    const w = pdf.getStringUnitWidth(label) * 8 / pdf.internal.scaleFactor + 6;
    pdf.setFillColor(...rgb);
    pdf.roundedRect(x, y - 4.5, w, 6, 1.5, 1.5, 'F');
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...C.white);
    pdf.text(label, x + 3, y);
    return x + w + 3;
}

// ─── Divider ──────────────────────────────────────────────
function divider(pdf, y, pageW, margin) {
    pdf.setDrawColor(...C.border);
    pdf.setLineWidth(0.3);
    pdf.line(margin, y, pageW - margin, y);
    return y + 4;
}

// ─── Section Header ───────────────────────────────────────
function sectionHeader(pdf, title, y, pageW, margin) {
    pdf.setFillColor(...C.light);
    pdf.roundedRect(margin, y, pageW - margin * 2, 8, 1.5, 1.5, 'F');
    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...C.navy);
    pdf.text(title.toUpperCase(), margin + 4, y + 5.5);
    return y + 12;
}

// ─── Main Export ──────────────────────────────────────────
export async function generateClinicalPDF(elementId, patientId, resultData, previewDataUrl) {
    if (!resultData) throw new Error('Tidak ada data hasil analisis.');

    const pid = patientId || `PT-${Date.now()}`;
    const sColor = severityRgb(resultData.severityColor);

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = pdf.internal.pageSize.getWidth();   // 210
    const PH = pdf.internal.pageSize.getHeight();  // 297
    const M = 14; // margin
    let y = 0;

    // ══════════════════════════════════════════════════════
    // HEADER
    // ══════════════════════════════════════════════════════
    pdf.setFillColor(...C.navy);
    pdf.rect(0, 0, PW, 30, 'F');

    // Aksen garis teal
    pdf.setFillColor(...C.teal);
    pdf.rect(0, 28, PW, 2, 'F');

    // Logo / nama app
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...C.white);
    pdf.text('GigiNet AI', M, 14);

    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(180, 210, 230);
    pdf.text('DENTAL CLINICAL REPORT', M, 20);

    // Info kanan
    pdf.setFontSize(7.5);
    pdf.setTextColor(180, 210, 230);
    pdf.text(`ID Pasien : ${pid}`, PW - M, 12, { align: 'right' });
    pdf.text(`Tanggal   : ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}`, PW - M, 17, { align: 'right' });
    pdf.text(`Waktu     : ${new Date().toLocaleTimeString('id-ID')}`, PW - M, 22, { align: 'right' });

    y = 38;

    // ══════════════════════════════════════════════════════
    // RINGKASAN DIAGNOSIS
    // ══════════════════════════════════════════════════════
    // Kotak skor
    const boxW = 38;
    const boxH = 32;
    pdf.setFillColor(...C.light);
    pdf.setDrawColor(...sColor);
    pdf.setLineWidth(1);
    pdf.roundedRect(PW - M - boxW, y, boxW, boxH, 3, 3, 'FD');

    // Angka skor
    pdf.setFontSize(26);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...sColor);
    pdf.text(String(resultData.score), PW - M - boxW / 2, y + 16, { align: 'center' });

    pdf.setFontSize(6.5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...C.gray);
    pdf.text('SKOR KLINIS', PW - M - boxW / 2, y + 23, { align: 'center' });
    pdf.text('/100', PW - M - boxW / 2, y + 28, { align: 'center' });

    // Text kiri
    const txtW = PW - M * 2 - boxW - 6;
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...C.dark);
    pdf.text('Hasil Analisis AI', M, y + 8);

    drawBadge(pdf, resultData.severityLabel || 'Unknown', M, y + 17, sColor);

    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...C.gray);
    const descEnd = addWrappedText(pdf, resultData.description, M, y + 25, txtW, 5);

    // Info analisis
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C.teal);
    pdf.text(`⏱  Waktu analisis: ${resultData.analysisTime || '-'}     📁  File: ${resultData.fileName || '-'}`, M, descEnd + 3);

    y = Math.max(y + boxH + 5, descEnd + 10);
    y = divider(pdf, y, PW, M);

    // ══════════════════════════════════════════════════════
    // STATISTIK
    // ══════════════════════════════════════════════════════
    y = sectionHeader(pdf, '📊  Statistik Pemindaian', y, PW, M);

    const stats = [
        { label: 'Area Dipindai', value: '6 Permukaan Gigi' },
        { label: 'Total Anomali', value: String(resultData.stats?.detections || 0) },
        { label: 'Rata-rata Akurasi', value: resultData.stats?.avgConfidence || 'N/A' },
        { label: 'Durasi Analisis', value: resultData.analysisTime || '-' },
    ];

    const colW = (PW - M * 2) / stats.length;
    stats.forEach((s, i) => {
        const cx = M + i * colW + colW / 2;
        pdf.setFillColor(...C.light);
        pdf.setDrawColor(...C.border);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(M + i * colW + 1, y - 2, colW - 2, 16, 2, 2, 'FD');

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...C.navy);
        pdf.text(s.value, cx, y + 7, { align: 'center' });

        pdf.setFontSize(6.5);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...C.gray);
        pdf.text(s.label, cx, y + 12, { align: 'center' });
    });

    y += 22;
    y = divider(pdf, y, PW, M);

    // ══════════════════════════════════════════════════════
    // FOTO (jika ada)
    // ══════════════════════════════════════════════════════
    if (previewDataUrl) {
        y = sectionHeader(pdf, '🖼️  Foto Gigi Pasien', y, PW, M);
        const imgMaxH = 60;
        const imgMaxW = PW - M * 2;
        try {
            // Buat elemen img untuk dapatkan dimensi
            const img = await new Promise((res, rej) => {
                const i = new Image();
                i.onload = () => res(i);
                i.onerror = rej;
                i.src = previewDataUrl;
            });
            const ratio = img.naturalHeight / img.naturalWidth;
            const rH = imgMaxW * ratio;
            const finalH = Math.min(rH, imgMaxH);
            const finalW = finalH / ratio;
            const imgX = M + (imgMaxW - finalW) / 2;
            pdf.addImage(previewDataUrl, 'JPEG', imgX, y, finalW, finalH);
            y += finalH + 6;
        } catch {
            // Foto gagal dimuat — skip
        }
        y = divider(pdf, y, PW, M);
    }

    // ══════════════════════════════════════════════════════
    // TEMUAN DETAIL
    // ══════════════════════════════════════════════════════
    if (resultData.findings && resultData.findings.length > 0) {
        y = sectionHeader(pdf, '🔍  Temuan Diagnostik Detail', y, PW, M);

        resultData.findings.forEach((f, i) => {
            // Cek apakah perlu halaman baru
            if (y > PH - 55) {
                pdf.addPage();
                y = 16;
            }

            const fColor = f.style === 'severe' ? C.red :
                f.style === 'moderate' ? C.orange :
                    f.style === 'mild' ? C.amber : C.green;

            // Kotak temuan
            const cardH = 28;
            pdf.setFillColor(...C.light);
            pdf.setDrawColor(...fColor);
            pdf.setLineWidth(0.4);
            pdf.roundedRect(M, y, PW - M * 2, cardH, 2, 2, 'FD');

            // Aksen kiri berwarna
            pdf.setFillColor(...fColor);
            pdf.roundedRect(M, y, 3, cardH, 1, 1, 'F');

            // No. urut
            pdf.setFontSize(7);
            pdf.setFont('courier', 'bold');
            pdf.setTextColor(...C.gray);
            pdf.text(`[${String(i + 1).padStart(2, '0')}]`, M + 5, y + 7);

            // Nama
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...C.dark);
            pdf.text(f.name || `Temuan #${i + 1}`, M + 20, y + 7);

            // Badge akurasi
            const pct = ((f.confidence || 0) * 100).toFixed(1) + '%';
            drawBadge(pdf, `Akurasi ${pct}`, PW - M - 32, y + 3, fColor);

            // Region
            pdf.setFontSize(7.5);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...C.teal);
            pdf.text(`📍 ${f.region || '-'}`, M + 5, y + 13);

            // Deskripsi
            pdf.setFontSize(7.5);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...C.gray);
            addWrappedText(pdf, f.desc || '', M + 5, y + 19, PW - M * 2 - 10, 4.5);

            y += cardH + 3;
        });

        y += 2;
        y = divider(pdf, y, PW, M);
    } else {
        y = sectionHeader(pdf, '✅  Hasil Pemeriksaan', y, PW, M);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...C.green);
        pdf.text('Tidak ditemukan satupun indikasi kerusakan gigi. Gigi dalam kondisi sehat!', M, y);
        y += 10;
        y = divider(pdf, y, PW, M);
    }

    // ══════════════════════════════════════════════════════
    // REKOMENDASI
    // ══════════════════════════════════════════════════════
    if (resultData.recommendations && resultData.recommendations.length > 0) {
        if (y > PH - 70) { pdf.addPage(); y = 16; }
        y = sectionHeader(pdf, '📋  Rekomendasi Tindak Lanjut', y, PW, M);

        resultData.recommendations.forEach((r, i) => {
            if (y > PH - 40) { pdf.addPage(); y = 16; }

            pdf.setFontSize(7.5);
            pdf.setFont('courier', 'bold');
            pdf.setTextColor(...C.teal);
            pdf.text(`[${String(i + 1).padStart(2, '0')}]`, M, y + 1);

            pdf.setFontSize(8.5);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...C.dark);
            pdf.text(r.title || '', M + 12, y + 1);

            pdf.setFontSize(7.5);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...C.gray);
            y = addWrappedText(pdf, r.desc || '', M + 12, y + 6, PW - M * 2 - 14, 4.5);
            y += 4;
        });

        y += 2;
    }

    // ══════════════════════════════════════════════════════
    // FOOTER (setiap halaman)
    // ══════════════════════════════════════════════════════
    const totalPages = pdf.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
        pdf.setPage(p);
        pdf.setFillColor(...C.navy);
        pdf.rect(0, PH - 14, PW, 14, 'F');

        pdf.setFontSize(6.5);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(160, 190, 210);
        pdf.text(
            'Laporan ini dibuat otomatis oleh AI  •  Bukan untuk diagnosis medis  •  Konsultasikan dengan dokter gigi berlisensi',
            PW / 2, PH - 7, { align: 'center' }
        );
        pdf.text(`Hal. ${p} / ${totalPages}`, PW - M, PH - 7, { align: 'right' });
        pdf.text('GigiNet AI  •  giginetai.com', M, PH - 7);
    }

    pdf.save(`GigiNet_Report_${pid}.pdf`);
}
