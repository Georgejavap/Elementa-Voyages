import os
from PIL import Image

# Root folder where your website images are stored
ROOT_FOLDER = r"C:\elementa-voyages"

# Quality setting for WebP
WEBP_QUALITY = 80

# Allowed image extensions
IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg")

def optimize_image(file_path):
    try:
        img = Image.open(file_path)
        webp_path = os.path.splitext(file_path)[0] + ".webp"
        
        # Convert and save as WebP
        img.save(webp_path, "WEBP", quality=WEBP_QUALITY)
        print(f"Optimized: {file_path} -> {webp_path}")
    except Exception as e:
        print(f"Failed: {file_path}, error: {e}")

def process_folder(folder):
    for root, _, files in os.walk(folder):
        for f in files:
            if f.lower().endswith(IMAGE_EXTENSIONS):
                file_path = os.path.join(root, f)
                optimize_image(file_path)

if __name__ == "__main__":
    print(f"Starting optimization in {ROOT_FOLDER}...")
    process_folder(ROOT_FOLDER)
    print("All done!")

