import React from 'react';

import data from '../cardData.json';


var RulingPage = ({ route, params }) => {
	const { generalRulings, urlRulingToRuling } = data;
	const urlRuling = params.ruling;
	const rulingName = urlRulingToRuling[urlRuling];
	const abilityTextRuling = generalRulings[rulingName].filter((ruling) => ruling.abilityText)[0];
	const abilityText = abilityTextRuling && abilityTextRuling.abilityText;

	return (
		<div className="card-page">
			<div className="card-title">
				<h1>{rulingName}</h1>
			</div>

			<div style={{ textAlign: 'center' }}>
				<div className="card-info">

					{(abilityText) ? (
						<div>
							<div>
								{ abilityText }
							</div>

							<div>
								<br />
								<hr size="1" color="#EEEEEE" />
								<br />
							</div>
						</div>
					) : null}

					{(generalRulings[rulingName].length) ? (
						<div>
							<strong>Rulings</strong>

							<blockquote>
								{generalRulings[rulingName].map((item) => {
									return (
										(item.ruling) ? (
											<div className="card-ruling" key={item.ruling}>
												{item.ruling} {(item.author) ? <span>&#8212;&#0160;{item.author}</span> : null}
												</div>
											) : null
										);
								})}
							</blockquote>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default RulingPage;
