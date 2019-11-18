const db = require('../database/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
    find,
    findById,
    add,
    findByPark,
};

function find() {
    return db('parks as p')
        .join('ratings as r', 'p.id', 'r.park_id')
        .then(parks => parks.map(park => mappers.parkPropertyToBoolean(park)));
};

function findById(id) {
    return db('parks')
        .where({ id })
        .first()
        .then(park => mappers.parkPropertyToBoolean(park));
}

async function add(park) {
    const [id] = await db('parks').insert(park);

    return findById(id);
}

function findByPark(body) {
    search = mappers.parkPropertyToInteger(body);
    
    return db('parks')
        .where('name', 'like', `%${search.name}%`)
        .where('location', 'like', `%${search.location}%`)
        .where('description', 'like', `%${search.description}%`)
        .where('dog park', 'like', `%${search["dog park"]}%`)
        .where('wildlife', 'like', `%${search["wildlife"]}%`)
        .then(parks => parks.map(park => mappers.parkPropertyToBoolean(park)));
}