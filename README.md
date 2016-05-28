# Codex Card Rulings

A small website to search the card text and rulings for Codex: Card-Time Strategy by Sirlin Games. Currently hosted at `http://codexcards.surge.sh/`.

## Getting Started

Make sure you have Node and npm installed (tested on v4 and higher), then:

```
cd codex-cards-js
npm install
npm start
```

The site runs locally on `http://localhost:8080/`.

## What's Going On Here?

When you `npm start`, the `createCardDataJSON.js` Node script takes all of the JSON files in `./json` and reduces them into a single JSON file at `./src/cardData.json`. (This file also includes several helper mappings, such as `urlCardToCard`.)

Once that's done, Webpack compiles the JS/CSS/HTML in the `src` directory and starts up a dev server hosting a single-page React app.
