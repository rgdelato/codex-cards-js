import React from 'react';
import { Link } from 'react-router';

import { cards } from '../cardData.json';
import { toURL } from '../utils';


const CardNameList = ({cardNames}) => {
	return (
		<div className="card-name-list">
			<div className="table-hack">
				<div className="card-size table-cell-hack">
					<blockquote>
						{cardNames.map((name) => {
							var card = cards[name];
							return (
								<div className="ellipsis" key={card.name}>
									<Link to={"/card/" + toURL(card.name)}>{card.name}</Link> - <small>{card.bottom}</small>
								</div>
							);
						})}
					</blockquote>
				</div>
			</div>
		</div>
	);
};


export default CardNameList;
