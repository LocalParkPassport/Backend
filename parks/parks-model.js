const db = require('../database/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
    find,
    findById,
    add,
    findByPark,
};

function find() {
    return db('parks')
        .leftjoin('ratings', 'parks.id', 'ratings.park_id')
        .then(parks => parks.map(park => mappers.parkPropertyToBoolean(park)));
};

function findById(id) {
    return db('parks')
        .where({ id })
        .first()
        .then(park => mappers.parkPropertyToBoolean(park));
}

async function add(park) {
    const [id] = await db('parks').insert(park, 'id');

    return findById(id);
}

function findByPark(body) {
    search = mappers.parkPropertyToInteger(body);

    const a = search["dog park"] !== undefined ? `%${search["dog park"]}%` : 0 || 1;
    const b = search["wildlife"] !== undefined ? `%${search["wildlife"]}%` : 0 || 1;
    const c = search["hiking trails"] !== undefined ? `%${search["hiking trails"]}%` : 0 || 1;
    console.log(a, b, c);
    
    return db('parks')
        .where('name', 'like', `%${search.name}%`)
        .where('location', 'like', `%${search.location}%`)
        .where('description', 'like', `%${search.description}%`)
        .where('dog park', 'like', search["dog park"] !== undefined ? `%${search["dog park"]}%` : "%%")
        .where('wildlife', 'like', search["wildlife"] !== undefined ? `%${search["wildlife"]}%` : "%%")
        .where('hiking trails', 'like', search["hiking trails"] !== undefined ? `%${search["hiking trails"]}%` : "%%")
        .where('disc golf', 'like', search["disc golf"] !== undefined ? `%${search["disc golf"]}%` : "%%")
        .where('open spaces', 'like', search["open spaces"] !== undefined ? `%${search["open spaces"]}%` : "%%")
        .where('climbing trees', 'like', search["climbing trees"] !== undefined ? `%${search["climbing trees"]}%` : "%%")
        .then(parks => parks.map(park => mappers.parkPropertyToBoolean(park)));
}