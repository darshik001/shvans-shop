import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../toolkit/slices/user/products";
import { AddToCart, GetCarts } from "../toolkit/slices/user/carts";
import { useEffect } from "react";


const UserLayout = () => {
  const { isLogin } = useSelector((state) => state.userAuth);
  const carts = JSON.parse(localStorage.getItem("carts")) || [];

  console.log(carts)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProducts());
    dispatch(GetCarts());
  }, [dispatch, isLogin])


  useEffect(() => {
    if (isLogin) {
      if (carts.length) {
        console.log("user layout", carts)
        dispatch(AddToCart(carts));

      }
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