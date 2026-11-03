
import React from "react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹2,45,890",
    change: "+12.5%",
    icon: "₹",
    description: "Compared to last month",
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    icon: "▤",
    description: "Compared to last month",
  },
  {
    title: "Total Products",
    value: "356",
    change: "+4.3%",
    icon: "◇",
    description: "Active products",
  },
  {
    title: "Total Customers",
    value: "2,845",
    change: "+15.8%",
    icon: "♙",
    description: "Registered customers",
  },
];

const orders = [
  {
    id: "#SHV-1025",
    customer: "Priya Sharma",
    product: "Gold Necklace",
    date: "30 Oct 2026",
    amount: "₹12,500",
    status: "Delivered",
  },
  {
    id: "#SHV-1024",
    customer: "Rahul Patel",
    product: "Diamond Ring",
    date: "29 Oct 2026",
    amount: "₹25,800",
    status: "Processing",
  },
  {
    id: "#SHV-1023",
    customer: "Neha Shah",
    product: "Pearl Earrings",
    date: "29 Oct 2026",
    amount: "₹8,900",
    status: "Pending",
  },
  {
    id: "#SHV-1022",
    customer: "Amit Mehta",
    product: "Gold Bracelet",
    date: "28 Oct 2026",
    amount: "₹18,200",
    status: "Delivered",
  },
];

const products = [
  { name: "Gold Necklace", category: "Necklace", sold: 128, price: "₹12,500" },
  { name: "Diamond Ring", category: "Rings", sold: 96, price: "₹25,800" },
  { name: "Pearl Earrings", category: "Earrings", sold: 84, price: "₹8,900" },
];

const chartData = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 42 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 68 },
];

const Dashboard = () => {
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

        <button className="bg-[#211a18] hover:bg-[#3b2d28] text-white px-5 py-3 rounded-xl text-sm font-medium transition">
          + Add New Product
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {stats.map((item, index) => (
          <div
            key={index}
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

            <div className="flex items-center gap-2 mt-5">
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md">
                {item.change}
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
                Your store's weekly performance
              </p>
            </div>

            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
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

            {chartData.map((item, index) => (
              <div
                key={item.day}
                className="relative z-10 flex-1 flex flex-col items-center justify-end h-full gap-2"
              >
                <div
                  className={`w-full max-w-12 rounded-t-lg transition-all hover:opacity-80 ${
                    index === 5 ? "bg-[#a66e58]" : "bg-[#d8b5a5]"
                  }`}
                  style={{ height: `${item.value}%` }}
                  title={`${item.value}%`}
                />
                <span className="text-xs text-gray-400 absolute -bottom-7">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#a66e58]" />
            <span className="text-xs text-gray-500">Weekly sales</span>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-[#211a18] text-white rounded-2xl p-6">
          <p className="text-xs tracking-[3px] text-[#c99883]">
            ORDER OVERVIEW
          </p>

          <h2 className="text-xl font-semibold mt-3">Order Summary</h2>
          <p className="text-sm text-gray-400 mt-1">
            Current order statistics
          </p>

          <div className="mt-8 space-y-6">
            {[
              { label: "Completed Orders", value: 845, percent: 85 },
              { label: "Processing Orders", value: 245, percent: 55 },
              { label: "Pending Orders", value: 158, percent: 35 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c99883] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-9 border border-white/20 hover:bg-white/10 rounded-xl py-3 text-sm transition">
            View All Orders →
          </button>
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

          <button className="text-sm text-[#a66e58] font-semibold hover:text-[#211a18]">
            View All Orders →
          </button>
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#faf8f6] transition">
                  <td className="px-6 py-4 text-sm font-semibold text-[#a66e58]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#211a18] font-medium">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#211a18]">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : order.status === "Processing"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
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
            Your most popular jewellery products
          </p>
        </div>

        <div className="space-y-5">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#f4ebe6] flex items-center justify-center text-[#a66e58] font-semibold">
                  0{index + 1}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#211a18]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-[#211a18]">
                  {product.price}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {product.sold} sold
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
