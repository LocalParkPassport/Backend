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

module.exports = router;