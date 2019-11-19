module.exports = {
    integerToBoolean,
    parkPropertyToBoolean,
    booleanToInteger,
    parkPropertyToInteger
};

function integerToBoolean(int) {
    return int === 1 ? true : false;
};

function booleanToInteger(boolean) {
    return boolean === true ? 1 : 0;
};

function parkPropertyToBoolean(park) {
    return {
        ...park,
        "dog_park": integerToBoolean(park["dog_park"]),
        wildlife: integerToBoolean(park.wildlife),
        "hiking_trails": integerToBoolean(park["hiking_trails"]),
        "disc_golf": integerToBoolean(park["disc_golf"]),
        "open_spaces": integerToBoolean(park["open_spaces"]),
        "climbing_trees": integerToBoolean(park["climbing_trees"]),
    };
};

function parkPropertyToInteger(park) {
    if(park["dog_park"] !== undefined) {
        park["dog_park"]= booleanToInteger(park["dog_park"])
    }
    if(park.wildlife !== undefined) {
        park.wildlife= booleanToInteger(park.wildlife)
    }
    if(park["hiking_trails"] !== undefined) {
        park["hiking_trails"]= booleanToInteger(park["hiking_trails"])
    }
    if(park["disc_golf"] !== undefined) {
        park["disc_golf"]= booleanToInteger(park["disc_golf"])
    }
    if(park["open_spaces"] !== undefined) {
        park["open_spaces"]= booleanToInteger(park["open_spaces"])
    }
    if(park["climbing_trees"] !== undefined) {
        park["climbing_trees"]= booleanToInteger(park["climbing_trees"])
    }
    console.log(park)
    return park
};