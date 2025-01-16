const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  product:{
    type:Object
  },
  castumar:{
    type:Object
  }
})

const orderModel = mongoose.model("order",orderSchema)
module.exports = orderModel;