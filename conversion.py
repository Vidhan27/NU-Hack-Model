import tensorflow as tf
import os

def convert_to_tflite(model_path, output_path):
    """Converts a Keras model (.h5) to TFLite format and saves it."""
    try:
        print(f"🔄 Converting {model_path} to TFLite...")
        
        # Load the Keras model
        model = tf.keras.models.load_model(model_path)
        
        # Convert to TFLite format with TensorFlow Select ops support
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        converter.target_spec.supported_ops = [
            tf.lite.OpsSet.TFLITE_BUILTINS,  # Standard TFLite ops
            tf.lite.OpsSet.SELECT_TF_OPS      # Enable TensorFlow ops fallback
        ]
        tflite_model = converter.convert()
        
        # Save the converted model
        with open(output_path, "wb") as f:
            f.write(tflite_model)
        
        print(f"✅ Successfully saved: {output_path}\n")
    except Exception as e:
        print(f"❌ Error converting {model_path}: {e}\n")

# Define input and output directories
input_dir = "Nirma Models"
output_dir = "Nirma Models/TFLite"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# List of model filenames to convert
model_files = [
    "pneumonia_classifier.h5",
    "skin-cancer-isic-9-classes_VGG19_V1_ph1_model.h5",
    "tumor_classifier_model.h5"
]

# Convert each model
for model_file in model_files:
    input_path = os.path.join(input_dir, model_file)
    output_path = os.path.join(output_dir, model_file.replace(".h5", ".tflite"))
    convert_to_tflite(input_path, output_path)

print("🎉 All models converted to TFLite successfully!")
