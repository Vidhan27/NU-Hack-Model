from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import cv2
import os
from tensorflow.keras.preprocessing import image
from io import BytesIO

app = Flask(__name__)

# ✅ Define paths to TFLite models
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "Nirma Models/TFLite")

MODEL_PATHS = {
    "pneumonia": os.path.join(MODEL_DIR, "pneumonia_classifier.tflite"),
    "skin_cancer": os.path.join(MODEL_DIR, "skin-cancer-isic-9-classes_VGG19_V1_ph1_model.tflite"),
    "tumor": os.path.join(MODEL_DIR, "tumor_classifier_model.tflite"),
}

# ✅ Load all TFLite models at startup
class TFLiteModel:
    def __init__(self, model_path):
        self.interpreter = tf.lite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    def predict(self, input_data):
        self.interpreter.set_tensor(self.input_details[0]['index'], input_data)
        self.interpreter.invoke()
        return self.interpreter.get_tensor(self.output_details[0]['index'])

# Load models into memory
pneumonia_model = TFLiteModel(MODEL_PATHS["pneumonia"])
skin_cancer_model = TFLiteModel(MODEL_PATHS["skin_cancer"])
tumor_model = TFLiteModel(MODEL_PATHS["tumor"])

# ✅ Tumor class labels
class_labels = {0: "HGG (High-Grade Glioma)", 1: "LGG (Low-Grade Glioma)"}

# ✅ Universal Image Preprocessing Function
def preprocess_image(img, size):
    img = cv2.resize(img, size)
    img_array = img.astype(np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# ✅ Pneumonia Prediction Endpoint
@app.route("/predict_pneumonia", methods=["POST"])
def predict_pneumonia():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        return jsonify({"error": "Invalid image file"}), 400

    img_array = preprocess_image(img, (256, 256))
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
    img = image.load_img(BytesIO(file.read()), target_size=(224, 224))
    img_array = preprocess_image(np.array(img), (224, 224))
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

    img_array = preprocess_image(img, (128, 128))
    img_array = np.tile(img_array, (1, 12, 1, 1, 1))  # Repeat 12 times
    predictions = tumor_model.predict(img_array)
    predicted_class = np.argmax(predictions)
    predicted_label = class_labels[predicted_class]

    return jsonify({"predicted_class": predicted_label})

# ✅ Run Flask App
if __name__ == '__main__':
    PORT = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=PORT)
