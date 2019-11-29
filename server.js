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
    const response = await TaskDate.findAll({
        include: [Task],
    });
    res.status(200).send(response);
})

server.get('/api/tasks/:year/:month/:date?', async(req, res, next) => {
    let { year, month, date } = req.params;
    let response = '';
    if (date) {
        response = await TaskDate.findAll({
            where: {
                date: {
                    [Op.between]: [
                        moment().year(year).month(month).date(date).startOf('date'),
                        moment().year(year).month(month).date(date).endOf('date')
                    ],
                }
            },
            include: [Task],
        });
    }
    else {
        response = await TaskDate.findAll({
            where: {
                date: {
                    [Op.between]: [
                        moment().year(year).month(month).startOf('month'),
                        moment().year(year).month(month).endOf('month')
                    ],
                }
            },
            include: [Task],
        });
    }
    res.status(200).send(response);
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

