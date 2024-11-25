const memberColl = require("../database/models/membersModel")

const allradyHaveAnAccount = async (req,resp,next)=>{
  const email = req.body.email
  const number = req.body.number
  
  try{
    // check email && number
    const isEmail = await memberColl.findOne({email})
    const isNumber = await memberColl.findOne({number})
    if(isNumber || isEmail){
      resp.status(500).json({
        state:false,
        msg:"Alrady Have an Account!"
      })
    }else{
      next()
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:err.message
    })
  }
  
}
module.exports = allradyHaveAnAccount;