const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')

// /api/users
router.get('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.admin) {
      res.status(403).send('Forbidden')
      return
    }

    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get a user by the given id
router.get('/:userId', async (req, res, next) => {
  try {
    if (
      !req.user ||
      !req.user.admin ||
      req.user.id !== Number(req.params.userId)
    ) {
      res.status(403).send('Forbidden')
      return
    }

    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// create a new user
router.post('/', async (req, res, next) => {
  try {
    // avoid duplicate email
    const email = req.body.email
    const emailCheckUser = await User.find({
      where: {
        email: email
      }
    })

    if (emailCheckUser) {
      res.status(403).send('Duplicate account exists')
      return
    }

    let admin = false
    if (req.user && req.user.admin) {
      admin = req.body.admin
    }

    const userBody = {
      email: email,
      password: req.body.password,
      googleId: req.body.googleId,
      address: req.body.address,
      admin: admin,
      payment: req.body.payment
    }

    const user = await User.create(userBody)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// update
router.put('/:userId', async (req, res, next) => {
  try {
    if (!req.user || !req.user.admin) {
      res.status(403).send('forbidden to update a user info')
      return
    }

    // only either admin or the account holder is allowed to update the user account.
    if (req.user.admin || req.user.id === Number(req.params.userId)) {
      const user = await User.update(req.body, {
        where: {
          id: req.params.userId
        },
        returning: true
      })

      if (!user) {
        res.status(404).send('user not found')
        return
      }

      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})

//get orders of this user(/api/users/:userId/orders?status=[pending|complete|transaction-failed]);
router.get('/:userId/orders', async (req, res, next) => {
  try {
    if (
      !req.user ||
      (!req.user.admin && req.user.id !== Number(req.params.userId))
    ) {
      res.status(403).send('forbidden to see orders of this user')
      return
    }

    const queryCondition = {
      userId: req.params.userId
    }

    if (req.query.status) {
      queryCondition.orderStatus = req.query.status
    }

    const orders = await Order.findAll({
      where: queryCondition,
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

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
