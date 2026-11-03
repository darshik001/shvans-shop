import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiLayers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiHexagon,
} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FiGrid,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: FiPackage,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: FiShoppingCart,
    },
    {
      name: "Customers",
      path: "/admin/users",
      icon: FiUsers,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: FiLayers,
    },
    {
      name: "Coupons",
      path: "/admin/coupons",
      icon: FiLayers,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: FiSettings,
    },
  ];

  const handleLogout = () => {
    // અહીં તારા Redux logout action ને dispatch કરજે
    // dispatch(adminLogout());

    navigate("/admin", { replace: true });
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-[#211a18] p-2 text-white md:hidden"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#e9dfd9] bg-[#fffdfb] transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-[#eee5df] px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#211a18] text-[#d4a18a]">
            <FiHexagon size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-wider text-[#211a18]">
              SHVANS
            </h2>
            <p className="text-[10px] tracking-[3px] text-[#aa755f]">
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#b18a78]">
            Main Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                    ? "bg-[#211a18] text-white shadow-md"
                    : "text-[#74645c] hover:bg-[#f5ede8] hover:text-[#211a18]"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#eee5df] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#9b5949] transition hover:bg-[#f9eeea]"
          >
            <FiLogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;