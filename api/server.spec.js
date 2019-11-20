const request = require('supertest');
const server = require('./server');

describe('server', () => {
    describe('[GET] / endpoint', () => {
        it('the db env is using testing', () => {
            expect(process.env.NODE_ENV).toBe('testing')
        });
    })
})