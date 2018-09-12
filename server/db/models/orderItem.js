const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  paidUnitPrice: {
    type: Sequelize.INTEGER // THIS NUMBER IS FIXED AFTER YOUR ORDER
  }
})

module.exports = OrderItem
