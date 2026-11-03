import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { getDeviceToken } from "../../../services/helper";

const storedAdmin = JSON.parse(sessionStorage.getItem('admin'))
const storeToken = JSON.parse(sessionStorage.getItem('token'))
const APIURL = import.meta.env.VITE_API_URL


export const AdminSignin = createAsyncThunk(
    "adminauth/login",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data)
            const deviceToken = await getDeviceToken()
            const resposn = await axios.post(`${APIURL}/admin/auth/admin-login`, { ...data, deviceToken })
            console.log(resposn.data)
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const adminAuthSlice = createSlice({
    name: "adminauth",
    initialState: {
        admin: storedAdmin ? storedAdmin : null,
        AccessToken: storeToken ? storeToken : null,
        isLogin: storeToken && storeToken ? true : false,
        isLoding: false,
        successMessage: "",
        errMessage: "",
    },
    reducers: {


    },
    extraReducers: (builder) => {
        builder

            .addCase(AdminSignin.pending, (state) => {
                state.isLoding = true,
                    state.errMessage = "",
                    state.successMessage = ""
            })

            .addCase(AdminSignin.fulfilled, (state, action) => {
                sessionStorage.setItem('admin', JSON.stringify(action.payload.user))
                sessionStorage.setItem('token', JSON.stringify(action.payload.AccessToken))

                state.admin = action.payload.user
                state.successMessage = action.payload.message,
                    state.errMessage = "",
                    state.isLoding = false,
                    state.isLogin = true
            })

            .addCase(AdminSignin.rejected, (state, action) => {
                state.isLoding = false,
                    state.errMessage = action.payload.message,
                    state.isLogin = false,
                    state.admin = null,
                    state.AccessToken = null
            })

    }
})


export default adminAuthSlice.reducer