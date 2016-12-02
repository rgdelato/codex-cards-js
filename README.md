# Codex Card Rulings

A small website to search the card text and rulings for Codex: Card-Time Strategy by Sirlin Games. Currently hosted at `http://codexcarddb.com/`.

## Getting Started

Make sure you have Node and npm installed (tested on v6 and higher), then:

```
cd codex-cards-js
npm install
npm start
```

The site runs locally on `http://localhost:3000/`.

## What's Going On Here?

When you `npm start`, the `createCardDataJSON.js` Node script takes all of the JSON files in `./json` and reduces them into a single JSON file at `./src/cardData.json`. (This file also includes several helper mappings, such as `urlCardToCard`.)

Once that's done, Webpack compiles the JS/CSS/HTML in the `src` directory and starts up a Webpack dev server hosting a single-page React app.

The JSON files are exported from sharpobject's spreadsheets, so please don't edit any of the files in `./json`. Instead, edit the source spreadsheets if you would like to update the card data.

...also, apologies in advance, the code is not very good. I'll find the time to clean it up one of these days.
