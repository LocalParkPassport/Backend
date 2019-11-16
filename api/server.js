const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router');
const parksRouter = require('../parks/parks-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api/auth', authRouter)
server.use('/api/parks', parksRouter)

server.get('/', (req, res) => {
    res.send('up and runnin!!!');
});

module.exports = server;