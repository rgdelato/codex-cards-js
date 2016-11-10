import React from 'react';
import { Link } from 'react-router';

import Search from './Search';


class HomePage extends React.Component {
	render () {
		const { route } = this.props;

		return (
			<div className="home-page">

				<div>
					<h1>Codex Card Database</h1>
					<p>Card Texts, Rulings, and Randomizers</p>
				</div>

				<Search data={route.data} />

				<div className="banners">
					<div className="banner starter-banner">
						<Link to="/color/neutral">Bashing vs. Finesse</Link>
					</div>

					<div className="banner core-banner">
						<span><Link to="/color/red">Blood Anarchs</Link></span>
						<span> vs. </span>
						<span><Link to="/color/green">Moss Sentinels</Link></span>
					</div>

					<div className="banner core-banner">
						<span><Link to="/color/blue">Flagstone Dominion</Link></span>
						<span> vs. </span>
						<span><Link to="/color/black">Blackhand Scourge</Link></span>
					</div>

					<div className="banner core-banner">
						<span><Link to="/color/white">Whitestar Order</Link></span>
						<span> vs. </span>
						<span><Link to="/color/purple">Vortoss Conclave</Link></span>
					</div>

					<div className="banner">
						<span><Link to="/card/random">Random Card</Link></span>
						<span> | </span>
						<span><Link to="/deck/random">Random Deck</Link></span>
					</div>
				</div>

				<div>
					{[0,1,2].map((index) => (
						<select key={'select_' + index}>
							<option key="disabled">Choose a spec...</option>
							{Object.keys(route.data.urlSpecToSpec).map((key) => (
								<option key={key} value={key}>{route.data.urlSpecToSpec[key]}</option>
							))}
						</select>
					))}
					<Link to={`/deck/${spec1}/${spec2}/${spec3}`}></Link>
				</div>

			</div>
		);
	}
}


export default HomePage;
