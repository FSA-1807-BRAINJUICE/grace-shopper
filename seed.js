const db = require('./server/db')
const {User, Product} = require('./server/db/models')

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
    description: 'lemon pills',
    imgUrl: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3449424.jpg"

  },
  {
    id: 2,
    name: 'apple',
    price: 3,
    description: 'apple pills',
    imgUrl: 'https://st2.depositphotos.com/3515029/6763/i/950/depositphotos_67639283-stock-photo-impaired-immunity-apple-with-pills.jpg'
  },
  {
    id: 3,
    name: 'yams',
    price: 55,
    description: 'yams pills',
    imgUrl: 'https://yayyayskitchen.files.wordpress.com/2017/02/scrubbedyams2873_sc.jpg?w=840&h=630'
  },
  {
    id: 4,
    name: 'potato',
    price: 76,
    description: 'potato pills',
    imgUrl: 'https://static.pulse.com.gh/img/incoming/origs6915704/2250484523-w980-h640/potato-peels-for-hair-graying.jpg'
  },
  {
    id: 5,
    name: 'orange',
    price: 32,
    description: 'orange pills',
    imgUrl: 'http://soappotions.com/wp-content/uploads/2017/10/orange.jpg'
  },
  {
    id: 6,
    name: 'dog food',
    price: 56,
    description: 'dog food',
    imgUrl: 'http://dogsaholic.com/wp-content/uploads/2015/04/Dog-supplement-pills.jpg'
  },
  {
    id: 7,
    name: 'Rhodiola',
    price: 45,
    description: 'Rhodiola rosea is a supplement derived from the herb Rhodiola rosea, which is often used in Chinese medicine to promote well-being and healthy brain function.',
    imgUrl: 'https://www.healthline.com/assets/0x1528/hlcmsresource/images/AN_images/rhodiola-rosea-1296x728.jpg'
  }
]

const main = () => {
  console.log('syncing db..')
  db
    .sync({force: true})
    .then(() => {
      console.log('seeding database')
      return Promise.all(users.map(user => User.create(user)))
      .then(() =>
        Promise.all(products.map(product => Product.create(product)))
        .catch(reason => {
          console.log(reason)
        })
      ).catch(reason => {
        console.log(reason)
      });
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
