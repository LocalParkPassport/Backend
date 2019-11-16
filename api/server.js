const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.send('up and runnin!!!');
});

module.exports = server;