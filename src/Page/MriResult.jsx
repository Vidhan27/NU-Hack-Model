import React from 'react';
import { useLocation } from 'react-router-dom';

const MRIResultsPage = () => {
  // Sample patient data - in a real app, this would come from a database or API
  const { state } = useLocation();
  
  const { mlOutput } = state || {};
  const patientData = {
    name: "Varun Jethani",
    id: "PT-10234567",
    dateOfScan: "2025-03-25",
    tumorType: mlOutput.slice(0,3), // LGG or HGG
    recommendedFollowUp: "Neurosurgery consultation within 2 weeks",
  };

  // Definitions for patient education
  const tumorTypeInfo = {
    LGG: {
      fullName: "Low-Grade Glioma",
      description: "A slow-growing type of brain tumor that develops from glial cells. While less aggressive than high-grade gliomas, they still require attention and treatment.",
      nextSteps: [
        "Schedule a consultation with a neurosurgeon within 2 weeks",
        "Complete additional imaging if recommended (functional MRI, DTI)",
        "Prepare questions about treatment options (observation, surgery, radiation)",
        "Consider genetic testing of tumor tissue if surgery is performed",
        "Connect with a patient navigator for support resources"
      ]
    },
    HGG: {
      fullName: "High-Grade Glioma",
      description: "A fast-growing, aggressive type of brain tumor that requires prompt treatment. These tumors may cause more significant symptoms and typically need more immediate intervention.",
      nextSteps: [
        "Urgent consultation with neurosurgery team (within 3-5 days)",
        "Prepare for possible surgical intervention",
        "Discuss multimodal treatment (surgery, radiation, chemotherapy)",
        "Arrange for molecular and genetic testing of tumor tissue",
        "Connect with oncology patient support services"
      ]
    }
  };

  // Determine which information to display based on tumor type
  const tumorInfo = tumorTypeInfo[patientData.tumorType];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-[#ffffff5e] rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">MRI Brain Tumor Results</h1>
          <p className="text-lg mt-2">
            Patient: {patientData.name} | ID: {patientData.id}
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Glioma General Information */}
          <div className="mb-8 p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is a Glioma?</h2>
            <p>
              Gliomas are a type of tumor that occur in the brain and spinal cord. They begin in the glial cells — the cells that surround and support neurons (nerve cells) in your brain. Gliomas can affect brain function and be life-threatening depending on their location and rate of growth.
            </p>
            <p className="mt-2">
              Gliomas are classified by their grade (I through IV), which indicates how fast they typically grow and how likely they are to spread. They are broadly categorized as either low-grade (slow growing) or high-grade (fast growing).
            </p>
          </div>
          
          {/* Results Summary */}
          <div className="mb-8 border-b pb-6">
            <h2 className="text-2xl font-semibold mb-4">Results Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Date of Scan</p>
                <p className="font-semibold">{patientData.dateOfScan}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Tumor Type</p>
                <p className="font-semibold text-lg">
                  {tumorInfo.fullName} 
                  <span className={`ml-2 px-2 py-1 text-sm rounded-full text-white ${
                    patientData.tumorType === "LGG" ? "bg-yellow-500" : "bg-red-500"
                  }`}>
                    {patientData.tumorType}
                  </span>
                </p>
              </div>
              {/* <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Location</p>
                <p className="font-semibold">{patientData.tumorLocation}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Size</p>
                <p className="font-semibold">{patientData.tumorSize}</p>
              </div> */}
            </div>
          </div>

          {/* Understanding Your Diagnosis */}
          <div className="mb-8 border-b pb-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Your Diagnosis</h2>
            <p className="mb-4">{tumorInfo.description}</p>
            <div className={`p-4 rounded-lg ${
              patientData.tumorType === "LGG" ? "bg-yellow-50 border-l-4 border-yellow-500" : "bg-red-50 border-l-4 border-red-500"
            }`}>
              <h3 className="font-semibold text-lg mb-2">What is a {tumorInfo.fullName}?</h3>
              <p>
                {patientData.tumorType === "LGG" 
                  ? "Low-grade gliomas are typically slow-growing tumors (WHO grade I or II) that develop from the supportive cells of the brain. While less aggressive than high-grade tumors, they still require proper medical attention and treatment planning."
                  : "High-grade gliomas are rapidly growing tumors (WHO grade III or IV) that develop from the supportive cells of the brain. These tumors require prompt and aggressive treatment due to their fast growth rate and potential to spread within the brain tissue."
                }
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recommended Next Steps</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold">Primary Recommendation:</p>
              <p>{patientData.recommendedFollowUp}</p>
            </div>
            <ol className="list-decimal pl-5 space-y-2">
              {tumorInfo.nextSteps.map((step, index) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="bg-gray-100 p-6 border-t">
          <p className="font-semibold">Radiologist: {patientData.radiologist}</p>
          <p className="text-sm text-gray-600 mt-2">
            This report contains sensitive medical information. Please discuss these results with your healthcare provider. 
            This information does not replace professional medical advice.
          </p>
          <div className="mt-4 flex items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-3 hover:bg-blue-700">
              Download Report
            </button>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Schedule Follow-up
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MRIResultsPage;