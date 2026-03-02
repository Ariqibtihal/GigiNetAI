# 🖥️ Panduan Manajemen Backend di VPS (GigiNet AI)

Dokumen ini berisi perintah-perintah penting untuk mengelola server AI Python Anda yang sedang berjalan secara abadi di dalam VPS (Virtual Private Server) Ubuntu/Debian.

## 🔑 1. Cara Masuk ke Dalam VPS (SSH)
Buka Terminal / Command Prompt (CMD) di laptop Anda, lalu ketik:
```bash
ssh root@192.154.111.198
```
*(Masukkan password VPS Anda saat diminta. Ingat, saat mengetik password di Linux, hurufnya melang tidak akan terlihat demi keamanan, ketik saja lalu tekan Enter).*

---

## 👁️ 2. Cara Melihat Server AI yang Sedang Berjalan
Server AI Anda saat ini berjalan di "balik layar" menggunakan program bernama `screen` dengan nama `api_gigi`.

Untuk masuk dan melihat log/proses server yang sedang menyala:
```bash
screen -r api_gigi
```
*(Anda akan melihat tulisan `Uvicorn running on http://0.0.0.0:8000` dan log deteksi yang masuk).*

**⚠️ SANGAT PENTING (CARA KELUAR AMAN):**
Jika Anda sudah selesai melihat dan **INGIN KELUAR TANPA MEMATIKAN SERVER**, tekan tombol di keyboard Anda secara berurutan:
1. Tahan tombol **`Ctrl`**
2. Tekan tombol **`A`** (lalu lepaskan)
3. Tekan tombol **`D`**
*(Ini disebut proses **Detach**, server akan tetap menyala di latar belakang).*

---

## 🛑 3. Cara Memulai Ulang (Restart) / Memperbarui Kode AI

Jika Anda mengedit kode Python di laptop Anda dan men-push-nya ke GitHub, Anda harus me-restart server di VPS agar perubahannya terasa.

**Langkah-langkah:**
1. Masuk ke dalam layar server (Screen):
   ```bash
   screen -r api_gigi
   ```
2. Matikan server sementara dengan menekan: **`Ctrl + C`**
3. Tarik (Pull) pembaruan kode terbaru dari GitHub:
   ```bash
   git pull origin main
   ```
4. Pastikan Anda masih berada di dalam mode pelindung *(Virtual Environment)*. Jika tulisan `(venv)` di sebelah kiri menghilang, ketikkan:
   ```bash
   source venv/bin/activate
   ```
5. Nyalakan kembali server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
6. Keluar diam-diam (Detach) dengan menekan: **`Ctrl+A` lalu `D`**

---

## 🗑️ 4. Cara Mematikan Server Sepenuhnya (Jika Dibutuhkan)
Jika suatu saat Anda ingin mematikan aplikasi AI ini secara total:
```bash
# 1. Masuk ke screen
screen -r api_gigi

# 2. Matikan uvicorn
Ctrl + C

# 3. Hancurkan / Tutup layar virtual tersebut
exit
```
*(Sistem akan merespons `[screen is terminating]`, menandakan server sudah benar-benar mati).*

---
**Domain API Tetap Anda:** `http://192.154.111.198:8000`
