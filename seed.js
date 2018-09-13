const db = require('./server/db')
const {User, Order, OrderItem, Product} = require('./server/db/models')

const users = [{
  email: 'hanseok87@gmail.com',
  password: 'yqiypo',
  address: '300 E 33rd St',
  admin : true,
  payment: 12334,
  guest: false
}, {
  email: 'andy@gmail.com',
  password: '123701',
  address: '400 W 44th St',
  admin : true,
  payment: 35975,
  guest: false
}, {
  email: 'mina@gmail.com',
  password: '80909',
  address: '100 E 13th St',
  admin : false,
  payment: 70707,
  guest: false
}, {
  email: 'ryan@gmail.com',
  password: 'asdflk50',
  address: '44 Wall St',
  admin : false,
  payment: 30080,
  guest: true
}]

const products = [
  {
    name: 'lemon',
    price: 44,
    description: 'lemon pills'
  },
  {
    name: 'apple',
    price: 3,
    description: 'apple pills'
  },
  {
    name: 'yams',
    price: 55,
    description: 'yams pills'
  },
  {
    name: 'potato',
    price: 76,
    description: 'potato pills'
  },
  {
    name: 'orange',
    price: 32,
    description: 'orange pills'
  },
  {
    name: 'dog food',
    price: 56,
    description: 'dog food'
  }
]

const orders = [
  {
    orderNumber: 'ewyr9482734',
    orderStatus: 'complete',
    userId: 1
  },
  {
    orderNumber: 'qwer6726736',
    orderStatus: 'complete',
    userId: 2
  },
  {
    orderNumber: 'asdf34123',
    orderStatus: 'complete',
    userId: 3
  },
  {
    orderNumber: 'zxcv96553',
    orderStatus: 'complete',
    userId: 1
  }
]

const orderItems = [
  {
    quantity: 1,
    paidUnitPrice: 47,
    orderId: 2,
    productId: 1
  },
  {
    quantity: 2,
    paidUnitPrice: 6,
    orderId: 2,
    productId: 2
  },
  {
    quantity: 1,
    paidUnitPrice: 58,
    orderId: 2,
    productId: 3
  },
  {
    quantity: 1,
    paidUnitPrice: 44,
    orderId: 1,
    productId: 1
  },
  {
    quantity: 1,
    paidUnitPrice: 55,
    orderId: 1,
    productId: 3
  },
  {
    quantity: 2,
    paidUnitPrice: 76,
    orderId: 1,
    productId: 4
  },
  {
    quantity: 3,
    paidUnitPrice: 32,
    orderId: 4,
    productId: 5
  },
  {
    quantity: 1,
    paidUnitPrice: 56,
    orderId: 4,
    productId: 6
  }
]

// 1. setUser / setProduct / setOrder
// 2. createOrder = Order.bulkCreate ({ returning: true })
// in case we later need to incorporate categories

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user)
  ))
  .then(() =>
  Promise.all(orders.map(order =>
    Order.create(order))
    ))
  .then(() =>
  Promise.all(products.map(product =>
    Product.create(product))
  ))
  .then(() =>
  Promise.all(orderItems.map(item =>
    OrderItem.create(item))
  ))

const main = () => {
  console.log('syncing db..');
  db.sync({force: true})
  .then(() => {
    console.log('seeding database');
    return seed();
  })
  .catch(err => {
    console.log('error while seeding');
    console.log(err.stack)
  })
  .then(() => {
    db.close();
    return null;
  })
}

main();


