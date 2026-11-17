import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL


export const AddAnnounc = createAsyncThunk(
    'announcements/add',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.post(`${APIURL}/admin/announcements/add`, data, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)


export const GetAnnounc = createAsyncThunk(
    'announcements/get',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.get(`${APIURL}/admin/announcements/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)


export const UpdateAnnounc = createAsyncThunk(
    'announcements/update',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.patch(`${APIURL}/admin/announcements/update/${data._id}`, data, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)

export const DeleteAnnounc = createAsyncThunk(
    'announcements/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.delete(`${APIURL}/admin/announcements/delete/${id}`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)

const announcementsSlice = createSlice({
    name: 'announcements',
    initialState: {
        announcements: [],
        isLoading: false,
        errMessage: "",
        successMessage: "",
    },

    extraReducers: (builder) => {
        builder
            .addCase(AddAnnounc.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(AddAnnounc.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.announcements = action.payload.announcements
            })
            .addCase(AddAnnounc.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })

            .addCase(GetAnnounc.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(GetAnnounc.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.announcements = action.payload.announcements
            })
            .addCase(GetAnnounc.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })

            

            .addCase(UpdateAnnounc.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(UpdateAnnounc.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.announcements = action.payload.announcements
            })
            .addCase(UpdateAnnounc.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })



            .addCase(DeleteAnnounc.pending, (state) => {
                state.isLoading = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })
            .addCase(DeleteAnnounc.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.errMessage = "",
                    state.successMessage = action.payload.message
                state.announcements = action.payload.announcements
            })
            .addCase(DeleteAnnounc.rejected, (state, action) => {
                state.isLoading = false,
                    state.errMessage = action.payload.message,
                    state.successMessage = ""
            })

    }

})


export default announcementsSlice.reducer;
