const router = require('express').Router();
const Parks = require('./parks-model')

router.post('/', (req, res) => {
    let park = req.body;
    Parks.add(park)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});