
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ratings')
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert([
        {rating: 2, comments: 'they did not allow my monkey in', user_id: 2, park_id: 1},
        {rating: 1, comments: 'not the best, friendly natives though', user_id: 2, park_id: 1},
        {rating: 4, comments: 'a must visit', user_id: 3, park_id: 2}
      ]);
    });
};
