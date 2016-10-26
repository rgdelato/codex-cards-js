import React from 'react';
import { Link } from 'react-router';

import Search from './Search';


var MapPage = ({ route, params }) => {
    const { maps } = route.data;

    let mapCard 
    if(params.map === "random") {
        const mapIndex = Math.floor(Math.random() * maps.length);
        mapCard = maps[mapIndex];
    } else {
        mapCard = maps.find(function(mapCard) {
            return mapCard.urlName === params.map
        });
    }
    
    if(!mapCard) {
        window.location.replace('/404');
    }

	return (
		<div className="map-page">

			<div>
				<h1>Codex Card Database</h1>
				<p>Card Texts, Rulings, and Randomizers</p>                
			</div>

			<div className="map-card">
                <div className="map-image">
					<img src={"http://codexcards-assets.surge.sh/images/map_" + mapCard.urlName + ".jpg"} />
				</div>
                <div className="map-info">
                    <h2> {mapCard.name} </h2>
                    <p> {mapCard.description} </p>
                </div>
            </div>

		</div>
	);
};

export default MapPage;
