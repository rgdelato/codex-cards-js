import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import DeckPage from './components/DeckPage';
import CardPage from './components/CardPage';
import MapListPage from './components/MapListPage';
import MapPage from './components/MapPage';
import NotFoundPage from './components/NotFoundPage';

import './normalize.css';
import './global.scss';

import data from './cardData.json';
window.codex_data = data;


if (window.location.toString().indexOf('//codexcards.surge.sh') !== -1) {
	window.location.replace(window.location.toString().replace('//codexcards.surge.sh', '//codexcarddb.com'));
}


ReactDOM.render(
	<Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={Layout} data={data}>
			<IndexRoute component={HomePage} data={data} />
			<Route path="/color/:color" component={DeckPage} data={data} />
			<Route path="/color/:color/images" component={DeckPage} data={data} images={true} />
			<Route path="/deck/random" component={DeckPage} data={data} random={true} />
			<Route path="/deck/random/images" component={DeckPage} data={data} random={true} images={true} />
			<Route path="/deck/:spec1/:spec2/:spec3" component={DeckPage} data={data} />
			<Route path="/deck/:spec1/:spec2/:spec3/images" component={DeckPage} data={data} images={true} />
			<Route path="/card/random" component={CardPage} data={data} random={true} />
			<Route path="/card/:card" component={CardPage} data={data} />
			<Route path="/maps" component={MapListPage} data={data} />
			<Route path="/map/:map" component={MapPage} data={data} />
			<Route path="*" component={NotFoundPage}/>
		</Route>
	</Router>,
	document.getElementById('root')
);
