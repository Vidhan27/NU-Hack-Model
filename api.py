from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image
from io import BytesIO

app = Flask(__name__)

# Load models
pneumonia_model = tf.keras.models.load_model(r"Nirma Models\pneumonia_classifier.h5")
skin_cancer_model = tf.keras.models.load_model(r"Nirma Models\skin-cancer-isic-9-classes_VGG19_V1_ph1_model.h5")
tumor_model = tf.keras.models.load_model(r"Nirma Models\tumor_classifier_model.h5")

# Tumor class labels
class_labels = {0: "HGG (High-Grade Glioma)", 1: "LGG (Low-Grade Glioma)"}


# ✅ Pneumonia Image Preprocessing (Updated)
def preprocess_image_pneumonia(img):
    # Resize image to (256, 256)
    img = cv2.resize(img, (256, 256))

    # Normalize pixel values
    img_array = img.astype(np.float32) / 255.0  

    # Expand dimensions to match model input
    img_array = np.expand_dims(img_array, axis=0)

    return img_array


# ✅ Skin Cancer Image Preprocessing
def preprocess_image_skin_cancer(img):
    img = image.img_to_array(img)  # Convert PIL to NumPy array
    img = cv2.resize(img, (224, 224))  # Resize for model
    img_array = img.astype(np.float32) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Expand batch dimension
    return img_array


# ✅ Tumor Image Preprocessing
def preprocess_image_tumor(img):
    img = cv2.resize(img, (128, 128))
    img_array = img.astype(np.float32) / 255.0  
    img_array = np.expand_dims(img_array, axis=0)
    img_array = np.tile(img_array, (1, 12, 1, 1, 1))  # Repeat 12 times
    return img_array


# ✅ Pneumonia Prediction Endpoint (Updated)
@app.route("/predict_pneumonia", methods=["POST"])
def predict_pneumonia():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files["image"]
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    
    if img is None:
        return jsonify({"error": "Invalid image file"}), 400

    img_array = preprocess_image_pneumonia(img)
    predictions = pneumonia_model.predict(img_array)
    actual_prediction = (predictions > 0.5).astype(int)

    predicted_label = "PNEUMONIA" if actual_prediction[0][0] == 1 else "Normal"

    return jsonify({
        "predicted_label": predicted_label,
        "confidence_score": float(predictions[0][0])
    })


# ✅ Skin Cancer Prediction Endpoint
@app.route("/predict_skin_cancer", methods=["POST"])
def predict_skin_cancer():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files["image"]
    img = image.load_img(BytesIO(file.read()), target_size=(224, 224))  # Convert file to BytesIO
    
    img_array = preprocess_image_skin_cancer(img)
    predictions = skin_cancer_model.predict(img_array)
    predicted_class = int(np.argmax(predictions))
    
    return jsonify({"predicted_class": predicted_class})


# ✅ Tumor Prediction Endpoint
@app.route("/predict_tumor", methods=["POST"])
def predict_tumor():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files["image"]
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    
    if img is None:
        return jsonify({"error": "Invalid image file"}), 400

    img_array = preprocess_image_tumor(img)
    predictions = tumor_model.predict(img_array)
    predicted_class = np.argmax(predictions)
    predicted_label = class_labels[predicted_class]
    
    return jsonify({"predicted_class": predicted_label})


if __name__ == "__main__":
    app.run(debug=True)
