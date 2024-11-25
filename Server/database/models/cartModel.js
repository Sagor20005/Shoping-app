const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
  productName:{
    type:String,
  },
  productImage:{
    type:String
  },
  productId:{
    type:String,
    required:true
  },
  castumarId:{
    type:String,
    required:true
  }
},{timestamps:true})

const cartModel = mongoose.model("cart",cartSchema)

module.exports = cartModel