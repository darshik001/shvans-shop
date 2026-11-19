
import { useEffect, useMemo, useState } from "react";
import {
    FiSearch,
    FiEye,
    FiPackage,
    FiTruck,
    FiCheckCircle,
    FiXCircle,
    FiClock,
    FiDownload,
    FiCheck,
    FiX,
    FiMapPin,
    FiUser,
    FiCreditCard,
    FiCalendar,
    FiHash,
    FiPhone,
    FiMail,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
    AcceptOrders,
    ClearOrdersmessage,
    DownloadLabels,
} from "../../toolkit/slices/admin/adminOrder";
import { toast } from "react-toastify";

const tabs = [
    { label: "Pending", value: "pending", icon: FiClock },
    { label: "Accepted", value: "accepted", icon: FiCheckCircle },
    { label: "Pickup", value: "pickup", icon: FiTruck },
    { label: "Delivered", value: "delivered", icon: FiPackage },
    { label: "Cancelled", value: "cancelled", icon: FiXCircle },
];

const acceptedStatuses = ["accepted", "processing"];
const pickupStatuses = ["shipped", "out_for_delivery"];

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatStatus = (status) =>
    status
        ?.replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()) || "-";

const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="min-w-0">
        <p className="mb-1 text-xs text-gray-400">{label}</p>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            {Icon && <Icon size={15} className="shrink-0 text-[#a77b51]" />}
            <span className="break-words">{value || "-"}</span>
        </div>
    </div>
);

