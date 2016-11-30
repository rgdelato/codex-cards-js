import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import GeneralPage from './components/GeneralPage';
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
	<Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={Layout}>
			<IndexRoute component={HomePage} />
			<Route path="/general" component={GeneralPage} />
			<Route path="/ruling/:ruling" component={RulingPage} />
			<Route path="/color/:color" component={DeckPage} />
			<Route path="/color/:color/images" component={DeckPage} images={true} />
			<Route path="/deck/random" component={DeckPage} random={true} />
			<Route path="/deck/random/images" component={DeckPage} random={true} images={true} />
			<Route path="/deck/:spec1/:spec2/:spec3" component={DeckPage} />
			<Route path="/deck/:spec1/:spec2/:spec3/images" component={DeckPage} images={true} />
			<Route path="/card/random" component={CardPage} random={true} />
			<Route path="/card/:card" component={CardPage} />
			<Route path="/maps" component={MapsPage} />
			<Route path="/map/:map" component={MapPage} />
			<Route path="*" component={NotFoundPage}/>
		</Route>
	</Router>,
	document.getElementById('root')
);
