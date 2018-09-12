const router = require('express').Router()
const { Order, OrderItem, Product } = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  const requestedOrder = req.params.orderId;
  try {
    const order = await Order.findById(requestedOrder);
    if (!order) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.json(order)
    }
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  const newOrder = req.body;
  try {
    const order = await Order.create(newOrder);
    res.status(201);
    res.json(order)
  } catch (err) { next(err) }
})

router.put('/:orderId', async (req, res, next) => {
  const requestedOrder = req.params.orderId;
  try {
    const targetOrder = await Order.update(req.body, {
      where: { id: requestedOrder },
      returning: true,
      plain: true
    })
    if (!targetOrder) {
      res.sendStatus(404);
    } else {
      res.status(202);
      res.json(targetOrder)
    }
  } catch (err) { next(err) }
})

router.post('/:orderId/item', async (req, res, next) => {
  const requestedOrder = req.params.orderId;
  const newItemToAdd = req.body;
  const targetProduct = req.body.productId;
  try {
    const product = await Product.findById(targetProduct);
    if (!product) {
      res.sendStatus(404);
    } else {
      newItemToAdd.orderId = requestedOrder;
      const newItem = await OrderItem.create(newItemToAdd)
      if (!newItem) {
        res.sendStatus(404);
      } else {
        res.status(201);
        res.json(newItem)
      }
    }
  } catch (err) { next(err) }
})

router.delete('/:orderId/item/:itemId', async (req, res, next) => {
  const requestedItem = req.params.itemId;
  try {
    await OrderItem.destroy({
      where: {id: requestedItem}
    });
    res.sendStatus(201)
  } catch (err) { next(err) }
})




module.exports = router;
