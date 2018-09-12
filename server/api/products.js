const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {

    const product = await Product.findById(req.params.id);
    if (!product) return res.sendStatus(404);
    res.json(product);
  } catch (err) {
    next(err)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if(!req.user.admin){
      res.sendStatus(403)
    }

    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if(!req.user.admin){
      res.sendStatus(403)
    }

    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    });
    if (!product) return res.sendStatus(404)
    res.json(product);
  } catch (err) {
    next(err)
  }
})

