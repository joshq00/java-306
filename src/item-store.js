import dispatcher from './dispatcher';
import actions from './item-action-types';
import { EventEmitter } from 'events';
import _items from './items.json';

let _activeItem = {
	id: undefined,
	title: undefined,
	detail: undefined
};

function remove ( item ) {
	delete _items[ item.id ];
}
class ItemStore extends EventEmitter {
	constructor () {
		super();
		this._token = dispatcher.register( action => {
			let { type, payload } = action;
			switch ( type ) {
				case actions.REMOVE:
					remove( payload );
					this.emitChange();
					break;
			}
			console.log( action );
		});
	}

	emitChange () {
		this.emit( actions.CHANGE );
	}

	on ( listener ) {
		return super.on( actions.CHANGE, listener );
	}
	off ( listener ) {
		this.removeListener( actions.CHANGE, listener );
	}

	getAll () {
		return Object.keys( _items ).map( id => _items[ id ] );
	}

	getActiveItem () {
		return _activeItem;
	}
}

export default new ItemStore();
