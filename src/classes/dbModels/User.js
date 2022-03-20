import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import { USER_PASSWORD_SALT_ROUNDS, USER_TOKEN_EXPIRES_HOURS, USER_TOKEN_SECRET_KEY } from '@config/env';

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
	
	static async createToken(data) {
		return new Promise((resolve, reject) => {
			jwt.sign(data, USER_TOKEN_SECRET_KEY, { expiresIn: `${USER_TOKEN_EXPIRES_HOURS}h` }, (err, token) => {
				if (err) {
					reject(err);
				} else {
					resolve(token);
				}
			});
		});
	}
	
	static async decodeToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, USER_TOKEN_SECRET_KEY, (err, decoded) => {
				if(err) {
					reject(err)
				} else {
					resolve(decoded)
				}
			});
		})
	}
}

User.initialize('users', dbClient);

export default User;