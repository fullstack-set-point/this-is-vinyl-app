const router = require('express').Router()
const stripe = require('stripe')('sk_test_Lu7bb9GMM75KgXnrqHK0oWZD')

router.post('/charge', async (req, res) => {
  try {
    const {name, email, address, city, state, zip, cartItems} = req.body
    let {status} = await stripe.charges.create({
      name,
      email,
      address,
      city,
      state,
      zip,
      cartItems,
      source: req.body
    })
    console.log('CHECKOUT STATUS', {status})

    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
