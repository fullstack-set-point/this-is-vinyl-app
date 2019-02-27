const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_item', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = CartItem
