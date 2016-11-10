import React from 'react';
import { Link } from 'react-router';

var MapListPage = ({ route }) => {
    const { maps } = route.data

	return (
		<div className="map-list-page">

			<div>
				<h1>Codex Card Database</h1>
				<p>Card Texts, Rulings, and Randomizers</p>                
			</div>

			{maps.map((mapCard) => {
                return (
                    <div className="map-card">
                        <div className="map-image">
                            <Link to={"/map/" + mapCard.urlName}> 
                                <img src={"http://codexcards-assets.surge.sh/images/map_" + mapCard.urlName + ".jpg"} />
                            </Link>
                        </div>
                        <div className="map-info">
                            <h2> {mapCard.name} </h2>
                            <p> {mapCard.description} </p>
                        </div>
                    </div>
                );
            })}
        </div>
	);
};

export default MapListPage;
