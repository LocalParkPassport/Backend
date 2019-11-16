const jwt = require('jsonwebtoken');
const Park = require('../parks/parks-model')

module.exports = {
    checkUserInput,
    verifyToken,
    checkParkInput
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
        if ((Park.findByPark(name)).lenght > 0) {
            next();
        } else {
            res.status(403).json({ message: 'username already exists' });
        }
        
    } else {
        res.status(403).json({ message: 'missing required field(s)' });
    }
}