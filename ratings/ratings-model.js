const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    add,
    findByRating,
};

function find() {
    return db('ratings');
};

function findById(id) {
    return db('ratings')
        .where({ id })
        .first();
}

async function add(rating) {
    const [id] = await db('ratings').insert(rating);

    return findById(id);
}

function findByRating(name) {
    return db('ratings')
        .where('name', name)
        .first();
}