import React from 'react';
import { Link } from 'react-router';


var CardPage = ({ route, params }) => {
	const { cards, urlCardToCard } = route.data;
	const cardName = urlCardToCard[params.card];
	const card = cards[cardName];

	return (
		<div className="card-page">
			<div style={{ boxSizing: 'border-box', width: '825px', margin: '0 auto', padding: '0 16px' }}>
				<h1>{cardName}</h1>
			</div>

			<div style={{ textAlign: 'center' }}>
				<div className="card-image-container" style={{ display: 'inline-block', width: '330px', height: '450px', verticalAlign: 'top' }}>
					<img className="card-image" src={"http://codexcards-assets.surge.sh/images/" + card.sirlins_filename} />
				</div>

				<div className="card-info">
					<div>
						<span>{card.type}</span>
						{(card.subtype) ? (
							<span>
								<span> &#8212; </span>
								<span>{card.subtype}</span>
							</span>
						) : null}
						{' \u2022 '}
						<span>Cost: {card.cost}</span>
						{(card.ATK || card.HP) ? (
							<span>
								<span>{' \u2022 '}</span>
								<span>ATK: {card.ATK} {'\u2022'} HP: {card.HP}</span>
							</span>
						) : null}
					</div>

					<blockquote>
						{(card.rules_text_1) ? (<div>{card.rules_text_1}</div>) : null}
						{(card.rules_text_2) ? (<div>{card.rules_text_2}</div>) : null}
						{(card.rules_text_3) ? (<div>{card.rules_text_3}</div>) : null}

						{(card.type === 'Hero') ? (
							<div>
								<div><strong>Level 1-{card.mid_level - 1}:</strong> {card.base_text_1} {card.base_text_2} {card.base_text_3} {'\u2022'} ATK: {card.ATK_1} {'\u2022'} HP: {card.HP_1}</div>
								<div><strong>Level {card.mid_level}-{card.max_level - 1}:</strong> {card.mid_text_1} {card.mid_text_2} {card.mid_text_3} {'\u2022'} ATK: {card.ATK_2} {'\u2022'} HP: {card.HP_2}</div>
								<div><strong>Level {card.max_level}:</strong> {card.max_text_1} {card.max_text_2} {card.max_text_3} {'\u2022'} ATK: {card.ATK_3} {'\u2022'} HP: {card.HP_3}</div>
							</div>
						) : null}
					</blockquote>

					{(card.flavor_text) ? (
						<div className="card-flavor">{card.flavor_text}</div>
					) : null}

					<div>
						<Link to={"/color/" + card.color.toLowerCase()}>{card.color}</Link>

						{(card.spec) ? (
							<span>
								<span>{' \u2022 '}</span>
								<span>{card.spec}</span>
							</span>
						) : null}

						{(card.tech_level == 0) ? (
							<span> Tech 0</span>
						) : (card.tech_level === 1) ? (
							<span> Tech I</span>
						) : (card.tech_level === 2) ? (
							<span> Tech II</span>
						) : (card.tech_level === 3) ? (
							<span> Tech III</span>
						) : (card.type === 'Spell' || card.type === 'Minor Spell') ? (
							<span> Magic</span>
						) : (card.type === 'Ultimate Spell') ? (
							<span> Ultimate Magic</span>
						) : (card.type === 'Hero') ? (
							<span> Hero</span>
						) : null}
					</div>
				</div>
			</div>

			{(card.rulings && card.rulings[0].ruling) ? (
				<div style={{ boxSizing: 'border-box', width: '825px', margin: '0 auto', padding: '0 16px' }}>
					<h2>Card Rulings</h2>
					{card.rulings.map((item) => {
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
			): (
				null
			)}

			<div style={{ display: 'none' }}>
				<br /><br />
				<xmp>{JSON.stringify(card, null, '  ')}</xmp>
			</div>

		</div>
	);
};

export default CardPage;
