const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig')

beforeAll(async () => {
    await db('users').truncate();
})

const input = {
    username: 'testing',
    password: 'testing'
}

describe('users authorization', () => {
    describe('POST /users', () => {
        test('should return 201, with testing as user and correct content-type', () => {
            return request(server)
                .post('/api/auth/register')
                .send(input)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(res => {
                    (res.body.username, 'testing')
                })
        });

        test('should return 200, with testing as user and correct content-type', (done) => {
            request(server)
                .post('/api/auth/login')
                .send(input)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    done()
                })
        });
    });

})