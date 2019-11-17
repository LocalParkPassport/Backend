const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    add,
    findByPark,
};

function find() {
    return db('parks as p')
        .join('ratings as r', 'p.id', 'r.park_id');
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

function findByPark(name) {
    return db('parks')
        .where('name', name)
        .first();
}