import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function generateClinicalPDF(elementId, patientId) {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');

    // A4 dimensions are 210x297mm
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add header
    pdf.setFontSize(10);
    pdf.setFont('courier', 'bold');
    pdf.setTextColor(14, 165, 233); // #0ea5e9
    pdf.text('NEURODENT CLINICAL REPORT', 15, 15);

    pdf.setTextColor(100, 116, 139); // #64748b
    pdf.setFont('helvetica', 'normal');
    pdf.text(`ID: ${patientId || Date.now()}`, 15, 20);
    pdf.text(`DateTime: ${new Date().toLocaleString('id-ID')}`, 15, 25);

    // Add separation line
    pdf.setDrawColor(226, 232, 240); // #e2e8f0
    pdf.line(15, 30, pdfWidth - 15, 30);

    // Add captured image below the header
    pdf.addImage(imgData, 'PNG', 15, 35, pdfWidth - 30, (pdfWidth - 30) * (canvas.height / canvas.width));

    // Footer
    pdf.setFontSize(8);
    pdf.text('REPORT GENERATED AUTOMATICALLY - NOT FOR MEDICAL DIAGNOSIS', 15, pdf.internal.pageSize.getHeight() - 10);

    pdf.save(`NeuroDent_Report_${patientId || Date.now()}.pdf`);
}
