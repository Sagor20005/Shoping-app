import {configureStore} from "@reduxjs/toolkit"
import productReducer from "../Feature/Product/ProductSlice"
import CartReducer from "../Feature/Product/CartSlice"

const Store = configureStore({
  reducer:{
    product:productReducer,
    cart: CartReducer
  }
})
export default Store