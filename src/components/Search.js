import React from 'react';
import { Link } from 'react-router';
import { toURL } from '../utils';


class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = { searchText: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
	}

	handleChange (e) {
		const searchText = e.target.value;
		this.setState({searchText});
	}

	handleEnterKey (name) {
		if (name) {
			window.location = '/card/' + toURL(name);
		}
	}

	render () {
		const { cards } = this.props.data;
		const { searchText } = this.state;

		let results = [];

		if (searchText) {
			// TODO: un-roll to a loop and kill the filter early if there are too many results
			results = Object.keys(cards).filter((key) => {
				if (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
					return true;
				}
				return false;
			});
		}

		return (
			<div className="search-container">
				<input className="search-input" type="text" placeholder="Search for a card by name..."
					value={this.state.searchText}
					onChange={this.handleChange}
					onKeyDown={(e) => (e.key === 'Enter') ? this.handleEnterKey(results[0]) : null}
				/>

				{(results.length) ? (
					<div className="search-results">
						{results.slice(0, 10).map((name) => (
							<div className="search-result" key={name}>
								<Link to={"/card/" + toURL(name)}>{name}</Link>
							</div>
						))}
					</div>
				) : (
					null
				)}
			</div>
		);
	}
}

export default Search;
