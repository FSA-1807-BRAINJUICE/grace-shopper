const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT // CHECK AGAIN
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: "default.png" // MAKE SURE YOU ADD TO THE PUBLIC FOLDER
  },
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Product
