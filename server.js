const express = require('express');
const path = require('path');
const PORT = 3000;
const { sequelize } = require('./db');

const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));
server.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

sequelize.sync({ force: true }).then(() => {
    console.log('db sync successful');
    server.listen(PORT, () => {
        console.log('server listening');
    })
});

