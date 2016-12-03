import React from 'react';
import { Match, Link } from 'react-router';
import Card from './Card';
import CardNameList from './CardNameList';

import { cards, specs, heroes, starters, urlColorToColor, urlColorToSpecs, urlSpecToSpec, urlSpecToColor } from '../cardData.json';


var DeckPage = ({ pathname, params, random }) => {
	let { color, spec1, spec2, spec3 } = params;
	let starter;
	let deckSpecs;

	if (random) {
		let specKeys = Object.keys(urlSpecToSpec);
		let index1 = Math.floor(Math.random() * specKeys.length);
		spec1 = specKeys[index1];
		specKeys.splice(index1, 1);
		let index2 = Math.floor(Math.random() * specKeys.length);
		spec2 = specKeys[index2];
		specKeys.splice(index2, 1);
		let index3 = Math.floor(Math.random() * specKeys.length);
		spec3 = specKeys[index3];
		specKeys.splice(index3, 1);
	}

	if (spec1 && spec2 && spec3) {
		starter = urlSpecToColor[spec1];
		deckSpecs = [ urlSpecToSpec[spec1], urlSpecToSpec[spec2], urlSpecToSpec[spec3] ];

		if (!deckSpecs[0] || !deckSpecs[1] || !deckSpecs[2]) {
			window.location.replace('/404');
		}

	} else if (color) {
		starter = urlColorToColor[color];
		deckSpecs = urlColorToSpecs[color];

		if (!starter || !deckSpecs) {
			window.location.replace('/404');
		}
	}

	return (
		<div className="deck-page">

			<div style={{ marginTop: '16px' }}>
				<small>
					[ <Link to={(color) ? ('/color/' + color) : ('/deck/' + spec1 + '/' + spec2 + '/' + spec3)}>{deckSpecs[0]} {(deckSpecs[1]) ? ('/ ' + deckSpecs[1]) : null} {(deckSpecs[2]) ? ('/ ' + deckSpecs[2]) : null}</Link> ]
				</small>

				<br />

				<small>
					[ <Link to={((color) ? ('/color/' + color) : ('/deck/' + spec1 + '/' + spec2 + '/' + spec3)) + '/images'}>All Images</Link> ]
				</small>
			</div>

			<Match pattern={`${pathname}/images`}>
				{({ matched }) => {

					// "All Images" layout
					if (matched) {
						const cardNames = [].concat(starters[starter], specs[deckSpecs[0]] || [], specs[deckSpecs[1]] || [], specs[deckSpecs[2]] || []);

						return (
							<div>
								{cardNames.map((name) => {
									const card = cards[name];
									return (
										<Card key={card.name} name={card.name} />
									);
								})}
							</div>
						);

					// Default Layout
					} else {
						return (
							<div>
								<div className="starter">
									<div className="worker-image">
										<div className="table-hack">
											<div className="card-size table-cell-hack">
												<h2>{starter} Starter</h2>
											</div>
										</div>
									</div>

									<div className="starter-list">
										<CardNameList cardNames={starters[starter]} />
									</div>
								</div>

								<div className="specs">
									{deckSpecs.map((spec) => {
										const hero = cards[heroes[spec]];
										const cardNames = specs[spec];

										return (
											<div className="spec" key={spec}>
												<Card name={hero.name} />

												<div className="spec-list">
													<CardNameList cardNames={cardNames} />
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					}
				}}
			</Match>
		</div>
	);
};

export default DeckPage;
