const router = require('express').Router();
const Ratings = require('./ratings-model');
const midware = require('../middleware/middleware')

router.get('/', (req, res) => {
    //let rating = req.body;
    Ratings.find()
        .then(ratings => {
            res.status(200).json(ratings);
        })
        .catch(error => {
            res.status(500).json({'Error retrieving ratings': error.message});
        });
});

router.get('/:id', midware.validateRatingId, (req, res) => {
    res.status(200).json(req.rating);
});

module.exports = router;