const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404).send('No product found - ' + req.params.id)
      return
    }

    // convert int type to a double value.
    product.price /= 100
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()

    // convert the price type to double
    products.map(product => {
      product.price /= 100
    })

    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.user.admin) {
      res.status(403).send('ineligible to create a new product')
      return
    }

    const productBody = {
      name: req.body.name,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      description: req.body.description
    }

    const product = await Product.create(productBody)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.user.admin) {
      res.status(403).send('ineligible to update a product')
      return
    }

    const productBody = {
      name: req.body.name,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      description: req.body.description
    }

    const product = await Product.update(productBody, {
      where: {
        id: req.params.id
      },
      returning: true
    })

    if (!product) {
      res.status(404).send('No product found - ' + req.params.id)
      return
    }

    res.json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
