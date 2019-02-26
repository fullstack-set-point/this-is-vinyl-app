const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order_item', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem
