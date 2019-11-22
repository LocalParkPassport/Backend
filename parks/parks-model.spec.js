const db = require('../database/dbConfig');
const Parks = require('./parks-model');

beforeEach(async () => {
    await db('parks').truncate()
 })

describe('Parks model', () => {
    describe('insert function', () => {
        
        let parks
        test('should insert a park', async () => {
            await Parks.add({ name: 'park1', location: 'loc1', description: 'none', user_id: 1})
            await Parks.add({ name: 'park2', location: 'loc2', description: 'nil', user_id: 1})

            parks = await db('parks')
            expect(parks).toHaveLength(2)

            await Parks.remove(1)

            parks = await db('parks')
            expect(parks).toHaveLength(1)
        })
    })
})