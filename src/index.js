import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import GeneralRulingsPage from "./components/GeneralRulingsPage";
import RulingPage from "./components/RulingPage";
import DeckPage from "./components/DeckPage";
import CardPage from "./components/CardPage";
import MapsPage from "./components/MapsPage";
import MapPage from "./components/MapPage";
import NotFoundPage from "./components/NotFoundPage";

import "./normalize.css";
import "semantic-ui-css/semantic.min.css";
// import "./global.css";

if (window.location.toString().indexOf("//codexcards.surge.sh") !== -1) {
  window.location.replace(
    window.location
      .toString()
      .replace("//codexcards.surge.sh", "//codexcarddb.com")
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/general" component={GeneralRulingsPage} />
        <Route path="/ruling/:ruling" component={RulingPage} />

        <Route path="/color/:color" component={DeckPage} />
        <Route path="/deck/:spec1/:spec2/:spec3" component={DeckPage} />
        <Route
          path="/deck/random"
          render={props => <DeckPage {...props} random={true} />}
        />

        <Route path="/card/:card" component={CardPage} />

        <Route path="/maps" component={MapsPage} />
        <Route path="/map/:map" component={MapPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  </BrowserRouter>,
  document.getElementById("root")
);
