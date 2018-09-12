const router = require('express').Router()
const { Order, OrderItem, Product } = require('../db/models')

//req.session or req.sessionId; determine based on how we assign session

router.get('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;
  let order;
  try {
    order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send();
    }
  } catch (err) { next(err) }

  if (!req.user) {
    // a case of a logged-out user
    // if req.sessionId is different from a sessionId of the order,
    // then the logged-out user is not allowed to get this order.
    if (order.sessionId !== req.session.id) {
      // user forbidden;
      res.status(403).end();
    }
  } else if (!req.user.isAdmin && req.user.id !== order.userId) {
    // a case of a logged-in user
    res.status(403).end();
  }

  res.status(200);
  res.json(order)
})

router.post('/', async (req, res, next) => {
  const newOrder = req.body;
  try {
    if (req.user) {
      // an order of a logged-in user
      newOrder.userId = req.user.id;
    } else {
      // an order of a logged-out user
      newOrder.sessionId = req.session.id;
    }

    const order = await Order.create(newOrder);
    res.status(201);
    res.json(order)
  } catch (err) { next(err) }
})

router.put('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send();
    }

    if (req.user) { //known user
      if (!req.user.admin && req.user.id !== order.userId) { //not an admin and a known user requested some other user's order
        console.log('update forbidden')
        res.status(403).end();
      }
    } else if (req.session.id !== order.sessionId) {
      console.log('update forbidden')
      res.status(403).end();
    }


    const targetOrder = await Order.update(req.body, {
      where: { id: orderId },
      returning: true
    })
    if (!targetOrder) {
      res.status(404).send();
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
      res.status(404).send();
    } else {
      newItemToAdd.orderId = requestedOrder;
      const newItem = await OrderItem.create(newItemToAdd)
      if (!newItem) {
        res.status(404).send();
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
      where: { id: requestedItem }
    });
    res.status(201).send()
  } catch (err) { next(err) }
})




module.exports = router;
