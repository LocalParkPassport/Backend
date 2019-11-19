const db = require('../database/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
    find,
    findBy,
    add,
    findByPark,
    addRating,
    getParkRatings,
    remove,
    update
};

function find() {
    return db('parks')
        .leftJoin('ratings', 'parks.id', 'ratings.park_id')
        .select('parks.*', 'ratings.rating', 'ratings.comments', 'ratings.id as rating_id')
        .then(parks => parks.map(park => mappers.parkPropertyToBoolean(park)));
};

// function findById(id) {
//     return db('parks')
//         .where({ id })
//         .first()
//         .then(park => mappers.parkPropertyToBoolean(park));
// }

function findBy(id) {
    let query = db('parks');

    if(id) {
        query.where('parks.id', id).first();

        const promises = [query, getParkRatings(id)]

        return Promise.all(promises).then(function(results) {
            let [park, ratings] = results;

            if (park) {
                park.ratings = ratings;

                return mappers.parkPropertyToBoolean(park);
            } else {
                return null
            }
        });
    }

    return query.then(parks => {
        return parks.map(park => mappers.parkPropertyToBoolean(park))
    })
}

async function add(park) {
    const [id] = await db('parks').insert(park, 'id');

    return findBy(id);
}

function findByPark(body) {
    search = mappers.parkPropertyToInteger(body);

    const a = search["dog_park"] !== undefined ? `%${search["dog_park"]}%` : 0 || 1;
    const b = search["wildlife"] !== undefined ? `%${search["wildlife"]}%` : 0 || 1;
    const c = search["hiking_trails"] !== undefined ? `%${search["hiking_trails"]}%` : 0 || 1;
    console.log(a, b, c);
    
    return db('parks')
        .where('name', 'like', `%${search.name}%`)
        .where('location', 'like', `%${search.location}%`)
        .where('description', 'like', `%${search.description}%`)
        .where('dog_park', 'like', search["dog_park"] !== undefined ? `%${search["dog_park"]}%` : "%%")
        .where('wildlife', 'like', search["wildlife"] !== undefined ? `%${search["wildlife"]}%` : "%%")
        .where('hiking_trails', 'like', search["hiking_trails"] !== undefined ? `%${search["hiking_trails"]}%` : "%%")
        .where('disc_golf', 'like', search["disc_golf"] !== undefined ? `%${search["disc_golf"]}%` : "%%")
        .where('open_spaces', 'like', search["open_spaces"] !== undefined ? `%${search["open_spaces"]}%` : "%%")
        .where('climbing_trees', 'like', search["climbing_trees"] !== undefined ? `%${search["climbing_trees"]}%` : "%%")
        .then(parks => parks.map(park => mappers.parkPropertyToBoolean(park)));
}

function addRating (rating) {
    return db('ratings')
      .insert(rating)
      .then(([id]) => findBy(rating.park_id));
}

function getParkRatings(parkId) {
    return db('ratings')
      .where('park_id', parkId)
      .then(ratings => ratings.map(rating => mappers.parkPropertyToBoolean(rating)));
};

function remove(id) {
    return db('parks')
        .where('id', id)
        .del();
}

function update(id, changes) {
    return db('parks')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? findBy(id) : null))
}