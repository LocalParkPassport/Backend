module.exports = {
    integerToBoolean,
    parkPropertyToBoolean
}

function integerToBoolean(int) {
    return int === 1 ? true : false;
}

function parkPropertyToBoolean(park) {
    return {
        ...park,
        "dog park": integerToBoolean(park["dog park"]),
        wildlife: integerToBoolean(park.wildlife),
        "hiking trails": integerToBoolean(park["hiking trails"]),
        "disc golf": integerToBoolean(park["disc golf"]),
        "open spaces": integerToBoolean(park["open spaces"]),
        "climbing trees": integerToBoolean(park["climbing trees"]),
    }
}