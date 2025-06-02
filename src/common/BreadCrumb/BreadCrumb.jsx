import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const Breadcrumb = ({pageName}) => {
  return (
    <div className="breadcrumb-container">
      <h2 className="breadcrumb-title">{pageName}</h2>
      <nav>
        <ol className="breadcrumb-nav">
          <li>
            <Link className="breadcrumb-link" to="/dashboard">
              Dashboard {">"}
            </Link>
          </li>
          <li className="breadcrumb-current">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

Breadcrumb.propTypes = {
  pageName: PropTypes.string.isRequired,
};
export default React.memo(Breadcrumb);
