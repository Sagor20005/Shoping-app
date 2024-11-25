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
            name: response.name
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




module.exports = {
  AddMember,
  findAmember,
}