import React from 'react';
import { Link } from 'react-router';
import { toURL } from '../utils';


const GeneralPage = (props) => {
	const generalRulings = props.route.data.generalRulings;

	return (
		<div className="card-page">
			<div className="card-title">
				<h1>General Rulings</h1>
			</div>

			<div className="card-rulings" style={{ textAlign: 'center', columnWidth: '136px' }}>
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
