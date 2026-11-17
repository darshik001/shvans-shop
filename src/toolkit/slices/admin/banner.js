import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL


export const AddBanner = createAsyncThunk(
    'banner/add',
    async (data, { rejectWithValue, getState }) => {
        try {
            const fromData = new FormData()
            fromData.append('title', data.title)
            fromData.append('description', data.description)
            fromData.append('imageTitle', data.imageTitle)
            fromData.append("imageDescription", data.imageDescription);
            fromData.append("status", data.status);
            fromData.append("bannerImage", data.image);
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.post(`${APIURL}/admin/banner/add`, fromData, { headers: { Authorization: `Bearer ${AccessToken}` } })
            console.log(resposn.data)
            return resposn.data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }

    }
)


export const GetBanner = createAsyncThunk(
    'banner/get',
    async (data, { rejectWithValue, getState }) => {
        try {

            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.get(`${APIURL}/admin/banner/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            console.log(resposn.data)
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)


export const UpdateBanner = createAsyncThunk(
    'banner/update',
    async (data, { rejectWithValue, getState }) => {
        try {
            const fromData = new FormData()
            fromData.append('title', data.title)
            fromData.append('description', data.description)
            fromData.append('imageTitle', data.imageTitle)
            fromData.append("imageDescription", data.imageDescription);
            fromData.append("status", data.status);
            if (data.bannerImage) {
                fromData.append("bannerImage", data.bannerImage);
            }
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.patch(`${APIURL}/admin/banner/update/${data._id}`, fromData, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }

    }
)




export const DeleteBanner = createAsyncThunk(
    'banner/delete',
    async (id, { rejectWithValue, getState }) => {
        try {

            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.delete(`${APIURL}/admin/banner/delete/${id}`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }

    }
)




const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        banners: [],
        isLoading: false,
        errMessage: "",
        successMessage: "",
    },

    extraReducers: (builder) => {
        builder
            .addCase(AddBanner.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(AddBanner.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.banners = action.payload.banners
            })
            .addCase(AddBanner.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })


            .addCase(GetBanner.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(GetBanner.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.banners = action.payload.banners
            })
            .addCase(GetBanner.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })


            .addCase(UpdateBanner.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(UpdateBanner.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.banners = action.payload.banners
            })
            .addCase(UpdateBanner.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })



            .addCase(DeleteBanner.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(DeleteBanner.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.banners = action.payload.banners
            })
            .addCase(DeleteBanner.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })



    }

})


export default bannerSlice.reducer;
