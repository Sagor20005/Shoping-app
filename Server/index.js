const Express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const fileUpload = require('express-fileupload');
const productRouter = require("./routers/productRouter")
const memberRouter = require("./routers/memberRouter")


// initilaize app
const App = Express()

// environment varuable cinfiguration
dotenv.config()


// database connection
require ("./database/connect")
// parser 
App.use(cors())
App.use(Express.json())
// App.use(Express.urlencoded({extended:true}))
App.use(fileUpload({
    createParentPath: true
}));

// router setup
App.use("/product",productRouter)
App.use("/member",memberRouter)

// listenar
App.listen(process.env.PORT,()=> console.log(`App started at port: ${process.env.PORT}`))