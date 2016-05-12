import React from 'react';


var CardPage = ({ route, params }) => {
	const { cards, rulings, urlCardToCard } = route.data;
	const cardName = urlCardToCard[params.card];
	const card = cards[cardName];
	return (
		<div>
			Card - {cardName}

			<br /><br />

			<img src={"http://sharp.moe:8000/static/" + card.sirlins_filename} />

			<br /><br />

			{ JSON.stringify(rulings[card.name], null, ' ') }
		</div>
	);
};

export default CardPage;
