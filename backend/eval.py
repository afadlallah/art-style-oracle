import torch
import torch.nn as nn
from torchvision import models, datasets, transforms
from torch.utils.data import DataLoader
import os
from torchvision.models import ResNet50_Weights

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


def load_model(model_path):
    weights = ResNet50_Weights.IMAGENET1K_V1
    model = models.resnet50(weights=weights)

    for param in model.parameters():
        param.requires_grad = False
    for param in model.layer4.parameters():
        param.requires_grad = True

    model.fc = nn.Linear(model.fc.in_features, len(STYLE_CLASSES))
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    return model


def evaluate_model(model, val_loader, device):
    model.eval()
    model.to(device)
    correct = 0
    total = 0
    with torch.no_grad():
        for inputs, labels in val_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            outputs = model(inputs)
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

    accuracy = 100. * correct / total
    print(f'✅ Validation Accuracy: {accuracy:.2f}%')


if __name__ == '__main__':
    model_path = 'models/art_style_classifier.pth'
    data_dir = 'data'  # Or update this if you've moved the val folder

    val_transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])

    val_dataset = datasets.ImageFolder(os.path.join(data_dir, 'val'), transform=val_transform)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = load_model(model_path)
    evaluate_model(model, val_loader, device)
