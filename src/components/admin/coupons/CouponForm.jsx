
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewCoupone,
  clearCouponMessages,
  UpdateCoupone,
} from "../../../toolkit/slices/admin/coupon";
import { toast } from "react-toastify";

const CouponForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isEdit = false, coupon = null } = location.state || {};

  const {
    isLoading,
    success,
    ErrMessage,
    SuccessMessage,
  } = useSelector((state) => state.AdminCoupons);

  const [formData, setFormData] = useState({
    couponCode: coupon?.couponCode || "",
    summary: coupon?.summary || "",
    description: coupon?.description || "",
    value: coupon?.value ?? "",
    value_type: coupon?.value_type || "percentage",
    cart_value: coupon?.cart_value ?? "",
    limit: coupon?.limit ?? "",
    status: coupon?.status || "active",
  });

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      couponCode: formData.couponCode.trim().toUpperCase(),
      value: Number(formData.value),
      cart_value:
        formData.cart_value === ""
          ? null
          : Number(formData.cart_value),
      limit:
        formData.limit === ""
          ? null
          : Number(formData.limit),
    };

    if (isEdit) {
      dispatch(
        UpdateCoupone({
          _id: coupon._id,
          ...submitData,
        })
      );
    } else {
      dispatch(AddNewCoupone(submitData));
    }
  };

  // Success / Error Messages
  useEffect(() => {
    if (success) {
      navigate("/admin/coupons");
      dispatch(clearCouponMessages());
    }

    if (ErrMessage) {
      toast.error(ErrMessage);
      dispatch(clearCouponMessages());
    }

    if (SuccessMessage) {
      toast.success(SuccessMessage);
      dispatch(clearCouponMessages());
    }
  }, [
    success,
    ErrMessage,
    SuccessMessage,
    navigate,
    dispatch,
  ]);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 flex justify-center">

      {/* Main Wrapper */}
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <FiArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Edit Coupon" : "Add Coupon"}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {isEdit
                ? "Update your coupon details"
                : "Create a new discount coupon"}
            </p>
          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-5 sm:p-7 w-full"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Coupon Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Coupon Code *
              </label>

              <input
                type="text"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleChange}
                placeholder="e.g. WELCOME10"
                minLength={6}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51] uppercase"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Summary *
              </label>

              <input
                type="text"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Enter coupon summary"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51]"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter coupon description"
                rows={4}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51] resize-none"
              />
            </div>

            {/* Value Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discount Type *
              </label>

              <select
                name="value_type"
                value={formData.value_type}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51] bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed_amount">Fixed Amount (₹)</option>
              </select>
            </div>

            {/* Value */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discount Value *
              </label>

              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                placeholder={
                  formData.value_type === "percentage"
                    ? "Enter percentage"
                    : "Enter amount"
                }
                min="0"
                max={
                  formData.value_type === "percentage"
                    ? "100"
                    : undefined
                }
                step="any"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51]"
              />
            </div>

            {/* Cart Value */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Cart Value (₹)
              </label>

              <input
                type="number"
                name="cart_value"
                value={formData.cart_value}
                onChange={handleChange}
                placeholder="Enter minimum cart value"
                min="0"
                step="any"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51]"
              />

              <p className="text-xs text-gray-400 mt-1">
                Leave empty if there is no minimum cart value.
              </p>
            </div>

            {/* Limit */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usage Limit
              </label>

              <input
                type="number"
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                placeholder="Enter coupon usage limit"
                min="1"
                step="1"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51]"
              />

              <p className="text-xs text-gray-400 mt-1">
                Leave empty for unlimited usage.
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#a77b51] bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-5 border-t border-gray-100">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#a77b51] hover:bg-[#906843] text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiSave size={18} />
              {isLoading
                ? "Please wait..."
                : isEdit
                  ? "Update Coupon"
                  : "Create Coupon"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CouponForm;
