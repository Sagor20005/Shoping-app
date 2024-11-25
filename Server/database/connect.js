const mongoose = require("mongoose");

mongoose.connect(`${process.env.DATABASE_URL}${process.env.APP_NAME}`)
.then(()=>console.log("Database connected..."))
.catch(()=>console.log("Database can't connect may no neteork.."))