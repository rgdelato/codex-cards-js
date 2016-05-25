var fs = require('fs');

var heroesJSON  = require('./json/heroes.json');
var neutralJSON = require('./json/neutral.json');
var redJSON     = require('./json/red.json');
var greenJSON   = require('./json/green.json');
var blueJSON    = require('./json/blue.json');
var blackJSON   = require('./json/black.json');
var whiteJSON   = require('./json/white.json');
var purpleJSON  = require('./json/purple.json');
var rulingsJSON = require('./json/rulings.json');



const rulings = Object.keys(rulingsJSON).reduce((acc, key) => {
	const rulingsByCard = rulingsJSON[key].reduce((acc, ruling) => {
		if (!acc[ruling.card]) { acc[ruling.card] = []; }
		acc[ruling.card].push(ruling);
		return acc;
	}, {});

	return {...acc, ...rulingsByCard};
}, {});


const cardsJSON = [].concat(heroesJSON, neutralJSON, redJSON, greenJSON, blueJSON, blackJSON, whiteJSON, purpleJSON);

let data = cardsJSON.reduce((acc, item) => {
	const { cards, specs, heroes, colors, starters, urlCardToCard, urlColorToColor, urlColorToSpecs } = acc;

	//
	item.rulings = rulings[item.name];

	//
	cards[item.name] = item;

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



fs.writeFileSync('src/cardData.json', JSON.stringify(data, null, '  '));
