import os
import requests
from tqdm import tqdm


def download_weights(weights_path='models/art_style_classifier.pth'):
    # Create models directory if it doesn't exist
    os.makedirs(os.path.dirname(weights_path), exist_ok=True)

    if os.path.exists(weights_path):
        return

    url = "https://github.com/afadlallah/art-style-oracle/releases/download/v1.0.0/art_style_classifier.pth"

    print(f"Downloading model weights to {weights_path}...")
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))

    with open(weights_path, 'wb') as file, tqdm(
        desc=weights_path,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as pbar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            pbar.update(size)


if __name__ == "__main__":
    download_weights()
