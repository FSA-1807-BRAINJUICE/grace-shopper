const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
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
    res.send(product);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
//CG: Highly recommend that you use some sort of linter (es-lint) as well as maybe prettier to make life easier. 
    const product = await Product.findById(req.params.id);
    if (!product) return res.sendStatus(404); //CG: res.status(404).send('SOME MESSAGE'); res.send(404);
    res.send(product);
  } catch (err) {
    next(err)
  }
})


router.put('/:id', async (req, res, next) => {
  try {
    if(!req.user.admin){
      res.sendStatus(403) //CG: Same thing here. 
    }

    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    });
    if (!product) return res.sendStatus(404)
    res.send(product);
  } catch (err) {
    next(err)
  }
})

