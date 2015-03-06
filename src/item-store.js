import dispatcher from './dispatcher';
import actions from './item-action-types';
import { EventEmitter } from 'events';
import _items from './items.json';

// simulate web service delay
function sleep ( ms ) {
	return new Promise( ( resolve ) => {
		setTimeout( resolve, ms );
	});
}

/**
 * Remove an item
 * @param  {number} id - id of the item to remove
 * @return {Promise}
 */
function remove ( id ) {
	delete _items[ id ];
	return sleep( 100 );
}

class ItemStore extends EventEmitter {
	constructor () {
		super();

		let handler = action => this._handleAction( action );
		this._token = dispatcher.register( handler );
	}

	/**
	 * Handle an action from the dispatcher
	 * @param  {Object} action - type and payload
	 */
	_handleAction ( action ) {
		// default to a resolved promise
		let future = Promise.resolve();

		let { type, payload } = action;
		switch ( type ) {
		case actions.REMOVE:
			future = remove( payload.id );
			break;
		}

		// after the task has completed,
		// let the listeners know by
		// emitting the change
		future.then( () => this.emitChange() );
	}

	/**
	 * Alert any listeners of changed data
	 */
	emitChange () {
		this.emit( actions.CHANGE );
	}

	/**
	 * Add a listener
	 * @param  {Function} listener
	 */
	on ( listener ) {
		return super.on( actions.CHANGE, listener );
	}

	/**
	 * Remove a listener
	 * @param  {Function} listener
	 */
	off ( listener ) {
		this.removeListener( actions.CHANGE, listener );
	}

	/**
	 * Get all items
	 * @return {Item[]}
	 */
	getAll () {
		return Object.keys( _items ).map( id => _items[ id ] );
	}
}

export default new ItemStore();
