import React from "react";
import "./inputselect.scss";
const InputSelect = ({
  name,
  labelText,
  value,
  onChange,
  onBlur,
  error,
  options = [],
  placeholder = "Please select an option",
  ...rest
}) => {
  return (
    <div className="input_select_wrapper">
      {labelText && <label htmlFor={name}>{labelText}</label>}
      <select
        id={"role"}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        onBlur={onBlur}
        className={`input_select ${error ? "input_error" : ""}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt?.value} value={opt?.value}>
            {opt?.label}
          </option>
        ))}
      </select>
      {error && <p className="input_error_text">{error}</p>}
    </div>
  );
};

export default InputSelect;
