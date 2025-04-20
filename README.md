# Art Style Oracle

A simple web app that allows you to upload an image and uses a pre-trained ResNet50 model to determine its artistic style. Built with Vite, React, shadcn/ui, and Python.

![Screenshot01](/screenshot01.png)

![Screenshot02](/screenshot02.png)

## Features

- Upload an image and get instant style identification
- Learn about different art movements and their characteristics
- See notable artists associated with each style
- Supported styles:
  - Abstract Expressionism
  - Art Nouveau Modern
  - Baroque
  - Color Field Painting
  - Cubism
  - Early Renaissance
  - Expressionism
  - High Renaissance
  - Impressionism
  - Mannerism (Late Renaissance)
  - Minimalism
  - Naive Art (Primitivism)
  - Northern Renaissance
  - Pop Art
  - Post-Impressionism
  - Realism
  - Rococo
  - Romanticism
  - Symbolism

## Dataset & Preprocessing

The dataset used for training the model is the [WikiArt Dataset (Refined)](https://www.kaggle.com/datasets/trungit/wikiart25k), which contains 25,000 images of artworks of various styles.

Since the dataset is highly imbalanced, I removed all styles with less than 400 images. I then split the dataset into training, validation, and test sets with a 75/20/5 ratio using a PowerShell script that:

1. Processes each art style directory individually
2. Collects all image files (jpg, jpeg, png, bmp, gif)
3. Randomly shuffles the images to ensure unbiased distribution
4. Allocates 75% of images to the training set
5. Allocates 20% of images to the validation set
6. Allocates the remaining 5% to a test set for manual evaluation
7. Preserves the original directory structure in the split datasets

This approach ensures that each art style maintains consistent representation across all three datasets while providing sufficient examples for training.

### Data Transformations

For training data:
- Random resized crop to 224×224 pixels
- Random horizontal flips for augmentation
- Color jitter (brightness, contrast, saturation) with 0.2 factor
- Normalization using ImageNet mean and standard deviation

For validation data:
- Resize to 256×256 pixels
- Center crop to 224×224 pixels
- Normalization using ImageNet mean and standard deviation

### Model Architecture

The classifier uses a pre-trained ResNet50 model with:
- Weights initialized from ImageNet
- Frozen early layers to preserve learned features
- Fine-tuned final layer (layer4) for art style adaptation
- Modified fully connected layer to output 19 supported art styles

## Training

The model was trained using the following approach:

- **Base Model**: Pre-trained ResNet50 with ImageNet weights
- **Fine-tuning Strategy**: Frozen early layers with only layer4 and final classification layer trainable
- **Optimizer**: Adam with learning rate of 0.001
- **Loss Function**: Cross-Entropy Loss
- **Batch Size**: 32
- **Training Duration**: 10 epochs with early stopping based on validation accuracy
- **Best Model Selection**: Model with highest validation accuracy was saved

During training, both loss and accuracy metrics were monitored for both training and validation sets. The model checkpoint with the best validation accuracy (56.61%) was saved as the final model. It can be downloaded using the `backend/download_weights.py` script or by clicking [here](https://github.com/afadlallah/art-style-oracle/releases/download/v1.0.0/art_style_classifier.pth).

The model can also be trained from scratch using the included `backend/train.py` script.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/afadlallah/art-style-oracle.git
```

2. Install backend dependencies:

```bash
cd art-style-oracle\backend
pip install -r requirements.txt
```

3. Install frontend dependencies:

```bash
cd art-style-oracle\frontend
npm install
```

4. Run the backend server:

```bash
cd art-style-oracle\backend
python app.py
```

5. Run the frontend server:

```bash
cd art-style-oracle\frontend
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser to use the app.

## Usage

The app is now running on `http://localhost:5173`. You can upload an image and get instant style identification.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.