const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const albums = await Product.findAll({})
    res.json(albums)
  } catch (err) {
    next(err)
  }
})

router.get('/:albumId', async (req, res, next) => {
  try {
    const id = req.params.albumId
    const album = await Product.findById(id, {
      include: [{model: Review}, {model: Category}]
    })
    if (!album) res.sendStatus(404)
    res.json(album)
  } catch (err) {
    next(err)
  }
})
