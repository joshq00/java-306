import { _extend } from 'util';
// let user = {
// 	'userId': 'HD01',
// 	'userType': '0',
// 	'firstName': 'Homer',
// 	'lastName': 'Depot',
// 	'departmentNumber': '23',
// 	'locationNumber': '9090',
// 	'locationType': 'DIV',
// 	'locale': 'en_US',
// 	'imsUserLevel': '10',
// 	'thdSsoToken': 'xAAmEQABBAEDAgcBA',
// 	'ldapGroups': [ 'HR Salaried Associate', 'Sales Associate', 'Administrator' ]
// }

export default class User {

	constructor ( user ) {
		_extend( this, user );
	}

	isAdmin () {
		if ( !Array.isArray( this.ldapGroups ) ) {
			return false;
		}
		return this.ldapGroups.indexOf( User.ADMIN_GROUP ) >= 0;
	}
}

User.ADMIN_GROUP = 'Administrator';
