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
    imgUrl: 'https://thumbs.dreamstime.com/z/lemon-pill-9010031.jpg',
    description: 'lemon pills, more energy than apple pills but less energy than yams pills'
  },
  {
    name: 'apple',
    price: 3,
    imgUrl: 'https://thumbs.dreamstime.com/b/apple-pills-22923115.jpg',
    description: 'apple pills, not as good as yams pills'
  },
  {
    name: 'yams',
    price: 55,
    imgUrl: 'https://images.media-allrecipes.com/images/77515.jpg?width=420&height=237',
    description: 'yams are king of crops, and by extention yams pills are king of pills'
  },
  {
    name: 'potato',
    price: 76,
    imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81TJK4QAa2L._SY355_.jpg',
    description: 'potato pills, similar to yams pills but contain more water'
  },
  {
    name: 'orange',
    price: 32,
    imgUrl: 'https://previews.123rf.com/images/dacky/dacky0803/dacky080300010/2851230-orange-pills.jpg',
    description: 'orange pills, a follow on the success of lemon pills but with less juice'
  },
  {
    name: 'dog pills',
    price: 56,
    imgUrl: 'https://cf.ltkcdn.net/dogs/images/std/183989-425x279-giving-dog-pill.jpg',
    description: 'with the success of pills for humans, we now recommend you give the same pills to your pet dog'
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


