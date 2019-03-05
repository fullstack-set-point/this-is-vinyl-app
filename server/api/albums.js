const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const albums = await Product.findAll({
      include: [{model: Review}, {model: Category}]
    })
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

router.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const id = req.params.categoryId
    const category = await Category.findById(id)
    const albums = await category.getProducts()
    if (!albums) res.sendStatus(404)
    res.json(albums)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await Product.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const title = req.body.title
    const description = req.body.description
    const year = req.body.year
    const price = req.body.price
    const quantity = req.body.quantity
    const image = req.body.image
    const body = {title, description, year, price, quantity, image}
    const id = req.body.albumId
    const album = await Product.findById(id)
    await album.update(body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
