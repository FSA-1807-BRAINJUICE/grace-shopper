const User = require('./user')
const Order = require('./order')
const OrderItem = require('./orderItem')
const Product = require('./product')

Order.belongsTo(User)
// OrderItem.belongsTo(Order)
// OrderItem.belongsTo(Product)

Order.belongsTo(Product, {through: OrderItem});
Product.belongsTo(Order, {through: OrderItem});
//CG: Order.getProducts()

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  OrderItem,
  Product
}
