import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
  carts:[],
  isError:false,
  isLodding:false,
  error:null
}
const lsData = JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))
const userId = lsData ? lsData._id : null

export const getCarts = createAsyncThunk("cart/getCarts",async function(){
    if(userId){
      let result = await fetch(`${process.env.REACT_APP_API_URL}/product/cart/${userId}`)
      result = await result.json()
      return result
    }
})

const CartSlice = createSlice({
  name:"cart",
  initialState,
  extraReducers : (builder)=>{
    builder
      .addCase(getCarts.pending,(state)=>{
        state.isLodding = true;
      })
      .addCase(getCarts.fulfilled,(state,action)=>{
        state.isLodding = false;
        state.carts = action.payload;
      })
      .addCase(getCarts.rejected,(state,action)=>{
        state.isLodding = false;
        state.isError = true;
        state.error = action.error.message
      })
  },
  reducers : {
    incriment(state,action){
      const id = action.payload
      const index = state.carts.findIndex((cart)=> cart._id === id)
      state.carts[index].quantity++
    },
    dicrement(state,action){
      const id = action.payload
      const index = state.carts.findIndex((cart)=> cart._id === id)
      state.carts[index].quantity--
    },
    deleteACart(state,action){
      const id = action.payload
      const index = state.carts.findIndex((cart)=> cart._id === id)
      state.carts.splice(index,1)
    }
  }
})
export default CartSlice.reducer
export const { incriment, dicrement, deleteACart } = CartSlice.actions