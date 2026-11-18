
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDashboardReposrt } from "../../toolkit/slices/admin/adminreport";

// const dashboardData = {
//   success: true,
//   period: "week",

//   stats: {
//     totalRevenue: 0,
//     revenueChange: 0,
//     totalOrders: 0,
//     ordersChange: 0,
//     totalProducts: 0,
//     productsChange: 0,
//     totalCustomers: 0,
//     customersChange: 0,
//   },

//   comparison: {
//     currentRevenue: 0,
//     previousRevenue: 0,
//     currentOrders: 0,
//     previousOrders: 0,
//   },

//   orderSummary: {
//     completedOrders: 0,
//     processingOrders: 0,
//     pendingOrders: 0,
//     total: 0,
//   },

//   recentOrders: [

//   ],

//   topProducts: [

//   ],

//   chartData: [
//     { day: "Mon", value: 0 },
//     { day: "Tue", value: 0 },
//     { day: "Wed", value: 0 },
//     { day: "Thu", value: 0 },
//     { day: "Fri", value: 0 },
//     { day: "Sat", value: 0 },
//     { day: "Sun", value: 0 },
//   ],
// };

const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Dashboard = () => {
  const { dashboardData } = useSelector((state) => state.AdminReport)
  const [selectedPeriod, setSelectedPeriod] = useState(dashboardData.period || "week");

  const dispatch = useDispatch()
  // Select change - currently only console
  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setSelectedPeriod(value);
    dispatch(GetDashboardReposrt(value))
  };

  const stats = [
    {
      title: "Total Revenue",
      value: formatPrice(dashboardData.stats.totalRevenue),
      change: dashboardData.stats.revenueChange,
      icon: "₹",
      description: "Compared to previous period",
    },
    {
      title: "Total Orders",
      value: dashboardData.stats.totalOrders.toLocaleString("en-IN"),
      change: dashboardData.stats.ordersChange,
      icon: "▤",
      description: "Compared to previous period",
    },
    {
      title: "Total Products",
      value: dashboardData.stats.totalProducts.toLocaleString("en-IN"),
      change: dashboardData.stats.productsChange,
      icon: "◇",
      description: "New products compared to previous period",
    },
    {
      title: "Total Customers",
      value: dashboardData.stats.totalCustomers.toLocaleString("en-IN"),
      change: dashboardData.stats.customersChange,
      icon: "♙",
      description: "New customers compared to previous period",
    },
  ];

  const summary = dashboardData.orderSummary;

  const summaryItems = [
    {
      label: "Completed Orders",
      value: summary.completedOrders,
    },
    {
      label: "Processing Orders",
      value: summary.processingOrders,
    },
    {
      label: "Pending Orders",
      value: summary.pendingOrders,
    },
  ];

  const maxChartValue = Math.max(
    ...dashboardData.chartData.map((item) => item.value),
    1
  );

  const getStatusClass = (status) => {
    const classes = {
      delivered: "bg-green-50 text-green-700",
      processing: "bg-blue-50 text-blue-700",
      pending: "bg-yellow-50 text-yellow-700",
      shipped: "bg-purple-50 text-purple-700",
      cancelled: "bg-red-50 text-red-700",
      out_for_delivery: "bg-orange-50 text-orange-700",
    };

    return classes[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] p-4 sm:p-6 lg:p-8">

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs tracking-[3px] text-[#b77b64] font-semibold mb-2">
            SHVANS ADMINISTRATION
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#211a18]">
            Dashboard Overview
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>


      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-[#eee8e4] rounded-2xl p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="text-2xl font-bold text-[#211a18] mt-3">
                  {item.value}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#f4ebe6] text-[#a66e58] flex items-center justify-center text-xl font-semibold">
                {item.icon}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5 flex-wrap">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md ${item.change >= 0
                  ? "text-green-700 bg-green-50"
                  : "text-red-700 bg-red-50"
                  }`}
              >
                {item.change >= 0 ? "+" : ""}
                {item.change}%
              </span>

              <span className="text-xs text-gray-400">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CHART AND SUMMARY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-7">

        {/* SALES CHART */}
        <div className="xl:col-span-2 bg-white border border-[#eee8e4] rounded-2xl p-5 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
            <div>
              <h2 className="text-lg font-semibold text-[#211a18]">
                Sales Analytics
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Your store's sales performance
              </p>
            </div>

            <select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="flex items-end justify-between gap-2 h-64 border-b border-l border-gray-100 px-2 relative">

            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="absolute left-0 right-0 border-t border-dashed border-gray-100"
                style={{ bottom: `${item * 25}%` }}
              />
            ))}

            {dashboardData.chartData.map((item, index) => (
              <div
                key={item.day}
                className="relative z-10 flex-1 flex flex-col items-center justify-end h-full gap-2"
              >
                <div
                  className={`w-full max-w-12 rounded-t-lg transition-all hover:opacity-80 ${index === dashboardData.chartData.length - 1
                    ? "bg-[#a66e58]"
                    : "bg-[#d8b5a5]"
                    }`}
                  style={{
                    height: `${(item.value / maxChartValue) * 100
                      }%`,
                    minHeight: item.value > 0 ? "4px" : "0px",
                  }}
                  title={formatPrice(item.value)}
                />

                <span className="text-xs text-gray-400 absolute -bottom-7">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#a66e58]" />
              <span className="text-xs text-gray-500">Sales Revenue</span>
            </div>

            <p className="text-sm font-semibold text-[#211a18]">
              {formatPrice(
                dashboardData.chartData.reduce(
                  (sum, item) => sum + item.value,
                  0
                )
              )}
            </p>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-[#211a18] text-white rounded-2xl p-6">
          <p className="text-xs tracking-[3px] text-[#c99883]">
            ORDER OVERVIEW
          </p>

          <h2 className="text-xl font-semibold mt-3">
            Order Summary
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Current order statistics
          </p>

          <div className="mt-8 space-y-6">
            {summaryItems.map((item) => {
              const percent = summary.total
                ? (item.value / summary.total) * 100
                : 0;

              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c99883] rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="/admin/orders"
            className="w-full mt-9 border border-white/20 hover:bg-white/10 rounded-xl py-3 text-sm transition flex items-center justify-center"
          >
            View All Orders →
          </a>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white border border-[#eee8e4] rounded-2xl mb-7 overflow-hidden">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-[#211a18]">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Latest customer orders
            </p>
          </div>

          <a
            href="/admin/orders"
            className="text-sm text-[#a66e58] font-semibold hover:text-[#211a18] transition"
          >
            View All Orders →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[750px]">
            <thead className="bg-[#faf8f6] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {dashboardData.recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#faf8f6] transition"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-[#a66e58]">
                    #{order.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#211a18] font-medium">
                    {order.customer}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
                    {order.product}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(order.date)}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-[#211a18]">
                    {formatPrice(order.amount)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status.replaceAll("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}

              {dashboardData.recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white border border-[#eee8e4] rounded-2xl p-5 sm:p-6">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#211a18]">
            Top Selling Products
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Your most popular products
          </p>
        </div>

        <div className="space-y-5">
          {dashboardData.topProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4 min-w-0">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f4ebe6] flex items-center justify-center text-[#a66e58] font-semibold">
                  0{index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#211a18] truncate">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-[#211a18]">
                  {formatPrice(product.price)}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {product.sold} sold
                </p>
              </div>
            </div>
          ))}

          {dashboardData.topProducts.length === 0 && (
            <p className="text-sm text-center text-gray-400 py-5">
              No selling products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
