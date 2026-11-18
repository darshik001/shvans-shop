import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL

export const GetAllcategories = createAsyncThunk(
    "common/categories",
    async (_, { rejectWithValue }) => {
        try {
            const respons = await axios.get(`${APIURL}/user/product/categories`,)
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

export const GetAnnouncement = createAsyncThunk(
    "common/announcements",
    async (_, { rejectWithValue }) => {
        try {
            const respons = await axios.get(`${APIURL}/user/common/announc`)
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

export const GetBanner = createAsyncThunk(
    "common/banner",
    async (_, { rejectWithValue }) => {
        try {
            const respons = await axios.get(`${APIURL}/user/common/banner`)
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

export const SentInquiry = createAsyncThunk(
    "common/inquiry",
    async (data, { rejectWithValue }) => {
        try {
            const respons = await axios.post(`${APIURL}/user/common/inquiry`, data)
            return respons.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        categories: [],
        announcement: [],
        banners: [],
        isLoading: false,
        errMessage: "",
        successMessage: ""
    },

    extraReducers: (builder) => {
        builder
            .addCase(GetAllcategories.pending, (state) => {
                state.isLoading = true

            })
            .addCase(GetAllcategories.fulfilled, (state, action) => {
                state.isLoading = false

                state.categories = action.payload.categories
            })
            .addCase(GetAllcategories.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(GetAnnouncement.pending, (state) => {
                state.isLoading = true

            })
            .addCase(GetAnnouncement.fulfilled, (state, action) => {
                state.isLoading = false

                state.announcement = action.payload.announcements
            })
            .addCase(GetAnnouncement.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(GetBanner.pending, (state) => {
                state.isLoading = true

            })
            .addCase(GetBanner.fulfilled, (state, action) => {
                state.isLoading = false

                state.banners = action.payload.banners
            })
            .addCase(GetBanner.rejected, (state, action) => {
                state.isLoading = false
            })


            .addCase(SentInquiry.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.ssuccessMesage = ""


            })
            .addCase(SentInquiry.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.successMessage = action.payload.message
            })
            .addCase(SentInquiry.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message

            })
    }

})


export default commonSlice.reducer;
