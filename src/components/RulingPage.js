import React from "react";

import { rulings, urlRulingToRuling } from "../rulingData.json";

var RulingPage = ({ match: { params } }) => {
  const rulingName = urlRulingToRuling[params.ruling];

  if (!rulingName) {
    window.location.replace("/404");
  }

  const abilityTextRuling = rulings[rulingName].filter(
    ruling => ruling.abilityText
  )[0];
  const abilityText = abilityTextRuling && abilityTextRuling.abilityText;

  return (
    <div className="card-page">
      <div className="card-title">
        <h1>{rulingName}</h1>
      </div>

      <div style={{ textAlign: "center" }}>
        <div className="card-info">

          {abilityText
            ? <div>
                <div>
                  {abilityText}
                </div>

                <div>
                  <br />
                  <hr size="1" color="#EEEEEE" />
                  <br />
                </div>
              </div>
            : null}

          {rulings[rulingName].length
            ? <div>
                <strong>Rulings</strong>

                <blockquote>
                  {rulings[rulingName].map(item => {
                    return item.ruling
                      ? <div className="card-ruling" key={item.ruling}>
                          {item.ruling}
                          {" "}
                          {item.author
                            ? <span>—&nbsp;{item.author}</span>
                            : null}
                        </div>
                      : null;
                  })}
                </blockquote>
              </div>
            : null}
        </div>
      </div>
    </div>
  );
};

export default RulingPage;
