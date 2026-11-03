import { combineReducers } from "@reduxjs/toolkit";
import userAuth from './user/userAuth'
import adminAuth from './admin/adminAuth'
import categories from "./admin/categories";
import coupons from "./admin/coupon";
import products from "./admin/products"
import userProducts from "./user/products";
import carts from "./user/carts";
const rootReducer = combineReducers({
    userAuth: userAuth,
    userProducts: userProducts,
    carts: carts,
    adminAuth: adminAuth,
    AdminCategories: categories,
    AdminProducts: products,
    AdminCoupons: coupons
});


export default rootReducer;