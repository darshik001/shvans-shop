import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../toolkit/slices/user/products";
import { AddToCart, GetCarts } from "../toolkit/slices/user/carts";
import { useEffect } from "react";
import { GetUserOrders } from "../toolkit/slices/user/userOrder";
import { GetReview } from "../toolkit/slices/user/review";
import { GetAllcategories, GetAnnouncement } from "../toolkit/slices/user/common";


const UserLayout = () => {
  const { isLogin } = useSelector((state) => state.userAuth);
  const carts = JSON.parse(localStorage.getItem("carts")) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAnnouncement())
    dispatch(GetAllcategories())
    dispatch(GetAllProducts());
    dispatch(GetCarts());
  }, [dispatch, isLogin])


  useEffect(() => {
    if (isLogin) {
      if (carts.length) {
        console.log("user layout", carts)
        dispatch(AddToCart(carts));

      }

      dispatch(GetUserOrders())
      dispatch(GetReview())
    }
  }, [isLogin])


  return (
    <>
      {/* User Navbar */}
      <Navbar />

      {/* All User Pages */}
      <main>
        <Outlet />
      </main>

      {/* User Footer */}
      <Footer />
    </>
  );
};

export default UserLayout;