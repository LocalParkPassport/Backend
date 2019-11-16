const jwt = require('jsonwebtoken');

module.exports = {
    checkUserInput,
    verifyToken
};

function checkUserInput(req, res, next) {
    let user = req.body;
    if (user.username && user.password) {
        next();
    } else {
        res.status(403).json({ message: 'kindly provide credentials' })
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
                    res.status(401).json({ you: 'shall not pass!' });
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