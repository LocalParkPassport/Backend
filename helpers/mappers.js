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
        "dog park": integerToBoolean(park["dog park"]),
        wildlife: integerToBoolean(park.wildlife),
        "hiking trails": integerToBoolean(park["hiking trails"]),
        "disc golf": integerToBoolean(park["disc golf"]),
        "open spaces": integerToBoolean(park["open spaces"]),
        "climbing trees": integerToBoolean(park["climbing trees"]),
    };
};

function parkPropertyToInteger(park) {
    return {
        ...park,
        "dog park": booleanToInteger(park["dog park"]),
        wildlife: booleanToInteger(park.wildlife),
        "hiking trails": booleanToInteger(park["hiking trails"]),
        "disc golf": booleanToInteger(park["disc golf"]),
        "open spaces": booleanToInteger(park["open spaces"]),
        "climbing trees": booleanToInteger(park["climbing trees"]),
    };
};