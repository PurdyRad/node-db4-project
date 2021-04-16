const express = require('express');
const helmet = require('helmet');
const recipeRouter = require('./recipeRouter')

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/recipes', recipeRouter);

server.get('/', (req,res) => {
    res.send(`<h2>Yer up n running</h2>`);
});

module.exports = server;