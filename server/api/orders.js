const router = require('express').Router()
const {Order, OrderItem, User, Product} = require('../db/models')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

const transporter = nodemailer.createTransport({
  service: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: 'toricpope@gmail.com',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: '1/cvI2fCrq7zLx1BJmP51MdUoVxwMm7z1yiwO63iXDMak'
    })
  }
})

const sendConfirmationEmail = email => {
  const mailOptions = {
    from: '"This Is Vinyl App" <toricpope@gmail.com>',
    to: email,
    subject: `This is Vinyl App Order Confirmation`,
    html: '<p>Order complete</p>'
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
    console.log('TOTAL', total)
    const newOrder = await Order.create({
      total,
      orderDate: new Date()
    })
    await newOrder.setUser(userId)

    // create new orderItems & set orderId
    await Promise.all(
      cartItems.map(item => {
        // get product price
        const price = item.product.price
        console.log('PRODUCT', item.product)
        return OrderItem.create({
          price,
          quantity: item.quantity,
          orderId: newOrder.id
        })
      })
    )
    sendConfirmationEmail(email)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
