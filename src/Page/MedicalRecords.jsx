import React, { useState } from "react";
import "./css/MedicalRecords.css"; // Import external CSS
import { LifeLine } from "react-loading-indicators";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios

const mlBackenLink = "http://127.0.0.1:5000";

const medicalRecords = [
  // {
  //   id: 1,
  //   name: "Brain MRI scan",
  //   description: "Upload your brain MRI scan.",
  //   image:
  //     "https://tse4.mm.bing.net/th?id=OIP.nAXhrxjevtGl73aQ_JewbQHaE8&pid=Api&P=0&h=180",
  //   link: "/mriresult",
  //   endpoint: "/predict_tumor"
  // },
  {
    id: 2,
    name: "Chest CT scan",
    description: "Upload your chest CT scan.",
    link: "/lungresult",
    endpoint: "/predict_pneumonia",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.fIMWaR-z2i5Yn-jhfbTyWgHaE8&pid=Api&P=0&h=180",
  },
  {
    id: 3,
    name: "Skin Microscopy",
    description: "Upload your skin microscopy results.",
    image:
      "https://up.yimg.com/ib/th?id=OIP.pNqwDTg2KEqYw0p7uiGnIwHaE8&pid=Api&rs=1&c=1&qlt=95&w=166&h=110",
    link: "/skinresult",
    endpoint: "/predict_skin_cancer",
  },
  // Other records...
];

const MedicalRecords = () => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [loading, setLoading] = useState({});
  const [mlOutput, setMlOutput] = useState({});

  const handleFileUpload = async (id, event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setLoading((prev) => ({ ...prev, [id]: true }));
    
    // Update uploaded files state to show the file name
    setUploadedFiles((prev) => ({ ...prev, [id]: file.name }));
  
    const formData = new FormData();
    formData.append("image", file);
    const record = medicalRecords.find(record => record.id === id);
    const ep = record.endpoint;
    console.log("Uploading to:", `${mlBackenLink}${ep}`);
  
    try {
      const response = await axios.post(`${mlBackenLink.replace(/\/$/, '')}/${ep.replace(/^\//, '')}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false, // Ensure it's set to false if no authentication is needed
      });
  
      console.log("Server Response:", response.data);
      setMlOutput((prev) => ({ ...prev, [id]: response.data.predicted_class }));
    } catch (error) {
      console.error("Upload error:", error);
      setMlOutput((prev) => ({ ...prev, [id]: "Upload failed" }));
    }
  
    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="medical-records-container">
      <div className="medical-records-grid">
        {medicalRecords.map((record) => (
          <div key={record.id} className="record-card">
            <img
              src={record.image}
              alt={record.name}
              className="record-image"
            />
            <h3 className="record-title">{record.name}</h3>
            <p className="record-description">{record.description}</p>
            <label className="upload-container">
              <input
                type="file"
                onChange={(event) => handleFileUpload(record.id, event)}
              />
              <span className="upload-label">
                {uploadedFiles[record.id] || "Upload Document"}
              </span>
            </label>
            {loading[record.id] && (
              <div className="loading-indicator">
                <LifeLine />
              </div>
            )}
            {/* Fix: The issue was in this conditional rendering section */}
            {mlOutput[record.id] && (
              <Link
                to={record.link}
                className="result-link"
                state={{ mlOutput: mlOutput[record.id] }}
              >
                View Result
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;