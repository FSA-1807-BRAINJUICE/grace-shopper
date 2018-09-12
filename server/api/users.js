const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

//CG: Security on route. 
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get a user by the given id
router.get('/:userId', async(req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.userId)
    res.json(oneUser)
  } catch (err) {
    next(err)
  }
});

// create a new user -- CG: DELETE
router.post('/', async (req, res, next) => {
  try {
    if(!req.user.admin){ // req.user coming from PASSPORT SESSION
      res.sendStatus(403)
    }
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
});

// update
router.put('/:userId', async (req, res, next) => {
  try {
    if(!req.user.admin){
      res.sendStatus(403)
    } //CG: Make an else for the rest or you're going to get the error. 
    const user = await User.update(req.body, {
      where: {
        id: req.params.userId
      },
      returning: true,
      plain: true
    });
    if (!user) return res.sendStatus(404)
    res.send(user);
  } catch (err) {
    next(err)
  }
});

//get orders of this user(/api/users/:userId/orders?status=[pending|complete|transaction-failed]);
router.get('/:userId/orders', async (req, res, next) => {
  try {
    //CG: Security maybe? But relaly good job 
    const queryCondition = {
      userId: req.params.userId
    }
    if (req.query.status){
      queryCondition.orderStatus = req.query.status
    }
    const orders = await Order.findAll({
      where: queryCondition
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
