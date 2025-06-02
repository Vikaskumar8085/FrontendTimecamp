import React from "react";
import "./SearchInput.scss";
import {FiSearch} from "react-icons/fi";
const InputSearch = ({value, onChange}) => {
  return (
    <>
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search here..."
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputSearch;
