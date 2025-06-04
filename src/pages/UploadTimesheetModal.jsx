import React, {useState} from "react";
import "./UploadTimesheetModal.scss";
import {IoCloseOutline} from "react-icons/io5";

const UploadTimesheetModal = ({onClose}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadProgress(0);
    setFileContent("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content.split("\n").slice(0, 10).join("\n"); // Preview first 10 lines
      setFileContent(lines);
    };

    if (file && (file.type.includes("text") || file.name.endsWith(".csv"))) {
      reader.readAsText(file);
    } else {
      alert("Only .txt or .csv files are allowed for preview.");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          alert("File uploaded successfully!");
          setSelectedFile(null);
          setFileContent("");
          setUploadProgress(0);
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>Upload Timesheets</h2>
          <button className="close-btn" onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="upload-box">
          <label htmlFor="file-input" className="upload-label">
            📤 Drag or Click to Select File
          </label>
          <input
            id="file-input"
            type="file"
            hidden
            onChange={handleFileChange}
          />
          <p className="upload-desc">
            Quickly import your data and associate to your entire firm.
          </p>
        </div>

        {selectedFile && (
          <div className="file-preview">
            <div>
              <strong>File:</strong> {selectedFile.name}
            </div>
            <div>
              <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
            </div>
          </div>
        )}

        {fileContent && (
          <div className="file-content-preview">
            <h4>File Preview:</h4>
            <pre>{fileContent}</pre>
          </div>
        )}

        {isUploading && (
          <div className="upload-status">
            <div className="status-header">
              <span>Uploading: {selectedFile?.name}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{width: `${uploadProgress}%`}}
              ></div>
            </div>
          </div>
        )}

        <div className="footer">
          <button
            className="footer-btn"
            disabled={!selectedFile || isUploading}
            onClick={handleUpload}
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadTimesheetModal;
