const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderStatus: {
    //CG: Pending may not be the best naming convention here. Also may want default value to be cart.
    type: Sequelize.ENUM("pending", "complete", "transaction-failed")
  }
})

module.exports = Order