const DetailSection = ({ title, icon: Icon, children }) => (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-100 bg-[#f8f5f2] px-5 py-3">
            {Icon && <Icon size={17} className="text-[#a77b51]" />}
            <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="p-5">{children}</div>
    </section>
);

const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    const address = order.address || {};
    const payment = order.paymentData || {};
    const shipment = order.shipmentData || {};

    const items = Array.isArray(order.items) ? order.items : [];

    const addressText = [
        address.address,
        address.addressLine1,
        address.addressLine2,
        address.landmark,
        address.city,
        address.state,
        address.pincode,
        address.country,
    ].filter(Boolean).join(", ");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
            onClick={onClose}
        >
            <div
                className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#faf8f6] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-7">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Order Details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Order #{order.orderNumber || "-"}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="overflow-y-auto p-4 sm:p-6">
                    <div className="space-y-5">

                        {/* Order Information */}
                        <DetailSection title="Order Information" icon={FiPackage}>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem
                                    label="Order Number"
                                    value={order.orderNumber}
                                    icon={FiHash}
                                />
                                <InfoItem
                                    label="Order ID"
                                    value={order._id}
                                    icon={FiHash}
                                />
                                <InfoItem
                                    label="Order Date"
                                    value={formatDate(order.createdAt)}
                                    icon={FiCalendar}
                                />
                                <InfoItem
                                    label="Order Status"
                                    value={formatStatus(order.status)}
                                />
                                <InfoItem
                                    label="Order Type"
                                    value={order.type}
                                />
                                <InfoItem
                                    label="Last Updated"
                                    value={formatDate(order.updatedAt)}
                                />
                            </div>
                        </DetailSection>

                        {/* Customer Details */}
                        <DetailSection title="Customer Details" icon={FiUser}>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem
                                    label="Customer Name"
                                    value={address.name}
                                    icon={FiUser}
                                />
                                <InfoItem
                                    label="Mobile Number"
                                    value={address.contact}
                                    icon={FiPhone}
                                />
                                <InfoItem
                                    label="Email"
                                    value={order.userId?.email}
                                    icon={FiMail}
                                />
                            </div>
                        </DetailSection>

                        {/* Delivery Address */}
                        <DetailSection title="Delivery Address" icon={FiMapPin}>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <InfoItem
                                    label="Receiver Name"
                                    value={address.name}
                                />
                                <InfoItem
                                    label="Contact Number"
                                    value={address.contact}
                                />
                                <div className="sm:col-span-2">
                                    <InfoItem
                                        label="Full Address"
                                        value={
                                            addressText ||
                                            address.fullAddress ||
                                            "-"
                                        }
                                    />
                                </div>
                            </div>
                        </DetailSection>

                        {/* Products */}
                        <DetailSection title="Ordered Products" icon={FiPackage}>
                            {items.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[650px] text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                                                <th className="px-3 py-3">Product</th>
                                                <th className="px-3 py-3">SKU</th>
                                                <th className="px-3 py-3">Price</th>
                                                <th className="px-3 py-3">Quantity</th>
                                                <th className="px-3 py-3 text-right">Total</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {items.map((item, index) => {
                                                const product =
                                                    item.productId ||
                                                    item.product ||
                                                    {};

                                                const productName =
                                                    item.name ||
                                                    product.name ||
                                                    "Product";

                                                const image = item.image_url



                                                const price =
                                                    item.price ??
                                                    item.sellingPrice ??
                                                    item.variant?.price ??
                                                    0;

                                                const quantity =
                                                    item.quantity ??
                                                    item.qty ??
                                                    item.qunity ??
                                                    1;

                                                return (
                                                    <tr key={item._id || index}>
                                                        <td className="px-3 py-4">
                                                            <div className="flex items-center gap-3">
                                                                {image ? (
                                                                    <img
                                                                        src={image}
                                                                        alt={productName}
                                                                        className="h-12 w-12 rounded-lg border border-gray-100 object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                                                                        <FiPackage className="text-gray-400" />
                                                                    </div>
                                                                )}

                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        {productName}
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        {item.variantName ||
                                                                            item.variant?.name ||
                                                                            ""}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-4 text-sm text-gray-600">
                                                            {item.sku || product.sku || "-"}
                                                        </td>

                                                        <td className="px-3 py-4 text-sm text-gray-600">
                                                            {money(price)}
                                                        </td>

                                                        <td className="px-3 py-4 text-sm text-gray-600">
                                                            {quantity}
                                                        </td>

                                                        <td className="px-3 py-4 text-right text-sm font-semibold text-gray-800">
                                                            {money(
                                                                item.total ??
                                                                Number(price) * Number(quantity)
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="py-5 text-center text-sm text-gray-400">
                                    No products found
                                </p>
                            )}
                        </DetailSection>

                        {/* Payment Details */}
                        <DetailSection title="Payment Details" icon={FiCreditCard}>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem
                                    label="Payment Method"
                                    value={payment.method}
                                />
                                <InfoItem
                                    label="Payment Status"
                                    value={formatStatus(payment.status)}
                                />
                                <InfoItem
                                    label="Payment ID"
                                    value={payment.razorpay_payment_id || payment.paymentId}
                                />
                                <InfoItem
                                    label="Razorpay Order ID"
                                    value={payment.razorpay_order_id}
                                />
                                <InfoItem
                                    label="Transaction ID"
                                    value={payment.transactionId}
                                />
                            </div>
                        </DetailSection>

                        {/* Shipment Details */}
                        <DetailSection title="Shipment Details" icon={FiTruck}>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem
                                    label="Shipment ID"
                                    value={shipment.shipment_id}
                                />
                                <InfoItem
                                    label="AWB Code"
                                    value={shipment.awb_code}
                                />
                                <InfoItem
                                    label="Courier Name"
                                    value={shipment.courier_name}
                                />
                                <InfoItem
                                    label="Courier Company ID"
                                    value={shipment.courier_company_id}
                                />
                                <InfoItem
                                    label="Shipment Status"
                                    value={formatStatus(shipment.status)}
                                />
                                <InfoItem
                                    label="Tracking URL"
                                    value={shipment.tracking_url}
                                />
                            </div>

                            {shipment.label_url && (
                                <a
                                    href={shipment.label_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#a77b51] px-4 py-2 text-sm font-medium text-white hover:bg-[#906843]"
                                >
                                    <FiDownload size={16} />
                                    Download Shipping Label
                                </a>
                            )}
                        </DetailSection>

                        {/* Order Summary */}
                        <DetailSection title="Order Summary" icon={FiCreditCard}>
                            <div className="ml-auto max-w-md space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{money(order.subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Discount</span>
                                    <span>{money(order.discount)}</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Coupon Discount</span>
                                    <span>{money(order.couponDiscount)}</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping Charge</span>
                                    <span>{money(order.shippingCharges ?? order.shippingCharge)}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-lg font-bold text-[#a77b51]">
                                        <span>Grand Total</span>
                                        <span>{money(order.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </DetailSection>

                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end border-t border-gray-200 bg-white px-5 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-[#a77b51] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#906843]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrderList = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [search, setSearch] = useState("");
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const {
        orders = [],
        isLoading,
        ErrMessage,
        SuccessMessage,
        label_url,
    } = useSelector((state) => state.AdminOrder);

    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedOrders([]);
    }, [activeTab]);

    // Filter Forward Orders
    const filteredOrders = useMemo(() => {
        let result = Array.isArray(orders)
            ? orders.filter((order) => order.type === "forward")
            : [];

        if (activeTab === "accepted") {
            result = result.filter((order) =>
                acceptedStatuses.includes(order.status)
            );
        } else if (activeTab === "pickup") {
            result = result.filter((order) =>
                pickupStatuses.includes(order.status)
            );
        } else {
            result = result.filter(
                (order) => order.status === activeTab
            );
        }

        if (search.trim()) {
            const searchValue = search.toLowerCase();

            result = result.filter((order) =>
                [
                    order.orderNumber,
                    order.address?.name,
                    order.address?.contact,
                    order.address?.city,
                ]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(searchValue)
                    )
            );
        }

        return result;
    }, [orders, activeTab, search]);

    // Tab Count
    const getTabCount = (tab) => {
        const forwardOrders = (orders || []).filter(
            (order) => order.type === "forward"
        );

        if (tab === "accepted") {
            return forwardOrders.filter((order) =>
                acceptedStatuses.includes(order.status)
            ).length;
        }

        if (tab === "pickup") {
            return forwardOrders.filter((order) =>
                pickupStatuses.includes(order.status)
            ).length;
        }

        return forwardOrders.filter(
            (order) => order.status === tab
        ).length;
    };

    const canSelect = ["pending", "accepted"].includes(activeTab);

    const handleSelectOrder = (orderId) => {
        setSelectedOrders((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
        );
    };

    const isAllSelected =
        filteredOrders.length > 0 &&
        filteredOrders.every((order) =>
            selectedOrders.includes(order._id)
        );

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(
                filteredOrders.map((order) => order._id)
            );
        }
    };

    // Accept Selected Orders
    const handleAcceptOrders = () => {
        if (selectedOrders.length === 0) {
            toast.error("Order Not Selected");
            return;
        }

        dispatch(AcceptOrders(selectedOrders));
    };

    // Download Labels
    const handleDownloadLabels = () => {
        if (selectedOrders.length === 0) return;

        const selectedOrderData = filteredOrders.filter(
            (order) => selectedOrders.includes(order._id)
        );

        const shipmentIds = selectedOrderData
            .map((item) => item.shipmentData?.shipment_id)
            .filter(Boolean);

        if (shipmentIds.length === 0) {
            toast.error("Shipment IDs not found");
            return;
        }

        dispatch(DownloadLabels(shipmentIds));
    };

    // Success and Error Messages
    useEffect(() => {
        if (SuccessMessage) {
            toast.success(SuccessMessage);
            dispatch(ClearOrdersmessage());
        }

        if (ErrMessage) {
            toast.error(ErrMessage);
            dispatch(ClearOrdersmessage());
        }
    }, [SuccessMessage, ErrMessage, dispatch]);

    // Open Shipping Label
    useEffect(() => {
        if (label_url) {
            window.open(label_url, "_blank", "noopener,noreferrer");
            dispatch(ClearOrdersmessage());
        }
    }, [label_url, dispatch]);



    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Orders
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage and track all your customer orders.
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-5 overflow-x-auto">
                <div className="flex min-w-max gap-2 border-b border-gray-200">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.value;

                        return (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${isActive
                                    ? "border-[#a77b51] text-[#a77b51]"
                                    : "border-transparent text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                <Icon size={17} />
                                {tab.label}

                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs ${isActive
                                        ? "bg-[#f1e6dc] text-[#906843]"
                                        : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {getTabCount(tab.value)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search and Actions */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                    <FiSearch
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search order number, name, mobile..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#a77b51]"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <p className="whitespace-nowrap text-sm text-gray-500">
                        {filteredOrders.length} Orders
                    </p>

                    {activeTab === "pending" &&
                        selectedOrders.length > 0 && (
                            <button
                                onClick={handleAcceptOrders}
                                disabled={isLoading}
                                className="flex items-center gap-2 rounded-lg bg-[#a77b51] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#906843] disabled:opacity-60"
                            >
                                <FiCheck size={17} />
                                {isLoading
                                    ? "Accepting..."
                                    : `Accept Orders (${selectedOrders.length})`}
                            </button>
                        )}

                    {activeTab === "accepted" &&
                        selectedOrders.length > 0 && (
                            <button
                                onClick={handleDownloadLabels}
                                className="flex items-center gap-2 rounded-lg bg-[#a77b51] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#906843]"
                            >
                                <FiDownload size={17} />
                                Download Labels ({selectedOrders.length})
                            </button>
                        )}
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead className="bg-[#f8f5f2]">
                            <tr className="text-xs uppercase tracking-wide text-gray-500">
                                {canSelect && (
                                    <th className="w-12 px-5 py-4">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                            disabled={filteredOrders.length === 0}
                                            className="h-4 w-4 cursor-pointer accent-[#a77b51]"
                                            title="Select All"
                                        />
                                    </th>
                                )}

                                <th className="px-5 py-4">Order</th>
                                <th className="px-5 py-4">Customer</th>
                                <th className="px-5 py-4">Items</th>
                                <th className="px-5 py-4">Payment</th>
                                <th className="px-5 py-4">Total</th>
                                <th className="px-5 py-4">Date</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={canSelect ? 9 : 8}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={canSelect ? 9 : 8}
                                        className="py-14 text-center"
                                    >
                                        <FiPackage
                                            size={35}
                                            className="mx-auto mb-3 text-gray-300"
                                        />
                                        <p className="font-medium text-gray-600">
                                            No {activeTab} orders found
                                        </p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            Orders will appear here when available.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="transition hover:bg-[#faf8f6]"
                                    >
                                        {canSelect && (
                                            <td className="px-5 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrders.includes(order._id)}
                                                    onChange={() =>
                                                        handleSelectOrder(order._id)
                                                    }
                                                    className="h-4 w-4 cursor-pointer accent-[#a77b51]"
                                                />
                                            </td>
                                        )}

                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-gray-800">
                                                #{order.orderNumber}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {order._id}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="font-medium text-gray-800">
                                                {order.address?.name || "-"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {order.address?.contact || "-"}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {order.items?.length || 0} Items
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium capitalize text-gray-700">
                                                {order.paymentData?.method || "-"}
                                            </p>
                                            <p className="mt-1 text-xs capitalize text-gray-400">
                                                {order.paymentData?.status || "-"}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-gray-800">
                                            {money(order.total)}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-500">
                                            {formatDate(order.createdAt)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex rounded-full bg-[#f1e6dc] px-3 py-1 text-xs font-medium text-[#906843]">
                                                {formatStatus(order.status)}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="inline-flex items-center gap-2 rounded-lg border border-[#a77b51] px-3 py-2 text-xs font-medium text-[#a77b51] transition hover:bg-[#a77b51] hover:text-white"
                                            >
                                                <FiEye size={15} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
};

export default OrderList;
