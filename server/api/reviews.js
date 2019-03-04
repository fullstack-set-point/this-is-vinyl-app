const router = require('express').Router()
const {Review} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const rating = req.body.rating
    const title = req.body.title
    const comment = req.body.comment
    const productId = req.body.albumId
    const userId = req.body.userId
    await Review.create({
      rating,
      title,
      comment,
      date: new Date(),
      productId,
      userId
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
