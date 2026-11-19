import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import api from "./axios";
const APIURL = import.meta.env.VITE_API_URL




export const GetAllOrders = createAsyncThunk(
    'adminOrders/GetAllOrders',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const respons = await api.get(`${APIURL}/admin/order/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const AcceptOrders = createAsyncThunk(
    'adminOrder/accept',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const respons = await api.post(`${APIURL}/admin/order/accepte`, { orderIds: data }, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const DownloadLabels = createAsyncThunk(
    'adminOrder/labels',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const respons = await api.post(`${APIURL}/admin/order/labels`, { shipmentIds: data }, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const GetAllRTOAndReturnOrders = createAsyncThunk(
    'adminOrders/GetAllrtoAndReturnOrders',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const respons = await api.get(`${APIURL}/admin/order/rto-return`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const AdminOrderSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        orders: [],
        rtoAndReturn:[],
        label_url:null,
        isLoading: false,
        ErrMessage: "",
        SuccessMessage: "",
    },
    reducers: {
        ClearOrdersmessage: (state) => {
                state.ErrMessage = "",
                state.SuccessMessage = "",
                state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllOrders.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = false,
                    state.SuccessMessage = false
            })
            .addCase(GetAllOrders.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = "",
                    state.orders = action.payload.orders
            })
            .addCase(GetAllOrders.rejected, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = action.payload.message
                state.SuccessMessage = ""
            })

            .addCase(AcceptOrders.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = "",
                    state.SuccessMessage = ""
            })

            .addCase(AcceptOrders.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = "",
                    state.SuccessMessage = action.payload.message,
                    state.orders = action.payload.orders
            })
            .addCase(AcceptOrders.rejected, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = action.payload.message,
                    state.SuccessMessage = ""
            })




            .addCase(DownloadLabels.pending, (state) => {
                    state.isLoading = true,
                    state.label_url = null
                    state.ErrMessage = "",
                    state.SuccessMessage = ""
            })

            .addCase(DownloadLabels.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = "",
                    state.SuccessMessage = action.payload.message,
                    state.orders = action.payload.orders,
                    state.label_url = action.payload.label_url
            })
            .addCase(DownloadLabels.rejected, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = action.payload.message,
                    state.label_url = null
                    state.SuccessMessage = ""
            })



            .addCase(GetAllRTOAndReturnOrders.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = false,
                    state.SuccessMessage = false
            })
            .addCase(GetAllRTOAndReturnOrders.fulfilled, (state, action) => {
                    state.isLoading = false,
                    state.ErrMessage = "",
                    state.rtoAndReturn = action.payload.orders
            })
            .addCase(GetAllRTOAndReturnOrders.rejected, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = action.payload.message
                state.SuccessMessage = ""
            })

    }
})


export const { ClearOrdersmessage } = AdminOrderSlice.actions
export default AdminOrderSlice.reducer


