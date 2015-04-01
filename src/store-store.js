import { EventEmitter } from 'events';
const CHANGE = 'change';
let storeNbr = null;

class SkuStore extends EventEmitter {
	constructor () {
		super();
		mobileFramework.registerStoreCallback( nbr => {
			storeNbr = nbr;
			this.emitChange();
		});
	}

	/**
	 * Alert any listeners of changed data
	 */
	emitChange () {
		process.nextTick( () => this.emit( CHANGE ) );
	}

	/**
	 * Add a listener
	 * @param  {Function} listener
	 */
	on ( listener ) {
		return super.on( CHANGE, listener );
	}

	/**
	 * Remove a listener
	 * @param  {Function} listener
	 */
	off ( listener ) {
		this.removeListener( CHANGE, listener );
	}

	/**
	 * Get all items
	 * @return {Item[]}
	 */
	get () {
		return storeNbr;
	}
}
export default new SkuStore();
