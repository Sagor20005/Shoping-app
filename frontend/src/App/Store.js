import {configureStore} from "@reduxjs/toolkit"
import productReducer from "../Feature/Product/ProductSlice"

const Store = configureStore({
  reducer:{
    product:productReducer
  }
})
export default Store