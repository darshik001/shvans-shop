import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const APIURL = import.meta.env.VITE_API_URL



export const AddProducts = createAsyncThunk(
    "products/add",
    async (data, { rejectWithValue, getState }) => {
        try {
            console.log("productData", data)
            const { AccessToken } = getState().adminAuth;
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('categoryId', data.categoryId)
            formData.append('description', data.description)
            formData.append("additionalInfo", data.additionalInfo);

            formData.append("variants", JSON.stringify(data.variants));
            formData.append("packing", JSON.stringify(data.packing));


            if (data.newImages) {
                data.newImages.forEach((image) => {
                    formData.append("productImages", image);
                });
            }

            const resposn = await axios.post(`${APIURL}/admin/product/add`, formData, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const GetProduct = createAsyncThunk(
    "products/get",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.get(`${APIURL}/admin/product/get`, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const UpdateProduct = createAsyncThunk(
    "products/update",
    async (data, { rejectWithValue, getState }) => {
        const fromData = new FormData()
        fromData.append('name', data.name)
        fromData.append('categoryId', data.categoryId)
        fromData.append('description', data.description)
        fromData.append("additionalInfo", data.additionalInfo);
        fromData.append("variants", JSON.stringify(data.variants));
        fromData.append("packing", JSON.stringify(data.packing));
        if (data.newImages) {
            data.newImages.forEach((image) => {
                fromData.append("productImages", image);
            });
        }

        if (data.deleteImages && data.deleteImages.length > 0) {
            fromData.append("deleteImages", JSON.stringify(data.deleteImages));
        }
        try {
            const { AccessToken } = getState().adminAuth;
            const resposn = await axios.patch(`${APIURL}/admin/product/update/${data._id}`, fromData, { headers: { Authorization: `Bearer ${AccessToken}` } })
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        success: false,
        products: [],
        ErrMessage: '',
        successMessage: '',

    },
    reducers: {
        clearProductMessages: (state) => {
            state.successMessage = '';
            state.ErrMessage = '';
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(AddProducts.pending, (state) => {
                state.isLoading = true,
                    state.success = false,
                    state.ErrMessage = '',
                    state.successMessage = ''
            })
            .addCase(AddProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.success = true,
                    state.ErrMessage = '',
                    state.products = [action.payload.product, ...state.products],
                    state.successMessage = action.payload.message
            })
            .addCase(AddProducts.rejected, (state, action) => {
                state.isLoading = false,
                    state.success = false,
                    state.successMessage = '',
                    state.ErrMessage = action.payload.message
            })


            .addCase(GetProduct.pending, (state) => {
                state.isLoading = true,
                    state.ErrMessage = '',
                    state.successMessage = ''
            })
            .addCase(GetProduct.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = '',
                    state.products = action.payload.products
            })
            .addCase(GetProduct.rejected, (state, action) => {
                state.isLoading = false,
                    state.successMessage = '',
                    state.ErrMessage = action.payload.message
            })

            .addCase(UpdateProduct.pending, (state) => {
                state.isLoading = true,
                    state.success = false,
                    state.ErrMessage = '',
                    state.successMessage = ''
            })
            .addCase(UpdateProduct.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ErrMessage = '',
                    state.products = state.products.map((product) => product._id === action.payload.product._id ? action.payload.product : product),
                    state.success = true,
                    state.successMessage = action.payload.message




            })
            .addCase(UpdateProduct.rejected, (state, action) => {
                state.isLoading = false,
                    state.success = false,
                    state.successMessage = '',
                    state.ErrMessage = action.payload.message
            })



    }
})

export const { clearProductMessages } = productsSlice.actions;

export default productsSlice.reducer
