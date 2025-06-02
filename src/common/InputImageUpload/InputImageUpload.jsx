import React, {useState, useEffect} from "react";
import "./inputimageupload.scss";
const InputImageUpload = ({name, value, onChange}) => {
  const [preview, setPreview] = useState("https://i.ibb.co/4pDNDk1/avatar.png");

  useEffect(() => {
    // Show preview if value is a file or base64
    if (value && typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onChange(name, file); // pass back to Formik
    }
  };

  return (
    <>
      <div className="input_image_wrapper">
        <div className="input_image_box">
          {/* Left Side: Image Preview */}
          <div className="input_image_box_left_side">
            <div className="image_wrapper">
              <img src={preview} alt="Profile Preview" />
            </div>
          </div>

          {/* Right Side: Upload Prompt */}
          <div className="input_image_box_right_side">
            <div className="input_image_box_wrapper">
              <p style={{color: "#2B2A3F"}}>
                Click to upload your profile picture
              </p>
              <p style={{color: "#86919B"}}>PNG, JPG (MAX 5 MB)</p>
              <label className="upload_label">
                <div className="upload_box">{name}</div>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputImageUpload;
