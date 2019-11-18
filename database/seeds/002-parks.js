
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('parks').insert([
        {name: 'test park1', location: "sacremento", description: "this is a test park", "dog park": false, wildlife: false, "disc golf": true, "climbing trees": false, user_id: 1},
        {name: 'test park2', location: "virginia", description: "this is another test park", user_id: 1},
        {name: 'heritage park', location: "ibadan", description: "close to unibadan gate", "dog park": true, wildlife: false, "hiking trails": false, "disc golf": false, "open spaces": true, "climbing trees": true, user_id: 3}
      ]);
    });
};
