import React from 'react';
import { Link } from 'react-router';

import data from '../cardData.json';
import { toURL } from '../utils';


const GeneralPage = (props) => {
	const generalRulings = data.generalRulings;

	return (
		<div className="card-page">
			<div className="card-title">
				<h1>General Rulings</h1>
			</div>

			<div className="card-rulings card-rulings-columns" style={{ textAlign: 'center' }}>
				{Object.keys(generalRulings).map((key) => (
					<div className="ellipsis" key={key}>
						<Link to={"/ruling/" + toURL(key)}>{key}</Link>
					</div>
				))}
			</div>
		</div>
	);
}


export default GeneralPage;
