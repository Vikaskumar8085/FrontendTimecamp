import React from "react";
import "./inputmultiselect.scss";

const InputCheckboxMulti = ({
  labelText,
  options = [],
  selected = [],
  onChange,
}) => {
  const handleChange = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(newSelected);
  };

  return (
    <div className="checkbox_multi_wrapper">
      <label className="label">{labelText}</label>
      <div className="checkbox_group">
        {options.map((opt) => (
          <label key={opt.value} className="checkbox_option">
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => handleChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputCheckboxMulti;
