const {db} = require('./server/db')
const {User, Order, OrderItem, Product} = require('./server/db/models')

const users = [{
  email: 'hanseok87@gmail.com',
  password: 'yqiypo',
  address: '300 E 33rd St',
  admin : true,
  payment: 1230912730,
  guest: false
}, {
  email: 'andy@gmail.com',
  password: '123701',
  address: '400 W 44th St',
  admin : true,
  payment: 359759702,
  guest: false
}, {
  email: 'mina@gmail.com',
  password: '80909',
  address: '100 E 13th St',
  admin : false,
  payment: 7070708080,
  guest: false
}, {
  email: 'ryan@gmail.com',
  password: 'asdflk50',
  address: '44 Wall St',
  admin : false,
  payment: 300802909,
  guest: true
}]
