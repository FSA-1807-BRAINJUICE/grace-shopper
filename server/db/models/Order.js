const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.DataTypes.UUIDV1,
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
