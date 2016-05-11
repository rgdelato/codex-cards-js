import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import DeckPage from './components/DeckPage';

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

var JSON = [].concat(heroesJSON, neutralJSON, redJSON, greenJSON, blueJSON, blackJSON, whiteJSON, purpleJSON);

var data = JSON.reduce((acc, item) => {
	var { cards, specs, heroes, colors, starters, colorToSpecs } = acc;

	//
	cards[item.name] = item;

	//
	if (item.spec) {
		if (!specs[item.spec]) { specs[item.spec] = []; }
		specs[item.spec].push(item.name);

		if (item.type === 'Hero') {
			heroes[item.spec] = item.name;
		}
	}

	//
	if (item.color) {
		if (!colors[item.color]) { colors[item.color] = []; }
		colors[item.color].push(item.name);

		if (item.spec) {
			if (!colorToSpecs[item.color]) { colorToSpecs[item.color] = []; }
			if (!colorToSpecs[item.color].includes(item.spec)) { colorToSpecs[item.color].push(item.spec); }
		}
	}

	//
	if (item.starting_zone === 'deck') {
		if (!starters[item.color]) { starters[item.color] = []; }
		starters[item.color].push(item.name);
	}

	return acc;
}, { cards: {}, specs: {}, heroes: {}, colors: {}, starters: {}, colorToSpecs: {} });

// console.log('data', data);



ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={HomePage} />
			<Route path="/color/:color" component={DeckPage} data={data} />
			<Route path="/deck/:color/:spec1/:spec2/:spec3" component={DeckPage} data={data} />
		</Route>
	</Router>,
	document.getElementById('root')
);
