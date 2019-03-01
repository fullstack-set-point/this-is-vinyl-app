const router = require('express').Router()
const stripe = require('stripe')('sk_test_Lu7bb9GMM75KgXnrqHK0oWZD')

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
