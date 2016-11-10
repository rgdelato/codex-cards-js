import React from 'react';


var RulingPage = ({ route, params }) => {
	const { generalRulings, urlRulingToRuling } = route.data;
	const urlRuling = params.ruling;
	const rulingName = urlRulingToRuling[urlRuling];
	const abilityText = generalRulings[rulingName].find((ruling) => ruling.abilityText).abilityText;

	return (
		<div className="card-page">
			<div className="card-title">
				<h1>{rulingName}</h1>
			</div>

			<div style={{ textAlign: 'center' }}>
				<div className="card-info">
					<div>
						{ abilityText }
					</div>

					{(generalRulings[rulingName].length > 1) ? (
						<div>
							<br />
							<hr size="1" color="#EEEEEE" />
							<br />
						</div>
					): null}

					{(generalRulings[rulingName].length) ? (
						<div>
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
