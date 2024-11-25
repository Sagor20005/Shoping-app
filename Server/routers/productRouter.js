const Express = require("express")
const router = Express.Router()
const {addProduct,getAllProduct,createCart} = require("../Controlar/productControlar")


//middelwares
const addProductCheck = require("../middleware/addProduct.check")




router.post("/",addProductCheck,addProduct)
router.get("/",getAllProduct)
// create new cart
router.post("/cart/",createCart)


module.exports = router