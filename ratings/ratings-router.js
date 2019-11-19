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

router.delete('/:id', midware.validateRatingId, (req, res) => {
    Ratings.remove(req.rating.id)
        .then(num => {
            res.status(200).json({ message: `removed ${num} rating` })
        })
        .catch(error => {
            res.status(500).json({
                'error removing rating': error.message
            });
        });
});

router.put('/:id', [midware.validateRating, midware.validateRatingId], (req, res) => {
    Ratings.update(req.rating.id, req.body)
        .then(num => {
            res.status(200).json({ message: `edited ${num} rating ` })
        })
        .catch(error => {
            res.status(500).json({
                'error editing rating': error.message
            });
        });
});

module.exports = router;