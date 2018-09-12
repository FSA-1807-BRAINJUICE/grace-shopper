const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderStatus: {
    type: Sequelize.ENUM("cart", "complete", "transaction-failed")
  }
})

module.exports = Order
