import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';

import './normalize.css';
import './global.css';


if (window.location.toString().indexOf('//codexcards.surge.sh') !== -1) {
	window.location.replace(window.location.toString().replace('//codexcards.surge.sh', '//codexcarddb.com'));
}



class CodeSplit extends React.Component {
	state = { Component: null };

	componentDidMount () {
		this.props.load((Component) => {
			this.setState({ Component: Component.default });
		});
	}

	render () {
		const { load, ...props } = this.props; // eslint-disable-line no-unused-vars
		const { Component } = this.state;

		if (Component) {
			return <Component {...props} />
		} else {
			return null;
		}
	}
}



ReactDOM.render(
	<BrowserRouter>
		<Layout>

			<Match exactly pattern="/" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/HomePage')), 'HomePage') } />
			} />

			<Match pattern="/general" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/GeneralRulingsPage')), 'GeneralRulingsPage') } />
			} />
			<Match pattern="/ruling/:ruling" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/RulingPage')), 'RulingPage') } />
			} />

			<Match pattern="/color/:color" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/DeckPage')), 'DeckPage') } />
			} />
			<Match pattern="/deck/:spec1/:spec2/:spec3" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/DeckPage')), 'DeckPage') } />
			} />
			<Match pattern="/deck/random" render={(props) =>
				<CodeSplit {...props} random={true} load={ (cb) => require.ensure([], (require) => cb(require('./components/DeckPage')), 'DeckPage') } />
			} />

			<Match pattern="/card/:card" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/CardPage')), 'CardPage') } />
			} />

			<Match pattern="/maps" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/MapsPage')), 'MapsPage') } />
			} />
			<Match pattern="/map/:map" render={(props) =>
				<CodeSplit {...props} load={ (cb) => require.ensure([], (require) => cb(require('./components/MapPage')), 'MapPage') } />
			} />

			<Miss component={NotFoundPage}/>
		</Layout>
	</BrowserRouter>,
	document.getElementById('root')
);
