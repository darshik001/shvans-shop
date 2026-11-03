
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL;

// Get fresh cart data from localStorage
const getLocalCarts = () => {
    return JSON.parse(localStorage.getItem("carts") || "[]");
};

// GET CARTS
export const GetCarts = createAsyncThunk(
    "carts/get",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { isLogin } = getState().userAuth;

            if (!isLogin) {
                return {
                    carts: getLocalCarts(),
                };
            }

            const response = await axios.get(`${APIURL}/user/cart/get`, { headers: { authorization: `Bearer ${getState().userAuth.AccessToken}` } });

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);


export const AddToCart = createAsyncThunk(
    "carts/add",
    async (data, { rejectWithValue, getState }) => {
        try {
            const { isLogin } = getState().userAuth;

            if (!isLogin) {
                const carts = getLocalCarts();
                const existingCartIndex = carts.findIndex((item) => item.productId === data.productId && item.variantId === data.variantId);

                if (existingCartIndex !== -1) {
                    carts[existingCartIndex] = {
                        ...carts[existingCartIndex],
                        quantity: Number(carts[existingCartIndex].quantity) + Number(data.quantity)
                    };
                } else {
                    carts.push({ ...data, });
                }

                // Save updated carts
                localStorage.setItem("carts", JSON.stringify(carts));

                return { message: "Product added to cart successfully", carts: carts, };

            } else {
                const response = await axios.post(`${APIURL}/user/cart/add`, { carts: Array.isArray(data) ? data : [data] }, { headers: { authorization: `Bearer ${getState().userAuth.AccessToken}` } });
                const carts = getLocalCarts();
                if (carts) {
                    localStorage.removeItem('carts')
                }

                return response.data;
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || { message: error.message, });
        }
    }
);




export const UpdateCartQuantity = createAsyncThunk(
    "carts/updateQuantity",
    async ({ productId, variantId, quantity, cartId }, { rejectWithValue, getState }) => {
        try {
            const { isLogin } = getState().userAuth;

            if (!isLogin) {
                const carts = getLocalCarts();

                let updatedCarts;

                if (quantity <= 0) {
                    // Remove item from cart
                    updatedCarts = carts.filter(
                        (item) =>
                            !(
                                item.productId === productId &&
                                item.variantId === variantId
                            )
                    );
                } else {
                    // Update quantity
                    updatedCarts = carts.map((item) => {
                        if (
                            item.productId === productId &&
                            item.variantId === variantId
                        ) {
                            return {
                                ...item,
                                quantity,
                            };
                        }

                        return item;
                    });
                }

                localStorage.setItem(
                    "carts",
                    JSON.stringify(updatedCarts)
                );

                return {
                    message:
                        quantity <= 0
                            ? "Product removed from cart"
                            : "Cart quantity updated",
                    carts: updatedCarts,
                };
            }

            const response = await axios.patch(`${APIURL}/user/cart/update/${cartId}`, { productId, variantId, quantity }, { headers: { authorization: `Bearer ${getState().userAuth.AccessToken}` } });

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);



const cartSlice = createSlice({
    name: "carts",

    initialState: {
        carts: [],
        isLoading: false,
        errMessage: "",
        successMessage: "",
    },

    reducers: {
        clearCartMessages: (state) => {
            state.errMessage = "";
            state.successMessage = "";
        },
    },

    extraReducers: (builder) => {
        builder

            // GET CARTS
            .addCase(GetCarts.pending, (state) => {
                state.isLoading = true;
                state.errMessage = "";
                state.successMessage = "";
            })

            .addCase(GetCarts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMessage = "";
                state.carts = action.payload.carts || [];
            })

            .addCase(GetCarts.rejected, (state, action) => {
                state.isLoading = false;
                state.errMessage =
                    action.payload?.message || "Failed to fetch cart";
            })

            // ADD TO CART
            .addCase(AddToCart.pending, (state) => {
                state.isLoading = true;
                state.errMessage = "";
                state.successMessage = "";
            })

            .addCase(AddToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMessage = "";
                state.successMessage = action.payload.message;
                state.carts = action.payload.carts || [];
            })

            .addCase(AddToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.errMessage =
                    action.payload?.message || "Failed to add product";
            })

            .addCase(UpdateCartQuantity.pending, (state) => {
                state.isLoading = true;
                state.errMessage = "";
            })
            .addCase(UpdateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;

                if (action.payload.carts) {
                    state.carts = action.payload.carts
                    return
                }

                if (action.payload.deleted === true) {
                    state.carts = state.carts.filter(
                        (item) => item._id !== action.payload.cart._id
                    );
                    return;
                }

                if (action.payload.cart) {
                    const updatedCart = action.payload.cart;

                    const cartIndex = state.carts.findIndex(
                        (item) => item._id === updatedCart._id
                    );

                    if (cartIndex !== -1) {
                        // જૂના cart ને નવા updated cart થી replace કરો
                        state.carts[cartIndex] = updatedCart;
                    } else {
                        // જો cart Redux માં ન હોય તો add કરો
                        state.carts.push(updatedCart);
                    }
                }

            })
            .addCase(UpdateCartQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.errMessage =
                    action.payload?.message || "Quantity update failed";
            })




    },
});

export const { clearCartMessages } = cartSlice.actions;

export default cartSlice.reducer;
