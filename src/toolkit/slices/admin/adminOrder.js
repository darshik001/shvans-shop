import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL




export const GetAllOrders = createAsyncThunk(
    'adminOrders/GetAllOrders',
    async (_, {rejectWithValue, getState}) => { 
        try {
            const {AccessToken} = getState().adminAuth;
            const resposn = await axios.get(`${APIURL}/admin/order/get`, {headers: {Authorization: `Bearer ${AccessToken}`}})
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const AdminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    isLoading: false,
    ErrMessage:"",
    SuccessMessage:"",
  },
  reducers: {
    // Define reducers here
  },
  extraReducers: (builder) => {
    builder
    .addCase(GetAllOrders.pending,(state)=>{
        state.isLoading = true,
        state.ErrMessage = false,
        state.SuccessMessage = false
    })
    .addCase(GetAllOrders.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.ErrMessage = "",
        state.orders = action.payload.orders
    })
    .addCase(GetAllOrders.rejected,(state,action)=>{
        state.isLoading = false,
        state.ErrMessage = action.payload.message
        state.SuccessMessage = ""
    })
  }
})



export default AdminOrderSlice.reducer


