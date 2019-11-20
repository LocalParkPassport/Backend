const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig')

// beforeAll(async () => {
//     await db('parks').truncate();
// })

const input = {
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

describe('parks router', () => {
    describe('POST /parks', () => {
        test('should return 201, park added', () => {
            return request(server)
                .post('/api/parks')
                .send(input)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(res => {
                    (res.body)
                })
        });
    });
    
    // describe('GET /parks', () => {
    //     test('should return 201, with testing as user and correct content-type', () => {
    //         return request(server)
    //             .get('/api/parks')
    //             .set('Accept', 'application/json')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .then(res => {
    //                 (res.body)
    //             })
    //     });
    // });

    

})