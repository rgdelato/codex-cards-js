import React from 'react';
import { Link } from 'react-router';


var MapPage = ({ route, params }) => {
		const { maps } = route.data;

		let card;
		if (params.map === "random") {
				const mapIndex = Math.floor(Math.random() * maps.length);
				card = maps[mapIndex];
		} else {
				card = maps.find(function(mapCard) {
						return mapCard.urlName === params.map
				});
		}

		if(!card) {
				window.location.replace('/404');
		}

	return (
		<div className="card-page">
			<div className="card-title">
				<h1>{card.name}</h1>
			</div>

			<div style={{ textAlign: 'center' }}>
				<div className="card-image">
					<img src={"http://codexcards-assets.surge.sh/images/" + card.filename} />
				</div>

				<div className="card-info">
					<div>
						<span>
							{card.name}
							<span> &#8212; </span>
							<Link to="/maps">Map</Link>
						</span>
					</div>

					<blockquote>
						{(card.description) ? (<div>{card.description}</div>) : null}
					</blockquote>
				</div>
			</div>
		</div>
	);
};

export default MapPage;
