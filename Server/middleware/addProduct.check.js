const addProductCheck = (req,resp,next)=>{
  const file = req.files ? req.files.file : null
  console.log(req.files)
  const {name, price, discription, warranty, returnDays, type, sellarId, sellarName} = req.body
  
  // contition
  if(name && price){
    if(discription && warranty){
      if(returnDays && type){
        if(sellarId && sellarName){
          next()
        }else{
          resp.status(500).json({
            state:false,
            msg:"Can't empty sellarId & sellarName"
          })
        }
      }else{
        resp.status(500).json({
          state:false,
          msg:"Can't empty returnDays & type"
        })
      }
    }else{
      resp.status(500).json({
      state:false,
      msg:"Can't empty discription & warranty"
    })
    }
  }else{
    resp.status(500).json({
      state:false,
      msg:"Can't empty name & price"
    })
  }
  
}

module.exports = addProductCheck;