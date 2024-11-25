const mongoose = require("mongoose");

// sellar detiels child schema
const sellarSchema =  mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  name:{
    type:String
  }
})

// product image schema child of product schema
const ImageSchema =  mongoose.Schema({
  url:{
    type:String
  },
  fileId:{
    type:String
  }
})
// product schema
const productSchema =  mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  discription:{
    type:String,
  },
  warranty:{
    type:Boolean
  },
  returnDays:{
    type:String
  },
  sellar:sellarSchema,
  comments:{
    type:Number,
    default:0
  },
  image:ImageSchema
})

const productModel = mongoose.model("product",productSchema)
module.exports = productModel;