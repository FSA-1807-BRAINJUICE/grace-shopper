const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderStatus: {
    type: Sequelize.ENUM("pending", "complete", "transaction-failed"),
    defaultValue: "pending"
  },
  sessionId: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Order

// classMethods
Order.generateOrderNumber = function() {
  return crypto.randomBytes(16).toString('base64')
}

// hooks
const setOrderNumber = order => {
  order.orderNumber = Order.generateOrderNumber()
}

Order.beforeCreate(setOrderNumber)
