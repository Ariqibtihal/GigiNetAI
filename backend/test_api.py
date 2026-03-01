import requests
import json
import base64
from io import BytesIO
from PIL import Image, ImageDraw

def create_test_image():
    # Membuat gambar sampel rongga mulut (simulasi) dengan gigi berlubang (bercak hitam)
    img = Image.new('RGB', (640, 640), color = 'pink')
    d = ImageDraw.Draw(img)
    # Gigi sehat (putih)
    d.rectangle([100, 100, 200, 300], fill="white")
    d.rectangle([250, 100, 350, 300], fill="white")
    d.rectangle([400, 100, 500, 300], fill="white")
    
    # Karies simulasi (hitam) pada gigi tengah
    d.ellipse([290, 150, 320, 180], fill="black")
    
    buf = BytesIO()
    img.save(buf, format='JPEG')
    buf.seek(0)
    return buf

# Mengirim request Multipart/Form-Data ke Server FastAPI
url = "http://127.0.0.1:8000/api/analyze"
print(f"Menguji Backend di: {url}")
print("Mempersiapkan gambar simulasi gigi...")

img_buffer = create_test_image()
files = {'image': ('test_karies.jpg', img_buffer, 'image/jpeg')}

try:
    print("Mengirim gambar ke Otak AI YOLOv8...")
    response = requests.post(url, files=files)
    
    if response.status_code == 200:
        data = response.json()
        print("\n" + "="*50)
        print("[+] HASIL UJI COBA MURNI (AI INFERENCE)")
        print("="*50)
        print(f"Model Engine : {data.get('model')}")
        print(f"Status Skrining : {data.get('severityLabel')} (Skor: {data.get('score')})")
        
        detections = data.get('detections', [])
        print(f"Banyak Karies/Lubang Terdeteksi : {len(detections)}")
        
        for idx, item in enumerate(detections, start=1):
            print(f"   [{idx}] Objek: {item['severityLabel']} | Akurasi (Confidence) AI: {item['confidence']*100:.2f}% | Lokasi x:{item['x']:.1f}% y:{item['y']:.1f}%")
            
        print("\nRekomendasi Otomatis:")
        for rec in data.get('recommendations', []):
            print(f" - {rec['title']}")
    else:
        print(f"[!] Error dari server (Kode {response.status_code}): {response.text}")

except Exception as e:
    print(f"[-] Gagal Terhubung: {e}")
