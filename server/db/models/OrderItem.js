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
  },
  productName: {
    type: Sequelize.STRING
  },
  productId: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderItem
