import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiSearch,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearCouponMessages, DeleteCoupone } from "../../../toolkit/slices/admin/coupon";
import { toast } from "react-toastify";

const Coupons = () => {
  const navigate = useNavigate();
  const { coupons, success, ErrMeesage, SuccessMessage } = useSelector((state) => state.AdminCoupons);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // Add Coupon
  const handleAdd = () => {
    navigate("/admin/coupon-form", {
      state: { isEdit: false },
    });
  };

  // Edit Coupon
  const handleEdit = (coupon) => {
    navigate("/admin/coupon-form", {
      state: {
        isEdit: true,
        coupon,
      },
    });
  };

  // Delete Coupon
  const handleDelete = (coupon) => {
    dispatch(DeleteCoupone(coupon._id));
    console.log("delete this coupon", coupon);
  };

  useEffect(() => {
    if (success) {
      navigate("/admin/coupons");
      dispatch(clearCouponMessages());
    }

    if (ErrMeesage) {
      toast.error(ErrMeesage);
      dispatch(clearCouponMessages());
    }

    if (SuccessMessage) {
      toast.success(SuccessMessage);
      dispatch(clearCouponMessages());
    }
  }, [success, ErrMeesage, SuccessMessage]);

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.couponCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Coupons
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your discount coupons
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-[#a77b51] hover:bg-[#906843] text-white px-5 py-2.5 rounded-lg transition"
        >
          <FiPlus size={18} />
          Add Coupon
        </button>

      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-5">

        <div className="relative max-w-md">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search coupon code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-[#a77b51]"
          />
        </div>

      </div>

      {/* Coupon Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[850px]">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-sm text-gray-600">
                <th className="px-5 py-4 font-semibold">Coupon</th>
                <th className="px-5 py-4 font-semibold">Discount</th>
                <th className="px-5 py-4 font-semibold">Cart Value</th>
                <th className="px-5 py-4 font-semibold">Usage Limit</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((coupon) => (
                  <tr
                    key={coupon._id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Coupon */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-[#f8f1ea] flex items-center justify-center text-[#a77b51]">
                          <FiTag size={19} />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {coupon.couponCode}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {coupon.summary}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Discount */}
                    <td className="px-5 py-4">
                      <span className="font-semibold text-gray-800">
                        {coupon.value_type === "percentage"
                          ? `${coupon.value}%`
                          : `₹${coupon.value}`}
                      </span>
                    </td>

                    {/* Cart Value */}
                    <td className="px-5 py-4 text-gray-700">
                      {coupon.cart_value
                        ? `₹${coupon.cart_value}`
                        : "No minimum"}
                    </td>

                    {/* Limit */}
                    <td className="px-5 py-4 text-gray-700">
                      {coupon.limit ?? "Unlimited"}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${coupon.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                          }`}
                      >
                        {coupon.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() => handleEdit(coupon)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="Edit Coupon"
                        >
                          <FiEdit2 size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(coupon)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Coupon"
                        >
                          <FiTrash2 size={17} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    No coupons found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Coupons;