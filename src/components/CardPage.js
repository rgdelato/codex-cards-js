import React from 'react';
import { Link } from 'react-router';
import { toURL } from '../utils';


var CardPage = ({ route, params }) => {
	const { cards, urlCardToCard, generalRulings } = route.data;
	const cardName = urlCardToCard[params.card];
	const card = cards[cardName];

	if (!cardName || !card) {
		window.location.replace('/404');
	}

	return (
		<div className="card-page">
			<div className="card-title">
				<h1>{cardName}</h1>
			</div>

			<div style={{ textAlign: 'center' }}>
				<div className="card-image">
					<img src={"http://codexcards-assets.surge.sh/images/" + card.sirlins_filename} />
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

						{(card.cost) ? (
							<span>
								<span>{' \u2022 '}</span>
								<span>Cost: {card.cost}</span>
							</span>
						) : null}

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
						<Link to={"/color/" + toURL(card.color)}>{card.color}</Link>

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
						) : (card.type === 'Ultimate Spell' || card.type === 'Ultimate Ongoing Spell') ? (
							<span> Ultimate Magic</span>
						) : (card.type === 'Hero') ? (
							<span> Hero</span>
						) : null}
					</div>

					{((card.rulings && card.rulings[0].ruling) || (card.keywords && card.keywords.length)) ? (
						<div>
							<br />
							<hr size="1" color="#EEEEEE" />
							<br />
						</div>
					) : null}

					{(card.rulings && card.rulings[0].ruling) ? (
						<div>
							<strong>Card-Specific Rulings</strong>
							<blockquote>
								{card.rulings.map((item) => {
									return (
										(item.ruling) ? (
											<div className="card-ruling" key={item.ruling}>
												{item.ruling} {(item.author) ? <span>&#8212; {item.author}</span> : null}
												</div>
											) : null
										);
								})}
							</blockquote>
						</div>
					) : null}

					{(card.keywords && card.keywords.length) ? (
						card.keywords.map((keyword) => {
							if (generalRulings[keyword] && generalRulings[keyword].length && generalRulings[keyword][0].ruling) {
								return (
									<div key={keyword}>
										<strong>{keyword} Rulings</strong>
										<blockquote>
											{generalRulings[keyword].map((item) => {
												if (item.ruling) {
													return (
														<div className="card-ruling" key={item.ruling}>
															{item.ruling} {(item.author) ? <span>&#8212;{item.author}</span> : null}
														</div>
													);
												} else { return null; }
											})}
										</blockquote>
									</div>
								);
							} else { return null; }
						})
					) : null}

				</div>
			</div>

			{/*(card.rulings && card.rulings[0].ruling) ? (
				<div className="card-rulings">
					<h2>Card-Specific Rulings</h2>
					{card.rulings.map((item) => {
						return (
							(item.ruling) ? (
								<div className="card-ruling" key={item.ruling}>
									{item.ruling} {(item.author) ? <span>&#8212; {item.author}</span> : null}
									</div>
								) : null
							);
					})}
				</div>
			) : null*/}

			{/*(card.keywords && card.keywords.length) ? (
				card.keywords.map((keyword) => {
					if (generalRulings[keyword] && generalRulings[keyword].length && generalRulings[keyword][0].ruling) {
						return (
							<div className="card-rulings" key={keyword}>
								<h3>{keyword} Rulings</h3>
								{generalRulings[keyword].map((item) => {
									if (item.ruling) {
										return (
											<div className="card-ruling" key={item.ruling}>
												{item.ruling} {(item.author) ? <span>&#8212; {item.author}</span> : null}
											</div>
										);
									} else { return null; }
								})}
							</div>
						);
					} else { return null; }
				})
			) : null*/}

			<div style={{ display: 'none', margin: '4em 0' }}>
				<xmp>{JSON.stringify(card, null, '  ')}</xmp>
			</div>

		</div>
	);
};

export default CardPage;
