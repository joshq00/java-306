import React from 'react';
import itemStore from './item-store';
import itemAction from './item-action';
import ItemActionTypes from './item-action-types';

function getItemState () {
	return {
		// get all items from the store
		items: itemStore.getAll()
	};
}

/* item list */
export default React.createClass({
	getInitialState () {
		return getItemState();
	},
	componentDidMount () {
		// listen to store
		itemStore.on( this._onChange );
	},
	componentWillUnmount () {
		itemStore.off( this._onChange );
	},
	_onChange () {
		// items changed, get them from the store
		this.setState( getItemState() );
	},
	render() {
		let items = this.state.items.map( item =>
			<ListItem key={item.id} item={item} />
		);

		return (
			<div className='list'>
				{items}
			</div>
		);
	}
});

/* an individual item */
let ListItem = React.createClass({
	/**
	 * Define the properties that this class will use
	 *
	 * Don't need this, but adding it so you know which props this takes
	 */
	propTypes: {
		// item is a property taking on this 'shape' { title: string, detail: string }
		item: React.PropTypes.shape({
			title: React.PropTypes.string.isRequired,
			detail: React.PropTypes.string.isRequired
		}).isRequired // and it's required
	},

	/**
	 * Calls the REMOVE action on this item
	 */
	_delete () {
		// call the remove action on this item
		itemAction.fire( ItemActionTypes.REMOVE, this.props.item );
	},

	render () {
		return (
			<div className='listItem'>
				<div className='info'>
					<span className='title'>
						{this.props.item.title}
					</span>

					<span className='detail'>
						{this.props.item.detail}
					</span>
				</div>
				<div className='actions'>
					<button className='delete' onClick={this._delete}>Delete</button>
				</div>
			</div>
		);
	}
});
