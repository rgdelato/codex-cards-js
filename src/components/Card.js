import React from "react";
import { Link } from "react-router-dom";

import { cards } from "../cardData.json";
import { toURL } from "../utils";

const Card = ({ name }) => {
  const card = cards[name];

  return (
    <div className="card-image">
      {card
        ? <Link to={"/card/" + toURL(name)}>
            <img
              src={
                "//codexcards-assets.surge.sh/images/" + card.sirlins_filename
              }
              alt={name}
            />
          </Link>
        : null}
    </div>
  );
};

export default Card;
