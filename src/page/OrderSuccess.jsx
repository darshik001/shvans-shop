import { useLocation, useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiPackage,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Backend response માંથી Order
  const order = location.state?.order;

  // Order items (તારા model પ્રમાણે key adjust કરી શકાશે)
  const items =
    order?.items ||
    order?.products ||
    order?.orderItems ||
    [];

  // Total amount
  const totalAmount =
    order?.totalAmount ??
    order?.grandTotal ??
    order?.totalPrice ??
    order?.amount;

  // Product name
  const getProductName = (item) => {
    return (
      item.productId?.name ||
      item.product?.name ||
      item.name ||
      "Product"
    );
  };

  // Quantity
  const getQuantity = (item) => {
    return item.quantity ?? item.qty ?? 1;
  };

  // Price
  const getPrice = (item) => {
    return (
      item.price ??
      item.variant?.price ??
      item.product?.price ??
      0
    );
  };

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
          <FiPackage size={30} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Order Details Not Found
        </h2>

        <p className="text-gray-500 text-sm mt-2 text-center">
          Please check your orders from your profile.
        </p>

        <button
          onClick={() => navigate("/profile")}
          className="mt-6 bg-[#a77b51] text-white px-6 py-3 rounded-lg hover:bg-[#906843]"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f6] px-4 py-10 sm:py-14">

      <div className="max-w-3xl mx-auto">

        {/* Success Header */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5">
            <FiCheck size={40} strokeWidth={3} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mt-2">
            Thank you for your order. Your payment has been verified.
          </p>

        </div>

        {/* Order Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Order Information */}
          <div className="p-5 sm:p-7 border-b border-gray-100">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-[#f8f1ea] text-[#a77b51] rounded-xl flex items-center justify-center">
                <FiShoppingBag size={22} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Order Details
                </h2>

                <p className="text-xs text-gray-500">
                  Your order has been confirmed
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Order ID
                </p>

                <p className="font-semibold text-gray-800 break-all">
                  {order._id || order.orderId || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Order Date
                </p>

                <p className="font-semibold text-gray-800">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "Today"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Payment Status
                </p>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {order.paymentStatus || "Paid"}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Order Status
                </p>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {order.orderStatus || order.status || "Confirmed"}
                </span>
              </div>

            </div>
          </div>

          {/* Ordered Products */}
          {items.length > 0 && (
            <div className="p-5 sm:p-7 border-b border-gray-100">

              <h3 className="font-semibold text-gray-800 mb-4">
                Ordered Items
              </h3>

              <div className="space-y-4">

                {items.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center justify-between gap-4"
                  >

                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {getProductName(item)}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {getQuantity(item)}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-800 whitespace-nowrap">
                      ₹
                      {(
                        getPrice(item) * getQuantity(item)
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* Total */}
          {totalAmount !== undefined && (
            <div className="p-5 sm:p-7">

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Total Amount Paid
                </span>

                <span className="text-xl font-bold text-[#a77b51]">
                  ₹{Number(totalAmount).toLocaleString("en-IN")}
                </span>
              </div>

            </div>
          )}

        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">

          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center justify-center gap-2 bg-[#a77b51] hover:bg-[#906843] text-white px-7 py-3 rounded-lg font-medium transition"
          >
            Continue Shopping
            <FiArrowRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;