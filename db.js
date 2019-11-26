const Sequelize = require('sequelize');
const pg = require('pg');
const testDB = 'postgres://localhost:5432/calendar';
// const { prodDB } = require('./secrets');
// pg.defaults.ssl = true;


const sequelize = new Sequelize(testDB, { logging: false });

const Test = sequelize.define('test', {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    }
})


module.exports = {
    sequelize,
    Test,
}
