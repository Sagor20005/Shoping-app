const ImageKit = require("../utilities/imagekit.upload")
const productColl = require("../database/models/productModel")

const cartColl = require("../database/models/cartModel")
const orderColl = require("../database/models/orderModel")

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

//get a product
const getProduct = async (req,resp)=>{
  try{
    const id = req.params.id
    const result = await productColl.findOne({_id:id})
    if(result){
      resp.status(200).json({
        state:true,
        data: result
      })
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:"Server error!"
    })
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


// Get all carts
const getAllCart = async (req,resp)=>{
  try{
    const id = req.params.id;
    const carts = await cartColl.find({castumarId: id})
    console.log(carts)
    if(carts && carts.length > 0){
      resp.send(carts)
    }
  }catch(err){
    resp.send(err)
  }
}

// handle cart quantity
const QuantityHandle = async (req,resp)=>{
  let quantity = req.body.quantity;
  const id = req.body.id;
  const action = req.body.action;
  try{
    if(action === "increase"){
      const update = await cartColl.findOneAndUpdate({_id:id},{quantity:++quantity})
      if(update && update._id){
        resp.status(200).json({state:true})
      }
    }else if(action === "decrease"){
      if(quantity > 0){
        const update = await cartColl.findOneAndUpdate({_id:id},{quantity:--quantity})
        if(update && update._id){
          resp.status(200).json({state:true})
        }
      }
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:err.message
    })
  }
}

// delete a cart 
const DeleteCart = async (req,resp)=>{
  const id = req.body.id;
  try{
    const result = await cartColl.findOneAndDelete({_id:id})
    if(result && result._id){
      console.log(result)
      resp.status(200).json({
        state:true,
      })
    }else{
     resp.status(500).json({
      state:false,
      msg:"Can't delete!"
    }) 
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:err.message
    })
  }
}


// PlaceOrder
const PlaceOrder = async (req,resp)=>{
  const order = req.body;
  try{
    const newOrder = new orderColl(order)
    const saved = await newOrder.save()
    if(saved && saved._id){
      resp.status(500).json({
        state:true
      })
    }else{
      resp.status(500).json({
        state:false,
        msg:"can't save!"
      })
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:err.message
    })
  }
}

// get all order 
const OrderList = async (req,resp)=>{
  const id = req.params.id;
  try{
    if(id){
      const orders = await orderColl.find({"castumar.id":id})
      if(orders && orders.length > 0){
        resp.status(500).json({
          state:true,
          data:orders
        })
      }else{
        resp.status(500).json({
          state:false,
          msg:"You have 0 order!"
        })
      }
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
  createCart,
  getAllCart,
  getProduct,
  QuantityHandle,
  DeleteCart,
  PlaceOrder,
  OrderList
}