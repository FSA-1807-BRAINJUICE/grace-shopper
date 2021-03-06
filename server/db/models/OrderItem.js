const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  paidUnitPrice: {
    type: Sequelize.INTEGER, // THIS NUMBER IS FIXED AFTER YOUR ORDER
    defaultValue: null
  }
})

module.exports = OrderItem
