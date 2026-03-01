from ultralytics import YOLO
import torch
import torchvision.models as models
import torchvision.transforms as transforms
import os
import io
from PIL import Image

# ---------------------------------------------------------
# Dental AI Model Controller (Mock Initial Setup for YOLOv8 & ResNet50)
# ---------------------------------------------------------

class DentalAIController:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"[DentalAI] Starting Initialization on device: {self.device}")
        
        self.yolo_model = None
        self.resnet_model = None
        
        # In a real environment, you would place `best_yolo.pt` and `best_resnet.pt` in the /models folder
        self.model_dir = os.path.join(os.path.dirname(__file__), 'models')
        os.makedirs(self.model_dir, exist_ok=True)
        
        # Load the models if they exist. For now, we wrap them in try-except so backend doesn't crash
        # when we don't have the real .pt files yet.
        self._load_yolo()
        self._load_resnet()

    def _load_yolo(self):
        yolo_path = os.path.join(self.model_dir, 'yolo_dental_detection.pt')
        try:
            if os.path.exists(yolo_path):
                self.yolo_model = YOLO(yolo_path)
                print("[DentalAI] YOLOv8 Model Loaded Successfully")
            else:
                print(f"[DentalAI] Warning: YOLO model not found at {yolo_path}. Detection will be simulated.")
        except Exception as e:
            print(f"[DentalAI] Failed to load YOLO: {str(e)}")

    def _load_resnet(self):
        resnet_path = os.path.join(self.model_dir, 'resnet_dental_severity.pth')
        try:
            # Prepare standard ResNet50 architecture 
            self.resnet_model = models.resnet50(pretrained=False)
            # Example: Adjusting final layer for 6 classes (healthy, tartar_mild, tartar_moderate, etc.)
            num_ftrs = self.resnet_model.fc.in_features
            self.resnet_model.fc = torch.nn.Linear(num_ftrs, 6)
            
            if os.path.exists(resnet_path):
                self.resnet_model.load_state_dict(torch.load(resnet_path, map_location=self.device))
                self.resnet_model.to(self.device)
                self.resnet_model.eval()
                print("[DentalAI] ResNet50 Model Loaded Successfully")
            else:
                print(f"[DentalAI] Warning: ResNet model not found at {resnet_path}. Severity classification will be simulated.")
        except Exception as e:
            print(f"[DentalAI] Failed to load ResNet: {str(e)}")

    def analyze(self, image_bytes: bytes):
        """
        Public method to route the image through the AI pipelines.
        Returns mapped data.
        """
        try:
            # 1. Image Preprocessing
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            
            # 2. If YOLO model is loaded, run it. Otherwise, run the fallback simulation format.
            if self.yolo_model:
                return self._run_real_inference(image)
            else:
                return {"status": "mock", "message": "Using heuristic mock engine because real .pt models are missing"}
                
        except Exception as e:
            print(f"Error during AI inference: {str(e)}")
            raise e
            
    def _run_real_inference(self, image: Image.Image):
        # -------------------------------------------------------------
        # ACTUAL YOLO INFERENCE (Object Detection: Find Caries)
        # -------------------------------------------------------------
        results = self.yolo_model(image)
        raw_detections = results[0].boxes.data.cpu().numpy() # [x1, y1, x2, y2, conf, cls]

        # Convert YOLO absolute pixels to Percentages (0-100) for React UI
        img_w, img_h = image.size
        detections = []
        
        for i, box in enumerate(raw_detections):
            x1, y1, x2, y2, conf, cls = box
            
            # Print mentah untuk terminal backend (proses Debugging)
            print(f"[YOLO DEBUG] Deteksi {i+1}: Conf={float(conf):.2f}, Box=({x1:.1f}, {y1:.1f}, {x2:.1f}, {y2:.1f})")
            
            # Toleransi keyakinan diturunkan dari 30% ke 10% karena model baru dilatih sebentar
            if float(conf) > 0.10:
                w_px = x2 - x1
                h_px = y2 - y1
                
                detections.append({
                    "id": i + 1,
                    "x": (float(x1) / img_w) * 100,
                    "y": (float(y1) / img_h) * 100,
                    "w": (float(w_px) / img_w) * 100,
                    "h": (float(h_px) / img_h) * 100,
                    "style": "severe", # Simplified mapping for standard caries model
                    "severityLabel": "Karies Terdeteksi",
                    "confidence": float(conf),
                    "region": "Gigi Latih YOLO",
                    "diseaseType": "caries"
                })

        # Calculate a mock severity/score based on detections since we don't have ResNet yet
        if len(detections) > 0:
            diag_id = 'caries_severe'
        else:
            diag_id = 'healthy'
            
        return {
            "status": "real_yolo",
            "detections": detections,
            "diag_id": diag_id
        }

# Instance to import in main.py
ai_controller = DentalAIController()
