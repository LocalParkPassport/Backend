const db = require('../database/dbConfig');
const Ratings = require('./ratings-model');
const request = require('supertest');
const server = require('../api/server');

beforeEach(async () => {
    await db('parks').truncate()
})

const input = {
    username: 'testing',
    password: 'testing'
}

const inputPark = {
    name: "new park",
    description: "lots of trees",
    location: "lagos",
    restrooms: true,
    fishing: false,
    camping: false,
    tennis: true,
    basketball: false,
    golf: false,
    dogPark: true,
    img: 'img',
    user_id: 1
}

describe('Parks model', () => {
    describe('insert function', () => {

        let ratings
        test('should insert a park', async () => {

            const response = await request(server)
                .post('/api/auth/login')
                .send(input)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)

            token = response.body.token
            console.log(token)

            const res = await request(server)
                .post('/api/parks')
                .send(inputPark)
                .set('authorization', token)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)

            await Ratings.add({ rating: 1, comments: 'loc1', park_id: 1 })

            ratings = await db('ratings')
            expect(ratings).toHaveLength(1);
        })
    })
})