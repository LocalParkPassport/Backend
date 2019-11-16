const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    add,
    findByPark,
};

function find() {
    return db('parks');
};

function findById(id) {
    return db('parks')
        .where({ id })
        .first();
}

async function add(park) {
    const [id] = await db('parks').insert(park);

    return findById(id);
}

function findByPark(park) {
    return db('parks')
        .where({ park })
        .first();
}