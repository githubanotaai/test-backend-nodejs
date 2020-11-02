const { Sequelize } = require('sequelize');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'data.sqlite'
});

module.exports = {
  database
}