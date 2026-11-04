
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
} from "react-icons/fi";
import { useSelector } from "react-redux";

const tabs = [
    { label: "Pending", value: "pending", icon: FiClock },
    { label: "Accepted", value: "accepted", icon: FiCheckCircle },
    { label: "Pickup", value: "pickup", icon: FiTruck },
    { label: "Delivered", value: "delivered", icon: FiPackage },
    { label: "Cancelled", value: "cancelled", icon: FiXCircle },
];

const acceptedStatuses = [
    "accepted",
    "processing",
    "shipped",
    "out_for_delivery",
];

const OrderList = ({
    onViewOrder,
    onAcceptOrders,
    onDownloadLabels,
    isAccepting = false,
}) => {
    const [activeTab, setActiveTab] = useState("pending");
    const [search, setSearch] = useState("");
    const [selectedOrders, setSelectedOrders] = useState([]);

    const { orders = [], isLoading } = useSelector(
        (state) => state.AdminOrder
    );

    // Tab change થાય ત્યારે selection clear કરો
    useEffect(() => {
        setSelectedOrders([]);
    }, [activeTab]);

    // Forward orders અને tab પ્રમાણે filtering
    const filteredOrders = useMemo(() => {
        let result = Array.isArray(orders)
            ? orders.filter((order) => order.type === "forward")
            : [];

        if (activeTab === "accepted") {
            result = result.filter((order) =>
                acceptedStatuses.includes(order.status)
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

    // Tab count
    const getTabCount = (tab) => {
        const forwardOrders = (orders || []).filter(
            (order) => order.type === "forward"
        );

        if (tab === "accepted") {
            return forwardOrders.filter((order) =>
                acceptedStatuses.includes(order.status)
            ).length;
        }

        return forwardOrders.filter(
            (order) => order.status === tab
        ).length;
    };

    // Selection allowed only on Pending and Accepted
    const canSelect = ["pending", "accepted"].includes(activeTab);

    // Select one order
    const handleSelectOrder = (orderId) => {
        setSelectedOrders((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
        );
    };

    // Select all / unselect all
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

    // Accept selected orders
    const handleAcceptOrders = () => {
        if (selectedOrders.length === 0) return;

        onAcceptOrders?.(selectedOrders);
    };

    // Download selected accepted orders' labels
    const handleDownloadLabels = () => {
        if (selectedOrders.length === 0) return;

        const selectedOrderData = filteredOrders.filter((order) =>
            selectedOrders.includes(order._id)
        );

        onDownloadLabels?.(selectedOrderData);
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatStatus = (status) =>
        status
            ?.replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="w-full min-h-screen bg-[#faf8f6] p-4 sm:p-6">

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

            {/* Search and Action Buttons */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                {/* Search */}
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

                    {/* Pending: Accept Button */}
                    {activeTab === "pending" &&
                        selectedOrders.length > 0 && (
                            <button
                                onClick={handleAcceptOrders}
                                disabled={isAccepting}
                                className="flex items-center gap-2 rounded-lg bg-[#a77b51] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#906843] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FiCheck size={17} />
                                {isAccepting
                                    ? "Accepting..."
                                    : `Accept Orders (${selectedOrders.length})`}
                            </button>
                        )}

                    {/* Accepted: Download Labels Button */}
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

                                {/* Checkbox only Pending and Accepted */}
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

                                        {/* Individual checkbox */}
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
                                            ₹{Number(order.total || 0).toLocaleString("en-IN")}
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
                                                onClick={() => onViewOrder?.(order)}
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
        </div>
    );
};

export default OrderList;
