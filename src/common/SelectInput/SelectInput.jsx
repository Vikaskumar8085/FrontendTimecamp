import React, {useState} from "react";
import "./SelectInput.scss";

const SelectInput = ({label, options, value, onChange, placeholder}) => {
  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <select
        className="custom-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const ProfileForm = () => {
  const [designation, setDesignation] = useState("");

  const designationOptions = [
    {label: "Developer", value: "developer"},
    {label: "Designer", value: "designer"},
    {label: "Manager", value: "manager"},
  ];

  return (
    <form>
      <SelectInput
        label="Designation"
        value={designation}
        onChange={setDesignation}
        options={designationOptions}
        placeholder="Select designation"
      />
    </form>
  );
};

export default ProfileForm;
