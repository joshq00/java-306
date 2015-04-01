import { EventEmitter } from 'events';
import User from './user';

let user = new User( mobileFramework.getUserData() );

class UserStore extends EventEmitter {
	/**
	 * Add a listener
	 * @param  {Function} listener
	 */
	on ( listener ) {}

	/**
	 * Remove a listener
	 * @param  {Function} listener
	 */
	off ( listener ) {}

	/**
	 * Get user
	 * @return {User}
	 */
	get () {
		return user;
	}
}
export default new UserStore();
