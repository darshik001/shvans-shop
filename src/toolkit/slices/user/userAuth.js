import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { auth } from "../../../services/firebase";
import { getIdToken, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDeviceToken } from "../../../services/helper";


const stordUser = JSON.parse(localStorage.getItem('user'))
const stordToken = JSON.parse(localStorage.getItem('token'))
const APIURL = import.meta.env.VITE_API_URL

export const sentLoginOtp = createAsyncThunk(
    "userauth/sent-otp",
    async (data, { rejectWithValue }) => {
        try {
            const resposn = await axios.post(`${APIURL}/user/auth/sent-otp`, data)
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const userverifyOtpAndLogin = createAsyncThunk(
    "userauth/verify-otp",
    async (data, { rejectWithValue }) => {
        try {
            const deviceToken = await getDeviceToken()

            const resposn = await axios.post(`${APIURL}/user/auth/sent-otp-verify`, {...data,deviceToken:deviceToken})

            return resposn.data

        } catch (error) {
            console.log(error.response.data?.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const userLogout = createAsyncThunk(
    'userauth/logout',
    async (data, { rejectWithValue }) => {
        console.log("running")
        try {

            const resposn = await axios.post(`${APIURL}/user/auth/user-logout`, {}, { headers: { Authorization: `Bearer ${data}` } })

            return resposn.data
        } catch (error) {
            console.log("error", error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const GoogleLogin = createAsyncThunk(
    "userauth/google-login",
    async (_, { rejectWithValue }) => {
        try {
            const provder = new GoogleAuthProvider()
            const googleRespons = await signInWithPopup(auth, provder)
            const idToken = await getIdToken(googleRespons.user);
            const deviceToken = await getDeviceToken()
            const resposn = await axios.post(`${APIURL}/user/auth/user-google-login`, {GoogleIdToken:idToken,deviceToken:deviceToken})
            return resposn.data
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)

const userAuthSlice = createSlice({
    name: "userauth",
    initialState: {
        user: stordUser ? stordUser : null,
        AccessToken: stordToken ? stordToken : null,
        userId: null,
        isLogin: stordUser && stordToken ? true : false,
        isLoding: false,
        successMessage: "",
        errMessage: "",
    },
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = "";
            state.errMessage = "";
        },
    },

    extraReducers: (builder) => {
        builder

            // SENT OTP
            .addCase(sentLoginOtp.pending, (state) => {
                state.isLoding = true
                state.successMessage = ""
                state.errMessage = ""
            })

            .addCase(sentLoginOtp.fulfilled, (state, action) => {
                state.isLoding = false,
                    state.successMessage = action.payload.message,
                    state.userId = action.payload.userId
            })
            .addCase(sentLoginOtp.rejected, (state, action) => {
                state.errMessage = action.payload.message
                state.isLoding = false,
                    state.successMessage = "",
                    state.userId = null,
                    state.isLogin = false
                state.user = null
            })

            //VERIFY OTP

            .addCase(userverifyOtpAndLogin.pending, (state) => {
                state.isLoding = true
                state.successMessage = ""
                state.errMessage = ""
            })
            .addCase(userverifyOtpAndLogin.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('token', JSON.stringify(action.payload.AccessToken))
                state.errMessage = ""
                state.isLoding = false,
                    state.successMessage = action.payload.message,
                    state.userId = null,
                    state.isLogin = true
                state.user = action.payload.user,
                    state.AccessToken = action.payload.AccessToken
            })
            .addCase(userverifyOtpAndLogin.rejected, (state, action) => {
                console.log(action)
                state.errMessage = action.payload.message
                state.isLoding = false,
                    state.successMessage = "",
                    state.isLogin = false
                state.user = null
            })

            // LOGOUT

            .addCase(userLogout.pending, (state) => {
                state.isLoding = true,
                    state.successMessage = ""
                state.errMessage = ""


            })

            .addCase(userLogout.fulfilled, (state, action) => {
                localStorage.removeItem('user')
                localStorage.removeItem('token', JSON.stringify(action.payload.AccessToken))
                state.errMessage = ""
                state.isLoding = false,
                    state.successMessage = action.payload.message,
                    state.userId = null,
                    state.isLogin = false
                state.user = null,
                    state.AccessToken = null
            })

            .addCase(userLogout.rejected, (state, action) => {
                console.log(action)
                state.errMessage = action.payload.message
                state.isLoding = false,
                    state.successMessage = ""
            })

            //GOOGLE  LOGIN

            .addCase(GoogleLogin.pending, (state) => {
                state.isLoding = true
                state.successMessage = ""
                state.errMessage = ""
            })
            .addCase(GoogleLogin.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('token', JSON.stringify(action.payload.AccessToken))
                state.errMessage = ""
                state.isLoding = false,
                    state.successMessage = action.payload.message,
                    state.userId = null,
                    state.isLogin = true
                state.user = action.payload.user,
                    state.AccessToken = action.payload.AccessToken
            })
            .addCase(GoogleLogin.rejected, (state, action) => {
                console.log(action)
                state.errMessage = action.payload.message
                state.isLoding = false,
                    state.successMessage = "",
                    state.isLogin = false
                state.user = null
            })


    }
})



export const { clearSuccessMessage } = userAuthSlice.actions;
export default userAuthSlice.reducer;