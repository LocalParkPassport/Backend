
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('parks').insert([
        {name: 'test park1', location: "sacremento", description: "this is a test park", "dog park": 0, wildlife: 0, "disc golf": 1, "climbing trees": 0,},
        {name: 'test park2', location: "virginia", description: "this is another test park", },
        {name: 'heritage park', location: "ibadan", description: "close to unibadan gate", "dog park": 1, wildlife: 0, "hiking trails": 0, "disc golf": 0, "open spaces": 1, "climbing trees": 1,}
      ]);
    });
};
