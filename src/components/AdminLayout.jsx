import { Outlet } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCategoryMessages, GetCategory } from "../toolkit/slices/admin/categories";
import { GetProduct } from "../toolkit/slices/admin/products";

const AdminLayout = () => {
const dispatch = useDispatch()
   useEffect(()=>{
        dispatch(GetCategory())
        dispatch(GetProduct())
        clearCategoryMessages()
      },[])
  return (
    <div className="flex min-h-screen w-full bg-[#faf8f6]">
      {/* Sidebar - Left Side */}
      <Sidebar />

      {/* Dashboard - Right Side */}
      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;