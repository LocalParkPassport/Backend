const db = require('../database/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
    find,
    findById,
    add,
    findByRating,
};

function find(id) {
    if (id) {
        return db('ratings')
            .where('id', id)
            .first()
    }

    return db('ratings');
};

function findById(id) {
    return db('ratings')
        .where({ id })
        .first();
}

async function add(rating) {
    const [id] = await db('ratings').insert(rating);

    return find(id);
}

function findByRating(name) {
    return db('ratings')
        .where('name', name)
        .first();
}