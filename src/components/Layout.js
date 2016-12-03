import React from 'react';
import { Link } from 'react-router';
import Search from './Search';


var Layout = (props) => {
	return (
		<div>
			<div className="header">
				<div style={{ display: 'inline-block' }}>
					<Link to="/">Codex Card Database</Link>
				</div>

				<Search />
			</div>
			<div className="content">
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
