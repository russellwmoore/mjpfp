const Sequelize = require('sequelize');


const pg = require('pg');

const TEST_DB = 'postgres://localhost:5432/calendar';

const sequelize = new Sequelize(TEST_DB, { logging: false });
const Task = sequelize.define('task', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'task',
        allowNull: false,
    }
});

const TaskDate = sequelize.define('taskdate', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    }
});

// Task.belongsTo(TaskDate);
// TaskDate.hasMany(Task);


module.exports = {
    sequelize,
    Task,
   // TaskDate
}
