import bcrypt from 'bcrypt';
import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import { USER_PASSWORD_SALT_ROUNDS } from '@config/env';

class User extends Model {
	
	static async hashPassword(password) {
		return new Promise((resolve, reject) => {
			bcrypt.hash(password, USER_PASSWORD_SALT_ROUNDS, (err, hash) => {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
	}
	
	static async isPasswordValid(plainPassword, hashedPassword) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
}

User.initialize('users', dbClient);

export default User;