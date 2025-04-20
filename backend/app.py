from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import torch
from torchvision import transforms, models
from typing import Tuple, Dict
import os
from torchvision.models import ResNet50_Weights

app = Flask(__name__)
CORS(app)

# Art style classes
STYLE_CLASSES = [
    'Abstract Expressionism',
    'Art Nouveau Modern',
    'Baroque',
    'Color Field Painting',
    'Cubism',
    'Early Renaissance',
    'Expressionism',
    'High Renaissance',
    'Impressionism',
    'Mannerism(Late Renaissance)',
    'Minimalism',
    'Naive Art(Primitivism)',
    'Northern Renaissance',
    'Pop Art',
    'Post-Impressionism',
    'Realism',
    'Rococo',
    'Romanticism',
    'Symbolism'
]

# Style descriptions
STYLE_DESCRIPTIONS = {
    'Abstract Expressionism': 'Abstract Expressionism is a style of painting that emerged in the 1940s and 1950s in the United States. It is characterized by large, gestural brushstrokes and a focus on the emotional and spiritual aspects of the artist\'s work.',
    'Art Nouveau Modern': 'Art Nouveau Modern is a style of art that emerged in the late 19th century and early 20th century. It is characterized by organic, curvy lines and a focus on the natural world.',
    'Baroque': 'Baroque art is characterized by grandeur, sensuous richness, drama, vitality, movement, tension, and emotional exuberance.',
    'Color Field Painting': 'Color Field Painting emerged as a form of abstract expressionism characterized by large areas of flat, solid color spread across or stained into the canvas, creating a flat picture plane that emphasizes the overall visual field rather than gestural brushstrokes. These works often evoke transcendental experiences through their immersive, meditative qualities.',
    'Cubism': 'Cubism revolutionized European painting by depicting objects from multiple viewpoints simultaneously, breaking them down into geometric forms.',
    'Early Renaissance': 'The Early Renaissance marked the transition from Medieval to Renaissance art, characterized by a renewed interest in classical antiquity, naturalism, and perspective. Artists began to depict the human form with greater anatomical accuracy and placed figures in more realistic spatial settings.',
    'Expressionism': 'Expressionism sought to express emotional experience rather than physical reality, often distorting subjects for emotional effect.',
    'High Renaissance': 'The High Renaissance represents the pinnacle of Renaissance art, characterized by perfect harmony, balance, and technical mastery. Artists achieved a new level of sophistication in the application of perspective, anatomical correctness, and compositional arrangement.',
    'Impressionism': 'Impressionism captured the visual impression of a moment, especially effects of light and atmosphere, using small, visible brushstrokes and open composition.',
    'Mannerism (Late Renaissance)': 'Mannerism emerged as a reaction to the harmonious ideals of the High Renaissance, characterized by artificiality, sophistication, and technical virtuosity. Artists deliberately distorted proportions and created complex compositions with dramatic tension.',
    'Minimalism': 'Minimalism is characterized by extreme simplicity of form and a literal, objective approach. Artists used simple, geometric forms, industrial materials, and emphasized the physical space created by their artwork.',
    'Naive Art (Primitivism)': 'Naive Art is characterized by a simplified style, bold colors, and childlike perspective. Artists often lack formal training, resulting in work that ignores conventional techniques like perspective and proportion.',
    'Northern Renaissance': 'The Northern Renaissance refers to Renaissance art produced in Northern Europe. It is characterized by extreme attention to detail, symbolism, and advances in oil painting techniques.',
    'Pop Art': 'Pop Art challenged fine art traditions by including imagery from popular culture, using bold colors and commercial techniques.',
    'Post-Impressionism': 'Post-Impressionism extended Impressionism while rejecting its limitations, emphasizing geometric forms, symbolic content, and more formal structure.',
    'Realism': 'Realism aimed to represent subject matter truthfully, without artificiality and avoiding artistic conventions or implausible elements. It emerged in opposition to Romanticism.',
    'Rococo': 'Rococo emerged as a lighter, more playful style than Baroque, featuring pastel colors, asymmetrical designs, and themes of love and mythology.',
    'Romanticism': 'Romanticism emphasized emotion, individualism, and glorification of nature and the past, particularly the medieval rather than the classical.',
    'Symbolism': 'Symbolism was a late 19th-century art movement that rejected realism and naturalism in favor of spirituality, imagination, and dreams. It emphasized the symbolic meaning of forms, lines, shapes, and colors.'
}


def load_model():
    """Load the fine-tuned ResNet model for art style classification."""
    weights = ResNet50_Weights.IMAGENET1K_V1
    model = models.resnet50(weights=weights)

    # Modify the final layer to match our number of classes
    num_features = model.fc.in_features
    model.fc = torch.nn.Linear(num_features, len(STYLE_CLASSES))

    # Load the fine-tuned weights if they exist
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'art_style_classifier.pth')
    if os.path.exists(model_path):
        model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    else:
        raise RuntimeError("Model weights not found. Please ensure the model is properly trained and weights are saved.")

    model.eval()
    return model


# Define the image transformations - matching the training preprocessing
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Load the model
try:
    model = load_model()
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


def process_image(image_bytes: bytes) -> torch.Tensor:
    """Process the image bytes into a tensor."""
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    return transform(image).unsqueeze(0)


def predict_style(image_tensor: torch.Tensor) -> Tuple[str, float]:
    """Predict the art style from the image tensor."""
    if model is None:
        raise RuntimeError("Model not properly loaded")

    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        predicted_idx = torch.argmax(probabilities).item()
        confidence = probabilities[predicted_idx].item()
        predicted_style = STYLE_CLASSES[predicted_idx]

        return predicted_style, confidence


@app.route('/api/classify-image', methods=['POST'])
def classify_image():
    """Endpoint to classify the art style of an uploaded image."""
    if model is None:
        return jsonify({'error': 'Model not properly loaded'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if not file.filename:
        return jsonify({'error': 'No image provided'}), 400

    try:
        image_bytes = file.read()
        image_tensor = process_image(image_bytes)
        style, confidence = predict_style(image_tensor)

        response = {
            'style': style,
            'confidence': confidence,
            'description': STYLE_DESCRIPTIONS[style]
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
