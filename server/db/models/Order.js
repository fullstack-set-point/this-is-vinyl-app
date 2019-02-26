const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER
  },
  orderDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  orderStatus: {
    type: Sequelize.ENUM,
    value: ['Created', 'Processing', 'Completed', 'Cancelled'],
    defaultValue: 'Created'
  }
})

module.exports = Order
