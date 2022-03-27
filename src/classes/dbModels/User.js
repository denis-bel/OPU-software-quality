import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import { USER_PASSWORD_SALT_ROUNDS, USER_TOKEN_EXPIRES_HOURS, USER_TOKEN_SECRET_KEY } from '@config/env';
import logger from '@lib/logger';

/**
 * This class represents User object in the database
 */
class User extends Model {
	
	/**
	 * This method takes plain password and returns hashed password
	 * @param {String} password - password
	 * @returns {Promise<String>} - hashed password
	 */
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
	
	/**
	 * This method compare the provided password with hashed password. It returns true if passwords are equal
	 * @param {String} plainPassword - plain password
	 * @param hashedPassword - hashed password
	 * @return {Promise<Boolean>}
	 */
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
	
	/**
	 * This method generates JWT token with provided data and returns the token
	 * @param {Object} data - data
	 * @return {Promise<String>} - JWT token
	 */
	static async generateToken(data) {
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
	
	/**
	 * This method decodes the token and returns decoded data
	 * @param {String} token - JWT token
	 * @return {Promise<Object>} - decoded data
	 */
	static async decodeToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, USER_TOKEN_SECRET_KEY, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});
	}
	
	/**
	 * This method find user by JWT authorization token. It returns null if user not found
	 * @param {String} token
	 * @return {Promise<Object>}
	 */
	static async findByToken(token) {
		try {
			const { login } = await this.decodeToken(token);
			const users = await this.find({
				where: {
					login
				}
			});
			if (users.length) {
				return users[0];
			}
			return null;
		} catch (error) {
			logger.error(error);
			return null;
		}
	}
	
	static async create(userData) {
		const { password } = userData;
		return await super.create({
			...userData,
			password: await this.hashPassword(password)
		});
	}
	
}

User.initialize({ tableName: 'users', dbClient, withTimeStamps: true });

export default User;