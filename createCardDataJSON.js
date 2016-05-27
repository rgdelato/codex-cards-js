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

import { toURL } from './src/utils';



const keywordRulings = rulingsJSON['General'].reduce((acc, ruling) => {
	if (!acc[ruling.card]) { acc[ruling.card] = []; }
	acc[ruling.card].push(ruling);
	return acc;
}, {});



const urlKeywordToKeyword = Object.keys(keywordRulings).reduce((acc, keyword) => {
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

	return {...acc, ...rulingsByCard};
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

	// search card text for keywords (for general rulings)
	let uniqueKeywords = {};
	cardTextKeys.forEach((key) => {
		if (item[key]) {
			const cardText = item[key].replace(/\(.*?\)/g, ''); // remove parenthetical text
			urlKeywords.forEach((keyword) => {
				if (cardText.toLowerCase().indexOf(keyword) !== -1) {
					uniqueKeywords[urlKeywordToKeyword[keyword]] = true;
				}
			});
		}
	});
	item.keywords = Object.keys(uniqueKeywords);

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

	// TODO: come up with something better for searches...
	item.searchableText = toURL(item.name).replace(/_/g, ' ');
	if (item.color)            { item.searchableText += ' ' + toURL(item.color).replace(/_/g, ' '); }
	if (item.spec)             { item.searchableText += ' ' + toURL(item.spec).replace(/_/g, ' '); }
	if (item.tech_level == 0)  { item.searchableText += ' ' + 'tech 0'; }
	if (item.tech_level === 1) { item.searchableText += ' ' + 'tech i 1'; }
	if (item.tech_level === 2) { item.searchableText += ' ' + 'tech ii 2'; }
	if (item.tech_level === 3) { item.searchableText += ' ' + 'tech iii 3'; }
	if (item.type === 'Hero')  { item.searchableText += ' ' + 'hero'; }
	if (item.type.indexOf('Spell') !== -1) { item.searchableText += ' ' + item.type.toLowerCase() + ' magic'; }
	item.searchableText += ' ' + item.keywords.map(x => toURL(x).replace(/_/g, ' ')).join(' ');

	return acc;
}, { cards: {}, specs: {}, heroes: {}, colors: {}, starters: {}, urlCardToCard: {}, urlColorToColor: {}, urlColorToSpecs: {}, urlSpecToSpec: {}, urlSpecToColor: {} });

data.keywordRulings = keywordRulings;



fs.writeFileSync('src/cardData.json', JSON.stringify(data, null, '  '));
