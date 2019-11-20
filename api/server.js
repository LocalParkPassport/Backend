const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router');
const parksRouter = require('../parks/parks-router');
const ratingsRouter = require('../ratings/ratings-router')
const usersRouter = require('../users/user-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api/auth', authRouter)
server.use('/api/parks', parksRouter)
server.use('/api/ratings', ratingsRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
    res.send({up: 'up and runnin!!!'});
});

module.exports = server;