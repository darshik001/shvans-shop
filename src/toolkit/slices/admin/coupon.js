import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const APIURL = import.meta.env.VITE_API_URL


export const GetAllCoupons = createAsyncThunk(
    'coupon/GetAllCoupons',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.get(`${APIURL}/admin/coupon/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const AddNewCoupone = createAsyncThunk(
    'coupon/AddNewCoupone',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.post(`${APIURL}/admin/coupon/add`, data, { headers: { Authorization: `Bearer ${AccessToken}` } })

            return resposn.data

        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

export const UpdateCoupone = createAsyncThunk(
    'coupon/UpdateCoupone',
    async (data, { rejectWithValue, getState }) => {
        try {
            console.log("slice data", data)
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.patch(`${APIURL}/admin/coupon/update/${data._id}`, data, { headers: { Authorization: `Bearer ${AccessToken}` } })

            return resposn.data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

export const DeleteCoupone = createAsyncThunk(
    'coupon/DeleteCoupone',
    async (id, { rejectWithValue, getState }) => {

        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.delete(`${APIURL}/admin/coupon/delete/${id}`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)





const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        coupons: [],
        success: false,
        isLoading: false,
        ErrMeesage: "",
        SuccessMessage: "",
    },

    reducers: {
        clearCouponMessages: (state) => {
            state.ErrMeesage = "";
            state.SuccessMessage = "";
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCoupons.pending, (state) => {
                state.isLoading = true;
                state.ErrMeesage = "";
                state.SuccessMessage = "";
            })
            .addCase(GetAllCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coupons = action.payload.coupons;
                state.ErrMeesage = "";
            })
            .addCase(GetAllCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.ErrMeesage = action.payload.message;
                state.SuccessMessage = "";
            })

            .addCase(AddNewCoupone.pending, (state) => {
                state.isLoading = true;
                state.success = false,
                    state.ErrMeesage = "";
                state.SuccessMessage = "";
            })
            .addCase(AddNewCoupone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true,
                    state.SuccessMessage = action.payload.message;
                state.coupons = [action.payload.coupon, ...state.coupons];
                state.ErrMeesage = "";
            })
            .addCase(AddNewCoupone.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false,
                    state.ErrMeesage = action.payload.message;
                state.SuccessMessage = "";
            })

            .addCase(UpdateCoupone.pending, (state) => {
                state.isLoading = true;
                state.success = false,
                    state.ErrMeesage = "";
                state.SuccessMessage = "";
            })
            .addCase(UpdateCoupone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true,
                    state.SuccessMessage = action.payload.message;
                state.coupons = state.coupons.map((coupon) => coupon._id === action.payload.coupon._id ? action.payload.coupon : coupon);
                state.ErrMeesage = "";
            })
            .addCase(UpdateCoupone.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false,
                    state.ErrMeesage = action.payload.message;
                state.SuccessMessage = "";
            })

            .addCase(DeleteCoupone.pending, (state) => {
                state.isLoading = true;
                state.success = false,
                    state.ErrMeesage = "";
                state.SuccessMessage = "";
            })
            .addCase(DeleteCoupone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true,
                    state.SuccessMessage = action.payload.message;
                state.coupons = state.coupons.filter((coupon) => coupon._id !== action.payload.coupon._id);
                state.ErrMeesage = "";
            })
            .addCase(DeleteCoupone.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false,
                    state.ErrMeesage = action.payload.message;
                state.SuccessMessage = "";
            })
    }

})


export const { clearCouponMessages } = couponSlice.actions

export default couponSlice.reducer