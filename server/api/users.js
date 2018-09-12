const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

// create a new user
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
    }

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

//get orders of this user(/:userId/orders?status=[pending/complete]);
// router.put('/:userId/orders', async (req, res, next) => {

// })
