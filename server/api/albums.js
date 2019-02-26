const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:albumId', async (req, res, next) => {
  try {
    const id = req.params.albumId
    const album = await Product.findById(id)
    if (!album) res.sendStatus(404)
    res.json(album)
  } catch (err) {
    next(err)
  }
})
