import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL



export const AddCategory = createAsyncThunk(
    "categories/add",
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append("status", data.status);
            formData.append('description', data.description)

            if (data.categoryImage) {
                formData.append("categoryImage", data.categoryImage);
            }

            const resposn = await axios.post(`${APIURL}/admin/category/add`, formData, { headers: { Authorization: `Bearer ${AccessToken}` } })
            console.log(resposn.data)
            return resposn.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const GetCategory = createAsyncThunk(
    "categories/get",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.get(`${APIURL}/admin/category/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })

            return resposn.data
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

export const UpdateCategory = createAsyncThunk(
    "categories/update",
    async (data, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append("status", data.status);
            formData.append('description', data.description)
            formData.append('categoryId', data.categoryId)
            if (data.categoryImage) {
                formData.append("categoryImage", data.categoryImage);
            }
            const resposn = await axios.patch(`${APIURL}/admin/category/update`, formData, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        isLoading: false,
        categories: [],
        ErrMessage: '',
        successMessage: '',

    },
    reducers: {
        clearCategoryMessages: (state) => {
            state.successMessage = '';
            state.ErrMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(AddCategory.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = '',
                    state.successMessage = ''
            })
            .addCase(AddCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = '',
                    state.categories = [action.payload.category, ...state.categories],
                    state.successMessage = action.payload.message
            })
            .addCase(AddCategory.rejected, (state, action) => {
                state.isLoading = false,
                    state.successMessage = '',
                    state.ErrMessage = action.payload.message
            })


            .addCase(GetCategory.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = '',
                    state.successMessage = ''
            })
            .addCase(GetCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = '',
                    state.categories = action.payload.categories
            })
            .addCase(GetCategory.rejected, (state, action) => {
                state.isLoading = false,
                    state.successMessage = '',
                    state.ErrMessage = action.payload.message
            })


            .addCase(UpdateCategory.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = '',
                    state.successMessage = ''
            })
            .addCase(UpdateCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = '',
                    state.categories = state.categories.map((item) => item._id === action.payload.category._id ? { ...item, ...action.payload.category } : item);
                state.successMessage = action.payload.message
            })

            .addCase(UpdateCategory.rejected, (state, action) => {
                state.isLoading = false,
                    state.successMessage = '',
                    state.ErrMessage = action.payload.message
            })
    }
})

export const { clearCategoryMessages } = categoriesSlice.actions;

export default categoriesSlice.reducer
