/**
 * this type contains the information contained in a user
 * registration form for sending the data to the server
 */
export class UserRegistrationInfo {
	constructor(
		public firstName: string,
		public lastName: string,
		public email: string,
		public username: string,
		public password: string,
		public categoryId: any
	) { }
}
