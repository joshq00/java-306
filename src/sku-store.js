import { EventEmitter } from 'events';
import { skus } from './data/skus.json';

const CHANGE = 'change';
class SkuStore extends EventEmitter {

	/**
	 * Alert any listeners of changed data
	 */
	emitChange () {
		process.nextTick( () => {
			this.emit( CHANGE );
		});
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
	getAll () {
		return skus;
	}
}
export default new SkuStore();
