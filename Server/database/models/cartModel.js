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
  },
  productPrice:{
    type:Number,
    required : true
  },
  quantity:{
    type:Number,
    default : 0
  }
},{timestamps:true})

const cartModel = mongoose.model("cart",cartSchema)

module.exports = cartModel