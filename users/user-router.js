const router = require('express').Router();
const Users = require('./users-model');

router.get('/', (req, res) => {
    Users.find()
        .then(parks => {
            res.status(200).json(parks);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
});

module.exports = router;