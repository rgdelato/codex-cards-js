import React from 'react';


var DeckPage = ({ route, params}) => {
	const { cards, specs, heroes, starters, colorToSpecs } = route.data;
	const color = (params.color) ?
									params.color[0].toUpperCase() + params.color.slice(1) : undefined;
	const starter = color;
	const deckSpecs = colorToSpecs[color];

	return (
		<div style={{ textAlign: 'center' }}>
			<div className="starter">
				<div style={{ display: 'inline-block', border: '1px solid black', borderRadius: '4px', padding: '8px' }}>
					{starter} Starter
				</div>

				<br /><br />

				{starters[starter].map((cardName) => {
					var card = cards[cardName];
					return (
						<div key={card.name} style={{ display: 'inline-block', width: '33%', verticalAlign: 'top' }}>
							{card.name} - <small>{card.cost}-Cost {card.type}</small>
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
								{hero.name}
							</div>

							<br /><br />

							<div>
								{cardNames.map((name) => {
									var card = cards[name];
									return (
										<div key={name}>
											{name} - <small>{card.cost}-Cost {card.type}</small>
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
