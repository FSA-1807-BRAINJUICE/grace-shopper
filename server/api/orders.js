const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId

  // make sure there is an order with the given orderId.
  let order
  try {
    order = await Order.findById(orderId, {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    })
    if (!order) {
      res.status(404).send("Order not found - " + orderId);
      return;
    }
  } catch (err) {
    next(err)
  }

  // check user privilege
  if(!req.user){
    res.status(403).send('No orders saved in DB for logged-out user!');
    return;
  }

  if (!req.user.isAdmin && req.user.id !== order.userId) {
    // a case of a logged-in user
    res.status(403).send("Forbidden");
    return;
  }

  res.status(200).json(order)
})

// POST /api/orders
// Note that if there is a body coming in with an item to add, create a cart with the item in.
router.post('/', async (req, res, next) => {
  try{
    // if(!req.user){
    //   res.status(403).send('an order gets created only for a logged-in user');
    // }

    // purely create a new Order instance.
    const orderToCreate = {}
    if (req.user) {
      // an order of a logged-in user
      orderToCreate.userId = req.user.id
    }

    const order = await Order.create(orderToCreate)

    res.status(201).json(order)
  }catch(err){
    next(err)
  }
})

// PUT /api/orders/:orderId
router.put('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId
  try {
    // check if there is an order with the given orderId
    const order = await Order.findById(orderId)
    if (!order) {
      res.status(404).send("Order not found - " + orderId);
      return;
    }

    if (req.user) { //known user
      if (!req.user.admin && req.user.id !== order.userId) { //not an admin and a known user requested some other user's order
        res.status(403).send('Forbidden');
        return;
      }
    }

    // Note that order has 4 properties - orderNumber, orderStatus, and userId.
    // orderNumber, and userId shouldn't be updated.
    const updatedOrder = await Order.update(
      {
        orderStatus: req.body.orderStatus,
        name: req.body.name,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        region: req.body.region,
        postal: req.body.postal,
        phone: req.body.phone,
        email: req.body.email
      },
      {
        where: {id: orderId},
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product
              }
            ]
          }
        ],
        returning: true,
        plain: true
      }
    )

    // if orderStatus === complete, i.e., completed a checkout, then update all the orderItems with the actual paid prices
    if (req.body.orderStatus === 'complete') {
      const orderItems = await OrderItem.findAll({
        where: {orderId: orderId},
        include: [{model: Product}]
      })

      for (let item of orderItems) {
        item.update(
          {paidUnitPrice: item.product.price},
          {where: {id: item.id}}
        )
      }
    }

    res.status(202).json(updatedOrder[1])
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId/items/:itemId', async (req, res, next) => {
  const orderId = req.params.orderId
  const itemId = req.params.itemId
  try {
    const order = await Order.findById(orderId)
    if (!order) {
      res.status(404).send('No order found - ' + orderId);
      return;
    }

    if (req.user && (!req.user.admin && req.user.id !== order.userId)) {
      //known user
      //not an admin and a known user requested some other user's order
        res.status(403).send('Forbidden to retrieve this order item');
        return;
    }

    const item = await OrderItem.findById(itemId)
    res.status(201).json(item)
  } catch (err) {
    next(err)
  }
})

// POST /api/orders/:orderId/item
router.post('/:orderId/items', async (req, res, next) => {
  const orderId = req.params.orderId
  const productId = req.body.productId
  try {
    // check if product and order exist, before creation.
    const product = await Product.findById(productId)
    if (!product) {
      res.status(404).send('No product found - ' + productId);
      return;
    }
    const order = await Order.findById(orderId)
    if (!order) {
      res.status(404).send('No order found - ' + orderId);
      return;
    }

    // make sure the current user is allowed to create an item to this order.
    if (req.user && (!req.user.admin && req.user.id !== order.userId)) {
      //known user
      //not an admin and a known user requested some other user's order
        res.status(403).send('update forbidden');
        return;
    }

    const newItemToAdd = {
      quantity: req.body.quantity,
      orderId: order.id,
      productId: product.id
    }

    const itemAdded = await OrderItem.create(newItemToAdd);
    res.status(201).json(itemAdded)
  }catch(err){
    next(err);
  }
})

router.put('/:orderId/items/:itemId', async (req, res, next) => {
  const orderId = req.params.orderId
  const itemId = req.params.itemId
  try {
    // check if there is an order with the given orderId
    const order = await Order.findById(orderId)
    const orderItem = await OrderItem.findById(itemId)
    const product = await Product.findById(orderItem.productId)
    if (!product || !order || !orderItem) {
      res.status(404).send('No product, order item, or order found');
      return;
    }

    if(!req.user){
      res.status(403).send('No order is saved in DB for logged-out users.');
      return;
    }

    if (!req.user.admin && req.user.id !== order.userId) { //not an admin and a known user requested some other user's order
      res.status(403).send('Forbidden');
      return;
    }

    const orderItemDetail = {
      quantity: req.body.quantity,
      orderId: order.id,
      productId: product.id
    }

    await OrderItem.update(orderItemDetail, {
      where: {id: itemId},
      returning: true
    })

    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId/items/:itemId', async (req, res, next) => {
  const requestedItem = req.params.itemId
  const requestedOrder = req.params.orderId
  try {
    const order = await Order.findById(requestedOrder)
    if (!order) {
      res.status(404).send("Order Not Found");
      return;
    }

    const item = await OrderItem.findById(requestedItem)
    if (!item) {
      res.status(404).send('item not found');
      return;
    }

    if(!req.user){
      res.status(403).send("No orders is saved in DB for logged-out users");
      return;
    }

    if (!req.user.admin && req.user.id !== order.userId) { //not an admin and a known user requested some other user's order
      res.status(403).send('update forbidden');
      return;
    }


    await OrderItem.destroy({
      where: {id: requestedItem}
    })

    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

module.exports = router
