const router = require('express').Router()
const {User, Order} = require('../db/models')

// /api/users
router.get('/', async (req, res, next) => {
  try {
    if(!req.user.admin){
      res.status(403).send('ineligible to view all users.');
    }

    const users = await User.findAll();
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get a user by the given id
router.get('/:userId', async(req, res, next) => {
  try {
    if(!req.user.admin || req.user.id !== req.params.userId){
      res.status(403).send('Forbidden');
    }

    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
});

// create a new user
router.post('/', async (req, res, next) => {
  try {
    // avoid duplicate email
    const email = req.body.email;
    const emailCheckUser = await User.find({
      where: {
        email: email
      }
    });

    if(emailCheckUser){
      res.status(403).send('Duplicate account exists');
    }

    let admin = false;
    if(req.user.admin){
      admin = req.body.admin;
    }

   const userBody = {
      email: email,
      password: req.body.password, // TODO: Need to hash the password.
      googleId: req.body.googleId,
      address: req.body.address,
      admin: admin,
      payment: req.body.payment
    };

    const user = await User.create(userBody);
    res.send(user);
  } catch (error) {
    next(error)
  }
});

// update
router.put('/:userId', async (req, res, next) => {
  try {
    if(!req.user.admin){
      res.status(403).send('forbidden to update a user info');
    }

    // only either admin or the account holder is allowed to update the user account.
    if(req.user.admin || req.user.id === req.params.userId){
      const user = await User.update(req.body, {
        where: {
          id: req.params.userId
        },
        returning: true
      });

      if (!user) {
        res.status(404).send('user not found', req.params.userId);
      } else{
        res.send(user);
      }
    }
  } catch (err) {
    next(err)
  }
});

//get orders of this user(/api/users/:userId/orders?status=[pending|complete|transaction-failed]);
router.get('/:userId/orders', async (req, res, next) => {
  try{
    if(!req.user.admin && req.user.id !== req.params.userId){
      res.status(403).send('forbidden to see orders of this user');
    }

    const queryCondition = {
      userId: req.params.userId,
    }

    if(req.query.status){
      queryCondition.orderStatus= req.query.status;
    }

    const orders = await Order.findAll({
      where: queryCondition,
    })

    res.send(orders);
  }catch(err){
    next(err);
  }
});


module.exports = router
