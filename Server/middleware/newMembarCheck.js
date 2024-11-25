const CheckMember = (req,resp,next)=>{
  const body = req.body;
  // checkar
  let emptyField = []
  Object.keys(body).forEach((key)=>{
    if(!body[key]){
      emptyField.push(key)
    }else{
      if(emptyField.includes(key)){
        const index = emptyField.findIndex((el)=> el === key)
        emptyField.splice(index,1)
      }
    }
  })
  if(emptyField.length > 0){
    resp.status(500).json({
      state:false,
      msg:`Can't empty ${emptyField}`
    })
  }else{
    if(body.number.length >= 11){
      if(body.email.includes("@")){
        if(body.password.length >= 6){
          next()
        }else{
          resp.status(500).json({
            state:false,
            msg:`password mast be 6 carectar!`
          })
        }
      }else{
        resp.status(500).json({
          state:false,
          msg:`please provide a valid email`
        })
      }
    }else{
      resp.status(500).json({
        state:false,
        msg:`please provide a valid number`
      })
    }
  }
}

module.exports = CheckMember;