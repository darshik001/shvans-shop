
import { useEffect, useState } from "react";
import {
    FiSearch,
    FiMail,
    FiPhone,
    FiCalendar,
    FiMessageSquare,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
    ClearRepostmessage,
    UpdateInquiryes
} from "../../toolkit/slices/admin/adminreport";
import { toast } from "react-toastify";

const Inquiries = () => {
    const {
        inquiryes,
        successMessage,
        errMesage
    } = useSelector((state) => state.AdminReport);

    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Update Inquiry Status
    const handleStatus = (status, inquiry) => {
        const data = {
            _id: inquiry._id,
            status: status
        };

        dispatch(UpdateInquiryes(data));
    };

    // Search and Filter
    const filteredInquiries = (inquiryes || []).filter((item) => {
        const searchMatch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.phone?.includes(search) ||
            item.subject?.toLowerCase().includes(search.toLowerCase());

        const statusMatch =
            statusFilter === "all" || item.status === statusFilter;

        return searchMatch && statusMatch;
    });

    // Toast Messages
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
        }

        if (errMesage) {
            toast.error(errMesage);
        }

        dispatch(ClearRepostmessage())
    }, [successMessage, errMesage, dispatch]);

    return (
        <div className="p-4 md:p-6 space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Inquiries
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage all customer inquiries here.
                    </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
                    <p className="text-xs text-gray-500">
                        Total Inquiries
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800">
                        {inquiryes?.length || 0}
                    </h2>
                </div>

            </div>

            {/* Search & Filter */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3">

                <div className="relative flex-1">

                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search name, email, phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#a66e58] focus:ring-2 focus:ring-[#a66e58]/10 transition"
                    />

                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#a66e58] bg-white cursor-pointer"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                </select>

            </div>

            {/* Table */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm text-left border-collapse">

                        {/* Table Header */}
                        <thead className="bg-[#faf8f7]">

                            <tr className="border-b border-gray-100">

                                <th className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                                    #
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                                    Customer
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                                    Contact
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                                    Subject
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-500">
                                    Message
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                                    Date
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        {/* Table Body */}
                        <tbody>

                            {filteredInquiries.length > 0 ? (

                                filteredInquiries.map((item, index) => (

                                    <tr
                                        key={item._id || index}
                                        className="border-b border-gray-100 last:border-0 hover:bg-[#faf8f7]/70 transition-colors"
                                    >

                                        {/* Index */}
                                        <td className="px-6 py-5 text-gray-400 font-medium">
                                            {index + 1}
                                        </td>

                                        {/* Customer */}
                                        <td className="px-6 py-5">

                                            <p className="font-semibold text-gray-800 whitespace-nowrap">
                                                {item.name || "N/A"}
                                            </p>

                                        </td>

                                        {/* Contact */}
                                        <td className="px-6 py-5">

                                            <div className="space-y-2">

                                                <p className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                                                    <FiMail className="text-[#a66e58]" size={14} />
                                                    {item.email || "N/A"}
                                                </p>

                                                <p className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                                                    <FiPhone className="text-[#a66e58]" size={14} />
                                                    {item.phone || "N/A"}
                                                </p>

                                            </div>

                                        </td>

                                        {/* Subject */}
                                        <td className="px-6 py-5">

                                            <p className="font-medium text-gray-700 min-w-[120px]">
                                                {item.subject || "N/A"}
                                            </p>

                                        </td>

                                        {/* Message */}
                                        <td className="px-6 py-5 max-w-[260px]">

                                            <p
                                                className="text-gray-500 line-clamp-2 leading-6"
                                                title={item.message}
                                            >
                                                {item.message || "N/A"}
                                            </p>

                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-5 text-gray-500 whitespace-nowrap">

                                            <div className="flex items-center gap-2">

                                                <FiCalendar
                                                    className="text-[#a66e58]"
                                                    size={14}
                                                />

                                                {item.createdAt
                                                    ? new Date(item.createdAt).toLocaleDateString()
                                                    : "N/A"}

                                            </div>

                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5">

                                            <select
                                                value={item.status || "pending"}
                                                onChange={(e) =>
                                                    handleStatus(e.target.value, item)
                                                }
                                                className={`px-3 py-2 rounded-full text-xs font-semibold outline-none cursor-pointer border transition-all ${item.status === "resolved"
                                                    ? "bg-green-50 text-green-700 border-green-100"
                                                    : "bg-amber-50 text-amber-700 border-amber-100"
                                                    }`}
                                            >

                                                <option value="pending">
                                                    Pending
                                                </option>

                                                <option value="resolved">
                                                    Resolved
                                                </option>

                                            </select>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="7" className="text-center py-16">

                                        <div className="flex flex-col items-center">

                                            <div className="w-14 h-14 rounded-full bg-[#faf3f0] flex items-center justify-center mb-3">

                                                <FiMessageSquare className="text-2xl text-[#a66e58]" />

                                            </div>

                                            <p className="text-gray-700 font-semibold">
                                                No inquiries found
                                            </p>

                                            <p className="text-sm text-gray-400 mt-1">
                                                Customer inquiries will appear here.
                                            </p>

                                        </div>

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

export default Inquiries;
