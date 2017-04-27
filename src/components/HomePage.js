import React from "react";
import { Link } from "react-router-dom";
import CardSearch from "./CardSearch";
import { Card } from "semantic-ui-react";
import DeckBuilder from "./DeckBuilder";

const HomePage = () => (
  <div className="home-page">

    <br /><br />

    <div>
      <h1>Codex Card Database</h1>
      <p>Card Texts, Rulings, and Randomizers</p>
    </div>

    <br /><br />

    <CardSearch />

    <br /><br />
    <br /><br />

    <Card.Group itemsPerRow={2}>
      <Card
        as={Link}
        to="/color/red"
        header="Blood Anarchs"
        meta="Anarchy, Blood, Fire"
        color="red"
      />

      <Card
        as={Link}
        to="/color/green"
        header="Moss Sentinels"
        meta="Balance, Feral, Growth"
        color="green"
      />

      <Card
        as={Link}
        to="/color/blue"
        header="Flagstone Dominion"
        meta="Law, Peace, Truth"
        color="blue"
      />

      <Card
        as={Link}
        to="/color/black"
        header="Blackhand Scourge"
        meta="Demonology, Disease, Necromancy"
        color="black"
      />

      <Card
        as={Link}
        to="/color/white"
        header="Whitestar Order"
        meta="Discipline, Ninjutsu, Strength"
        color="white"
      />

      <Card
        as={Link}
        to="/color/purple"
        header="Vortoss Conclave"
        meta="Past, Present, Future"
        color="purple"
      />
    </Card.Group>

    <Card.Group>
      <Card centered={true} href="/color/red" header="General Rulings" />
    </Card.Group>

    <Card.Group>
      <Card centered={true} href="/maps" header="Map Cards" />
    </Card.Group>

    <Card.Group itemsPerRow={3}>
      <Card href="/card/random" header="Random Card" />

      <Card href="/deck/random" header="Random Deck" />

      <Card href="/map/random" header="Random Map" />
    </Card.Group>

    {/* <div className="banners">
      <div className="banner">
        <Link to="/general">General Rulings</Link>
      </div>

      <div className="banner starter-banner">
        <Link to="/color/neutral">Bashing vs. Finesse</Link>
      </div>

      <div className="banner core-banner">
        <span><Link to="/color/red">Blood Anarchs</Link></span>
        <span> vs. </span>
        <span><Link to="/color/green">Moss Sentinels</Link></span>
      </div>

      <div className="banner core-banner">
        <span><Link to="/color/blue">Flagstone Dominion</Link></span>
        <span> vs. </span>
        <span><Link to="/color/black">Blackhand Scourge</Link></span>
      </div>

      <div className="banner core-banner">
        <span><Link to="/color/white">Whitestar Order</Link></span>
        <span> vs. </span>
        <span><Link to="/color/purple">Vortoss Conclave</Link></span>
      </div>

      <div className="banner">
        <span><Link to="/maps">Map Cards</Link></span>
      </div>

      <div className="banner">
        <span><Link to="/card/random">Random Card</Link></span>
        <span> | </span>
        <span><Link to="/deck/random">Random Deck</Link></span>
        <span> | </span>
        <span><Link to="/map/random">Random Map</Link></span>
      </div>
    </div> */
    }

    {/* <br />

    <DeckBuilder /> */}
  </div>
);

export default HomePage;
