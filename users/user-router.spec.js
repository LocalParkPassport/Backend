const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig')


describe('GET /users', () => {
    test('should return 200 of user', () => {
        return request(server)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                (res.body)
            })
    });
});