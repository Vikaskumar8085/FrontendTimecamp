import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React from "react";

const PhoneInput = ({label, value, onChange}) => {
  return (
    <div style={{padding: 16, width: "100%"}}>
      <label htmlFor="phone-input" style={{display: "block", marginBottom: 8}}>
        {label}
      </label>
      <PhoneInput
        country="us"
        value={value}
        onChange={onChange}
        inputStyle={{padding: 10, width: "100%"}}
        containerStyle={{width: "100%"}}
      />
    </div>
  );
};

export default PhoneInput;
