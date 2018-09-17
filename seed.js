const db = require('./server/db')
const {User, Order, OrderItem, Product} = require('./server/db/models')

const users = [
  {
    id: 1,
    email: 'hanseok87@gmail.com',
    password: 'yqiypo',
    address: '300 E 33rd St',
    admin: true,
    payment: 12334,
    guest: false
  },
  {
    id: 2,
    email: 'andy@gmail.com',
    password: '123701',
    address: '400 W 44th St',
    admin: true,
    payment: 35975,
    guest: false
  },
  {
    id: 3,
    email: 'mina@gmail.com',
    password: '80909',
    address: '100 E 13th St',
    admin: false,
    payment: 70707,
    guest: false
  },
  {
    id: 4,
    email: 'ryan@gmail.com',
    password: 'asdflk50',
    address: '44 Wall St',
    admin: false,
    payment: 30080,
    guest: true
  }
]

const products = [
  {
    id: 1,
    name: 'lemon',
    price: 44,
    description: 'lemon pills'
  },
  {
    id: 2,
    name: 'apple',
    price: 3,
    description: 'apple pills'
  },
  {
    id: 3,
    name: 'yams',
    price: 55,
    description: 'yams pills'
  },
  {
    id: 4,
    name: 'potato',
    price: 76,
    description: 'potato pills'
  },
  {
    id: 5,
    name: 'orange',
    price: 32,
    description: 'orange pills'
  },
  {
    id: 6,
    name: 'dog food',
    price: 56,
    description: 'dog food'
  }
]

const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() =>
    Promise.all(products.map(product => Product.create(product)))
  )

const main = () => {
  console.log('syncing db..')
  db
    .sync({force: true})
    .then(() => {
      console.log('seeding database')
      return seed()
    })
    .then(() => {
      db.close()
      return null
    })
    .catch(err => {
      console.log('error while seeding')
      console.log(err.stack)
    })
}

main()

module.exports = main
