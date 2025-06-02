import React from "react";
import {useState} from "react";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";

function InputPassword({
  type,
  value,
  onchange,
  placeholder,
  labelText,
  className,
  ...rest
}) {
  const [ispass, setIsPass] = useState(true);
  const icons = ispass ? <IoEyeOffOutline /> : <IoEyeOutline />;
  return (
    <div className="input_wrapper">
      <label htmlFor={labelText}>{labelText}</label>
      <div className="input_box">
        <input
          type={ispass ? "password" : "text"}
          value={value}
          onChange={onchange}
          className={className}
          placeholder={placeholder}
          {...rest}
        />
        <span onClick={() => setIsPass(!ispass)}>{icons}</span>
      </div>
    </div>
  );
}

export default InputPassword;
