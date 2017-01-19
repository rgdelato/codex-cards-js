import React from 'react';
import { Link } from 'react-router';

import { cards } from '../cardData.json';
import { toURL } from '../utils';


const Card = ({ name }) => {
	const card = cards[name];

	if (card) {
		return (
			<div className="card-image">
				<Link to={"/card/" + toURL(name)}>
					<img src={"//res.cloudinary.com/rgdelato/image/fetch/f_auto/http://codexcards-assets.surge.sh/images/" + (card.sirlins_filename)} alt={name} />
				</Link>
			</div>
		);
	} else {
		return null;
	}
};


export default Card;
