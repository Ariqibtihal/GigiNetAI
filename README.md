# 🦷 GigiNet AI (NeuroDent)

![GigiNet AI Preview](frontend/public/step2.png)

**GigiNet AI** adalah platform aplikasi berbasis web (*medical-tech*) cerdas yang menggunakan teknologi kecerdasan buatan (AI) mutakhir untuk menganalisis dan mendeteksi kondisi klinis gigi (seperti Karies, Karang Gigi, Gingivitis, Sariawan, dan Diskolorasi) secara instan dan akurat. 

Proyek ini dibangun menggunakan arsitektur modern yang memisahkan **Frontend** antarmuka yang elegan dengan **Backend** inferensi bertenaga Python dan PyTorch.

---

## ✨ Fitur Unggulan

- **🔬 Pemindai AI Presisi (YOLOv8 & ResNet):** Analisis piksel mendalam dari foto gigi atau rongga mulut yang diunggah. Terdapat sistem heuristik "Mock Fallback" otomatis jika model berat tidak tersedia saat uji coba.
- **🎯 Anotasi Visual (*Bounding Box*):** Menggambar indikator kotak secara dinamis dan responsif pada lokasi persis anomali gigi berkat penyesuaian sumbu EXIF kordinat.
- **📄 Laporan Medis Instan:** Menghasilkan laporan skor klinis, tingkat keparahan (*Mild, Moderate, Severe*), dan penjelasan kondisi gigi dalam satu halaman (tersedia fitur PDF Export).
- **💡 Rekomendasi Terpersonalisasi:** Saran medis dan tindakan preventif yang disesuaikan secara dinamis dengan hasil deteksi.
- **🛡️ Desain UI/UX Premium & Estetik:** Dibangun menggunakan desain modern berbasis *glassmorphism*, warna bergradasi (*clinical blue/platinum*), dan antarmuka interaktif bebas lag.

---

## 🛠️ Tech Stack

Platform ini terdiri dari dua sistem yang berjalan beriringan:

**Frontend (Client)**
- **Framework:** React.js + Vite
- **Styling:** Vanilla CSS + Tailwind CSS v4.x
- **Animation/Icons:** Custom UI, Heroicons, Framer-like CSS keyframes
- **Deployment target:** Vercel / Netlify / Cloudflare Pages

**Backend (Server)**
- **Framework:** FastAPI (Python)
- **Computer Vision:** PyTorch, Ultralytics (YOLO)
- **Image Processing:** OpenCV-Python-Headless, Pillow (PIL)
- **Deployment target:** Render / Railway / VPS Linux

---

## 🚀 Panduan Instalasi & Menjalankan Lokal (Development)

Pastikan Anda sudah menginstal **Node.js** (v18+) dan **Python** (v3.9+) di komputer Anda.

### 1️⃣ Setup Frontend (React/Vite)
Buka terminal dan arahkan ke folder utama proyek Anda:
```bash
# 1. Install dependencies NPM
npm install

# 2. Jalankan server lokal (Development)
npm run dev
```
*Frontend akan berjalan di `http://localhost:5173`.*

### 2️⃣ Setup Backend (FastAPI AI)
Buka terminal **baru** (biarkan terminal frontend tetap berjalan) dan masuk ke folder `backend`:
```bash
cd backend

# 1. Buat environment virtual khusus (Opsional tapi disarankan)
python -m venv venv

# Jika di Windows:
venv\Scripts\activate
# Jika di Mac/Linux:
source venv/bin/activate

# 2. Instal pustaka medis AI (Python)
pip install -r requirements.txt

# 3. Jalankan server API backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
*API sekarang mendengarkan di `http://localhost:8000`.*

---

## 🌎 Panduan Deployment (Produksi)

Ketika Anda siap *Go Live* atau merilis aplikasi ini ke publik:

### Deploy Frontend (Rekomendasi: Vercel)
1. Sambungkan repositori GitHub Anda ke Vercel.
2. Tambahkan variabel lingkungan (**Environment Variable**) berikut:
   - `VITE_API_BASE_URL` = `https://<URL-BACKEND-ANDA>.onrender.com`
3. Vercel akan secara otomatis menjalankan `npm run build` dan me-rilis versi web yang diringkas sempurna.

### Deploy Backend (Rekomendasi: Render / Railway)
1. Sambungkan repositori yang sama. Sistem akan mengenali file `requirements.txt` dan `main.py` di dalam folder backend.
2. **Start Command:** `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
*(Pastikan Anda meletakkan folder `models/` berisi file `.pt` AI asli Anda jika Anda menginginkan inferensi sejati. Jika tidak, aplikasi akan otomatis masuk ke **Mode Simulasi/Fallback** yang cerdas dan minim RAM).*

---

## ⚖️ Penafian Hukum & Medis (Disclaimer)

Sistem GigiNet AI ini dibangun **SEBAGAI ALAT BANTU (ASSISTIVE TOOL) DAN EDUKASI SAJA, BUKAN SEBAGAI PENGGANTI DIAGNOSA MEDIS KLINIS.** Harap selalu konsultasikan temuan dari analisis aplikasi ini dengan Dokter Gigi Profesional yang berlisensi sebelum mengambil tindakan atau menyimpulkan kondisi medis tertentu.

---

**© 2026 GigiNet AI Dental Engine** • Dirancang untuk Akurasi, Dirancang untuk Kesehatan.
