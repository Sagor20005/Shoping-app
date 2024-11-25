const ImageKit = require("../utilities/imagekit.upload")
const productColl = require("../database/models/productModel")

const cartColl = require("../database/models/cartModel")

const addProduct = (req, resp)=> {
  const file = req.files ? req.files.file: null
  const body = req.body
  
  // upload image 
  if(file){
  ImageKit.upload({
    file: file.data,
    fileName: Date.now()+file.name,
  }).then(response => {
    // create product obj 
    const product = new productColl({
        name: body.name,
        price: body.price,
        discription: body.discription,
        returnDays: body.returnDays,
        warranty: body.warranty,
        type: body.type,
        sellar: {
          id: body.sellarId,
          name: body.sellarName
        },
        image: {
          url: response.url,
          fileId: response.fileId
        }
      })
      // save data 
      product.save()
      .then((result)=>{
        if (result && result._id) {
          console.log(result)
          resp.status(200).json({
            state: true,
          })
        } else {
          resp.status(200).json({
            state: false,
            msg: "server error!"
          })
        }
      })
      .catch((err)=>{
        console.log(err)
        resp.status(200).json({
          state: false,
          msg: err.message
        })
      })
      
    
  })
  .catch((err)=>{
    console.log(err)
  })
}else{
  resp.status(500).json({
    state:false,
    msg:"must select an image"
  })
}
}


// Getting all product
const getAllProduct = async (req,resp)=>{
  try{
    let result = await productColl.find({})
    resp.send(result)
  }catch(err){
    console.log(err)
  }
}


// new cart creator controlar
const createCart = async (req,resp)=>{
  try{
    // cheak alrady exist or not 
    const isExist = await cartColl.findOne({
      productId: req.body.productId,
      castumarId: req.body.castumarId
    })
    // if not exist to save cart 
    if(!isExist){
      const cart = new cartColl(req.body)
      const savedCart = await cart.save()
      if(savedCart && savedCart._id){
        resp.status(500).json({
          state:true
        })
      }else{
        resp.status(500).json({
          state:false,
          msg:"Can't save!"
        })
      }
    }else{
      resp.status(500).json({
        state:false,
        msg:"Aleady added!"
      })
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:err.message
    })
  }
}



module.exports = {
  addProduct,
  getAllProduct,
  createCart
}