//const bcrypt = require("bcryptjs")

const checkMemberLogin = (req,resp,next)=>{
  const username = req.params.username
  const password = req.params.password
  
  const numberArray = ["1","2","3","4","5","6","7","8","9","0"]
  const abcArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
  // checkar
  let userData = {}
  if(username && password){
    if(username.length >= 11 ){
      if (password.length >= 6){
        userData.password = password
        // cheak username email or number 
        if(numberArray.some( (num)=> username.includes(num) ) && !abcArray.some((ltr)=> username.includes(ltr)) ){
          // username is a number
          userData.number = username
          req.userData = userData
          next()
        }else if(abcArray.some((ltr)=> username.includes(ltr))){
          // username is a email
          if(username.includes("@")){
            userData.email = username;
            req.userData = userData;
            next()
          }else{
            resp.status(500).json({
              state:false,
              errorFields:{
                username:"please provide a valid email!"
              }
            })
          }
        }else{
          resp.status(500).json({
          state:false,
          errorFields:{
            password:"provide a valid password!",
            username: "provide a valid username!"
          }
        })
        }
        
      }else{
        resp.status(500).json({
          state:false,
          errorFields:{
            password:"password must be 6 carectar!"
          }
        })
      }
    }else{
      resp.status(500).json({
        state:false,
        errorFields:{
          username:"Username must be 11 carectar!"
        }
      })
    }
  }else{
    resp.status(500).json({
        state:false,
        errorFields:{
          username:"Username required!",
          password: "Password required!"
        }
    })
  }
  
}
module.exports = checkMemberLogin;