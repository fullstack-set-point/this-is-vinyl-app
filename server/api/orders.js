const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
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
    sendConfirmationEmail(email)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
