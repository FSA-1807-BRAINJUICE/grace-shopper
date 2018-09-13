const router = require('express').Router()
const { Order, OrderItem, Product } = require('../db/models')

//req.session or req.sessionId; determine based on how we assign session

router.get('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;
  let order;
  try {
    order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send("Order not found - " + orderId);
    }
  } catch (err) { next(err) }

  if (!req.user) {
    // a case of a logged-out user
    // if req.sessionId is different from a sessionId of the order,
    // then the logged-out user is not allowed to get this order.
    if (req.session.id !== order.sessionId) {
      res.status(403).send("Forbidden to see this order");
    }
  } else if (!req.user.isAdmin && req.user.id !== order.userId) {
    // a case of a logged-in user
    res.status(403).end();
  }

  res.status(200);
  res.json(order)
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = {
      orderNumber: req.body.orderNumber
    }

    if (req.user) {
      // an order of a logged-in user
      newOrder.userId = req.user.id;
    } else {
      // an order of a logged-out user
      newOrder.sessionId = req.session.id;
    }

    const order = await Order.create(newOrder);
    res.status(201).json(order);
  } catch (err) {
    console.err(err);
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send("Order not found - " + orderId);
    }

    if (req.user) { //known user
      if (!req.user.admin && req.user.id !== order.userId) { //not an admin and a known user requested some other user's order
        res.status(403).send('update forbidden');
      }
    } else if (req.session.id !== order.sessionId) {
      res.status(403).send('update forbidden');
    }

    // Note that order has 4 properties - orderNumber, orderStatus, sessionId, and userId.
    // orderNumber, sessionId, and userId shouldn't be updated.
    order.orderStatus = req.body.orderStatus;

    const targetOrder = await Order.update(order, {
      where: { id: orderId },
      returning: true
    })
    if (!targetOrder) {
      res.status(404).send();
    } else {
      res.status(202).json(targetOrder);
    }
  } catch (err) { next(err) }
})

router.post('/:orderId/item', async (req, res, next) => {
  const requestedOrder = req.params.orderId;
  const targetProduct = req.body.productId;

  try {
    // check if product and order exist, before creation.
    const product = await Product.findById(targetProduct);
    if (!product) {
      res.status(404).send('No product found - ' + targetProduct);
    }
    const order = await Order.findById(requestedOrder);
    if (!order) {
      res.status(404).send('No order found - ' + requestedOrder);
    }

    // make sure the current user is allowed to create an item to this order.
    if (req.user && (!req.user.admin && req.user.id !== order.userId)) { //known user
      //not an admin and a known user requested some other user's order
        res.status(403).send('update forbidden');
    }
    if (req.session.id !== order.sessionId) {
      res.status(403).end('update forbidden');
    }

    const newItemToAdd = {
      quantity: req.body.quantity,
      paidUnitPrice: product.price,
      orderId: order.id,
      productId: product.id
    };

    const newItem = await OrderItem.create(newItemToAdd)
    res.status(201).json(newItem)
  }
  catch (err) { next(err) }
})

router.delete('/:orderId/item/:itemId', async (req, res, next) => {
  const requestedItem = req.params.itemId;
  const requestedOrder = req.params.orderId;
  try {
    const order = await Order.findById(requestedOrder);
    if (!order) {
      res.status(404).send();
    }

    const item = await OrderItem.findById(requestedItem);
    if (!item) {
      res.status(404).send('item not found in orderitem table; item: ' + { requestedItem })
    }

    if (req.user) { //known user
      if (!req.user.admin && req.user.id !== order.userId) { //not an admin and a known user requested some other user's order
        res.status(403).send('update forbidden');
      }
    } else if (req.session.id !== order.sessionId) {
      res.status(403).send('update forbidden');
    }

    await OrderItem.destroy({
      where: { id: requestedItem }
    });

    res.status(201).send();
  } catch (err) { next(err) }
})


module.exports = router;
