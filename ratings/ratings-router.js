const router = require('express').Router();
const Parks = require('./ratings-model');
const midware = require('../middleware/middleware')

router.post('/', midware.verifyToken, (req, res) => {
    let rating = req.body;
    Parks.add(rating)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

module.exports = router;