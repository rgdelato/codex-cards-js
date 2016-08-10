import React from 'react';
import { Link } from 'react-router';
// import Search from './Search';


var Layout = (props) => {
	return (
		<div>
			<div className="header">
				<Link to="/">Codex Card Database</Link>
				{/* <Search data={props.route.data} /> */}
			</div>
			<div className="content">
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
