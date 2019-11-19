const jwt = require('jsonwebtoken');
const Park = require('../parks/parks-model')
const Ratings = require('../ratings/ratings-model')

module.exports = {
    checkUserInput,
    verifyToken,
    checkParkInput,
    validateParkId,
    validateRatingId
};

function checkUserInput(req, res, next) {
    let user = req.body;
    if (user.username && user.password) {
        next();
    } else {
        res.status(403).json({ message: 'missing required field' });
    }
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(
            token,
            process.env.NODE_ENV === 'development' ? 'this is supposed to be secret' : process.env.SECRET,
            (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ 'credentials not valid': err });
                } else {
                    req.decodedToken = decodedToken;
                    next();
                };
            }
        );
    } else {
        res.status(400).json({ message: 'No credentials provided' });
    };
};

function checkParkInput (req, res, next) {
    const { name, location, description } = req.body;
    if (name && location && description) {
        next();
    } else {
        res.status(403).json({ message: 'missing required field(s)' });
    }
};

function validateParkId(req, res, next) {
    Park.find(req.params.id)
        .then(park => {
            if(park) {
                req.park = park;
                next();
            } else {
                res.status(404).json({ message: "invalid park id" });
            }
        })
        .catch(error => {
            res.status(500).json({
                'something went wrong quering db': error.message
            });
        });
};

function validateRatingId(req, res, next) {
    Ratings.find(req.params.id)
        .then(rating => {
            if(rating) {
                req.rating = rating;
                next();
            } else {
                res.status(404).json({ message: "invalid rating id" });
            }
        })
        .catch(error => {
            res.status(500).json({
                'something went wrong quering db': error.message
            });
        });
}