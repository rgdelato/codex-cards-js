import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import DeckPage from './components/DeckPage';
import CardPage from './components/CardPage';

import './normalize.css';
import './global.scss';



import heroesJSON  from './json/heroes.json';
import neutralJSON from './json/neutral.json';
import redJSON     from './json/red.json';
import greenJSON   from './json/green.json';
import blueJSON    from './json/blue.json';
import blackJSON   from './json/black.json';
import whiteJSON   from './json/white.json';
import purpleJSON  from './json/purple.json';

const cardsJSON = [].concat(heroesJSON, neutralJSON, redJSON, greenJSON, blueJSON, blackJSON, whiteJSON, purpleJSON);

let data = cardsJSON.reduce((acc, item) => {
	const { cards, specs, heroes, colors, starters, urlCardToCard, urlColorToColor, urlColorToSpecs } = acc;

	//
	cards[item.name] = item;

	//
	item.rulings = [];

	//
	if (item.spec) {
		if (!specs[item.spec]) { specs[item.spec] = []; }
		specs[item.spec].push(item.name);
	}

	//
	if (item.type === 'Hero' && item.spec) {
		heroes[item.spec] = item.name;
	}

	//
	if (item.color) {
		if (!colors[item.color]) { colors[item.color] = []; }
		colors[item.color].push(item.name);
	}

	//
	if (item.starting_zone === 'deck' && item.color) {
		if (!starters[item.color]) { starters[item.color] = []; }
		starters[item.color].push(item.name);
	}

	//
	const urlName = item.name.toLowerCase().replace(/\s/g, '_');
	urlCardToCard[urlName] = item.name;

	if (item.color && item.spec) {
		const urlColor = item.color.toLowerCase();
		urlColorToColor[urlColor] = item.color;

		if (!urlColorToSpecs[urlColor]) { urlColorToSpecs[urlColor] = []; }
		if (!urlColorToSpecs[urlColor].includes(item.spec)) { urlColorToSpecs[urlColor].push(item.spec); }
	}

	return acc;
}, { cards: {}, specs: {}, heroes: {}, colors: {}, starters: {}, urlCardToCard: {}, urlColorToColor: {}, urlColorToSpecs: {} });



import rulingsJSON from './json/rulings.json';

let rulings = Object.keys(rulingsJSON).reduce((acc, key) => {
	const rulingsByCard = rulingsJSON[key].reduce((acc, ruling) => {
		acc[ruling.card] = ruling;
		return acc;
	}, {});

	return Object.assign(acc, rulingsByCard);
}, {});

data.rulings = rulings;



ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={HomePage} />
			<Route path="/color/:color" component={DeckPage} data={data} />
			<Route path="/deck/:color/:spec1/:spec2/:spec3" component={DeckPage} data={data} />
			<Route path="/card/:card" component={CardPage} data={data} />
		</Route>
	</Router>,
	document.getElementById('root')
);
