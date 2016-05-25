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
				<div className="worker-image" style={{ display: 'inline-block', verticalAlign: 'top' }}>
					<div style={{display: 'table'}}>
						<div style={{display: 'table-cell', width: '330px', height: '450px', verticalAlign: 'middle'}}>
							<h2>{starter} Starter</h2>
						</div>
					</div>
				</div>

				<div className="starter-deck-list" style={{ display: 'inline-block', verticalAlign: 'top' }}>
					<div style={{display: 'table'}}>
						<div style={{display: 'table-cell', width: '330px', height: '450px', verticalAlign: 'middle', textAlign: 'left'}}>
							<blockquote>
								{starters[starter].map((name) => {
									var card = cards[name];
									return (
										<div key={card.name}>
											<Link to={"/card/" + toURL(card.name)}>{card.name}</Link> - <small>{card.type}</small>
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
						<div className="spec" key={spec} style={{ display: 'inline-block', width: '33%', verticalAlign: 'top' }}>
							<div className="card-image-container">
								<Link to={"/card/" + toURL(hero.name)}><img className="card-image" src={"http://codexcards-assets.surge.sh/images/" + hero.sirlins_filename} /></Link>
							</div>

							<div className="spec-deck-list" style={{padding: '0 16px', textAlign: 'left'}}>
							<blockquote>
								{cardNames.map((name) => {
									var card = cards[name];
									return (
										<div key={name} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
											<Link to={"/card/" + toURL(card.name)}>{card.name}</Link> - <small>{card.type}</small>
										</div>
									);
								})}
							</blockquote>
							</div>
						</div>
					);
				})}
			</div>

		</div>
	);
};

export default DeckPage;
