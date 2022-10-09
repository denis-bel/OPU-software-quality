import request from 'supertest';
import { HttpFactory } from '@lib/HttpFactory';
import addRouters from '@routers/index';
import dbClient from '@lib/dbClient';

const httpServer = HttpFactory.createServer(addRouters);

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImVtcGxveWVlIiwiaWF0IjoxNjY1MzA2MTAwLCJleHAiOjE2NjUzNDIxMDB9.mteJUY90NSt7h68ilOIV335r5851n2GHt2neGm5mK9E';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjY1MzA2NDc1LCJleHAiOjE2NjUzNDI0NzV9.cbOwvwABulJvb1Tm_vSq1hSxD3t1-BHgF8TmkX57j-s'


describe('Test the activity deleting', () => {
	afterAll(async () => {
		await dbClient.end();
		
	});
	test('It send 401 status code', async () => {
		const response = await request(httpServer).delete('/activity/1');
		expect(response.statusCode).toBe(401);
	});
	
	test('It send 403 status code', async () => {
		const response = await request(httpServer).delete('/activity/1')
			.auth(userToken, { type: 'bearer' });
		expect(response.statusCode).toBe(403);
	});
	
	test('It send 200 status code', async () => {
		const response = await request(httpServer).delete('/activity/1')
			.auth(adminToken, { type: 'bearer' });
		expect(response.statusCode).toBe(200);
	});
	
	test('It send 404 status code', async () => {
		const response = await request(httpServer).delete('/activity/100')
			.auth(adminToken, { type: 'bearer' });
		expect(response.statusCode).toBe(404);
	});
});