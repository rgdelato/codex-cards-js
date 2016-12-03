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
			<Match exactly pattern="/" render={(props) => <HomePage {...props} /> } />
			<Match exactly pattern="/general" render={(props) => <GeneralRulingsPage {...props} />} />
			<Match exactly pattern="/ruling/:ruling" render={(props) => <RulingPage {...props} />} />

			<Match exactly pattern="/color/:color" render={(props) => <DeckPage {...props} />} />
			<Match exactly pattern="/color/:color/images" render={(props) => <DeckPage {...props} images={true} />} />

			<Match exactly pattern="/deck/random" render={(props) => <DeckPage {...props} random={true} />} />
			<Match exactly pattern="/deck/random/images" render={(props) => <DeckPage {...props} random={true} images={true} />} />
			<Match exactly pattern="/deck/:spec1/:spec2/:spec3" render={(props) => <DeckPage {...props} />} />
			<Match exactly pattern="/deck/:spec1/:spec2/:spec3/images" render={(props) => <DeckPage {...props} images={true} />} />

			<Match exactly pattern="/card/:card" render={(props) => <CardPage {...props} />} />

			<Match exactly pattern="/maps" render={(props) => <MapsPage {...props} />} />
			<Match exactly pattern="/map/:map" render={(props) => <MapPage {...props} />} />

			<Miss component={NotFoundPage}/>
		</Layout>
	</BrowserRouter>,
	document.getElementById('root')
);
