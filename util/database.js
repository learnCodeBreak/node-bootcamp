const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-bootcamp', 'root', '1234567', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;