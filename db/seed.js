const { sequelize, Task, TaskDate } = require('./db');

const TASKS_NUMBER = 5;

const randomString = () => `${Math.random() * 15} - ${Math.random() * 15} - ${Math.random() * 15}`;

const seedData = async function() {
    let dates = [];
    for (let i = 0; i < TASKS_NUMBER; i++) {
        dates.push(new Date(2019, 10, (20 + i)));
    }
    for (let i = 0; i < TASKS_NUMBER; i++) {
        dates.push(new Date(2019, 11, (20 + i)));
    }
    const dateFields = await Promise.all(dates.map(d => TaskDate.create({ date: d })));
    const taskFields = await Promise.all(dateFields.map(date => Task.create({
        description: randomString(),
        taskdateId: date.id,
    })));
}

module.exports = {
    seedData: seedData,
};
