import React from 'react';
import { Link } from 'react-router';
import { toURL } from '../utils';


var DeckPage = ({ route, params }) => {
	const { cards, specs, heroes, starters, urlColorToColor, urlColorToSpecs, urlSpecToSpec, urlSpecToColor } = route.data;

	let { color, spec1, spec2, spec3 } = params;
	let starter;
	let deckSpecs;

	if (route.random) {
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
					[ <a href={(color) ? ('/color/' + color) : ('/deck/' + spec1 + '/' + spec2 + '/' + spec3)}>{deckSpecs[0]} {(deckSpecs[1]) ? ('/ ' + deckSpecs[1]) : null} {(deckSpecs[2]) ? ('/ ' + deckSpecs[2]) : null}</a> ]
				</small>
			</div>

			<div className="starter">
				<div className="worker-image">
					<div className="table-hack">
						<div className="card-size table-cell-hack">
							<h2>{starter} Starter</h2>
						</div>
					</div>
				</div>

				<div className="starter-list">
					<div className="table-hack">
						<div className="card-size table-cell-hack">
							<blockquote>
								{starters[starter].map((name) => {
									var card = cards[name];
									return (
										<div className="ellipsis" key={card.name}>
											<Link to={"/card/" + toURL(card.name)}>{card.name}</Link> - <small>{card.bottom}</small>
										</div>
									);
								})}
							</blockquote>
						</div>
					</div>
				</div>
			</div>

			<div className="specs">
				{deckSpecs.map((spec) => {
					var hero = cards[heroes[spec]];
					var cardNames = specs[spec];
					return (
						<div className="spec" key={spec}>
							<div className="card-image-container">
								<Link to={"/card/" + toURL(hero.name)}><img className="card-image" src={"http://codexcards-assets.surge.sh/images/" + hero.sirlins_filename} /></Link>
							</div>

							<div className="spec-list">
								<div className="table-hack">
									<div className="card-size table-cell-hack">
										<blockquote>
											{cardNames.map((name) => {
												var card = cards[name];
												return (
													<div className="ellipsis" key={name}>
														<Link to={"/card/" + toURL(card.name)}>{card.name}</Link> - <small>{card.bottom}</small>
													</div>
												);
											})}
										</blockquote>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

		</div>
	);
};

export default DeckPage;
