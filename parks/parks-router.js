const router = require('express').Router();
const Parks = require('./parks-model');
const midware = require('../middleware/middleware')

router.get('/', (req, res) => {
    Parks.findBy()
        .then(parks => {
            res.status(200).json(parks);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
});

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

router.get('/:id', midware.validateParkId, (req, res) => {
    res.status(200).json(req.park)
});

router.get('/:id/ratings', midware.validateParkId, (req, res) => {
    Parks.getParkRatings(req.params.id)
        .then(ratings => {
            res.status(200).json(ratings);
        })
        .catch(error => {
            res.status(500).json({
                'Error getting ratings of park': error.message
            })
        })
});

router.post('/:id/ratings', midware.verifyToken, (req, res) => {
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

router.delete('/:id', midware.validateParkId, (req, res) => {
    Parks.remove(req.park.id)
        .then(info => {
            res.status(200).json({ message: `removed ${info} park` })
        })
        .catch(error => {
            res.status(500).json({
                'error removing park': error.message
            });
        });
})

router.put('/:id', [midware.verifyToken, midware.validateParkId, midware.checkParkInput], (req, res) => {
    Parks.update(req.park.id, req.body)
        .then(park => {
            res.status(200).json(park)
        })
        .catch(error => {
            res.status(500).json({
                'error updating project': error.message
            });
        });
});

module.exports = router;