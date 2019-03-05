const router = require('express').Router()
const {
  User,
  Cart,
  Order,
  OrderItem,
  Review,
  CartItem,
  Product
} = require('../db/models')

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
    const guestUserExists = await User.find({
      where: {
        email: req.sessionID
      }
    })
    if (guestUserExists) {
      // if guest user already has cookie, return user
      res.json(guestUserExists)
    } else if (!req.body.email) {
      //else if there's no email/user, create a guest user with sessionID as email
      const email = req.sessionID
      const newCart = await Cart.create() //and give them a cart
      const user = await User.create({
        email: email,
        cartId: newCart.id
      })
      res.json(user)
    } else {
      const newCart = await Cart.create()
      const {email, password} = req.body
      const user = await User.create({
        cartId: newCart.id,
        email,
        password,
        isAuth: true
      })
      res.json(user)
    }
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
    const productId = req.body.productId
    const quantity = req.body.quantity
    const newCartItem = await CartItem.create({
      productId,
      quantity,
      cartId
    })
    // await newCartItem.setCart(cartId)
    res.json(newCartItem)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    let cartItems = []
    cartItems = await CartItem.findAll({
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

router.delete('/:userId/cart/:cartItemId', async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId
    await CartItem.destroy({
      where: {
        id: cartItemId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const orders = await Order.findAll({
      where: {
        userId
      },
      include: [{model: OrderItem}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findById(orderId, {
      include: [{model: OrderItem}, {model: User}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
