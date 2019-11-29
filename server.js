const express = require('express');
const path = require('path');
const PORT = 3000;
const { sequelize, Task, TaskDate } = require('./db/db');
const { seedData } = require('./db/seed');
const { Op } = require('sequelize');
const moment = require('moment');
const server = express();

server.use(express.json());

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

server.get('/api/tasks/', async(req, res, next) => {
    try {
        const response = await Task.findAll({
        });
        res.status(200).send(response);
    }
    catch (e) {
        res.status(404).send('failed to GET');
        next(e);
    }
})

server.get('/api/tasks/:year/:month', async(req, res, next) => {
    let { year, month } = req.params;
    try {
        const response = await Task.findAll({
            where: {
                date: {
                    [Op.between]: [
                        moment().year(year).month(month).startOf('month'),
                        moment().year(year).month(month).endOf('month')
                    ],
                }
            },
        });
        res.status(200).send(response);
    }
    catch (e) {
        res.status(404).send('failed to GET');
        next(e);
    }
})

server.post('/api/tasks/', async(req, res, next) => {
    try {
        await Task.create({
            ...req.body
        });
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send('failed to POST');
        next(e);
    }
})

server.put('/api/tasks/:id', async(req, res, next) => {
    try {
        await Task.update({...req.body}, {
            where: {
                id: req.params.id
            }
        });
        res.status(204).send();
    }
    catch (e) {
        res.status(400).send('failed to PUT');
        next(e);
    }
})


sequelize.sync({ force: true })
    .then(() => {
    console.log('db sync successful');
    return seedData();
    })
    .then(() => {
        server.listen(PORT, () => {
            console.log('server listening');
        })
    })

