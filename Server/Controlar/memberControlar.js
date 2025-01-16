const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

// database collection
const memberColl = require("../database/models/membersModel")


// all controlars 

// new member
const AddMember = async (req,resp)=>{
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const member = new memberColl(req.body)
  try{
    const response = await member.save()
    if(response && response._id){
      const tokenData = {
        name:response.name,
        email:response.email,
        id: response._id,
        isSellar:response.isSellar
      }
      const jwtToken = jwt.sign(tokenData,`${process.env.SECRATE}`, { expiresIn: '2h' });
      // finally response
      resp.status(200).json({
        state:true,
        jwtToken,
        isSellar:{
          isSellar:response.isSellar,
          _id: response._id,
          name: response.name
        }
      })
    }else{
      resp.status(500).json({
        state:false,
        msg:"Can't save!"
      })
    }
  }catch(err){
    console.log(err)
    resp.status(500).json({
      state:false,
      msg:err.message
    })
  }
}



// find by username && password 
const findAmember = async (req,resp)=>{
  let data = {}
  Object.keys(req.userData).map((key)=>{
    if(key ==="number" || key === "email"){
      data[key] = req.userData[key]
    }
  })
  if(data){
    try{
      const response = await memberColl.findOne(data)
      if(response && response._id && bcrypt.compareSync(req.userData.password, response.password) ){
        const tokenData = {
          name:response.name,
          email:response.email,
          id: response._id,
          isSellar:response.isSellar
        }
        const jwtToken = jwt.sign(tokenData,`${process.env.SECRATE}`, { expiresIn: '2h' });
        // sent response
        resp.status(200).json({
          state:true,
          jwtToken,
          isSellar: {
            isSellar: response.isSellar,
            _id: response._id,
            name: response.name,
            addressBook:response.address
          }
        })
      }else{
        resp.status(500).json({
          state:false,
          msg:"Wrong username & password!"
        })
      }
    }catch(err){
      resp.status(500).json({
        state:false,
        msg:"server error!"
      })
    }
  }
}

/// handleAddress
const handleAddress = async (req,resp)=>{
  try{
    const Id = req.body.id
    const address = req.body.address
    console.log(Id,address)
    const member = await memberColl.findOne({_id:Id})
    if(member){
      member.address.push(address)
      const saved = await member.save()
      if(saved){
        resp.status(200).json({
          state:true,
          address:member.address
        })
      }
    }
  }catch(err){
    console.log(err)
  }
}

const addressDelete = async (req,resp)=>{
  try{
    const id = req.body.id
    const addressId = req.body.address
    const member = await memberColl.findOne({_id:id})
    if(member){
      const index = member.address.findIndex((addr)=> addr._id === addressId)
      member.address.splice(index,1)
      const saved = await member.save()
      if(saved){
        resp.status(200).json({
          state:true,
          address:member.address
        })
      }
    }
  }catch(err){
    console.log(err)
  }
}


module.exports = {
  AddMember,
  findAmember,
  handleAddress,
  addressDelete
}