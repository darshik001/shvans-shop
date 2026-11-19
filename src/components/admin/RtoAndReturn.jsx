
import { useState } from "react";
import {
    FiEye,
    FiX,
    FiSearch,
    FiPackage,
    FiTruck,
    FiMapPin,
    FiCreditCard,
    FiRefreshCw,
    FiUser,
    FiCalendar,
    FiArrowUpRight,
    FiCopy,
    FiCheckCircle,
} from "react-icons/fi";
import { useSelector } from "react-redux";



const Info = ({ label, value }) => (
    <div className="min-w-0">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-800 break-words">
            {value || "N/A"}
        </p>
    </div>
);

const Section = ({ title, icon: Icon, children }) => (
    <section className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 bg-[#faf8f6] border-b border-gray-200">
            <Icon className="text-[#a77b51] text-lg" />
            <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>

        <div className="p-5">{children}</div>
    </section>
);
const RtoAndReturn = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState("");
    const [refundId, setRefundId] = useState("");
    const { rtoAndReturn } = useSelector((state) => state.AdminOrder)

    const filteredOrders = rtoAndReturn.filter((order) => {
        const value = search.toLowerCase();

        return (
            order.orderNumber?.toLowerCase().includes(value) ||
            order.userId?.name?.toLowerCase().includes(value) ||
            order.userId?.email?.toLowerCase().includes(value) ||
            order.type?.toLowerCase().includes(value)
        );
    });



    const handleView = (order) => {
        setSelectedOrder(order);
        setRefundId("");
    };

    const handleRefundSubmit = (e) => {
        e.preventDefault();

        if (!refundId.trim()) return;

        console.log("Refund Order:", selectedOrder);
        console.log("Order ID:", selectedOrder._id);
        console.log("Refund ID:", refundId);

        setRefundId("");
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const formatPrice = (price) =>
        `₹${Number(price || 0).toLocaleString("en-IN")}`;

    const statusStyle = (status) => {
        const value = status?.toLowerCase();

        if (["refunded", "delivered", "completed", "paid"].includes(value)) {
            return "bg-green-50 text-green-700 border-green-200";
        }

        if (["pending", "processing"].includes(value)) {
            return "bg-amber-50 text-amber-700 border-amber-200";
        }

        if (["cancelled", "failed"].includes(value)) {
            return "bg-red-50 text-red-700 border-red-200";
        }

        return "bg-[#a77b51]/10 text-[#906843] border-[#a77b51]/20";
    };



    // const handleCopy = (value) => {
    //     if (value) {
    //         navigator.clipboard.writeText(String(value));
    //     }
    // };

    return (
        <div className="space-y-6">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#211a18]">
                        RTO & Return Orders
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage returned orders, RTO shipments and refunds
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#a77b51]/10 flex items-center justify-center">
                        <FiPackage className="text-[#a77b51] text-xl" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Total Orders</p>
                        <h3 className="text-xl font-bold text-gray-800">
                            {rtoAndReturn.length}
                        </h3>
                    </div>
                </div>
            </div>

            {/* SEARCH */}

            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5 shadow-sm">
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search order number, customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#a77b51] focus:ring-2 focus:ring-[#a77b51]/10 transition"
                    />
                </div>
            </div>

            {/* ORDERS TABLE */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead className="bg-[#f8f5f2]">
                            <tr className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                                <th className="px-5 py-4">Order Number</th>
                                <th className="px-5 py-4">Customer</th>
                                <th className="px-5 py-4">Type</th>
                                <th className="px-5 py-4">Total</th>
                                <th className="px-5 py-4">Order Status</th>
                                <th className="px-5 py-4">Refund Status</th>
                                <th className="px-5 py-4">Date</th>
                                <th className="px-5 py-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="hover:bg-[#faf8f6] transition"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-gray-800 text-sm">
                                                {order.orderNumber}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-sm text-gray-800">
                                                {order.userId?.name || "N/A"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {order.userId?.phone || "N/A"}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${order.type === "rto"
                                                    ? "bg-orange-50 text-orange-700"
                                                    : "bg-[#a77b51]/10 text-[#906843]"
                                                    }`}
                                            >
                                                {order.type?.toUpperCase()}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-sm text-gray-800">
                                            {formatPrice(order.total)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${statusStyle(order.rtoData?.status || order.returnData?.status)}`}
                                            >
                                                {order.rtoData?.status || order.returnData?.status || "N/A"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${statusStyle(
                                                    order.refundData?.status
                                                )}`}
                                            >
                                                {order.refundData?.status || "N/A"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {formatDate(order.createdAt)}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <button
                                                onClick={() => handleView(order)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#a77b51] hover:bg-[#906843] text-white text-sm font-semibold transition"
                                            >
                                                <FiEye />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="py-16 text-center">
                                        <FiPackage className="mx-auto text-4xl text-gray-300 mb-3" />
                                        <p className="text-gray-600 font-semibold">
                                            No RTO or Return Orders Found
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Try searching with another keyword
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-5 py-4 border-t border-gray-100 text-sm text-gray-500">
                    Showing {filteredOrders.length} of {rtoAndReturn.length} orders
                </div>
            </div>

            {/* ORDER DETAILS MODAL */}

            {selectedOrder && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        className="bg-white w-full max-w-5xl max-h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between px-5 md:px-7 py-5 border-b border-gray-200 bg-white">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Order Details
                                </h2>

                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="text-sm font-semibold text-[#a77b51]">
                                        {selectedOrder.orderNumber}
                                    </span>

                                    <span className="text-xs px-2.5 py-1 rounded-md bg-[#a77b51]/10 text-[#906843] font-bold uppercase">
                                        {selectedOrder.type}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-gray-600 transition"
                            >
                                <FiX size={21} />
                            </button>
                        </div>

                        {/* MODAL CONTENT */}

                        <div className="overflow-y-auto p-4 md:p-6 space-y-5">

                            {/* CUSTOMER */}

                            <Section title="Customer Details" icon={FiUser}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    <Info
                                        label="Customer Name"
                                        value={selectedOrder.userId?.name}
                                    />

                                    <Info
                                        label="Email Address"
                                        value={selectedOrder.userId?.email}
                                    />

                                    <Info
                                        label="Phone Number"
                                        value={selectedOrder.userId?.phone}
                                    />

                                    <Info
                                        label="Order Date"
                                        value={formatDate(selectedOrder.createdAt)}
                                    />
                                </div>
                            </Section>

                            {/* ADDRESS */}

                            <Section title="Address Details" icon={FiMapPin}>
                                <div className="bg-[#faf8f6] border border-gray-100 rounded-xl p-4">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        {selectedOrder.address?.name}
                                    </h4>

                                    <p className="text-sm text-gray-600 leading-6">
                                        {selectedOrder.address?.line1}
                                        <br />
                                        {selectedOrder.address?.line2}
                                        <br />
                                        {selectedOrder.address?.city},{" "}
                                        {selectedOrder.address?.state},{" "}
                                        {selectedOrder.address?.country}
                                        <br />
                                        PIN: {selectedOrder.address?.zipcode}
                                        <br />
                                        Contact: {selectedOrder.address?.contact}
                                    </p>
                                </div>
                            </Section>

                            {/* PRODUCTS */}

                            <Section title="Product Details" icon={FiPackage}>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item, index) => (
                                        <div
                                            key={item.variant_id || index}
                                            className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-3 border border-gray-200 rounded-xl"
                                        >
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-800 text-sm">
                                                    {item.name}
                                                </h4>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    SKU: {item.sku}
                                                </p>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-bold text-gray-800">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="max-w-sm ml-auto mt-5 space-y-3">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Discount</span>
                                        <span>{formatPrice(selectedOrder.discount)}</span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping Charges</span>
                                        <span>{formatPrice(selectedOrder.shippingcharges)}</span>
                                    </div>

                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <span className="font-bold text-gray-800">
                                            Grand Total
                                        </span>
                                        <span className="font-bold text-lg text-[#a77b51]">
                                            {formatPrice(selectedOrder.total)}
                                        </span>
                                    </div>
                                </div>
                            </Section>

                            {/* SHIPMENT */}

                            <Section title="Shipment Details" icon={FiTruck}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    <Info
                                        label="Shipment ID"
                                        value={selectedOrder.shipmentData?.shipment_id}
                                    />

                                    <Info
                                        label="Shiprocket Order ID"
                                        value={selectedOrder.shipmentData?.shiprocket_order_id}
                                    />

                                    <Info
                                        label="AWB Number"
                                        value={selectedOrder.shipmentData?.awb_number}
                                    />

                                    <Info
                                        label="Courier Partner"
                                        value={selectedOrder.shipmentData?.courier_partner}
                                    />

                                    <Info
                                        label="Courier ID"
                                        value={selectedOrder.shipmentData?.courier_id}
                                    />

                                    <Info
                                        label="Order Status"
                                        value={selectedOrder.status}
                                    />
                                </div>
                            </Section>

                            {/* RTO / RETURN */}

                            <Section
                                title={
                                    selectedOrder.type === "rto"
                                        ? "RTO Details"
                                        : "Return Details"
                                }
                                icon={FiRefreshCw}
                            >
                                {selectedOrder.type === "rto" ? (
                                    selectedOrder.rtoData ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                            <Info
                                                label="RTO Status"
                                                value={selectedOrder.rtoData.status}
                                            />

                                            <Info
                                                label="RTO Completed At"
                                                value={formatDate(selectedOrder.rtoData.completeAt)}
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No RTO details available
                                        </p>
                                    )
                                ) : selectedOrder.returnData ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        <Info
                                            label="Return Status"
                                            value={selectedOrder.returnData.status}
                                        />

                                        <Info
                                            label="Return Reason"
                                            value={selectedOrder.returnData.reason}
                                        />

                                        <Info
                                            label="Return AWB"
                                            value={selectedOrder.returnData.awb}
                                        />

                                        <Info
                                            label="Courier Name"
                                            value={selectedOrder.returnData.courier_name}
                                        />

                                        <Info
                                            label="Courier ID"
                                            value={selectedOrder.returnData.courier_id}
                                        />

                                        <Info
                                            label="Pickup Scheduled Date"
                                            value={selectedOrder.returnData.pickup_scheduled_date}
                                        />

                                        <Info
                                            label="Return Order ID"
                                            value={selectedOrder.returnData.order_id}
                                        />

                                        <Info
                                            label="Return Shipment ID"
                                            value={selectedOrder.returnData.shipment_id}
                                        />

                                        <Info
                                            label="Completed At"
                                            value={formatDate(selectedOrder.returnData.completeAt)}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No Return details available
                                    </p>
                                )}
                            </Section>

                            {/* PAYMENT */}

                            <Section title="Payment Details" icon={FiCreditCard}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Info
                                        label="Payment Method"
                                        value={selectedOrder.paymentData?.method}
                                    />

                                    <Info
                                        label="Payment Status"
                                        value={selectedOrder.paymentData?.status}
                                    />

                                    <Info
                                        label="Razorpay Order ID"
                                        value={selectedOrder.paymentData?.razorpay_order_id}
                                    />

                                    <Info
                                        label="Razorpay Payment ID"
                                        value={selectedOrder.paymentData?.razorpay_payment_id}
                                    />

                                    <Info
                                        label="Payment Completed At"
                                        value={formatDate(selectedOrder.paymentData?.completeAt)}
                                    />
                                </div>
                            </Section>

                            {/* REFUND */}

                            <Section title="Refund Details" icon={FiRefreshCw}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    <Info
                                        label="Refund Method"
                                        value={selectedOrder.refundData?.method}
                                    />

                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">
                                            Refund Status
                                        </p>

                                        <span
                                            className={`inline-flex px-3 py-1.5 rounded-lg border text-xs font-bold ${statusStyle(
                                                selectedOrder.refundData?.status
                                            )}`}
                                        >
                                            {selectedOrder.refundData?.status || "N/A"}
                                        </span>
                                    </div>

                                    <Info
                                        label="Refund ID"
                                        value={selectedOrder.refundData?.refundId}
                                    />

                                    <Info
                                        label="Refunded At"
                                        value={formatDate(selectedOrder.refundData?.refundedAt)}
                                    />
                                </div>

                                {/* BANK DETAILS */}

                                {selectedOrder.refundData?.method?.toLowerCase() === "cod" &&
                                    selectedOrder.refundData?.accountDetails && (
                                        <div className="mt-6 rounded-xl border border-[#a77b51]/20 overflow-hidden">
                                            <div className="bg-[#a77b51]/10 px-4 py-3">
                                                <h4 className="font-bold text-[#906843] flex items-center gap-2">
                                                    <FiCreditCard />
                                                    Customer Bank Account Details
                                                </h4>
                                            </div>

                                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <Info
                                                    label="Account Holder Name"
                                                    value={
                                                        selectedOrder.refundData.accountDetails
                                                            .accountHolderName
                                                    }
                                                />

                                                <Info
                                                    label="Account Number"
                                                    value={
                                                        selectedOrder.refundData.accountDetails
                                                            .accountNumber
                                                    }
                                                />

                                                <Info
                                                    label="IFSC Code"
                                                    value={
                                                        selectedOrder.refundData.accountDetails.ifscCode
                                                    }
                                                />

                                                <Info
                                                    label="Account Type"
                                                    value={
                                                        selectedOrder.refundData.accountDetails.accountType
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                {/* PREPAID REFUND */}

                                {selectedOrder.refundData?.method?.toLowerCase() ===
                                    "prepaid" && (
                                        <div className="mt-5 p-4 bg-[#faf8f6] border border-gray-200 rounded-xl">
                                            <h4 className="font-semibold text-gray-800 mb-2">
                                                Prepaid Refund
                                            </h4>

                                            <p className="text-sm text-gray-500">
                                                Refund will be processed through the original payment
                                                method.
                                            </p>
                                        </div>
                                    )}

                                {/* PENDING REFUND FORM */}

                                {selectedOrder.refundData?.status?.toLowerCase() ===
                                    "pending" && (
                                        <form
                                            onSubmit={handleRefundSubmit}
                                            className="mt-6 p-5 bg-[#faf8f6] border border-[#a77b51]/20 rounded-xl"
                                        >
                                            <div className="mb-4">
                                                <h4 className="font-bold text-gray-800">
                                                    Update Refund ID
                                                </h4>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    Enter the refund transaction ID after processing
                                                    the refund.
                                                </p>
                                            </div>

                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Refund ID
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter Refund ID"
                                                value={refundId}
                                                onChange={(e) => { setRefundId(e.target.value); }}
                                                required
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#a77b51] focus:ring-2 focus:ring-[#a77b51]/10 transition"
                                            />

                                            <button
                                                type="submit"
                                                className="mt-4 px-6 py-3 rounded-xl bg-[#a77b51] hover:bg-[#906843] text-white font-semibold text-sm flex items-center gap-2 transition"
                                            >
                                                <FiCheckCircle />
                                                Submit Refund ID
                                            </button>
                                        </form>
                                    )}
                            </Section>
                        </div>

                        {/* FOOTER */}

                        <div className="px-5 md:px-7 py-4 border-t border-gray-200 flex justify-end bg-white">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-6 py-2.5 bg-[#a77b51] hover:bg-[#906843] text-white rounded-xl text-sm font-semibold transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RtoAndReturn;
