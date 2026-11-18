
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaTruck,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBan,
  FaUndo,
  FaStar,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearSuccessMessage,
  userLogout,
} from "../toolkit/slices/user/userAuth";
import { useNavigate } from "react-router-dom";
import { CanceleOrder, ClearUserOrdersmessage, ReturnOrder } from "../toolkit/slices/user/userOrder";
import { CreatReview } from "../toolkit/slices/user/review";

const Profile = () => {
  const { user, errMessage, successMessage, isLogin, AccessToken } = useSelector((state) => state.userAuth);
  const userOrderState = useSelector((state) => state.userOrder);
  const review = useSelector((state) => state.review)
  const reviews = review.reviews
  const orders = Array.isArray(userOrderState.orders) ? userOrderState.orders : [];

  const orderLoading = userOrderState.isLoading || false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Return modal states
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedReturnOrder, setSelectedReturnOrder] = useState(null);
  const [returnLoading, setReturnLoading] = useState(false);

  // Product review modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReviewOrder, setSelectedReviewOrder] = useState(null);
  const [selectedReviewItem, setSelectedReviewItem] = useState(null);
  const [selectedExistingReview, setSelectedExistingReview] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });

  const [returnData, setReturnData] = useState({
    reason: "",
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      accountType: "savings",
    },
  });

  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name || "", phone: user.phone || "", });
    }

    if (errMessage) {
      toast.error(errMessage);
      dispatch(clearSuccessMessage());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }

    if (!isLogin) {
      navigate("/auth");
    }
  }, [user, errMessage, successMessage, isLogin, dispatch, navigate]);



  useEffect(() => {
    if (userOrderState.SuccessMessage) {
      toast.success(userOrderState.SuccessMessage)
      dispatch(ClearUserOrdersmessage())
    }

    if (userOrderState.ErrMessage) {
      toast.error(userOrderState.ErrMessage)
      dispatch(ClearUserOrdersmessage())

    }
  }, [dispatch, userOrderState.ErrMessage, userOrderState.SuccessMessage])

  // Profile input change
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile
  const handleSave = () => {
    console.log("Updated Profile:", profileData);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      phone: user?.phone || "",
    });

    setIsEditing(false);
  };

  // Logout
  const handleLogout = () => {
    if (AccessToken) {
      dispatch(userLogout(AccessToken));
    }
  };

  // Normalize status and type
  const normalizeStatus = (value) => {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replaceAll("-", "_")
      .replaceAll(" ", "_");
  };

  // Order actions
  const getOrderActions = (order) => {
    const status = normalizeStatus(order.status);
    const type = normalizeStatus(order.type);

    const canCancel =
      type === "forward" &&
      ["pending", "accepted", "processing"].includes(status);

    const canReturn =
      type === "forward" &&
      status === "delivered";

    const showReturnBadge =
      type === "return";

    return {
      canCancel,
      canReturn,
      showReturnBadge,
    };
  };

  // Cancel Order
  const handleCancelOrder = (order) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel order #${order.orderNumber}?`
    );

    if (!confirmCancel) return;

    dispatch(CanceleOrder(order._id));
  };

  // Open Return Modal
  const handleReturnOrder = (order) => {
    setSelectedReturnOrder(order);

    setReturnData({
      reason: "",
      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        accountType: "savings",
      },
    });

    setShowReturnModal(true);
  };

  // Return form input change
  const handleReturnChange = (e) => {
    const { name, value } = e.target;

    if (name === "reason") {
      setReturnData((prev) => ({
        ...prev,
        reason: value,
      }));
    } else {
      setReturnData((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [name]: value,
        },
      }));
    }
  };

  // Submit Return Request
  const handleSubmitReturn = async (e) => {
    e.preventDefault();

    if (!selectedReturnOrder) return;

    const paymentMethod = normalizeStatus(
      selectedReturnOrder.paymentData?.method
    );

    if (!returnData.reason.trim()) {
      toast.error("Please enter return reason");
      return;
    }

    // Validate COD bank details only
    if (paymentMethod === "cod") {
      const {
        accountHolderName,
        accountNumber,
        ifscCode,
        accountType,
      } = returnData.bankDetails;

      if (
        !accountHolderName.trim() ||
        !accountNumber.trim() ||
        !ifscCode.trim() ||
        !accountType
      ) {
        toast.error("Please enter all bank details");
        return;
      }

      if (!/^\d{9,18}$/.test(accountNumber.trim())) {
        toast.error("Please enter a valid account number");
        return;
      }

      if (!/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(ifscCode.trim())) {
        toast.error("Please enter a valid IFSC code");
        return;
      }
    }

    // Prepaid: only reason
    // COD: reason + bankDetails
    const payload = {
      reason: returnData.reason.trim(),
      ...(paymentMethod === "cod" && {
        bankDetails: {
          accountHolderName:
            returnData.bankDetails.accountHolderName.trim(),
          accountNumber:
            returnData.bankDetails.accountNumber.trim(),
          ifscCode:
            returnData.bankDetails.ifscCode.trim().toUpperCase(),
          accountType:
            returnData.bankDetails.accountType,
        },
      }),
    };

    try {
      setReturnLoading(true);

      console.log("Return Order ID:", selectedReturnOrder._id);
      console.log("Return Payload:", payload);
      const data = {
        _id: selectedReturnOrder._id,
        reason: payload.reason,
        bankDetails: payload.bankDetails
      }


      dispatch(ReturnOrder(data));



      toast.info("Please connect your Return Order API.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Unable to submit return request"
      );
    } finally {
      setReturnLoading(false);
    }
  };

  // Close Return Modal
  const closeReturnModal = () => {
    if (returnLoading) return;

    setShowReturnModal(false);
    setSelectedReturnOrder(null);
  };

  // Find an existing review for this exact order and product
  const getExistingReview = (order, item) => {
    const allReviews = Array.isArray(reviews) ? reviews : [];
    const orderId = String(order?._id || "");
    const itemProductId = String(
      item?.productId?._id || item?.productId || item?.product?._id || ""
    );

    return allReviews.find((reviewItem) => {
      const reviewOrderId = String(
        reviewItem?.orderId?._id || reviewItem?.orderId || ""
      );
      const reviewProductId = String(
        reviewItem?.productId?._id || reviewItem?.productId || ""
      );

      // orderId + productId: one order can contain multiple products.
      return reviewOrderId === orderId && reviewProductId === itemProductId;
    });
  };

  // Open review modal and prefill it when a review already exists
  const handleOpenReview = (order, item) => {
    const existingReview = getExistingReview(order, item);

    setSelectedReviewOrder(order);
    setSelectedReviewItem(item);
    setSelectedExistingReview(existingReview || null);
    setReviewData({
      rating: existingReview?.rating || 0,
      comment: existingReview?.comment || "",
    });
    setShowReviewModal(true);
  };

  // Submit product review (console only for now)
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!selectedReviewOrder || !selectedReviewItem) return;

    if (!reviewData.rating) {
      toast.error("Please select a star rating");
      return;
    }

    if (!reviewData.comment.trim()) {
      toast.error("Please enter your review comment");
      return;
    }
    const payload = {
      orderId: selectedReviewOrder._id,
      productId: selectedReviewItem.productId,
      rating: reviewData.rating,
      comment: reviewData.comment.trim(),
    };

    dispatch(CreatReview(payload))

    setShowReviewModal(false);
    setSelectedReviewOrder(null);
    setSelectedReviewItem(null);
    setSelectedExistingReview(null);
    setReviewData({ rating: 0, comment: "" });
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedReviewOrder(null);
    setSelectedReviewItem(null);
    setSelectedExistingReview(null);
    setReviewData({ rating: 0, comment: "" });
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Format amount
  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  // Format status
  const formatStatus = (status) => {
    if (!status) return "-";

    return String(status)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Status color
  const getStatusColor = (status) => {
    switch (normalizeStatus(status)) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      case "out_for_delivery":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "pickup":
        return "bg-purple-100 text-purple-700";

      case "accepted":
      case "processing":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Address
  const getAddress = (address) => {
    if (!address) return "-";

    return [
      address.line1,
      address.line2,
      address.city,
      address.state,
      address.zipcode,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");
  };

  // Product name
  const getItemName = (item) => {
    return (
      item.product?.name ||
      item.productName ||
      item.name ||
      "Product"
    );
  };

  // Product image
  const getItemImage = (item) => {
    return (item.image_url || null);
  };

  // Quantity
  const getItemQuantity = (item) => {
    return item.quantity ?? item.qty ?? item.qunity ?? 1;
  };

  // Profile details
  const details = [
    {
      label: "Email Address",
      value: user?.email || "Not provided",
      icon: <FaEnvelope />,
    },
    {
      label: "Phone Number",
      value: user?.phone || "Not provided",
      icon: <FaPhone />,
      editable: true,
      name: "phone",
    },
    {
      label: "Member Since",
      value: formatDate(user?.createdAt),
      icon: <FaCalendarAlt />,
    },
    {
      label: "Full Name",
      value: user?.name || "Not provided",
      icon: <FaUser />,
      editable: true,
      name: "name",
    },
  ];

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#fffdf9] px-4">
        <div className="w-full max-w-md border border-[#e9ddd0] bg-white p-10 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6eee5] text-2xl text-[#a77b51]">
            <FaUser />
          </div>

          <h2 className="mt-5 font-serif text-2xl text-[#30241f]">
            Profile not available
          </h2>

          <p className="mt-3 text-sm text-[#817368]">
            Please login to view and manage your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen w-full bg-[#fffdf9] px-4 py-8 text-[#30241f] sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">

          {/* Page Heading */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[4px] text-[#a77b51]">
              Your Account
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl">
              Welcome,
              <span className="ml-2 italic text-[#a77b51]">
                {user.name?.split(" ")[0] || "Guest"}.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#817368]">
              Manage your personal information and keep your
              Shvans experience beautifully yours.
            </p>
          </div>

          {/* Main Card */}
          <div className="w-full overflow-hidden border border-[#e9ddd0] bg-white shadow-xl shadow-[#30241f]/5">

            {/* Banner */}
            <div className="relative h-40 overflow-hidden bg-[#30241f] sm:h-48">
              <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#a77b51]/50" />
              <div className="absolute right-8 top-8 h-32 w-32 rounded-full border border-[#d8b58e]/20" />
              <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full border border-[#a77b51]/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-[4px] text-[#d8b58e]">
                  Shvans Member
                </p>

                <p className="mt-3 font-serif text-2xl italic text-white sm:text-3xl">
                  Your story. Your essence.
                </p>
              </div>

              {/* Profile Image */}
              <div className="absolute -bottom-14 left-1/2 z-10 flex h-28 w-28 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#f6eee5] text-4xl text-[#a77b51] shadow-xl sm:h-32 sm:w-32">
                {user.profile ? (
                  <img
                    src={user.profile}
                    alt={user.name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUser />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-10">

              {/* User Name */}
              <div className="border-b border-[#eee5db] pb-7 text-center">
                <h2 className="font-serif text-2xl capitalize sm:text-3xl">
                  {user.name || "User"}
                </h2>

                <p className="mt-2 text-sm text-[#817368]">
                  Member of the Shvans fragrance family
                </p>
              </div>

              {/* Tabs */}
              <div className="mb-8 mt-8 flex gap-2 overflow-x-auto border-b border-[#eee5db]">
                <button
                  onClick={() => {
                    setActiveTab("profile");
                    setIsEditing(false);
                  }}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-4 text-sm font-medium transition ${activeTab === "profile"
                    ? "border-[#a77b51] text-[#a77b51]"
                    : "border-transparent text-gray-500 hover:text-[#30241f]"
                    }`}
                >
                  <FaUser />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setActiveTab("orders");
                    setIsEditing(false);
                  }}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-4 text-sm font-medium transition ${activeTab === "orders"
                    ? "border-[#a77b51] text-[#a77b51]"
                    : "border-transparent text-gray-500 hover:text-[#30241f]"
                    }`}
                >
                  <FaShoppingBag />
                  My Orders

                  <span className="rounded-full bg-[#f6eee5] px-2 py-0.5 text-xs text-[#906843]">
                    {orders.length}
                  </span>
                </button>
              </div>

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="w-full">

                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-[#a77b51]">
                        Personal Details
                      </p>

                      <h3 className="mt-2 font-serif text-2xl">
                        Your Information
                      </h3>
                    </div>

                    {/* {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center justify-center gap-2 border border-[#c9b8a6] px-5 py-3 text-sm font-medium transition hover:bg-[#30241f] hover:text-white"
                      >
                        <FaEdit />
                        Edit Profile
                      </button>
                    )} */}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {details.map((item) => (
                      <div
                        key={item.label}
                        className="group flex min-w-0 items-start gap-4 border border-[#eee5db] bg-[#fffdf9] p-5 transition hover:border-[#c9b8a6] hover:bg-[#fdf9f4]"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f6eee5] text-base text-[#a77b51] transition group-hover:bg-[#30241f] group-hover:text-white">
                          {item.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#9b8d80]">
                            {item.label}
                          </p>

                          {isEditing && item.editable ? (
                            <input
                              type={item.name === "phone" ? "tel" : "text"}
                              name={item.name}
                              value={profileData[item.name]}
                              onChange={handleChange}
                              className="mt-3 w-full border border-[#d8cabc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#a77b51]"
                            />
                          ) : (
                            <p className="mt-3 break-words text-sm font-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Account ID */}
                  <div className="mt-5 border border-[#eee5db] bg-[#f7f1e9] px-5 py-4">
                    <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#9b8d80]">
                      Account ID
                    </p>

                    <p className="mt-2 break-all font-mono text-xs text-[#75685e]">
                      {user._id || "Not available"}
                    </p>
                  </div>

                  {/* Edit Actions */}
                  {isEditing && (
                    <div className="mt-6 flex flex-col gap-3 border-t border-[#eee5db] pt-6 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center justify-center gap-2 border border-[#c9b8a6] px-6 py-3 text-sm transition hover:bg-[#f6eee5]"
                      >
                        <FaTimes />
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center justify-center gap-2 bg-[#30241f] px-7 py-3 text-sm text-white transition hover:bg-[#8d6846]"
                      >
                        <FaSave />
                        Save Changes
                      </button>
                    </div>
                  )}

                  {/* Logout */}
                  <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[#eee5db] pt-6 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-serif text-lg">
                        Want to leave for now?
                      </p>

                      <p className="mt-1 text-xs text-[#9b8d80]">
                        You can always come back and discover more fragrances.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 border border-red-200 bg-red-50 px-6 py-3 text-sm font-medium text-red-700 transition hover:bg-red-600 hover:text-white"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* MY ORDERS TAB */}
              {activeTab === "orders" && (
                <div className="w-full">

                  {/* Heading */}
                  <div className="mb-7">
                    <p className="text-xs uppercase tracking-[3px] text-[#a77b51]">
                      Your Purchases
                    </p>

                    <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                      My Orders
                    </h3>

                    <p className="mt-2 text-sm text-[#817368]">
                      Track and manage all your orders.
                    </p>
                  </div>

                  {/* Loading */}
                  {orderLoading ? (
                    <div className="py-20 text-center">
                      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#eee5db] border-t-[#a77b51]" />

                      <p className="mt-4 text-sm text-gray-500">
                        Loading your orders...
                      </p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="border border-[#eee5db] bg-[#fffdf9] px-5 py-16 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6eee5] text-2xl text-[#a77b51]">
                        <FaShoppingBag />
                      </div>

                      <h4 className="mt-5 font-serif text-2xl">
                        No Orders Yet
                      </h4>

                      <p className="mt-2 text-sm text-[#817368]">
                        You haven't placed any orders yet.
                      </p>

                      <button
                        onClick={() => navigate("/shop")}
                        className="mt-6 bg-[#30241f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8d6846]"
                      >
                        Explore Products
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-7">
                      {orders.map((order) => {
                        const {
                          canCancel,
                          canReturn,
                          showReturnBadge,
                        } = getOrderActions(order);

                        return (
                          <div
                            key={order._id}
                            className="w-full overflow-hidden border border-[#eee5db] bg-white transition hover:border-[#c9b8a6]"
                          >

                            {/* Order Header */}
                            <div className="flex flex-col justify-between gap-4 border-b border-[#eee5db] bg-[#fffdf9] p-5 lg:flex-row lg:items-center lg:px-7">

                              <div>
                                <p className="text-[10px] uppercase tracking-[2px] text-[#9b8d80]">
                                  Order Number
                                </p>

                                <h4 className="mt-2 text-base font-semibold">
                                  #{order.orderNumber}
                                </h4>

                                <p className="mt-1 text-xs text-[#817368]">
                                  Placed on {formatDate(order.createdAt)}
                                </p>
                              </div>

                              {/* Status + Actions */}
                              <div className="flex flex-wrap items-center gap-2">

                                <span
                                  className={`rounded-full px-4 py-2 text-xs font-semibold ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {formatStatus(order.status)}
                                </span>

                                {/* Return Badge */}
                                {showReturnBadge && (
                                  <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">
                                    <FaUndo className="mr-1 inline" />
                                    Return
                                  </span>
                                )}

                                {/* Cancel Button */}
                                {canCancel && (
                                  <button
                                    type="button"
                                    onClick={() => handleCancelOrder(order)}
                                    className="inline-flex items-center justify-center gap-2 border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-600 hover:text-white"
                                  >
                                    <FaBan />
                                    Cancel Order
                                  </button>
                                )}

                                {/* Return Order Button */}
                                {canReturn && (
                                  <button
                                    type="button"
                                    onClick={() => handleReturnOrder(order)}
                                    className="inline-flex items-center justify-center gap-2 border border-[#c9b8a6] bg-[#f7f1e9] px-4 py-2.5 text-xs font-semibold text-[#906843] transition hover:bg-[#30241f] hover:text-white"
                                  >
                                    <FaUndo />
                                    Return Order
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-5 lg:p-7">
                              <div className="mb-5 flex items-center gap-2 text-sm font-semibold">
                                <FaBoxOpen className="text-[#a77b51]" />
                                Order Items ({order.items?.length || 0})
                              </div>

                              <div className="space-y-5">
                                {order.items?.map((item, index) => {
                                  const itemImage = getItemImage(item);

                                  return (
                                    <div
                                      key={item._id || item.productId || index}
                                      className="flex flex-col gap-4 border-b border-[#eee5db] pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                                    >
                                      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden bg-[#f7f1e9]">
                                        {itemImage ? (
                                          <img
                                            src={itemImage}
                                            alt={getItemName(item)}
                                            className="h-full w-full object-cover"
                                          />
                                        ) : (
                                          <FaBoxOpen className="text-2xl text-[#a77b51]" />
                                        )}
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <h5 className="font-medium text-[#30241f]">
                                          {getItemName(item)}
                                        </h5>

                                        <p className="mt-2 text-xs text-[#817368]">
                                          Quantity: {getItemQuantity(item)}
                                        </p>

                                        {item.variant?.name && (
                                          <p className="mt-1 text-xs text-[#817368]">
                                            Variant: {item.variant.name}
                                          </p>
                                        )}
                                        {normalizeStatus(order.status) === "delivered" &&
                                          normalizeStatus(order.type) === "forward" && (
                                            <button
                                              type="button"
                                              onClick={() => handleOpenReview(order, item)}
                                              className="mt-3 inline-flex items-center gap-2 border border-[#a77b51] px-4 py-2 text-xs font-semibold text-[#a77b51] transition hover:bg-[#a77b51] hover:text-white"
                                            >
                                              <FaStar />
                                              {getExistingReview(order, item) ? "View / Edit Review" : "Write Review"}
                                            </button>
                                          )}
                                      </div>

                                      <div className="text-left sm:text-right">
                                        <p className="text-xs text-[#9b8d80]">
                                          Item Price
                                        </p>

                                        <p className="mt-1 font-semibold text-[#30241f]">
                                          ₹{formatAmount(
                                            item.price ||
                                            item.selling_price ||
                                            item.variant?.price ||
                                            0
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Address and Payment */}
                            <div className="grid grid-cols-1 gap-7 border-t border-[#eee5db] bg-[#fffdf9] p-5 sm:grid-cols-2 lg:p-7">

                              {/* Address */}
                              <div>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                  <FaMapMarkerAlt className="text-[#a77b51]" />
                                  Delivery Address
                                </div>

                                <p className="mt-3 text-sm font-medium">
                                  {order.address?.name || "-"}
                                </p>

                                <p className="mt-1 text-xs leading-6 text-[#817368]">
                                  {getAddress(order.address)}
                                </p>

                                <p className="mt-2 text-xs text-[#817368]">
                                  Phone: {order.address?.contact || "-"}
                                </p>
                              </div>

                              {/* Payment */}
                              <div>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                  <FaCreditCard className="text-[#a77b51]" />
                                  Payment Information
                                </div>

                                <p className="mt-3 text-sm">
                                  Method:{" "}
                                  <span className="font-medium capitalize">
                                    {order.paymentData?.method || "-"}
                                  </span>
                                </p>

                                <p className="mt-2 text-sm">
                                  Payment Status:{" "}
                                  <span className="font-medium capitalize">
                                    {order.paymentData?.status || "-"}
                                  </span>
                                </p>

                                {order.shipmentData?.awb_number && (
                                  <p className="mt-2 break-all text-xs text-[#817368]">
                                    AWB: {order.shipmentData.awb_number}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Order Total */}
                            <div className="flex flex-col justify-between gap-3 bg-[#30241f] p-5 text-white sm:flex-row sm:items-center lg:px-7">
                              <div className="flex items-center gap-2 text-sm">
                                <FaTruck className="text-[#d8b58e]" />
                                Order Total
                              </div>

                              <div className="text-xl font-semibold">
                                ₹{formatAmount(order.total)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* PRODUCT REVIEW MODAL */}
      {showReviewModal && selectedReviewOrder && selectedReviewItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eee5db] bg-[#30241f] p-5 text-white">
              <div>
                <h3 className="font-serif text-xl">{selectedExistingReview ? "Your Review" : "Write a Review"}</h3>
                <p className="mt-1 text-xs text-[#d8b58e]">
                  Order #{selectedReviewOrder.orderNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={closeReviewModal}
                className="text-xl text-white transition hover:text-[#d8b58e]"
                aria-label="Close review modal"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-5 p-5">
              {selectedExistingReview && (
                <div className="border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  You have already reviewed this product for this order. Your previous rating and comment are filled below.
                </div>
              )}
              <div className="border border-[#eee5db] bg-[#fffdf9] p-4">
                <p className="text-xs uppercase tracking-wider text-[#9b8d80]">
                  Product
                </p>
                <p className="mt-2 font-semibold text-[#30241f]">
                  {getItemName(selectedReviewItem)}
                </p>
                <p className="mt-1 text-xs text-[#817368]">
                  SKU: {selectedReviewItem.sku || "Not available"}
                </p>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-[#30241f]">
                  Your Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setReviewData((prev) => ({ ...prev, rating: star }))
                      }
                      className="text-3xl transition hover:scale-110"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <FaStar
                        className={
                          star <= reviewData.rating
                            ? "text-[#d49a42]"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-[#817368]">
                    {reviewData.rating ? `${reviewData.rating}/5` : "Select stars"}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#30241f]">
                  Your Comment *
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  rows={4}
                  required
                  placeholder="Share your experience with this product..."
                  className="w-full resize-none border border-[#d8cabc] px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-[#eee5db] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="border border-[#c9b8a6] px-6 py-3 text-sm transition hover:bg-[#f6eee5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#30241f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8d6846]"
                >
                  <FaStar />
                  {selectedExistingReview ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RETURN ORDER MODAL */}
      {showReturnModal && selectedReturnOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#eee5db] bg-[#30241f] p-5 text-white">
              <div>
                <h3 className="font-serif text-xl">
                  Return Order
                </h3>

                <p className="mt-1 text-xs text-[#d8b58e]">
                  Order #{selectedReturnOrder.orderNumber}
                </p>
              </div>

              <button
                type="button"
                disabled={returnLoading}
                onClick={closeReturnModal}
                className="text-xl text-white transition hover:text-[#d8b58e] disabled:opacity-50"
              >
                <FaTimes />
              </button>
            </div>

            {/* Return Form */}
            <form
              onSubmit={handleSubmitReturn}
              className="space-y-5 p-5"
            >

              {/* Payment Method */}
              <div className="border border-[#eee5db] bg-[#fffdf9] p-4">
                <p className="text-xs uppercase tracking-wider text-[#9b8d80]">
                  Payment Method
                </p>

                <p className="mt-2 font-semibold uppercase text-[#30241f]">
                  {selectedReturnOrder.paymentData?.method || "-"}
                </p>
              </div>

              {/* Return Reason */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Return Reason *
                </label>

                <textarea
                  name="reason"
                  value={returnData.reason}
                  onChange={handleReturnChange}
                  rows={3}
                  required
                  placeholder="Please enter your return reason..."
                  className="w-full resize-none border border-[#d8cabc] px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
                />
              </div>

              {/* COD Bank Details Only */}
              {normalizeStatus(
                selectedReturnOrder.paymentData?.method
              ) === "cod" && (
                  <div className="space-y-4 border border-[#eee5db] bg-[#fffdf9] p-4">

                    <div>
                      <h4 className="font-serif text-lg">
                        Bank Account Details
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-[#817368]">
                        Please provide your bank details to receive your COD refund.
                      </p>
                    </div>

                    {/* Account Holder */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Account Holder Name *
                      </label>

                      <input
                        type="text"
                        name="accountHolderName"
                        value={returnData.bankDetails.accountHolderName}
                        onChange={handleReturnChange}
                        required
                        placeholder="Enter account holder name"
                        className="w-full border border-[#d8cabc] px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
                      />
                    </div>

                    {/* Account Number */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Account Number *
                      </label>

                      <input
                        type="text"
                        name="accountNumber"
                        value={returnData.bankDetails.accountNumber}
                        onChange={handleReturnChange}
                        required
                        inputMode="numeric"
                        placeholder="Enter account number"
                        className="w-full border border-[#d8cabc] px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
                      />
                    </div>

                    {/* IFSC */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        IFSC Code *
                      </label>

                      <input
                        type="text"
                        name="ifscCode"
                        value={returnData.bankDetails.ifscCode}
                        onChange={handleReturnChange}
                        required
                        maxLength={11}
                        placeholder="Example: SBIN0001234"
                        className="w-full border border-[#d8cabc] px-4 py-3 text-sm uppercase outline-none focus:border-[#a77b51]"
                      />
                    </div>

                    {/* Account Type */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Account Type *
                      </label>

                      <select
                        name="accountType"
                        value={returnData.bankDetails.accountType}
                        onChange={handleReturnChange}
                        required
                        className="w-full border border-[#d8cabc] bg-white px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
                      >
                        <option value="savings">
                          Savings
                        </option>

                        <option value="current">
                          Current
                        </option>
                      </select>
                    </div>
                  </div>
                )}

              {/* Prepaid Message */}
              {normalizeStatus(
                selectedReturnOrder.paymentData?.method
              ) !== "cod" && (
                  <div className="border border-green-200 bg-green-50 p-4">
                    <p className="text-sm leading-6 text-green-800">
                      This is a prepaid order. Your refund will be processed using the original payment method. Bank details are not required.
                    </p>
                  </div>
                )}

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#eee5db] pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  disabled={returnLoading}
                  onClick={closeReturnModal}
                  className="border border-[#c9b8a6] px-6 py-3 text-sm transition hover:bg-[#f6eee5] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={returnLoading}
                  className="bg-[#30241f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8d6846] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {returnLoading
                    ? "Submitting..."
                    : "Submit Return Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
