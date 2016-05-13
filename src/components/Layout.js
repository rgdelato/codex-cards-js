import React from 'react';
import { Link } from 'react-router';


var Layout = (props) => {
	return (
		<div>
			<div className="header">
				<Link to="/">Codex Cards</Link>
			</div>
			<div className="content">
				{props.children}
			</div>

			<br /><br />
		</div>
	);
};

export default Layout;
