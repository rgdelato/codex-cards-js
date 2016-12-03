import React from 'react';
import { Link } from 'react-router';

import { maps } from '../cardData.json';
import { toURL } from '../utils';


var MapListPage = () => {
	return (
		<div className="deck-page" style={{ marginTop: '16px' }}>
			{maps.map((card) => {
					return (
						<div className="card-image-container" style={{display: 'inline-block'}} key={card.name}>
							<Link to={"/map/" + toURL(card.name)}><img className="card-image" src={"http://codexcards-assets.surge.sh/images/" + card.filename} alt={card.name} /></Link>
						</div>
					);
				})}
		</div>
	);
};

export default MapListPage;
