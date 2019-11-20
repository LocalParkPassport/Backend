
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parks')
    .then(function () {
      // Inserts seed entries
      return knex('parks').insert([
        {name: 'test park1', location: "sacremento", description: "this is a test park", dog_park: false, wildlife: false, "hiking_trails": false, "disc_golf": true, "open_spaces": true, "climbing_trees": false, user_id: 1},
        {name: 'test park2', location: "virginia", description: "this is another test park", dog_park: true, wildlife: false, "hiking_trails": true, "disc_golf": false, "open_spaces": true, "climbing_trees": false, user_id: 1},
        {name: 'test park3', location: "ibadan", description: "close to unibadan gate", dog_park: true, wildlife: false, "hiking_trails": false, "disc_golf": false, "open_spaces": true, "climbing_trees": true, user_id: 3}
      ]);
    });
};
