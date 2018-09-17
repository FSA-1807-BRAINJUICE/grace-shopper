const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.DataTypes.UUIDV1
  },
  orderStatus: {
    type: Sequelize.ENUM('pending', 'complete', 'transaction-failed'),
    defaultValue: 'pending'
  },
  sessionId: {
    type: Sequelize.STRING,
    allowNull: true
  }
  // name: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // streetAddress: {
  //   type:Sequelize.STRING,
  //   allowNull: true
  // },
  // city: {
  //   type:Sequelize.STRING,
  //   allowNull: true
  // },
  // region: {
  //   type:Sequelize.STRING,
  //   allowNull: true
  // },
  // postal: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // phone: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // }
})

module.exports = Order
