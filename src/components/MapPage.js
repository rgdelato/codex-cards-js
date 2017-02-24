import React from "react";
import { Link } from "react-router-dom";

import { maps } from "../cardData.json";
import { toURL } from "../utils";

const MapPage = ({ match: { params } }) => {
  let card;
  if (params.map === "random") {
    const mapIndex = Math.floor(Math.random() * maps.length);
    card = maps[mapIndex];
  } else {
    card = maps.filter(function(mapCard) {
      return toURL(mapCard.name) === params.map;
    })[0];
  }

  if (!card) {
    window.location.replace("/404");
  }

  return (
    <div className="card-page">
      <div className="card-title">
        <h1>{card.name}</h1>
      </div>

      <div style={{ textAlign: "center" }}>
        <div className="card-image">
          <img
            src={"//codexcards-assets.surge.sh/images/" + card.filename}
            alt={card.name}
          />
        </div>

        <div className="card-info">
          <div>
            <span>
              {card.name}
              <span> — </span>
              <Link to="/maps">Map</Link>
            </span>
          </div>

          <blockquote>
            {card.description ? <div>{card.description}</div> : null}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
