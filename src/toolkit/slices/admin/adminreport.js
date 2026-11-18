import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
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
    async (period, { rejectWithValue }) => {
        try {

            const filter = period ? `?period=${period}` : ""
            const resposn = await axios.get(`${APIURL}/admin/report/dashboard${filter}`,)
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

const reportSlice = createSlice({
    name: 'products',
    initialState: {
        dashboardData: initiatdashboard,
        isLoading: false,
        errMessage: "",
        successMessage: "",
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
    }

})


export default reportSlice.reducer;
