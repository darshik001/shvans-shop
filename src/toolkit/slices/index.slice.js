import { combineReducers } from "@reduxjs/toolkit";
import userAuth from './user/userAuth'
import adminAuth from './admin/adminAuth'
import categories from "./admin/categories";
import coupons from "./admin/coupon";
import products from "./admin/products"
import userProducts from "./user/products";
import carts from "./user/carts";
import adminOrder from "./admin/adminOrder"
import userOrder from "./user/userOrder"
import review from "./user/review"
import common from "./user/common"
import announcements from "./admin/announcements"
import banners from "./admin/banner"
import report from "./admin/adminreport"
const rootReducer = combineReducers({
    userAuth: userAuth,
    userProducts: userProducts,
    carts: carts,
    userOrder: userOrder,
    review: review,
    common: common,
    adminAuth: adminAuth,
    AdminCategories: categories,
    AdminProducts: products,
    AdminCoupons: coupons,
    AdminOrder: adminOrder,
    AdminAnnounc: announcements,
    AdminBanner: banners,
    AdminReport:report
});


export default rootReducer;