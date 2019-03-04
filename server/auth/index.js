const router = require('express').Router()
const User = require('../db/models/User')
const CartItem = require('../db/models/CartItem')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const currentGuest = await User.findOne({
        where: {
          email: req.sessionID
        },
        attributes: ['cartId']
      })
      const updatedVals = {
        isAuth: true,
        cartId: currentGuest.cartId
      }
      if (user.cartId) {
        const existingCartItems = CartItem.findAll({
          where: {
            cardId: user.cartId
          }
        })
        console.log('EXISTING CART ITEMS: >>>>>>>>> ', existingCartItems)
      }
      const loggedInUser = await User.update(updatedVals, {
        where: {
          id: user.id
        },
        returning: true
      })
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  // req.session.regenerate()
  // console.log('REQ. SESSION IS THIS A THING OR WHAT I DONT KNOW: >>>>>>>>>>>>', req.session)
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
