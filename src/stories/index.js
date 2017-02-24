import React from "react";
import { storiesOf, addDecorator } from "@kadira/storybook";

import "../normalize.css";
import "../global.css";

import { BrowserRouter } from "react-router";
import Welcome from "./Welcome";
import Search from "../components/Search";
import Card from "../components/Card";
import CardNameList from "../components/CardNameList";

addDecorator(story => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}
  >
    {story()}
  </div>
));

storiesOf("Search", module).add("Basic Search", () => (
  <BrowserRouter>
    <Search />
  </BrowserRouter>
));

storiesOf("Card", module)
  .add("Grave Stormborne", () => (
    <BrowserRouter>
      <Card name="Grave Stormborne" />
    </BrowserRouter>
  ))
  .add("Young Lightning Dragon", () => (
    <BrowserRouter>
      <Card name="Young Lightning Dragon" />
    </BrowserRouter>
  ));

storiesOf("CardNameList", module).add("Red Cards", () => (
  <BrowserRouter>
    <CardNameList
      cardNames={[
        "Captain Zane",
        "Surprise Attack",
        "Gunpoint Taxman",
        "Steam Tank",
        "Pirate Gunship"
      ]}
    />
  </BrowserRouter>
));
