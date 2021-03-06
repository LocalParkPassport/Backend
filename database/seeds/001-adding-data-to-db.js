const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test1', password: bcrypt.hashSync('test1', 10)},
        {username: 'test2', password: bcrypt.hashSync('test2', 10)},
        {username: 'test3', password: bcrypt.hashSync('test3', 10)}
      ]);
    });
};
