import React from 'react';
import { Link } from 'react-router';
import { toURL } from '../utils';


var MapListPage = ({ route }) => {
    const { maps } = route.data

	return (
		<div className="deck-page" style={{ marginTop: '16px' }}>
			{maps.map((card) => {
					return (
						<div className="card-image-container" style={{display: 'inline-block'}} key={card.name}>
							<Link to={"/map/" + toURL(card.name)}><img className="card-image" src={"http://codexcards-assets.surge.sh/images/" + card.filename} /></Link>
						</div>
					);
				})}
		</div>
	);
};

export default MapListPage;
