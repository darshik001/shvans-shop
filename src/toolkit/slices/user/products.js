import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL

export const GetAllProducts = createAsyncThunk(
    "products/get",
    async (_, { rejectWithValue }) => {
        try {
            const resposn = await axios.get(`${APIURL}/user/product/get`,)

            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }

)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: {},
        isLoading: false,
        errMessage: "",
        successMessage: "",
    },

    extraReducers: (builder) => {
        builder
            .addCase(GetAllProducts.pending, (state) => {
                state.isLoading = true
                state.errMessage = ""
                state.successMessage = ""
            })
            .addCase(GetAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = ""
                state.products = action.payload.products
            })
            .addCase(GetAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload.message
                state.successMessage = ""
            })
    }

})


export default productSlice.reducer;
