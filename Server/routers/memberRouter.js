const Express = require("express")
const router = Express.Router()

// middleware
const CheckMember = require("../middleware/newMembarCheck")
const alradyHaveAccount = require("../middleware/allradyHaveAccount")
const checkMemberLogin = require("../middleware/member/checkMemberLogin")

const {AddMember, findAmember, handleAddress, addressDelete} = require("../Controlar/memberControlar")

// add nee member
router.post("/",CheckMember, alradyHaveAccount, AddMember)
// find by username & password
router.get("/:username/:password",checkMemberLogin,findAmember)
router.post("/address",handleAddress)
router.delete("/address",addressDelete)




module.exports = router