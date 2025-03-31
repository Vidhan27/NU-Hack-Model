import React from 'react';
import { useLocation } from 'react-router-dom';

const LungScanResults = () => { //{ patientName, scanDate, hasPneumonia }

  const { state } = useLocation();
  
  
  const { mlOutput } = state || {};

    // Sample data for demonstration
    // In a real application, this data would be fetched from an API or database
    const patientName = "Varun Jethani";
    const scanDate = "2025-03-25";
    const hasPneumonia = mlOutput === "Normal"? false: true; // true or false based on the scan result
  const currentDate = new Date().toLocaleDateString();

  const headercolor = hasPneumonia ? "bg-red-600" : "bg-green-600";
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-[#ffffff5e] rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className= {`${headercolor} px-6 py-4`}>
          <h1 className="text-2xl font-bold text-white">Lung Scan Results</h1>
        </div>
        
        {/* Patient Info */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-medium">{patientName || "John Doe"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Scan Date</p>
              <p className="font-medium">{scanDate || currentDate}</p>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="px-6 py-6">
          <div className={`p-4 rounded-lg ${hasPneumonia ? 'bg-red-50' : 'bg-green-50'}`}>
            <div className="flex items-center">
              {hasPneumonia ? (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              ) : (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {hasPneumonia ? "Pneumonia Detected" : "No Pneumonia Detected"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {hasPneumonia 
                    ? "Your lung scan indicates signs consistent with pneumonia." 
                    : "Your lung scan appears normal with no signs of pneumonia."}
                </p>
              </div>
            </div>
          </div>
          
          {/* What This Means */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">What This Means</h3>
            <p className="mt-2 text-gray-600">
              {hasPneumonia 
                ? "Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough, fever, chills, and difficulty breathing." 
                : "Your lungs appear healthy without any signs of infection or inflammation that would indicate pneumonia."}
            </p>
          </div>
          
          {/* Next Steps */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Recommended Next Steps</h3>
            {hasPneumonia ? (
              <ul className="mt-2 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2">Complete the full course of antibiotics prescribed by your doctor</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2">Rest and stay hydrated</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2">Return for a follow-up scan in 4-6 weeks</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2">Seek immediate medical attention if symptoms worsen (increased difficulty breathing, persistent high fever, coughing up blood)</span>
                </li>
              </ul>
            ) : (
              <ul className="mt-2 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2">No immediate medical intervention is required</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2">Continue with regular health check-ups as recommended by your doctor</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2">If you continue to experience symptoms, please contact your healthcare provider</span>
                </li>
              </ul>
            )}
          </div>
          
          {/* Prevention Tips - Shown for both results */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Prevention Tips</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="ml-2">Wash hands regularly</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="ml-2">Stay up to date with vaccinations</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="ml-2">Avoid smoking and maintain good respiratory health</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This report is based on imaging results only and should be discussed with your healthcare provider. 
            For questions or concerns, please contact your medical provider.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LungScanResults;