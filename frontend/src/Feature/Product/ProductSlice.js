import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
  products:[],
  error:null,
  isError:false,
  isLodding:false
}

export const getProducts = createAsyncThunk("product/getProducts",async ()=>{
    let result = await fetch(`${process.env.REACT_APP_API_URL}/product`)
    result = await result.json()
    return result
})

const productSlice = createSlice({
  name:"product",
  initialState,
  extraReducers:(builder)=>{
    builder
      .addCase(getProducts.pending,(state)=>{
        state.isLodding = true
      })
      .addCase(getProducts.fulfilled,(state,action)=>{
        state.isLodding = false;
        state.products = action.payload
      })
      .addCase(getProducts.rejected,(state,action)=>{
        state.isLodding = false
        state.isError = true
        state.error = action.error.message
      })
  }
})

export default productSlice.reducer
