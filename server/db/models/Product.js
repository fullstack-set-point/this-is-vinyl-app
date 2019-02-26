const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  album: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'noimgavail'
  }
})

module.exports = Product
//ADD METHOD FOR DECREMENTING QTY
