import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL




export const GetUserOrders = createAsyncThunk(
    'userOrders/GetOrders',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().userAuth;
            const respons = await axios.get(`${APIURL}/user/order/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const CanceleOrder = createAsyncThunk(
    'userOrders/cancele',
    async (orderId, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().userAuth;
            const respons = await axios.post(`${APIURL}/user/order/canele-order/${orderId}`, {}, { headers: { Authorization: `Bearer ${AccessToken}` } })
            console.log(respons.data)
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const ReturnOrder = createAsyncThunk(
    'userOrders/return',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().userAuth;
            console.log(data)
            const respons = await axios.post(`${APIURL}/user/order/return/${data._id}`, { bankDetails: data.bankDetails, reason: data.reason }, { headers: { Authorization: `Bearer ${AccessToken}` } })
            console.log(respons.data)
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)






const userOrderSlice = createSlice({
    name: 'userOrders',
    initialState: {
        orders: [],
        isLoading: false,
        ErrMessage: "",
        SuccessMessage: "",
    },
    reducers: {
        ClearUserOrdersmessage: (state) => {
            state.ErrMessage = "",
                state.SuccessMessage = "",
                state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUserOrders.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = false,
                    state.SuccessMessage = false
            })
            .addCase(GetUserOrders.fulfilled, (state, action) => {

                state.isLoading = false,
                    state.ErrMessage = "",
                    state.orders = action.payload.orders
            })
            .addCase(GetUserOrders.rejected, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = action.payload.message
                state.SuccessMessage = ""
            })

            .addCase(CanceleOrder.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = false,
                    state.SuccessMessage = false
            })
            .addCase(CanceleOrder.fulfilled, (state, action) => {

                state.isLoading = false,
                    state.ErrMessage = "",
                    state.orders = state.orders = state.orders.map((order) => order._id === action.payload.order._id ? action.payload.order : order);
            })
            .addCase(CanceleOrder.rejected, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = action.payload.message
                state.SuccessMessage = ""
            })


            .addCase(ReturnOrder.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = false,
                    state.SuccessMessage = false
            })
            .addCase(ReturnOrder.fulfilled, (state, action) => {

                state.isLoading = false,
                    state.ErrMessage = "",
                    state.SuccessMessage = action.payload.message
                state.orders = state.orders = state.orders.map((order) => order._id === action.payload.order._id ? action.payload.order : order);
            })
            .addCase(ReturnOrder.rejected, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = action.payload.message
                state.SuccessMessage = ""
            })
    }
})


export const { ClearUserOrdersmessage } = userOrderSlice.actions
export default userOrderSlice.reducer


