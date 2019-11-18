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

router.get('/search', (req, res) => {
    let search = req.body;
    Parks.findByPark(search)
        .then(parks => {
            res.status(201).json(parks);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
})

module.exports = router;