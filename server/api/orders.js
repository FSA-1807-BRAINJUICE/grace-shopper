const router = require('express').Router()
const { Order, OrderItem, Product } = require('../db/models')

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;

  // make sure there is an order with the given orderId.
  let order;
  try {
    order = await Order.findById(orderId, {include: OrderItem});
    if (!order) {
      res.status(404).send("Order not found - " + orderId);
    }
  } catch (err) {
    next(err)
  }

  // check user privilege
  if (!req.user) {
    // a case of a logged-out user -
    // if req.sessionId is different from a sessionId of the order,
    // then the logged-out user is not allowed to get this order.
    if (req.session.id !== order.sessionId) {
      res.status(403).send("Forbidden to see this order");
    }
  } else if (!req.user.isAdmin && req.user.id !== order.userId) {
    // a case of a logged-in user
    res.status(403).end();
  }

  res.status(200).json(order)
})

// POST /api/orders
// Note that if there is a body coming in with an item to add, create a cart with the item in.
router.post('/', async (req, res, next) => {
  try {
    const orderToCreate = {}
    if (req.user) {
      // an order of a logged-in user
      orderToCreate.userId = req.user.id;
    } else {
      // an order of a logged-out user
      orderToCreate.sessionId = req.session.id;
    }

    const order = await Order.create(orderToCreate);

    if(req.body.item){
      const item = req.body.item;
      const itemToAdd = {
        quantity: item.quantity,
        orderId: order.id,
        productId: item.productId,
      };
      await OrderItem.create(itemToAdd);
    }

    // set up an order cookie
    res.cookie("o_id", order.id, {
      maxAge: 3600 * 24 * 365000, // a year
      httpOnly: true
    });

    // get the order just created with items
    const orderWithItems = await Order.findById(order.id, {include: OrderItem});
    res.status(201).json(orderWithItems);
  } catch (err) {
    //console.error(err);
    next(err)
  }
})

// PUT /api/orders/:orderId
router.put('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;
  try {

    // check if there is an order with the given orderId
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send("Order not found - " + orderId);
    }

    if (req.user) { //known user
      if (!req.user.admin && req.user.id !== order.userId) { //not an admin and a known user requested some other user's order
        res.status(403).send('Forbidden');
      }
    } else if (req.session.id !== order.sessionId) {
      res.status(403).send('Forbidden');
    }

    // Note that order has 4 properties - orderNumber, orderStatus, sessionId, and userId.
    // orderNumber, sessionId, and userId shouldn't be updated.
    order.orderStatus = req.body.orderStatus;

    const updatedOrder = await Order.update(order, {
      where: { id: orderId },
      returning: true
    })

    res.cookie("o_id", order.id, {
      maxAge: 3600 * 24 * 365000, // a year
      httpOnly: true
    });

    res.status(202).json(updatedOrder);
  } catch (err) { next(err) }
})

// POST /api/orders/:orderId/item
router.post('/:orderId/item', async (req, res, next) => {
  const orderId = req.params.orderId;
  const productId = req.body.productId;

  try {
    // check if product and order exist, before creation.
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send('No product found - ' + productId);
    }
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send('No order found - ' + orderId);
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

    const itemAdded = await OrderItem.create(newItemToAdd, orderId);

    // create or update the cart cookie
    res.cookie("o_id", order.id, {
      maxAge: 3600 * 24 * 365000, // a year
      httpOnly: true
    });

    res.status(201).json(itemAdded)
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
