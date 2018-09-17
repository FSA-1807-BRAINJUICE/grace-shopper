const User = require('./User')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Product = require('./Product')

Order.belongsTo(User)
Order.belongsToMany(Product, {through: OrderItem})
Order.hasMany(OrderItem)
OrderItem.belongsTo(Product)

//CG: Order.getProducts()

module.exports = {
  User,
  Order,
  OrderItem,
  Product
}
