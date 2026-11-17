import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL

export const GetAllcategories = createAsyncThunk(
    "common/categories",
    async (_, { rejectWithValue }) => {
        try {
            const resposn = await axios.get(`${APIURL}/user/product/categories`,)
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

export const GetAnnouncement = createAsyncThunk(
    "common/announcements",
    async (_, { rejectWithValue }) => {
        try {
            const resposn = await axios.get(`${APIURL}/user/common/announc`)
            return resposn.data
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
        isLoading: false,
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
    }

})


export default commonSlice.reducer;
