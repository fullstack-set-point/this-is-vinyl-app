const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const cartItems = req.body.cartItems

    console.log(cartItems)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
