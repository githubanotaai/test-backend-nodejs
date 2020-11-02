const { DataTypes } = require('sequelize');
const {database} = require('../database/database')

const products = database.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  },
  category: {
    type: DataTypes.STRING
  }
})

async function waitforcreation(){
  await products.sync({ force: false });
}

waitforcreation()

module.exports = {
  products
}