const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  unit_price: {
    type: Sequelize.FLOAT // THIS NUMBER IS FIXED AFTER YOUR ORDER
  }
})

module.exports = OrderItem
