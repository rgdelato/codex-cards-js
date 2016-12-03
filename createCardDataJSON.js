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
var mapsJSON    = require('./json/maps.json');

var toURL = require('./src/utils').toURL;


const generalRulings = rulingsJSON['General'].reduce((acc, ruling) => {
	if (!acc[ruling.card]) { acc[ruling.card] = []; }
	acc[ruling.card].push(ruling);
	return acc;
}, {});



const urlRulingToRuling = Object.keys(generalRulings).reduce((acc, ruling) => {
	let urlRuling = toURL(ruling);
	acc[urlRuling] = ruling;
	return acc;
}, {});



const urlKeywordToKeyword = Object.keys(generalRulings).reduce((acc, keyword) => {
	let urlKeyword = keyword.toLowerCase();
	if (urlKeyword.lastIndexOf(' x') === urlKeyword.length - 2) {
		urlKeyword = urlKeyword.slice(0, -2);
	}
	acc[urlKeyword] = keyword;
	return acc;
}, {});



const cardSpecificRulings = Object.keys(rulingsJSON).filter((key) => { return key !== 'General'; }).reduce((acc, key) => {
	const rulingsByCard = rulingsJSON[key].reduce((acc, ruling) => {
		if (!acc[ruling.card]) { acc[ruling.card] = []; }
		acc[ruling.card].push(ruling);
		return acc;
	}, {});

	return Object.assign({}, acc, rulingsByCard);
}, {});



const cardTextKeys = 	[
	'rules_text_1', 'rules_text_2', 'rules_text_3',
	'base_text_1', 'base_text_2', 'base_text_3',
	'mid_text_1', 'mid_text_2', 'mid_text_3',
	'max_text_1', 'max_text_2', 'max_text_3',
	'subtype'
];

const urlKeywords = Object.keys(urlKeywordToKeyword);



const cardsJSON = [].concat(heroesJSON, neutralJSON, redJSON, greenJSON, blueJSON, blackJSON, whiteJSON, purpleJSON);

let data = cardsJSON.reduce((acc, item) => {
	const { cards, specs, heroes, colors, starters, urlCardToCard, urlColorToColor, urlColorToSpecs, urlSpecToSpec, urlSpecToColor } = acc;

	if (!item.sirlins_filename) { return acc; }

	// HACK: Fixing the URL for "Research & Development"
	item.sirlins_filename = item.sirlins_filename.replace('&', '');

	//
	cards[item.name] = item;

	// add card-specific rulings
	item.rulings = cardSpecificRulings[item.name];

	// search card text for keywords (for general rulings) and token cards
	let uniqueKeywords = {};
	let uniqueTokens = {};
	cardTextKeys.forEach((key) => {
		if (item[key]) {
			const cardText = item[key].replace(/\(.*?\)/g, ''); // remove parenthetical text

			urlKeywords.forEach((keyword) => {
				if (cardText.toLowerCase().indexOf(keyword) !== -1) {
					uniqueKeywords[urlKeywordToKeyword[keyword]] = true;
				}
			});

			// If there's a word before "token" and if the first letter of that word is a capital letter,
			// then we'll assume it's a token type.
			// TODO: This regex doesn't work for Lich's Bargain or multi-word token types (e.g. "Mirror Illusion" token)
			const regex = /(\w+)\stoken/g;
			let token = regex.exec(cardText);
			while (token !== null) {
				if (token[1][0] === token[1][0].toUpperCase()) {
					// console.log(item.name, JSON.stringify(token[1]));
					uniqueTokens[token[1]] = true;
				}
				token = regex.exec(cardText);
			}
		}
	});
	item.keywords = Object.keys(uniqueKeywords);
	item.tokens = Object.keys(uniqueTokens);

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
	const urlName = toURL(item.name);
	urlCardToCard[urlName] = item.name;

	if (item.color && item.spec) {
		const urlColor = toURL(item.color);
		const urlSpec = toURL(item.spec);
		urlColorToColor[urlColor] = item.color;
		urlSpecToSpec[urlSpec] = item.spec;
		urlSpecToColor[urlSpec] = item.color;

		if (!urlColorToSpecs[urlColor]) { urlColorToSpecs[urlColor] = []; }
		if (!urlColorToSpecs[urlColor].includes(item.spec)) { urlColorToSpecs[urlColor].push(item.spec); }
	}

	if (item.tech_level == 0) {
		item.bottom = 'Tech 0';
	} else if (item.tech_level === 1) {
		item.bottom = 'Tech I';
	} else if (item.tech_level === 2) {
		item.bottom = 'Tech II';
	} else if (item.tech_level === 3) {
		item.bottom = 'Tech III';
	} else if (item.type === 'Spell' || item.type === 'Ongoing Spell' || item.type === 'Minor Spell' || item.type === 'Minor Ongoing Spell') {
		item.bottom = 'Magic';
	} else if (item.type === 'Ultimate Spell' || item.type === 'Ultimate Ongoing Spell') {
		item.bottom = 'Ultimate Magic';
	} else if (item.type === 'Hero') {
		item.bottom = 'Hero';
	}

	// TODO: come up with something better for searches...
	item.searchableText = toURL(item.name).replace(/_/g, ' ');
	if (item.color)            { item.searchableText += ' ' + toURL(item.color).replace(/_/g, ' '); }
	if (item.spec)             { item.searchableText += ' ' + toURL(item.spec).replace(/_/g, ' '); }
	if (item.type)             { item.searchableText += ' ' + toURL(item.type).replace(/_/g, ' '); }
	if (item.subtype)          { item.searchableText += ' ' + toURL(item.subtype).replace(/_/g, ' '); }
	if (item.tech_level == 0)  { item.searchableText += ' tech 0'; }
	if (item.tech_level === 1) { item.searchableText += ' tech i 1'; }
	if (item.tech_level === 2) { item.searchableText += ' tech ii 2'; }
	if (item.tech_level === 3) { item.searchableText += ' tech iii 3'; }
	if (item.type && item.type.indexOf('Spell') !== -1) { item.searchableText += ' ' + item.type.toLowerCase() + ' magic'; }
	if (item.tech_level == 0 || item.type === 'Minor Spell')  { item.searchableText += ' starter'; }
	item.searchableText += ' ' + item.keywords.map(x => toURL(x).replace(/_/g, ' ')).join(' ');
	if (item.tokens.length)    { item.searchableText += ' ' + item.tokens.map(x => toURL(x).replace(/_/g, ' ')).join(' ') + ' token'; }

	return acc;
}, { cards: {}, specs: {}, heroes: {}, colors: {}, starters: {}, urlCardToCard: {}, urlColorToColor: {}, urlColorToSpecs: {}, urlSpecToSpec: {}, urlSpecToColor: {} });

data.maps = mapsJSON;

fs.writeFileSync('src/cardData.json', JSON.stringify(data, null, '  '));



const rulings = {
	rulings: generalRulings,
	urlRulingToRuling
};

fs.writeFileSync('src/rulingData.json' , JSON.stringify(rulings, null, '  '));
