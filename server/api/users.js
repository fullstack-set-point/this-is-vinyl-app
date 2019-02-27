const router = require('express').Router()
const User = require('../db/models/User')
const Cart = require('../db/models/Cart')
const Order = require('../db/models/Order')
const Review = require('../db/models/Review')
const CartItem = require('../db/models/CartItem')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{model: Cart}, {model: Order}, {model: Review}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{model: Cart}, {model: Order}, {model: Review}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await User.create(email, password)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      returning: true,
      where: {id: req.params.userId}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({where: {id: req.params.userId}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const user = User.findById(req.params.userId)
    const cart = await user.getCart()
    const newCartItem = await CartItem.create(req.body, {
      where: {
        cartId: cart.id
      }
    })
    res.json(newCartItem[0])
  } catch (err) {
    next(err)
  }
})

module.exports = router
