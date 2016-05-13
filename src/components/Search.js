import React from 'react';
import { Link } from 'react-router';


class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = { searchText: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (e) {
		const searchText = e.target.value;
		this.setState({searchText});
	}

	render () {
		const { cards } = this.props.data;
		const { searchText } = this.state;

		let results = [];

		if (searchText) {
			results = Object.keys(cards).filter((key) => {
				if (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
					return true;
				}
				return false;
			});
		}

		return (
			<div>
				<div className="search-container">
					<input className="search-input" type="text" placeholder="Search for a card..."
						value={this.state.searchText}
						onChange={this.handleChange}
					/>
				</div>

				{(results.length) ? (
					<div className="search-results">
						{results.slice(0, 10).map((name) => (
							<div className="search-result" key={name}>
								<Link to={"/card/" + name.toLowerCase().replace(/\s/g, '_')}>{name}</Link>
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
