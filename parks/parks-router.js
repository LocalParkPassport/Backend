const router = require('express').Router();
const Parks = require('./parks-model');
const midware = require('../middleware/middleware')

router.post('/', [midware.verifyToken, midware.checkParkInput], (req, res) => {
    let park = req.body;
    Parks.add(park)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

router.get('/', (req, res) => {
    Parks.find()
        .then(parks => {
            res.status(201).json(parks);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
})

router.post('/search', (req, res) => {
    let search = req.body;
    Parks.findByPark(search)
        .then(parks => {
            res.status(201).json(parks);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
});

router.post('/:id/ratings', [midware.verifyToken, midware.checkParkInput], (req, res) => {
    //let park = req.body;
    const postInfo = { ...req.body, park_id: req.params.id }
    Parks.addRating(postInfo)
        .then(saved => {
            res.status(210).json(saved);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

router.get('/:id/ratings', midware.validateParkId, (req, res) => {
    Parks.getParkRatings(req.params.id)
        .then(ratings => {
            res.status(200).json(ratings);
        })
        .catch(error => {
            res.status(500).json({
                'Error getting ratings of project': error.message
            })
        })
})

module.exports = router;