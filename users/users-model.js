const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    add,
    findByUsername,
};

function find() {
    return db('users')
        .select('id', 'username', 'password');
};

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findByUsername(username) {
    return db('users')
        .where({ username })
        .first();
}