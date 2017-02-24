import React from "react";
import { Link } from "react-router-dom";

import { rulings } from "../rulingData.json";
import { toURL } from "../utils";

const GeneralPage = props => {
  return (
    <div className="card-page">
      <div className="card-title">
        <h1>General Rulings</h1>
      </div>

      <div
        className="card-rulings card-rulings-columns"
        style={{ textAlign: "center" }}
      >
        {Object.keys(rulings).map(key => (
          <div className="ellipsis" key={key}>
            <Link to={"/ruling/" + toURL(key)}>{key}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralPage;
