const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
    //CG: Suggest using notEmpty: true.
  },
  price: {
    type: Sequelize.FLOAT // CHECK AGAIN
  }, //CG: Recommend being an integer.
  //CG: Minimum price that something can be maybe 0? 
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
