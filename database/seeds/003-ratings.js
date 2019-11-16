
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ratings').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert([
        {rating: 2, comments: 'they did not allow my monkey in', user_id: 2, park_id: 1},
        {comments: 'not the best, friendly natives though', user_id: 2, park_id: 1},
        {rating: 4, user_id: 3, park_id: 3}
      ]);
    });
};
