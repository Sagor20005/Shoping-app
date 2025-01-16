const Express = require("express")
const router = Express.Router()
const {addProduct,getAllProduct,createCart, getAllCart, getProduct, QuantityHandle, DeleteCart, PlaceOrder, OrderList } = require("../Controlar/productControlar")


//middelwares
const addProductCheck = require("../middleware/addProduct.check")



// add new product
router.post("/",addProductCheck,addProduct)
// get all product
router.get("/",getAllProduct)
// get a product 
router.get("/get/:id",getProduct)
// create new cart
router.post("/cart/",createCart)
// get a cart
router.get("/cart/:id",getAllCart)
// cart QuantityHandle
router.put("/cart",QuantityHandle)
// cart delete
router.delete("/cart",DeleteCart)
// order new
router.post("/order",PlaceOrder)
// order list 
router.get("/order/:id",OrderList)


module.exports = router