import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, AccessToken } = useSelector((state) => state.userAuth);
  const { carts } = useSelector((state) => state.carts);
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMobileMenu = () => setMobileMenu(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9ddd0] bg-[#fffdf9]/95 text-[#30241f] backdrop-blur-md">

      {/* Announcement Bar */}
      <div className="bg-[#30241f] px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[2px] text-white sm:text-xs sm:tracking-[3px]">
        A little luxury, every day — discover your signature scent
      </div>

      {/* Main Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center"
        >
          <img
            src="/shveraa.png"
            alt="SHVANS Fragrance"
            className="h-12 w-auto max-w-[180px] object-contain sm:h-14 sm:max-w-[200px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium tracking-wide transition ${isActive
                  ? "text-[#a77b51]"
                  : "text-[#75685e] hover:text-[#30241f]"
                } after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#a77b51] after:transition-all ${isActive
                  ? "after:w-full"
                  : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMobileMenu(false);
            }}
            className="rounded-full p-2.5 text-[#30241f] transition hover:bg-[#f6eee5] hover:text-[#a77b51]"
          >
            {searchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hidden rounded-full p-2.5 text-[#30241f] transition hover:bg-[#f6eee5] hover:text-[#a77b51] sm:inline-flex"
          >
            <FiHeart size={20} />
          </Link>

          {/* User */}
          <Link
            to={user && AccessToken ? "/profile" : "/auth"}
            aria-label="Account"
            className="hidden rounded-full p-2.5 text-[#30241f] transition hover:bg-[#f6eee5] hover:text-[#a77b51] sm:inline-flex"
          >
            <FiUser size={20} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative rounded-full p-2.5 text-[#30241f] transition hover:bg-[#f6eee5] hover:text-[#a77b51]"
          >
            <FiShoppingBag size={20} />

            <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#a77b51] text-[9px] font-semibold text-white">
              {carts.length}
            </span>
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
            onClick={() => {
              setMobileMenu(!mobileMenu);
              setSearchOpen(false);
            }}
            className="ml-1 rounded-full p-2.5 text-[#30241f] transition hover:bg-[#f6eee5] md:hidden"
          >
            {mobileMenu ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Search Panel */}
      {searchOpen && (
        <div className="border-t border-[#e9ddd0] bg-[#fffdf9] px-4 py-5 shadow-lg shadow-[#30241f]/5">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-2xl gap-2"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fragrances..."
              aria-label="Search fragrances"
              autoFocus
              className="min-w-0 flex-1 border border-[#d8cabc] bg-white px-4 py-3 text-sm text-[#30241f] outline-none placeholder:text-[#9b8d80] transition focus:border-[#a77b51] focus:ring-1 focus:ring-[#a77b51]"
            />

            <button
              type="submit"
              className="flex items-center gap-2 bg-[#30241f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8d6846]"
            >
              <FiSearch size={17} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileMenu && (
        <div className="border-t border-[#e9ddd0] bg-[#fffdf9] px-4 py-5 shadow-lg shadow-[#30241f]/5 md:hidden">
          <div className="flex flex-col">

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `border-b border-[#eee5db] px-4 py-4 text-sm font-medium transition ${isActive
                    ? "bg-[#f6eee5] text-[#a77b51]"
                    : "text-[#75685e] hover:bg-[#f6eee5] hover:text-[#30241f]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Account Actions */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 border border-[#e9ddd0] bg-white px-3 py-3 text-sm text-[#75685e] transition hover:border-[#a77b51] hover:text-[#a77b51]"
              >
                <FiHeart size={18} />
                Wishlist
              </Link>

              <Link
                to={user && AccessToken ? "/profile" : "/auth"}
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 bg-[#30241f] px-3 py-3 text-sm text-white transition hover:bg-[#8d6846]"
              >
                <FiUser size={18} />
                {user && AccessToken ? "My Account" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;