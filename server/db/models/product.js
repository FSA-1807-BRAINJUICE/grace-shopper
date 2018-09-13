const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 1000
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: "default.png" // MAKE SURE YOU ADD TO THE PUBLIC FOLDER
    //CG: defaultValue for imgUrl "/assets/default.png"
  },
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Product
