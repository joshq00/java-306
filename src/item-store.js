import dispatcher from './dispatcher';
import actionTypes from './item-action-types';
import { EventEmitter } from 'events';
import _items from './items.json';

let _activeItem = {
	id: undefined,
	title: undefined,
	detail: undefined
};

class ItemStore extends EventEmitter {
	constructor () {
		super();
		this._token = dispatcher.register( action => {
			console.log( action );
		});
	}

	off ( event, listener ) {
		this.removeListener( event, listener );
	}

	getAll () {
		return Object.keys( _items ).map( id => _items[ id ] );
	}

	getActiveItem () {
		return _activeItem;
	}
}

export default new ItemStore();
