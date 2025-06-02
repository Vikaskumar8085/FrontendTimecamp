import React from "react";

const TextArea = ({
  labelText,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  rows = 4,
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div className={`textarea-wrapper ${className}`}>
      {labelText && (
        <label htmlFor={name} className="textarea-label">
          {labelText} {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="textarea-input"
      />
    </div>
  );
};

export default TextArea;
