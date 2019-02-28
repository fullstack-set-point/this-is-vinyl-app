const router = require('express').Router()
const {User, Cart, Order, Review, CartItem, Product} = require('../db/models')

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
    const user = await User.findById(req.params.userId)
    const cartId = user.cartId
    console.log('USER!!!', user)
    const productId = req.body.productId
    const quantity = req.body.quantity
    const cartItem = {productId, quantity}
    const newCartItem = await CartItem.create(cartItem, {
      where: {
        cartId
      }
    })
    await newCartItem.setCart(cartId)
    res.json(newCartItem[0])
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const cartItems = await CartItem.findAll({
      where: {
        cartId: user.cartId
      },
      include: [{model: Product}]
    })
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

module.exports = router
