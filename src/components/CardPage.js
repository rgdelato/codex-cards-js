import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { toURL } from "../utils";

import { Header, Item, Segment, Label, List, Icon } from "semantic-ui-react";

import { cards, urlCardToCard } from "../cardData.json";
import { rulings as generalRulings } from "../rulingData.json";

var CardPage = ({ match: { params }, random }) => {
  let cardName;
  if (params.card === "random") {
    const cardKeys = Object.keys(cards);
    cardName = cardKeys[Math.floor(Math.random() * cardKeys.length)];
  } else {
    cardName = urlCardToCard[params.card];
  }

  const card = cards[cardName];

  if (!cardName || !card) {
    window.location.replace("/404");
  }

  return (
    <div className="card-page" style={{ textAlign: "left" }}>
      {/* <div className="card-title">
        <h1>{cardName}</h1>
      </div> */
      }

      <Item.Group>
        <Item>
          <Item.Image
            size="medium"
            src={"//codexcards-assets.surge.sh/images/" + card.sirlins_filename}
          />

          <Item.Content>
            <br />
            <Item.Header>{cardName}</Item.Header>

            <Item.Meta>
              {card.type}

              {card.subtype
                ? <span>
                    <span> — </span>
                    <span>{card.subtype}</span>
                  </span>
                : null}

              {card.cost
                ? <span>
                    <span>{" \u2022 "}</span>
                    <span>Cost: {card.cost}</span>
                  </span>
                : null}

              {card.ATK || card.HP
                ? <span>
                    <span>{" \u2022 "}</span>
                    <span>ATK: {card.ATK} {"\u2022"} HP: {card.HP}</span>
                  </span>
                : null}
            </Item.Meta>

            <Item.Description>
              <Segment.Group>
                <Segment>
                  {card.rules_text_1 ? <div>{card.rules_text_1}</div> : null}
                  {card.rules_text_2 ? <div>{card.rules_text_2}</div> : null}
                  {card.rules_text_3 ? <div>{card.rules_text_3}</div> : null}

                  {card.type === "Hero"
                    ? <div>
                        <div>
                          <strong>Level 1-{card.mid_level - 1}:</strong>
                          {" "}
                          {card.base_text_1}
                          {" "}
                          {card.base_text_2}
                          {" "}
                          {card.base_text_3}
                          {" "}
                          {"\u2022"}
                          {" "}ATK:{" "}
                          {card.ATK_1}
                          {" "}
                          {"\u2022"}
                          {" "}HP:{" "}
                          {card.HP_1}
                        </div>
                        <div>
                          <strong>
                            Level {card.mid_level}-{card.max_level - 1}:
                          </strong>
                          {" "}
                          {card.mid_text_1}
                          {" "}
                          {card.mid_text_2}
                          {" "}
                          {card.mid_text_3}
                          {" "}
                          {"\u2022"}
                          {" "}ATK:{" "}
                          {card.ATK_2}
                          {" "}
                          {"\u2022"}
                          {" "}HP:{" "}
                          {card.HP_2}
                        </div>
                        <div>
                          <strong>Level {card.max_level}:</strong>
                          {" "}
                          {card.max_text_1}
                          {" "}
                          {card.max_text_2}
                          {" "}
                          {card.max_text_3}
                          {" "}
                          {"\u2022"}
                          {" "}ATK:{" "}
                          {card.ATK_3}
                          {" "}
                          {"\u2022"}
                          {" "}HP:{" "}
                          {card.HP_3}
                        </div>
                      </div>
                    : null}

                  {card.flavor_text ? <br /> : null}

                  {card.flavor_text
                    ? <div className="card-flavor">{card.flavor_text}</div>
                    : null}

                  <br />

                  <Label as={Link} to={"/color/" + toURL(card.color)}>
                    {card.color}
                  </Label>

                  {card.spec ? <Label>{card.spec}</Label> : null}

                  {card.bottom ? <Label>{card.bottom}</Label> : null}
                </Segment>

              </Segment.Group>

              <Segment.Group>
                <Segment>
                  {card.rulings && card.rulings[0].ruling
                    ? <div>
                        <List>
                          <Header size="small">Card-Specific Rulings</Header>
                          {card.rulings.map(item => {
                            return item.ruling
                              ? <List.Item key={item.ruling}>
                                  <Icon name="right triangle" />
                                  <List.Content>
                                    <List.Description>
                                      {item.ruling}
                                      {" "}
                                      {item.author
                                        ? <span>—&nbsp;{item.author}</span>
                                        : null}
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                              : null;
                          })}
                        </List>
                      </div>
                    : null}
                </Segment>

                {card.keywords && card.keywords.length
                  ? card.keywords.map(keyword => {
                      if (
                        generalRulings[keyword] &&
                        generalRulings[keyword].length &&
                        generalRulings[keyword][0].ruling
                      ) {
                        return (
                          <Segment key={keyword}>
                            <List>
                              <Header size="small">{keyword} Rulings</Header>
                              {generalRulings[keyword].map(item => {
                                if (item.ruling) {
                                  return (
                                    <List.Item key={item.ruling}>
                                      <Icon name="right triangle" />
                                      <List.Content>
                                        <List.Description>
                                          {item.ruling}
                                          {" "}
                                          {item.author
                                            ? <span>—&nbsp;{item.author}</span>
                                            : null}
                                        </List.Description>
                                      </List.Content>
                                    </List.Item>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            </List>
                          </Segment>
                        );
                      } else {
                        return null;
                      }
                    })
                  : null}
              </Segment.Group>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>

      <br /><br />

      {/* <div style={{ textAlign: "center" }}>
        <Card name={cardName} />

        <div className="card-info">
          <div>
            <span>{card.type}</span>
            {card.subtype
              ? <span>
                  <span> — </span>
                  <span>{card.subtype}</span>
                </span>
              : null}

            {card.cost
              ? <span>
                  <span>{" \u2022 "}</span>
                  <span>Cost: {card.cost}</span>
                </span>
              : null}

            {card.ATK || card.HP
              ? <span>
                  <span>{" \u2022 "}</span>
                  <span>ATK: {card.ATK} {"\u2022"} HP: {card.HP}</span>
                </span>
              : null}
          </div>

          <blockquote>
            {card.rules_text_1 ? <div>{card.rules_text_1}</div> : null}
            {card.rules_text_2 ? <div>{card.rules_text_2}</div> : null}
            {card.rules_text_3 ? <div>{card.rules_text_3}</div> : null}

            {card.type === "Hero"
              ? <div>
                  <div>
                    <strong>Level 1-{card.mid_level - 1}:</strong>
                    {" "}
                    {card.base_text_1}
                    {" "}
                    {card.base_text_2}
                    {" "}
                    {card.base_text_3}
                    {" "}
                    {"\u2022"}
                    {" "}ATK:{" "}
                    {card.ATK_1}
                    {" "}
                    {"\u2022"}
                    {" "}HP:{" "}
                    {card.HP_1}
                  </div>
                  <div>
                    <strong>
                      Level {card.mid_level}-{card.max_level - 1}:
                    </strong>
                    {" "}
                    {card.mid_text_1}
                    {" "}
                    {card.mid_text_2}
                    {" "}
                    {card.mid_text_3}
                    {" "}
                    {"\u2022"}
                    {" "}ATK:{" "}
                    {card.ATK_2}
                    {" "}
                    {"\u2022"}
                    {" "}HP:{" "}
                    {card.HP_2}
                  </div>
                  <div>
                    <strong>Level {card.max_level}:</strong>
                    {" "}
                    {card.max_text_1}
                    {" "}
                    {card.max_text_2}
                    {" "}
                    {card.max_text_3}
                    {" "}
                    {"\u2022"}
                    {" "}ATK:{" "}
                    {card.ATK_3}
                    {" "}
                    {"\u2022"}
                    {" "}HP:{" "}
                    {card.HP_3}
                  </div>
                </div>
              : null}
          </blockquote>

          {card.flavor_text
            ? <div className="card-flavor">{card.flavor_text}</div>
            : null}

          <div>
            <Link to={"/color/" + toURL(card.color)}>{card.color}</Link>

            {card.spec
              ? <span>
                  <span>{" \u2022 "}</span>
                  <span>{card.spec}</span>
                </span>
              : null}

            {card.bottom ? <span> {card.bottom}</span> : null}
          </div>

          {(card.rulings && card.rulings[0].ruling) ||
            (card.keywords && card.keywords.length)
            ? <div>
                <br />
                <hr size="1" color="#EEEEEE" />
                <br />
              </div>
            : null}

          {card.rulings && card.rulings[0].ruling
            ? <div>
                <strong>Card-Specific Rulings</strong>
                <blockquote>
                  {card.rulings.map(item => {
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

          {card.keywords && card.keywords.length
            ? card.keywords.map(keyword => {
                if (
                  generalRulings[keyword] &&
                  generalRulings[keyword].length &&
                  generalRulings[keyword][0].ruling
                ) {
                  return (
                    <div key={keyword}>
                      <strong>{keyword} Rulings</strong>
                      <blockquote>
                        {generalRulings[keyword].map(item => {
                          if (item.ruling) {
                            return (
                              <div className="card-ruling" key={item.ruling}>
                                {item.ruling}
                                {" "}
                                {item.author
                                  ? <span>—&nbsp;{item.author}</span>
                                  : null}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </blockquote>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            : null}

        </div>
      </div> */
      }

    </div>
  );
};

export default CardPage;
