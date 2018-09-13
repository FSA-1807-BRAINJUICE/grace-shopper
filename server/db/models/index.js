const User = require('./User.js')
const Order = require('./Order.js')
const OrderItem = require('./OrderItem.js')
const Product = require('./Product.js')

Order.belongsTo(User)
Order.belongsToMany(Product, {through: OrderItem});
//CG: Order.getProducts()

module.exports = {
  User,
  Order,
  OrderItem,
  Product
}
