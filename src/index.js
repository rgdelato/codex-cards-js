import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import GeneralRulingsPage from './components/GeneralRulingsPage';
import RulingPage from './components/RulingPage';
import DeckPage from './components/DeckPage';
import CardPage from './components/CardPage';
import MapsPage from './components/MapsPage';
import MapPage from './components/MapPage';
import NotFoundPage from './components/NotFoundPage';

import './normalize.css';
import './global.css';


if (window.location.toString().indexOf('//codexcards.surge.sh') !== -1) {
	window.location.replace(window.location.toString().replace('//codexcards.surge.sh', '//codexcarddb.com'));
}


ReactDOM.render(
	<BrowserRouter>
		<Layout>
			<Match exactly pattern="/" component={HomePage} />
			<Match pattern="/general" component={GeneralRulingsPage} />
			<Match pattern="/ruling/:ruling" component={RulingPage} />

			<Match pattern="/color/:color" component={DeckPage} />
			<Match pattern="/deck/:spec1/:spec2/:spec3" component={DeckPage} />
			<Match pattern="/deck/random" render={(props) =>
				<DeckPage {...props} random={true} />
			} />

			<Match pattern="/card/:card" component={CardPage} />

			<Match pattern="/maps" component={MapsPage} />
			<Match pattern="/map/:map" component={MapPage} />

			<Miss component={NotFoundPage}/>
		</Layout>
	</BrowserRouter>,
	document.getElementById('root')
);
