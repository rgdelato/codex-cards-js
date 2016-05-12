import React from 'react';
import { Link } from 'react-router';


var CardPage = ({ route, params }) => {
	const { cards, rulings, urlCardToCard } = route.data;
	const cardName = urlCardToCard[params.card];
	const card = cards[cardName];

	return (
		<div>
			<div style={{ boxSizing: 'border-box', width: '660px', margin: '0 auto', padding: '0 16px' }}>
				<h1>{cardName}</h1>
			</div>

			<div style={{ textAlign: 'center' }}>
				<div className="card-image" style={{ display: 'inline-block', width: '330px', height: '450px', verticalAlign: 'top' }}>
					<img src={"http://codexcards-assets.surge.sh/images/" + card.sirlins_filename} />
				</div>

				<div className="card-info" style={{ display: 'inline-block', boxSizing: 'border-box', width: '330px', height: '450px', paddingTop: '16px', verticalAlign: 'top' }}>
					<span><strong>Card Name:</strong> {card.name}</span>
					<br />
					<span><strong>Cost:</strong> {card.cost}</span>
					<br />
					<span><strong>Type/Subtypes:</strong> {card.type} <span>&#8212;</span> {card.subtype}</span>
					<br />
					<span><strong>Color/Spec:</strong> <Link to={"/color/" + card.color.toLowerCase()}>{card.color}</Link>/{card.spec}</span>
					<br /><br />
					<span>
						<strong>Text:</strong>
						<br />
						{card.rules_text_1}<br />
						{card.rules_text_2}<br />
						{card.rules_text_3}<br />
						{card.base_text_1}<br />
						{card.mid_text_1}<br />
						{card.max_text_1}<br />
					</span>
				</div>
			</div>

			<br />

			<div style={{ width: '660px', margin: '0 auto' }}>
				{rulings[card.name].map((item) => {
					return ((item.ruling) ?
						<div
							key={item.ruling}
							style={{ marginBottom: '1em' }}
						>
							{item.ruling} <span>&#8212;</span> {item.author}
						</div>
						:
						null
					);
				})}
			</div>

			<br /><br />
		</div>
	);
};

export default CardPage;
