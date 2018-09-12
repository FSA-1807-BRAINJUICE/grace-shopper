const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get a user by the given id
router.get('/:userId', async(req, res, next) => {

});

// create a new user
router.post('/', async (req, res, next) => {

});

// update
router.put('/:userId', async (req, res, next) => {

});

//get orders of this user(/:userId/orders?status=[pending/complete]);
router.put('/:userId/orders', async (req, res, next) => {

})
