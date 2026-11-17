import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL

export const GetReview = createAsyncThunk(
    "review/get",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().userAuth;
            const resposn = await axios.get(`${APIURL}/user/review/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }

    }

)

export const CreatReview = createAsyncThunk(
    "review/create",
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().userAuth;
            const resposn = await axios.post(`${APIURL}/user/review/create`, data, { headers: { Authorization: `Bearer ${AccessToken}` } })
            console.log(resposn)
            return resposn.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }

    }

)

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        isLoading: false,
        errMessage: "",
        successMessage: "",
    },

    extraReducers: (builder) => {
        builder
            .addCase(GetReview.pending, (state) => {
                state.isLoading = true
                state.errMessage = ""
                state.successMessage = ""
            })
            .addCase(GetReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = ""
                state.reviews = action.payload.reviews
            })
            .addCase(GetReview.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload.message
                state.successMessage = ""
            })

            .addCase(CreatReview.pending, (state) => {
                state.isLoading = true
                state.errMessage = ""
                state.successMessage = ""
            })
            .addCase(CreatReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = ""
                state.reviews = action.payload.reviews
            })
            .addCase(CreatReview.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload.message
                state.successMessage = ""
            })
    }

})


export default reviewSlice.reducer;
