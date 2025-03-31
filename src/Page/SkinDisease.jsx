import React from 'react';
import { AlertCircle, Check, Info, ArrowRight } from 'lucide-react';

const SkinDiseaseResult = () => {
  // Sample patient result data (would be passed as props in a real app)
  const diagnosis_Decode = {
    0: "Actinic Keratosis",
    1: "Pigmented Benign Keratosis",
    2: "Melanoma",
    3: "Vascular Lesion",
    4: "Squamous Cell Carcinoma",
    5: "Basal Cell Carcinoma",
    6: "Seborrheic Keratosis",
    7: "Dermatofibroma",
    8: "Nevus"
  }
  
  const patientResult = {
    patientName: "John Doe",
    diagnosisDate: "March 30, 2025",
    primaryDiagnosis: "Melanoma",
    supportCount: 97,
    recommendedActions: [
      "Schedule an appointment with a dermatologist within 1 week",
      "Avoid sun exposure to the affected area",
      "Do not scratch or irritate the lesion",
      "Take photos to monitor any changes"
    ]
  };

  // Disease info based on the classification results in the image
  const diseaseInfo = {
    "Actinic Keratosis": {
      description: "A rough, scaly patch on skin that develops from years of sun exposure",
      severity: "Medium - Precancerous",
      nextSteps: [
        "Visit a dermatologist within 2-4 weeks",
        "Use prescribed topical treatments",
        "Apply broad-spectrum sunscreen daily"
      ]
    },
    "Pigmented Benign Keratosis": {
      description: "A non-cancerous growth on the skin that develops from sun damage",
      severity: "Low - Benign",
      nextSteps: [
        "Annual skin check with dermatologist",
        "Monitor for changes in size or color",
        "No immediate treatment necessary"
      ]
    },
    "Melanoma": {
      description: "A serious form of skin cancer that begins in melanocytes (cells that make pigment)",
      severity: "High - Malignant",
      nextSteps: [
        "Urgent dermatology appointment (within 1 week)",
        "Surgical excision likely required",
        "Further imaging or tests may be needed",
        "Follow-up care plan will be developed"
      ]
    },
    "Vascular Lesion": {
      description: "An abnormal collection of blood vessels in the skin",
      severity: "Low to Medium - Usually benign",
      nextSteps: [
        "Dermatology consultation within 1 month",
        "Possible laser treatment options",
        "Monitor for changes in size or bleeding"
      ]
    },
    "Squamous Cell Carcinoma": {
      description: "A common form of skin cancer that develops from squamous cells",
      severity: "Medium to High - Malignant",
      nextSteps: [
        "Dermatology appointment within 2 weeks",
        "Surgical removal often recommended",
        "Discuss treatment options with specialist"
      ]
    },
    "Basal Cell Carcinoma": {
      description: "The most common type of skin cancer that rarely spreads but can be disfiguring",
      severity: "Medium - Malignant but rarely spreads",
      nextSteps: [
        "Dermatology appointment within 2-3 weeks",
        "Various treatment options available",
        "Regular follow-ups recommended"
      ]
    },
    "Seborrheic Keratosis": {
      description: "A common benign skin growth that appears as a waxy, scaly patch",
      severity: "Low - Benign",
      nextSteps: [
        "Regular skin checks with dermatologist",
        "Treatment only necessary if lesions cause discomfort",
        "Monitor for changes"
      ]
    },
    "Dermatofibroma": {
      description: "A common benign skin growth that usually appears as a small, firm bump",
      severity: "Low - Benign",
      nextSteps: [
        "Annual skin check with dermatologist",
        "No treatment necessary unless symptomatic",
        "Monitor for changes"
      ]
    },
    "Nevus": {
      description: "A common mole (melanocytic nevus) that appears as a small, dark spot",
      severity: "Low - Benign",
      nextSteps: [
        "Annual skin checks with dermatologist",
        "Self-examine monthly using the ABCDE rule",
        "Report any changes promptly"
      ]
    }
  };

  // Get information based on diagnosed condition
  const diagnosis = patientResult.primaryDiagnosis;
  const currentDiseaseInfo = diseaseInfo[diagnosis];
  
  // Determine severity color
  const getSeverityColor = (severity) => {
    if (severity.includes("High")) return "text-red-600";
    if (severity.includes("Medium")) return "text-amber-600";
    return "text-green-600";
  };

  return (
    <div className="max-w-4xl mx-auto my-12 bg-[#ffffff5e] rounded-lg shadow-lg">
      <div className="bg-red-600 text-white p-6 overflow-hidden rounded-t-lg mb-8">
        <h1 className="text-2xl font-bold">Skin Analysis Results</h1>
        <p className="text-blue-100 mt-1">Analysis completed on {patientResult.diagnosisDate}</p>
      </div>
    <div className='px-6 pb-6'>

      <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
        <div className="flex items-center mb-4">
          <AlertCircle className="text-blue-700 mr-2" />
          <h2 className="text-xl font-semibold text-blue-800">Primary Diagnosis</h2>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{diagnosis}</h3>
          <p className="text-gray-700 mt-1">{currentDiseaseInfo.description}</p>
          <div className="mt-2 flex items-center">
            <span className={`font-medium ${getSeverityColor(currentDiseaseInfo.severity)}`}>
              {currentDiseaseInfo.severity}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ArrowRight className="text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Recommended Next Steps</h2>
        </div>
        
        <ul className="space-y-3">
          {currentDiseaseInfo.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                <Check size={16} className="text-green-600" />
              </div>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <Info className="text-gray-700 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Important Information</h2>
        </div>
        
        <p className="text-gray-700">
          This analysis is based on image processing technology and should not replace professional medical advice. 
          Please consult with a healthcare professional for complete evaluation and treatment.
        </p>
      </div>
    </div>
    </div>
  );
};

export default SkinDiseaseResult;