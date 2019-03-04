const router = require('express').Router()
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET)

router.post('/', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      name,
      amount: 2000,
      currency: 'usd',
      description: 'charge',
      source: req.body
    })
    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})

module.exports = router
