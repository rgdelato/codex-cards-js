import React from 'react';
import { Link } from 'react-router';


var HomePage = () => {
	return (
		<div style={{ textAlign: 'center' }}>

			<br /><br />

			<div style={{ width: '50%', margin: '0 auto', border: '1px solid black', padding: '4em' }}>
				Logo
			</div>

			<br /><br /><br /><br />

			<div>
				<input type="text" placeholder="Search..."
					style={{ width: '80%', padding: '2px 4px', fontSize: '1.5em' }}
				/>

				<br />

				<a href="/search"><small>Advanced Search...</small></a>
			</div>

			<br /><br /><br /><br />

			<div>
				{['Red', 'Green', 'Blue', 'Black', 'White', 'Purple'].map((color) => (
					<div key={color}
						style={{ display: 'inline-block', width: '33%', paddingBottom: '1em', verticalAlign: 'top' }}
					>
						<Link to={"/color/" + color.toLowerCase()}>{color}</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
