const router = require('express').Router()
const {Order, OrderItem, User, CartItem} = require('../db/models')
const nodemailer = require('nodemailer')
const password = process.env.GOOGLE_PASSWORD

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'toricpope@gmail.com',
    pass: password
  }
})

const sendConfirmationEmail = (email, orderId, ...args) => {
  const info = args
  console.log('INFO', info)
  const mailOptions = {
    from: '"This Is Vinyl App" <toricpope@gmail.com>',
    to: email,
    subject: `This is Vinyl App: Order #${orderId}`,
    html: `
      <h3>Order #${orderId} confirmed</h3>
      <h4>Subtotal:</h4>
      <p>$${info[6].toFixed(2)}</p>
      <h4>Shipping to:</h4>
      <p>${info[0]} ${info[1]}</p>
      <p>${info[2]}</p>
      <p>${info[3]}, ${info[4]} ${info[5]}</p>
      </br>
      <p>For more information about your order, view 'Past Orders' from your account page.</p>
    `
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err)
    } else {
      console.log(info)
    }
  })
}

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const cartItems = req.body.cartItems
    const userId = req.body.userId
    // cartId is null for new users, need to setCart somewhere
    const cartId = cartItems[0].cartId

    console.log(req.body)
    // update user's info from the form (exlcuding email)
    const user = await User.findById(userId)
    await user.update({
      firstName,
      lastName,
      address,
      city,
      state,
      zip
    })
    // create new order & set userId
    const totalArr = cartItems.map(item => {
      let result = 0
      result += item.quantity * item.product.price
      return result
    })
    const total = totalArr.reduce((accum, currVal) => {
      return accum + currVal
    })
    const newOrder = await Order.create({
      total,
      orderDate: new Date()
    })
    await newOrder.setUser(userId)
    const orderId = newOrder.id

    // create new orderItems & set orderId
    await Promise.all(
      cartItems.map(item => {
        // get product price
        const price = item.product.price
        const productName = item.product.album
        return OrderItem.create({
          price,
          quantity: item.quantity,
          productName,
          orderId: newOrder.id
        })
      })
    )
    // delete CartItems
    await Promise.all(
      cartItems.map(item => {
        const id = item.id
        return CartItem.destroy({
          where: {
            id
          }
        })
      })
    )

    sendConfirmationEmail(
      email,
      orderId,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      total
    )
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
