import React from 'react';
import { Link } from 'react-router';


var DeckPage = ({ route, params }) => {
	const { cards, specs, heroes, starters, urlColorToColor, urlColorToSpecs } = route.data;
	const starter = urlColorToColor[params.color];
	const deckSpecs = urlColorToSpecs[params.color];

	return (
		<div style={{ textAlign: 'center' }}>
			<div className="starter">
				<div style={{ display: 'inline-block', border: '1px solid black', borderRadius: '4px', padding: '8px' }}>
					{starter} Starter
				</div>

				<br /><br />

				{starters[starter].map((name) => {
					var card = cards[name];
					return (
						<div key={card.name} style={{ display: 'inline-block', width: '33%', verticalAlign: 'top' }}>
							<Link to={"/card/" + card.name.toLowerCase().replace(/\s/g, '_')}>{card.name}</Link> - <small>{card.cost}-Cost {card.type}</small>
						</div>
					);
				})}
			</div>

			<br /><br />

			<div className="specs">
				{deckSpecs.map((spec) => {
					var hero = cards[heroes[spec]];
					var cardNames = specs[spec].filter((name) => (name !== hero.name));
					return (
						<div key={spec} style={{ display: 'inline-block', width: '33%', verticalAlign: 'top' }}>
							<div>
								<img src={"http://sharp.moe:8000/static/" + hero.sirlins_filename} />
								<Link to={"/card/" + hero.name.toLowerCase().replace(/\s/g, '_')}>{hero.name}</Link>
							</div>

							<br /><br />

							<div>
								{cardNames.map((name) => {
									var card = cards[name];
									return (
										<div key={name}>
											<Link to={"/card/" + card.name.toLowerCase().replace(/\s/g, '_')}>{card.name}</Link> - <small>{card.cost}-Cost {card.type}</small>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>

			<br /><br /><br /><br />

		</div>
	);
};

export default DeckPage;
