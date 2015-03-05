import dispatcher from './dispatcher';

/**
 * Send an action to the dispatcher
 * with type and payload
 * @param {string} type - the action type {@ItemActionTypes}
 * @param {*} payload
 */
function fire ( type, payload ) {
	dispatcher.dispatch({
		type,
		payload
	});
}

export default { fire };
