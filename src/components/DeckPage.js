import React from 'react';
import { Link } from 'react-router';
import { toURL } from '../utils';


var DeckPage = ({ route, params }) => {
	const { cards, specs, heroes, starters, urlColorToColor, urlColorToSpecs, urlSpecToSpec, urlSpecToColor } = route.data;

	const { color, spec1, spec2, spec3 } = params;
	let starter;
	let deckSpecs;

	if (spec1 && spec2 && spec3) {
		starter = urlSpecToColor[spec1];
		deckSpecs = [ urlSpecToSpec[spec1], urlSpecToSpec[spec2], urlSpecToSpec[spec3] ];
	} else if (color) {
		starter = urlColorToColor[params.color];
		deckSpecs = urlColorToSpecs[params.color];
	}

	return (
		<div className="deck-page">

			<div className="starter">
				<div style={{ display: 'inline-block', border: '1px solid black', borderRadius: '4px', padding: '8px' }}>
					{starter} Starter
				</div>

				<div></div>


				{starters[starter].map((name) => {
					var card = cards[name];
					return (
						<div key={card.name} style={{ display: 'inline-block', width: '33%', verticalAlign: 'top' }}>
							<small>{card.cost}</small> - <Link to={"/card/" + toURL(card.name)}>{card.name}</Link> - <small>{card.type}</small>
						</div>
					);
				})}
			</div>

			<div className="specs">
				{deckSpecs.map((spec) => {
					var hero = cards[heroes[spec]];
					var cardNames = specs[spec].filter((name) => (name !== hero.name));
					return (
						<div key={spec} style={{ display: 'inline-block', width: '33%', verticalAlign: 'top' }}>
							<div className="card-image-container">
								<img className="card-image" src={"http://codexcards-assets.surge.sh/images/" + hero.sirlins_filename} />
							</div>

							<Link to={"/card/" + toURL(hero.name)}>{hero.name}</Link>

							<div>
								{cardNames.map((name) => {
									var card = cards[name];
									return (
										<div key={name}>
											<small>{card.cost}</small> -  <Link to={"/card/" + toURL(card.name)}>{card.name}</Link> - <small>{card.type}</small>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>

		</div>
	);
};

export default DeckPage;
