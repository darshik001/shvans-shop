import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import api from './axios';
const APIURL = import.meta.env.VITE_API_URL

const initiatdashboard = {
    success: true,
    period: "week",

    stats: {
        totalRevenue: 0,
        revenueChange: 0,
        totalOrders: 0,
        ordersChange: 0,
        totalProducts: 0,
        productsChange: 0,
        totalCustomers: 0,
        customersChange: 0,
    },

    comparison: {
        currentRevenue: 0,
        previousRevenue: 0,
        currentOrders: 0,
        previousOrders: 0,
    },

    orderSummary: {
        completedOrders: 0,
        processingOrders: 0,
        pendingOrders: 0,
        total: 0,
    },

    recentOrders: [

    ],

    topProducts: [

    ],

    chartData: [
        { day: "Mon", value: 0 },
        { day: "Tue", value: 0 },
        { day: "Wed", value: 0 },
        { day: "Thu", value: 0 },
        { day: "Fri", value: 0 },
        { day: "Sat", value: 0 },
        { day: "Sun", value: 0 },
    ],
};
export const GetDashboardReposrt = createAsyncThunk(
    "report/dashboard",
    async (period, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;

            const filter = period ? `?period=${period}` : ""
            const respons = await api.get(`${APIURL}/admin/report/dashboard${filter}`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

export const GetInquiryes = createAsyncThunk(
    "report/inquiry",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const respons = await api.get(`${APIURL}/admin/report/inquiry`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)


export const UpdateInquiryes = createAsyncThunk(
    "report/inquiry/update",
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const respons = await api.patch(`${APIURL}/admin/report/inquiry/update/${data._id}`, { status: data.status }, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const reportSlice = createSlice({
    name: 'products',
    initialState: {
        dashboardData: initiatdashboard,
        inquiryes: [],
        isLoading: false,
        errMessage: "",
        successMessage: "",
    },
    reducers: {
        ClearRepostmessage: (state) => {
            state.errMessage = "",
                state.successMessage = "",
                state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetDashboardReposrt.pending, (state) => {
                state.isLoading = true
                state.errMessage = ""
                state.successMessage = ""
            })
            .addCase(GetDashboardReposrt.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = ""
                state.dashboardData = action.payload.dashboardData
            })
            .addCase(GetDashboardReposrt.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload.message
                state.successMessage = ""
            })


            .addCase(GetInquiryes.pending, (state) => {
                state.isLoading = true
                state.errMessage = ""
                state.successMessage = ""
            })
            .addCase(GetInquiryes.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = ""
                state.inquiryes = action.payload.inquiryes
            })
            .addCase(GetInquiryes.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload.message
                state.successMessage = ""
            })


            .addCase(UpdateInquiryes.pending, (state) => {
                state.isLoading = true
                state.errMessage = ""
                state.successMessage = ""
            })
            .addCase(UpdateInquiryes.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = ""
                state.successMessage = action.payload.message
                state.inquiryes = state.inquiryes.map((item) => item._id === action.payload.inquiry._id ? action.payload.inquiry : item);
            })
            .addCase(UpdateInquiryes.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload.message
                state.successMessage = ""
            })
    }

})

export const { ClearRepostmessage } = reportSlice.actions

export default reportSlice.reducer;
