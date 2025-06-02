import React, {useState} from "react";
const InputFileupload = ({paragraph, title, ...rest}) => {
  const [filename, setfilename] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setfilename(file.name);
    }
    // Forward file input change to parent if a handler is passed
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <>
      <div className="input_file_upload_wrapper">
        <div className="input_file_upload_box_wrapper">
          <div className="input_file_upload_box">
            <div className="input_file_upload_text_wrapper">
              <div className="upload-icon"></div>
              <h1>{title}</h1>
              <p>
                {paragraph ||
                  "   Attach files to provide additional context or support for your task ."}
              </p>
              {filename && (
                <div className="selected-file-name">
                  <strong>Selected file:</strong> {filename}
                </div>
              )}
            </div>
            <div className="input_file_upload_input_wrapper">
              <label className="input_file_upload_input_box">
                <div className="text-paragraph">Select File</div>
                <input
                  type="file"
                  accept="*"
                  hidden
                  {...rest}
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

export default InputFileupload;
