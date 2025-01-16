const mongoose = require("mongoose")


const membersSchema = mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  number:{
    type:String,
    required:true,
    unique: true
  },
  password:{
    type:String,
    required:true
  },
  isSellar:{
    type:Boolean
  },
  address:[]
},{timestamps:true})

const membersModel = mongoose.model("member",membersSchema)

module.exports = membersModel;