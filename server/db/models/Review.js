const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  title: {
    type: Sequelize.STRING
  },
  comment: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Review
