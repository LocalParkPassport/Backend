module.exports = {
    integerToBoolean,
    parkPropertyToBoolean,
    booleanToInteger,
    parkPropertyToInteger
};

function integerToBoolean(int) {
    return int == 1 ? true : false;
};

function booleanToInteger(boolean) {
    return boolean == true ? 1 : 0;
};

function parkPropertyToBoolean(park) {
    return {
        ...park,
        restrooms: integerToBoolean(park.restrooms),
        fishing: integerToBoolean(park.fishing),
        camping: integerToBoolean(park.camping),
        tennis: integerToBoolean(park.tennis),
        basketball: integerToBoolean(park.basketball),
        golf: integerToBoolean(park.golf),
        dogPark: integerToBoolean(park.dogPark),
    };
};

function parkPropertyToInteger(park) {
    if(park.restrooms !== undefined) {
        park.restrooms= booleanToInteger(park.restrooms)
    }
    if(park.fishing !== undefined) {
        park.fishing= booleanToInteger(park.fishing)
    }
    if(park.camping !== undefined) {
        park.camping= booleanToInteger(park.camping)
    }
    if(park.tennis !== undefined) {
        park.tennis= booleanToInteger(park.tennis)
    }
    if(park.basketball !== undefined) {
        park.basketball= booleanToInteger(park.basketball)
    }
    if(park.golf !== undefined) {
        park.golf= booleanToInteger(park.golf)
    }
    if(park.dogPark !== undefined) {
        park.dogPark= booleanToInteger(park.dogPark)
    }
    console.log(park)
    return park
};