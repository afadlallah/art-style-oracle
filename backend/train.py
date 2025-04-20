import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms, datasets
from torch.utils.data import DataLoader
import os
from tqdm import tqdm
from torchvision.models import ResNet50_Weights

# Define the same style classes as in app.py
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
    'Mannerism (Late Renaissance)',
    'Minimalism',
    'Naive Art (Primitivism)',
    'Northern Renaissance',
    'Pop Art',
    'Post-Impressionism',
    'Realism',
    'Rococo',
    'Romanticism',
    'Symbolism'
]


def create_model():
    """Create and modify ResNet50 for art style classification."""
    # Use the new 'weights' parameter
    weights = ResNet50_Weights.IMAGENET1K_V1
    model = models.resnet50(weights=weights)

    # Freeze most of the layers
    for param in model.parameters():
        param.requires_grad = False

    # Unfreeze the last few layers for fine-tuning
    for param in model.layer4.parameters():
        param.requires_grad = True

    # Modify the final layer for our classes
    num_features = model.fc.in_features
    model.fc = nn.Linear(num_features, len(STYLE_CLASSES))

    return model


def train_model(data_dir, num_epochs=10, batch_size=32):
    """Train the model on art style data."""
    # Set up data transformations
    train_transform = transforms.Compose([
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # Load datasets
    train_dataset = datasets.ImageFolder(
        os.path.join(data_dir, 'train'),
        transform=train_transform
    )
    val_dataset = datasets.ImageFolder(
        os.path.join(data_dir, 'val'),
        transform=val_transform
    )

    # Create data loaders
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size)

    # Create model and move to GPU if available
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = create_model().to(device)

    # Set up loss function and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # Training loop
    best_val_acc = 0.0

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        # Training phase
        train_bar = tqdm(train_loader, desc=f'Epoch {epoch+1}/{num_epochs}')
        for inputs, labels in train_bar:
            inputs, labels = inputs.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

            train_bar.set_postfix({
                'loss': running_loss/len(train_loader),
                'acc': 100.*correct/total
            })

        # Validation phase
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                loss = criterion(outputs, labels)

                val_loss += loss.item()
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()

        val_acc = 100.*val_correct/val_total
        print(f'Validation Accuracy: {val_acc:.2f}%')

        # Save best model
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            os.makedirs('models', exist_ok=True)
            torch.save(model.state_dict(), 'models/art_style_classifier.pth')
            print(f'Saved new best model with validation accuracy: {val_acc:.2f}%')


if __name__ == '__main__':
    # Specify your data directory here
    data_dir = 'data'

    if not os.path.exists(data_dir):
        print(f"Please ensure your dataset is organized in {data_dir} with the following structure:")
        print(f"{data_dir}/")
        print("├── train/")
        print("│   ├── Abstract_Expressionism/")
        print("│   ├── Art_Nouveau_Modern/")
        print("│   ├── Baroque/")
        print("│   └── ... (other style folders)")
        print("└── val/")
        print("    ├── Abstract_Expressionism/")
        print("    ├── Art_Nouveau_Modern/")
        print("    ├── Baroque/")
        print("    └── ... (other style folders)")
    else:
        train_model(data_dir)
