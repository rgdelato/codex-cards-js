import React from "react";

var NotFoundPage = () => {
  return (
    <div className="card-page">
      <div className="card-title">
        <h1>Page Not Found</h1>
      </div>

      <div style={{ textAlign: "center" }}>
        <div className="card-info">
          <div>
            <blockquote>
              Sorry, that page doesn't exist.
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
