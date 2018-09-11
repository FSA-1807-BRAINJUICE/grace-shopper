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
    imgUrl: 'img.png',
    description: 'lemon pills'
  },
  {
    name: 'apple',
    price: 3,
    imgUrl: 'img.png',
    description: 'apple pills'
  },
  {
    name: 'yams',
    price: 55,
    imgUrl: 'img.png',
    description: 'yams pills'
  },
  {
    name: 'potato',
    price: 76,
    imgUrl: 'img.png',
    description: 'potato pills'
  },
  {
    name: 'orange',
    price: 32,
    imgUrl: 'img.png',
    description: 'orange pills'
  },
  {
    name: 'dog food',
    price: 56,
    imgUrl: 'img.png',
    description: 'dog food'
  }
]

const orders = [
  {
    orderNumber: 'ewyr9482734',
    orderStatus: 'pending',
    userId: 1
  },
  {
    orderNumber: 'qwer6726736',
    orderStatus: 'complete',
    userId: 2
  },
  {
    orderNumber: 'asdf34123',
    orderStatus: 'pending',
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
    unit_price: 47,
    orderId: 2,
    productId: 1
  },
  {
    quantity: 2,
    unit_price: 6,
    orderId: 2,
    productId: 2
  },
  {
    quantity: 1,
    unit_price: 58,
    orderId: 2,
    productId: 3
  },
  {
    quantity: 1,
    unit_price: 42,
    orderId: 1,
    productId: 1
  },
  {
    quantity: 1,
    unit_price: 55,
    orderId: 1,
    productId: 3
  },
  {
    quantity: 2,
    unit_price: 76,
    orderId: 1,
    productId: 4
  },
  {
    quantity: 3,
    unit_price: 32,
    orderId: 4,
    productId: 5
  },
  {
    quantity: 1,
    unit_price: 56,
    orderId: 4,
    productId: 6
  }
]

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user)
  )).then(() =>
  Promise.all(products.map(product =>
    Product.create(product))
  )).then(() =>
  Promise.all(orders.map(order =>
    Order.create(order))
  )).then(() =>
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


