import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import DeckPage from './components/DeckPage';
import CardPage from './components/CardPage';
import NotFoundPage from './components/NotFoundPage';

import './normalize.css';
import './global.scss';

import data from './cardData.json';
window.codex_data = data;



ReactDOM.render(
	<Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={Layout}>
			<IndexRoute component={HomePage} data={data} />
			<Route path="/color/:color" component={DeckPage} data={data} />
			<Route path="/deck/:spec1/:spec2/:spec3" component={DeckPage} data={data} />
			<Route path="/card/:card" component={CardPage} data={data} />
			<Route path="*" component={NotFoundPage}/>
		</Route>
	</Router>,
	document.getElementById('root')
);
